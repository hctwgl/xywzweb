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
@Action(value="/XywzLogiDelvMerchdNewQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzLogiDelvMerchdNewQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select T.ID,T.SEND_SHEET_ADVS_NUM,T.CONTR_NUM,T.ZHI_CNT,T.SPC_MODEL,T.HS_CODE," +
    			"T.MATERIALS,T.REM_ZHI_CNT,T.LEN,T.QTY,T.WEIGHT,T.CUST_ID,CST.CUST_SHT_NM " +
    			" from XYWZ_LOGI_DELV_MERCHD t " +
    			" INNER JOIN XYWZ_CUST_CUSTINFO CST " +
    			" ON ( T.CUST_ID = CST.CUST_ID )" +
    			"where T.ID not in(select send_id from xywzdb.xywz_sale_label_mgmt where send_id is not null ) ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("sendSheetAdvsNum")){
                    sb.append(" and t.SEND_SHEET_ADVS_NUM = "+this.getJson().get(key));
                }   
            }
        }
        sb.append(" ORDER BY T.SEND_SHEET_ADVS_NUM ASC ");

    	//setPrimaryKey("ID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
