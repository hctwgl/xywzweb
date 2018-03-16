package com.xywz.ware.action;

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
/*
 * 仓库出货查询
 */

@ParentPackage("json-default")
@Action(value="/XywzAddWareInvtyOutQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzAddWareInvtyOutQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String sendSheetAdvsNum=request.getParameter("sendSheetAdvsNum");
        System.out.print("sendSheetAdvsNum:::"+sendSheetAdvsNum);
    	StringBuilder sb=new StringBuilder("select CONCAT(T.PRD_NAME,T.SPC_MODEL,T.NGTV_POOR,T.LEN,T.OUT_ID) AS PRD_ID,'国阳' AS GDS_SRC,T.OUT_ID,T.INVTY_ID,T.CONTR_NUM,T.MERCHD_ID,T.PRD_NAME,T.SPC_MODEL," +
    			"T.NGTV_POOR,T.DENST,T.LEN,CASE WHEN ZHI_CNT IS NULL THEN 0 ELSE ZHI_CNT END AS ZHI_CNT," +
    			"CASE WHEN T.JIAN_CNT IS NULL THEN 0 ELSE T.JIAN_CNT END AS JIAN_CNT," +
    			"CASE WHEN T.JIAN_CNT IS NULL THEN 0 ELSE T.JIAN_CNT END AS JIAN_CNT1,"+
    			"CASE WHEN T.REM_ZHI_CNT IS NULL THEN 0 ELSE T.REM_ZHI_CNT END AS REM_ZHI_CNT," +
    			"CASE WHEN T.REM_ZHI_CNT IS NULL THEN 0 ELSE T.REM_ZHI_CNT END AS REM_ZHI_CNT1," +
    			"(T.LEN*T.ZHI_CNT*T.JIAN_CNT*T1.WEIGHT+(CASE WHEN T.REM_ZHI_CNT IS NULL THEN 0.00 ELSE T.REM_ZHI_CNT END)*T.LEN*T1.WEIGHT )/1000 AS WEIGHT,  " +
    			"T1.MATERIALS,T2.THEORY_WEIGHT,T1.WEIGHT AS LL_WEIGHT,SE.CONFIRM_SEND " +
    			"from XYWZ_WARE_INVTY_OUT t  " +
    			"INNER JOIN XYWZ_LOGI_SEND_NOTICE SE "+
    			"ON ( (T.CONTR_NUM = SE.CONTR_NUM OR T.OUT_CUST_ID = SE.CUST_ID ) AND SE.SEND_SHEET_ADVS_NUM='"+sendSheetAdvsNum+"') "+
    			" LEFT OUTER JOIN xywz_sysm_product_detail t1 "+
    			"ON ( T.SPC_MODEL = CONCAT(t1.SIZE,'X',truncate(t1.WAIST_DEPTH,2),'MM','X',truncate(t1.WEIGHT,2),'KG','/M') " +
    			"AND T.MATERIALS=T1.MATERIALS AND T.PRD_NAME = T1.HS_CODE ) "+
    			"LEFT OUTER JOIN XYWZ_WARE_PROD_PKG_STD T2 "+
    			"ON ( T.SPC_MODEL = T2.SPC AND T1.HS_CODE = T2.PRD_NAME ) " +
    			"where 1=1  "+
    			"AND ( T.WEIGHT>0 OR T.JIAN_CNT > 0) "
    	);
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("contrNum")){
                    sb.append(" and t.CONTR_NUM = '"+this.getJson().get(key)+"'");
                }else if(key.equals("merchdId")){
                	sb.append(" and t.MERCHD_ID = '"+this.getJson().get(key)+"'");
                }else if(key.equals("outWhsDt")){
                	sb.append(" and t.OUT_WHS_DT = '"+this.getJson().get(key)+"'");
                }else if(key.equals("outWhsDt")){
                	sb.append(" and t.OUT_WHS_DT = '"+this.getJson().get(key)+"'");
                }    
            }
        }

    	setPrimaryKey("t.OUT_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("GDS_SRC","XYWZ_SALE_BELG_CORP");
    	datasource = ds;
    }
}
