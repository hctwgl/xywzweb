package com.xywztech.bcrm.finService.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.finService.service.FinancialAnalysisService;
import com.xywztech.bob.vo.AuthUser;

@ParentPackage("json-default")
@Action(value = "/FinancialAnalysis", results = { @Result(name = "success", type = "json") })
@SuppressWarnings("unchecked")
public class FinancialAnalysisAction {
	@Autowired
	private HttpServletRequest request;

	@Autowired
	private FinancialAnalysisService financialAnalysisService;

	protected Map<String, Object> json = new HashMap<String, Object>();

	private List finIndex = new ArrayList();
	private String dataXml1 = "";
	private String dataXml2 = "";
	private String dataXml3 = "";
	private String dataXml4 = "";
	private Map valueMap = new HashMap();

	public String findFinIndex() {
		String custId = null;
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		if (request.getParameter("CUST_ID") != null) {
			custId = request.getParameter("CUST_ID");
		}
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();

		this.json = this.financialAnalysisService.findFinIndex(custId, auth
				.getUnitId());
		return "sucess";
	}

	public String finIndexSaveOrUpdate() {
		String custId = null;
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		if (request.getParameter("CUST_ID") != null) {
			custId = request.getParameter("CUST_ID");
		}
		this.financialAnalysisService.finIndexSaveOrUpdate(custId, auth
				.getUserId(), this.finIndex);
		return "sucess";
	}

	public String amoutValue() {
		String belongType = null;
		String assetDebtType = null;
		String custId = null;
		String assetsType=null;
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		if (request.getParameter("BELONG_TYPE") != null) {
			belongType = request.getParameter("BELONG_TYPE");
		}
		if (request.getParameter("ASSET_DEBT_TYPE") != null) {
			assetDebtType = request.getParameter("ASSET_DEBT_TYPE");
		}
		if (request.getParameter("CUST_ID") != null) {
			custId = request.getParameter("CUST_ID");
		}
		if (request.getParameter("ASSETS_TYPE") != null) {
			assetsType = request.getParameter("ASSETS_TYPE");
		}
		this.json = this.financialAnalysisService.amountValue(belongType,
				assetDebtType, custId,assetsType);

		return "sucess";
	}

	public String monthValue() {

		String ioType = null;
		String custId = null;
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		if (request.getParameter("IO_TYPE") != null) {
			ioType = request.getParameter("IO_TYPE");
		}
		if (request.getParameter("CUST_ID") != null) {
			custId = request.getParameter("CUST_ID");
		}

		this.json = this.financialAnalysisService.monthValue(ioType, custId);

		return "sucess";
	}

	public String finInfoSaveOrUpdate() {
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		json.put("userId", auth.getUserId());
		this.financialAnalysisService.finInfoSaveOrUpdate(json);

		return "sucess";
	}

	public String custIoSaveOrUpdate() {
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		json.put("userId", auth.getUserId());
		this.financialAnalysisService.custIoSaveOrUpdate(json);
		return "sucess";
	}

	public String assetXml() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);

		// 当前客户ID 以后前台传过来
		String custId = request.getParameter("customerId");

		AuthUser authUser = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		Map map1 = new HashMap();
		map1 = this.financialAnalysisService.findAsset(custId, authUser
				.getUnitId());
		this.dataXml1 = this.getXml("客户本行资产信息", "pie", map1);

		Map map2 = new HashMap();
		map2 = this.financialAnalysisService.findOther(custId, "1","OB_ASSETS_TYPE");
		this.dataXml2 = this.getXml("客户他行资产信息", "pie", map2);

		Map map3 = new HashMap();
		map3 = this.financialAnalysisService.findOther(custId, "2","O_ASSETS_TYPE");
		this.dataXml3 = this.getXml("客户其他资产信息", "column", map3);

		Map map4 = new HashMap();
		map4 = this.financialAnalysisService.findHome(custId);
		this.dataXml4 = this.getXml("家庭月度收入信息", "column", map4);

		this.valueMap = this.financialAnalysisService.findCustAllAssetAndDebt(
				custId, authUser.getUnitId());
		return "sucess";
	}

	public String getXml(String name, String type, Map map) {
		StringBuffer sb = new StringBuffer();
		if (type.equals("pie")) {
			sb.append("<chart caption=\"" + name
					+ "\"    baseFontSize=\"12\" formatNumberScale=\"0\" > ");
		} else if (type.equals("column")) {
			sb.append("<chart caption=\"" + name + "\" subCaption=\"(单位：元)\"      formatNumberScale=\"0\">");
		}

		Iterator it = map.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry entry = (Map.Entry) it.next();
			sb.append("<set label=\"" + entry.getKey() + "\"  value=\""
					+ entry.getValue() + "\"/>");
		}
		sb.append("</chart>");

		return sb.toString();
	}

	public String getDataXml1() {
		return dataXml1;
	}

	public String getDataXml2() {
		return dataXml2;
	}

	public String getDataXml3() {
		return dataXml3;
	}

	public String getDataXml4() {
		return dataXml4;
	}

	public Map<String, Object> getJson() {
		return json;
	}

	public void setJson(Map<String, Object> json) {
		this.json = json;
	}

	public void setAssetInfo(List assetInfo) {
		this.json.put("assetInfo", assetInfo);
	}

	public void setDebtInfo(List debtInfo) {
		this.json.put("debtInfo", debtInfo);
	}

	public void setBelongType(String belongType) {
		this.json.put("belongType", belongType);
	}

	public void setFinIndex(List finIndex) {
		this.finIndex = finIndex;
	}

	public Map getValueMap() {
		return valueMap;
	}

}
