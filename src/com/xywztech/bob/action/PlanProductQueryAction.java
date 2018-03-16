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
@Action(value="/planProductQuery", results={
    @Result(name="success", type="json"),
})
public class PlanProductQueryAction extends BaseAction{
    
	@Autowired
    private CommonQueryService cqs;
    
	private HttpServletRequest request;
    
    public String index() {
    	
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String planId = request.getParameter("planId");
        
        StringBuilder sb = new StringBuilder("select p.*,u.username from ocrm_f_mm_plan_prod p " +
        		"left join sys_users u on p.create_user = u.userid where p.plan_id = " +planId+
        		" ");
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("PRODUCT_NAME"))
                    sb.append(" and p."+key+" like '%"+this.getJson().get(key)+"%'");
            }
        }
        cqs.setPrimaryKey("p.CREATE_DATE,PPDE_ID desc");
        this.setJson(cqs.excuteQuery(sb.toString(),0,100000));       
        return "success";
    }
}
