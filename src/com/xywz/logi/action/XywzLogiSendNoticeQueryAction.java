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
@Action(value="/XywzLogiSendNoticeQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzLogiSendNoticeQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.*,T1.PORT_NAME_CN AS PORT_NAME_CN, T2.PORT_NAME_CN AS UN_PORT_NAME_CN,T3.CORP_NM,T4.AGENT_NAMR,CST.CUST_SHT_NM " +
    			"from XYWZ_LOGI_SEND_NOTICE t " +
    			"INNER JOIN ( " +
    			"SELECT SEND_SHEET_ADVS_NUM,MAX(LAST_MODIFY_TIME) AS LAST_MODIFY_TIME " +
    			"FROM XYWZ_LOGI_SEND_NOTICE " +
    			"GROUP BY SEND_SHEET_ADVS_NUM) TT "+
    			"ON ( T.SEND_SHEET_ADVS_NUM=TT.SEND_SHEET_ADVS_NUM AND T.LAST_MODIFY_TIME=TT.LAST_MODIFY_TIME ) "+
    			"LEFT OUTER JOIN XYWZ_LOGI_PORT_INFO_MGMT T1 "+
    			"ON ( T.LOAD_PORT = T1.PORT_ID ) "+
    			"LEFT OUTER JOIN XYWZ_LOGI_PORT_INFO_MGMT T2 "+
    			"ON ( T.UNLOAD_PORT = T2.PORT_ID ) "+
    			"LEFT OUTER JOIN XYWZ_LOGI_SHIP_CORP_MGMT T3 "+
    			"ON ( T.SHIP_AGENT = T3.SHIP_CORP_ID ) "+
    			"LEFT OUTER JOIN XYWZ_LOGI_GOODS_AGENT_CORP_MGMT T4 "+
    			"ON ( T.GDS_AGENT = T4.AGENT_ID ) "+
    			"LEFT OUTER JOIN XYWZ_SALE_FRGN_ORDR_CONTR CON " +
    			"ON ( T.CONTR_NUM = CON.CONTR_NUM ) "+
    			"LEFT OUTER JOIN XYWZ_CUST_CUSTINFO CST "+
    			"ON CON.CUST_ID = CST.CUST_ID "+
    			"  where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("shipName")){
                    sb.append(" and t.Ship_Name like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("loadPort")){
                	sb.append(" and t.Load_Port like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("unloadPort")){
                	sb.append(" and t.Unload_Port like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("expctToPortDay")){
                	sb.append(" and Expct_To_Port_Day = '"+this.getJson().get(key)+"'");                	
                }else if (key.equals("shipAgent")){
                	sb.append(" and SHIP_AGENT = '"+this.getJson().get(key)+"'");                	
                }else if (key.equals("sendSheetAdvsId")){
                	sb.append(" and SEND_SHEET_ADVS_ID = "+this.getJson().get(key));                	
                }    
            }
        }

    	setPrimaryKey("SEND_SHEET_ADVS_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("CONFIRM_SEND","XYWZ_IF_FLAG");
    	datasource = ds;
    }
}
