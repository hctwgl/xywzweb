package com.xywz.cust.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.cust.model.XywzCustCustContact;
import com.xywz.cust.service.XywzCustContactService;
import com.xywztech.bob.common.CommonAction;



/*
 * 银行管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzCustCustContactAction")
public class XywzCustCustContactAction extends CommonAction {
	
	@Autowired
	private XywzCustContactService service;//定义XywzParaBank属性
	

	
	@Autowired
	public void init() {
		model = new XywzCustCustContact();
		setCommonService(service);
	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzCustCustContact C WHERE C.custContcrId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");		
        return "success";
    }
}