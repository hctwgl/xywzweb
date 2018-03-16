package com.xywztech.bcrm.action;

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
@Action(value = "/querytranslog", results = { @Result(name = "success", type = "json") })
public class QuerytranslogAction extends BaseQueryAction {

    private HttpServletRequest request;

    @Autowired
    @Qualifier("dsOracle")
    private DataSource ds;

    @Override
	public void prepare() {
        ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);
        String acctNo = request.getParameter("acct_no");
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        StringBuilder sb = new StringBuilder("select t.* from ACRM_F_CI_NIN_TRANSLOG t where 1>0 ");
        if(acctNo!=null && !"".equals(acctNo)){
        	sb.append(" and t.ACCT_NO= '"+ acctNo + "'");
        	for (String key : this.getJson().keySet()) {
        		if (null != this.getJson().get(key)
        				&& !this.getJson().get(key).equals("")) {
        			if (key.equals("createDateS"))
        				sb.append(" and t.TRAN_DATE >= to_date('" + this.getJson().get(key)+ "','yyyy-mm-dd')");
        			else if (key.equals("createDateE"))
        				sb.append(" and t.TRAN_DATE <= to_date('" + this.getJson().get(key) + "','yyyy-mm-dd')");
        		}
        	}
        }else{
        	sb.append(" and 1=2");
        }

        SQL = sb.toString();
        setPrimaryKey("t.ACCT_NO");
        // qh.addGreenplumLookup("EVENT_TYP", "PLAN_STATUS");
        addOracleLookup("CURR", "ACC1300012");
        addOracleLookup("CD_FLAG", "LED0100016");
//        addGreenplumLookup("CUR_COD", "CCY");
        datasource = ds;
    }

}
