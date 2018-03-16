package com.xywztech.bcrm.custview.action;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custview.model.AcrmFCiCustIntegralChange;
import com.xywztech.bcrm.custview.service.AcrmFCiCustIntegralChangeService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.vo.AuthUser;

@SuppressWarnings("serial")
@Action("/acrmFCiCustIntegralChange")
public class AcrmFCiCustIntegralChangeAction extends CommonAction {
	
	@Autowired
	private AcrmFCiCustIntegralChangeService acrmFCiCustIntegralChangeService;
	@Autowired
	public void init(){
		model = new AcrmFCiCustIntegralChange();
		setCommonService(acrmFCiCustIntegralChangeService);
	}
	//分页查询
	public HttpHeaders indexPage() throws Exception{
		try {
			StringBuilder sb=new StringBuilder("select c from AcrmFCiCustIntegralChange c where 1=1 ");
	    	Map<String,Object> values=new HashMap<String,Object>();
	    	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	        if(request.getParameter("start")!=null)
	        	start = new Integer(request.getParameter("start")).intValue();
	        if(request.getParameter("limit")!=null)
	        	limit = new Integer(request.getParameter("limit")).intValue();
	        
			this.setJson(request.getParameter("condition"));
			
			//获取客户编号
			if(request.getParameter("custId")!=null){
				sb.append(" and c.custId = '" + request.getParameter("custId")+"'");
			}
			for(String key:this.getJson().keySet()){
				if(null != this.getJson().get(key) && !this.getJson().get(key).equals("")){
					sb.append(" and c."+key+" = :"+key);
					if(key.equalsIgnoreCase("id")){
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
	@Override
	public DefaultHttpHeaders create() {
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		AcrmFCiCustIntegralChange entry = (AcrmFCiCustIntegralChange)model;
		if(entry.getId() == null){
			entry.setHandler(auth.getUserId());
			entry.setHandleTime(new Date());
		}
		return super.create();
	}
	/*public String batchDestroy(){
		ActionContext ctx = ActionContext.getContext();
	    request           = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
		String      idStr = request.getParameter("idStr");
		String        jql = "delete from FwSysProp p where p.id in (" + idStr + ")";
		Map<String,Object> values = new HashMap<String,Object>();
		acrmFCiCustIntegralChangeService.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		return "";
	}*/
}
