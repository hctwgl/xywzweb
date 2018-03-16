package com.xywz.logi.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.logi.model.XywzLogiPortInfoMgmt;
import com.xywz.logi.service.XywzLogiPortInfoMgmtService;
import com.xywztech.bob.common.CommonAction;



/*
 * 外协加工产品信息管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzLogiPortInfoMgmtAction")
public class XywzLogiPortInfoMgmtAction extends CommonAction {
	
	@Autowired
	private XywzLogiPortInfoMgmtService service;//定义XywzAsstMachgProduct属性
	

	
	@Autowired
	public void init() {
		model = new XywzLogiPortInfoMgmt();
		setCommonService(service);
	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzLogiPortInfoMgmt C WHERE C.portId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");		
        return "success";
    }
}



