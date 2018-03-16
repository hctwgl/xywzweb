package com.xywz.sysm.action;

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
@Action(value="/XywzSysmMsgRmndQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzSysmMsgRmndQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();  
        String userId = auth.getUserId(); 
        String roleLvl="0";
        String roleCode="";
        List userCode=auth.getRolesInfo();
        for( int i=0;i<userCode.size();i++ ){
        	Map role = (Map)auth.getRolesInfo().get(i);
        	roleCode = role.get("ROLE_CODE").toString();
        	if (roleCode.equals("admin") || roleCode.equals("zhhz") ){
        		roleLvl="1" ;
        		break;
        	}
        	
        }
        String msgType = request.getParameter("msgType");
        
		StringBuilder sb=new StringBuilder("select t.* " +
			"from XYWZ_SYSM_MSG_RMND t " +
			"  where 1=1 ");
    	if (!roleLvl.equals("1")){
    		sb.append(" and RECV_CSTID = '" +roleCode+"'");
        };
    	if(null!=msgType&&!msgType.equals("")){   		
    		sb.append(" and t.REM_NAME = '" +msgType+"' and READ_FLAG<>'1'");
    	}
        
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("remName")){
                    sb.append(" and t.REM_NAME like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("validFlag")){
                	sb.append(" and t.VALID_FLAG like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("readFlag")){
                	sb.append(" and t.READ_FLAG like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("dtFrom")){
                	sb.append(" and t.REM_BEG_DT >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("dtTo")){
                	sb.append(" and t.REM_BEG_DT <= '"+this.getJson().get(key)+"'");
                }   
            }
        }

    	setPrimaryKey("t.REM_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("REM_NAME", "XYWZ_REM_NAME");
    	addOracleLookup("VALID_FLAG", "XYWZ_VALID_FLAG");
    	addOracleLookup("READ_FLAG", "XYWZ_READ_FLAG");
    	datasource = ds;
    }
}
