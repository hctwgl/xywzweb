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
import com.xywztech.bcrm.customer.model.OcrmFCiCustDesc;
import com.xywztech.bcrm.customer.service.OcrmFCiCustDescService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/custDescHhbInfo-info")
public class CustDescHhbInfoAction extends CommonAction {
	@Autowired
	private OcrmFCiCustDescService ocrmFCiCustDescService;
	@Autowired
	public void init(){
		model = new OcrmFCiCustDesc();
		setCommonService(ocrmFCiCustDescService);
	}

	
	
	//分页查询;
	//根据筛选条件，选出相应记录。
	public HttpHeaders indexPage() throws Exception{
		try {
			StringBuilder sb=new StringBuilder("select c from OcrmFCiCustDesc c where 1=1 ");
	    	Map<String,Object> values=new HashMap<String,Object>();
	    	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	        if(request.getParameter("start")!=null)
	        	start = new Integer(request.getParameter("start")).intValue();
	        if(request.getParameter("limit")!=null)
	        	limit = new Integer(request.getParameter("limit")).intValue();
			this.setJson(request.getParameter("condition"));
			
			//加入筛选条件
			for(String key:this.getJson().keySet()){
				if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
					sb.append(" and c."+key+" like '%"+this.getJson().get(key)+"%'");//:"+key);
//	            	values.put(key, this.getJson().get(key));
				}
			}
			//过滤02 已合并客户
			sb.append(" and c.custStat != '02' ");
			
			return super.indexPageByJql(sb.toString(), values);
		} catch (Exception e) {
			e.printStackTrace();
	    	  throw e;
		}
	}
	
	//合并客户信息申请
	public String hbCustInfoApply(){
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		String mergeData = request.getParameter("data");
		String targetData = request.getParameter("selectRecord");
		
		ocrmFCiCustDescService.hbCustInfoApply(mergeData,targetData);
		return "success";
	}
}
