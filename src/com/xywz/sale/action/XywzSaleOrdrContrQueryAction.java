package com.xywz.sale.action;
/**
 * 外贸+内贸合同QueryAction
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
@Action(value="/XywzSaleOrdrContrQueryAction", results={
    @Result(name="success", type="json")
})
//public class XywzSaleFrgnOrdrContrQueryAction extends CommonAction {
public class XywzSaleOrdrContrQueryAction extends BaseQueryAction {

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
        
//        SCHEDU_STATUS
//        0:已下计划
//        1：已排产
//        2：待质检
//        3：已质检
        
    	sb=new StringBuilder("select t.* from (" +
    			" select t1.ORDR_ID,t1.SIGN_DT,t1.CONTR_NUM,t1.CUST_ID" +
    			" ,T2.CUST_SHT_NM,t1.CUR,t1.CHK_STAT " +
    			" from  XYWZ_SALE_FRGN_ORDR_CONTR t1 " +
    			" left OUTER JOIN XYWZ_CUST_CUSTINFO T2 "+
    			" ON  T1.CUST_ID = T2.CUST_ID "+
    			" UNION ALL "+
    			" select t1.ORDR_ID,t1.CONTR_DT,t1.CONTR_NUM,t1.CUST_ID" +
    			" ,T2.CUST_SHT_NM,t1.CUR,t1.CHK_STAT" +
	    		" from XYWZ_SALE_INLAND_ORDR_CONTR t1 " +
    			" left OUTER JOIN XYWZ_CUST_CUSTINFO T2 "+
    			"ON  T1.CUST_ID = T2.CUST_ID "+
    			") t  where 1=1 " );
    	
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
    	addOracleLookup("CUR","XYWZ_CUR"); 
    	addOracleLookup("CHK_STAT", "XYWZ_IF_FLAG");
    	
    	datasource = ds;
    }
	
//	@Autowired
//	public void init() {
//		model = new XywzSaleFrgnOrdrContr();
//		setCommonService(xywzSaleFrgnOrdrContrService);
//
//	}
	


}
