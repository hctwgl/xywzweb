package com.xywztech.bcrm.customer.service;


import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiCreditVillageCust;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.core.LookupManager;
import com.xywztech.bob.vo.AuthUser;

@Service
public class HomeUserAddService extends CommonService{
	
		private EntityManager em;
		private DataSource dataSource;
		
		@Override
		@PersistenceContext
		public void setEntityManager(EntityManager em) {
		        this.em = em;
		}
		@Override
		public Object save(Object mo){
			AcrmFCiCreditVillageCust model=(AcrmFCiCreditVillageCust)mo;
			if(null==model.getCustId()||"".equals(model.getCustId())){
				dataSource = (DataSource) LookupManager.getInstance().getApplicationContext().getBean("dsOracle");
					Connection conn=null;
					Statement stat=null;
					ResultSet rs = null;
					CallableStatement cstmt;
					String sql="";
					AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
					//取系统日期
					Date date1 = new Date();
					DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");    
					String date = format1.format(date1);
					
					String currenUserId = auth.getUserId();
					try{
						 conn = dataSource.getConnection();
						 stat = conn.createStatement();
						 String result="";
						 String tempSql = "select cust_id from ocrm_f_ci_cust_desc t where t.CERT_TYPE='100' and t.CERT_NUM='"
							 +model.getIdentiCardNo()+"'";
						 rs = stat.executeQuery(tempSql);
						 boolean ttmo = false;  //该客户是否存在，false为不存在
						 while(rs.next()){
							 ttmo =true;
							 result = rs.getString("cust_id");
							 model.setCustId(rs.getString("cust_id"));    //如果存在，则获取客户号
						 }
						 if(!ttmo){    //如果查询不到该客户，先生成客户号，新增一个潜在客户
			        		 
							 //调用存储过程生成唯一客户号
							cstmt=conn.prepareCall("{call PROC_GET_CUST_ID2(?,?,?,?)}");  
							cstmt.registerOutParameter(4, java.sql.Types.VARCHAR);
							cstmt.setString(1, model.getIdentiCardNo());   //身份证号码
							cstmt.setString(2, "100"); //证件类型，默认为身份证100
							cstmt.setString(3, "");
							cstmt.executeUpdate();//获取生成的客户号
							result=cstmt.getString(4);
							model.setCustId(result);
							//新增潜在客户
							sql = "insert into ocrm_f_ci_cust_desc(cust_id,cust_zh_name,cust_typ,link_user,post_no,cust_en_name,cert_type,link_phone,cust_stat,other_name,cert_num,commu_addr,affi_cust_manager,crm_dt)" 
		    	  			+" values('"+result+"','"+model.getName()+"','1','1','1','1','100','"+model.getMobile()+"','2','1','"+model.getIdentiCardNo()+"','1','"+currenUserId+"','"+date+"')";
							stat.executeUpdate(sql);
							
						 }
						 //判断该客户在信用村镇表中是否存在，则需提示该用户在其他家庭存在
						 //待补充
						 tempSql = "select cust_id from ACRM_F_CI_CREDIT_VILLAGE_CUST where cust_id='"+result+"'";
						 rs = stat.executeQuery(tempSql);
						 ttmo = false;  //该客户是否存在，false为不存在
						 while(rs.next()){
							 ttmo =true;
						 }
						 if(ttmo){//如果已存在
							 return null;
						 }else{ //如果不存在，则新增
							 em.persist(model);
						 }
	
					}catch(Exception ex){
						ex.printStackTrace();			
					}finally{			
						try{
							if(rs!=null){
								rs.close();
							}if(stat!=null){
								stat.close();
							}if(conn!=null){
								conn.close();
							}
						}catch(Exception ex){
							ex.printStackTrace();
						}
					}
			}else{
				em.merge(model);
			}
			return model;
		}
}
