package com.xywztech.bcrm.product.action;

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
import com.xywztech.bcrm.product.model.OcrmFPdProdProperty;
import com.xywztech.bcrm.product.service.ProductPropertyService;

/**
 * @describe 产品特征项
 * 
 */
@SuppressWarnings("serial")
@Action("/ProdProperty")
@Results({ @Result(name = "success", type = "redirectAction", params = {
        "actionName", "ProdProperty" }) })
public class ProductPropertyAction extends ValidationAwareSupport
        implements ModelDriven<Object>, Validateable {

    private OcrmFPdProdProperty ppm = new OcrmFPdProdProperty();
    private Collection<OcrmFPdProdProperty> ppmc;
    private Long id;
    private HttpServletRequest request;

    @Autowired
    private ProductPropertyService pps;

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
        pps.remove(idStr);
        return "success";
    }

    /**
     * 数据新增提交 HTTP:POST方法 URL:/actionName
     */
    public HttpHeaders create() {
        pps.save(ppm);
        return new DefaultHttpHeaders("success").setLocationId(ppm.getId());
    }

    /**
     * 数据修改提交 HTTP:PUT方法 URL:/WorkPlatNotice/$id
     */
    public String update() {
        pps.save(ppm);
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
            this.ppm = pps.find(id);
        }
        this.id = id;
    }

    /**
     * 
     */
    public Object getModel() {
        return (ppmc != null ? ppmc : ppm);
    }
}


