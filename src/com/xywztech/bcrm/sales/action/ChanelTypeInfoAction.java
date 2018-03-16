
package com.xywztech.bcrm.sales.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.product.model.OcrmFPdProdItemRel;
import com.xywztech.bcrm.product.service.ProductContrastRelationService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/chaneltypeinfo")
public class ChanelTypeInfoAction  extends CommonAction {
    
    private HttpServletRequest request;

	@Autowired
	private ProductContrastRelationService service;
	
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource ds;  
	
	@Autowired
	public void init() {
		model = new OcrmFPdProdItemRel();
		setCommonService(service);
	}
	/**
	 * 渠道类型查询
	 */
	@Override
	public void prepare(){
    	ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String tableName = request.getParameter("tableName");
    	String sqlapp = "select t.*  from "+tableName+" t ";

        	StringBuilder sb  = new StringBuilder(sqlapp);
       		sb.append("	WHERE 1=1");

        	SQL=sb.toString();
        	datasource = ds;
    	}	
}
