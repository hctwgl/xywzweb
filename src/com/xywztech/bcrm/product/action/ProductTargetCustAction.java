package com.xywztech.bcrm.product.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.product.service.TargetCusSearchService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@ParentPackage("json-default")
@Action(value="product-targetCust", results={@Result(name="success", type="json")})
public class ProductTargetCustAction  extends CommonAction {

	@Autowired
	@Qualifier("dsOracle")	
	private DataSource ds;  
	private HttpServletRequest request;
	@Autowired
	private TargetCusSearchService targetCusSearchService;
	@Override
	public void prepare(){
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		String productId = request.getParameter("productId");
		String conditionAttrs = request.getParameter("conditionAttrs");
		String radio =request.getParameter("radio");
		JSONArray jaCondition = JSONArray.fromObject(conditionAttrs);
		Map<String, Object> res = targetCusSearchService.generatorSql(jaCondition,radio,productId);
		SQL=(String)res.get("SQL");
		addOracleLookup("CUST_LEV","CUST_LEVEL4");
    	addOracleLookup("IS_BUY_THE_PROD","IF_FLAG");
		datasource = ds;
    }
}
