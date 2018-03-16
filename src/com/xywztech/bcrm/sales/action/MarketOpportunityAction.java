package com.xywztech.bcrm.sales.action;

import java.util.Collection;
import java.util.List;

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
import com.xywztech.bcrm.sales.model.MarketOpportunity;
import com.xywztech.bcrm.sales.model.OpportunityStage;
import com.xywztech.bcrm.sales.service.MarketOpportunityService;
import com.xywztech.bcrm.sales.service.OpportunityStageService;
import com.xywztech.bob.action.LookupAction;
import com.xywztech.bob.action.LookupAction.KeyValuePair;

@Action("/market-opportunity")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "market-opportunity"})
})
public class MarketOpportunityAction  extends ValidationAwareSupport implements ModelDriven<Object>, Validateable{

    private HttpServletRequest request;
	private static final long serialVersionUID = 8550661616118279889L;
	private MarketOpportunity model = new MarketOpportunity();
	
	private String marketOpportunityId;
	public void setMarketOpportunityId(String marketOpportunityId) {
		this.marketOpportunityId = marketOpportunityId;
	}
	private Collection<MarketOpportunity> list;
	@Autowired
	private MarketOpportunityService marketOpportunityService;
	@Autowired
	private OpportunityStageService opportunityStageService;
	
    public HttpHeaders show() {
        return new DefaultHttpHeaders("show");
    }

    public HttpHeaders index() {
        list = marketOpportunityService.findAll();
        return new DefaultHttpHeaders("index")
            .disableCaching();
    }
    
    public String edit() {
        return "edit";
    }

    public String editNew() {
    	model = new MarketOpportunity();
        return "editNew";
    }

    public String deleteConfirm() {
        return "deleteConfirm";
    }

    public String destroy() {
    	marketOpportunityService.remove(Long.parseLong(marketOpportunityId));
        addActionMessage("marketOpportunity removed successfully");
        return "success";
    }

    public HttpHeaders create() {
    	
    	marketOpportunityService.save(model);
    	
    	// 初始化所有的商机阶段  
    	LookupAction lookupAction = new LookupAction();
    	//如果是资产业务
    	if(model.getMarketOpportunityType().equals("1")) 
    		lookupAction.setName("ACC_OPPOR_STAGE");
    	else
    		lookupAction.setName("COM_OPPOR_STAGE");
    	
    	
    	
		List<KeyValuePair> JSON = lookupAction.getJSON();
    	for(int i = 0;i<JSON.size();i++)
    	{
    		OpportunityStage opportunityStage = new OpportunityStage();
        	opportunityStage.setMarketOpporId(model.getMarketOpporId());
    		opportunityStage.setOpportunityStage(JSON.get(i).getValue());
    		opportunityStageService.save(opportunityStage);
    	}
    	
        addActionMessage("New marketOpportunity created successfully");
        return new DefaultHttpHeaders("success")
            .setLocationId(model.getMarketOpporId());
    }

    public String update() {
    	marketOpportunityService.save(model);
        addActionMessage("marketOpportunity updated successfully");
        return "success";
    }

    public void validate() {

    }

    public void setId(String marketOpportunityId) {
        if (marketOpportunityId != null) {
            this.model = marketOpportunityService.find(Long.parseLong(marketOpportunityId));
        }
        this.marketOpportunityId = marketOpportunityId;
    }
    public Object getModel() {
        return (list != null ? list : model);
    }
    
    public String assignMgr(){

      ActionContext ctx = ActionContext.getContext();
      request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
      
      String activityIdTemp = request.getParameter("activityIdTemp");
      String mgrId = request.getParameter("mgrId");
      marketOpportunityService.assignMgr(activityIdTemp, mgrId);
      //system.out.printlnln(activityIdTemp);
    	return "success";
    }
    

}