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
import com.xywztech.bob.model.CustomerStockholder;
import com.xywztech.bob.service.CustomerStockholderService;

/**
 * @describe 股东信息
 * 
 */
@SuppressWarnings("serial")
@Action("/customerstockholder")
@Results({ @Result(name = "success", type = "redirectAction", params = {
        "actionName", "customerstockholder" }) })
public class CustomerStockholderAction extends ValidationAwareSupport implements
        ModelDriven<Object>, Validateable {

    private CustomerStockholder cs = new CustomerStockholder();
    private Collection<CustomerStockholder> csc;
    private Long id;
    private HttpServletRequest request;

    @Autowired
    private CustomerStockholderService css;

    /**
     * 单条数据展示. HTTP:GET方法 URL:/actionName/$id;
     */
    public HttpHeaders show() {
        cs = css.find(id);
        return new DefaultHttpHeaders("show");
    }

    /**
     * 数据列表查询包括全部数据，或者待条件查询。 HTTP:GET方法 URL:/actionName；
     */
    public HttpHeaders index() {
        csc = css.findAll();
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
        css.remove(idStr);
        return "success";
    }

    /**
     * 数据新增提交 HTTP:POST方法 URL:/actionName
     */
    public HttpHeaders create() {
        css.save(cs);
        return new DefaultHttpHeaders("success").setLocationId(cs.getID());
    }

    /**
     * 数据修改提交 HTTP:PUT方法 URL:/WorkPlatNotice/$id
     */
    public String update() {
        css.save(cs);
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
            this.cs = css.find(id);
        }
        this.id = id;
    }

    /**
     * 
     */
    public Object getModel() {
        return (csc != null ? csc : cs);
    }
}
