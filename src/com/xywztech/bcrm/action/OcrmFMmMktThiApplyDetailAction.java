package com.xywztech.bcrm.action;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.model.OcrmFMmMktThiApplyDetail;
import com.xywztech.bcrm.service.OcrmFMmMktThiApplyDetailService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("OcrmFMmMktThiApplyDetail-info")
public class OcrmFMmMktThiApplyDetailAction  extends CommonAction{
    @Autowired
    private OcrmFMmMktThiApplyDetailService ocrmFMmMktThiApplyDetailService ;
    @Autowired
	public void init(){
	  	model = new OcrmFMmMktThiApplyDetail(); 
		setCommonService(ocrmFMmMktThiApplyDetailService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}
    
    public HttpHeaders indexPage() throws Exception{
		try{	
	    	StringBuilder sb=new StringBuilder("select c from OcrmFMmMktThiApplyDetail c where 1=1 ");
	    	Map<String,Object> values=new HashMap<String,Object>();
	    	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	        if(request.getParameter("start")!=null)
	        	start = new Integer(request.getParameter("start")).intValue();
	        if(request.getParameter("limit")!=null)
	        	limit = new Integer(request.getParameter("limit")).intValue();
			String condition = (request.getParameter("condition"));
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			if(condition!=null){
			values.put("applyId", Long.parseLong(condition));
			sb.append(" and c.applyId = :applyId");
			}
	    	return super.indexPageByJql(sb.toString(), values);
	      }catch(Exception e){
	    	  e.printStackTrace();
	    	  throw e;
	      }
    }
    public String thiDetailSave(){
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
//        String applyId = request.getParameter("applyId");
      	String applyNum = request.getParameter("applyNumshow");
    	String approveNum = request.getParameter("approveNumshow");
    	String mktActivityId = request.getParameter("mktActivityIdshow");
    	String mktMaterial = request.getParameter("mktMaterialshow");
    	String mktActivityNum=request.getParameter("mktActivityNum");
    	//主申请表字段
    	String commWay=request.getParameter("commWay");
    	String mktActivityName=request.getParameter("mktActivityNameshow");
//    	JSONObject jsonObject =JSONObject.fromObject(applyId);
//	   	 JSONArray jarray =  jsonObject.getJSONArray("applyId");
	   	 JSONObject jsonObject2 =JSONObject.fromObject(applyNum);
	   	 JSONArray jarray2 =  jsonObject2.getJSONArray("applyNum");
	   	 JSONObject jsonObject3 =JSONObject.fromObject(approveNum);
	   	 JSONArray jarray3 =  jsonObject3.getJSONArray("approveNum");
	   	 JSONObject jsonObject4 =JSONObject.fromObject(mktActivityId);
	   	 JSONArray jarray4 =  jsonObject4.getJSONArray("mktActivityId");
	   	 JSONObject jsonObject5 =JSONObject.fromObject(mktMaterial);
	   	 JSONArray jarray5 =  jsonObject5.getJSONArray("mktMaterial");
	   	 
	   	 ocrmFMmMktThiApplyDetailService.save(commWay,mktActivityName,mktActivityNum);
	   	 ocrmFMmMktThiApplyDetailService.batchSave(jarray2,jarray3,jarray4,jarray5);
   	

    	return "success";
    }
    
    

    public String thiDetailSave1(){
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String applyId = request.getParameter("applyIdshow");
      	String applyNum = request.getParameter("applyNumshow");
    	String approveNum = request.getParameter("approveNumshow");
    	String mktActivityId = request.getParameter("mktActivityIdshow");
    	String mktMaterial = request.getParameter("mktMaterialshow");
    	String recordeId = request.getParameter("recordeIdshow");
    	JSONObject jsonObject =JSONObject.fromObject(applyId);
	   	 JSONArray jarray =  jsonObject.getJSONArray("applyId");
	   	 JSONObject jsonObject2 =JSONObject.fromObject(applyNum);
	   	 JSONArray jarray2 =  jsonObject2.getJSONArray("applyNum");
	   	 JSONObject jsonObject3 =JSONObject.fromObject(approveNum);
	   	 JSONArray jarray3 =  jsonObject3.getJSONArray("approveNum");
	   	 JSONObject jsonObject4 =JSONObject.fromObject(mktActivityId);
	   	 JSONArray jarray4 =  jsonObject4.getJSONArray("mktActivityId");
	   	 JSONObject jsonObject5 =JSONObject.fromObject(mktMaterial);
	   	 JSONArray jarray5 =  jsonObject5.getJSONArray("mktMaterial");
	   	 JSONObject jsonObject6 =JSONObject.fromObject(recordeId);
	   	 JSONArray jarray6 =  jsonObject6.getJSONArray("recordeId");
	   	 
	   	 ocrmFMmMktThiApplyDetailService.batchSave1(jarray,jarray2,jarray3,jarray4,jarray5,jarray6);
   	

    	return "success";
    }
    
    
}