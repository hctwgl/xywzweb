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
@Action(value="/perCustFamilyQuery", results={
    @Result(name="success", type="json"),
})
public class PerCustFamilyQueryAction extends BaseQueryAction{
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
      
    	StringBuilder sb=new StringBuilder("select c.* from ACRM_F_CI_CREDIT_VILlAGE_CUST c where 1>0 ");
       // StringBuilder sb = new StringBuilder("select ci.CUST_ID,ci.INVEST_ACCT_NO  ,ci.CUST_NAME  ,ci.CUST_GRADE  ,ci.CERT_TYPE  ,ci.CERT_ID  ,ci.CERT_LAST ,ci.SEX  ,ci.EMAIL   ,ci.MOBILE_NO1  ,ci.MOBILE_NO2  ,ci.ADDRESS   ,ci.CITIZENSHIP  ,ci.NATIVE_PLACE  ,ci.NATIONALITY  ,ci.BIRTHDAY ,ci.RELIGION  ,ci.CUST_SOURCE  ,ci.CUST_STS  ,ci.IS_TRANS_CUST  ,ci.POSTAL  ,ci.HOME_TEL  ,ci.UNIT_ADDR   ,ci.UNIT_TEL  ,ci.TAX  ,ci.QQ  ,ci.MSN   ,ci.TWITTER   ,ci.CONTACT_FREQUENCY  ,ci.CONTACT_TIME_PERIOD  ,ci.TOP_CONTACT_WAY  ,ci.MARITAL_STS    ,ci.INVEST_ADVISER_NAME  ,ci.INVEST_ADVISER_TEL  ,ci.INVEST_ADVISER_TEAM  ,ci.IS_CYBERSEEK  ,ci.IS_ETRADE  ,ci.IS_MESSAGE_SER  ,ci.RISK_GRADE_EVALU  ,ci.RISK_GRADE_EVALULAST ,ci.INVEST_INTEREST  ,ci.IS_BLACKLIST  ,ci.IS_REDLIST  ,ci.IMPOR  ,ci.EDUCATION  ,ci.GRADUATE_SCHOOL  ,ci.GRADUATE_YEAR ,ci.INDUSTRY_ID  ,ci.POSITION  ,ci.UNIT_NAME  ,ci.COMPANY_TYPE  ,ci.CORP_REGIST_ADDR   ,ci.CORP_BUSINESS_SCOPE   ,ci.CORP_TAXREGCODE  ,ci.CORP_NAME  ,ci.CORP_CITIZENSHIP  ,ci.CORP_CERT_TYPE  ,ci.CORP_CERT_ID  ,ci.CORP_CERT_LAST ,ci.OPER_NAME  ,ci.OPER_SEX  ,ci.OPER_CITIZENSHIP  ,ci.OPER_POSITION  ,ci.OPER_POSTAL  ,ci.OPER_ADDR   ,ci.OPER_EMAIL   ,ci.OPER_MOBILE_NO1  ,ci.OPER_MOBILE_NO2  ,ci.OPER_HOME_TEL  ,ci.OPER_UNIT_TEL  ,ci.OPER_TAX  ,ci.TA_CUST_ID ,co.CUST_MANAGER_ID,co.CUST_MANAGER_NAME,cp.* from CRM_F_CI_CUST ci,CRM_F_CI_BELONG_MANAGER co,CRM_F_CI_INTEREST_DETAIL cp where 1>0 " );

       
        sb.append(" and c.CUST_ID = '"+s+"'");
       // sb.append(" and ORG_ID")
      // //system.out.printlnln(sb);
	 
//		}
        
        setPrimaryKey("c.CUST_ID");
//        addOracleLookup("SEX", "sex");
//        addOracleLookup("CERT_TYPE", "PAPERS_TYPE");
//        addOracleLookup("IMPOR", "KHZYX");
//        
//        addOracleLookup("CUST_STS", "KHZT");
//        addOracleLookup("IS_TRANS_CUST", "YES_NO");
//        addOracleLookup("CUST_GRADE", "KHJB");
//        //addOracleLookup("SEX", "TZPH");
//        
//        addOracleLookup("EDUCATION", "XL");
//        addOracleLookup("MARITAL_STS", "MERRY");
//        addOracleLookup("SEX", "CHILDREN");
//        addOracleLookup("INDUSTRY_ID", "SSHY");
//        addOracleLookup("POSITION", "ZW");
//        addOracleLookup("XFPH", "TZPH");
//        addOracleLookup("HDLX", "HDLX");
//        addOracleLookup("IS_CYBERSEEK", "YES_NO");
//        addOracleLookup("IS_ETRADE", "YES_NO");
//        addOracleLookup("CUST_SOURCE", "KHLY");
       
        
       // setBranchFileldName("u.unitid");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
