package com.xywztech.bcrm.serviceManage.action;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.serviceManage.model.AppointmentInfo;
import com.xywztech.bcrm.serviceManage.service.AppointmentManageService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.vo.AuthUser;
import com.xywztech.crm.exception.BizException;

/**
 * 签约管理Action
 * 
 * @author yuyz
 * @since 2012-12-11
 */

@SuppressWarnings("serial")
@Action("/appointmentManage")
public class AppointmentManageAction extends CommonAction {

	@Autowired
	private AppointmentManageService service;

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;// 定义数据源属性

	@Autowired
	public void init() {
		model = new AppointmentInfo();
		setCommonService(service);
		needLog = true;// 新增修改删除记录是否记录日志,默认为false，不记录日志
	}

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);

		this.setJson(request.getParameter("condition"));

		StringBuilder sb = new StringBuilder(
				"select s.*,o.UNITNAME as APPOINT_ORG_NAME,d.user_name as mgr_name, c.user_name as handle_user_name,a.user_name,b.user_name as updateuser_name from OCRM_F_SE_APPOINTMENT_INFO s left join sys_units o on o.UNITID = s.appoint_org left join admin_auth_account d on mgr_id = d.account_name left join admin_auth_account c on s.handle_user = c.account_name left join admin_auth_account a on s.create_user = a.account_name left join admin_auth_account b on s.update_user = b.account_name where s.p_or_c = '");
		sb.append(getRoleFlag());
        sb.append("'");
		for (String key : this.getJson().keySet()) {// 查询条件判断
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("CUST_ID")) {
					sb.append(" AND s." + key + " = '"
							+ this.getJson().get(key) + "'");
				} else if (key.equals("s.APPOINT_STAT")
						&& !this.getJson().get(key).equals("")) {
					sb.append(" AND s." + key + " ='" + this.getJson().get(key)
							+ "'");
				} else if (key.equals("CERT_NO")
						&& !this.getJson().get(key).equals("")) {
					sb.append(" AND s." + key + " ='" + this.getJson().get(key)
							+ "'");
				}else if (key.equals("APPOINT_STAT")
						&& !this.getJson().get(key).equals("")) {
					sb.append(" AND s." + key + " ='" + this.getJson().get(key)
							+ "'");
				} else if (key.equals("MGR_ID")
						&& !this.getJson().get(key).equals("")) {
					sb.append(" AND s." + key + " ='" + this.getJson().get(key)
							+ "'");
				}else if (key.equals("APPOINT_ORG")
						&& !this.getJson().get(key).equals("")) {
					sb.append(" AND s." + key + " ='" + this.getJson().get(key)
							+ "'");
				}else if (key.equals("CREATE_USER")
						&& !this.getJson().get(key).equals("")) {
					sb.append(" AND s." + key + " ='" + this.getJson().get(key)
							+ "'");
				}else if (key.equals("appointId")) { // 获得id，用于查看、修改
					sb.append(" AND s.APPOINT_ID =" + this.getJson().get(key));
				}
			}
		}

		SQL = sb.toString();
		this.setPrimaryKey("s.UPDATE_DATE desc,s.APPOINT_ID desc");
		datasource = ds;
	}

	/**
	 * （自定义）批量删除
	 * 
	 * @return 成功标识
	 */
	@Override
	public String batchDestroy() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql = "delete from AppointmentInfo s WHERE s.appointId IN (" + idStr
				+ ")";
		Map<String, Object> values = new HashMap<String, Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");

		return "success";
	}

	/**
	 * 保存
	 * 
	 * @return 成功标识
	 */
	@Override
	public DefaultHttpHeaders create() {
		String message = "";// 抛出异常信息
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		String currenUserId = auth.getUserId();
		try {
			AppointmentInfo appointmentInfo = (AppointmentInfo) model;
			if (appointmentInfo.getAppointId() == null) { // 新增
				appointmentInfo.setCreateUser(currenUserId);
				appointmentInfo.setCreateDate(new Date());
				appointmentInfo.setpOrC(getRoleFlag());
			} else if(appointmentInfo.getAppointStat() != "01"){
				appointmentInfo.setHandleUser(currenUserId);
			}
			appointmentInfo.setUpdateDate(new Date());
			appointmentInfo.setUpdateUser(currenUserId);

			service.save(model);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BizException(0, 0, "1002", message);
		}

		return new DefaultHttpHeaders("success");
	}
	
	public String getRoleFlag() {
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
		.getAuthentication().getPrincipal();
		return "1";//auth.getUserType();
	}
}
