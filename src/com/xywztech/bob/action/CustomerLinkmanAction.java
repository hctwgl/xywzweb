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
import com.xywztech.bob.model.CustomerLinkman;
import com.xywztech.bob.service.CustomerLinkmanService;

/**
 * @describe 联系人信息
 * 
 */
@SuppressWarnings("serial")
@Action("/customerlinkman")
@Results({ @Result(name = "success", type = "redirectAction", params = {
        "actionName", "customerlinkman" }) })
public class CustomerLinkmanAction extends ValidationAwareSupport implements
        ModelDriven<Object>, Validateable {

    private CustomerLinkman cl = new CustomerLinkman();
    private Collection<CustomerLinkman> clc;
    private Long id;
    private HttpServletRequest request;

    @Autowired
    private CustomerLinkmanService cls;

    /**
     * 单条数据展示. HTTP:GET方法 URL:/actionName/$id;
     */
    public HttpHeaders show() {
        cl = cls.find(id);
        return new DefaultHttpHeaders("show");
    }

    /**
     * 数据列表查询包括全部数据，或者待条件查询。 HTTP:GET方法 URL:/actionName；
     */
    public HttpHeaders index() {
        clc = cls.findAll();
        return new DefaultHttpHeaders("index").disableCaching();
    }

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
        cls.remove(idStr);
        return "success";
    }

    /**
     * 数据新增提交 HTTP:POST方法 URL:/actionName
     */
    public HttpHeaders create() {
        cls.save(cl);
        return new DefaultHttpHeaders("success").setLocationId(cl.getID());
    }

    /**
     * 数据修改提交 HTTP:PUT方法 URL:/WorkPlatNotice/$id
     */
    public String update() {
        cls.save(cl);
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
            this.cl = cls.find(id);
        }
        this.id = id;
    }

    /**
     * 
     */
    public Object getModel() {
        return (clc != null ? clc : cl);
    }
}
