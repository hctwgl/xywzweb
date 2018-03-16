package com.xywztech.bcrm.product.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;

@Action("/product-kinds1")
@Results({ @Result(name = "success", type = "redirectAction", params = {
		"actionName", "product-kinds1" }) })
public class ProductKinds1Action extends BaseQueryAction {

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String code_id = request.getParameter("nodeid");

		StringBuilder sb = new StringBuilder("SELECT t.CATL_CODE AS CATL_CODE,t.CATL_NAME AS CATL_NAME,t.CATL_PARENT AS CATL_PARENT,t.CATL_LEVEL AS CATL_LEVEL,t.CATL_ORDER AS CATL_ORDER,t.VIEW_DETAIL AS VIEW_DETAIL,t1.CATL_NAME AS CATL_PARENT_NAME,p.PRODUCT_ID FROM OCRM_F_PD_PROD_CATL t LEFT JOIN OCRM_F_PD_PROD_CATL t1 ON t1.CATL_CODE = t.CATL_PARENT LEFT JOIN OCRM_F_PD_PROD_INFO p ON p.CATL_CODE=t.CATL_CODE  WHERE t.CATL_CODE="+code_id+" ");
		
		SQL = sb.toString();
		setPrimaryKey("t.CATL_ORDER");
		addOracleLookup("APP_STATUS", "APP_STATUS");
		datasource = ds;
	}
}
