package com.xywztech.bcrm.custview.action;

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
 *    mahcao  客户搜索
 * 
 */
@ParentPackage("json-default")
@Action(value="/customerCreditc", results={
    @Result(name="success", type="json"),
})
public class CustomerCreditcAction extends BaseQueryAction{
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	public void prepare() {
 		
		// TODO Auto-generated method stub
 		String s=this.getJson().get("custId").toString();
// 		AcrmFCiPerCustInfo asd=new AcrmFCiPerCustInfo();
//      AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
//      Long managerId = auth.getXtStaffId();
      
    	StringBuilder sb=new StringBuilder("select c.* from  ACRM_F_CI_ASS_CORP_AUTH_INFO c where 1>0");
        sb.append(" and c.CUSTOM_ID = '"+s+"'");
        addOracleLookup("STATUS", "CDE0100040");
        setPrimaryKey("c.CUSTOM_ID");
       // setBranchFileldName("u.unitid");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
