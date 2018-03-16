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
@Action(value="/XywzJobTotalQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzJobTotalQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("SELECT TT.CONTR_NUM,TT.HS_CODE,TT.SPC_MODEL,TT.LEN,TT.MATERIALS,TT.QTY, TT.TOLERANCE," +
    			"CASE WHEN TYPE='0' THEN '外贸' when TYPE='1' then '内贸' else '外贸' end as TYPE "
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
				+"  inv.WEIGHT_TOLERANCE AS TOLERANCE,       "
				+"	'0' AS TYPE                              "
				+"FROM                                       "
				+"	XYWZ_SALE_INV_MERCHD_DTL inv             "
				+" INNER JOIN XYWZ_SALE_FRGN_ORDR_CONTR CON"
				+" ON inv.CONTR_NUM =CON.CONTR_NUM AND CON.CHK_STAT='1'"
				+" WHERE NOT EXISTS(SELECT 1 FROM XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL sngl " +
						"WHERE sngl.MERCHD_TYPE='0' AND sngl.MERCHD_ID=inv.MERCHD_ID AND sngl.SCHEDU_STATUS IN ('2','3') ) "
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
				+"  inland.NGTV_POOR AS TOLERANCE,           "
				+"	'1' AS TYPE                              "
				+"FROM                                       "
				+"	XYWZ_SALE_INLAND_MERCHD_DTL inland       "
				+" WHERE NOT EXISTS(SELECT 1 FROM XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL sngl " +
						"WHERE sngl.MERCHD_TYPE='1' AND sngl.MERCHD_ID=inland.INLAND_MERCHANDISE_ID AND sngl.SCHEDU_STATUS IN ('2','3') ) "
				+")TT LEFT JOIN XYWZ_SYSM_PRODUCT_DETAIL WT ON TT.HS_CODE = WT.HS_CODE AND TT.SPC_MODEL = CONCAT(WT.SIZE,'X',TRUNCATE (WT.WAIST_DEPTH, 2),'MM','X',TRUNCATE (WT.WEIGHT, 2),'KG','/M')"
				+" LEFT JOIN XYWZ_SYSM_PRODUCT_PKG PK ON TT.SPC_MODEL = PK.SIZE AND TT.LEN = PK.LEN AND PK.HS_CODE = TT.HS_CODE WHERE 1 = 1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("HS_CODE")){
                    sb.append(" and TT.HS_CODE like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("CONTR_NUM")){
                	sb.append(" and TT.CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("SPC_MODEL")){
                	sb.append(" and TT.SPC_MODEL like '%"+this.getJson().get(key)+"%'");
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
