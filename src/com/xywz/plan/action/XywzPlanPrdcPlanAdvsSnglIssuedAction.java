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
 * 下达任务
 */

@ParentPackage("json-default")
@Action(value="/XywzPlanPrdcPlanAdvsSnglIssuedAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanPrdcPlanAdvsSnglIssuedAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	String idStr= request.getParameter("idStr");
    	String operate= request.getParameter("operate");
    	String percent= request.getParameter("percent");
    	double per = 1.0;
    	if(null!=operate&&null!=percent&&operate.equals("add")){
    		per = per+Double.parseDouble(percent);
    	}else if(null!=operate&&null!=percent&&operate.equals("delete")){
    		per = per-Double.parseDouble(percent);
    	}
    	
    	StringBuilder sb=new StringBuilder("SELECT TT.ID,TT.CHDID,TT.CONTR_NUM,TT.HS_CODE,TT.SPC_MODEL,TT.MATERIALS,TT.SQTY  AS SQTY,(TT.QTY*"+per+") AS QTY, TT.TOLERANCE, "
    											+"  CASE WHEN TT.PKG='' THEN '1' ELSE COALESCE(TT.PKG,'1') END AS PKG,TT.LEN,TT.MEMO,TT.TYPE,WT.WEIGHT,PK.ZHI_CNT AS ZHI_CNT,TRUNCATE((TRUNCATE((TT.QTY*"+per+"*1000)/WT.WEIGHT/TT.LEN,0))/PK.ZHI_CNT,0) AS JIAN_CNT,"
    											+" MOD(TRUNCATE((TT.QTY*"+per+"*1000)/WT.WEIGHT/TT.LEN,0),PK.ZHI_CNT) AS REM_ZHI_CNT,TRUNCATE((TT.QTY*"+per+"*1000)/WT.WEIGHT/TT.LEN,0) AS SUM_ZHI"
    										    +"  FROM (" 
    			                                +"  SELECT  "
    											+"	CONCAT('W',inv.MERCHD_ID) AS ID,         "
												+"	inv.MERCHD_ID AS CHDID,                  "
												+"	inv.CONTR_NUM AS CONTR_NUM,              "
												+"	inv.HS_CODE AS HS_CODE,                  "
												+"	inv.MODEL AS SPC_MODEL,                  "
												+"	inv.MATERIALS AS MATERIALS,              "
												+"	inv.QTY AS SQTY,                         "
												+"	inv.QTY AS QTY,                          "
												+"	inv.PKG AS PKG,                          "
												+"	inv.LEN AS LEN,                          "
												+"	inv.MEMO AS MEMO,                        "
												+"  inv.WEIGHT_TOLERANCE AS TOLERANCE,                    "
												+"	'0' AS TYPE                              "
												+"FROM                                       "
												+"	XYWZ_SALE_INV_MERCHD_DTL inv             "
												+" INNER JOIN XYWZ_SALE_FRGN_ORDR_CONTR CON"
												+" ON inv.CONTR_NUM =CON.CONTR_NUM AND CON.CHK_STAT='1'"
												+" WHERE NOT EXISTS(SELECT 1 FROM XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL sngl WHERE sngl.MERCHD_TYPE='0' AND sngl.MERCHD_ID=inv.MERCHD_ID ) "
												+"UNION ALL                                  "
												+"SELECT                                     "
												+"	CONCAT('N',inland.INLAND_MERCHANDISE_ID) AS ID,   "
												+"	inland.INLAND_MERCHANDISE_ID AS CHDID,   "
												+"	inland.INLAND_ORDR_NUM AS CONTR_NUM,     "
												+"	inland.HS_CODE AS HS_CODE,               "
												+"	inland.SPC_MODEL AS SPC_MODEL,           "
												+"	inland.MATERIALS AS MATERIALS,           "
												+"	inland.QTY AS SQTY,                      "
												+"	inland.QTY AS QTY,                       "
												+"	inland.PKG AS PKG,                       "
												+"	inland.LEN AS LEN,                       "
												+"	inland.MEMO AS MEMO,                     "
												+"  inland.NGTV_POOR AS TOLERANCE,    "
												+"	'1' AS TYPE                              "
												+"FROM                                       "
												+"	XYWZ_SALE_INLAND_MERCHD_DTL inland       "
												+" WHERE NOT EXISTS(SELECT 1 FROM XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL sngl WHERE sngl.MERCHD_TYPE='1' AND sngl.MERCHD_ID=inland.INLAND_MERCHANDISE_ID ) "
    											+")TT LEFT JOIN XYWZ_SYSM_PRODUCT_DETAIL WT ON TT.HS_CODE = WT.HS_CODE AND TT.SPC_MODEL = CONCAT(WT.SIZE,'X',TRUNCATE (WT.WAIST_DEPTH, 2),'MM','X',TRUNCATE (WT.WEIGHT, 2),'KG','/M')"
    											+" LEFT JOIN XYWZ_SYSM_PRODUCT_PKG PK ON TT.SPC_MODEL = PK.SIZE AND TT.LEN = PK.LEN AND PK.HS_CODE = TT.HS_CODE WHERE 1 = 1 ");    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SPC_MODEL")){
                    sb.append(" and TT.SPC_MODEL = '"+this.getJson().get(key)+"'");
                }else if(key.equals("CONTR_NUM")){
                	sb.append(" and TT.CONTR_NUM = '"+this.getJson().get(key)+"'");
                }   
            }
        }
    	sb.append(" and TT.ID in ("+idStr+")");  
    	setPrimaryKey("TT.ID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
    
}
