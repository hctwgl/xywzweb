package com.xywztech.bcrm.finService.action;

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
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;

@ParentPackage("json-default")
@Action(value = "/FinancialHealth", results = { @Result(name = "success", type = "json") })
public class FinancialHealthAction extends BaseQueryAction {
	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();

		StringBuilder sb = new StringBuilder("");		
		sb.append(" SELECT B2.*");
		sb.append(" FROM OCRM_F_CI_BELONG_CUSTMGR B1,");
		sb.append(" (SELECT O1.CUST_ID,O1.CORE_ID SOURCE_CUST_ID,O1.CUST_ZH_NAME,O1.CUST_LEV,O2.ASSET_SUM,O4.OTHER_BANK,O5.OTHER_TYPE");
		sb.append(" FROM OCRM_F_CI_CUST_DESC O1");
		sb.append(" LEFT OUTER JOIN");
		sb.append(" (SELECT A1.CUST_ID, SUM(A1.AMOUNT_VALUE) OTHER_BANK FROM OCRM_F_FM_FIN_INFO A1 WHERE BELONG_TYPE = '1' AND ASSET_DEBT_TYPE = '1' GROUP BY A1.CUST_ID) O4");
		sb.append(" ON O1.CUST_ID = O4.CUST_ID AND O1.CUST_TYP='1' ");
		sb.append(" LEFT OUTER JOIN");
		sb.append(" (SELECT A2.CUST_ID, SUM(A2.AMOUNT_VALUE) OTHER_TYPE FROM OCRM_F_FM_FIN_INFO A2 WHERE BELONG_TYPE = '2' AND ASSET_DEBT_TYPE = '1' GROUP BY A2.CUST_ID) O5");
		sb.append(" ON O1.CUST_ID = O5.CUST_ID");
		sb.append(" LEFT OUTER JOIN");
		sb.append(" ACRM_F_AG_BUSINESS_SUM O2");
		sb.append(" ON O1.CUST_ID = O2.CUST_ID AND O2.INST_CODE ='"+auth.getUnitId()+"'");
		sb.append(" WHERE O1.CUST_TYP = '1' ");
		sb.append(" ) B2"); 
		sb.append(" WHERE B1.CUST_ID=B2.CUST_ID");
		sb.append(" AND B1.MGR_ID = '"+auth.getUserId()+"'");
		sb.append(" AND B1.MAIN_TYPE = '1'");
		
	
			   
        //权限控制

		setPrimaryKey("b2.CUST_ID");
		if (request.getParameter("start") != null)
			start = new Integer(request.getParameter("start")).intValue();
		if (request.getParameter("limit") != null)
			limit = new Integer(request.getParameter("limit")).intValue();

		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("SOURCE_CUST_ID")) {
					sb.append(" AND B2.SOURCE_CUST_ID LIKE '%"
							+ this.getJson().get(key) + "%'");
				} else if (key.equals("CUST_ZH_NAME")) {
					sb.append(" AND B2.CUST_ZH_NAME LIKE '%"
							+ this.getJson().get(key) + "%'");
				} else if (key.equals("CERT_TYPE")) {
					sb.append(" AND B2.CERT_TYPE = '" + this.getJson().get(key)
							+ "'");
				} else if (key.equals("CERT_NUM")) {
					sb.append(" AND B2.CERT_NUM LIKE '%"
							+ this.getJson().get(key) + "%'");
				} else if (key.equals("CUST_LEV")) {
					sb.append(" AND B2.CUST_LEV = '"
							+ this.getJson().get(key) + "'");
				}
			}
		}

		SQL = sb.toString();
		datasource = ds;

	}
}
