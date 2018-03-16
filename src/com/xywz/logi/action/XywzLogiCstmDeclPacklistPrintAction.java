/**
 * 
 */
package com.xywz.logi.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import com.xywz.sale.model.XywzSaleCstmDeclPacklist;
import com.xywz.sale.service.XywzSaleCstmDeclPacklistService;
import com.xywz.sale.service.XywzSaleInvInfoService;
import com.xywztech.bob.common.CommonAction;



@ParentPackage("json-default")
@Action(value="XywzLogiCstmDeclPacklistPrintAction",results={@Result(name="success",type="json")})

public class XywzLogiCstmDeclPacklistPrintAction  extends CommonAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Map<String ,Object> invMap = new HashMap<String, Object>();
	private List<XywzSaleCstmDeclPacklist> packList;

	@Autowired
	private XywzSaleCstmDeclPacklistService xywzSaleCstmDeclPacklistService;
	private XywzSaleInvInfoService xywzSaleInvInfoService;

 
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;
	@Override
	public void prepare(){
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String cstmPacklistId = request.getParameter("cstmPacklistId");
        packList =  xywzSaleCstmDeclPacklistService.findAllXywzPackList(Long.parseLong(cstmPacklistId));
		StringBuffer sql = new StringBuffer("SELECT * FROM XYWZ_SALE_CSTM_DECL_PACKLIST T WHERE T.CSTM_PACKLIST_ID = '"+cstmPacklistId+"'");
		SQL = sql.toString();
		datasource = dsOracle;
		invMap.put("packList", packList);
	}
	public String getPackList() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);

		String cstmPacklistId = request.getParameter("cstmPacklistId");
		StringBuffer sb = new StringBuffer();
		sb.append(" SELECT "+
					"T1.INV_NUM,"+
					"T2.CUST_FULL_NM,"+
					"T1.INV_DT,"+
					"T1.CONTR_NUM,"+
					"T1.PAYMENTS,"+
					"T4.PORT_NAME_CN AS PORTOFLOADING,"+
					"T5.PORT_NAME_CN AS PORTOFDESTINATION, "+
					"T1.SHIPPINGMARKS "+
					"FROM XYWZ_SALE_INV_INFO T1 "+
					"LEFT JOIN XYWZ_CUST_CUSTINFO T2 "+
					"ON ( T2.CUST_ID = T1.CHKS_PERS ) "+
					"LEFT JOIN XYWZ_LOGI_PORT_INFO_MGMT T4 "+
					"ON ( T1.PORTOFLOADING = T4.PORT_ID ) "+
					"LEFT JOIN XYWZ_LOGI_PORT_INFO_MGMT T5 "+
					"ON ( T1.PORTOFDESTINATION = T5.PORT_ID ) "+ 
				"WHERE T1.INV_NUM = '"+cstmPacklistId+"'");

		this.json= this.xywzSaleCstmDeclPacklistService.findPackList(sb.toString(),cstmPacklistId);

		return "success";
	}
	
	public Map<String, Object> getInvMap() {
		return invMap;
	}
	public void setInvMap(Map<String, Object> invMap) {
		this.invMap = invMap;
	}
	
}
