/**
 * 
 */
package com.xywz.purc.action;

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
import com.xywz.purc.model.XywzPurcOutPurcContract;
import com.xywz.purc.service.XywzPurcOutPurcContractService;
import com.xywztech.bob.common.CommonAction;



@ParentPackage("json-default")
@Action(value="XywzPurcOutPurcContractPrintAction",results={@Result(name="success",type="json")})

public class XywzPurcOutPurcContractPrintAction  extends CommonAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Map<String ,Object> invMap = new HashMap<String, Object>();
	private List<XywzPurcOutPurcContract> invInfo;

	@Autowired
	private XywzPurcOutPurcContractService xywzPurcOutPurcContractService;

 
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;
	@Override
	public void prepare(){
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String sheetId = request.getParameter("sheetId");
		invInfo =  xywzPurcOutPurcContractService.findAllXywzPurcOutPurcContractInfo(Long.parseLong(sheetId));
		StringBuffer sql = new StringBuffer("SELECT * FROM xywz_purc_out_purc_contract T WHERE T.PUCH_SNGL_ID = '"+sheetId+"'");
		SQL = sql.toString();
		datasource = dsOracle;
		invMap.put("invInfo", invInfo);
	}
	public String getInvInfo() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);

		String sheetId = request.getParameter("sheetId");
		StringBuffer sb = new StringBuffer();
		sb.append("select  PROVR_FULL_NM,A1.PUCH_SNGL_ID,CONTR_DT,MEMO1,DELY_ADDR,MEMO2,MEMO3,MEMO4,MEMO5,MEMO6,MEMO,ADDR,TEL,FAX,BANK_FULL_NM,ACCT_NUM,TOTAL_AMT " +
				"from (select T1.PROVR_FULL_NM,T.PUCH_SNGL_ID,CONTR_DT,MEMO1,DELY_ADDR,MEMO2,MEMO3,MEMO4,MEMO5,MEMO6,T.MEMO,T1.ADDR,T1.TEL,T1.FAX,T2.BANK_FULL_NM,T2.ACCT_NUM " +
				"from xywz_purc_out_purc_contract T left join xywz_purc_provr_mgmt_cust T1 on(T.PROVR_NUM=T1.PROVR_NUM) left join xywz_purc_provr_mgmt_bank T2 " +
				"on(T.PROVR_NUM=T2.PROVR_NUM) where PUCH_SNGL_ID='"+sheetId+"' limit 1 )as A1 join (select PUCH_SNGL_ID,round(sum(QTY*UPRC),2) as " +
						"TOTAL_AMT from xywz_purc_provr_mgmt_product where PUCH_SNGL_ID='"+sheetId+"')as A2 on (A1.PUCH_SNGL_ID=A2.PUCH_SNGL_ID) " );

		this.json= this.xywzPurcOutPurcContractService.findPurcOutPurcContractInfo(sb.toString(),sheetId);
		
		return "success";
	}
	
	public Map<String, Object> getInvMap() {
		return invMap;
	}
	public void setInvMap(Map<String, Object> invMap) {
		this.invMap = invMap;
	}
	
}
