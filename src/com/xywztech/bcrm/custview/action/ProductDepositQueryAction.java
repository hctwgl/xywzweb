package com.xywztech.bcrm.custview.action;
import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;

@ParentPackage("json-default")
@Action(value="/productDepositQuery", results={
    @Result(name="success", type="json"),
})
public class ProductDepositQueryAction extends BaseQueryAction{
	@Autowired
@Qualifier("dsOracle")	
	private DataSource dsOracle;
	private HttpServletRequest request;
 	@Override
	public void prepare() {

		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
	 	String a =  request.getParameter("omain_type");
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
       
		
        StringBuilder sb = new StringBuilder("SELECT distinct t1.*,t3.CUST_ZH_NAME,t2.PROD_NAME,T4.UNITNAME ORG_NAME " +
        		"FROM ACRM_F_DP_SAVE_INFO  t1 " +
        		"INNER JOIN OCRM_F_PD_PROD_INFO  t2 " +
        		"ON (t1.PRODUCT_ID = t2.PRODUCT_ID) " +
        		"INNER JOIN OCRM_F_CI_CUST_DESC  t3 " +
        		"ON (t1.CUST_NO= t3.CUST_ID) " +
        		"INNER JOIN SYS_UNITS  t4 " +
        		"ON (t1.ORG_NO= t4.UNITID) " +
        		"LEFT JOIN OCRM_F_CI_ACC_BELONG t on t.account = t1.ODS_ACCT_NO "+
    	" where 1=1 ");

    	if(!("").equals(request.getParameter("cust_id"))&&("").equals(request.getParameter("base_id")))
		{
		    sb.append(" and t1.CUST_NO = '" + request.getParameter("cust_id")+"'");
		    
		}	
		else if(("").equals(request.getParameter("cust_id"))&&!("").equals(request.getParameter("base_id")))
		{
			sb.append(" and t1.CUST_NO in ( select ta.cust_id " +
					"from OCRM_F_CI_RELATE_CUST_BASE ta where cust_base_id=" + request.getParameter("base_id")+")");
		}
		else if(("").equals(request.getParameter("cust_id"))&&("").equals(request.getParameter("base_id"))&&!("").equals(request.getParameter("mgrid")))
		{
			sb.append(" and t1.CUST_NO IN (select c.cust_id from  OCRM_F_CI_BELONG_CUSTMGR c where c.mgr_id = '"+request.getParameter("mgrid")+"')");
		}
        
   if( a !=null && a.equals("0")){
      if(auth.getAuthorities().size()==1 && auth.getAuthorities().get(0).toString().equals("47") ){
		sb.append(" t.MGR_ID = '"+auth.getUserId()+"'");}
      else{
	     setBranchFileldName("t1.ORG_NO");
     }
     }
     

        sb.append(" and  t2.CATL_CODE=");
        sb.append(request.getParameter("catlCode"));
        addOracleLookup("CYNO", "ACC1300012");
        addOracleLookup("ACCONT_TYPE", "ACCONT_TYPE");
        addOracleLookup("ACCT_STATUS", "SAVE_STATUS");
        addOracleLookup("PERD", "SAVE_PERD");
        addOracleLookup("INTE_BEAR_TERM", "ABC0100029");
        addOracleLookup("INTE_BEAR_MODE", "INTE_BEAR_MODE");
        addOracleLookup("INTEREST_SETTLEMENT", "INTEREST_SETTLEMENT");
        addOracleLookup("TD_IR_TP", "TD_IR_TP");
        addOracleLookup("DEPOSIT_RESE_REQ", "DEPOSIT_RESE_REQ");
        setPrimaryKey("t1.AGREEMENT_ID");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
