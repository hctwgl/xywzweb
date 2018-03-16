package com.xywztech.bcrm.sales.action;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.Date;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.sales.model.OcrmFMmTaskOperator;
import com.xywztech.bcrm.sales.model.OcrmFMmTaskTarget;
import com.xywztech.bcrm.sales.service.MarketAssuDetailInfoService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.common.JPAAnnotationMetadataUtil;
import com.xywztech.bob.vo.AuthUser;
/**
 * 营销任务管理-查询、维护、新增
 * @author sujm
 * @since 2013-04-22 
 */
@SuppressWarnings("serial")
@Action("/marketassudetailinfo")
public class MarketAssuDetailInfoAction  extends CommonAction {
	
    @Autowired
	private MarketAssuDetailInfoService marketAssuDetailInfoService;
    
    @Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
    AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    @Autowired
    
	public void init(){
	  	model = new OcrmFMmTaskOperator(); 
		setCommonService(marketAssuDetailInfoService);
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
    		OcrmFMmTaskOperator ocrmFMmTaskOperator = (OcrmFMmTaskOperator)model;
    		String[] OperObjId = ocrmFMmTaskOperator.getOperObjId().split(",");
			String[] OperObjName = ocrmFMmTaskOperator.getOperObjName().split(",");
			for(int i=0;i<OperObjId.length;i++){
				ocrmFMmTaskOperator.setTaskId(null);
				ocrmFMmTaskOperator.setOperObjId(OperObjId[i]);
				ocrmFMmTaskOperator.setOperObjName(OperObjName[i]);
    		marketAssuDetailInfoService.save(ocrmFMmTaskOperator);
			}
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
               marketAssuDetailInfoService.remove(Long.parseLong(jarray.get(i).toString()));//删除掉所选择的群信息

               //wzy，20130418，add：删除群成员关系图数据
//               custGroupMemberGraphOperationService.delRelationGraphData(Long.parseLong(jarray.get(i).toString()));
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
               marketAssuDetailInfoService.batchUpdateByName(jql, values);//删除掉对应的群成员的信息
    	}
        return new DefaultHttpHeaders("success").setLocationId(((OcrmFMmTaskOperator) model).getTaskId());
    }
    
    //新增或修改方法
    public String saveData() throws SQLException{
    	ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	String querysign = request.getParameter("querysign");
    	
    	if("target".equals(querysign)||"target_del".equals(querysign)){
    		String targetNo = request.getParameter("targetNo");
    		String targetCode = request.getParameter("targetCode");
    		String originalValue = request.getParameter("originalValue");
    		String targetValue = request.getParameter("targetValue");
    		String achieveValue = request.getParameter("achieveValue");
    		String achievePercent = request.getParameter("achievePercent");
    		String taskId = request.getParameter("taskId");
    		
    		JSONObject jsonObject =JSONObject.fromObject(targetNo);
    		JSONArray jarray =  jsonObject.getJSONArray("targetNo");
    		JSONObject jsonObject1 =JSONObject.fromObject(targetCode);
    		JSONArray jarray1 =  jsonObject1.getJSONArray("targetCode");
    		JSONObject jsonObject2 =JSONObject.fromObject(originalValue);
    		JSONArray jarray2 =  jsonObject2.getJSONArray("originalValue");
    		JSONObject jsonObject3 =JSONObject.fromObject(targetValue);
    		JSONArray jarray3 =  jsonObject3.getJSONArray("targetValue");
    		JSONObject jsonObject4 =JSONObject.fromObject(achieveValue);
    		JSONArray jarray4 =  jsonObject4.getJSONArray("achieveValue");
    		JSONObject jsonObject5 =JSONObject.fromObject(achievePercent);
    		JSONArray jarray5 =  jsonObject5.getJSONArray("achievePercent");
    		
    		 //清空历史数据
    	    String jql = "delete from OcrmFMmTaskTarget p where p.taskId = "+Long.parseLong(taskId)+" ";
            Map<String,Object> values = new HashMap<String,Object>();
            marketAssuDetailInfoService.batchUpdateByName(jql, values);
    		
    		for(int i = 0;i<jarray1.size();i++){
    			model = new OcrmFMmTaskTarget(); 
    			OcrmFMmTaskTarget ocrmFMmTaskTarget = (OcrmFMmTaskTarget) model;
    			ocrmFMmTaskTarget.setAchievePercent((jarray5.get(i)==null||"".equals(jarray5.get(i)))?null:BigDecimal.valueOf(Long.parseLong(jarray5.get(i).toString())));
    			ocrmFMmTaskTarget.setAchieveValue((jarray4.get(i)==null||"".equals(jarray4.get(i)))?null:BigDecimal.valueOf(Long.parseLong(jarray4.get(i).toString())));
    			ocrmFMmTaskTarget.setCreateUserId(auth.getUserId());
    			ocrmFMmTaskTarget.setCreateUserName(auth.getUsername());
    			ocrmFMmTaskTarget.setOriginalValue((jarray2.get(i)==null||"".equals(jarray2.get(i)))?null:BigDecimal.valueOf(Long.parseLong(jarray2.get(i).toString())));
    			ocrmFMmTaskTarget.setRecentlyUpdateDate(new Date());
    			ocrmFMmTaskTarget.setRecentlyUpdateId(auth.getUserId());
    			ocrmFMmTaskTarget.setRecentlyUpdateName(auth.getUsername());
    			ocrmFMmTaskTarget.setTargetCode((jarray1.get(i)==null||"".equals(jarray1.get(i)))?null:jarray1.get(i).toString());
    			if("".equals(jarray.get(i).toString())||null==jarray.get(i).toString()){
					ocrmFMmTaskTarget.setTargetNo(null);
				} else {
					ocrmFMmTaskTarget.setTargetNo(Long.parseLong(jarray.get(i)
							.toString()));
				}
				ocrmFMmTaskTarget.setTargetValue((jarray3.get(i)==null||"".equals(jarray3.get(i)))?null:BigDecimal.valueOf(Long
						.parseLong(jarray3.get(i).toString())));
				ocrmFMmTaskTarget.setTaskId(Long.parseLong(taskId));
				marketAssuDetailInfoService.saveData(model);	
    	    }
    		if("target_del".equals(querysign)){
        	    String jql_del = "update  OcrmFMmTask p set p.taskStat= '4' where p.taskId = "+Long.parseLong(taskId)+" ";
                Map<String,Object> values1 = new HashMap<String,Object>();
                marketAssuDetailInfoService.batchUpdateByName(jql_del, values1);	
    		}
    		
    		
    	}else{
        	//添加操作人需涉及的参数
        	String operUserId = request.getParameter("operUserId");//操作对象ID
        	String operUserName = request.getParameter("operUserName");//操作对象名称
        	String taskId = request.getParameter("taskId");//营销任务ID
        	String distTaskType = request.getParameter("distTaskType");//营销任务名称
        	
    		String[] ary = operUserId.split(",");
        	String[] ary1 = operUserName.split(",");
                	
        	for(int i = 0;i<ary.length;i++){
        		if(!("".equals(ary[i]))){
        		OcrmFMmTaskOperator ocrmFMmTaskOperator = (OcrmFMmTaskOperator) model;
        		ocrmFMmTaskOperator.setId(null);
        		ocrmFMmTaskOperator.setCreateDate(new Date());
        		ocrmFMmTaskOperator.setCreateUserId(auth.getUserId());
        		ocrmFMmTaskOperator.setCreateUserName(auth.getUsername());
        		ocrmFMmTaskOperator.setOperObjId(ary[i].toString());
        		ocrmFMmTaskOperator.setOperObjName(ary1[i].toString());
        		ocrmFMmTaskOperator.setTaskId(Long.parseLong(taskId));
        		ocrmFMmTaskOperator.setDistTaskType(distTaskType);
            	marketAssuDetailInfoService.saveData(model);
        		}
        	}	
    	}
    	
	addActionMessage("saveData successfully");
    return "success";	
    }
   /**
    * 查询客户群基本信息
    */
    @Override
	public void prepare()  {
    	String querySign = request.getParameter("querysign");
    	
		String sql1= "select * from OCRM_F_MM_TASK_OPERATOR p where 1>0";
		String sql2 = "select p.*,t.index_name as TARGET_NAME,t.index_content as TARGET_MARK from OCRM_F_MM_TASK_TARGET p inner join "
				+ "(select m1.index_id, m1.index_code, m1.index_name,m1.index_conten as index_content "
				+ "               from OCRM_SYS_INDEX_BASE m1 "
				+ "             union "
				+ "            select m2.index_id, m2.index_code, m2.index_name as TARGET_NAME,m2.index_content "
				+ "               from OCRM_SYS_INDEX_DERIVE m2 "
				+ "             union "
				+ "             select m3.index_id, m3.index_code, m3.index_name,m3.index_content "
				+ "               from OCRM_SYS_INDEX_COMPLEX m3)t on t.index_id= p.target_code where 1>0 ";
		 StringBuilder sb = new StringBuilder("");
		 if("oper_obj".equals(querySign)){
			 sb.append(sql1);
			 sb.append(" and p.task_id = '"+request.getParameter("taskId")+"' ");
		 }else if("target".equals(querySign)){
			 sb.append(sql2); 
			 sb.append(" and p.task_Id = '"+request.getParameter("taskId")+"' ");
		 }
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
}