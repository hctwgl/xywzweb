package com.xywztech.bcrm.custmanager.action;


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
/**
 * 客户经理业务全景视图-概览信息
 * @author songxs
 * @since 2012-12-12
 *
 */
@ParentPackage("json-default")
@Action(value="/adminCustQuery-Action", results={
    @Result(name="success", type="json")
})
public class AdminCustQueryAction extends BaseQueryAction{
    
	@Autowired
    @Qualifier("dsOracle")
	private DataSource ds;
	
	private HttpServletRequest request;
	
	@Override
    public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		String mrgid = request.getParameter("custManagerId");
        	StringBuilder s = new StringBuilder(
        		"select c.ID,c.cust_id,c.mgr_id,c.main_type,c.assign_date,t.cust_zh_name as cust_name,t.cust_typ" +
        		" from OCRM_F_CI_BELONG_CUSTMGR c" +
        		" left join OCRM_F_CI_CUST_DESC t on t.cust_id = c.cust_id " +
        		"where c.mgr_id = '"+mrgid+"' "

        	);
             
    		addOracleLookup("MAIN_TYPE", "MAINTAIN_TYPE");//法定代表人证件类型
        	  SQL=s.toString();
  	           datasource = ds;
    }
}