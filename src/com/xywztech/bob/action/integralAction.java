package com.xywztech.bob.action;





import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

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
import com.xywztech.bob.model.OcrmFCiGiftExchange;
import com.xywztech.bob.service.IntegralService;

	
@Action("/ChangeAction")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "ChangeAction"})
})
public class integralAction extends ValidationAwareSupport implements ModelDriven<Object>, Validateable {
	
	private OcrmFCiGiftExchange wi = new OcrmFCiGiftExchange();
	private Collection<OcrmFCiGiftExchange> wic;
	private String id;
	private HttpServletRequest request;
	
    @Autowired
    private IntegralService wis;
    
   // @Autowired
   // private ProductRelaService productRelaService =new ProductRelaService();
	
    /**
     * 单条数据展示.
     * HTTP:GET方法
     * URL:/actionName/$id;
     */
    public HttpHeaders show() {
    	wi = wis.find(id);    	
        return new DefaultHttpHeaders("show");
    }

    /**
     * 数据列表查询包括全部数据，或者待条件查询。
     *  HTTP:GET方法 
     *  URL:/actionName；
     */
    public HttpHeaders index() {
    	wic = wis.findAll();
        return new DefaultHttpHeaders("index")
            .disableCaching();
    }
    
    /**
     * 请求数据编辑页面跳转。
     * HTTP:GET方法
     * URL:/actionName/$id/edit;
     */
    public String edit() {
        return "edit";
    }

    /**
     * 新增页面请求
     * HTTP:GET方法
     * URL:/actionName/new
     */
    public String editNew() {
        return "editNew";
    }

    /**
     * 请求删除页面
     * HTTP:GET方法
     * URL:/actionName/$id/deleteContirm
     */
    public String deleteConfirm() {
        return "deleteConfirm";
    }
/*
    *//**
     * 数据删除提交
     * HTTP:DELETE方法
     * URL:/actionName/$id
     *//*
    public String destroy() {
    	wis.remove(this.id);
        return "success";
    }*/
    
    /**
     * 数据删除提交 HTTP:DELETE方法 URL:/actionName/$id
     */
    public String destroy() {
        /******************/
        ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);
        String idStr = request.getParameter("idStr");
        
                wis.remove(idStr);
        return "success";
    }
    
    
    public Date getCurrentDate() throws Exception {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-DD");
		String date = format.format(new java.util.Date()).toString();
		return format.parse(date);
	}

    /**
     * 数据新增提交
     * HTTP:POST方法
     * URL:/actionName
     * @throws Exception 
     */
    public String create() throws Exception {
    	
    	ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	wis.save(wi);
    	return "success";
    	}

    /**
     * 数据修改提交
     * HTTP:PUT方法
     * URL:/WorkPlatNotice/$id
     */
    public String update() {
       	wis.save(wi);
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
     * @param id
     */
    /*public void setId(String id) {
        if (id != null) {
            this.wi = wis.find(id);
        }
        this.id = id;
    }
    */
    /**
     * 
     */
    public Object getModel() {
        return (wic != null ? wic : wi);
    }
}