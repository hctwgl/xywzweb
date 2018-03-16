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
@Action(value="/XywzLogiDelvMerchdHisQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzLogiDelvMerchdHisQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select T.ID,T.SEND_SHEET_ADVS_ID,T.GDS_SRC,T.HS_CODE,T.MATERIALS,T.SPC_MODEL,T.QTY,T.PKG,T.GDS_LENGTH," +
    			"T.SEND_SHEET_ADVS_NUM,T.CUST_ID,(T.GDS_LENGTH*T.ZHI_CNT*T.QTY*T2.WEIGHT+T.REM_ZHI_CNT*T.GDS_LENGTH*T2.WEIGHT)/1000 AS WEIGHT," +
    			"T.CONTR_NUM,T.ZHI_CNT,T.OUT_ID,T.REM_ZHI_CNT,t.NGTV_POOR,t.INSERT_DT," +
    			"(CASE WHEN T.QTY IS NULL THEN 0.00 ELSE T.QTY END) * (CASE WHEN T.ZHI_CNT IS NULL THEN 0.00 ELSE T.ZHI_CNT END) +(CASE WHEN T.REM_ZHI_CNT IS NULL THEN 0.00 ELSE T.REM_ZHI_CNT END) AS TOTAL_ZHI " +
    			"from XYWZ_LOGI_DELV_MERCHD_HIS t " +
    			"INNER JOIN (" +
    			"SELECT SEND_SHEET_ADVS_NUM FROM XYWZ_LOGI_SEND_NOTICE_HIS GROUP BY SEND_SHEET_ADVS_NUM ) T1 " +
    			"ON T.SEND_SHEET_ADVS_NUM = T1.SEND_SHEET_ADVS_NUM " +
    			"INNER JOIN xywz_sysm_product_detail T2 "+
    			"ON ( T.SPC_MODEL = CONCAT(T2.SIZE,'X',truncate(T2.WAIST_DEPTH,2),'MM','X',truncate(T2.WEIGHT,2),'KG','/M') ) " +
    			"  where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("sendSheetAdvsNum")){
                    sb.append(" and t.SEND_SHEET_ADVS_NUM = "+this.getJson().get(key));
                }else if(key.equals("gdsSrc")){
                	sb.append(" and t.GDS_SRC like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("hsCode")){
                	sb.append(" and t.HS_CODE = '"+this.getJson().get(key)+"'");
                }else if (key.equals("materials")){
                	sb.append(" and MATERIALS like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("spcModel")){
                	sb.append(" and SPC_MODEL like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("insertDt")){
                	sb.append(" and INSERT_DT = '"+this.getJson().get(key)+"'");
                }   
            }
        }
        sb.append(" ORDER BY T.SEND_SHEET_ADVS_NUM ASC ");

    	//setPrimaryKey("ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("GDS_SRC","XYWZ_GOODS_SOURCE");
    	datasource = ds;
    }
}
