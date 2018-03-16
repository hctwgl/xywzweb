package com.xywztech.bcrm.customer.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.customer.model.OcrmFCiAttentionCustInfo;
import com.xywztech.bcrm.customer.service.CustConcernService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/custConcernDel")
public class CustConcernDelAction  extends CommonAction{
    @Autowired
    private CustConcernService custConcernService ;
    @Autowired
	public void init(){
	  	model = new OcrmFCiAttentionCustInfo(); 
		setCommonService(custConcernService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}
    
    //（自定义）批量删除
    @Override
	public String batchDestroy(){
 
    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
			String jql="delete from OcrmFCiAttentionCustInfo c where c.id in ("+idStr+")";
			Map<String,Object> values=new HashMap<String,Object>();
			custConcernService.batchUpdateByName(jql, values);
			addActionMessage("batch removed successfully");
	        return "success";

    }
  
}