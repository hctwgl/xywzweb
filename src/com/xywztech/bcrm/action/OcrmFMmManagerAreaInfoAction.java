package com.xywztech.bcrm.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.model.OcrmFMmManagerAreaInfo;
import com.xywztech.bcrm.service.OcrmFMmManagerAreaInfoService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.vo.AuthUser;

@SuppressWarnings("serial")
@Action("/OcrmFMmManagerAreaInfo-info")
public class OcrmFMmManagerAreaInfoAction extends CommonAction{
	@Autowired
	private OcrmFMmManagerAreaInfoService ocrmFMmManagerAreaInfoService;
	@Autowired
	public void init(){
		model = new OcrmFMmManagerAreaInfo();
		setCommonService(ocrmFMmManagerAreaInfoService);
	}
	
	public String mgrAreaSave(){
		
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      	String areaId = request.getParameter("areaId");
      	String areaName = request.getParameter("areaName");
      	String custId = request.getParameter("custId");
      	
      	OcrmFMmManagerAreaInfo ocrmFMmManagerAreaInfo = new OcrmFMmManagerAreaInfo();
      	ocrmFMmManagerAreaInfo.setAreaId(areaId);
      	ocrmFMmManagerAreaInfo.setCustId(custId);
      	ocrmFMmManagerAreaInfo.setCreateDate(new Date());
      	ocrmFMmManagerAreaInfo.setCreateUser(auth.getUserId());
	   	 ocrmFMmManagerAreaInfoService.save(ocrmFMmManagerAreaInfo);   	

    	return "success";		
	}
	
	 //分页查询
    public HttpHeaders indexPage() throws Exception{
      try{	
    	StringBuilder sb=new StringBuilder("select c from OcrmFMmManagerAreaInfo c where 1=1 ");
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
                if(key.equals("custId")){
                    sb.append("and c.custId = :custId");
                    values.put("custId",this.getJson().get(key));
                }
            }
        }
    	return super.indexPageByJql(sb.toString(), values);
      }catch(Exception e){
    	  e.printStackTrace();
    	  throw e;
      }
	}
    
}
