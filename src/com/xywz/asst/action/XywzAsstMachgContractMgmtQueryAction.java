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
@Action(value="/XywzAsstMachgContractMgmtQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzAsstMachgContractMgmtQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from xywz_asst_machg_contract_mgmt t  where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("machgContrNum")){
                    sb.append(" and t.MACHG_CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("machgContrNm")){
                	sb.append(" and t.MACHG_CONTR_NM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("machgOrdrNm")){
                	sb.append(" and t.MACHG_ORDR_NM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("contrDtFrom")){
                	sb.append(" and t.CONTR_DT >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("contrDtTO")){
                	sb.append(" and t.CONTR_DT <= '"+this.getJson().get(key)+"'");
                }   
            }
        }

    	setPrimaryKey("ASST_CONTR_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("STL_CUR", "XYWZ_CUR");
    	addOracleLookup("GDS_MODE", "XYWZ_INSN_MODE");
    	addOracleLookup("PAY_MD", "XYWZ_PAY_MD");
    	datasource = ds;
    }
}
