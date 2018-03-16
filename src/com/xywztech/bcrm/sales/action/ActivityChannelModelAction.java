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
import com.xywztech.bcrm.sales.model.OcrmFCiMktModelManage;
import com.xywztech.bcrm.sales.service.ActivityChannelModelService;

@Action("/channelModelManage")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "channelModelManage"})
})
public class ActivityChannelModelAction  extends ValidationAwareSupport implements ModelDriven<Object>, Validateable{

	private static final long serialVersionUID = 8550661616118279889L;
	private OcrmFCiMktModelManage model = new OcrmFCiMktModelManage();
	private Long modelId;
	private HttpServletRequest request;
	private Collection<OcrmFCiMktModelManage> list;
	@Autowired
	private ActivityChannelModelService mktModelService;
	
    public HttpHeaders show() {
        return new DefaultHttpHeaders("show");
    }

    public HttpHeaders index() {
        list = mktModelService.findAll();
        return new DefaultHttpHeaders("index")
            .disableCaching();
    }
    
    public String edit() {
        return "edit";
    }

    public String editNew() {
    	model = new OcrmFCiMktModelManage();
        return "editNew";
    }

    public String deleteConfirm() {
        return "deleteConfirm";
    }

    public String destroy() {
    	mktModelService.remove(modelId);
        addActionMessage("channelModel removed successfully");
        return "success";
    }

    public HttpHeaders create() {
    	mktModelService.save(model);
        addActionMessage("New channelModel created successfully");
        return new DefaultHttpHeaders("success")
            .setLocationId(model.getModelId());
    }
    
	public String batchDestroy() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		mktModelService.batchRemove(idStr);
		addActionMessage(" lookupMapping removed successfully");
		return "success";
	}
  
    public String update() {
    	mktModelService.save(model);
        addActionMessage("marketActivity updated successfully");
        return "success";
    }

    public void validate() {
    }

    public void setId(Long ID) {
        if (ID != null) {
            this.model = mktModelService.find(ID);
        }
        this.modelId = ID;
    }
    public Object getModel() {
        return (list != null ? list : model);
    }

}