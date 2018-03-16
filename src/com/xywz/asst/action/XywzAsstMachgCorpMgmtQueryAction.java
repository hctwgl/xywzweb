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
@Action(value="/XywzAsstMachgCorpMgmtQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzAsstMachgCorpMgmtQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from XYWZ_ASST_MACHG_CORP_MGMT t  where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("bizCate")){
                    sb.append(" and t.BIZ_CATE like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("asstMachgNm")){
                	sb.append(" and t.ASST_MACHG_NM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("asstMachgId")){
                	sb.append(" and t.ASST_MACHG_ID like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }

    	setPrimaryKey("t.ASST_CORP_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("BIZ_CATE", "XYWZ_ASST_BIZ_CATE");
    	addOracleLookup("ASST_MACHG_STAT", "XYWZ_PROVR_STAT");
    	addOracleLookup("CHK_STAT", "XYWZ_IF_FLAG");
    	addOracleLookup("ASST_MACHG_LVL", "XYWZ_MACHG_LVL");
    	datasource = ds;
    }
}
