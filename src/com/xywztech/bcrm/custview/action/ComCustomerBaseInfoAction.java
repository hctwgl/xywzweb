package com.xywztech.bcrm.custview.action;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custview.model.OcrmFCiComCustInfo;
import com.xywztech.bcrm.custview.service.ComCustomerBaseInfoService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.crm.exception.BizException;

/**
 * 对公客户基本信息保存
 * @author songxs
 * @since 2012-9-26
 */
@SuppressWarnings("serial")
@Action("/ComCustomerBaseInfo-action")
public class ComCustomerBaseInfoAction extends CommonAction {
	
	//菜单业务操作service
	@Autowired
	private ComCustomerBaseInfoService comCustomerBaseInfoService;
	/**
	 * 修改对公客户基本信息
	 */
	@Autowired
	public void init() {
		model = new OcrmFCiComCustInfo();
		setCommonService(comCustomerBaseInfoService);
	}
	/**
	 * 保存对公客户基本信息调整历史
	 * @return
	 * @throws Exception
	 */
	public String save() throws Exception{
		try{
			ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	        String s1 = request.getParameter("comModel");
	        JSONArray jarray = JSONArray.fromObject(s1);
	        comCustomerBaseInfoService.bathsave(jarray);
    	}catch(Exception e){
    		e.printStackTrace();
			throw new BizException(1,2,"1002",e.getMessage());
    	}
        return "success";

    }

}
