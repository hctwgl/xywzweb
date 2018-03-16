package com.xywz.asst.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.asst.model.XywzAsstMachgContcrMgmt;
import com.xywz.asst.service.XywzAsstMachgContcrMgmtService;
import com.xywztech.bob.common.CommonAction;



/*
 * 外协加工工厂联系人Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzAsstMachgContcrMgmtAction")
public class XywzAsstMachgContcrMgmtAction extends CommonAction {
	
	@Autowired
	private XywzAsstMachgContcrMgmtService service;//定义XywzAsstMachgContcrMgmt属性
	

	
	@Autowired
	public void init() {
		model = new XywzAsstMachgContcrMgmt();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzAsstMachgContcrMgmt C WHERE C.contcrId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



