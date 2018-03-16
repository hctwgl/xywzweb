package com.xywz.ware.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.ware.model.XywzWareQualityCheck;
import com.xywz.ware.service.XywzWareQualityCheckService;
import com.xywztech.bob.common.CommonAction;



/*
 * 质量检核Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzWareQualityCheckAction")
public class XywzWareQualityCheckAction extends CommonAction {
	
	@Autowired
	private XywzWareQualityCheckService service;
	

	
	@Autowired
	public void init() {
		model = new XywzWareQualityCheck();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzWareQualityCheck C WHERE C.checkId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
    
	//质检全部合格
    public String checkPass(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String[] ids =idStr.split(",");
		for(int i=0;i<ids.length;i++){
			String id =ids[i];
			service.checkAll(id,"1","全部合格");
			
		}				
        return "success";
    }
	//质检全部不合格
    public String checkNoPass(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String memo=request.getParameter("memo");
		String[] ids =idStr.split(",");
		for(int i=0;i<ids.length;i++){
			String id =ids[i];
			service.checkAll(id,"2",memo);
			
		}				
        return "success";
    }
	//质检部分合格
    public String checkPartPass(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String id = request.getParameter("id");
		String jianCnt = request.getParameter("jianCnt");
		String remZhiCnt = request.getParameter("remZhiCnt");
		String memo=request.getParameter("memo");
		service.checkPart(id,jianCnt,remZhiCnt,memo);						
        return "success";
    }

}



