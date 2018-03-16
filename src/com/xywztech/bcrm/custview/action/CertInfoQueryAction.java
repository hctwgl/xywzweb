package com.xywztech.bcrm.custview.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.common.CommonAction;
/**
 * 
 *主要证件信息查询
 * @author sxs
 * @since 2012-9-26
 * 
 */
@SuppressWarnings("serial")
@ParentPackage("json-default")
@Action(value = "/certInfoQuery-Action", results = { @Result(name = "success", type = "json")})
public class CertInfoQueryAction extends CommonAction {
	
	//数据源
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
   
	/**
	 *模块功能查询
	 */
	@Override
	public void prepare() {
		
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
 		String custId =request.getParameter("custId");
		StringBuilder sb = new StringBuilder(
					"select c.* from ACRM_F_CI_CERT_INFO c where 1=1 ");
		sb.append(" and c.CUST_ID = '"+custId+"'");
		setPrimaryKey("c.ID");
        addOracleLookup("CRET_TYPE","COM_CRET_TYPE");//证件类型

		SQL=sb.toString();
		datasource = ds;
	}
}
