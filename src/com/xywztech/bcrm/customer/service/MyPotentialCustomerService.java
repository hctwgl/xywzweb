package com.xywztech.bcrm.customer.service;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;

import net.sf.json.JSONArray;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.customer.model.MyPotentialCustomer;
import com.xywztech.bcrm.custview.model.OcrmFCiBelongCustmgr;
import com.xywztech.bcrm.custview.model.OcrmFCiBelongOrg;
import com.xywztech.bcrm.custview.model.OcrmFCiComCustInfo;
import com.xywztech.bcrm.custview.model.OcrmFCiPerCustInfo;
import com.xywztech.bob.core.LookupManager;
import com.xywztech.bob.vo.AuthUser;
@Service
@Transactional(value="postgreTransactionManager")
public class MyPotentialCustomerService {
	
	private EntityManager em;
	private DataSource dataSource;
	
	@PersistenceContext
	public void setEntityManager(EntityManager em) {
	        this.em = em;
	}	

	
	public boolean save(String tempCustId,String a1,String a2,String a3,String a4,String a5,String a6,String a7,String a8,String a9,String a10,String a11){
		boolean sign = false;	
		dataSource = (DataSource) LookupManager.getInstance().getApplicationContext().getBean("dsOracle");
			Connection conn=null;
			Statement stat=null;
			ResultSet rs = null;
			OcrmFCiBelongOrg ocrmFCiBelongOrg = new OcrmFCiBelongOrg();
			OcrmFCiBelongCustmgr ocrmFCiBelongCustmgr = new OcrmFCiBelongCustmgr();
			CallableStatement cstmt;
			String sql="";
			AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			Date date1 = new Date();
			
			DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");    
			String date = format1.format(date1);
			date = "to_date('"+date+"','yyyy-mm-dd hh24:mi:ss')";
			String currenUserId = auth.getUserId();
			String currenUserId1 = auth.getUsername();
			String tempUnitId = auth.getUnitId();
			try{
				 conn = dataSource.getConnection();
				 stat = conn.createStatement();
				cstmt=conn.prepareCall("{call PROC_GET_CUST_ID2(?,?,?,?)}");  
				cstmt.registerOutParameter(4, java.sql.Types.VARCHAR);
				cstmt.setString(1, a10);
				cstmt.setString(2, a6);
				cstmt.setString(3, "");
				cstmt.executeUpdate();
				String result=cstmt.getString(4);
				if(tempCustId.length()<1){
					
					String tempSql = "select * from ocrm_f_ci_cust_desc t where t.CERT_TYPE='"+a6+"' and t.CERT_NUM='"+a10+"'";
					 ResultSet tt1 = stat.executeQuery(tempSql);
					 boolean ttmo = false;
					 while(tt1.next()){
						 ttmo =true;
						 return sign;
					 }
//					 if(ttmo){
//		        		 Exception e =new Exception ("存在重复数据！");
//		        		 throw e;
//		        	 };
					
				 sql = "insert into ocrm_f_ci_cust_desc(cust_id,cust_zh_name,cust_typ,link_user,post_no,cust_en_name,cert_type,link_phone,cust_stat,other_name,cert_num,commu_addr,affi_cust_manager,crm_dt)" 
	    	  			+" values('"+result+"','"+a1+"','"+a2+"','"+a3+"','"+a4+"','"+a5+"','"+a6+"','"+a7+"','"+a8+"','"+a9+"','"+a10+"','"+a11+"','"+currenUserId+"',"+date+")";
				
				 ocrmFCiBelongOrg.setCustId(result);
				 ocrmFCiBelongOrg.setInstitutionCode(tempUnitId);
				 ocrmFCiBelongOrg.setInstitutionName(auth.getUnitName());
				 ocrmFCiBelongOrg.setMainType("1");
				 
				 ocrmFCiBelongCustmgr.setCustId(result);
				 ocrmFCiBelongCustmgr.setMgrId(auth.getUserId());
				 ocrmFCiBelongCustmgr.setInstitution(auth.getUnitId());
				 ocrmFCiBelongCustmgr.setInstitutionName(auth.getUnitName());
				 ocrmFCiBelongCustmgr.setAssignUser(auth.getUserId());
				 ocrmFCiBelongCustmgr.setMgrName(auth.getCname());
				 ocrmFCiBelongCustmgr.setAssignUsername(auth.getCname());
				 ocrmFCiBelongCustmgr.setMainType("1");
				 em.persist(ocrmFCiBelongOrg);
				 em.persist(ocrmFCiBelongCustmgr);
				 if(a2.equals("1")){
					 OcrmFCiPerCustInfo acrmfcipercustinfo = new OcrmFCiPerCustInfo();
					 acrmfcipercustinfo.setCustId(result);
					 em.persist(acrmfcipercustinfo);
				 }if(a2.equals("2")){

					 OcrmFCiComCustInfo ocrmfcicomcustinfo = new OcrmFCiComCustInfo();
					 ocrmfcicomcustinfo.setCustId(result);
					 em.persist(ocrmfcicomcustinfo);

				 }
				
				}else{
					sql="update ocrm_f_ci_cust_desc set cust_zh_name = '"+a1+"',cust_typ= '"+a2+"',link_user= '"+a3+"',post_no= '"+a4+"',cust_en_name= '"+a5+"',cert_type= '"+a6+"',link_phone= '"+a7+"',cust_stat= '"+a8+"',other_name= '"+a9+"',cert_num= '"+a10+"',commu_addr= '"+a11+"',crm_dt="+date+" where ocrm_f_ci_cust_desc.CUST_ID = '"+tempCustId+"'";
				}
				 //system.out.printlnln(sql);
				 int tt = stat.executeUpdate(sql);
				 if(tt>0){
					 sign = true;
				 }
			}catch(Exception ex){
				ex.printStackTrace();			
			}finally{			
				try{
					if(rs!=null){
						rs.close();
					}
					if(stat!=null){
						stat.close();
					}
					if(conn!=null){
						conn.close();
					}
				}catch(Exception ex){
					ex.printStackTrace();
				}
			}
			
			
//		}
		return sign;
	}
	
	public void update(JSONArray jarray)  {
		for (int i=0;i<jarray.size();i++)  {
		MyPotentialCustomer myPotentialCustomer = em.find(MyPotentialCustomer.class,Long.parseLong(jarray.get(i).toString()));
		if(("0").equals(myPotentialCustomer.getAssignSts())){
		myPotentialCustomer.setAssignSts("1");
		em.merge(myPotentialCustomer);}}
		
	}
    public String getDate() throws ParseException{   
   	   //DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");    
   	        Calendar ca = Calendar.getInstance();   
   	         int year = ca.get(Calendar.YEAR);//获取年份   
   	         int month=ca.get(Calendar.MONTH);//获取月份    
   	         int day=ca.get(Calendar.DATE);//获取日   
   	         String date = year + "" + (month + 1 )+ "" + (day-1);   
   	         
   	         //Date  date1 = format1.parse(date);  
   	         return date;   
      }
    public Date getDate2() throws ParseException{   
 	   DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");    
 	        Calendar ca = Calendar.getInstance();   
 	         int year = ca.get(Calendar.YEAR);//获取年份   
 	         int month=ca.get(Calendar.MONTH);//获取月份    
 	         int day=ca.get(Calendar.DATE);//获取日   
 	         String date = year + "-" + (month + 1 )+ "-" + day;   
 	         Date  date1 = format1.parse(date);  
 	         return date1;   
    }
    
}
