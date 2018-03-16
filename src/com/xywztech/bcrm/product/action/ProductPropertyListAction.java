/**
 * 
 */
package com.xywztech.bcrm.product.action;


import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
@Action(value = "/product-property-list", results = { @Result(name = "success", type = "json") })
public class ProductPropertyListAction extends BaseQueryAction {

    private HttpServletRequest request;

    @Autowired
    @Qualifier("dsOracle")
    private DataSource ds;

    @Override
	public void prepare() {
        ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);

     
        String productId = request.getParameter("productId");

        StringBuilder sb = new StringBuilder("select t.* "
                + "from OCRM_F_PD_PROD_PROPERTY t where t.PRODUCT_ID = '" + productId
                + "' ");

        addOracleLookup("PRODUCT_PROPERTY_TYPE", "FEATURE_CATL_ID");

        SQL = sb.toString();
        setPrimaryKey("t.PRODUCT_ID desc");
        datasource = ds;
    }
  
}

