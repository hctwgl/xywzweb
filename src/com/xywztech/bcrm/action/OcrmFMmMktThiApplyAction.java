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
import com.xywztech.bcrm.model.OcrmFMmMktThiApply;
import com.xywztech.bcrm.service.OcrmFMmMktThiApplyService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.vo.AuthUser;

@SuppressWarnings("serial")
@Action("OcrmFMmMktThiApply-info")
public class OcrmFMmMktThiApplyAction  extends CommonAction{
    @Autowired
    private OcrmFMmMktThiApplyService ocrmFMmMktThiApplyService ;
    @Autowired
	public void init(){
	  	model = new OcrmFMmMktThiApply(); 
		setCommonService(ocrmFMmMktThiApplyService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}
    
    public void approve(){
    	OcrmFMmMktThiApply ocrmFMmMktThiApply = (OcrmFMmMktThiApply)model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	Map<String,Object> values=new HashMap<String,Object>();
    	ActionContext ctx= ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String applyId = request.getParameter("applyId");
        String currenUserId = auth.getUserId();
        Date date = new Date(); 
   	 	 values.put("approveStat", "通过");
    	 values.put("date",date);
    	 values.put("currenUserId", currenUserId);
    	 values.put("applyId",Long.valueOf(applyId));
    	 
    	StringBuilder sb=new StringBuilder("UPDATE OcrmFMmMktThiApply c SET c.approveStat = :approveStat,c.actiDate =:date,c.actiUser=:currenUserId  where c.applyId=:applyId ");

    	ocrmFMmMktThiApplyService.batchUpdateByName(sb.toString(), values);
    }
    
    
    public void reject(){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	Map<String,Object> values=new HashMap<String,Object>();
    	ActionContext ctx= ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String applyId = request.getParameter("applyId");
        String currenUserId = auth.getUserId();
        Date date = new Date(); 
   	 	 values.put("approveStat", "拒绝");
    	 values.put("date",date);
    	 values.put("currenUserId", currenUserId);
    	 values.put("applyId",Long.valueOf(applyId));
    	 
    	StringBuilder sb=new StringBuilder("UPDATE OcrmFMmMktThiApply c SET c.approveStat = :approveStat,c.actiDate =:date,c.actiUser=:currenUserId  where c.applyId=:applyId ");

    	ocrmFMmMktThiApplyService.batchUpdateByName(sb.toString(), values);
    }
    public void feedBack(){
    	Map<String,Object> values=new HashMap<String,Object>();
    	ActionContext ctx= ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String applyId = request.getParameter("applyId");
    	String useEffectFeedback = request.getParameter("useEffectFeedback");
    	 values.put("applyId",Long.valueOf(applyId));
    	 values.put("useEffectFeedback",useEffectFeedback);
    	StringBuilder sb=new StringBuilder("UPDATE OcrmFMmMktThiApply c SET c.useEffectFeedback = :useEffectFeedback where c.applyId=:applyId ");
    	ocrmFMmMktThiApplyService.batchUpdateByName(sb.toString(), values);
    }
    public HttpHeaders indexPage() throws Exception{
		try{	
	    	StringBuilder sb=new StringBuilder("select c from OcrmFMmMktThiApply c where 1=1 ");
	    	Map<String,Object> values=new HashMap<String,Object>();
	    	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	        if(request.getParameter("start")!=null)
	        	start = new Integer(request.getParameter("start")).intValue();
	        if(request.getParameter("limit")!=null)
	        	limit = new Integer(request.getParameter("limit")).intValue();
			String condition = (request.getParameter("condition"));
			String conApplyId = (request.getParameter("applyId"));
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			if(condition!=null&&!condition.equals("")){
			values.put("mktActiId", Long.parseLong(condition));
			sb.append(" and c.mktActiId = :mktActiId");
			}
			if(conApplyId!=null&&!conApplyId.equals("")){
			values.put("applyId", Long.parseLong(conApplyId));
			sb.append(" and c.applyId = :applyId");
			}
	    	return super.indexPageByJql(sb.toString(), values);
	      }catch(Exception e){
	    	  e.printStackTrace();
	    	  throw e;
	      }
    }
}