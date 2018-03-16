package com.xywz.sale.action;

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


@ParentPackage("json-default")
@Action(value="/XywzSaleInlandOrdrContrQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzSaleInlandOrdrContrQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  	
    	StringBuilder sb=null;
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
    	if( roleLvl.equals("1") ){
    	    sb=new StringBuilder("select t1.*,case when T8.SCHEDU_STATUS is null then '0' else T8.SCHEDU_STATUS end as SCHEDU_STATUS" +
    	    		" from XYWZ_SALE_INLAND_ORDR_CONTR t1 " +
    	    		"LEFT JOIN (select Contr_Num,SCHEDU_STATUS,COUNT(*) from XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL where SCHEDU_STATUS=1 group by Contr_Num,SCHEDU_STATUS) T8 " +
        			"ON t1.Contr_Num = T8.Contr_Num  "+
    	    		"  where 1=1 ");
    	}else{
    		sb=new StringBuilder("select t1.*,case when T8.SCHEDU_STATUS is null then '0' else '1' end as SCHEDU_STATUS" +
    				" from XYWZ_SALE_INLAND_ORDR_CONTR t1 " +
    				"LEFT JOIN (select Contr_Num,SCHEDU_STATUS,COUNT(*) from XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL where SCHEDU_STATUS=1 group by Contr_Num,SCHEDU_STATUS) T8 " +
        			"ON t1.Contr_Num = T8.Contr_Num  "+
    				" where t1.Sell_Princ_Id ='"+auth.getUserId()+"' or t1.Mak_Doc_Pers_Id='"+auth.getUserId()+"'");	
    	}
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
//            	System.out.print(key);
                if(key.equals("ordrStat")){
                    sb.append(" and t1.ORDR_STAT like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("contrNum")){
                	sb.append(" and t1.CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }

    	setPrimaryKey("t1.ORDR_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("ORDR_STAT", "XYWZ_ORDR_STAT");
    	addOracleLookup("CUR","XYWZ_CUR"); 
    	addOracleLookup("BELG_CORP","XYWZ_SALE_BELG_CORP"); 
    	addOracleLookup("CHK_STAT", "XYWZ_IF_FLAG");
    	addOracleLookup("SCHEDU_STATUS", "XYWZ_SCHEDU_STATUS");
    	datasource = ds;
    }
}
