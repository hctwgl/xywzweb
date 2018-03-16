package com.xywz.plan.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.plan.model.XywzPlanQltyCheckAdvsSngl;
import com.xywz.plan.service.XywzPlanQltyCheckAdvsSnglService;
import com.xywztech.bob.common.CommonAction;



/*
 * 车间作业通知单Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzPlanJobAdvsSnglAction")
public class XywzPlanJobAdvsSnglAction extends CommonAction {
	
	@Autowired
	private XywzPlanQltyCheckAdvsSnglService service;
	

	
	@Autowired
	public void init() {
		model = new XywzPlanQltyCheckAdvsSngl();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzPlanQltyCheckAdvsSngl C WHERE C.qualId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



