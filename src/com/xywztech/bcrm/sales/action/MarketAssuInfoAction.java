package com.xywztech.bcrm.sales.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.sales.model.OcrmFMmTask;
import com.xywztech.bcrm.sales.service.MarketAssuInfoService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.common.JPAAnnotationMetadataUtil;
import com.xywztech.bob.vo.AuthUser;
import com.xywztech.crm.constance.JdbcUtil;
import com.xywztech.crm.exception.BizException;
/**
 * 营销任务管理-查询、维护、新增
 * @author sujm
 * @since 2013-04-22 
 */
@SuppressWarnings("serial")
@Action("/marketassuinfo")
public class MarketAssuInfoAction  extends CommonAction {
	
    @Autowired
	private MarketAssuInfoService marketAssuInfoService;
    
    @Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
    AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    @Autowired
    
	public void init(){
	  	model = new OcrmFMmTask(); 
		setCommonService(marketAssuInfoService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		//needLog=true;
	}
    
    /*
     * 客户群主体信息维护，包括新增，修改，删除(删除客户群同时，删除客户群对应的群成员信息)
     * */
    @Override
	public DefaultHttpHeaders create() {
     	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        //新增,修改
    	if(request.getParameter("operate").equals("add")){
    		OcrmFMmTask ocrmFMmTask = (OcrmFMmTask)model;
//			ocrmFMmTask.setTaskId(null);
    		marketAssuInfoService.save(ocrmFMmTask);
//			}
    		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    		JPAAnnotationMetadataUtil metadataUtil = new JPAAnnotationMetadataUtil();
    		auth.setPid(metadataUtil.getId(model).toString());//获取新增操作产生的最新记录的ID
    	}
    	 //删除
    	else if(request.getParameter("operate").equals("delete"))
    	{      String s=  request.getParameter("cbid");
    			
               JSONObject jsonObject =JSONObject.fromObject(s);
               JSONArray jarray =  jsonObject.getJSONArray("id");
               for(int i=0;i<jarray.size();i++){
               marketAssuInfoService.remove(Long.parseLong(jarray.get(i).toString()));//删除掉所选择的群信息

               }
               StringBuffer delStr= new StringBuffer("");
               if(jarray.size()>0){
            	   delStr = delStr.append(jarray.getString(0).toString());  
               }
               for(int i = 1;i<jarray.size();i++){
            	   delStr = delStr.append(",");
            	   delStr = delStr.append(jarray.getString(i).toString());
               }
               String jql = "delete from OcrmFCiRelateCustBase p where p.custBaseId in (" + delStr.toString() + ")";
               Map<String,Object> values = new HashMap<String,Object>();
               marketAssuInfoService.batchUpdateByName(jql, values);//删除掉对应的群成员的信息
    	}
        return new DefaultHttpHeaders("success").setLocationId(((OcrmFMmTask) model).getTaskId());
    }
    
    
   /**
    * 查询客户群基本信息
    */
    @Override
	public void prepare()  {
		
		 StringBuilder sb = new StringBuilder("select * from OCRM_F_MM_TASK p where 1>0");
	        for(String key:this.getJson().keySet()){
	            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
//	                if(key.equals("TASK_NAME"))
//	                	  sb.append(" and "+key+" like '%"+this.getJson().get(key)+"%'");
//	                else if(key.equals("TASK_STAT"))
//	                	 sb.append(" and "+key+" = '"+this.getJson().get(key)+"'");
//	                else if(key.equals("OPER_USER")){
//	                	 strb =  (String) this.getJson().get(key);
//	                	 String tempStr = strb.replace(",", "','");
//	                	 sb.append(" and p.OPER_USER in('"+tempStr+"')");
//	                }
//	                else if(key.equals("DIST_USER")){
//	                	 strb =  (String) this.getJson().get(key);
//	                	 String tempStr = strb.replace(",", "','");
//	                	 sb.append(" and p.DIST_USER in('"+tempStr+"')");
//	                }
//	                else if(key.equals("OPER_ORG")){
//	                	 strb =  (String) this.getJson().get(key);
//	                	 String tempStr = strb.replace(",", "','");
//	                	 sb.append(" and p.OPER_NAME in('"+tempStr+"')");
//	                }
//	                else if(key.equals("createDate"))
//	                	  sb.append(" and "+key+" = "+this.getJson().get(key));
//	                else{
//	                	sb.append(" and "+key+" = "+this.getJson().get(key));
//	                }
	            }
	        }
		SQL = sb.toString();
		setPrimaryKey("p.TASK_ID desc");
		addOracleLookup("TASK_STAT", "MTASK_STAT");
		datasource = ds;
		
		
	}  
    //判断是否存在未关闭的子任务
    public HttpHeaders ifExitSunTask(){
		Connection conn = null ;
    	Statement stmt = null ;
    	ResultSet rs = null;
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		//任务编号
		String taskId = request.getParameter("taskId");
		String ifExit = "no";
		String name = "";
		
		String sql = " select task_name from OCRM_F_MM_TASK where TASK_PARENT_ID='"+taskId+"' and TASK_STAT <>'4'";
		
		 try {
	        	conn=JdbcUtil.getConnection();
	    		stmt = conn.createStatement();
		        rs = stmt.executeQuery(sql);
		            while(rs.next()){
		            	name += rs.getString("task_name")+",";
		            	}
		            if(name.length()!=0){
		            	ifExit="yes";
		            	name = name.substring(0,name.length()-1);
		            }	
	            }catch (SQLException e) {
	        		throw new BizException(1,2,"1002",e.getMessage());
		        }finally{
		        	try {
		        		if(rs != null) {
							rs.close() ;
						}
						if(stmt != null) {
							stmt.close() ;
						}
						if(conn != null) {
							conn.close() ;
						}
					} catch (SQLException e) {
						e.printStackTrace();
					}
		        }
	
		
		
		if(this.json!=null)
			this.json.clear();
		else 
			this.json = new HashMap<String,Object>();  
		
		this.json.put("ifExit", ifExit);
		this.json.put("names", name);
		
		return new DefaultHttpHeaders("success").disableCaching();
	}
}