package com.xywztech.bcrm.customer.action;

import java.text.SimpleDateFormat;
import java.util.Date;

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
import com.xywztech.bcrm.customer.service.CustomerDepositService;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;

/**
 * 客户托管设置与审批Action
 * auther sujm
 * address:chengdu
 */

@ParentPackage("json-default")

@Action(value="/customer_deposit", results={
    @Result(name="success", type="json")})
public class CustomerDepositAction extends BaseQueryAction {

	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	@Autowired
	private CustomerDepositService customerDepositService;

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
        StringBuilder sb = new StringBuilder("select t1.*, cm.approve_stat"+
			"  from (select distinct t.*"+
			"          from ocrm_f_ci_cust_view t"+
			"          left join OCRM_F_CI_BELONG_ORG b"+
			"            on b.cust_id = t.cust_id"+
			"          left join OCRM_F_CI_BELONG_CUSTMGR c"+
			"            on c.cust_id = t.cust_id"+
			"         where 1 > 0"+
			"		     and t.mgr_id = '"+auth.getUserId()+"'"+
			"         ORDER BY t.CRM_DT DESC) t1"+
			"  left join OCRM_F_CI_MANAGED cm"+
			"    on t1.cust_id = cm.cust_id and cm.managed_end_date > to_date('"+sdf.format(new Date())+"', 'YYYY-mm-DD') "+
			" and (cm.approve_stat = '2' or cm.approve_stat = '1')"+
			" where 1 = 1");
			    	
    	String customerString =request.getParameter("customerId");
    	if (customerString!=null&&!("").equals(customerString)) {
			sb.append(" and t1.cust_id = '"+customerString+"' ");
		}
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("CUST_ZH_NAME")||key.equals("CERT_NUM")||key.equals("CUST_ID"))
                	sb.append(" and t1."+key+" like"+" '%"+this.getJson().get(key)+"%'");
                else if(key.equals("CUST_TYP")||key.equals("CUST_LEV")||key.equals("CERT_TYPE")){
                	sb.append(" and t1."+key+" = '"+this.getJson().get(key)+"'");
                }
//                else if((key.equals("groupHostOrgNoName"))){
                else if((key.equals("instncode"))){//按机构号码查询
                	String org=this.getJson().get(key).toString();
                String orgName []=org.split(";");
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
//        String sUserId= request.getParameter("userId");
//        if(null!=sUserId&&!("\"\"").equals(sUserId)){
//        	 JSONObject jsonObject =JSONObject.fromObject(sUserId);
// 		    JSONArray jarray =  jsonObject.getJSONArray("aId");
// 		   StringBuilder usersb = new StringBuilder();
// 		   for(int l=0;l<jarray.size();l++){
//           	if(l==0)
//           		usersb.append("'"+jarray.get(l).toString()+"'");
//           	else
//           		usersb.append(",'"+jarray.get(l).toString()+"'");
//           	
//           }
// 		  sb.append(" and t1.cust_id in (select cust_id from OCRM_F_CI_BELONG_CUSTMGR where mgr_id in("+usersb.toString()+")) ");
//      	
//        }
        addOracleLookup("CUST_TYP", "PAR0100021");
        addOracleLookup("CUST_LEV", "P_CUST_GRADE");
        addOracleLookup("CERT_TYPE", "PAPERS_TYPE");
        addOracleLookup("CUST_STAT","CUSTOMER_STATUS");
       setPrimaryKey("t1.CRM_DT DESC");
		SQL = sb.toString();
		datasource = ds;
	}
	
	/**
	 *  客户转移设置
	 * @return
	 */
	public String batchDeposit() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		String data = request.getParameter("data");
		customerDepositService.batchDeposit(data);
		return "success";
	}
	
	/**
	 *  客户转移审批
	 * @return
	 */
//	public String zf_batchTrans() {
//		ActionContext ctx = ActionContext.getContext();
//		request = (HttpServletRequest) ctx.get(ServletActionContext.HTTP_REQUEST);
//		String data = request.getParameter("data");
//		customerDepositService.zf_batchTrans(data);
//		return "success";
//	}
	
}