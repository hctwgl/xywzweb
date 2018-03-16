package com.xywztech.bcrm.customer.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.customer.model.AcrmFCiCreditVillage;
import com.xywztech.bcrm.customer.service.CreditVillageQueryService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/creditVillageQuery-info")
public class CreditVillageQueryAction extends CommonAction {
	@Autowired
	private CreditVillageQueryService creditVillageQueryService; 
	@Autowired
	public void init(){
		model = new AcrmFCiCreditVillage();
		setCommonService(creditVillageQueryService);
	}

	//(自定义）批量删除
	@Override
	public String batchDestroy(){
		try {
			ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
			String jql="delete from AcrmFCiCreditVillage c where c.channelId in ("+idStr+")";
			Map<String,Object> values=new HashMap<String,Object>();
			creditVillageQueryService.batchUpdateByName(jql, values);
			addActionMessage("batch removed successfully");
	        return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "failure";
		}
	}
	
	//分页查询
	public HttpHeaders indexPage() throws Exception{
		try {
			StringBuilder sb=new StringBuilder("select c from AcrmFCiCreditVillage c where 1=1 ");
	    	Map<String,Object> values=new HashMap<String,Object>();
	    	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	        if(request.getParameter("start")!=null)
	        	start = new Integer(request.getParameter("start")).intValue();
	        if(request.getParameter("limit")!=null)
	        	limit = new Integer(request.getParameter("limit")).intValue();
			this.setJson(request.getParameter("condition"));

			for(String key:this.getJson().keySet()){
	            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
	            	if(key.equals("year")){
	            		sb.append(" and SUBSTRING(c.etlDate,1,4) = :year");
	            		values.put("year", this.getJson().get(key));
	            	}
	            	else if(key.equals("month")){
	            		sb.append(" and SUBSTRING(c.etlDate,6,2) = :month");
	            		values.put("month", this.getJson().get(key));
	            	}
	            	else if(key.equals("orgId")){
//	            		sb.append(" and c.orgId in ('"+((String)this.getJson().get(key)).replace(";", "','") + "')");
	            		String aa = this.getJson().get(key).toString();
	            		String b  = aa.replace(",", "','");
	            		sb.append(" and c.orgId in ('"+b+"')");
	            	}
//	            	else{
//	            		if(!key.equals("orgId")&&!key.equals("groupHostOrgNoName")){
//	                	sb.append(" and c."+key+" = :"+key);
//	                	values.put(key, this.getJson().get(key));
//	                }
//	            	}
	            }
			}
			
			return super.indexPageByJql(sb.toString(), values);
		} catch (Exception e) {
			e.printStackTrace();
	    	  throw e;
		}
	}
	
	
}
