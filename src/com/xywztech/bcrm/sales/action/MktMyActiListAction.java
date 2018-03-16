package com.xywztech.bcrm.sales.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.core.LookupManager;
import com.xywztech.bob.vo.AuthUser;
@ParentPackage("json-default")
@Action(value="/MktMyActiListAction", results={
    @Result(name="success", type="json"),
})
public class MktMyActiListAction extends CommonAction {

	private static final long serialVersionUID = 1L;
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	 	 
	@Override
	public void prepare() {
		// TODO Auto-generated method stub
		
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		String ActiId =request.getParameter("ActiId");
    	String exeId =request.getParameter("exeId");
    	StringBuilder sb = new StringBuilder();
    	if(!"".equals(ActiId)&&ActiId!=null&&!"".equals(exeId)&&exeId!=null){
    		sb.append("select o.*,a.user_name,DE.CUST_TYP,DE.CUST_STAT,DE.LINK_USER as cust_Contact_Name from OCRM_F_MK_MKT_MY_ACTI o,ADMIN_AUTH_ACCOUNT a,OCRM_F_CI_CUST_DESC DE where o.create_user=a.account_name " +
    			 		" AND DE.CUST_ID = O.CUST_ID and o.EXECUTOR_ID='"+exeId+"' and o.MKT_ACTI_ID='"+ActiId+"'");
    	}else{
    		sb.append("select o.*,                              "+
    				"       AC.MKT_ACTI_NAME,                 "+
    				"       AC.MKT_ACTI_TYPE,                 "+
    				"       AC.MKT_ACTI_MODE,                 "+
    				"       AC.MKT_ACTI_STAT,                 "+
    				"       AC.MKT_ACTI_AIM,                  "+
    				"       AC.MKT_ACTI_CONT,                 "+
    				"       AC.PSTART_DATE,                   "+
    				"       AC.PEND_DATE,                     "+
    				//"       AC.CREATE_USER,                   "+
    				//"       AC.CREATE_DATE,                   "+
    				"       AC.MKT_ACTI_COST,                 "+
    				"       AC.AEND_DATE,                     "+
    				"       AC.ACTI_REMARK,                   "+
    				"       AC.MKT_ACTI_ADDR,                 "+
    				"       AC.ASTART_DATE,                   "+
    				"       AC.ACTI_CUST_DESC,                "+
    				"       a.user_name,                      "+
    				"       DE.CUST_TYP as CUST_CATEGORY,     "+
    				"       DE.CUST_STAT as CUST_TYP,         "+
    				"       DE.LINK_USER as cust_Contact_Name "+
    				"  from OCRM_F_MK_MKT_MY_ACTI  o,         "+
    				"       OCRM_F_MK_MKT_ACTIVITY AC,        "+
    				"       ADMIN_AUTH_ACCOUNT     a,         "+
    				"       OCRM_F_CI_CUST_DESC    DE         "+
    				" where o.create_user = a.account_name    "+
    				"   AND AC.MKT_ACTI_ID = O.MKT_ACTI_ID    "+
    				"   AND DE.CUST_ID = O.CUST_ID            ");
//    		  if(1>0){
//    			  sb.append(" and o.EXECUTOR_ID='"+auth.getUserId()+"' ");
//    		  }else{
//    			  sb.append(" and o.IS_ASSIGN  = '0' and o.create_org='"+auth.getUnitId()+"' ");  
//    		  }
    	}
    	
		 for(String key:this.getJson().keySet()){
			     if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
			         if(key.equals("MY_ACTI_NAME"))
			             sb.append(" and o."+key+" like '%"+this.getJson().get(key)+"%'");
			         if(key.equals("PROGRESS_STAGE"))
			             sb.append(" and o."+key+"= '"+this.getJson().get(key)+"'");
			         if(key.equals("CREATE_DATE"))
			        	 sb.append(" and o."+key+"= to_date('" +this.getJson().get(key)+"','yyyy-MM-dd')");
			         if(key.equals("IS_CRE_CHANCE"))
			             sb.append(" and o."+key+"= '"+this.getJson().get(key)+"'");
			        
			         
			     }
			 }
			 setPrimaryKey("o.UPDATE_DATE,O.CREATE_DATE desc ");
			 addOracleLookup("PROGRESS_STAGE", "STAGE_LEAVL");
			 addOracleLookup("MKT_ACTI_TYPE", "ACTI_TYPE");
			 addOracleLookup("MKT_ACTI_STAT", "MACTI_STATUS");
			 addOracleLookup("IS_CRE_CHANCE", "IF_FLAG");
			 SQL=sb.toString();
			 datasource = ds;
	}
	 //执行营销活动
    public String activityExecute() throws SQLException
    {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		String myActiId = request.getParameter("myActiId");
		String executorId = request.getParameter("executorId");
		String executorName = request.getParameter("executorName");

			DataSource dataSource;
			dataSource = (DataSource) LookupManager.getInstance().getApplicationContext().getBean("dsOracle");		
			Connection conn=null;
			Statement stat=null;
			ResultSet rs = null;
				 conn = dataSource.getConnection();
				 stat = conn.createStatement();
				 String kindSql = "UPDATE OCRM_F_MK_MKT_MY_ACTI T SET T.EXECUTOR_ID ='"+executorId+"' ,T.EXECUTOR_NAME='"+executorName+"',T.IS_ASSIGN='1' WHERE T.MY_ACTI_ID in('"+myActiId.replace(",", "','")+"') ";
				 stat.executeUpdate(kindSql);
				 if(rs!=null){
						rs.close();
					}if(stat!=null){
						stat.close();
					}if(conn!=null){
						conn.close();
					}
		addActionMessage(" lookupMapping removed successfully");
		return "success";
    }
    
    //在手动生成商机后，同步的更新所选择的我的营销活动的是否生成商机属性为1：是。
    public String updateIsCreChance() throws SQLException
    {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		String myMktActiId = request.getParameter("myMktActiId");

			DataSource dataSource;
			dataSource = (DataSource) LookupManager.getInstance().getApplicationContext().getBean("dsOracle");		
			Connection conn=null;
			Statement stat=null;
			ResultSet rs = null;
				 conn = dataSource.getConnection();
				 stat = conn.createStatement();
				 String kindSql = "UPDATE OCRM_F_MK_MKT_MY_ACTI T SET T.IS_CRE_CHANCE = '1' WHERE T.MY_ACTI_ID ='"+myMktActiId+"' ";
				 stat.executeUpdate(kindSql);
				 if(rs!=null){
						rs.close();
					}if(stat!=null){
						stat.close();
					}if(conn!=null){
						conn.close();
					}
		addActionMessage(" update record successfully");
		return "success";
    }
    
}
