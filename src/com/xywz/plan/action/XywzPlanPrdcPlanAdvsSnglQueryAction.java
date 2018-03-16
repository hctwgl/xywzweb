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
 * 生产计划通知单
 */

@ParentPackage("json-default")
@Action(value="/XywzPlanPrdcPlanAdvsSnglQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanPrdcPlanAdvsSnglQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("SELECT TT.ID,TT.CHDID,TT.CONTR_NUM,TT.HS_CODE,TT.SPC_MODEL,TT.MATERIALS,TT.QTY,TT.TOLERANCE,"
    											+"  CASE WHEN TT.PKG='' THEN '1' ELSE COALESCE(TT.PKG,'1') END AS PKG,TT.LEN,TT.MEMO,TT.TYPE"
    										    +"  FROM (" 
    			                                +"  SELECT  "
    											+"	CONCAT('W',inv.MERCHD_ID) AS ID,         "
												+"	inv.MERCHD_ID AS CHDID,                  "
												+"	inv.CONTR_NUM AS CONTR_NUM,              "
												+"	inv.HS_CODE AS HS_CODE,                  "
												+"	inv.MODEL AS SPC_MODEL,                  "
												+"	inv.MATERIALS AS MATERIALS,              "
												+"	inv.QTY AS QTY,                          "
												+"	inv.WEIGHT_TOLERANCE AS TOLERANCE,       "
												+"	PROD_PACKING_FUNC(inv.HS_CODE,inv.MATERIALS,inv.MODEL,inv.QTY,inv.LEN) AS PKG,                          "
												+"	inv.LEN AS LEN,                          "
												+"	inv.MEMO AS MEMO,                        "
												+"	'0' AS TYPE                              "
												+"FROM                                       "
												+"	XYWZ_SALE_INV_MERCHD_DTL inv             "
												+" INNER JOIN XYWZ_SALE_FRGN_ORDR_CONTR CON"
												+" ON inv.CONTR_NUM =CON.CONTR_NUM AND CON.CHK_STAT='1' "
												+" WHERE NOT EXISTS(SELECT 1 FROM XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL sngl " 
												+"WHERE sngl.MERCHD_TYPE='0' AND INV.CONTR_NUM=SNGL.CONTR_NUM AND sngl.PRD_NAME = inv.HS_CODE AND sngl.SPC_MODEL = INV.MODEL AND SNGL.LEN=INV.LEN ) "
												+"UNION ALL                                  "
												+"SELECT                                     "
												+"	CONCAT('N',inland.INLAND_MERCHANDISE_ID) AS ID,   "
												+"	inland.INLAND_MERCHANDISE_ID AS CHDID,   "
												+"	inland.INLAND_ORDR_NUM AS CONTR_NUM,     "
												+"	inland.HS_CODE AS HS_CODE,               "
												+"	inland.SPC_MODEL AS SPC_MODEL,           "
												+"	inland.MATERIALS AS MATERIALS,           "
												+"	inland.QTY AS QTY,                       "
												+"	inland.NGTV_POOR AS TOLERANCE,    "
												+"	PROD_PACKING_FUNC(inland.HS_CODE,inland.MATERIALS,inland.SPC_MODEL,inland.QTY,inland.LEN) AS PKG,                       "
												+"	inland.LEN AS LEN,                       "
												+"	inland.MEMO AS MEMO,                     "
												+"	'1' AS TYPE                              "
												+"FROM                                       "
												+"	XYWZ_SALE_INLAND_MERCHD_DTL inland       "
												+"INNER JOIN XYWZ_SALE_INLAND_ORDR_CONTR CON "
												+"ON ( INLAND.INLAND_ORDR_NUM =CON.CONTR_NUM AND CON.CHK_STAT='1' ) "
												+" WHERE NOT EXISTS(SELECT 1 FROM XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL sngl " 
												+" WHERE sngl.MERCHD_TYPE='1' AND inland.INLAND_ORDR_NUM = SNGL.CONTR_NUM AND sngl.PRD_NAME = inland.HS_CODE AND sngl.SPC_MODEL = inland.SPC_MODEL AND SNGL.LEN=inland.LEN ) "
    											+")TT WHERE 1 = 1 ");    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SPC_MODEL")){
                    sb.append(" and TT.SPC_MODEL like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("CONTR_NUM")){
                	sb.append(" and TT.CONTR_NUM = '"+this.getJson().get(key)+"'");
                }   
            }
        }
    	setPrimaryKey("TT.ID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
	

    
}
