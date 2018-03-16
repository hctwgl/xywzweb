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
@Action(value="/XywzSaleInvInfoQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzSaleInvInfoQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	
    	StringBuilder sb=new StringBuilder("select t1.*,T2.CUST_SHT_NM AS CUST_NM,T3.PORT_NAME_CN AS LOAD_PORT_NM,T4.PORT_NAME_CN AS DES_PORT_NM" +
    			" from XYWZ_SALE_INV_INFO t1  " +
    			"INNER JOIN XYWZ_CUST_CUSTINFO T2 "+
    			"ON ( T1.CHKS_PERS = T2.CUST_ID ) "+
    			"INNER JOIN XYWZ_LOGI_PORT_INFO_MGMT T3 "+
    			"ON ( T1.PORTOFLOADING = T3.PORT_ID ) "+
    			"INNER JOIN XYWZ_LOGI_PORT_INFO_MGMT T4 "+
    			"ON ( T1.PORTOFDESTINATION = T4.PORT_ID ) "+
    			"where 1=1 ");
 
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
            	System.out.print(key);
                if(key.equals("invStat")){
                    sb.append(" and t1.INV_STAT like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("chkPers")){
                	sb.append(" and t1.Chks_Pers like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("invNum")){
                	sb.append(" and t1.INV_NUM like '%"+this.getJson().get(key)+"%'");
                }    
            }
        }

    	setPrimaryKey("t1.Inv_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("INV_STAT", "INV_STAT_FLAG");
    	addOracleLookup("CUR", "XYWZ_CUR");
//    	addOracleLookup("INV_STAT", "INV_STAT_FLAG");
    	datasource = ds;
    }
}
