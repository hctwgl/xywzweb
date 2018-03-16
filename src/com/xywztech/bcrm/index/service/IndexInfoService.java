package com.xywztech.bcrm.index.service;

import java.sql.SQLException;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bob.core.QueryHelper;

@Service
@Transactional
public class IndexInfoService 
{
	@Autowired
    @Qualifier("dsOracle")
    private DataSource dsOracle;
	
	public Map<String,Object> searchSubIndexList(String typeid)
	{
		
		String s = " select  base.index_id id,base.index_code code,base.index_name name,base.index_conten content,'基础指标' classname,'1' class " + 
					"from OCRM_SYS_INDEX_BASE base " +
					" where base.index_type_id = " + typeid +
					" union " + 
					" select derive.index_id id,derive.index_code code,derive.index_name name,derive.index_content content,'派生指标' classname,'3' class " + 
					" from OCRM_SYS_INDEX_DERIVE derive" +
					" where derive.index_type = " + typeid+
					" union " + 
					" select complex.index_id id,complex.index_code code,complex.index_name name,complex.INDEX_CONTENT content,'复合指标' classname,'2' class " +
					" from OCRM_SYS_INDEX_COMPLEX complex " +
					" where complex.INDEX_TYPE_ID = " + typeid;
		
		System.out.println(s);
		
		QueryHelper qh;
		try 
		{
			qh = new QueryHelper(s, dsOracle.getConnection());
			return qh.getJSON();
		} 
		catch (SQLException e) 
		{
			e.printStackTrace();
			return null;
		}
		
	}
	
	public Map<String,Object> searchSubIndexBaseList(String ID)
	{
		String s = " select  INDEX_ID,INDEX_CODE,INDEX_NAME,INDEX_TYPE_ID,INDEX_TYPE_CLASS,INDEX_CONTEN,DS,FIELD,CREATE_DATE,CREATE_AUTER " + 
				" from OCRM_SYS_INDEX_BASE " +
				" where INDEX_ID = " + ID ;
	
		QueryHelper qh;
		try 
		{
			qh = new QueryHelper(s, dsOracle.getConnection());
			return qh.getJSON();
		} 
		catch (SQLException e) 
		{
			e.printStackTrace();
			return null;
		}
	}
	
	public Map<String,Object> searchSubIndexDeriveList(String ID)
	{
		String s = " select  INDEX_ID,INDEX_CODE,INDEX_NAME,INDEX_TYPE,INDEX_CLASS,INDEX_CONTENT,RELATED_INDEX_STYLE,RELATED_INDEX_ID,RELATED_INDEX_NAME,DIMENSION,COUNT,ATTR_INFO_ITEM,ATTR_VALUE,UNIT,CREATE_DATE,CREATE_AUTER " + 
				" from OCRM_SYS_INDEX_DERIVE " +
				" where INDEX_ID = " + ID ;
	
		QueryHelper qh;
		try 
		{
			qh = new QueryHelper(s, dsOracle.getConnection());
			return qh.getJSON();
		} 
		catch (SQLException e) 
		{
			e.printStackTrace();
			return null;
		}
	}
	
	public Map<String,Object> searchSubIndexComplexList(String ID)
	{
		String s = " select  INDEX_ID,INDEX_CODE,INDEX_NAME,INDEX_TYPE_ID,INDEX_CLASS,INDEX_CLASS,FORMULA,FORMULA_CONTENT,FORMULA,INDEX_CONTENT,CREATE_DATE,CREATE_AUTER " + 
				" from OCRM_SYS_INDEX_COMPLEX " +
				" where INDEX_ID = " + ID ;
	
		QueryHelper qh;
		try 
		{
			qh = new QueryHelper(s, dsOracle.getConnection());
			return qh.getJSON();
		} 
		catch (SQLException e) 
		{
			e.printStackTrace();
			return null;
		}
	}
}
