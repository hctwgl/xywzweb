package com.xywztech.bcrm.custmanager.action;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custmanager.model.OcrmFCmStudyInfo;
import com.xywztech.bcrm.custmanager.service.CustomerManagerLearningService;
import com.xywztech.bob.common.CommonAction;


@SuppressWarnings("serial")
@Action("/customerManagerLearning")
public class CustomerManagerLearningAction  extends CommonAction{
    @Autowired
    private CustomerManagerLearningService customerManagerLearningService ;
    @Autowired
	public void init(){
	  	model = new OcrmFCmStudyInfo(); 
		setCommonService(customerManagerLearningService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		//needLog=true;
	}
  //（自定义）批量删除
    @Override
	public String batchDestroy(){

    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr =request.getParameter("idStr");
			
			String jql="delete from OcrmFCmStudyInfo c where c.id in ("+idStr+")";
			Map<String,Object> values=new HashMap<String,Object>();
			customerManagerLearningService.batchUpdateByName(jql, values);
			addActionMessage("batch removed successfully");
	        return "success";

    }

    //分页查询
    public HttpHeaders indexPage() throws Exception{
      try{	
    	StringBuilder sb=new StringBuilder("select c from OcrmFCmStudyInfo c where 1=1 ");
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
                if(key.equals("custManagerId")){
                    sb.append("and c.custManagerId like :custManagerId");
                    values.put("custManagerId", "%"+(String)this.getJson().get(key)+"%");
                }
                else if(key.equals("custManagerName")){
                    sb.append("and c.custManagerName like :custManagerName");
                    values.put("custManagerName", "%"+(String)this.getJson().get(key)+"%");
                }
                else if(key.equals("FR_DATE")){
                    sb.append(" and c.FR_DATE >=:FR_DATE");
                    values.put("FR_DATE", sdf.parse((String)this.getJson().get(key)));
                }
                    
                else if(key.equals("TO_DATE")){
                    sb.append(" and c.TO_DATE <= :TO_DATE");
                    values.put("TO_DATE",  sdf.parse((String)this.getJson().get(key)));
                } 
                else if(key.equals("id")){
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
      }catch(Exception e){
    	  e.printStackTrace();
    	  throw e;
      }
	}
    //自定义查询
//    public HttpHeaders query() throws Exception{
//      try{	
//    	StringBuilder sb=new StringBuilder("select c from ChannelInfo c where 1=1 ");
//    	Map<String,Object> values=new HashMap<String,Object>();
//    	ActionContext ctx = ActionContext.getContext();
//        request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
//        //获取查询条件，查询条件用condition封装
//        this.setJson(request.getParameter("condition"));
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//    	for(String key:this.getJson().keySet()){
//            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
//                if(key.equals("channelName")){
//                    sb.append("and c.channelName like :channelName");
//                    values.put("channelName", "%"+(String)this.getJson().get(key)+"%");
//                }
//                else if(key.equals("createDateS")){
//                    sb.append(" and c.createDate >= :createDateS" );
//                    
//                    //Date date = sdf.parse("2008-08-08");
//
//                    values.put("createDateS", sdf.parse((String)this.getJson().get(key)));
//                }	
//                else if(key.equals("createDateE")){
//                    sb.append(" and c.createDate <= :createDateE");
//                    values.put("createDateE", sdf.parse((String)this.getJson().get(key)));
//                    
//                }    
//                else if(key.equals("channelId")){
//                    sb.append(" and c.channelId = :channelId");
//                    values.put("channelId", Long.parseLong((String) this.getJson().get(key)));
//                } 
//                else{
//                	sb.append(" and c."+key+" = :"+key);
//                	values.put(key, this.getJson().get(key));
//                	
//                }
//            }
//        }
//    	return super.indexByJql(sb.toString(), values);
//      }catch(Exception e){
//    	  e.printStackTrace();
//    	  throw e;
//      }
//	}
    
}