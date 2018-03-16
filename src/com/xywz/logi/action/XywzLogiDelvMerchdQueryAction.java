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
@Action(value="/XywzLogiDelvMerchdQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzLogiDelvMerchdQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder(
//    			"select T.ID,T.SEND_SHEET_ADVS_ID,T.GDS_SRC,T.HS_CODE,T.MATERIALS,T.SPC_MODEL,T.QTY,T.PKG,T.GDS_LENGTH," +
//    			"T.SEND_SHEET_ADVS_NUM,T.CUST_ID,(T.GDS_LENGTH*T.ZHI_CNT*T.QTY*T2.WEIGHT+T.REM_ZHI_CNT*T.GDS_LENGTH*T2.WEIGHT)/1000 AS WEIGHT," +
//    			"T.CONTR_NUM,T.ZHI_CNT,T.OUT_ID,T.REM_ZHI_CNT,t.NGTV_POOR,T1.CONFIRM_SEND," +
//    			"(CASE WHEN T.QTY IS NULL THEN 0.00 ELSE T.QTY END) * (CASE WHEN T.ZHI_CNT IS NULL THEN 0.00 ELSE T.ZHI_CNT END) +(CASE WHEN T.REM_ZHI_CNT IS NULL THEN 0.00 ELSE T.REM_ZHI_CNT END) AS TOTAL_ZHI " +
//    			"from XYWZ_LOGI_DELV_MERCHD t " +
//    			"INNER JOIN XYWZ_LOGI_SEND_NOTICE T1 " +
//    			"ON T.SEND_SHEET_ADVS_NUM = T1.SEND_SHEET_ADVS_NUM " +
//    			"INNER JOIN (SELECT SEND_SHEET_ADVS_NUM,MAX(LAST_MODIFY_TIME) AS LAST_MODIFY_TIME " +
//    			"FROM XYWZ_LOGI_SEND_NOTICE GROUP BY SEND_SHEET_ADVS_NUM )TX "+
//    			"ON ( T1.SEND_SHEET_ADVS_NUM = TX.SEND_SHEET_ADVS_NUM AND T1.LAST_MODIFY_TIME = TX.LAST_MODIFY_TIME ) "+
//    			"INNER JOIN xywz_sysm_product_detail T2 "+
//    			"ON ( T.SPC_MODEL = CONCAT(T2.SIZE,'X',truncate(T2.WAIST_DEPTH,2),'MM','X',truncate(T2.WEIGHT,2),'KG','/M') ) " +
//    			"INNER JOIN ( SELECT SEND_SHEET_ADVS_NUM,GDS_SRC,HS_CODE,MATERIALS,SPC_MODEL,GDS_LENGTH,CUST_ID,NGTV_POOR,ZHI_CNT,MAX(MODIFY_DT) AS MODIFY_DT " +
//    			"FROM XYWZ_LOGI_DELV_MERCHD " +
//    			"GROUP BY SEND_SHEET_ADVS_NUM,GDS_SRC,HS_CODE,MATERIALS,SPC_MODEL,GDS_LENGTH,CUST_ID,NGTV_POOR,ZHI_CNT )TT "+
//    			"ON ( T.SEND_SHEET_ADVS_NUM = TT.SEND_SHEET_ADVS_NUM AND T.GDS_SRC = TT.GDS_SRC AND T.HS_CODE=TT.HS_CODE " +
//    			"AND T.MATERIALS = TT.MATERIALS AND T.SPC_MODEL = TT.SPC_MODEL AND T.GDS_LENGTH = TT.GDS_LENGTH " +
//    			"AND T.CUST_ID = TT.CUST_ID AND T.NGTV_POOR = TT.NGTV_POOR AND T.MODIFY_DT = TT.MODIFY_DT AND T.ZHI_CNT = TT.ZHI_CNT ) " +
//    			"AND T.INSUPD_MOD IS NULL "+
//    			"  where 1=1 "
    			"select T.ID,T.SEND_SHEET_ADVS_ID,T.GDS_SRC,T.HS_CODE,T.MATERIALS,T.SPC_MODEL,T.QTY,T.GDS_LENGTH," +
    			"T.SEND_SHEET_ADVS_NUM,T.CUST_ID,(T.GDS_LENGTH*T.ZHI_CNT*T.QTY*T2.WEIGHT+T.REM_ZHI_CNT*T.GDS_LENGTH*T2.WEIGHT)/1000 AS WEIGHT," +
    			"T.CONTR_NUM,T.ZHI_CNT,T.OUT_ID,T.REM_ZHI_CNT,t.NGTV_POOR,T1.CONFIRM_SEND," +
    			"(CASE WHEN T.QTY IS NULL THEN 0.00 ELSE T.QTY END) * (CASE WHEN T.ZHI_CNT IS NULL THEN 0.00 ELSE T.ZHI_CNT END) +(CASE WHEN T.REM_ZHI_CNT IS NULL THEN 0.00 ELSE T.REM_ZHI_CNT END) AS TOTAL_ZHI, " +
    			"CASE WHEN T.REM_ZHI_CNT > 0 THEN CONCAT(floor(T.ZHI_CNT),'PX',floor(T.QTY),'B','+',floor(T.REM_ZHI_CNT),'PX1B' ) ELSE CONCAT(floor(T.ZHI_CNT),'PX',floor(T.QTY),'B') END AS PKG " +
    			"from XYWZ_LOGI_DELV_MERCHD t " +
    			"INNER JOIN XYWZ_LOGI_SEND_NOTICE T1 " +
    			"ON T.SEND_SHEET_ADVS_NUM = T1.SEND_SHEET_ADVS_NUM " +
    			"INNER JOIN xywz_sysm_product_detail T2 "+
    			"ON ( T.SPC_MODEL = CONCAT(T2.SIZE,'X',truncate(T2.WAIST_DEPTH,2),'MM','X',truncate(T2.WEIGHT,2),'KG','/M') ) " +
    			"  where 1=1 "
    			
    	);
    	
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
