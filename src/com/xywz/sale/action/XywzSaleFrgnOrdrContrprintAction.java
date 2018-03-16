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
import com.xywz.logi.model.XywzLogiSendNotice;
import com.xywz.sale.service.XywzSaleFrgnOrdrContrService;
import com.xywz.sale.service.XywzSaleInvInfoService;
import com.xywztech.bob.common.CommonAction;



@ParentPackage("json-default")
@Action(value="XywzSaleFrgnOrdrContrprintAction",results={@Result(name="success",type="json")})

public class XywzSaleFrgnOrdrContrprintAction  extends CommonAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Map<String ,Object> invMap = new HashMap<String, Object>();
	private List<XywzLogiSendNotice> invInfo;

	@Autowired
	private XywzSaleFrgnOrdrContrService xywzSaleFrgnOrdrContrService;
	@Autowired
	private XywzSaleInvInfoService xywzSaleInvInfoService;
 
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;
//	public void prepare(){
//		ActionContext ctx = ActionContext.getContext();
//        request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
//        String sheetId = request.getParameter("sheetId");
//		invInfo =  xywzLogiSendNoticeService.findAllXywzLogiNoticeInfo(Long.parseLong(sheetId));
//		StringBuffer sql = new StringBuffer("SELECT * FROM XYWZ_LOGI_SEND_NOTICE WHERE T.SEND_SHEET_ADVS_ID = "+sheetId);
//		SQL = sql.toString();
//		datasource = dsOracle;
//		invMap.put("invInfo", invInfo);
//	}
//打印准备


	public String xywzSaleFrgnOrdrContrPrint() {
		
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);

		String contrNum = request.getParameter("sheetId");
		StringBuffer sb = new StringBuffer();
		sb.append(
				"SELECT T.* FROM (SELECT T1.ORDR_ID,T1.ORDR_STAT,T1.SIGN_DT,T1.CONTR_NUM,T1.CUST_ID,T1.CUR,T1.AMT," +
				"T7.F_COMMENT as BRGN_MODE,T1.NEXT_PLAN_SNGL_DT,T1.PAY_MD,T1.IS_NT_RECV_LC,T1.LC_NUM,T1.PREPY_MONEY_DT," +
				"T1.PREPY_MONEY_AMT,T1.FINAL_TRAFF_DAY,T1.PORTOF_DISCHARGE,T1.SEND_TAG_DT,T1.IS_ALTER_CERT," +
				"T1.SELL_PRINC_ID,T1.MAK_DOC_PERS_ID,T1.BELG_CORP,T2.EMAIL,T3.F_VALUE,T4.CUST_SHT_NM,T3.F_COMMENT," +
				"T4.CUST_FULL_NM,T1.NGTV_POOR,T1.PKG,T1.SHIPPINGMARKS,T5.PORT_NAME_CN AS  LOAD_TRAFF_PORT,T6.PORT_NAME_CN AS DISCHARGE_PORT," +
				"T1.ADVIS_BANK,T1.MORE_OR_LESS,T1.NEED_DOC,T1.FINAL_TRAFF_DETAIL,T1.MERCHD_NM,T1.BRGN_MODE_DETAIL " +
				" FROM xywz_sale_frgn_ordr_contr AS T1 " +
				"LEFT JOIN admin_auth_account T2 " +
				"ON T1.SELL_PRINC_ID=T2.ACCOUNT_NAME " +
				"LEFT JOIN ocrm_sys_lookup_item T3 " +
				"ON T1.BELG_CORP=T3.F_CODE AND T3.F_LOOKUP_ID='XYWZ_SALE_BELG_CORP' "+
				"LEFT JOIN xywz_cust_custinfo T4 " +
				"ON T1.CUST_ID=T4.CUST_ID "+
				"LEFT JOIN XYWZ_LOGI_PORT_INFO_MGMT T5 " +
				"ON T1.LOAD_TRAFF_PORT=T5.PORT_ID "+
				"LEFT JOIN XYWZ_LOGI_PORT_INFO_MGMT T6 " +
				"ON T1.PORTOF_DISCHARGE=T6.PORT_ID "+
				"LEFT JOIN ocrm_sys_lookup_item T7 " +
				"ON T1.BRGN_MODE=T7.F_CODE AND T7.F_LOOKUP_ID='XYWZ_BRGN_MODE' "+
				" where T1.CONTR_NUM = '"+contrNum+"') T"
			);

		this.json= this.xywzSaleFrgnOrdrContrService.findFrgnOrdrContr(sb.toString(),contrNum);
		//	this.json= this.xywzSaleFrgnOrdrContrService.findInvInfo(sb.toString(),sheetId);
		

		return "success";
	}
	
	public Map<String, Object> getInvMap() {
		return invMap;
	}
	public void setInvMap(Map<String, Object> invMap) {
		this.invMap = invMap;
	}
	
}
