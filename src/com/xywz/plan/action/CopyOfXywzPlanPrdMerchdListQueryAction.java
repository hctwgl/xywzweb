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
 * 订单商品放大镜
 */

@ParentPackage("json-default")
@Action(value="/CopyXywzPlanPrdMerchdListQueryAction", results={
    @Result(name="success", type="json")
})
public class CopyOfXywzPlanPrdMerchdListQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("SELECT * FROM (SELECT  "
    											+"	CONCAT('W',inv.MERCHD_ID) AS ID,         "
												+"	inv.MERCHD_ID AS CHDID,                  "
												+"	inv.CONTR_NUM AS CONTR_NUM,              "
												+"	inv.HS_CODE AS HS_CODE,                  "
												+"	inv.MODEL AS SPC_MODEL,                  "
												+"	inv.MATERIALS AS MATERIALS,              "
												+"	inv.QTY AS QTY,                          "
												+"	inv.PKG AS PKG,                          "
												+"	inv.LEN AS LEN,                          "
												+"	inv.MEMO AS MEMO,                        "
												+"	'0' AS TYPE                              "
												+"FROM                                       "
												+"	XYWZ_SALE_INV_MERCHD_DTL inv             "
												+"UNION ALL                                  "
												+"SELECT                                     "
												+"	CONCAT('N',inland.INLAND_MERCHANDISE_ID) AS ID,   "
												+"	inland.INLAND_MERCHANDISE_ID AS CHDID,   "
												+"	inland.INLAND_ORDR_NUM AS CONTR_NUM,     "
												+"	inland.HS_CODE AS HS_CODE,               "
												+"	inland.SPC_MODEL AS SPC_MODEL,           "
												+"	inland.MATERIALS AS MATERIALS,           "
												+"	inland.QTY AS QTY,                       "
												+"	inland.PKG AS PKG,                       "
												+"	inland.LEN AS LEN,                       "
												+"	inland.MEMO AS MEMO,                     "
												+"	'1' AS TYPE                              "
												+"FROM                                       "
												+"	XYWZ_SALE_INLAND_MERCHD_DTL inland    ) T"
												+"	WHERE 1=1                                "
    											);    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SPC_MODEL")){
                    sb.append(" and T.SPC_MODEL like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("CONTR_NUM")){
                	sb.append(" and T.CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }
    	setPrimaryKey(" T.ID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
	

    
}
