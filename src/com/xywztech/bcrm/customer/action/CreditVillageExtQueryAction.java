package com.xywztech.bcrm.customer.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
@Action(value="/creditVillageExtQuery", results={
    @Result(name="success", type="json"),
})
public class CreditVillageExtQueryAction extends BaseQueryAction{
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	public void prepare() {
 		ActionContext ctx = ActionContext.getContext();
 		HttpServletRequest request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String optype = request.getParameter("optype");
		StringBuilder sb=new StringBuilder("select "
				+"a.cust_id,"+ 
				"a.VILLA_NAME,"+
				"a.HOST_USER, "+
				"sum(a.POPULATION) POPULATION,"+ 
				"sum(a.HOUSE_NUM) HOUSE_NUM,"+
				"sum(a.CREDIT_HOUSE) CREDIT_HOUSE,"+
				"sum(a.CREDIT_BALL) CREDIT_BALL, "+
				"sum(a.USECRE_BALL) USECRE_BALL, "+
				"sum(a.LOAN_BALL) LOAN_BALL, "+
				"sum(a.LOAN_AVG) LOAN_AVG, "+
				"sum(a.SAVING_BALL_LAY) SAVING_BALL_LAY, "+
				"sum(a.SAVING_AVG_LAY)/count(*) SAVING_AVG_LAY,"+
				"sum(a.SAVING_BALL_LAM) SAVING_BALL_LAM, "+
				"sum(a.SAVING_AVG_LAM)/count(*) SAVING_AVG_LAM,"+ 
				"sum(a.SAVING_BALL_CUM) SAVING_BALL_CUM, "+
				"sum(a.SAVING_AVG_CUM)/count(*) SAVING_AVG_CUM,"+
				"a.VILLA_NO, "+
				"a.ORG_ID, "+
				"a.ORG_NAME,"+
				"a.VILLA_MODE, "+
				"a.AREA_NO, "+
				"a.VILLA_BELONG, "+
				"a.TOWN_NAME, "+
				"a.USECRE_CUST,"+
				"a.ETL_DATE "+
				"from acrm_f_ci_credit_village a "+
				"where 1=1 ");
		Map<String,Object> values=new HashMap<String,Object>();
		for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
            	if(key.equals("year")){
            		sb.append(" and SUBSTR(a.ETL_DATE,1,4) = '"+(String)this.getJson().get(key)+"' ");
            		//values.put("year", (String)this.getJson().get(key));
            	}
            	else if(key.equals("month")){
            		sb.append(" and SUBSTR(a.ETL_DATE,6,2) = '"+(String)this.getJson().get(key)+"' ");
            		//values.put("month", (String)this.getJson().get(key));
            	}
            	else if(key.equals("unitId")){
//            		sb.append(" and c.orgId in ('"+((String)this.getJson().get(key)).replace(";", "','") + "')");
            		String aa = this.getJson().get(key).toString();
            		String b  = aa.replace(",", "','");
            		sb.append(" and a.ORG_ID in ('"+b+"') ");
            	}
//            	else{
//            		if(!key.equals("orgId")){
//                	sb.append(" and a."+key+" = :"+key);
//                	//values.put(key, this.getJson().get(key));
//                }
//            	}
           
            }
		}
		sb.append(" group by a.cust_id, a.VILLA_NAME,a.HOST_USER,a.VILLA_NO, a.ORG_ID, "
				+"a.ORG_NAME, a.VILLA_MODE, a.AREA_NO, a.VILLA_BELONG, a.TOWN_NAME, a.USECRE_CUST,a.ETL_DATE");
        setPrimaryKey("a.ETL_DATE desc");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
