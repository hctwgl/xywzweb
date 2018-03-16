package com.xywztech.bcrm.action;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.model.OcrmFWpWorkTask;
import com.xywztech.bcrm.service.OcrmFWpWorkTaskService;
import com.xywztech.bob.common.CommonAction;

/**
 * 
 * @author 对应的功能任务管理
 * 
 * 
 */

@SuppressWarnings("serial")
@Action("/ocrmFWpWorkTaskAction")
public class OcrmFWpWorkTaskAction extends CommonAction {

	@Autowired
	private OcrmFWpWorkTaskService ocrmFWpWorkTaskService;
	@Autowired
	
	public void init() {
		model = new OcrmFWpWorkTask();
		setCommonService(ocrmFWpWorkTaskService);
		// 新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog = false;;
	}

	public HttpHeaders indexPage() throws Exception {
		try {
			StringBuilder sb = new StringBuilder(
					"select c from OcrmFWpWorkTask c where 1=1 ");
			Map<String, Object> values = new HashMap<String, Object>();
			ActionContext ctx = ActionContext.getContext();
			request = (HttpServletRequest) ctx
					.get(StrutsStatics.HTTP_REQUEST);
			if (request.getParameter("start") != null)
				start = new Integer(request.getParameter("start")).intValue();
			if (request.getParameter("limit") != null)
				limit = new Integer(request.getParameter("limit")).intValue();
			this.setJson(request.getParameter("condition"));
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			for (String key : this.getJson().keySet()) {
				if (null != this.getJson().get(key)
						&& !this.getJson().get(key).equals("")) {
					if (key.equals("burdenUser")) {
						sb.append("and c.burdenUser like :burdenUser");
						values.put("burdenUser", "%" + (String) this.getJson().get(key) + "%");
					} else if (key.equals("startDate")) {
						sb.append(" and c.createDate >= :createDate");
						values.put("createDate", sdf.parse((String) this.getJson().get(key)));
					} else if (key.equals("endDate")) {
						sb.append(" and c.endDate <= :endDate");
						values.put("endDate", sdf.parse((String) this.getJson().get(key)));
					} else if (key.equals("groupId")) {
						sb.append(" and c.groupId = :groupId");
						values.put("groupId", this.getJson().get(key));
					} else if (key.equals("finishState")) {
						sb.append(" and c.finishState = :finishState");
						values.put("finishState", this.getJson().get(key));
					} else if (key.equals("id")) {
						sb.append(" and c.id = :id");
						values.put("id", Long.parseLong((String) this.getJson().get(key)));
					}
//					else {
//						sb.append(" and c." + key + " = :" + key+ "order by c.createDate");
//						values.put(key, this.getJson().get(key));
//					}
				}
			}
			return super.indexPageByJql(sb.toString(), values);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
}
