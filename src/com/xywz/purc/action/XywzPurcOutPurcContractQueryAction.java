package com.xywz.purc.action;

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
@Action(value="/XywzPurcOutPurcContractQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPurcOutPurcContractQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from xywz_purc_out_purc_contract t  where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("provrNum")){
                    sb.append(" and t.PROVR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("puchSnglId")){
                	sb.append(" and t.PUCH_SNGL_ID like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("puchNm")){
                	sb.append(" and t.PUCH_NM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("chkStat")){
                	sb.append(" and t.CHK_STAT like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("contrDtFrom")){
                	sb.append(" and t.CONTR_DT >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("contrDtTo")){
                	sb.append(" and t.CONTR_DT <= '"+this.getJson().get(key)+"'");
                }   
            }
        }

    	setPrimaryKey(" t.ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("CHK_STAT", "XYWZ_IF_FLAG");
    	addOracleLookup("CFM_DVY", "XYWZ_IF_FLAG");
    	addOracleLookup("ORDR_CURR_STAT", "XYWZ_ORDR_STAT");
    	addOracleLookup("CURR_STP", "XYWZ_CURR_STP");
    	addOracleLookup("STL_CUR", "XYWZ_CUR");
    	addOracleLookup("INSN_MODE", "XYWZ_INSN_MODE");
    	addOracleLookup("TRAFF_MODE", "XYWZ_SEND_TYPE");
    	addOracleLookup("PAY_MD", "XYWZ_PAY_MD");
    	datasource = ds;
    }
}
