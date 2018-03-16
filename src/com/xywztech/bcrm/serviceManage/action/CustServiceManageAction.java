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
import com.xywztech.bcrm.serviceManage.model.CustServiceInfo;
import com.xywztech.bcrm.serviceManage.service.CustServiceManageService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.vo.AuthUser;
import com.xywztech.crm.exception.BizException;

/**
 * 客户服务管理Action
 * 
 * @author yuyz
 * @since 2012-12-06
 */

@SuppressWarnings("serial")
@Action("/custServiceManage")
public class CustServiceManageAction extends CommonAction {

	@Autowired
	private CustServiceManageService service;

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;// 定义数据源属性

	@Autowired
	public void init() {
		model = new CustServiceInfo();
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
				"select s.*,a.UNITID as org_id,c.user_name,b.user_name as updateuser_name from OCRM_F_SE_CUST_SERVICE s left join sys_units a on a.UNITID = s.create_org left join admin_auth_account c on s.create_user = c.account_name left join admin_auth_account b on s.update_user = b.account_name where s.p_or_c = '");
        sb.append(getRoleFlag());
        sb.append("'");
		for (String key : this.getJson().keySet()) {// 查询条件判断
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("CUST_ID")) {
					sb.append(" AND s." + key + " = '"
							+ this.getJson().get(key) + "'");
				} else if (key.equals("SERVICE_STAT")
						&& !this.getJson().get(key).equals("")) {
					sb.append(" AND s." + key + " ='" + this.getJson().get(key)
							+ "'");
				} else if (key.equals("SERVICE_KIND")
						&& !this.getJson().get(key).equals("")) {
					sb.append(" AND s." + key + " ='" + this.getJson().get(key)
							+ "'");
				} else if (key.equals("serviceId")) { // 获得id，用于查看、修改
					sb.append(" AND s.SERVICE_ID =" + this.getJson().get(key));
				}
			}
		}
		
		//====wzy===2013-01-07===add===在工作平台之日程安排之工作日程功能使用，查询某一天的客户服务数据===start===
		String workDate = request.getParameter("workDate");
		if(workDate != null && !"".equals(workDate)){
			sb.append(" and s.create_date = to_date('"+workDate.substring(0,10)+"','yyyy-MM-dd')");
		}
		//====wzy===2013-01-07===add===在工作平台之日程安排之工作日程功能使用，查询某一天的客户服务数据===end=====
		SQL = sb.toString();
		
		this.setPrimaryKey("s.UPDATE_DATE desc,s.SERVICE_ID desc");
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
		String jql = "delete from CustServiceInfo s WHERE s.serviceId IN (" + idStr
				+ ")";
		Map<String, Object> values = new HashMap<String, Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");

		return "success";
	}
	
	
	/**
	 * （自定义）修改服务状态
	 * 
	 * @return 成功标识
	 */
	public String updateStat() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
		.getAuthentication().getPrincipal();
		Date currentTime = new Date();
		String currenUserId = auth.getUserId();
		String idStr = request.getParameter("idStr");
		String stat = request.getParameter("stat");
		String jql = "update CustServiceInfo s set s.serviceStat = '" +stat
		+"', s.updateDate =:datePara " 
		+", s.updateUser = '"+ currenUserId
		+"' WHERE s.serviceId IN (" + idStr+ ")";
		Map<String, Object> values = new HashMap<String, Object>();
		values.put("datePara", currentTime);
		service.batchUpdateByName(jql, values);
		addActionMessage("batch update successfully");

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
		String currenOrg =  auth.getUnitId();
		try {
			CustServiceInfo custServiceInfo = (CustServiceInfo) model;
			if (custServiceInfo.getServiceId() == null) { // 新增
				custServiceInfo.setCreateUser(currenUserId);
				//注释：wzy，2013-01-07，modify：为了兼容“工作平台-日程安排-工作日程”的新增保存功能，修改如下一行代码===开始===
				custServiceInfo.setCreateDate((custServiceInfo.getCreateDate()==null || "".equals(custServiceInfo.getCreateDate())?new Date():custServiceInfo.getCreateDate()));
				//注释：wzy，2013-01-07，modify：为了兼容“工作平台-日程安排-工作日程”的新增保存功能，修改如下一行代码===结束===
				custServiceInfo.setpOrC(getRoleFlag());
				custServiceInfo.setCreateOrg(currenOrg);
			} 
			custServiceInfo.setUpdateDate(new Date());
			custServiceInfo.setUpdateUser(currenUserId);

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
