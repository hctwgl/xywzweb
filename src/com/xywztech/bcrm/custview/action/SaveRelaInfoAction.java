package com.xywztech.bcrm.custview.action;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custview.model.OcrmFCiLoanSave;
import com.xywztech.bcrm.custview.service.SaveRelaInfoService;
import com.xywztech.bob.common.CommonAction;

/**
 * 营销账户关联信息维护
 * @author songxs
 * @since 2012-12-19
 */
@SuppressWarnings("serial")
@Action("/saveRelaInfo-action")
public class SaveRelaInfoAction extends CommonAction {
	
	//菜单业务操作service
	@Autowired
	private SaveRelaInfoService saveRelaInfoService;
	/**
	 * 新增
	 */
	@Autowired
	public void init() {
		model = new OcrmFCiLoanSave();
		setCommonService(saveRelaInfoService);
	}
/***
 * 批量删除证件信息
 */
	@Override
	public String batchDestroy() {
    	try{   
    		ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	        String a =(request.getParameter("id"));
			//long idStr = Long.parseLong((request.getParameter("id")));
			String jql="delete from OcrmFCiLoanSave c where c.id in ("+a+")";
			Map<String,Object> values=new HashMap<String,Object>();
			super.executeUpdate(jql, values);			
    	}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
    }
}