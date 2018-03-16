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
import com.xywztech.bcrm.sales.model.ActivityRecord;
import com.xywztech.bcrm.sales.service.ActivityRecordService;

@Action("/activity-record")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "activity-record"})
})
public class ActivityRecordAction  extends ValidationAwareSupport implements ModelDriven<Object>, Validateable{

    private static final long serialVersionUID = -8761120493826704120L;
    private ActivityRecord model = new ActivityRecord();
    private Long recordId;
	private HttpServletRequest request;
    private Collection<ActivityRecord> list;
    @Autowired
    private ActivityRecordService activityRecordService;
    
    public HttpHeaders show() {
        return new DefaultHttpHeaders("show");
    }

    public HttpHeaders index() {
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String activityId = request.getParameter("activityId");
        list = activityRecordService.findAll(activityId);
        return new DefaultHttpHeaders("index")
            .disableCaching();
    }
    
    public String edit() {
        return "edit";
    }

    public String editNew() {
        model = new ActivityRecord();
        return "editNew";
    }

    public String deleteConfirm() {
        return "deleteConfirm";
    }

    public String destroy() {
        activityRecordService.remove(recordId);
        addActionMessage("ActivityRecord removed successfully");
        return "success";
    }

    public HttpHeaders create() {
        activityRecordService.save(model);
        addActionMessage("New ActivityRecord created successfully");
        return new DefaultHttpHeaders("success")
            .setLocationId(model.getRecordId());
    }

    public String update() {
        activityRecordService.save(model);
        addActionMessage("ActivityRecord updated successfully");
        return "success";
    }
    
    public String batchDestroy() {
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String idStr = request.getParameter("idStr");
        activityRecordService.batchRemove(idStr);
        addActionMessage("ActivityRecord removed successfully");
        return "success";
    }

    public void validate() {
    }

    public void setId(Long recordId) {
        if (recordId != null) {
            this.model = activityRecordService.find(recordId);
        }
        this.recordId = recordId;
    }
    
    public Object getModel() {
        return (list != null ? list : model);
    }

}