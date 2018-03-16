package com.xywz.sale.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.sale.model.XywzSaleLabelMgmt;
import com.xywz.sale.service.XywzSaleLabelMgmtService;
import com.xywztech.bob.common.CommonAction;



/*
 * 标签管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzSaleLabelMgmtAction")
public class XywzSaleLabelMgmtAction extends CommonAction {
	
	@Autowired
	private XywzSaleLabelMgmtService service;//定义属性
	

	
	@Autowired
	public void init() {
		model = new XywzSaleLabelMgmt();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzSaleLabelMgmt C WHERE C.labelId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



