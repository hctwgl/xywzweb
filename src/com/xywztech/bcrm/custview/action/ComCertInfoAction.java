package com.xywztech.bcrm.custview.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custview.model.AcrmFCiCertInfo;
import com.xywztech.bcrm.custview.service.ComCertInfoService;
import com.xywztech.bob.common.CommonAction;

/**
 * 对公客户证件信息新增，修改，删除
 * @author songxs
 * @since 2012-10-11
 */
@SuppressWarnings("serial")
@Action("/ComCertInfo-action")
public class ComCertInfoAction extends CommonAction {
	
	//菜单业务操作service
	@Autowired
	private ComCertInfoService comCertInfoService;
	/**
	 * 新增，修改对公客户证件信息
	 */
	@Autowired
	public void init() {
		model = new AcrmFCiCertInfo();
		setCommonService(comCertInfoService);
	}
/***
 * 批量删除证件信息
 */
	@Override
	public String batchDestroy() {
    	try{   
    		ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			long idStr = Long.parseLong((request.getParameter("id")));
			String jql="delete from AcrmFCiCertInfo c where c.id in ("+idStr+")";
			Map<String,Object> values=new HashMap<String,Object>();
			super.executeUpdate(jql, values);			
    	}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
    }
}