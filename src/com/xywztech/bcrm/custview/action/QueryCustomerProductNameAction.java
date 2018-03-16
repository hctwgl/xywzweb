package com.xywztech.bcrm.custview.action;

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
@Action(value = "/querycustomerproductname", results = { @Result(name = "success", type = "json") })
public class QueryCustomerProductNameAction extends BaseQueryAction {

    private HttpServletRequest request;

    @Autowired
    @Qualifier("dsOracle")
    private DataSource ds;
    
    @Override
	public void prepare(){
        ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);
        String customerId = request.getParameter("customerId");

        StringBuilder sb = new StringBuilder(
                "select distinct t.product_id,t3.cust_zh_name,t2.prod_name "
                        + "from acrm_f_ag_agreement t left join ocrm_f_pd_prod_info t2" +
                        		" on t.product_id=t2.product_id inner join ocrm_f_ci_cust_desc t3 " +
                        		" on t.cust_id=t3.cust_id where t.CUST_ID= '"
                        + customerId + "'");
        SQL = sb.toString();
        setPrimaryKey("t.product_id");
        datasource = ds;
    }

}
