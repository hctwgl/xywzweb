package com.xywztech.bcrm.sales.action;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

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
import com.xywztech.bcrm.sales.model.OpportunityStage;
import com.xywztech.bcrm.sales.service.OpportunityStageService;

@Action("/market-opp-stage")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "market-opp-stage"})
})
public class MarketOppStageAction  extends ValidationAwareSupport implements ModelDriven<Object>, Validateable{

    private OpportunityStage model = new OpportunityStage();
    private Long opportunityStageId;
	private HttpServletRequest request;
    private Collection<OpportunityStage> list;
    @Autowired
    private OpportunityStageService opportunityStageService;
    
    public HttpHeaders show() {
        return new DefaultHttpHeaders("show");
    }

    public HttpHeaders index() {
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String opportunityStageId = request.getParameter("opportunityStageId");
        list = opportunityStageService.findAll(opportunityStageId);
        return new DefaultHttpHeaders("index")
            .disableCaching();
    }
    
    public String edit() {
        return "edit";
    }

    public String editNew() {
        model = new OpportunityStage();
        return "editNew";
    }

    public String deleteConfirm() {
        return "deleteConfirm";
    }

    public String destroy() {
        opportunityStageService.remove(opportunityStageId);
        addActionMessage("OpportunityStage removed successfully");
        return "success";
    }

    public HttpHeaders create() {
        opportunityStageService.save(model);
        addActionMessage("New OpportunityStage created successfully");
        return new DefaultHttpHeaders("success")
            .setLocationId(model.getOpportunityStage());
    }

    public String update() {
        opportunityStageService.save(model);
        addActionMessage("OpportunityStage updated successfully");
        return "success";
    }
    
    public String brachUpdate() throws Exception {
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
	    String opportunityStageId=  request.getParameter("opportunityStageId");
	    String idJson = request.getParameter("idJson");
	    String stageCompleteDateJson = request.getParameter("stageCompleteDateJson");
	    String stageDescJson=request.getParameter("stageDescJson");
	    String opportunityStageJson = request.getParameter("opportunityStageJson");
	    
	    JSONObject idObject =JSONObject.fromObject(idJson);
	    JSONArray idJarray =  idObject.getJSONArray("id");
	    
	    JSONObject stageCompleteDateJsonObject =JSONObject.fromObject(stageCompleteDateJson);
	    JSONArray stageCompleteDateJsonJarray =  stageCompleteDateJsonObject.getJSONArray("stageCompleteDate");
	    
	    JSONObject stageDescJsonObject =JSONObject.fromObject(stageDescJson);
	    JSONArray stageDescJsonObjectJarray =  stageDescJsonObject.getJSONArray("stageDesc");
	    
	    JSONObject opportunityStageJsonObject =JSONObject.fromObject(opportunityStageJson);
	    JSONArray opportunityStageJsonObjectJarray =  opportunityStageJsonObject.getJSONArray("opportunityStage");
	    
	    opportunityStageService.batchUpdate(idJarray,stageCompleteDateJsonJarray,stageDescJsonObjectJarray,opportunityStageJsonObjectJarray,opportunityStageId);
        return "success";
    }

    public void validate() {
    }

    public void setId(Long opportunityStageId) {
        if (opportunityStageId != null) {
            this.model = opportunityStageService.find(opportunityStageId);
        }
        this.opportunityStageId = opportunityStageId;
    }
    
    public Object getModel() {
        return (list != null ? list : model);
    }

}