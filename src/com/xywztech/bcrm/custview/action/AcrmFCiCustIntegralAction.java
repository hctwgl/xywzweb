package com.xywztech.bcrm.custview.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custview.model.AcrmFCiCustIntegral;
import com.xywztech.bcrm.custview.service.AcrmFCiCustIntegralService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/acrmFCiCustIntegral-info")
public class AcrmFCiCustIntegralAction extends CommonAction {
	@Autowired
	private AcrmFCiCustIntegralService acrmFCiCustIntegralService;
	@Autowired
	public void init(){
		model = new AcrmFCiCustIntegral();
		setCommonService(acrmFCiCustIntegralService);
	}
	
	//分页查询
	public HttpHeaders indexPage() throws Exception{
		try {
			StringBuilder sb=new StringBuilder("select c from AcrmFCiCustIntegral c where 1=1 ");
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
			if(request.getParameter("CUST_TYP")!=null){
				sb.append(" and c.custType = '" + request.getParameter("CUST_TYP")+"'");
			}
			if(request.getParameter("CUST_ZH_NAME")!=null){
				sb.append(" and c.custName like '" + request.getParameter("CUST_ZH_NAME")+"'");
			}
			String integralType = request.getParameter("integralType");
			if(null != integralType && !"".equals(integralType)){
				sb.append(" and c.integralType = " + integralType);	
			}
			
			
//			for(String key:this.getJson().keySet()){
//				if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
//						sb.append(" and c."+key+" = :"+key);
//		            	values.put(key, this.getJson().get(key));
//					
//				}
//			}
			return super.indexPageByJql(sb.toString(), values);
		} catch (Exception e) {
			e.printStackTrace();
	    	  throw e;
		}
	}
}
