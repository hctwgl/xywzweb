package com.xywz.purc.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.purc.model.XywzPurcProvrMgmtBank;
import com.xywz.purc.service.XywzPurcProvrMgmtBankService;
import com.xywztech.bob.common.CommonAction;



/*
 * 供应商银行信息管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzPurcProvrMgmtBankAction")
public class XywzPurcProvrMgmtBankAction extends CommonAction {
	
	@Autowired
	private XywzPurcProvrMgmtBankService service;//定义XywzPurcProvrMgmtBank属性
	

	
	@Autowired
	public void init() {
		model = new XywzPurcProvrMgmtBank();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzPurcProvrMgmtBank C WHERE C.id IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



