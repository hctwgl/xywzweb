package com.xywz.logi.action;

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
@Action(value="/XywzLogiCfmSnglQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzLogiCfmSnglQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.*,T1.CORP_NM," +
    			"T2.PORT_NAME_CN AS LOAD_TRAFF_PORT_NAME,T3.PORT_NAME_CN AS AIM_PORT_NAME,T4.PORT_NAME_CN AS UNLOAD_GDS_PORT_NAME,T5.AGENT_NAMR " +
    			"FROM XYWZ_LOGI_CFM_SNGL t " +
    			"INNER JOIN XYWZ_LOGI_SHIP_CORP_MGMT T1 "+
    			"ON T.SHIP_CORP = T1.SHIP_CORP_ID "+
    			"LEFT JOIN XYWZ_LOGI_PORT_INFO_MGMT T2 "+
    			"ON ( T.LOAD_TRAFF_PORT = T2.PORT_ID ) "+
    			"LEFT JOIN XYWZ_LOGI_PORT_INFO_MGMT T3 "+
    			"ON ( T.AIM_PORT = T3.PORT_ID ) "+
    			"LEFT JOIN XYWZ_LOGI_PORT_INFO_MGMT T4 "+
    			"ON ( T.UNLOAD_GDS_PORT = T4.PORT_ID ) "+
    			"LEFT OUTER JOIN XYWZ_LOGI_GOODS_AGENT_CORP_MGMT T5 "+
    			"ON ( T.GDS_SEND_CORP = T5.AGENT_ID ) "+
    			"  where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("outTranNum")){
                    sb.append(" and t.OUT_TRAN_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("sellContrNum")){
                	sb.append(" and t.SELL_CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("gdsSendCorp")){
                	sb.append(" and t.GDS_SEND_CORP = "+this.getJson().get(key));
                }else if (key.equals("shipCorp")){
                	sb.append(" and SHIP_CORP like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }

    	setPrimaryKey("OUT_TRAN_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("CHARGE_COST_PAY_MODE","XYWZ_TRAN_FEE_TYPE");
    	addOracleLookup("CHK_STAT","XYWZ_EXAM_STATE");
    	addOracleLookup("CUR","XYWZ_CUR");
    	datasource = ds;
    }
}
