package com.xywz.purc.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.purc.model.XywzPurcProvrMgmtProduct;
import com.xywz.purc.service.XywzPurcProvrMgmtProductService;
import com.xywztech.bob.common.CommonAction;



/*
 * 外采合同商品信息管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzPurcProvrMgmtProductAction")
public class XywzPurcProvrMgmtProductAction extends CommonAction {
	
	@Autowired
	private XywzPurcProvrMgmtProductService service;//定义XywzPurcProvrMgmtProduct属性
	

	
	@Autowired
	public void init() {
		model = new XywzPurcProvrMgmtProduct();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzPurcProvrMgmtProduct C WHERE C.merchdId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
    
    
	//外采商品提交质检
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
		String jql="update XywzPurcProvrMgmtProduct C set C.purcStatus='02' WHERE C.merchdId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



