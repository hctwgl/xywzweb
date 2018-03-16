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
import com.xywztech.bcrm.customer.model.OcrmFCiGradeDefine;
import com.xywztech.bcrm.customer.service.OcrmFCiGradeDefineService;
import com.xywztech.bob.common.CommonAction;

/**
 * 
 * @author huwei
 * 客户等级定义
 *
 */

@SuppressWarnings("serial")
@Action("/ocrmFCiGradeDefine-info")
public class OcrmFCiGradeDefineAction extends CommonAction{
	@Autowired
	private  OcrmFCiGradeDefineService ciGradeDefineService;
	@Autowired
	public void init(){
		model = new OcrmFCiGradeDefine();
		setCommonService(ciGradeDefineService);
	}
	
	public HttpHeaders indexPage() throws Exception {
		try {
			StringBuilder sb = new StringBuilder(
					"select c from OcrmFCiGradeDefine c where 1=1 ");
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
					 if (key.equals("gradeId")) {
						sb.append(" and c.gradeId = :id");
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
