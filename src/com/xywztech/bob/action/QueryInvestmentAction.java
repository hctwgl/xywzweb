package com.xywztech.bob.action;

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

@ParentPackage("json-default")
@Action(value = "/investment", results = { @Result(name = "success", type = "json") })
public class QueryInvestmentAction extends BaseQueryAction {

    private HttpServletRequest request;

    @Autowired
    @Qualifier("dsOracle")
    private DataSource ds;

    @Override
	public void prepare() {
        ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);
        String customerId = request.getParameter("customerId");

        StringBuilder sb = new StringBuilder("select t.* "
                + "from ocrm_f_ci_investment t where t.CUST_ID= '" + customerId
                + "'");
        for (String key : this.getJson().keySet()) {
            if (null != this.getJson().get(key)
                    && !this.getJson().get(key).equals("")) {
                if (key.equals("COMPANY"))
                    sb.append(" and t." + key + " like '%"
                            + this.getJson().get(key) + "%'");
                else if (key.equals("INV_TYP"))
                    sb.append(" and t." + key + " like '%"
                            + this.getJson().get(key) + "%'");
                else if (key.equals("INV_ZZDM"))
                    sb.append(" and t." + key + "= '" + this.getJson().get(key)
                            + "'");
                else if (key.equals("CUR_COD"))
                    sb.append(" and t." + key + "= '" + this.getJson().get(key)
                            + "'");
            }
        }

        SQL = sb.toString();
        setPrimaryKey("t.MXTID");
//        addGreenplumLookup("CUR_COD", "CCY");
        addOracleLookup("LNCRD_STS", "LNCRD_STS");
        datasource = ds;
    }

}
