package com.xywz.acct.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.acct.model.XywzAcctStmtMgmt;
import com.xywz.acct.service.XywzAcctStmtMgmtService;
import com.xywztech.bob.common.CommonAction;



/*
 * 账务对账单管理Action
 * @author 
 * @since 
 */


@SuppressWarnings("serial")
@Action("/XywzAcctStmtMgmtAction")
public class XywzAcctStmtMgmtAction extends CommonAction {
	
	@Autowired
	private XywzAcctStmtMgmtService service;//定义XywzAcctStmtMgmt属性
	

	
	@Autowired
	public void init() {
		model = new XywzAcctStmtMgmt();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzAcctStmtMgmt C WHERE C.id IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



