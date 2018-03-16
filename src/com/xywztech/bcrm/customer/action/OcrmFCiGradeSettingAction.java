package com.xywztech.bcrm.customer.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.customer.model.OcrmFCiGradeSetting;
import com.xywztech.bcrm.customer.service.OcrmFCiGradeSettingService;
import com.xywztech.bob.common.CommonAction;

/**
 * 
 * @author huwei
 * 客户评级指标定义
 *
 */

@SuppressWarnings("serial")
@Action("/ocrmFCiGradeSetting-info")
public class OcrmFCiGradeSettingAction extends CommonAction {
	
	@Autowired
	private OcrmFCiGradeSettingService service;
	@Autowired
	public void init(){
		model = new OcrmFCiGradeSetting();
		setCommonService(service);
	}
	
	public HttpHeaders indexPage() throws Exception {
		try {
			StringBuilder sb = new StringBuilder(
					"select c from OcrmFCiGradeSetting c where 1=1 ");
			Map<String, Object> values = new HashMap<String, Object>();
			ActionContext ctx = ActionContext.getContext();
			request = (HttpServletRequest) ctx
					.get(StrutsStatics.HTTP_REQUEST);
			if (request.getParameter("start") != null)
				start = new Integer(request.getParameter("start")).intValue();
			if (request.getParameter("limit") != null)
				limit = new Integer(request.getParameter("limit")).intValue();
			this.setJson(request.getParameter("condition"));
			for (String key : this.getJson().keySet()) {
				if (null != this.getJson().get(key)	&& !this.getJson().get(key).equals("")) {
					 if (key.equals("id")) {
						sb.append(" and c.id = :id");
						values.put("id", Long.parseLong((String) this.getJson().get(key)));
					}else {
						sb.append(" and c." + key + " = :" + key);
						values.put(key, this.getJson().get(key));
					}
				}
			}
			return super.indexPageByJql(sb.toString(), values);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
}
