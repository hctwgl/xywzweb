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
import com.xywztech.bcrm.customer.model.OcrmFCiHhbApplyInfo;
import com.xywztech.bcrm.customer.service.OcrmFCiCustDescService;
import com.xywztech.bcrm.customer.service.OcrmFCiHhbApplyInfoService;
import com.xywztech.bcrm.customer.service.OcrmFCiHhbMappingService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/ocrmFCiHhbApplyInfo-info")
public class OcrmFCiHhbApplyInfoAction extends CommonAction {
	@Autowired
	private OcrmFCiHhbApplyInfoService ocrmFCiHhbApplyInfoService;
	@Autowired
	private OcrmFCiCustDescService ocrmFCiCustDescService;
	@Autowired
	private OcrmFCiHhbMappingService ocrmFCiHhbMappingService;
	@Autowired
	public void init(){
		model = new OcrmFCiHhbApplyInfo();
		setCommonService(ocrmFCiHhbApplyInfoService);
	}
	
	
	//分页查询;
	public HttpHeaders indexPage() throws Exception{
		try {
			StringBuilder sb=new StringBuilder("select c from OcrmFCiHhbApplyInfo c where 1=1 ");
	    	Map<String,Object> values=new HashMap<String,Object>();
	    	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	        if(request.getParameter("start")!=null)
	        	start = new Integer(request.getParameter("start")).intValue();
	        if(request.getParameter("limit")!=null)
	        	limit = new Integer(request.getParameter("limit")).intValue();
			this.setJson(request.getParameter("condition"));
			
			//
			for(String key:this.getJson().keySet()){
				if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
					if(key.equals("id")){
						sb.append(" and c.id = :id");
	                    values.put("id", Long.parseLong((String) this.getJson().get(key)));
	                } 
	                else{
	                	sb.append(" and c."+key+" like '%" +this.getJson().get(key)+ "%'");
	                	//values.put(key, this.getJson().get(key));
	                	
	                }
				}
			}
			return super.indexPageByJql(sb.toString(), values);
		} catch (Exception e) {
			e.printStackTrace();
	    	  throw e;
		}
	}
	
	
	//审批通过
	public String approvel() throws Exception{
		try {
			ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
			String hbCustId = request.getParameter("hbCustId");
			
			//修改审批字段状态为“通过”
			//更新统一客户视图表，合并客户编号对应的客户状态为已合并，02
			//产生历史记录
			ocrmFCiHhbApplyInfoService.approvelUpdate(idStr,hbCustId);

			 return "success";
		} catch (Exception e) {
			e.printStackTrace();
    		throw e;
		}
	}
	
	
	//审批不通过
	public String approvelBack() throws Exception{
		try {
			ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
			//修改审批字段状态为“不通过”
			ocrmFCiHhbApplyInfoService.approvelBackUpdate(idStr);

			return "success";
		} catch (Exception e) {
			e.printStackTrace();
    		throw e;
		}
	}
	
}
