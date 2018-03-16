package com.xywz.sale.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.sale.model.XywzSaleCstmDeclPacklist;
import com.xywz.sale.service.XywzSaleCstmDeclPacklistService;
import com.xywztech.bob.common.CommonAction;



/*
 * 内贸商品明细Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzSaleCstmDeclPacklistAction")
public class XywzSaleCstmDeclPacklistAction extends CommonAction {
	
	@Autowired
	private XywzSaleCstmDeclPacklistService service;//定义属性
	

	
	@Autowired
	public void init() {
		model = new XywzSaleCstmDeclPacklist();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzSaleCstmDeclPacklist C WHERE C.cstmPacklistId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



