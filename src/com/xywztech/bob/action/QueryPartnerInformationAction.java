package com.xywztech.bob.action;

import java.sql.SQLException;

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
import com.xywztech.bob.core.PagingInfo;
import com.xywztech.bob.core.QueryHelper;

@ParentPackage("json-default")
@Action(value = "/partnerinformation", results = { @Result(name = "success", type = "json") })
public class QueryPartnerInformationAction extends BaseAction {
    private HttpServletRequest request;

    @Autowired
    @Qualifier("dsOracle")
    private DataSource ds;
    
    public String index() throws SQLException {
        ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);
        String customerId = request.getParameter("customerId");
        StringBuilder sb = new StringBuilder(
        		"select ID,CUST_ID,SH_NAME,CRET_TYP,CRET_NO,SH_TYP,FR_NAME,CZ_TYP,"
        		+ "CUR_COD,YCZ_AMT,SJSH_AMT,SH_PCT,INV_DT,SB_FLG,BIGSH_FLG,HBRPT_FLG,"
        		+ "RMAK,MXTID from ocrm_f_ci_stockholder where CUST_ID= '"
        		+ customerId + "'");
        for (String key : this.getJson().keySet()) {
        	if (null != this.getJson().get(key)
        			&& !this.getJson().get(key).equals("")) {
        		if (key.equals("SH_NAME"))
        			sb.append(" and " + key + " like '%"
        					+ this.getJson().get(key) + "%'");
        	}
        }
        int currentPage =this.getStart()/this.getLimit()+1;
        PagingInfo pi = new PagingInfo(this.getLimit(),currentPage);
        QueryHelper qh = new QueryHelper(sb.toString(), ds.getConnection(),pi);
        qh.setPrimaryKey("MXTID");
//        qh.addGreenplumLookup("EVENT_TYP", "PLAN_STATUS");
        setJson(qh.getJSON());
        qh.setPrimaryKey("ID");
        return "success";
    }
}
