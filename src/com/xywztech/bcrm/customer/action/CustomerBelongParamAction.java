package com.xywztech.bcrm.customer.action;

import org.apache.struts2.convention.annotation.Action;

import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.core.CustBelongParamManager;
/**
 * 客户归属参数action
 * @author CHANGZH
 * @since 2013-01-10
 */

@SuppressWarnings("serial")
@Action("/customerBelongParamAction")
public class CustomerBelongParamAction  extends CommonAction{
	
	//private static Logger log = Logger.getLogger(CustomerBelongParamAction.class);
	
	 /***客户归属管理模式*/
	@Override
	public String index()  {		
		String custManagerType = CustBelongParamManager.getInstance().findParamValueByName(CustBelongParamManager.CUST_MANAGER_TYPE);
		this.json.put("json",custManagerType);
        return "success";
    }
	/*
	//通过客户归属参数名取得参数值
	private void findParamValueByName(String paramName)  {		
		String paramValue = CustBelongParamManager.getInstance().findParamValueByName(paramName);
		this.json.put("json",paramValue);
   }
	
	//通过客户归属参数名取得参数值
	private void findParamItemByName(String paramName){  		
		FwSysProp paramObject = CustBelongParamManager.getInstance().findParamItemByName(paramName);
		this.json.put("json",paramObject);
   }
    */   
}