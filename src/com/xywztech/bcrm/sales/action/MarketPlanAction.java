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
import com.xywztech.bcrm.sales.model.MarketPlan;
import com.xywztech.bcrm.sales.service.MarketPlanService;

@Action("/market-plan")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "market-plan"})
})
public class MarketPlanAction  extends ValidationAwareSupport implements ModelDriven<Object>, Validateable{

	private static final long serialVersionUID = 8550661616118279889L;
	private MarketPlan model = new MarketPlan();
	private Long planId;
	private HttpServletRequest request;
	private Collection<MarketPlan> list;
	@Autowired
	private MarketPlanService marketPlanService;
	
    public HttpHeaders show() {
        return new DefaultHttpHeaders("show");
    }

    public HttpHeaders index() {
        list = marketPlanService.findAll();
        return new DefaultHttpHeaders("index")
            .disableCaching();
    }
    
    public String edit() {
        return "edit";
    }

    public String editNew() {
    	model = new MarketPlan();
        return "editNew";
    }

    public String deleteConfirm() {
        return "deleteConfirm";
    }

    public String destroy() {
    	marketPlanService.remove(planId);
        addActionMessage("marketPlan removed successfully");
        return "success";
    }

    public DefaultHttpHeaders create() {
    	marketPlanService.save(model);
        addActionMessage("New marketPlan created successfully");
        return new DefaultHttpHeaders("success")
            .setLocationId(model.getPlanId());
        
    }
    
	public String batchDestroy() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		marketPlanService.batchRemove(idStr);
		addActionMessage(" lookupMapping removed successfully");
		return "success";
	}


    public String update() {
    	marketPlanService.save(model);
        addActionMessage("marketPlan updated successfully");
        return "success";
    }
    
    //关闭营销计划
    public String closePlan() {
    	marketPlanService.closePlan(model);
        addActionMessage("marketPlan closed successfully");
        return "success";
    }
    
    //执行营销计划
    public String planExecute()
    {
    	marketPlanService.saveActivity(model);
        addActionMessage("marketPlan executed successfully");
        return "success";
    }

    public void validate() {

    }

    public void setId(Long ID) {
        if (ID != null) {
            this.model = marketPlanService.find(ID);
        }
        this.planId = ID;
    }
    public Object getModel() {
        return (list != null ? list : model);
    }

}