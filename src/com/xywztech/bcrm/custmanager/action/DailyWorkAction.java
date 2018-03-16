package com.xywztech.bcrm.custmanager.action;



import java.util.Collection;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Validateable;
import com.opensymphony.xwork2.ValidationAwareSupport;
import com.xywztech.bcrm.custmanager.model.OcrmFWpWorklogDaylog;
import com.xywztech.bcrm.custmanager.service.DailyWorkService;
@ParentPackage("json-default")
@Action(value="/dailyWork-Action", results={
    @Result(name="success", type="json")
})
public class DailyWorkAction extends ValidationAwareSupport implements ModelDriven<Object>, Validateable{
	private static final long serialVersionUID = -2010621122837504304L;
	private OcrmFWpWorklogDaylog model = new OcrmFWpWorklogDaylog();
    private Collection<Map<String, Object>> list;
    private Long id;
    @Autowired
    private DailyWorkService dailyworkservice=new DailyWorkService();
    private HttpServletRequest request;

    // GET /orders
    public HttpHeaders index() {

        return new DefaultHttpHeaders("index")
            .disableCaching();
    }
	
    // GET /orders/1
    public HttpHeaders show() {
        return new DefaultHttpHeaders("show");
    }

    // GET /orders/1/edit
    public String edit() {
        return "edit";
    }

    // GET /orders/new
    public String editNew() {
   
        return "editNew";
    }

    // GET /orders/1/deleteConfirm
    public String deleteConfirm() {
        return "deleteConfirm";
    }

    // DELETE /orders/1
    public String destroy() {
    	//customerBaseService.remove(id);
        return "success";
    }

    // POST /orders
    public HttpHeaders create() throws Exception {
    	//throw new Exception("false");
     	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        //新增
    	if(request.getParameter("operate").equals("add"))
    		//model.setCustomerBaseNumber(request.getParameter("customerBaseNumber"));
    		dailyworkservice.save(model);
    	
    /*	else if(request.getParameter("operate").equals("update")){
    		if(model.getLogid()!=null){
    			dailyworkservice.save(model);}
    		else {return new DefaultHttpHeaders("failure");}
    	}*/
 /*   	
    	else if(request.getParameter("operate").equals("delete"))
    	{      String s=  request.getParameter("cbid");
               JSONObject jsonObject =JSONObject.fromObject(s);
               JSONArray jarray =  jsonObject.getJSONArray("id");
               customerBaseService.remove(jarray);
    	}*/
    	
        return new DefaultHttpHeaders("success")
            .setLocationId(model.getLogid());
    }

    // PUT /orders/1
    public String update() throws Exception {
    	dailyworkservice.save(model);
        return "success";
    }
    //校验方法
    public void validate() {

    }
    
    public Long getId() 
    { 
        return this.id; 
    } 

    public void setId(Long id) {
 
        this.id = id;
    }
    
    public Object getModel() 
    { 
        return (list != null ? list : model); 
    } 
}
