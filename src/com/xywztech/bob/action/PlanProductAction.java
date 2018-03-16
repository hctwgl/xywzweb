package com.xywztech.bob.action;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Validateable;
import com.opensymphony.xwork2.ValidationAwareSupport;
import com.xywztech.bob.model.PlanProduct;
import com.xywztech.bob.service.PlanProductService;

@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "plan-customer"})
})
public class PlanProductAction  extends ValidationAwareSupport implements ModelDriven<Object>, Validateable{

	private static final long serialVersionUID = -8761120493826704120L;
	private PlanProduct model = new PlanProduct();
	private Long productDetailId;
	private HttpServletRequest request;
	private Collection<PlanProduct> list;
	@Autowired
	private PlanProductService planProductService;
	
    public HttpHeaders show() {
        return new DefaultHttpHeaders("show");
    }

    public HttpHeaders index() {
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String planId = request.getParameter("planId");
        list = planProductService.findAll(planId);
        return new DefaultHttpHeaders("index")
            .disableCaching();
    }
    
    public String edit() {
        return "edit";
    }

    public String editNew() {
    	model = new PlanProduct();
        return "editNew";
    }

    public String deleteConfirm() {
        return "deleteConfirm";
    }

    public String destroy() {
    	planProductService.remove(productDetailId);
        addActionMessage("PlanProduct removed successfully");
        return "success";
    }

    public HttpHeaders create() {
    	planProductService.save(model);
        addActionMessage("New PlanProduct created successfully");
        return new DefaultHttpHeaders("success")
            .setLocationId(model.getProductDetailId());
    }

    public String update() {
    	planProductService.save(model);
        addActionMessage("PlanProduct updated successfully");
        return "success";
    }
    
    public String batchDestroy() {
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String idStr = request.getParameter("idStr");
        planProductService.batchRemove(idStr);
        addActionMessage("PlanProduct removed successfully");
        return "success";
    }

    public void validate() {
    }

    public void setId(Long productDetailId) {
        if (productDetailId != null) {
            this.model = planProductService.find(productDetailId);
        }
        this.productDetailId = productDetailId;
    }
    
    public Object getModel() {
        return (list != null ? list : model);
    }

}