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
import com.xywztech.bcrm.custview.model.AcrmFCiCustRale;
import com.xywztech.bcrm.custview.service.CustRelInfoService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/CustRelInfo")
public class CustRelInfoAction  extends CommonAction{
    @Autowired
    private CustRelInfoService custRelInfoService ;
    @Autowired
	public void init(){
	  	model = new AcrmFCiCustRale(); 
		setCommonService(custRelInfoService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}
    
    //（自定义）批量删除
    @Override
	public String batchDestroy(){

    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
			String jql="delete from AcrmFCiCustRale c where c.mxtid in ("+idStr+")";
			Map<String,Object> values=new HashMap<String,Object>();
			custRelInfoService.batchUpdateByName(jql, values);
			addActionMessage("batch removed successfully");
	        return "success";

    }
    //分页查询
    public HttpHeaders indexPage() throws Exception{
      try{	
    	StringBuilder sb=new StringBuilder("select c from AcrmFCiCustRale c where 1=1 ");
    	Map<String,Object> values=new HashMap<String,Object>();
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        if(request.getParameter("start")!=null)
        	start = new Integer(request.getParameter("start")).intValue();
        if(request.getParameter("limit")!=null)
        	limit = new Integer(request.getParameter("limit")).intValue();
		this.setJson(request.getParameter("condition"));
		if(request.getParameter("cust_id") !=null){
			sb.append(" and c.custId ='"+request.getParameter("cust_id")+"'");
			sb.append(" or c.relaCustId='"+request.getParameter("cust_id")+"'");
		}
    	for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("mxtid")){
                    sb.append(" and c.mxtid = :mxtid");
                    values.put("mxtid", Long.parseLong((String) this.getJson().get(key)));
                } else{
                	sb.append(" and c."+key+" = :"+key);
                	values.put(key, this.getJson().get(key));
                }
            }
        }
    	return super.indexPageByJql(sb.toString(), values);
      }catch(Exception e){
    	  e.printStackTrace();
    	  throw e;
      }
	}
    public String saveCustInfo() throws Exception {
         try {
        	 AcrmFCiCustRale acrmFCiCustRale = (AcrmFCiCustRale)model;
        	 ActionContext ctx = ActionContext.getContext();
             request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
             String mxtid = request.getParameter("mxtid");
        		
			 custRelInfoService.saveCustInfo(acrmFCiCustRale);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
         return "success";
    }
}