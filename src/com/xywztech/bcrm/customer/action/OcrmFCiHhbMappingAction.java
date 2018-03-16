package com.xywztech.bcrm.customer.action;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.customer.model.OcrmFCiHhbMapping;
import com.xywztech.bcrm.customer.service.OcrmFCiHhbMappingService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/ocrmFCiHhbMapping-info")
public class OcrmFCiHhbMappingAction extends CommonAction {
	@Autowired
	private OcrmFCiHhbMappingService ocrmFCiHhbMappingService;
	@Autowired
	public void init(){
		model = new OcrmFCiHhbMapping();
		setCommonService(ocrmFCiHhbMappingService);
	}
	
	
	//分页查询;
	public HttpHeaders indexPage() throws Exception{
		try {
			StringBuilder sb=new StringBuilder("select c from OcrmFCiHhbMapping c where 1=1 ");
	    	Map<String,Object> values=new HashMap<String,Object>();
	    	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	        if(request.getParameter("start")!=null)
	        	start = new Integer(request.getParameter("start")).intValue();
	        if(request.getParameter("limit")!=null)
	        	limit = new Integer(request.getParameter("limit")).intValue();
			this.setJson(request.getParameter("condition"));
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

			for(String key:this.getJson().keySet()){
				if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
					if(key.equals("hhbDt")){
						sb.append(" and c.hhbDt = :hhbDt");
	                    values.put("hhbDt", sdf.parse((String)this.getJson().get(key)));
	                } 
	                else{
	                	sb.append(" and c."+key+" = :"+key);
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
