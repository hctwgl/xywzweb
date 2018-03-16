package com.xywztech.bcrm.serviceManage.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.serviceManage.model.OcrmFCustBusinessApply;
import com.xywztech.bcrm.serviceManage.service.CustBusinessApplyService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/custBusinessApply")
public class CustBusinessApplyAction extends CommonAction {
	@Autowired
	private CustBusinessApplyService service;
	@Autowired
	public void init() {
		model = new OcrmFCustBusinessApply();
		setCommonService(service);
	}
	//分页查询
	public HttpHeaders indexPage() throws Exception{
		try {
			ActionContext ctx = ActionContext.getContext();
			request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			this.setJson(request.getParameter("condition"));
			
			StringBuilder sb = new StringBuilder("select c from OcrmFCustBusinessApply c where 1=1 ");
	    	Map<String,Object> values=new HashMap<String,Object>();
	        if(request.getParameter("start")!=null)
	        	start = new Integer(request.getParameter("start")).intValue();
	        if(request.getParameter("limit")!=null)
	        	limit = new Integer(request.getParameter("limit")).intValue();
		
			//获取客户编号
	        String custId = request.getParameter("custId");
		 	if(null != custId && !"".equals(custId)){
		 		String key = "custId";
		 		sb.append(" and c."+key+" = :"+key);
		 		values.put(key, custId);
		 	}
	    	for(String key:this.getJson().keySet()){
				if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
					sb.append(" and c."+key+" = :"+key);
	            	if("id".equalsIgnoreCase(key)){
	            		values.put(key, Integer.parseInt(this.getJson().get(key).toString()));
	            	}else{
	            		values.put(key, this.getJson().get(key));
	            	}
				}
			}
			return super.indexPageByJql(sb.toString(), values);
		} catch (Exception e) {
			e.printStackTrace();
	    	  throw e;
		}
	}
	
}
