package com.xywz.purc.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.purc.model.XywzPurcProvrMgmtCust;
import com.xywz.purc.service.XywzPurcProvrMgmtCustService;
import com.xywztech.bob.common.CommonAction;



/*
 * 供应商信息管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzPurcProvrMgmtCustAction")
public class XywzPurcProvrMgmtCustAction extends CommonAction {
	
	@Autowired
	private XywzPurcProvrMgmtCustService service;//定义XywzPurcProvrMgmtCust属性
	

	
	@Autowired
	public void init() {
		model = new XywzPurcProvrMgmtCust();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzPurcProvrMgmtCust C WHERE C.provrId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



