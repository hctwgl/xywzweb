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
import com.xywztech.bcrm.workplat.model.WorkingplatformInfo;
import com.xywztech.bob.service.NewsManageService;

@Action("/news-manage")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "news-manage"})
})
public class NewsManageAction  extends ValidationAwareSupport implements ModelDriven<Object>, Validateable{

	private static final long serialVersionUID = 8556355333118279765L;
	private WorkingplatformInfo model = new WorkingplatformInfo();
	private HttpServletRequest request;
	private Long ID;
	private Collection<WorkingplatformInfo> list;
	@Autowired
	private NewsManageService newsManageService;
	
    public HttpHeaders show() {
        return new DefaultHttpHeaders("show");
    }

    public HttpHeaders index() {
        list = newsManageService.findAll();
        return new DefaultHttpHeaders("index")
            .disableCaching();
    }
    
    public String edit() {
        return "edit";
    }

    public String editNew() {
    	model = new WorkingplatformInfo();
        return "editNew";
    }

    public String deleteConfirm() {
        return "deleteConfirm";
    }

    public String destroy() {
    	newsManageService.remove(ID);
        addActionMessage("WorkingplatformInfo removed successfully");
        return "success";
    }

    public DefaultHttpHeaders create() {
    	newsManageService.save(model);
        addActionMessage("New WorkingplatformInfo created successfully");
        return new DefaultHttpHeaders("success")
            .setLocationId(model.getMessageId());
        
    }

    public String update() {
    	newsManageService.save(model);
        addActionMessage("WorkingplatformInfo updated successfully");
        return "success";
    }
    
    public String batchDestroy() {
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String idStr = request.getParameter("idStr");
        newsManageService.batchRemove(idStr);
        addActionMessage("WorkingplatformInfo removed successfully");
        return "success";
    }
    

    public void validate() {

    }

    public void setId(Long ID) {
        if (ID != null) {
            this.model = newsManageService.find(ID);
        }
        this.ID = ID;
    }
    public Object getModel() {
        return (list != null ? list : model);
    }

}