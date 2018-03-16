package com.xywztech.bob.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

@ParentPackage("json-default")
@Action(value="/querycustomerrelationmanagement1", results={
    @Result(name="success", type="json")
})
public class QueryCustomerRelationManagement1Action extends BaseQueryAction{
    
    
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	@Override
    public void prepare() 
	{
       
        	 StringBuilder s = new StringBuilder("select t1.* from fdm.acrm_f_ci_cust_desc t1");
        	/*   int currentPage =this.getStart()/this.getLimit()+1;
               PagingInfo pi = new PagingInfo(this.getLimit(),currentPage);
        	   QueryHelper qh = new QueryHelper(s.toString(), ds.getConnection(),pi); */
        	 setPrimaryKey("t1.id");
        	 SQL=s.toString();
 	         datasource = ds;
    }
}