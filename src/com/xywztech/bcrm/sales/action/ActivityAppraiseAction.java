package com.xywztech.bcrm.sales.action;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Validateable;
import com.opensymphony.xwork2.ValidationAwareSupport;
import com.xywztech.bcrm.sales.model.ActivityAppraise;
import com.xywztech.bcrm.sales.service.ActivityAppraiseService;

@Action("/activity-appraise")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "activity-appraise"})
})
public class ActivityAppraiseAction  extends ValidationAwareSupport implements ModelDriven<Object>, Validateable{

    private static final long serialVersionUID = -8761120493826704120L;
    private ActivityAppraise model = new ActivityAppraise();
    private Long appraiseId;
	private HttpServletRequest request;
    private Collection<ActivityAppraise> list;
    @Autowired
    private ActivityAppraiseService activityAppraiseService;
    
    public HttpHeaders show() {
        return new DefaultHttpHeaders("show");
    }

    public HttpHeaders index() {
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String activityId = request.getParameter("activityId");
        list = activityAppraiseService.findAll(activityId);
        return new DefaultHttpHeaders("index")
            .disableCaching();
    }
    
    public String edit() {
        return "edit";
    }

    public String editNew() {
        model = new ActivityAppraise();
        return "editNew";
    }

    public String deleteConfirm() {
        return "deleteConfirm";
    }

    public String destroy() {
        activityAppraiseService.remove(appraiseId);
        addActionMessage("ActivityAppraise removed successfully");
        return "success";
    }

    public HttpHeaders create() {
        activityAppraiseService.save(model);
        addActionMessage("New ActivityAppraise created successfully");
        return new DefaultHttpHeaders("success").setLocationId(model.getAppraiseId());
    }

    public String update() {
        activityAppraiseService.save(model);
        addActionMessage("ActivityAppraise updated successfully");
        return "success";
    }
    
    public String batchDestroy() {
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String idStr = request.getParameter("idStr");
        activityAppraiseService.batchRemove(idStr);
        addActionMessage("ActivityAppraise removed successfully");
        return "success";
    }

    public void validate() {
//        if (model.getCustomerId() == null || model.getCustomerId().length() ==0) {
//            addFieldError("customerId", "The cust is empty");
//        }
    }

    public void setId(Long appraiseId) {
        if (appraiseId != null) {
            this.model = activityAppraiseService.find(appraiseId);
        }
        this.appraiseId = appraiseId;
    }
    
    public Object getModel() {
        return (list != null ? list : model);
    }

}