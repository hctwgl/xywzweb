package com.xywz.plan.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.plan.model.XywzPlanPrdState;
import com.xywz.plan.service.XywzPlanPrdStateService;
import com.xywztech.bob.common.CommonAction;



/*
 * 合同任务单管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzPlanPrdStateAction")
public class XywzPlanPrdStateAction extends CommonAction {
	
	@Autowired
	private XywzPlanPrdStateService service;
	

	
	@Autowired
	public void init() {
		model = new XywzPlanPrdState();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzPlanPrdState C WHERE C.prodid IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



