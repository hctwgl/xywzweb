package com.xywz.purc.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.purc.model.XywzPurcProvrMgmtCstFollow;
import com.xywz.purc.service.XywzPurcProvrMgmtCstFollowService;
import com.xywztech.bob.common.CommonAction;



/*
 * 供应商管理客户跟进Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzPurcProvrMgmtCstFollowAction")
public class XywzPurcProvrMgmtCstFollowAction extends CommonAction {
	
	@Autowired
	private XywzPurcProvrMgmtCstFollowService service;//定义XywzPurcProvrMgmtCstFollow属性
	

	
	@Autowired
	public void init() {
		model = new XywzPurcProvrMgmtCstFollow();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzPurcProvrMgmtCstFollow C WHERE C.id IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



