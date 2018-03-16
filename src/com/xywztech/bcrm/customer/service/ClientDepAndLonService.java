/**
 * 
 */
package com.xywztech.bcrm.customer.service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import com.xywztech.bob.core.LookupManager;

/**
 * @author yaoliang
 *
 */
//@Transactional
//@Service
//@Scope("prototype")
public class ClientDepAndLonService {

	private DataSource dataSource;
	private DataSource gpDataSource;
	public ClientDepAndLonService(){		
		dataSource = (DataSource) LookupManager.getInstance().getApplicationContext().getBean("dsOracle");
		gpDataSource = (DataSource) LookupManager.getInstance().getApplicationContext().getBean("dsOracle");
	}
	@SuppressWarnings("unchecked")
	public Map clientDepAndLonList(String kindSql){
		Connection conn=null;
		Statement stat=null;
		ResultSet rs = null;
		Map kindMap = new HashMap();
		ArrayList kindList = new ArrayList();		
		try{
			 conn = dataSource.getConnection();
			 stat = conn.createStatement();
			 rs = stat.executeQuery(kindSql);
			 ResultSetMetaData rsmd = rs.getMetaData();
			 int columnCount = rsmd.getColumnCount();
			 while(rs.next()){
				 Map map = new HashMap();
				 for(int i=1;i<=columnCount;i++){
					 map.put(rsmd.getColumnName(i), rs.getObject(rsmd.getColumnName(i)));
				 }
				 kindList.add(map);
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
		
		kindMap.put("data", kindList);
		return kindMap;
	}

	@SuppressWarnings("unchecked")
	public Map clientDepAndLonListGp(String kindSql){
		Connection conn=null;
		Statement stat=null;
		ResultSet rs = null;
		Map kindMap = new HashMap();
		ArrayList kindList = new ArrayList();		
		try{
			 conn = gpDataSource.getConnection();
			 stat = conn.createStatement();
			 rs = stat.executeQuery(kindSql);
			 ResultSetMetaData rsmd = rs.getMetaData();
			 int columnCount = rsmd.getColumnCount();
			 while(rs.next()){
				 Map map = new HashMap();
				 for(int i=1;i<=columnCount;i++){
					 map.put(rsmd.getColumnName(i), rs.getObject(rsmd.getColumnName(i)));
				 }
				 kindList.add(map);
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
		
		kindMap.put("data", kindList);
		return kindMap;
	}
	
}
