/**
 * @author hujun
 */
package com.xywztech.bcrm.product.action;


import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.product.model.OcrmFPdProdFeedback;
import com.xywztech.bcrm.product.service.OcrmFPdProdFeedbackService;

import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@ParentPackage("json-default")
@Action(value = "/productfeedback")
public class ProductFeedBackAction extends CommonAction {
 	private HttpServletRequest request;

	@Autowired
	private OcrmFPdProdFeedbackService service;
	
	
	@Autowired
    @Qualifier("dsOracle")
    private DataSource ds;
	 
	@Autowired
	public void init() {
		model = new OcrmFPdProdFeedback();
		setCommonService(service);
	}
   
    @Override
	public void prepare() {
    	ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String productId = request.getParameter("productId");

        StringBuilder sb = new StringBuilder("select t.* "
                + "from OCRM_F_PD_PROD_FEEDBACK t where t.PRODUCT_ID = '" + productId+"'");
        SQL = sb.toString();
        setPrimaryKey("t.FEEDBACK_ID desc");
        datasource = ds;
    }
   
     
    //删除
    @Override
	public String destroy() {

    	try {
			ActionContext ctx = ActionContext.getContext();
			request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
			service.remove(Long.valueOf(idStr));
    		addActionMessage("remove productFeatureId successful");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return "success";
    }
}


