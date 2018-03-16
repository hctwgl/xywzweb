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
 * 生产计划通知单打印
 */

@ParentPackage("json-default")
@Action(value="/XywzPlanPrdPrintDetailQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanPrdPrintDetailQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	String issuesDt = request.getParameter("issuesDt");
    	String planId=request.getParameter("planId");
    	StringBuilder sb=new StringBuilder("select ISSUES_DT,T.SCHEDU_DATE,t.CONTR_NUM,t.PRD_NAME,t.MATERIALS,t.SPC_MODEL,t.LEN,t.WEIGHT,T.WEIGHT_TOLERANCE,T1.FINAL_TRAFF_DAY,T2.USER_NAME,T.PLAN_NUM," +
    			"CASE WHEN T.REM_ZHI_CNT > 0 THEN CONCAT(floor(T.ZHI_CNT),'PX',floor(T.JIAN_CNT),'B','+',floor(T.REM_ZHI_CNT),'PX1B' ) ELSE CONCAT(floor(T.ZHI_CNT),'PX',floor(T.JIAN_CNT),'B') END AS PKG " +
    			"from XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL t  " +
    			"INNER JOIN XYWZ_SALE_FRGN_ORDR_CONTR T1 " +
    			"ON (T.CONTR_NUM = T1.CONTR_NUM) "+
    			"INNER JOIN ADMIN_AUTH_ACCOUNT T2 "+
    			"ON (T1.MAK_DOC_PERS_ID = T2.ACCOUNT_NAME) "+
    			//"where t.CHANNAL_TYPE='1' and t.ISSUES_DT is not null and t.ISSUES_DT= '"+issuesDt+"' and t.PLAN_ID IN ("+planId+")"+ //外贸
    			"where t.CHANNAL_TYPE='1' and t.ISSUES_DT is not null and t.PLAN_ID IN ("+planId+")"+ //外贸
    			" UNION ALL "+
    			"select ISSUES_DT,T.SCHEDU_DATE,t.CONTR_NUM,t.PRD_NAME,t.MATERIALS,t.SPC_MODEL,t.LEN,t.WEIGHT,T.WEIGHT_TOLERANCE,T1.FINAL_TRAFF_DAY,T2.USER_NAME,T.PLAN_NUM," +
    			"CASE WHEN T.REM_ZHI_CNT > 0 THEN CONCAT(floor(T.ZHI_CNT),'PX',floor(T.JIAN_CNT),'B','+',floor(T.REM_ZHI_CNT),'PX1B' ) ELSE CONCAT(floor(T.ZHI_CNT),'PX',floor(T.JIAN_CNT),'B') END AS PKG " +
    			"from XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL t  " +
    			"INNER JOIN XYWZ_SALE_INLAND_ORDR_CONTR T1 " +
    			"ON (T.CONTR_NUM = T1.CONTR_NUM) "+
    			"INNER JOIN ADMIN_AUTH_ACCOUNT T2 "+
    			"ON (T1.MAK_DOC_PERS_ID = T2.ACCOUNT_NAME) "+
    			//"where t.CHANNAL_TYPE='1' and t.ISSUES_DT is not null and t.ISSUES_DT= '"+issuesDt+"' AND t.PLAN_ID IN ("+planId+")"+ //内贸
    			"where t.CHANNAL_TYPE='1' and t.ISSUES_DT is not null AND t.PLAN_ID IN ("+planId+")"+ //内贸
    			" union all "+
    			" select '2015-12-31','2015-12-31', '汇总' as CONTR_NUM,'' as PRD_NAME,'' as MATERIALS,'' as SPC_MODEL,0 as LEN,sum(t.WEIGHT) as WEIGHT,'' AS WEIGHT_TOLERANCE,'' AS FINAL_TRAFF_DAY, '' AS USER_NAME,'' AS PLAN_NUM, '' AS PKG " +
    			" from XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL t  where t.CHANNAL_TYPE='1' and T.SCHEDU_STATUS NOT IN ('2','3') ");//汇总
    	
//    	if(null!=issuesDt&&!issuesDt.equals("")){
//    		sb.append(" and t.ISSUES_DT = '"+issuesDt+"'");
//    	}
//    	
//        for(String key:this.getJson().keySet()){
//            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
//                if(key.equals("ISSUES_DT")){
//                    sb.append(" and t.ISSUES_DT = '"+this.getJson().get(key)+"'");
//                }  
//            }
//        }
    	SQL=sb.toString();
    	datasource = ds;
    }
}
