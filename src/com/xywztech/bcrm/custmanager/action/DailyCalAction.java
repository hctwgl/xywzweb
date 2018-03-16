package com.xywztech.bcrm.custmanager.action;


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
@Action(value = "/dailyWorkCal-Action", results = { @Result(name = "success", type = "json")})
public class DailyCalAction extends BaseQueryAction {
	
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	
    @Override
	public void prepare() {
    	ActionContext ctx = ActionContext.getContext();
    	HttpServletRequest request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);
    	AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	String userId = auth.getUserId();
		StringBuilder sb = new StringBuilder(
				"select c.*,'true' as ALL_DAY from  OCRM_F_WP_WORKLOG_DAYLOG c where 1>0");
		sb.append(" and c.OWENERID = '"+userId+"' ");//数据权限控制，通过权限规则，拼接处当前用户所能查看的用户ID
		if(null!=request.getParameter("start")&&!request.getParameter("start").toString().equals(""))
			sb.append(" and c.ETLDATE>=to_date('"+request.getParameter("start").toString()+"','yyyy-mm-dd') ");
		if(null!=request.getParameter("end")&&!request.getParameter("end").toString().equals(""))
			sb.append(" and c.ETLDATE<=to_date('"+request.getParameter("end").toString()+"','yyyy-mm-dd') ");
		
		setPrimaryKey("c.LOGID");
        
        SQL=sb.toString();
        datasource = ds;
	}
    
    public void setStart(String start) {
    }
}

