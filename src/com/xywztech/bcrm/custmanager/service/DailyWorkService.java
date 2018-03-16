package com.xywztech.bcrm.custmanager.service;



import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import net.sf.json.JSONArray;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.custmanager.model.OcrmFWpWorklogDaylog;
import com.xywztech.bob.vo.AuthUser;
import com.xywztech.crm.exception.BizException;


	@Service
	@Transactional(value="postgreTransactionManager")
	public class DailyWorkService {
		private EntityManager em;

		@PersistenceContext
		public void setEntityManager(EntityManager em) {
		        this.em = em;
		    }	
		
		public List <OcrmFWpWorklogDaylog> query(String owenerid,Date etldate) { 
			 StringBuffer querysql=new StringBuffer();
			 querysql.append("select c from OcrmFWpWorklogDaylog c where  c.owenerid=?1 and c.etldate=?2");
			 Query q = em.createQuery(querysql.toString()); 
			 q.setParameter(1, owenerid);
			 q.setParameter(2, etldate);
		     q.setFirstResult(0);
			 q.setMaxResults(10);  
		     List<OcrmFWpWorklogDaylog> list= q.getResultList(); 
			 return list;
		} 
		
		
		
		
		
		
	@SuppressWarnings("unchecked")
	public void save(OcrmFWpWorklogDaylog acrmfcicustdaylog) throws ParseException {
        if (acrmfcicustdaylog.getLogid() == null) {
        	
        	
       	   
	        AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	        String currenUserId = auth.getUserId();	
            Date op = acrmfcicustdaylog.getEtldate();
        	String sql="select c from OcrmFWpWorklogDaylog c where  c.owenerid=?1 and c.etldate=?2 ";
   	   	 Query q = em.createQuery(sql.toString()); 
   	   	 q.setParameter(1, currenUserId);
   	   	 q.setParameter(2,op );
  
   	       List<OcrmFWpWorklogDaylog> list= q.getResultList(); 
 
   	       if(list.size()==0){
           em.persist(acrmfcicustdaylog);
           return ;}
   	       else{
   	    	 throw new BizException(1,2,"100010","#a#sorry there has exist one record!#a#");
   	       }
 

           
        } else {
       
           em.merge(acrmfcicustdaylog);
           
           return;
         
        }}
    


	
    //删除
    public void remove(JSONArray jarray) {
      if(jarray.size()>0)
	     {
	   for (int i=0;i<jarray.size();i++)
   {
		     Long id=Long.parseLong(jarray.get(i).toString());
		     OcrmFWpWorklogDaylog acrmfcicustdaylog = em.find(OcrmFWpWorklogDaylog.class,id);
	
	   if (acrmfcicustdaylog != null) {
	       em.remove(acrmfcicustdaylog);
	    }
       }    	
    }
}
       public Date getDate() throws ParseException{   
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

