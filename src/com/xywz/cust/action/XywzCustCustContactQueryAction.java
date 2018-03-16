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
@Action(value="/XywzCustCustContactQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzCustCustContactQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
 //   	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
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

    	StringBuilder sb=new StringBuilder("select t2.*,t.CUST_SHT_NM,T3.USER_NAME from XYWZ_CUST_CUSTINFO t " +
    			"inner join XYWZ_CUST_CUSTCONTACT t2 "+
    			"on t.CUST_ID = t2.CUST_ID "+
    			"LEFT OUTER JOIN ADMIN_AUTH_ACCOUNT T3 "+
    			"ON T2.BIZ_MEM = T3.ACCOUNT_NAME"+
    			"  where 1=1 ");    	
    	
    	if (!roleLvl.equals("1")){
    		sb.append("and ( t.BIZ_MEM = '"+userName+"'");
    		sb.append(" or t.FORM_CONTCR like '%"+userName+"%' )");
    	}
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("persFstNm")){
                    sb.append(" and t2.PERS_FST_NM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("custId")){
                	sb.append(" and t2.CUST_ID = '"+this.getJson().get(key)+"'");
                }else if (key.equals("isNtPriContcr")){
                	sb.append(" and t2.IS_NT_PRI_CONTCR = '"+this.getJson().get(key)+"'");
                }else if (key.equals("bizMem")){
                	sb.append(" and t2.BIZ_MEM = '"+this.getJson().get(key)+"'");
                }else if (key.equals("postn")){
                	sb.append(" and t2.POSTN = '"+this.getJson().get(key)+"'");
                }else if (key.equals("gender")){
                	sb.append(" and t2.GENDER = '"+this.getJson().get(key)+"'");
                }else if (key.equals("imptDegr")){
                	sb.append(" and t2.IMPT_DEGR = '"+this.getJson().get(key)+"'");
                }     
            }
        }

    	setPrimaryKey("CUST_CONTCR_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("GENDER","XYWZ_GENDER_FLAG");
    	addOracleLookup("IMPT_DEGR","XYWZ_IMPORTANT_LEV");
    	addOracleLookup("IS_NT_PRI_CONTCR","XYWZ_IF_FLAG");
    	datasource = ds;
    }
}
