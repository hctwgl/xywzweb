package com.xywz.sale.action;

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
@Action(value="/XywzSaleInlandQuotnSnglQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzSaleInlandQuotnSnglQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

//    	StringBuilder sb=new StringBuilder(
//    			"SELECT t1.SNGL_ID,  t2.F_VALUE as CHK_STAT_ORA, t1.QUOTN_SNGL_ID,  t1.QUOTN_DT,  t1.BIZ_CONTCR_ID, "+
//                "t1.BIZ_CONTCR_NM, t1.INPUT_PERS_ID,  t1.INPUT_PERS_NM, t1.INPUT_DT,  t1.LAST_MDFR_ID,  " +
//                "t1.LAST_MDFR, t1.LAST_MODI_DT FROM  xywz_sale_inland_quotn_sngl  t1 " +
//                "LEFT JOIN ocrm_sys_lookup_item t2 ON ( t1.CHK_STAT = t2.F_CODE AND t2.F_LOOKUP_ID = 'XYWZ_IF_FLAG' ) "+
//    	        " where 1=1 ");
    	
    	StringBuilder sb=new StringBuilder("select t1.* from xywz_sale_inland_quotn_sngl t1  where 1=1 ");
 
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
            	System.out.print(key);
                if(key.equals("chkStat")){
                    sb.append(" and t1.CHK_STAT like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("quotnSnglId")){
                	sb.append(" and t1.QUOTN_SNGL_ID like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }

    	setPrimaryKey("t1.SNGL_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("CHK_STAT", "XYWZ_IF_FLAG");
    	datasource = ds;
    }
}
