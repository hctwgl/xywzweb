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


/*
 * 外贸发票商品明细Action
 * @author 
 * @since 
 */


@ParentPackage("json-default")
@Action(value="/XywzSaleInvMerchdDtlQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzSaleInvMerchdDtlQueryAction extends BaseQueryAction {
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
    	 sb=new StringBuilder("select t1.* from (" +
    			"select m1.*,m2.CHK_STAT from XYWZ_SALE_INV_MERCHD_DTL m1 " +
    			"inner join  XYWZ_SALE_FRGN_ORDR_CONTR m2 on m1.CONTR_NUM=m2.CONTR_NUM " +
    			") t1  " +
    			"" +
    			"where 1=1 ");
    	}else{
    		
    		 sb=new StringBuilder("select t1.* from (" +
    	    			"select m1.*,m2.CHK_STAT,m2.Sell_Princ_Id,m2.Mak_Doc_Pers_Id " +
    	    			"from XYWZ_SALE_INV_MERCHD_DTL m1 " +
    	    			"inner join  XYWZ_SALE_FRGN_ORDR_CONTR m2 " +
    	    			"on m1.CONTR_NUM=m2.CONTR_NUM " +
    	    			") t1  " +
    	    			"" +
    	    			"where t1.Sell_Princ_Id='"+auth.getUserId()+"' or t1.Mak_Doc_Pers_Id ='"+auth.getUserId()+"'");
	
    	}
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
            	System.out.print(key);
                if(key.equals("contrNum")){
                    sb.append(" and t1.Contr_Num like '%"+this.getJson().get(key)+"%'");
//                }else if(key.equals("quotnSnglId")){
//                	sb.append(" and t1.QUOTN_SNGL_ID like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }

    	setPrimaryKey("t1.Merchd_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("CHK_STAT", "XYWZ_IF_FLAG");
    	addOracleLookup("CUR","XYWZ_CUR"); 
    	datasource = ds;
    }
}
