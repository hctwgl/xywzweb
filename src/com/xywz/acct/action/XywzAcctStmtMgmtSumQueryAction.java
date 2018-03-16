package com.xywz.acct.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;


@ParentPackage("json-default")
@Action(value="/XywzAcctStmtMgmtSumQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzAcctStmtMgmtSumQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select '-'as STATS_TYP, '-' as CONTR_NUM ,'-' as PORTOF_DISCHARGE ,'-' as TX_TYP,0 as CNT,0 as WEIGHT ,'-' as CUR,0 as AMT " +
    			"from xywz_acct_stmt_mgmt t where 1<>1  ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("statsTyp")){
                	String statsTyp=this.getJson().get(key).toString();
                	switch (statsTyp.charAt(0)){
                	case '1':
                		sb.append(" union select '1'as STATS_TYP, '-' as CONTR_NUM ,t2.BELONG_COUNTRY as PORTOF_DISCHARGE ,'-' as TX_TYP," +
                    			"count(t.ID) as CNT,sum(t.WEIGHT) as WEIGHT ,'-' as CUR,sum(t.AMT) as AMT from xywz_acct_stmt_mgmt t " +
                    			"left join xywz_sale_frgn_ordr_contr t1 on t.CONTR_NUM=t1.CONTR_NUM left join xywz_logi_port_info_mgmt t2 on t1.PORTOF_DISCHARGE=t2.PORT_ID " +
                    			"where t.RECV_LOAD_BILL='0' group by t2.BELONG_COUNTRY ");
                		break;
                	case '2':
                		sb.append(" union select '2'as STATS_TYP, '-' as CONTR_NUM, '-' as PORTOF_DISCHARGE ,t.TX_TYP as TX_TYP,count(t.ID)" +
                				" as CNT,sum(t.WEIGHT) as WEIGHT ,'-' as CUR,sum(t.AMT) as AMT from xywz_acct_stmt_mgmt t  where t.RECV_LOAD_BILL='1' " +
                				"and t.LOAN='0' and t.REFUND='0' group by t.TX_TYP ");	
                		break;
                	case '3':
                		sb.append(" union select '3'as STATS_TYP,t1.CONTR_NUM as CONTR_NUM, '-' as PORTOF_DISCHARGE ,t.TX_TYP as TX_TYP, 1 as CNT,t.WEIGHT as WEIGHT ," +
                				"'-' as CUR,t.AMT as AMT from xywz_acct_stmt_mgmt t left join xywz_sale_frgn_ordr_contr t1 on t.CONTR_NUM=t1.CONTR_NUM " +
                				" where t.RECV_LOAD_BILL='1' and t.LOAN='1' and t.REFUND='0' ");	
                		break;
                	case '4':
                		sb.append(" union select '4'as STATS_TYP,t1.CONTR_NUM as CONTR_NUM, '-' as PORTOF_DISCHARGE ,t.TX_TYP as TX_TYP, 1 as CNT,t.WEIGHT as WEIGHT ," +
                				"'-' as CUR,t.AMT as AMT from xywz_acct_stmt_mgmt t left join xywz_sale_frgn_ordr_contr t1 on t.CONTR_NUM=t1.CONTR_NUM  " +
                				"where t.RECV_LOAD_BILL='1' and t.LOAN='1' and t.REFUND='1' ");	
                		break;
                	case '5':
                		sb.append(" union select '5'as STATS_TYP,t.CONTR_NUM as CONTR_NUM, '-' as PORTOF_DISCHARGE ,'-' as TX_TYP, 1 as CNT,0 as WEIGHT ," +
                				"t.CUR as CUR,t.PREPY_MONEY_AMT as AMT from xywz_sale_frgn_ordr_contr t  where t.CONTR_NUM not in(select CONTR_NUM from  " +
                				"xywz_acct_stmt_mgmt) and t.PREPY_MONEY_AMT>0  ");	
                		break;
                	}
                }
            }
            else
            {
        		sb.append(" union select '1'as STATS_TYP, '-' as CONTR_NUM ,t2.BELONG_COUNTRY as PORTOF_DISCHARGE ,'-' as TX_TYP," +
            			"count(t.ID) as CNT,sum(t.WEIGHT) as WEIGHT ,'-' as CUR,sum(t.AMT) as AMT from xywz_acct_stmt_mgmt t " +
            			"left join xywz_sale_frgn_ordr_contr t1 on t.CONTR_NUM=t1.CONTR_NUM left join xywz_logi_port_info_mgmt t2 on t1.PORTOF_DISCHARGE=t2.PORT_ID " +
            			"where t.RECV_LOAD_BILL='0' group by t2.BELONG_COUNTRY "+" union select '2'as STATS_TYP, '-' as CONTR_NUM, '-' as PORTOF_DISCHARGE ,t.TX_TYP as TX_TYP,count(t.ID)" +
        				" as CNT,sum(t.WEIGHT) as WEIGHT ,'-' as CUR,sum(t.AMT) as AMT from xywz_acct_stmt_mgmt t  where t.RECV_LOAD_BILL='1' " +
        				"and t.LOAN='0' and t.REFUND='0' group by t.TX_TYP "+" union select '3'as STATS_TYP,t1.CONTR_NUM as CONTR_NUM, '-' as PORTOF_DISCHARGE ,t.TX_TYP as TX_TYP, 1 as CNT,t.WEIGHT as WEIGHT ," +
        				"'-' as CUR,t.AMT as AMT from xywz_acct_stmt_mgmt t left join xywz_sale_frgn_ordr_contr t1 on t.CONTR_NUM=t1.CONTR_NUM " +
        				" where t.RECV_LOAD_BILL='1' and t.LOAN='1' and t.REFUND='0' "+" union select '4'as STATS_TYP,t1.CONTR_NUM as CONTR_NUM, '-' as PORTOF_DISCHARGE ,t.TX_TYP as TX_TYP, 1 as CNT,t.WEIGHT as WEIGHT ," +
        				"'-' as CUR,t.AMT as AMT from xywz_acct_stmt_mgmt t left join xywz_sale_frgn_ordr_contr t1 on t.CONTR_NUM=t1.CONTR_NUM  " +
        				"where t.RECV_LOAD_BILL='1' and t.LOAN='1' and t.REFUND='1' "+" union select '5'as STATS_TYP,t.CONTR_NUM as CONTR_NUM, '-' as PORTOF_DISCHARGE ,'-' as TX_TYP, 1 as CNT,0 as WEIGHT ," +
        				"t.CUR as CUR,t.PREPY_MONEY_AMT as AMT from xywz_sale_frgn_ordr_contr t  where t.CONTR_NUM not in(select CONTR_NUM from  " +
        				"xywz_acct_stmt_mgmt) and t.PREPY_MONEY_AMT>0  ");	
            }
        }

//    	setPrimaryKey(" t.ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("STATS_TYP", "XYWZ_STATS_TYP");
    	addOracleLookup("TX_TYP", "XYWZ_TX_TYP");
    	datasource = ds;
    }
}
