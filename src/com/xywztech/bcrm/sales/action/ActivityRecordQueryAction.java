package com.xywztech.bcrm.sales.action;

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
@Action(value="/activityRecordQuery", results={
    @Result(name="success", type="json"),
})
public class ActivityRecordQueryAction extends BaseQueryAction{
    
	private HttpServletRequest request;
	
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;
    
    @SuppressWarnings("unchecked")
	@Override
	public void prepare() {
    	
    	ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String activityId = request.getParameter("activityId");
    	Map paramsMap = super.getJson();
    	String ACTI_DATE_temp = (String) paramsMap.get("ACTI_DATE");
    	if(!ACTI_DATE_temp.equals("")&&ACTI_DATE_temp!=null){
    	}
		StringBuilder sb = new StringBuilder("select r.*,u1.username as CREATE_USER_NAME,u2.username as UPDATE_USER_NAME,u3.username as acti_user_name from ocrm_f_mm_acti_record r " +
        		"left join sys_users u1 on r.CREATE_USER = u1.userid " +
        		"left join sys_users u2 on r.UPDATE_USER = u2.userid " +
        		"left join sys_users u3 on r.acti_user = u3.userid where r.mkt_acti_id = " +activityId+
        		" ");
		for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("TARGET_CUST"))
                    sb.append(" and r."+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("COMM_WAY"))
                    sb.append(" and r."+key+" like '%"+this.getJson().get(key)+"%'");
//                else{
//                	sb.append(" and "+key+" = "+this.getJson().get(key));
//                }
            }
        }
		setPrimaryKey("r.UPDATE_DATE");
		addOracleLookup("COMM_WAY", "COMM_WAY");
		addOracleLookup("IS_CREA_CHANCE", "IS_CREA_CHANCE");
		
		SQL=sb.toString();
		
		datasource = dsOracle;
	}
}
