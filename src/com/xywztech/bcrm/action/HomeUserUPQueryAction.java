

package com.xywztech.bcrm.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;
/*
 * 
 * 
 *    wz  家庭信息维护--update查询
 * 
 */
@ParentPackage("json-default")
@Action(value="/homeUserUPQuery", results={
    @Result(name="success", type="json"),
})
public class HomeUserUPQueryAction extends BaseQueryAction{
	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	@SuppressWarnings("deprecation")
	public void prepare() {
 		String custId=this.getJson().get("custId").toString();
    	StringBuilder sb=new StringBuilder("select vc.* from ACRM_F_CI_CREDIT_VILLAGE_CUST vc where vc.cust_id = '"+custId+"'");
        setPrimaryKey("vc.CUST_ID");

		SQL = sb.toString();
		datasource = dsOracle;
	}
}
