/**
 * 
 */
package com.xywz.acct.action;

import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywz.acct.service.XywzAcctStmtMgmtService;
import com.xywztech.bob.common.CommonAction;



@ParentPackage("json-default")
@Action(value="XywzAcctStmtMgmtSumPrintAction",results={@Result(name="success",type="json")})

public class XywzAcctStmtMgmtSumPrintAction  extends CommonAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Autowired
	private XywzAcctStmtMgmtService xywzAcctStmtMgmtService;

 
	@Autowired
	@Qualifier("dsOracle")	
	
	public String getInvInfo() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);

		StringBuffer sb = new StringBuffer();
		sb.append(" select '1'as STATS_TYP, '-' as CONTR_NUM ,t2.BELONG_COUNTRY as PORTOF_DISCHARGE ,'-' as TX_TYP,count(t.ID) as CNT" +
				",sum(t.WEIGHT) as WEIGHT ,'-' as CUR,sum(t.AMT) as AMT from xywz_acct_stmt_mgmt t left join xywz_sale_frgn_ordr_contr t1 " +
				"on t.CONTR_NUM=t1.CONTR_NUM left join xywz_logi_port_info_mgmt t2 on t1.PORTOF_DISCHARGE=t2.PORT_ID where t.RECV_LOAD_BILL='0'" +
				" group by t2.BELONG_COUNTRY  union select '2'as STATS_TYP, '-' as CONTR_NUM, '-' as PORTOF_DISCHARGE ,t.TX_TYP " +
				"as TX_TYP,count(t.ID) as CNT,sum(t.WEIGHT) as WEIGHT ,'-' as CUR,sum(t.AMT) as AMT from xywz_acct_stmt_mgmt t " +
				" where t.RECV_LOAD_BILL='1' and t.LOAN='0' and t.REFUND='0' group by t.TX_TYP  union select '3'as STATS_TYP," +
				"t1.CONTR_NUM as CONTR_NUM, '-' as PORTOF_DISCHARGE ,t.TX_TYP as TX_TYP, 1 as CNT,t.WEIGHT as WEIGHT ,'-' " +
				"as CUR,t.AMT as AMT from xywz_acct_stmt_mgmt t left join xywz_sale_frgn_ordr_contr t1 on t.CONTR_NUM=t1.CONTR_NUM  " +
				"where t.RECV_LOAD_BILL='1' and t.LOAN='1' and t.REFUND='0'  union select '4'as STATS_TYP,t1.CONTR_NUM as CONTR_NUM," +
				" '-' as PORTOF_DISCHARGE ,t.TX_TYP as TX_TYP, 1 as CNT,t.WEIGHT as WEIGHT ,'-' as CUR,t.AMT as AMT from " +
				"xywz_acct_stmt_mgmt t left join xywz_sale_frgn_ordr_contr t1 on t.CONTR_NUM=t1.CONTR_NUM  where t.RECV_LOAD_BILL='1' " +
				"and t.LOAN='1' and t.REFUND='1'  union select '5'as STATS_TYP,t.CONTR_NUM as CONTR_NUM, '-' as PORTOF_DISCHARGE ,'-' " +
				"as TX_TYP, 1 as CNT,0 as WEIGHT ,t.CUR as CUR,t.PREPY_MONEY_AMT as AMT from xywz_sale_frgn_ordr_contr t  where " +
				"t.CONTR_NUM not in(select CONTR_NUM from  xywz_acct_stmt_mgmt) and t.PREPY_MONEY_AMT>0 " );

		this.json= this.xywzAcctStmtMgmtService.findXywzAcctStmtMgmtSumInfo(sb.toString());
		
		return "success";
	}
	
	
}
