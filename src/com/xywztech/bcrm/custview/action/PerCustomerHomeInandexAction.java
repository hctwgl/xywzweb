package com.xywztech.bcrm.custview.action;

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
import com.xywztech.bcrm.custview.model.AcrmFCiHomeInandex;
import com.xywztech.bcrm.custview.service.PerCustomerHomeInandexService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/perCustomerHomeInandex-info")
public class  PerCustomerHomeInandexAction extends CommonAction{
    @Autowired
    private PerCustomerHomeInandexService perCustomerHomeInandexService ;
    @Autowired
	public void init(){
	  	model = new AcrmFCiHomeInandex(); 
		setCommonService(perCustomerHomeInandexService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		//needLog=true;
	}
  //（自定义）批量删除
    @Override
	public String batchDestroy(){
    		//system.out.printlnln("===========================");
    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
	//system.out.printlnntln("-----------"+idStr+"----------------");
			String jql="delete from AcrmFCiHomeInandex c where c.id in ("+idStr+")";
			Map<String,Object> values=new HashMap<String,Object>();
			perCustomerHomeInandexService.batchUpdateByName(jql, values);
			addActionMessage("batch removed successfully");
	        return "success";
    }
 
    //分页查询
    public HttpHeaders indexPage()  throws Exception{
      try{	
//    	  AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
//          Long managerId = auth.getXtStaffId();
//          Long jgdm=auth.getXtUnitId();
    	StringBuilder sb=new StringBuilder("select c from AcrmFCiHomeInandex c where 1=1 ");
    	Map<String,Object> values=new HashMap<String,Object>();
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        
        if(request.getParameter("cust_id")!=null){
			sb.append(" and c.custId = '"+request.getParameter("cust_id")+"'"  );
		}
        
        if(request.getParameter("start")!=null)
        	start = new Integer(request.getParameter("start")).intValue();
        if(request.getParameter("limit")!=null)
        	limit = new Integer(request.getParameter("limit")).intValue();
		this.setJson(request.getParameter("condition"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("custName")){
                    sb.append("and c.borrowerName like :custName");
                    values.put("custName", "%"+(String)this.getJson().get(key)+"%");
                }
                else if(key.equals("institution")){
                    sb.append(" and c.institution like :institution" );
                    values.put("institution", "%"+(String)this.getJson().get(key)+"%");
               }	
                else if(key.equals("tenLevelStat")){
                    sb.append(" and c.tenLevelStat like :tenLevelStat");
                    values.put("tenLevelStat", "%"+(String)this.getJson().get(key)+"%");
                    
                }    
//                else if(key.equals("custId")){
//                    sb.append(" and c.custId = :custId");
//                    values.put("custId", Long.parseLong((String) this.getJson().get(key)));
                    
//                }    
            else{
                	sb.append(" and c."+key+" = :"+key);
                	values.put(key, Long.parseLong((String) this.getJson().get(key)));
                	
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
