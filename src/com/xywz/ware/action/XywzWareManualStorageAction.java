package com.xywz.ware.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.ware.model.XywzWareManualStorage;
import com.xywz.ware.service.XywzWareManualStorageService;
import com.xywztech.bob.common.CommonAction;



/*
 * 手动入库信息表Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzWareManualStorageAction")
public class XywzWareManualStorageAction extends CommonAction {
	
	@Autowired
	private XywzWareManualStorageService service;
	

	
	@Autowired
	public void init() {
		model = new XywzWareManualStorage();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzWareManualStorage C WHERE C.storeId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
    
	//手动入库提交质检
    public String submitCheck(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String[] ids =idStr.split(",");
		for(int i=0;i<ids.length;i++){
			String id =ids[i];
			service.submitCheck(id);
			
		}				
        return "success";
    }
    
    public String updateStatus(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="update XywzWareManualStorage C set C.storeStatus='02' WHERE C.storeId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



