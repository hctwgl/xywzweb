package com.xywztech.bcrm.customer.action;


import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.customer.model.AcrmFCiCustScreen;
import com.xywztech.bcrm.customer.service.CustScreenOperService;
import com.xywztech.bob.common.CommonAction;

/**
 * @author zhangmin 客户屏蔽操作
 */
@SuppressWarnings("serial")
@Action("/custScreenOper")
public class CustScreenOperAction  extends CommonAction{

    @Autowired
    private CustScreenOperService custScreenOperService ;
    /***
     * 屏蔽客户
     */
	@Override
	public DefaultHttpHeaders create(){
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String condition=request.getParameter("condition");
		try{
    		String[] strarray = condition.split(",");
    		for (int i = 0; i < strarray.length; i++) {
				String custId = strarray[i];
				model = new AcrmFCiCustScreen(); 
				custScreenOperService.save(model,custId);
    		}
		}catch(Exception e){
    		e.printStackTrace();
    		addActionMessage("New Record created failure");
    	}finally{
    		
    	}
    	return new DefaultHttpHeaders("success");
    }
    /***
     * 取消屏蔽客户
     * @return
     */
	public DefaultHttpHeaders remove(){
	    ActionContext ctx = ActionContext.getContext();
	    request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String condition = request.getParameter("condition");
		custScreenOperService.batchRemove(condition);
		return new DefaultHttpHeaders("success");
    }
}