package com.xywz.sale.action;
/**
 * 外贸合同QueryAction
 * @author ww
 * @since 2015-10-14 
 */
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
import org.springframework.security.core.context.SecurityContextHolder;
import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;
import com.xywz.sale.service.XywzSaleFrgnOrdrContrService;


@ParentPackage("json-default")
@Action(value="/XywzSaleFrgnOrdrContrQueryAction", results={
    @Result(name="success", type="json")
})
//public class XywzSaleFrgnOrdrContrQueryAction extends CommonAction {
public class XywzSaleFrgnOrdrContrQueryAction extends BaseQueryAction {

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	
	
	private XywzSaleFrgnOrdrContrService xywzSaleFrgnOrdrContrService;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//    	System.out.print(auth.getUserId());
//    	System.out.print(auth.getUsername());
  	    
    	StringBuilder sb;
    	//定义管理员的大权限（0，不是管理员1，是管理员）
        String roleLvl="0";
        List userCode=auth.getRolesInfo();
        for( int i=0;i<userCode.size();i++ ){
        	Map role = (Map)auth.getRolesInfo().get(i);
        	String roleCode = role.get("ROLE_CODE").toString();
        	if (roleCode.equals("admin")){
        		roleLvl="1" ;
        		break;
        	}
        	
        }
    	//不同用户只能看到自己的单子，admin除外
//        SCHEDU_STATUS
//        0:已下计划
//        1：已排产
//        2：待质检
//        3：已质检
    	if( roleLvl.equals("1") ){
    	sb=new StringBuilder("select t.* from (" +
    			"select t1.*" +
    			",T2.CUST_SHT_NM," +
    			"T3.USER_NAME  as SELL_PRINC, " +
    			"T4.USER_NAME as MAK_DOC_PERS, " +
    			"T5.PORT_NAME_CN as PORTOF_DISCHARGE_CN,T6.PORT_NAME_CN as LOAD_TRAFF_PORT_CN," +
    			"T7.REFUND_DT,T7.REFUND_AMT,case when T8.Contr_Num is null then '0' else '1' end as SCHEDU_STATUS  " +
    			"from  XYWZ_SALE_FRGN_ORDR_CONTR t1 " +
    			"left OUTER JOIN XYWZ_CUST_CUSTINFO T2 "+
    			"ON  T1.CUST_ID = T2.CUST_ID "+
    			"LEFT OUTER JOIN ADMIN_AUTH_ACCOUNT T3 "+
    			"ON T1.SELL_PRINC_ID = T3.ACCOUNT_NAME "+
    			"LEFT OUTER JOIN ADMIN_AUTH_ACCOUNT T4 " +
    			"ON T1.MAK_DOC_PERS_ID = T4.ACCOUNT_NAME " +
    			"LEFT OUTER JOIN XYWZ_LOGI_PORT_INFO_MGMT T5 "+
    			"ON t1.PORTOF_DISCHARGE = T5.PORT_ID " +
    			"LEFT OUTER JOIN XYWZ_LOGI_PORT_INFO_MGMT T6 "+
    			"ON t1.LOAD_TRAFF_PORT = T6.PORT_ID " +
    			"LEFT OUTER JOIN XYWZ_ACCT_STMT_MGMT T7 "+
    			"ON t1.Contr_Num = T7.Contr_Num " +
    			"LEFT JOIN (select distinct Contr_Num as Contr_Num from XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL ) T8 " +
    			"ON t1.Contr_Num = T8.Contr_Num  "+
    			") t "+
    			" where 1=1 " );
    	}else{
        	sb=new StringBuilder("select t.* from (" +
        			"select t1.*" +
        			",T2.CUST_SHT_NM," +
        			"T3.USER_NAME  as SELL_PRINC, " +
        			"T4.USER_NAME as MAK_DOC_PERS, " +
        			"T5.PORT_NAME_CN as PORTOF_DISCHARGE_CN,T6.PORT_NAME_CN as LOAD_TRAFF_PORT_CN," +
        			"T7.REFUND_DT,T7.REFUND_AMT,case when T8.SCHEDU_STATUS is null then '0' else T8.SCHEDU_STATUS end as SCHEDU_STATUS  " +
        			"from  XYWZ_SALE_FRGN_ORDR_CONTR t1 " +
        			"left OUTER JOIN XYWZ_CUST_CUSTINFO T2 "+
        			"ON  T1.CUST_ID = T2.CUST_ID "+
        			"LEFT OUTER JOIN ADMIN_AUTH_ACCOUNT T3 "+
        			"ON T1.SELL_PRINC_ID = T3.ACCOUNT_NAME "+
        			"LEFT OUTER JOIN ADMIN_AUTH_ACCOUNT T4 " +
        			"ON T1.MAK_DOC_PERS_ID = T4.ACCOUNT_NAME " +
        			"LEFT OUTER JOIN XYWZ_LOGI_PORT_INFO_MGMT T5 "+
        			"ON t1.PORTOF_DISCHARGE = T5.PORT_ID " +
        			"LEFT OUTER JOIN XYWZ_LOGI_PORT_INFO_MGMT T6 "+
        			"ON t1.LOAD_TRAFF_PORT = T6.PORT_ID " +
        			"LEFT OUTER JOIN XYWZ_ACCT_STMT_MGMT T7 "+
        			"ON t1.Contr_Num = T7.Contr_Num " +
        			"LEFT JOIN XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL T8 " +
        			"ON t1.Contr_Num = T8.Contr_Num  "+
        			") t "+
        			" where t.Sell_Princ_Id = '"+auth.getUserId()+"' or Mak_Doc_Pers_Id ='"+auth.getUserId()+"'");
    		
    	}
//    	StringBuilder sb=new StringBuilder("select t1.* from XYWZ_SALE_FRGN_ORDR_CONTR t1 where 1=1");
   	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("ordrStat")){
                    sb.append(" and t.ORDR_STAT like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("contrNum")){
                	sb.append(" and t.CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }

    	setPrimaryKey("t.ORDR_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("ORDR_STAT", "XYWZ_ORDR_STAT");
    	addOracleLookup("IS_ALTER_CERT", "XYWZ_IF_FLAG");
    	addOracleLookup("IS_NT_RECV_LC", "XYWZ_IF_FLAG");
    	addOracleLookup("PAY_MD", "XYWZ_PAY_MD");
    	addOracleLookup("BRGN_MODE","XYWZ_BRGN_MODE");
    	addOracleLookup("CUR","XYWZ_CUR"); 
    	addOracleLookup("BELG_CORP","XYWZ_SALE_BELG_CORP"); 
    	addOracleLookup("CHK_STAT", "XYWZ_IF_FLAG");
    	addOracleLookup("PAY_CODE", "XYWZ_TX_TYP");
    	addOracleLookup("SCHEDU_STATUS", "XYWZ_SCHEDU_STATUS");
    	
    	datasource = ds;
    }
	
//	@Autowired
//	public void init() {
//		model = new XywzSaleFrgnOrdrContr();
//		setCommonService(xywzSaleFrgnOrdrContrService);
//
//	}
	


}
