package com.xywztech.bob.action;

import java.util.Collection;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Validateable;
import com.opensymphony.xwork2.ValidationAwareSupport;
import com.xywztech.bob.model.ClientGroupMember;
import com.xywztech.bob.service.ClientGroupMemberService;

@Results({ @Result(name = "success", type = "redirectAction", params = {
		"actionName", "client-group-member" }) })
public class ClientGroupMemberAction extends ValidationAwareSupport implements
		ModelDriven<Object>, Validateable {

	private static final long serialVersionUID = 1569168866929141867L;
	private ClientGroupMember groupMember;
	private long id;
	private Collection<ClientGroupMember> list;
	@Autowired
	private ClientGroupMemberService clientGroupMemberService;

	// 查询一条成员信息显示
	public HttpHeaders show() {
		return new DefaultHttpHeaders("show");
	}

	// 查询集团成员列表
	public HttpHeaders index() {
		String groupId = "010101022";
		list = clientGroupMemberService.memberList(groupId);
		return new DefaultHttpHeaders("index").disableCaching();
	}

	// 修改一条记录
	public String edit() {
		return "edit";
	}

	// 跳转到新增页面
	public String editNew() {
		groupMember = new ClientGroupMember();
		return "editNew";
	}

	// 确定是否删除一条记录
	public String deleteConfirm() {
		 return "deleteConfirm";
	}

	// 删除一条记录
	public String destroy() {
		clientGroupMemberService.deleteGroupMember(id);
		addActionMessage("Person removed successfully");
		return "success";
	}

	// 新增一条记录
	public HttpHeaders create() {
		clientGroupMemberService.saveGroupMember(groupMember);
		addActionMessage("New groupInfo created successfully");
		return new DefaultHttpHeaders("success").setLocationId(groupMember
				.getMemberId());
	}

	// 修改一条记录
	public String update() {
		clientGroupMemberService.saveGroupMember(groupMember);
		addActionMessage("groupInfo updated successfully");
		return "success";
	}

	public void validate() {
		// if (model.getFirstName() == null || model.getFirstName().length()
		// ==0) {
		// addFieldError("firstName", "The first name is empty");
		// }
		// if (model.getLastName() == null || model.getLastName().length() ==0)
		// {
		// addFieldError("lastName", "The last name is empty");
		// }
	}

	public String printObj() {
		//system.out.printlnln(" id : " + id);
		return "show";
	}
	//设置主键
	public void setId(Long id) {
		if (id != null) {
			this.groupMember = clientGroupMemberService.memberSearch(id);
		}
		this.id = id;
	}
	//返回集团客户成员model实例
	public Object getModel() {
		return (list != null ? list : groupMember);
	}
}
