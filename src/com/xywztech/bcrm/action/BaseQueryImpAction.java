package com.xywztech.bcrm.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.core.LookupManager;
import com.xywztech.bob.vo.AuthUser;

/**
 * 实现多用途的JDBC查询
 * @author sujm
 * 
 */
@SuppressWarnings("serial")
@Action("/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
public class BaseQueryImpAction extends CommonAction {
	private DataSource dataSource;

	//查询当前操作的客户，是否已经存在于营销活动的关联客户表中，有则返回true，否则返回false
	public boolean method1(String sql) {
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		Boolean sign = true;
		dataSource = (DataSource) LookupManager.getInstance().getApplicationContext().getBean("dsOracle");
		Connection conn = null;
		Statement statement = null;
		ResultSet rs = null;

		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		try {

			conn = dataSource.getConnection();
			statement = conn.createStatement();
			rs = statement.executeQuery(sql);
			if (rs.next()) {
				sign = true;
			} else {
				sign = false;
			}
			rs.close();
			statement.close();
    		conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			return sign;
		}

	};
}