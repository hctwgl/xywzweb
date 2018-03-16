package com.xywztech.bcrm.sales.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.sales.service.MarketAssuTransAdjustService;
import com.xywztech.bob.common.CommonAction;

import com.xywztech.bob.vo.AuthUser;

/**
 * @描述：营销任务下达和调整功能Action
 * @author wzy
 * @date:2013-05-07
 */
@ParentPackage("json-default")
@Action(value = "/marketAssuTransAdjustAction", results = { @Result(name = "success", type = "json"), })
public class MarketAssuTransAdjustAction extends CommonAction {

	private static final long serialVersionUID = 1L;
	private HttpServletRequest request;

	@Autowired
	private MarketAssuTransAdjustService marketAssuTransAdjustService;

	// 下达营销任务
	public void assuTrans() {
		AuthUser auth = null;
		request = this.getRequest();
		String cbid = request.getParameter("cbid");
		auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		marketAssuTransAdjustService.assuTrans(auth, cbid);
	}

	// 获取HttpServletRequest对象
	private HttpServletRequest getRequest() {
		ActionContext ctx = ActionContext.getContext();
		return (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
	}
}