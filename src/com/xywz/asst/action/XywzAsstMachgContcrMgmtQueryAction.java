package com.xywz.asst.action;

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
@Action(value="/XywzAsstMachgContcrMgmtQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzAsstMachgContcrMgmtQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select * from XYWZ_ASST_MACHG_CONTCR_MGMT where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("asstMachgId")){
                    sb.append(" and ASST_MACHG_ID like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("fstNm")){
                	sb.append(" and FST_NM like '%"+this.getJson().get(key)+"%'");
//                }else if (key.equals("isNtPriCont")){
//                	sb.append(" and IS_NT_PRI_CONT like '%"+this.getJson().get(key)+"%'");
//                }else if (key.equals("belgDept")){
//                	sb.append(" and BELG_DEPT like '%"+this.getJson().get(key)+"%'");
//                }else if (key.equals("setupDt")){
//                	sb.append(" and SETUP_DT like '%"+this.getJson().get(key)+"%'");
                }     
            }
        }

    	setPrimaryKey("CONTCR_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("GENDER", "XYWZ_GENDER_FLAG");
    	addOracleLookup("IS_NT_PRI_CONT", "XYWZ_IF_FLAG");
    	datasource = ds;
    }
}
