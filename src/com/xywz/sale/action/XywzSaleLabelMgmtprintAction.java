/**
 * 
 */
package com.xywz.sale.action;

import java.util.HashMap;
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
import com.xywz.sale.service.XywzSaleLabelMgmtService;
import com.xywztech.bob.common.CommonAction;



@ParentPackage("json-default")
@Action(value="XywzSaleLabelMgmtprintAction",results={@Result(name="success",type="json")})

public class XywzSaleLabelMgmtprintAction  extends CommonAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Map<String ,Object> invMap = new HashMap<String, Object>();

	@Autowired
	private XywzSaleLabelMgmtService xywzSaleLabelMgmtService;

 
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;

//打印准备


	public String xywzSaleLabelMgmtprint() {
		
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);

		String sheetId = request.getParameter("sheetId");
		StringBuffer sb = new StringBuffer();
		sb.append(
				"SELECT LABEL_ID, SHIPPINGMARKS, SIZE, QUALITY, HEAT_NUMBER, THICKNESS, MILLS_NAME, " +
				"BACK_NOTE, BUNDLE_NUMBER, PCS_BUNDLE, COLOUR, MEMO,HS_CODE,QTY FROM xywz_sale_label_mgmt "+
				" where LABEL_ID  = "+sheetId
			);

		this.json= this.xywzSaleLabelMgmtService.findlabel(sb.toString(),sheetId);

		

		return "success";
	}
	
	public Map<String, Object> getInvMap() {
		return invMap;
	}
	public void setInvMap(Map<String, Object> invMap) {
		this.invMap = invMap;
	}
	
}
