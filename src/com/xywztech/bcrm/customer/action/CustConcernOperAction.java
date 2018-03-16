package com.xywztech.bcrm.customer.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.customer.model.OcrmFCiAttentionCustInfo;
import com.xywztech.bcrm.customer.service.CustConcernOperService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.core.LookupManager;
import com.xywztech.bob.vo.AuthUser;
import com.xywztech.crm.exception.BizException;

//import com.xywztech.crm.service.custumer.CrmFciRelativesService;



/**
 * @author mahcao 客户基本信息操作service
 */
@SuppressWarnings("serial")
@Action("/custConcernOper")
public class CustConcernOperAction  extends CommonAction{
	private DataSource dataSource;
//    @Autowired
//    private CustBaseOperService custBaseOperService ;
    
	


    @Autowired
    private CustConcernOperService custConcernOperService ;
    
//    @Autowired
//	public void init(){
//    	String s=this.getJson().get("idStr").toString();
//    	//system.out.printlnln("sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"+s);
//    	String ss=request.getParameter("idStr");
//   //system.out.printlnntln("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"+ss);
//	  	model = new OcrmFCiAttentionCustInfo(); 
//	  	//model = new CrmFCiRelatives();
//		setCommonService(custConcernOperService);
//	}
//    public void addAttention(){
//    	ActionContext ctx = ActionContext.getContext();
//        request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
//    	String ss=request.getParameter("condition");
// //system.out.printlnrintln("qweqweqweqweqweqweqweqweqweeeeeeewwwwwwwwwwwwwwwwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"+ss);
////	  	model = new OcrmFCiAttentionCustInfo(); 
////	  	 String[] strarray = ss.split(",");
////			for (int i = 0; i < strarray.length; i++) {
////				String sss=strarray[i];
//    	custConcernOperService.save(ss);
//    }
    
//	 新增一条记录
//     POST /actionName
  
    @Override
	@SuppressWarnings("finally")
	public DefaultHttpHeaders create(){
    	AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String currenUserId = auth.getUserId();
		
		dataSource = (DataSource) LookupManager.getInstance().getApplicationContext().getBean("dsOracle");
		Connection conn=null;
		Statement statement=null;
		ResultSet rs = null;
		
    	  ActionContext ctx = ActionContext.getContext();
    	  request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    		String ss=request.getParameter("condition");
    		boolean flag = true;
    		try{
	    		String[] strarray = ss.split(",");
	    		for (int i = 0; i < strarray.length; i++) {
					String sss=strarray[i];
					
						conn = dataSource.getConnection();
						statement = conn.createStatement();
					
					String sql = "select * from ocrm_f_ci_attention_cust_info t where t.cust_id ='"+sss+"' and user_id = '"+currenUserId+"'";
					rs = statement.executeQuery(sql);
					
					if(rs.next()){
						flag = false;
					}else{
						model = new OcrmFCiAttentionCustInfo(); 
			    		custConcernOperService.save(model,sss);
					}
				
	    		}
    		}catch(Exception e){
	    		e.printStackTrace();
	    		addActionMessage("New Record created failure");
	    	}finally{
	    		
	    		if(flag == false){
	    			throw new BizException(1,0,"100010","该客户已经为关注客户!");
	    		}
	    		
	    		return new DefaultHttpHeaders("success");
	    	}
    
}}