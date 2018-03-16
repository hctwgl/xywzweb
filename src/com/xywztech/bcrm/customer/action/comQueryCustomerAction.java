package com.xywztech.bcrm.customer.action;



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
import com.xywztech.bob.common.CommonAction;

@ParentPackage("json-default")
@Action(value="/comCustomerInfo", results={
    @Result(name="success", type="json"),
})
public class comQueryCustomerAction extends CommonAction{

	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;  
	private HttpServletRequest request;
	
 	@Override
	public void prepare() {	
 		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        StringBuilder sb = new StringBuilder("select distinct t1.*," +
        		"m.OWENERID,m.SUPBRID,m.BRID,m.ROTECB,m.CKBAL,m.CKBALAVG,m.SECKBALAVG,m.YECKBALAVG,m.LOANBAL,m.LOANBALAVG,m.SELOANBALAVG," +
        		"m.YELOANBALAVG,m.CDBAL,m.DPCDBAL,m.CDSUM,m.DPCDSUM,m.TIEXBAL,m.DPTIEXBAL,m.TIEXSUM,m.DPTIEXSUM,m.CUSTSUMBAL,m.MIDBAL,m.NASSUMBAL,m.EBANKSUM,m.ETLDATE" +
        		",t2.IF_NETBANK,t2.ENT_MAIN_INDUSTRY,t2.ENT_ECOM_TYPE,t2.ENT_HOLDING_TYPE,t2.ENT_SCALE from OCRM_F_CI_CUST_DESC t1 ");
        sb.append("left join OCRM_F_CI_BELONG_ORG b on b.cust_id = t1.cust_id ");
    	sb.append("left join OCRM_F_CI_BELONG_CUSTMGR c on c.cust_id = t1.cust_id ");
    	sb.append("left join ACRM_F_CI_CUST_BAL m on m.CUST_ID = t1.CUST_ID ");
    	sb.append("left join OCRM_F_CI_COM_CUST_INFO t2 on t2.CUST_ID = t1.CUST_ID ");
    	sb.append("where 1>0 ");
    	String customerString =request.getParameter("customerId");
    	if (customerString!=null&&!("").equals(customerString)) {
			sb.append(" and t1.cust_id = '"+customerString+"' ");
		}
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("CUST_ZH_NAME")||key.equals("CERT_NUM")||key.equals("CUST_ID"))
                	sb.append(" and t1."+key+" like"+" '%"+this.getJson().get(key)+"%'");
                else if(key.equals("CUST_TYP")||key.equals("CUST_LEV")){
                	sb.append(" and t1."+key+" = '"+this.getJson().get(key)+"'");
                }
//                else if((key.equals("groupHostOrgNoName"))){
                else if((key.equals("instncode"))){//按机构号码查询
                	String org=this.getJson().get(key).toString();
                String orgName []=org.split(",");
                StringBuilder orgsb = new StringBuilder();
                for(int i=0;i<orgName.length;i++){
                	if(i==0)
                	orgsb.append("'"+orgName[i]+"'");
                	else
                		orgsb.append(",'"+orgName[i]+"'");
                	
                }
                sb.append(" and t1.cust_id in (select cust_id from OCRM_F_CI_BELONG_ORG where INSTITUTION_CODE in("+orgsb.toString()+")) ");
                	
                }
                else if(key.equals("custMgrId")){//按归属客户经理Id查询
                	String mgr = this.getJson().get(key).toString();
                	String mgrId[] = mgr.split(",");
                	StringBuilder mgrb = new StringBuilder();
                	for(int j=0;j<mgrId.length;j++){
                		if(j==0)
                			mgrb.append("'"+mgrId[j]+"'");
                		else
                			mgrb.append(",'"+mgrId[j]+"'");
                	}
                	sb.append(" and t1.cust_id in (select cust_id from OCRM_F_CI_BELONG_CUSTMGR where mgr_id in("+mgrb.toString()+")) ");
                }
            }
        }

        addOracleLookup("CUST_TYP", "PAR0100021");
        addOracleLookup("CUST_LEV", "P_CUST_GRADE");
        addOracleLookup("CERT_TYPE", "PAR0100006");
        addOracleLookup("CUST_STAT","CUSTOMER_STATUS");
        addOracleLookup("IF_NETBANK","IF_FLAG");
        addOracleLookup("ENT_MAIN_INDUSTRY","PAR2100001");
        addOracleLookup("ENT_SCALE","DEM0200004");
        addOracleLookup("ENT_ECOM_TYPE","DEM0200002");
        addOracleLookup("ENT_HOLDING_TYPE","CDE0100015");
        


       setPrimaryKey("t1.CRM_DT DESC");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
