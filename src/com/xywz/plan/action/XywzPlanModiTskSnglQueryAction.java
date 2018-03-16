package com.xywz.plan.action;

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
 * 车间作业通知单管理
 */

@ParentPackage("json-default")
@Action(value="/XywzPlanModiTskSnglQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanModiTskSnglQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String contrNum=request.getParameter("contrNum");
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder(
    			"SELECT "
    			+"TT.CONTR_NUM, "
    			+"TT.HS_CODE, "
    			+"TT.MATERIALS, "
    			+"TT.MODEL, "
    			+"TT.LEN, "
    			+"TT.WEIGHT_TOLERANCE, "
    			+"TT.QTY, "
    			+"TT.ZHI_CNT, "
    			+"TT.TOTAL_JIAN, "
    			+"TT.TOTAL_REM_ZHI, "
    			+"TT.BEF_PKG, "
    			+"TT.AFTER_WEIGHT, "
    			+"TT.PKG, "
    			+"TT.FINAL_TRAFF_DAY, "
    			+"TT.USER_NAME "
    			+"FROM ( "
    			+"SELECT "
    			+"T1.CONTR_NUM,"
    			+"T3.HS_CODE,"
    			+"T3.MATERIALS,"
    			+"T3.MODEL,"
    			+"T3.LEN,"
    			+"T3.WEIGHT_TOLERANCE,"
    			+"T3.QTY,"
    			+"T4.ZHI_CNT,"
    			+"floor(T3.QTY*1000/(T4.LEN*T5.WEIGHT)/T4.ZHI_CNT) as TOTAL_JIAN,"
    			+"mod(floor(T3.QTY*1000/(T4.LEN*T5.WEIGHT)),T4.ZHI_CNT) as TOTAL_REM_ZHI,"
    			+"CASE WHEN mod(floor(T3.QTY*1000/(T4.LEN*T5.WEIGHT)),T4.ZHI_CNT) > 0 "
    			+"  THEN CONCAT(floor(T4.ZHI_CNT),'PX',floor(T3.QTY*1000/(T4.LEN*T5.WEIGHT)/T4.ZHI_CNT),'B','+',mod(floor(T3.QTY*1000/(T4.LEN*T5.WEIGHT)),T4.ZHI_CNT),'PX1B' ) "
    			+"ELSE CONCAT(floor(T4.ZHI_CNT),'PX',floor(T3.QTY*1000/(T4.LEN*T5.WEIGHT)/T4.ZHI_CNT),'B') END AS BEF_PKG,"
    			+"T.WEIGHT AS AFTER_WEIGHT,"
    			+"CASE WHEN T.REM_ZHI_CNT > 0 THEN CONCAT(floor(T.ZHI_CNT),'PX',floor(T.JIAN_CNT),'B','+',floor(T.REM_ZHI_CNT),'PX1B' ) ELSE CONCAT(floor(T.ZHI_CNT),'PX',floor(T.JIAN_CNT),'B') END AS PKG,"
    			+"T1.FINAL_TRAFF_DAY,"
    			+"T2.USER_NAME "
    			+"from XYWZ_SALE_FRGN_ORDR_CONTR T1 "  
    			+"INNER JOIN ( " 
    			+"SELECT T0.CONTR_NUM,T0.HS_CODE,T0.MATERIALS,T0.MODEL,T0.LEN,T0.WEIGHT_TOLERANCE,SUM(T0.QTY) AS QTY " 
    			+"FROM XYWZ_SALE_INV_MERCHD_DTL T0 GROUP BY T0.CONTR_NUM,T0.HS_CODE,T0.MATERIALS,T0.MODEL,T0.LEN,T0.WEIGHT_TOLERANCE ) T3 "
    			+"ON ( T1.CONTR_NUM = T3.CONTR_NUM ) "
    			+"LEFT OUTER JOIN XYWZ_SYSM_PRODUCT_PKG T4 "
    			+"ON ( T3.HS_CODE = T4.HS_CODE AND T3.MODEL=T4.SIZE AND T3.LEN=T4.LEN ) "
    			+"LEFT OUTER JOIN XYWZ_SYSM_PRODUCT_DETAIL T5 "
    			+"ON ( T4.HS_CODE = T5.HS_CODE AND T4.SIZE = CONCAT(T5.SIZE,'X',truncate(T5.WAIST_DEPTH,2),'MM','X',truncate(T5.WEIGHT,2),'KG','/M') ) "
    			+"INNER JOIN XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL t  "
    			+"ON (T3.CONTR_NUM = T.CONTR_NUM AND T3.MODEL = T.SPC_MODEL AND T3.HS_CODE = T.PRD_NAME AND T3.LEN = T.LEN AND T.CHANNAL_TYPE='1' AND T.SCHEDU_STATUS='0' AND T3.MATERIALS = T.MATERIALS ) "
    			+"INNER JOIN ADMIN_AUTH_ACCOUNT T2  "
    			+"ON (T1.MAK_DOC_PERS_ID = T2.ACCOUNT_NAME)  "
    			+"WHERE T1.CHK_STAT='1'  " //外贸
    			+"UNION ALL  "
    			+"SELECT  "
    			+"T.CONTR_NUM, "
    			+"T3.HS_CODE, "
    			+"T3.MATERIALS, "
    			+"T3.SPC_MODEL AS MODEL, "
    			+"T3.LEN, "
    			+"T3.NGTV_POOR AS WEIGHT_TOLERANCE, "
    			+"T3.QTY, "
    			+"T4.ZHI_CNT, "
    			+"floor(T3.QTY*1000/(T4.LEN*T5.WEIGHT)/T4.ZHI_CNT) as TOTAL_JIAN, "
    			+"mod(floor(T3.QTY*1000/(T4.LEN*T5.WEIGHT)),T4.ZHI_CNT) as TOTAL_REM_ZHI, "
    			+"CASE WHEN mod(floor(T3.QTY*1000/(T4.LEN*T5.WEIGHT)),T4.ZHI_CNT) > 0  "
    			+"  THEN CONCAT(floor(T4.ZHI_CNT),'PX',floor(T3.QTY*1000/(T4.LEN*T5.WEIGHT)/T4.ZHI_CNT),'B','+',mod(floor(T3.QTY*1000/(T4.LEN*T5.WEIGHT)),T4.ZHI_CNT),'PX1B' )  "
    			+"ELSE CONCAT(floor(T4.ZHI_CNT),'PX',floor(T3.QTY*1000/(T4.LEN*T5.WEIGHT)/T4.ZHI_CNT),'B') END AS BEF_PKG, "
    			+"T.WEIGHT AS AFTER_WEIGHT, "
    			+"CASE WHEN T.REM_ZHI_CNT > 0 THEN CONCAT(floor(T.ZHI_CNT),'PX',floor(T.JIAN_CNT),'B','+',floor(T.REM_ZHI_CNT),'PX1B' ) ELSE CONCAT(floor(T.ZHI_CNT),'PX',floor(T.JIAN_CNT),'B') END AS PKG, "
    			+"T1.FINAL_TRAFF_DAY, "
    			+"T2.USER_NAME "
    			+"from XYWZ_SALE_INLAND_ORDR_CONTR T1  "
    			+"INNER JOIN ( " 
    			+"SELECT T0.HS_CODE,T0.MATERIALS,T0.SPC_MODEL,T0.LEN,T0.NGTV_POOR,T0.INLAND_ORDR_NUM,SUM(T0.QTY) AS QTY " 
    			+"FROM XYWZ_SALE_INLAND_MERCHD_DTL T0 GROUP BY T0.HS_CODE,T0.MATERIALS,T0.SPC_MODEL,T0.LEN,T0.NGTV_POOR,T0.INLAND_ORDR_NUM ) T3 "
    			+"ON ( T1.CONTR_NUM = T3.INLAND_ORDR_NUM ) "
    			+"LEFT OUTER JOIN XYWZ_SYSM_PRODUCT_PKG T4 "
    			+"ON ( T3.HS_CODE = T4.HS_CODE AND T3.SPC_MODEL=T4.SIZE AND T3.LEN=T4.LEN ) "
    			+"LEFT OUTER JOIN XYWZ_SYSM_PRODUCT_DETAIL T5 "
    			+"ON ( T4.HS_CODE = T5.HS_CODE AND T4.SIZE = CONCAT(T5.SIZE,'X',truncate(T5.WAIST_DEPTH,2),'MM','X',truncate(T5.WEIGHT,2),'KG','/M') ) "
    			+"INNER JOIN XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL t  "
    			+"ON (T3.INLAND_ORDR_NUM = T.CONTR_NUM " 
    			+"AND T3.SPC_MODEL = T.SPC_MODEL AND T3.HS_CODE = T.PRD_NAME " 
    			+"AND T.CHANNAL_TYPE='1' AND T.SCHEDU_STATUS='0' AND T3.MATERIALS = T.MATERIALS) "
    			+"INNER JOIN ADMIN_AUTH_ACCOUNT T2  "
    			+"ON (T1.MAK_DOC_PERS_ID = T2.ACCOUNT_NAME)  "
    			+"where T1.CHK_STAT='1'  "  //内贸
    			+")TT "//内贸
    			+"WHERE 1=1 AND TT.QTY <> TT.AFTER_WEIGHT ");
    	if (contrNum != null){
    		sb.append("AND TT.CONTR_NUM LIKE '%"+contrNum+"%'");
    	}
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("CONTR_NUM")){
                	sb.append(" and TT.CONTR_NUM LIKE '%"+this.getJson().get(key)+"%'");
                }
            }
        }
//        addOracleLookup("MERCHD_TYPE", "XYWZ_MERCHD_TYPE");
//        addOracleLookup("WORKSHOP", "XYWZ_WORKSHOP");
    	setPrimaryKey("TT.HS_CODE desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
