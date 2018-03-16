package com.xywztech.bcrm.sales.action;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Validateable;
import com.opensymphony.xwork2.ValidationAwareSupport;
import com.xywztech.bcrm.sales.model.OcrmFMmMktBusiOppor;
import com.xywztech.bcrm.sales.service.MktBusiOpporOperationService;
import com.xywztech.bob.vo.AuthUser;
import com.xywztech.crm.exception.BizException;

/**
 * @描述：营销管理->商机管理->商机池功能操作Action
 * @author wzy
 * @date:2013-02-22
 */
@Action("/mktBusiOpporOperationAction")
@Results({ @Result(name = "success", type = "redirectAction", params = {
		"actionName", "mktBusiOpporOperationAction" }) })
public class MktBusiOpporOperationAction extends ValidationAwareSupport
		implements ModelDriven<Object>, Validateable {

	private HttpServletRequest request;
	private static final long serialVersionUID = 8550661616118279889L;
	private OcrmFMmMktBusiOppor model = new OcrmFMmMktBusiOppor();

	private Collection<OcrmFMmMktBusiOppor> list;
	@Autowired
	private MktBusiOpporOperationService mktBusiOpporOperationService;

	public void validate() {

	}

	public Object getModel() {
		return (list != null ? list : model);
	}

	// 保存/更新商机信息
	public void saveOrUpdateBusiOppor() {
		AuthUser auth = null;
		auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		if (model != null) {
			if (model.getOpporId() != null && !"".equals(model.getOpporId())) {// 更新
				mktBusiOpporOperationService.updateBusiOppor(model, auth);
			} else {// 新增
				mktBusiOpporOperationService.saveBusiOppor(model, auth);
			}
		}
	}

	// 提交商机信息
	public void submitBusiOppor() {
		AuthUser auth = null;
		auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		if (model != null) {
			mktBusiOpporOperationService.submitBusiOppor(model, auth,
					this.getResponse());
		}
	}

	// 分配商机信息
	public void allocatBusiOppor() {
		AuthUser auth = null;
		if (model != null) {
			auth = (AuthUser) SecurityContextHolder.getContext()
					.getAuthentication().getPrincipal();
			mktBusiOpporOperationService.allocatBusiOppor(model, auth);
		}
	}

	// 退回商机
	public void backBusiOppor() {
		int result = 1;
		AuthUser auth = null;
		if (model != null) {
			auth = (AuthUser) SecurityContextHolder.getContext()
					.getAuthentication().getPrincipal();
			result = mktBusiOpporOperationService.backBusiOppor(model, auth);
			if (result == 1) {
				throw new BizException(1, 0, "100010", "您不符合退回当前商机的条件！");
			}
		}
	}

	// 根据商机ID，删除对应的商机记录
	public void delBusiOpporById() {
		String result = null;
		request = this.getRequest();
		AuthUser auth = null;
		auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		String opporIdS = request.getParameter("opporIdS");
		result = mktBusiOpporOperationService.delBusiOpporByIdS(opporIdS, auth);
		if (result != null && !"".equals(result)) {
			throw new BizException(1, 0, "100010", result);
		}
	}

	// 认领商机
	public void claimBusiOppor() {
		AuthUser auth = null;
		request = this.getRequest();
		String opporIdS = null;// 商机记录ID集合
		String claimType = null;// 认领方式，0：客户经理认领；1：机构认领
		opporIdS = request.getParameter("opporIdS");
		claimType = request.getParameter("claimType");
		auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		mktBusiOpporOperationService.claimBusiOppor(opporIdS, claimType, auth);
	}

	// 认领商机审批
	public void claimAuditBusiOppor() {
		AuthUser auth = null;
		request = this.getRequest();
		String opporIdS = null;// 商机记录ID集合
		String auditResult = null;// 审批结果，0：通过；1：不通过
		opporIdS = request.getParameter("opporIdS");
		auditResult = request.getParameter("auditResult");
		auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		mktBusiOpporOperationService.claimAuditBusiOppor(opporIdS, auditResult,
				auth, model);
	}

	// 根据机构ID，查询对应的机构主管
	// 查询逻辑：
	// 1、在用户表中，根据机构ID，查询出该机构下的所有用户
	// 2、在用户和角色关联表中，根据用户和角色关联关系，找出角色为“主管”的用户
	// 其中，“主管角色”编码，是在代码中写死的，在不同的行实施时，需要根据具体情况进行修改
	public void getOrgManager() {
		String ogrId = null;
		String orgManager = null;
		request = this.getRequest();
		ogrId = request.getParameter("orgId");
		orgManager = mktBusiOpporOperationService.getOrgManager(ogrId);
		try {
			this.getResponse().getWriter()
					.write(orgManager == null ? "" : orgManager);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// 判断当前用户是否能退回选中的商机
	// 判断逻辑：
	// 1、客户经理只能退回分配给自己的商机，客户只有当前一个归属客户经理时不能退回
	// 2、客户主管可以退回分配给本机构的商机，并且只能退回客户没有归属机构的商机
	public void canReturn() {
		String userType = null;
		String opporId = null;
		AuthUser auth = null;
		String canReturnResult = "true";
		request = this.getRequest();
		userType = request.getParameter("userType");
		opporId = request.getParameter("opporId");
		auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		canReturnResult = mktBusiOpporOperationService.canReturn(userType,
				opporId, auth);
		try {
			this.getResponse().getWriter().write(canReturnResult);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// 获取HttpServletRequest对象
	private HttpServletRequest getRequest() {
		ActionContext ctx = ActionContext.getContext();
		return (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
	}

	// 获取HttpServletResponse对象
	private HttpServletResponse getResponse() {
		ActionContext ctx = ActionContext.getContext();
		return (HttpServletResponse) ctx
				.get(StrutsStatics.HTTP_RESPONSE);
	}

	// 从客户群组功能点批量创建商机(新增保存)
	public void pitchCreateBusiOpporFromCustGroup() {
		AuthUser auth = null;
		auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		if (model != null) {
			mktBusiOpporOperationService.pitchCreateBusiOpporFromCustGroup(
					model, auth);
		}
	}

	// 从客户群组功能点批量创建商机(新增提交)
	public void pitchCreateSubmitBusiOpporFromCustGroup() {
		AuthUser auth = null;
		auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		if (model != null) {
			mktBusiOpporOperationService
					.pitchCreateSubmitBusiOpporFromCustGroup(model, auth);
		}
	}

}