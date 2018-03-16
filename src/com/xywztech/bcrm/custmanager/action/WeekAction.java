package com.xywztech.bcrm.custmanager.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;

/**
 * 周工作记录详细信息查询
 * @author lixb
 * @since 2012-11-15
 */
@Action("/week-query")
@Results( { @Result(name = "success", type = "redirectAction", params = {
		"actionName", "week-query" }) })
public class WeekAction extends BaseQueryAction {

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	private HttpServletRequest request;

	@Override
	public void prepare() {
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		String weekIds = request.getParameter("weekId");
		String userId = auth.getUserId();
		StringBuffer sql = new StringBuffer(
				
		 " SELECT a1.ID AS ID_NEWCUST ,a1.WORK_PLAN AS WORK_PLAN_NEWCUST , a1.WORK_EXECUTE AS WORK_EXECUTE_NEWCUST ,a1.WORKLOG_ID AS WORKLOG_ID_NEWCUST, "
       + " a2.ID AS ID_CREDIT ,a2.WORK_PLAN AS WORK_PLAN_CREDIT , a2.WORK_EXECUTE AS WORK_EXECUTE_CREDIT ,a2.WORKLOG_ID AS WORKLOG_ID_CREDIT, "
       + " a3.ID AS ID_STOCK ,a3.WORK_PLAN AS WORK_PLAN_STOCK , a3.WORK_EXECUTE AS WORK_EXECUTE_STOCK ,a3.WORKLOG_ID AS WORKLOG_ID_STOCK, "
       + " a4.ID AS ID_OTHER,a4.WORK_PLAN AS WORK_PLAN_OTHER, a4.WORK_EXECUTE AS WORK_EXECUTE_OTHER ,a4.WORKLOG_ID AS WORKLOG_ID_OTHER, "
       + " b.* "
       + " FROM    OCRM_F_WP_WORKLOG_W_DETAIL a1 "
       + " left JOIN OCRM_F_WP_WORKLOG_W_DETAIL a2 ON a1.worklog_id = a2.worklog_id and a2.work_type='2' "
       + " left JOIN OCRM_F_WP_WORKLOG_W_DETAIL a3 ON a2.worklog_id = a3.worklog_id and a3.WORK_TYPE = '3' "        
       + " left JOIN OCRM_F_WP_WORKLOG_W_DETAIL a4 ON a3.worklog_id = a4.worklog_id and a4.work_type='4' "    
       + " left JOIN OCRM_F_WP_WORKLOG b ON b.id = a1.worklog_id "	
       + " WHERE 1=1 and b.WORKLOG_TYPE='W' and a1.WORK_TYPE = '1'"     
       + " and b.USER_ID = '"+userId + "'" );
		if (null != weekIds && !weekIds.equals("")) {
			sql.append(" and b.Id ='" + weekIds + "'");
		}
		datasource = ds;
		SQL = sql.toString();
	}
	
	@Override
	public Map<String, Object> getJson() {
		return super.getJson();
	}
}
