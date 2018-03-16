package com.xywztech.bcrm.custview.action;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custview.model.OcrmFCiComCustInfo;
import com.xywztech.bcrm.custview.service.CustQueryForPubInfoService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/CustQueryForPubInfo")
public class CustQueryForPubInfoAction  extends CommonAction{
    @Autowired
    private CustQueryForPubInfoService custQueryForPubInfoService ;
    @Autowired
	public void init(){
	  	model = new OcrmFCiComCustInfo(); 
		setCommonService(custQueryForPubInfoService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}
    public String save() throws Exception{
    	try{
    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String flag = request.getParameter("flag");
			String s1 = request.getParameter("models");
		    JSONArray jarray = JSONArray.fromObject(s1);

			custQueryForPubInfoService.bathsave(model, flag,jarray);
	        return "success";
    	}catch(Exception e){
    		e.printStackTrace();
    		throw e;
    	}
    }
}