package com.xywztech.bob.action;

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
import com.xywztech.bcrm.sales.model.PlanCustomer;
import com.xywztech.bcrm.sales.service.PlanCustomerService;

@Action("/plan-customer")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "plan-customer"})
})
public class PlanCustomerAction  extends ValidationAwareSupport implements ModelDriven<Object>, Validateable{

	private static final long serialVersionUID = -8761120493826704120L;
	private PlanCustomer model = new PlanCustomer();
	private Long planCustomerdetailId;
	private HttpServletRequest request;
	private Collection<PlanCustomer> list;
	@Autowired
	private PlanCustomerService planCustomerService;
	
    public HttpHeaders show() {
        return new DefaultHttpHeaders("show");
    }

    public HttpHeaders index() {
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String planId = request.getParameter("planId");
        list = planCustomerService.findAll(planId);
        return new DefaultHttpHeaders("index")
            .disableCaching();
    }
    
    public String edit() {
        return "edit";
    }

    public String editNew() {
    	model = new PlanCustomer();
        return "editNew";
    }

    public String deleteConfirm() {
        return "deleteConfirm";
    }

    public String destroy() {
    	planCustomerService.remove(planCustomerdetailId);
        addActionMessage("PlanCustomer removed successfully");
        return "success";
    }
    
    public String batchDestroy() {
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String idStr = request.getParameter("idStr");
    	planCustomerService.batchRemove(idStr);
        addActionMessage("PlanCustomer removed successfully");
        return "success";
    }

    public HttpHeaders create() {
    	planCustomerService.save(model);
        addActionMessage("New PlanCustomer created successfully");
        return new DefaultHttpHeaders("success")
            .setLocationId(model.getPlanCustomerdetailId());
    }

    public String update() {
    	planCustomerService.save(model);
        addActionMessage("PlanCustomer updated successfully");
        return "success";
    }

    public void validate() {
        if (model.getCustomerId() == null || model.getCustomerId().length() ==0) {
            addFieldError("customerId", "The cust is empty");
        }
    }

    public void setId(Long planCustomerdetailId) {
        if (planCustomerdetailId != null) {
            this.model = planCustomerService.find(planCustomerdetailId);
        }
        this.planCustomerdetailId = planCustomerdetailId;
    }
    
    public Object getModel() {
        return (list != null ? list : model);
    }

}