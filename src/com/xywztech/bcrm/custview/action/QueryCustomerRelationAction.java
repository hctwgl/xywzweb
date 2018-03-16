package com.xywztech.bcrm.custview.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.core.LookupManager;

@ParentPackage("json-default")
@Action(value = "/querycustomerrelation", results = { @Result(name = "success", type = "json") })
public class QueryCustomerRelationAction extends BaseQueryAction {

    private HttpServletRequest request;

    @Autowired
    @Qualifier("dsOracle")
    private DataSource ds;
    
    @Override
	public void prepare(){
        ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);
        String customerId = request.getParameter("customerId");

        StringBuilder sb = new StringBuilder(
                "select (case when t.cust_id = '"+customerId+"' then rela_cust_name else cust_name end) as cust," +
                		"t.relation_Type,t.relation_Name "
                        + "from acrm_f_ci_cust_rale t where t.CUST_ID= '"
                        + customerId + "' or t.rela_cust_id= '"
                        + customerId+"' ");
        SQL = sb.toString();
        setPrimaryKey("t.mxtid");
        addOracleLookup("RELATION_TYPE", "CUST_REL_TYPE");
        addOracleLookup("RELATION_NAME", "CUS0100038");
        datasource = ds;
    }
    
    public static StringBuilder getSql(String customerId){
    	StringBuilder sqlBuilder = new StringBuilder(
                "select (case when t.cust_id = '"+customerId+"' then t.rela_cust_name else t.cust_name end) as rela_cust_name," +
                		"(case when t.cust_id = '"+customerId+"' then t.rela_cust_id else t.cust_id end) as cust_id," +
                				"t2.cust_stat rela_cust_stat,(select cust_zh_name from ocrm_f_ci_cust_desc where cust_id ='"+customerId+"') as cust_name," +
                				"(select cust_stat from ocrm_f_ci_cust_desc where cust_id ='"+customerId+"') as cust_stat," +
        		"t.relation_Type,t.relation_Name ,t4.f_value "
                + "from acrm_f_ci_cust_rale t inner join ocrm_f_ci_cust_desc t2 on" +
                		" (case when t.cust_id = '"+customerId+"' then t.rela_cust_id else t.cust_id end)=t2.cust_id " +
                				" inner join ocrm_sys_lookup_item t4 on t4.f_lookup_id = 'CUS0100038' and t4.f_code = t.relation_name  " +
                				"where t.CUST_ID= '"
                + customerId + "' or t.rela_cust_id= '"
                + customerId+"' ");
    	return sqlBuilder;
    }

	public static List getList(String customerId) {
		StringBuilder sqlString = getSql(customerId);
    	DataSource dataSource;
    	dataSource = (DataSource) LookupManager.getInstance().getApplicationContext().getBean("dsOracle");
		Connection conn=null;
		Statement stat=null;
		ResultSet rs = null;
		Map kindMap = new HashMap();
		ArrayList kindList = new ArrayList();		
		try{
			 conn = dataSource.getConnection();
			 stat = conn.createStatement();
			 rs = stat.executeQuery(sqlString.toString());
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
    	List list = (List)kindMap.get("data");
		return list;
	}

}
