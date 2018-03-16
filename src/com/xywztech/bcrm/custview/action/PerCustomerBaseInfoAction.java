package com.xywztech.bcrm.custview.action;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custview.model.OcrmFCiPerCustInfo;
import com.xywztech.bcrm.custview.service.PerCustomerBaseInfoService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.crm.exception.BizException;

/**
 * 对私客户基本信息保存
 * @author 2012
 * @since 2012-10-10
 */
@SuppressWarnings("serial")
@Action("/PerCustomerBaseInfo-Action")
public class PerCustomerBaseInfoAction extends CommonAction {
	
	//对私客户基本信息操作service
	@Autowired
	private PerCustomerBaseInfoService perCustomerBaseInfoService;
	
	/**
	 * 修改对私客户基本信息
	 */
	@Autowired
	public void init() {
		model = new OcrmFCiPerCustInfo();
		setCommonService(perCustomerBaseInfoService);
	}
	/**
	 * 对私客户基本信息调整历史
	 * @return
	 * @throws Exception
	 */
    public String save() throws Exception{
    	try{
    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String s1 = request.getParameter("perModel");
		    JSONArray jarray = JSONArray.fromObject(s1);
		    perCustomerBaseInfoService.bathsave(jarray);
    	}catch(Exception e){
    		e.printStackTrace();
			throw new BizException(1,2,"1002",e.getMessage());
    	}
        return "success";

    }
}
