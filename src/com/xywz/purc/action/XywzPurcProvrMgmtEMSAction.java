package com.xywz.purc.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.purc.model.XywzPurcProvrMgmtEMS;
import com.xywz.purc.service.XywzPurcProvrMgmtEMSService;
import com.xywztech.bob.common.CommonAction;



/*
 * 供应商快递公司信息管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzPurcProvrMgmtEMSAction")
public class XywzPurcProvrMgmtEMSAction extends CommonAction {
	
	@Autowired
	private XywzPurcProvrMgmtEMSService service;//定义XywzPurcProvrMgmtEMS属性
	

	
	@Autowired
	public void init() {
		model = new XywzPurcProvrMgmtEMS();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzPurcProvrMgmtEMS C WHERE C.id IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



