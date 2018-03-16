package com.xywz.pub.action;

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


@ParentPackage("json-default")
@Action(value="/XywzUserQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzUserQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("SELECT t1.ACCOUNT_NAME,t1.USER_NAME,case when t1.SEX='01' then '男' else '女' end as SEX ,t1.BIRTHDAY,t1.EMAIL," +
    			"t1.OFFICETEL,t1.MOBILEPHONE,case when t1.USER_STATE='1' then '有效' else '失效' end as USER_STATE,t1.PASSWORD,t1.ORG_ID,t2.ORG_NAME FROM ADMIN_AUTH_ACCOUNT t1 " +
    			"left join ADMIN_AUTH_ORG t2 on t1.ORG_ID = t2.ORG_ID "+
    			"  where 1=1 ");
    	
    	for(String key : this.getJson().keySet()){
    		if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){	
				if(null!=key&&key.equals("userName")){
					sb.append("  AND (t1.USER_NAME like '%"+this.getJson().get(key)+"%') OR (t1.ACCOUNT_NAME like '%"+this.getJson().get(key)+"%')");
				}
				
    		}
		}

    	setPrimaryKey("ACCOUNT_NAME desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
