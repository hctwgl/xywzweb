package com.xywztech.bob.action;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Validateable;
import com.opensymphony.xwork2.ValidationAwareSupport;
import com.xywztech.bob.model.CustomerFamilyMember;
import com.xywztech.bob.service.CustomerFamilyMemberService;

/**
 * @describe 高管家庭成员信息
 * 
 */
@SuppressWarnings("serial")
@Action("/customerfamilymember")
@Results({ @Result(name = "success", type = "redirectAction", params = {
        "actionName", "customerfamilymember" }) })
public class CustomerFamilyMemberAction extends ValidationAwareSupport
        implements ModelDriven<Object>, Validateable {

    private CustomerFamilyMember cfm = new CustomerFamilyMember();
    private Collection<CustomerFamilyMember> cfmc;
    private Long id;
    private HttpServletRequest request;

    @Autowired
    private CustomerFamilyMemberService cfms;

    /**
     * 请求数据编辑页面跳转。 HTTP:GET方法 URL:/actionName/$id/edit;
     */
    public String edit() {
        return "edit";
    }

    /**
     * 新增页面请求 HTTP:GET方法 URL:/actionName/new
     */
    public String editNew() {
        return "editNew";
    }

    /**
     * 请求删除页面 HTTP:GET方法 URL:/actionName/$id/deleteContirm
     */
    public String deleteConfirm() {
        return "deleteConfirm";
    }

    /**
     * 数据删除提交 HTTP:DELETE方法 URL:/actionName/$id
     */
    public String destroy() {
        /******************/
        ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);
        String idStr = request.getParameter("idStr");
        /******************/
        cfms.remove(idStr);
        return "success";
    }

    /**
     * 数据新增提交 HTTP:POST方法 URL:/actionName
     */
    public HttpHeaders create() {
        cfms.save(cfm);
        return new DefaultHttpHeaders("success").setLocationId(cfm.getMXTID());
    }

    /**
     * 数据修改提交 HTTP:PUT方法 URL:/WorkPlatNotice/$id
     */
    public String update() {
        cfms.save(cfm);
        return "success";
    }

    /**
     * 数据验证方法
     */
    public void validate() {
        /**
         * TODO validate bussness logic.
         */
    }

    /**
     * ID参数获取方法
     * 
     * @param id
     */
    public void setId(Long id) {
        if (id != null) {
            this.cfm = cfms.find(id);
        }
        this.id = id;
    }

    /**
     * 
     */
    public Object getModel() {
        return (cfmc != null ? cfmc : cfm);
    }
}
