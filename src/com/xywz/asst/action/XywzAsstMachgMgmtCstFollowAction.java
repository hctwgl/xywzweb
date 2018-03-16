package com.xywz.asst.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.asst.model.XywzAsstMachgMgmtCstFollow;
import com.xywz.asst.service.XywzAsstMachgMgmtCstFollowService;
import com.xywztech.bob.common.CommonAction;



/*
 * 外协加工工厂客户跟进Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzAsstMachgMgmtCstFollowAction")
public class XywzAsstMachgMgmtCstFollowAction extends CommonAction {
	
	@Autowired
	private XywzAsstMachgMgmtCstFollowService service;//定义XywzAsstMachgMgmtCstFollow属性
	

	
	@Autowired
	public void init() {
		model = new XywzAsstMachgMgmtCstFollow();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzAsstMachgMgmtCstFollow C WHERE C.id IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



