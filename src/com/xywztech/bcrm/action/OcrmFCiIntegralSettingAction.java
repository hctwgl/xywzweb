package com.xywztech.bcrm.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.model.OcrmFCiIntegralSetting;
import com.xywztech.bcrm.service.OcrmFCiIntegralSettingService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/ocrmFCiIntegralSetting-info")
public class OcrmFCiIntegralSettingAction extends CommonAction {
	@Autowired
	private OcrmFCiIntegralSettingService ocrmFCiIntegralSettingService;
	@Autowired
	public void init(){
		model = new OcrmFCiIntegralSetting();
		setCommonService(ocrmFCiIntegralSettingService);
	}
	
	//分页查询
	public HttpHeaders indexPage() throws Exception{
		try {
			StringBuilder sb=new StringBuilder("select c from OcrmFCiIntegralSetting c where 1=1 ");
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
					if(key.equals("id")){
						sb.append(" and c.id = :id");
						values.put("id", Long.parseLong((String) this.getJson().get(key)));
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
