package com.xywztech.bcrm.customer.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;
/*
 * 
 * 
 *    wz  家庭信息维护--家庭成员维护
 * 
 */
@ParentPackage("json-default")
@Action(value="/latentApplyQuery", results={
    @Result(name="success", type="json"),
})
public class LatentApplyQueryAction extends BaseQueryAction{
	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	@SuppressWarnings("deprecation")
	public void prepare() {
 		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
 		String orgid=auth.getUnitId();
        StringBuilder sb=new StringBuilder("select distinct a.CUST_ID,a.CUST_ZH_NAME,a.CERT_TYPE,a.CERT_NUM,a.CUST_TYP,a.CUST_LEV from OCRM_F_CI_CUST_DESC a inner join OCRM_F_CI_BELONG_ORG b on a.cust_id=b.CUST_ID and b.INSTITUTION_CODE='"+orgid+"' and" +
        		" a.CUST_ID NOT IN (SELECT CUST_ID FROM OCRM_F_CI_BELONG_CUSTMGR C WHERE C.INSTITUTION='"+orgid+"') and " +
        				"  a.CUST_ID NOT IN (SELECT CUST_ID FROM OCRM_F_CI_LATENT_APPLY_INFO T WHERE  T.APPLY_INIT = '"+orgid+"' and T.APPROVEL_STATUS = '1')");
    	//未来加，本机构已经分配了客户经理，则不能认领
        //AND A.CUST_ID NOT IN (SELECT CUST_ID FROM OCRM_F_CI_BELONG_CUSTMGR C WHERE C.INSTITUTION='211111')
        setPrimaryKey("a.CUST_ID");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
