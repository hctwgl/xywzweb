package com.xywz.cust.action;

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
@Action(value="/XywzCustCustBankQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzCustCustBankQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	
        String userName=auth.getUserId();
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

    	StringBuilder sb=new StringBuilder("select t.CUST_BANK_ID,t.CUST_ID,t.ACCT_NUM,t.BANK_FULL_NM," +
    			"t.BANK_ADDR,t.BANK_TEL,t.SWIFT_CODE,t.FAX,T1.Cust_Sht_Nm AS CUST_SHT_NM ,t.CUST_TAX,t.MEMO " +
    			"from  XYWZ_CUST_CUSTBANK t " +
    			"INNER JOIN XYWZ_CUST_CUSTINFO T1 " +
    			"ON T.CUST_ID = T1.CUST_ID " +
//    			"LEFT OUTER JOIN XYWZ_CUST_CUSTBANK T2 "+
//    			"ON T.BANK_ID = T2.BANK_ID "+
    			"  where 1=1 ");
    	
    	if (!roleLvl.equals("1")){
    		sb.append("and ( t1.BIZ_MEM = '"+userName+"'");
    		sb.append(" or t1.FORM_CONTCR like '%"+userName+"%' )");
    	}
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("custId")){
                    sb.append(" and t.CUST_ID = "+this.getJson().get(key));
                }else if(key.equals("acctNum")){
                	sb.append(" and t.ACCT_NUM like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("bankFullNm")){
                	sb.append(" and t.BANK_FULL_NM LIKE '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("swiftCode")){
                	sb.append(" and SWIFT_CODE like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }

    	setPrimaryKey("CUST_BANK_ID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
