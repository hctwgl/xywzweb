package com.xywztech.bcrm.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.model.OcrmFCiIncproductInfo;
import com.xywztech.bcrm.service.ValueAddProductService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/ValueAddProduct")
public class ValueAddProductAction  extends CommonAction{
    @Autowired
    private ValueAddProductService valueAddProductService ;
    @Autowired
	public void init(){
	  	model = new OcrmFCiIncproductInfo(); 
		setCommonService(valueAddProductService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}
  //（自定义）批量删除
    @Override
	public String batchDestroy(){
    	   	ActionContext ctx = ActionContext.getContext();
    	   	HttpServletRequest request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
			String jql="delete from OcrmFCiIncproductInfo c where c.serverId in ("+idStr+")";
			Map<String,Object> values=new HashMap<String,Object>();
			valueAddProductService.batchUpdateByName(jql, values);
			addActionMessage("batch removed successfully");
	        return "success";
    }
}