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
@Action(value = "/bondinformation", results = { @Result(name = "success", type = "json") })
public class QueryBondInformationAction extends BaseQueryAction {

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

        StringBuilder sb = new StringBuilder(
                "select t.* from ocrm_f_ci_bnd_issue t where t.CUST_ID= '"
                        + customerId + "'");
        for (String key : this.getJson().keySet()) {
            if (null != this.getJson().get(key)
                    && !this.getJson().get(key).equals("")) {
                if (key.equals("BND_TYP"))
                    sb.append(" and t." + key + "= '" + this.getJson().get(key)
                            + "'");
                else if (key.equals("ISSUE_NAME"))
                    sb.append(" and t." + key + " like '%"
                            + this.getJson().get(key) + "%'");
                else if (key.equals("ISSUE_COD"))
                    sb.append(" and t." + key + " like '%"
                            + this.getJson().get(key) + "%'");
                else if (key.equals("SH_FLG"))
                    sb.append(" and t." + key + "= '" + this.getJson().get(key)
                            + "'");
            }
        }

        SQL = sb.toString();
        setPrimaryKey("t.MXTID");
        // qh.addGreenplumLookup("EVENT_TYP", "PLAN_STATUS");
        addOracleLookup("BND_TYP", "BOND_TYP");
//        addGreenplumLookup("CUR_COD", "CCY");
        datasource = ds;
    }

}
