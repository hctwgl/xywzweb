package com.xywztech.bob.service;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.xywztech.bob.core.PagingInfo;
import com.xywztech.bob.core.QueryHelper;

/**
 * @describe Generic query service
 * @author WillJoe 
 */
@Service
public class CommonQueryService {
    
	@Autowired
	@Qualifier("dsOracle")
    private DataSource dsOracle;

    /** Oracle字典映射 */
    private HashMap<String, String> oracleMapping = new HashMap<String, String>();

    private String primaryKey = null;
    
    public Map<String, Object> excuteQuery(String sql, int start, int limit) {
        Connection conn = null;
        Map<String, Object> results = null;
        try {
            int currentPage = start / limit + 1;
            PagingInfo pi = new PagingInfo(limit, currentPage);
            conn = dsOracle.getConnection();
            QueryHelper qh = new QueryHelper(sql, conn, pi);
            if (primaryKey != null) {
                qh.setPrimaryKey(primaryKey);
            }
            if (!oracleMapping.isEmpty()) {
                for(Entry<String, String> item : oracleMapping.entrySet()) {
                    qh.addOracleLookup(item.getKey(), item.getValue());
                }
            }
            results = qh.getJSON();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                	if(!conn.isClosed())
                		conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }       
        return results;
    }
        
    public void addOracleLookup(String columnName, String LookupName) {
        oracleMapping.put(columnName, LookupName);
    }

    public void setPrimaryKey(String primaryKey) {
        this.primaryKey = primaryKey;
    }

}
