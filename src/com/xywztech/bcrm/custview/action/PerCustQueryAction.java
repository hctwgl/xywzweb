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

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;
/*
 * 
 * 
 *    mahcao  客户搜索
 * 
 */
@ParentPackage("json-default")
@Action(value="/perCustQuery", results={
    @Result(name="success", type="json"),
})
public class PerCustQueryAction extends BaseQueryAction{
	
	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	@SuppressWarnings("deprecation")
	public void prepare() {
 		
 		
 		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
 		String s=request.getParameter("custId");
 		String ss=this.getJson().get("custId").toString();
// 		AcrmFCiPerCustInfo asd=new AcrmFCiPerCustInfo();
//      AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
//      Long managerId = auth.getXtStaffId();
//      AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
//      Long managerId = auth.get
      
    	StringBuilder sb=new StringBuilder("select c.*, d.CUST_ID CUST_ID1,d.CUST_ZH_NAME,d.AREA_ID,d.HB_FLAG, d.CUST_EN_NAME, d.CUST_TYP CUST_TYPE, d.CUST_LEV, d.CRM_DT, d.OTHER_NAME, d.LINK_USER, d.CONTRY_AREA, d.POST_NO, d.TELEPHONE_NUM, d.OFFICE_PHONE, d.LINK_PHONE, d.COMMU_ADDR, d.CUST_CREDIT_LEVEL, d.CUST_STAT, d.AFFI_CUST_MANAGER, d.IF_INT, d.CERT_TYPE, d.CERT_NUM from Ocrm_F_Ci_Cust_Desc d left join Ocrm_F_Ci_Per_Cust_Info c on c.cust_ID=d.cust_Id where d.cust_typ='1' ");
       // StringBuilder sb = new StringBuilder("select ci.CUST_ID,ci.INVEST_ACCT_NO  ,ci.CUST_NAME  ,ci.CUST_GRADE  ,ci.CERT_TYPE  ,ci.CERT_ID  ,ci.CERT_LAST ,ci.SEX  ,ci.EMAIL   ,ci.MOBILE_NO1  ,ci.MOBILE_NO2  ,ci.ADDRESS   ,ci.CITIZENSHIP  ,ci.NATIVE_PLACE  ,ci.NATIONALITY  ,ci.BIRTHDAY ,ci.RELIGION  ,ci.CUST_SOURCE  ,ci.CUST_STS  ,ci.IS_TRANS_CUST  ,ci.POSTAL  ,ci.HOME_TEL  ,ci.UNIT_ADDR   ,ci.UNIT_TEL  ,ci.TAX  ,ci.QQ  ,ci.MSN   ,ci.TWITTER   ,ci.CONTACT_FREQUENCY  ,ci.CONTACT_TIME_PERIOD  ,ci.TOP_CONTACT_WAY  ,ci.MARITAL_STS    ,ci.INVEST_ADVISER_NAME  ,ci.INVEST_ADVISER_TEL  ,ci.INVEST_ADVISER_TEAM  ,ci.IS_CYBERSEEK  ,ci.IS_ETRADE  ,ci.IS_MESSAGE_SER  ,ci.RISK_GRADE_EVALU  ,ci.RISK_GRADE_EVALULAST ,ci.INVEST_INTEREST  ,ci.IS_BLACKLIST  ,ci.IS_REDLIST  ,ci.IMPOR  ,ci.EDUCATION  ,ci.GRADUATE_SCHOOL  ,ci.GRADUATE_YEAR ,ci.INDUSTRY_ID  ,ci.POSITION  ,ci.UNIT_NAME  ,ci.COMPANY_TYPE  ,ci.CORP_REGIST_ADDR   ,ci.CORP_BUSINESS_SCOPE   ,ci.CORP_TAXREGCODE  ,ci.CORP_NAME  ,ci.CORP_CITIZENSHIP  ,ci.CORP_CERT_TYPE  ,ci.CORP_CERT_ID  ,ci.CORP_CERT_LAST ,ci.OPER_NAME  ,ci.OPER_SEX  ,ci.OPER_CITIZENSHIP  ,ci.OPER_POSITION  ,ci.OPER_POSTAL  ,ci.OPER_ADDR   ,ci.OPER_EMAIL   ,ci.OPER_MOBILE_NO1  ,ci.OPER_MOBILE_NO2  ,ci.OPER_HOME_TEL  ,ci.OPER_UNIT_TEL  ,ci.OPER_TAX  ,ci.TA_CUST_ID ,co.CUST_MANAGER_ID,co.CUST_MANAGER_NAME,cp.* from CRM_F_CI_CUST ci,CRM_F_CI_BELONG_MANAGER co,CRM_F_CI_INTEREST_DETAIL cp where 1>0 " );

       
        sb.append(" and d.CUST_ID = '"+ss+"'");
       // sb.append(" and ORG_ID")
      // //system.out.printlnln(sb);
	 
//		}
        
        setPrimaryKey("d.CUST_ID");
        addOracleLookup("SEX", "DEM0100005");
        addOracleLookup("CERT_TYPE", "PAR0100006");
        addOracleLookup("CUST_TYP", "PAR0100021"); 
        addOracleLookup("CUST_CREDIT_LEVEL", "CDE0100033");
        addOracleLookup("UNIT_AFFI_CALLING", "PAR2100001");
        addOracleLookup("CUST_STAT", "CUSTOMER_STATUS");
        addOracleLookup("SEN_AREA_TYPE", "DEM0100011");
//        addOracleLookup("CUST_TYP", "PAR2200005");
        addOracleLookup("MAX_DEGREE", "DEM0100020");
        addOracleLookup("HOST_STATUS", "DEM0100014");
        addOracleLookup("MARRG_STATUS", "DEM0100003");
        addOracleLookup("UNIT_CHARACTOR", "ABC0100003");
        addOracleLookup("WORK_TYP", "PAR0400044");
        addOracleLookup("EMP_TYPE", "DEM0100006");
        addOracleLookup("CUST_CHARACTOR", "ABC0100004");
        addOracleLookup("CUST_AFFI_CALLING", "PAR2100001");
        addOracleLookup("HB_FLAG", "IS_CREA_CHANCE");
//        addOracleLookup("IMPOR", "KHZYX");
//        
       
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
