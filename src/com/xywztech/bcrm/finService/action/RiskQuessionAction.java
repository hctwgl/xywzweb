package com.xywztech.bcrm.finService.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.finService.service.RiskQuessionService;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;

@ParentPackage("json-default")
@Action(value = "/RiskQuession", results = { @Result(name = "success", type = "json") })
@SuppressWarnings("unchecked")
public class RiskQuessionAction extends BaseQueryAction {
	@Autowired
	private HttpServletRequest request;

	@Autowired
	private RiskQuessionService riskQuessionService;

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);

		StringBuilder sb = new StringBuilder("");

		sb.append(" select O.TITLE_NAME,O.TITLE_TYPE,O.TITLE_SORT,O.AVAILABLE,A.USER_NAME,O.UPDATE_DATE,O.TITLE_ID");
		sb.append(" from OCRM_F_SE_TITLE O");
		sb.append(" LEFT OUTER JOIN ADMIN_AUTH_ACCOUNT A ON O.UPDATOR = A.ACCOUNT_NAME");
		sb.append(" where 1=1");

		if (request.getParameter("start") != null)
			start = new Integer(request.getParameter("start")).intValue();
		if (request.getParameter("limit") != null)
			limit = new Integer(request.getParameter("limit")).intValue();

		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("TITLE_TYPE")) {
					sb.append(" and O.TITLE_TYPE='" + this.getJson().get(key)
							+ "'");
				} else if (key.equals("TITLE_NAME")) {
					sb.append(" and O.TITLE_NAME like '%"
							+ this.getJson().get(key) + "%'");
				} else if (key.equals("AVAILABLE")) {
					sb.append(" and O.AVAILABLE= '" + this.getJson().get(key)
							+ "'");
				}
			}
		}

		sb.append(" ORDER BY O.TITLE_SORT");
		
		addOracleLookup("TITLE_TYPE","TITLE_TYPE");
		SQL = sb.toString();
		datasource = ds;

	}

	public String findResult() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		this.json = this.riskQuessionService.findResult(request
				.getParameter("titleId"));
		return "sucess";
	}

	public String createQuession() {
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		this.json.put("UPDATOR", auth.getUserId());
		riskQuessionService.createQuession(this.json);
		return "sucess";
	}

	public String openOrCloseQuession() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		String titleId = request.getParameter("titleId");
		String available = request.getParameter("available");
		this.riskQuessionService.openOrCloseQuession(auth.getUserId(), titleId,
				available);
		return "sucess";
	}

	public void setResultInfo(List resultInfo) {
		this.json.put("resultInfo", resultInfo);
	}

	public String findRiskParam() {
		this.json = this.riskQuessionService.findRiskParam();
		return "sucess";
	}
}
