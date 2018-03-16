

package com.xywztech.bob.service;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Query;
import javax.sql.DataSource;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.core.LookupManager;
import com.xywztech.bob.model.OcrmFCiGiftExchange;
import com.xywztech.bob.vo.AuthUser;

/**
 * 产品service
 */

@Service
public class IntegralService extends CommonService{
	

	private DataSource dataSource;
	private boolean sign = true;
	private String str=null;
	private JPABaseDAO<OcrmFCiGiftExchange,Long> baseDao;
	public IntegralService(){
		baseDao = new JPABaseDAO<OcrmFCiGiftExchange,Long>(OcrmFCiGiftExchange.class);
		super.setBaseDAO(baseDao);
	}
	
	/**
	 * 保存：包括新增和修改
	 * @param ws
	 * @throws SQLException 
	 */
	/*public boolean saves(ProductInfo ws)
	{
		em.persist(ws);
		sign = true;
		return sign;
	};*/
	public boolean save(OcrmFCiGiftExchange ws){
		if(ws.getId()== null){
			AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String currenUserId = auth.getUserId();
			Date date = new Date();
			em.persist(ws);
			sign = true;
			return sign;}
		else {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			
			String lastTm = dateFormat.format(new Date());
 	        AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            
			
         	long Id = ws.getId();
			//String productBusId = ws.getProdBusId();
			//String productName = ws.getProdName();
			String giftName = ws.getGiftName();
			String custId = ws.getCustId();
			String custMgr = ws.getCustMgr();
			String custName = ws.getCustName();
			String giftType= ws.getGiftType();
			String orderStatus = ws.getOrderStatus();
			BigDecimal exchangTotle = ws.getExchangeTotle();
			BigDecimal giftPoint = ws.getGiftPoint();
			Date orderDate =  ws.getOrderDate();
		
			dataSource = (DataSource) LookupManager.getInstance().getApplicationContext().getBean("dsOracle");
			
			Connection conn=null;
			Statement stat=null;
			ResultSet rs = null;
			Map kindMap = new HashMap();
			ArrayList kindList = new ArrayList();	
			
			try{
				 conn = dataSource.getConnection();
				 stat = conn.createStatement();
				 String kindSql = "update OCRM_F_CI_GIFT_EXCHANGE " +
				 		"set GIFT_NAME ='"+giftName+"',CUST_ID ='"+custId+"',CUST_MGR ='"+custMgr+"',CUST_NAME ='"+custName+"',GIFT_TYPE ='"+giftType+"',ORDER_STATUS = '"+orderStatus+"',EXCHANGE_TOTLE = "+exchangTotle+"," +
				 				"GIFT_POINT = "+giftPoint+""+
				 						 
				 		" where id =" +Id+ "";
				//system.out.printlnln("【"+kindSql+"】");
				 int tt = stat.executeUpdate(kindSql);
			
				
			 if(tt>0){
					 sign = true;
				 }
			}catch(Exception ex){
				ex.printStackTrace();			
			}finally{			
				try{
					if(conn!=null){
						conn.close();
					}if(stat!=null){
						stat.close();
					}if(rs!=null){
						rs.close();
					}
				}catch(Exception ex){
					ex.printStackTrace();
				}
			}
			
			
		}
		return sign;
	}
	
/*	*//**
	 * 移除记录
	 * @param id
	 */
	public void remove(String idStr){
		
		  String[] strarray = idStr.split(",");
	        for (int i = 0; i < strarray.length; i++) {
	        	long tid = Long.valueOf(strarray[i]);
		OcrmFCiGiftExchange ws2 = em.find(OcrmFCiGiftExchange.class,tid);
			
		em.remove(ws2);}
			
		
	}

	
	/**
	 * 查看记录
	 * @param id
	 * @return
	 */
	public OcrmFCiGiftExchange find(String id){
		return em.find(OcrmFCiGiftExchange.class, id);
	}
	
	/**
	 * 查询所有记录
	 * @return
	 */
	@Override
	@SuppressWarnings("unchecked")
	public List<OcrmFCiGiftExchange> findAll(){
		String wsFindAll = "select ws from OcrmFCiGiftExchange ws";
		Query wsQuery = em.createQuery(wsFindAll);
		return wsQuery.getResultList();
	}

}

