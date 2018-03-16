/**
 * 
 */
package com.xywz.asst.action;

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
import com.xywz.asst.model.XywzAsstMachgContractMgmt;
import com.xywz.asst.service.XywzAsstMachgContractMgmtService;
import com.xywztech.bob.common.CommonAction;



@ParentPackage("json-default")
@Action(value="XywzAsstMachgContractMgmtPrintAction",results={@Result(name="success",type="json")})

public class XywzAsstMachgContractMgmtPrintAction  extends CommonAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Map<String ,Object> invMap = new HashMap<String, Object>();
	private List<XywzAsstMachgContractMgmt> invInfo;

	@Autowired
	private XywzAsstMachgContractMgmtService xywzAsstMachgContractMgmtService;

 
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;
	@Override
	public void prepare(){
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String sheetId = request.getParameter("sheetId");
		invInfo =  xywzAsstMachgContractMgmtService.findAllXywzAsstMachgContractMgmtInfo(Long.parseLong(sheetId));
		StringBuffer sql = new StringBuffer("SELECT * FROM xywz_asst_machg_contract_mgmt T WHERE T.MACHG_CONTR_NUM = '"+sheetId+"'");
		SQL = sql.toString();
		datasource = dsOracle;
		invMap.put("invInfo", invInfo);
	}
	public String getInvInfo() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);

		String sheetId = request.getParameter("sheetId");
		StringBuffer sb = new StringBuffer();
		sb.append(" select MACHG_ORDR_NM,T.MACHG_CONTR_NUM,CONTR_DT,MEMO1,QLTY_REQST,MEMO2,MEMO3,MEMO3,PKG_REQST,STL_MODE_AND_TERM,T.MEMO,T1.ADDR,T1.TEL,T1.FAX,T2.BANK_FULL_NM,T2.ACCT_NUM,MACHG_COST_SUM,SIGN_SITE " +
				"from xywz_asst_machg_contract_mgmt T left join xywz_asst_machg_corp_mgmt T1 on(T.MACHG_ORDR_NUM_ID=T1.ASST_MACHG_ID) left join xywz_asst_machg_mgmt_bank T2 " +
				"on(T.MACHG_ORDR_NUM_ID=T2.ASST_MACHG_ID) where MACHG_CONTR_NUM= '"+sheetId+"' limit 1 " );

		this.json= this.xywzAsstMachgContractMgmtService.findXywzAsstMachgContractMgmtInfo(sb.toString(),sheetId);
		
		return "success";
	}
	
	public Map<String, Object> getInvMap() {
		return invMap;
	}
	public void setInvMap(Map<String, Object> invMap) {
		this.invMap = invMap;
	}
	
}
