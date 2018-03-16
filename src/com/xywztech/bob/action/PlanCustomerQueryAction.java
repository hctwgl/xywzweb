package com.xywztech.bob.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.service.CommonQueryService;

@ParentPackage("json-default")
@Action(value="/planCustomerQuery", results={
    @Result(name="success", type="json"),
})
public class PlanCustomerQueryAction extends BaseAction{
    
	@Autowired
    private CommonQueryService cqs;
    
	private HttpServletRequest request;
    
    public String index() {
    	
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String planId = request.getParameter("planId");
        
        StringBuilder sb = new StringBuilder("select c.*,u1.username as CREATE_USER_NAME,u2.username as EXECUTOR_NAME,b.INSTITUTION_NAME,d.MGR_NAME from ocrm_f_mm_plan_cust c " 
        		+ " left join OCRM_F_CI_BELONG_ORG b on b.cust_id = c.cust_id"
				+ " left join OCRM_F_CI_BELONG_CUSTMGR d on d.cust_id = c.cust_id"
        		+" left join sys_users u1 on c.CREATE_USER = u1.userid " 
        		+" left join sys_users u2 on c.EXECUTOR = u2.userid where c.plan_id = " +planId+
        		" ");
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                    if(key.equals("CUST_NAME"))
                      sb.append(" and c."+key+" like"+" '%"+this.getJson().get(key)+"%'");
                    else if(key.equals("cust_id"))
                    	sb.append(" and c."+key+" = "+this.getJson().get(key));
               }}
        cqs.setPrimaryKey("c.CREATE_DATE desc");
        this.setJson(cqs.excuteQuery(sb.toString(),0,1000000));       
        return "success";
    }
}
