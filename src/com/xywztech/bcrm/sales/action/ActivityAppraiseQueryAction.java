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
@Action(value="/activityAppraiseQuery", results={
    @Result(name="success", type="json"),
})
public class ActivityAppraiseQueryAction extends BaseQueryAction{
    
	private HttpServletRequest request;
	
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;
	
    
//    @SuppressWarnings("unchecked")
//    public String index() {
//    	
//    	ActionContext ctx = ActionContext.getContext();
//        request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
//        String activityId = request.getParameter("activityId");
//        
//        StringBuilder sb = new StringBuilder("select a.*,u1.username as CREATE_USER_NAME,u2.username as UPDATE_USER_NAME from ocrm_f_mm_acti_appraise a " +
//        		"left join sys_users u1 on a.CREATE_USER = u1.userid " +
//        		"left join sys_users u2 on a.UPDATE_USER = u2.userid " +
//        		"where a.mkt_acti_id = " +activityId+
//        		" order by a.UPDATE_DATE desc");
//        cqs.setPrimaryKey("a.create_user");
//        this.setJson((Map<String, Object>) cqs.excuteQuery(sb.toString(),0,100000));       
//        return "success";
//    }
	@SuppressWarnings("unchecked")
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String activityId = request.getParameter("activityId");
        String CREATE_DATE="";
    	Map paramsMap = super.getJson();
    	String CREATE_DATE_temp = (String) paramsMap.get("CREATE_DATE");
    	if(!CREATE_DATE_temp.equals("")&&CREATE_DATE_temp!=null){
    		CREATE_DATE = CREATE_DATE_temp.substring(0, 10);
    	}
    	//,u1.username as CREATE_USER,u2.username as UPDATE_USER_NAME
		StringBuilder sb = new StringBuilder("select a.* from ocrm_f_mm_acti_appraise a " +
        	//	"left join sys_users u1 on a.CREATE_USER = u1.userid " +
        		//"left join sys_users u2 on a.UPDATE_USER = u2.userid " +
        		"where a.mkt_acti_id =" +activityId+
        		"");
		for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("CREATE_DATE"))
                    sb.append(" and to_char(CREATE_DATE,'YYYY-MM-DD') like '%"+CREATE_DATE+"%'");
                else if(key.equals("CREATE_USER"))
                    sb.append(" and "+key+" like '%"+this.getJson().get(key)+"%'");
//                else{
//                	sb.append(" and "+key+" = "+this.getJson().get(key));
//                }
            }
        }
		SQL=sb.toString();
		setPrimaryKey("app_id");
    	datasource = dsOracle;
		
	}
}
