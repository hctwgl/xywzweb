package com.xywz.ware.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.ware.model.XywzWareProdPkgStd;
import com.xywz.ware.service.XywzWareProdPkgStdService;
import com.xywztech.bob.common.CommonAction;



/*
 * 产品包装标准Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzWareProdPkgStdAction")
public class XywzWareProdPkgStdAction extends CommonAction {
	
	@Autowired
	private XywzWareProdPkgStdService service;
	

	
	@Autowired
	public void init() {
		model = new XywzWareProdPkgStd();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzWareProdPkgStd C WHERE C.pkgStdId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



