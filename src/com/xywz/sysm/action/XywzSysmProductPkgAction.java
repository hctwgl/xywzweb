package com.xywz.sysm.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.sysm.model.XywzSysmProductPkg;
import com.xywz.sysm.service.XywzSysmProductPkgService;
import com.xywztech.bob.common.CommonAction;



/*
 * 外协加工产品信息管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzSysmProductPkgAction")
public class XywzSysmProductPkgAction extends CommonAction {
	
	@Autowired
	private XywzSysmProductPkgService service;//定义XywzAsstMachgProduct属性
	

	
	@Autowired
	public void init() {
		model = new XywzSysmProductPkg();
		setCommonService(service);
	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		System.out.println("idStr::::::::::::::"+idStr);
		String jql="DELETE FROM XywzSysmProductPkg C WHERE C.pkgId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");		
        return "success";
    }
}



