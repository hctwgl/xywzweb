package com.xywz.asst.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.asst.model.XywzAsstMachgCorpMgmt;
import com.xywz.asst.service.XywzAsstMachgCorpMgmtService;
import com.xywztech.bob.common.CommonAction;



/*
 * 外协加工工厂信息管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzAsstMachgCorpMgmtAction")
public class XywzAsstMachgCorpMgmtAction extends CommonAction {
	
	@Autowired
	private XywzAsstMachgCorpMgmtService service;//定义XywzAsstMachgCorpMgmt属性
	

	
	@Autowired
	public void init() {
		model = new XywzAsstMachgCorpMgmt();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzAsstMachgCorpMgmt C WHERE C.asstCorpId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



