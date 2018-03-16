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
@Action(value="/XywzCustCustInfoQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzCustCustInfoQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String custNm=request.getParameter("condis");
    	//System.out.print(custNm);
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
       // System.out.println("roleCode;;;;;"+roleLvl);
        
    	StringBuilder sb=new StringBuilder("select CUST_ID,CUST_NO,BIZ_CATE,CUST_SHT_NM,CUST_CONTCR,"+
    			"CNTRY_URBN,CUST_FULL_NM,ADDR,SETUP_DT,T.BIZ_MEM_NM,CHK_STAT,"+
    			"CUST_LVL,INDS,PROD_SCOP,MKT_SCOP,CRDT_LVL,"+
                "TEL_OR_FAX,INPUT_PERS_NM,INPUT_DT,FINAL_MODI_DT,MODI_DT,CUST_SRC,CUST_TYP,"+
                "MDL_BUS,MDL_BUS_CONTCR,MDL_BUS_CONT_MODE,FORM_CONTCR,FORM_CONTCR_NM from XYWZ_CUST_CUSTINFO t " +
//                "LEFT OUTER JOIN ADMIN_AUTH_ACCOUNT T3 "+
//    			"ON T.BIZ_MEM = T3.ACCOUNT_NAME " +
    			"where 1=1 " );    	//
    	if (!roleLvl.equals("1")){
    		sb.append("and ( T.BIZ_MEM = '"+userName+"'");
    		sb.append(" or t.FORM_CONTCR like '%"+userName+"%' )");
    	}
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("custNo")){
                    sb.append(" and CUST_NO like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("bizCate")){
                	sb.append(" and t.BIZ_CATE = '"+this.getJson().get(key)+"'");
                }else if (key.equals("custShtNm")){
                	sb.append(" and t.CUST_SHT_NM = '"+this.getJson().get(key)+"'");
                }else if (key.equals("setupDt")){
                	sb.append(" and SETUP_DT = "+this.getJson().get(key));
                }else if (key.equals("custLvl")){
                	sb.append(" and CUST_LVL = '"+this.getJson().get(key)+"'");
                }else if (key.equals("crdtLvl")){
                	sb.append(" and CRDT_LVL = '"+this.getJson().get(key)+"'");
                }else if (key.equals("bizMem")){
                	sb.append(" and BIZ_MEM = '"+this.getJson().get(key)+"'");
                }else if (key.equals("custTyp")){
                	sb.append(" and CUST_TYP = '"+this.getJson().get(key)+"'");
                }else if (key.equals("custId")){
                	sb.append(" and CUST_ID = '"+this.getJson().get(key)+"'");
                }          
            }
        }

    	setPrimaryKey("CUST_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("BIZ_CATE","XYWZ_BIZ_CATE");
    	addOracleLookup("CHK_STAT","XYWZ_IF_FLAG");
    	addOracleLookup("CUST_LVL","XYWZ_CUST_GRADE_LVL");
    	addOracleLookup("CRDT_LVL","XYWZ_CUST_CREDIT_LVL");
    	addOracleLookup("CUST_TYP","XYWZ_CUST_TYPE");
    	addOracleLookup("CNTRY_URBN","XYWZ_COUNTRY");
    	datasource = ds;
    }
}
