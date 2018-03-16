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
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custmanager.model.OcrmFCmAbsentInfo;
import com.xywztech.bcrm.custmanager.service.OcrmFCmAbsentInfoService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.vo.AuthUser;


@SuppressWarnings("serial")
@Action("/ocrmFCmAbsentInfo")
public class OcrmFCmAbsentInfoAction  extends CommonAction{
    @Autowired
    private OcrmFCmAbsentInfoService ocrmFCmAbsentInfoService ;
    @Autowired
	public void init(){
	  	model = new OcrmFCmAbsentInfo(); 
		setCommonService(ocrmFCmAbsentInfoService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		//needLog=true;
	}
  //（自定义）批量删除
    @Override
	public String batchDestroy(){
    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr =request.getParameter("idStr");
			
			String jql="delete from OcrmFCmAbsentInfo c where c.id in ("+idStr+")";
			Map<String,Object> values=new HashMap<String,Object>();
			ocrmFCmAbsentInfoService.batchUpdateByName(jql, values);
			addActionMessage("batch removed successfully");
	        return "success";
    }

    //分页查询
    public HttpHeaders indexPage() throws Exception{
      try{	
    	StringBuilder sb=new StringBuilder("select c from OcrmFCmAbsentInfo c where 1=1 ");
    	Map<String,Object> values=new HashMap<String,Object>();
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String id = request.getParameter("id");
        if (id!=null&&!id.equals("")) {
			sb.append(" and c.id = "+Long.parseLong(id )+" ");
		}
        if(request.getParameter("start")!=null)
        	start = new Integer(request.getParameter("start")).intValue();
        if(request.getParameter("limit")!=null)
        	limit = new Integer(request.getParameter("limit")).intValue();
		this.setJson(request.getParameter("condition"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("userName")){
                    sb.append(" and c.userName like :userName ");
                    values.put("userName", "%"+(String)this.getJson().get(key)+"%");
                }
               
                else if(key.equals("absentKind")){
                    sb.append(" and c.absentKind = :absentKind ");
                    values.put("absentKind", this.getJson().get(key));
                } 
                else if(key.equals("id")){
                    sb.append(" and c.id = :id ");
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
    
    /**
	 * 发起工作流
	 * */
	public void initFlow() throws Exception{
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
		String userId = auth.getUserId();
		String orgId = auth.getUnitId();
		String userName = auth.getUsername();
	  	ActionContext ctx = ActionContext.getContext();
		 request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String requestId =  request.getParameter("instanceid");
		String instanceid = "REQ_"+requestId;//此处为组装流程实例号，通过自定义标识加上业务主键id组装，在流程办理时候可以通过截取业务id查询业务信息
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		  String date = format.format(new java.util.Date()).toString();
		  String jobName = userName+"_客户经理请假_"+date;//自定义流程名称
		  ocrmFCmAbsentInfoService.initWorkflowByWfidAndInstanceid("3", jobName, null, instanceid);//调用CommonService中的该方法发起工作流，第三个参数可以自定义一些变量，用于路由器条件等
		  Long idLong = new Long(Integer.parseInt(requestId));
		  ocrmFCmAbsentInfoService.setStatus(idLong);
	}
	
	   /**
	 * 流程提交
	 * */
	public void initFlowJob() throws Exception{
	  	ActionContext ctx = ActionContext.getContext();
		 request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String instanceid = "REQ_"+request.getParameter("instanceid");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		  ocrmFCmAbsentInfoService.wfCompleteJob(instanceid, "3_a10", "3_c6", null, null);
	}
    
}