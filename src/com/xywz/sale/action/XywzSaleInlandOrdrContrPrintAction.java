/**
 * 
 */
package com.xywz.sale.action;

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
import com.xywz.sale.model.XywzSaleInlandOrdrContr;
import com.xywz.sale.service.XywzSaleInlandOrdrContrService;
import com.xywztech.bob.common.CommonAction;



@ParentPackage("json-default")
@Action(value="XywzSaleInlandOrdrContrPrintAction",results={@Result(name="success",type="json")})

public class XywzSaleInlandOrdrContrPrintAction  extends CommonAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Map<String ,Object> invMap = new HashMap<String, Object>();
	private List<XywzSaleInlandOrdrContr> invInfo;

	@Autowired
	private XywzSaleInlandOrdrContrService xywzSaleInlandOrdrContrService;

 
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;
	@Override
	public void prepare(){
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String sheetId = request.getParameter("sheetId");
		invInfo =  xywzSaleInlandOrdrContrService.findAllXywzSaleInlandOrdrContrInfo(Long.parseLong(sheetId));
		StringBuffer sql = new StringBuffer("SELECT * FROM xywz_sale_inland_ordr_contr T WHERE T.CONTR_NUM = '"+sheetId+"'");
		SQL = sql.toString();
		datasource = dsOracle;
		invMap.put("invInfo", invInfo);
	}
	public String getInvInfo() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);

		String sheetId = request.getParameter("sheetId");
		StringBuffer sb = new StringBuffer();
		sb.append(" select T.CUST_NM,T.CONTR_NUM,T.CONTR_DT,QLTY_TECH_STD_REQST,FINAL_TRAFF_DETAIL,TRAFF_MODE,NGTV_POOR,PKG,HESIT_PRD,STL_MODE,T1.ADDR,T1.TEL_OR_FAX,T2.BANK_FULL_NM,T2.ACCT_NUM,T.AMT,T1.CUST_FULL_NM " +
				"from xywz_sale_inland_ordr_contr T left join xywz_cust_custinfo T1 on(T.CUST_ID=T1.CUST_ID) left join xywz_cust_custbank T2 " +
				"on(T.CUST_ID=T2.CUST_ID) where T.CONTR_NUM= '"+sheetId+"' limit 1 " );

		this.json= this.xywzSaleInlandOrdrContrService.findXywzSaleInlandOrdrContrInfo(sb.toString(),sheetId);
		
		return "success";
	}
	
	public Map<String, Object> getInvMap() {
		return invMap;
	}
	public void setInvMap(Map<String, Object> invMap) {
		this.invMap = invMap;
	}
	
}
