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
import com.xywztech.bcrm.customer.model.AcrmFCiCreditVillageArea;
import com.xywztech.bcrm.customer.service.AcrmFCiCreditVillageAreaService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/acrmFCiCreditVillageArea")
public class AcrmFCiCreditVillageAreaAction extends CommonAction {
	@Autowired
	private AcrmFCiCreditVillageAreaService acrmFCiCreditVillageAreaService;
	@Autowired
	public void init(){
		model = new AcrmFCiCreditVillageArea();
		setCommonService(acrmFCiCreditVillageAreaService);
	}
	
	//分页查询
	public HttpHeaders indexPage() throws Exception{
		try {
			StringBuilder sb=new StringBuilder("select c from AcrmFCiCreditVillageArea c where 1=1 ");
	    	Map<String,Object> values=new HashMap<String,Object>();
	    	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	        if(request.getParameter("start")!=null)
	        	start = new Integer(request.getParameter("start")).intValue();
	        if(request.getParameter("limit")!=null)
	        	limit = new Integer(request.getParameter("limit")).intValue();
			this.setJson(request.getParameter("condition"));
			
			//获取客户编号
			if(request.getParameter("cust_id")!=null){
				sb.append(" and c.custId = '" + request.getParameter("cust_id")+"'");
			}
			
			for(String key:this.getJson().keySet()){
				if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
					if(key.equals("villaName")){
		                 sb.append(" and c.villaName like "+"'%"+(String)this.getJson().get(key)+"%'");
		            }else{
						sb.append(" and c."+key+" like :"+key);
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
	
	//（自定义）批量删除
    @Override
	public String batchDestroy(){
    	try{
    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
			String jql="delete from AcrmFCiCreditVillageArea c where c.villaNo in ('"+idStr+"')";
			Map<String,Object> values=new HashMap<String,Object>();
			acrmFCiCreditVillageAreaService.batchUpdateByName(jql, values);
			addActionMessage("batch removed successfully");
	        return "success";
    	}catch(Exception e){
    		e.printStackTrace();
    		return "failure";
    	}
    }
}
