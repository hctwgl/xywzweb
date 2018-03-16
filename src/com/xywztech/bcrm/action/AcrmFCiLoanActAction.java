package com.xywztech.bcrm.action;

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
@Action(value="/acrmFCiLoanAct-info", results={
    @Result(name="success", type="json")
})
public class AcrmFCiLoanActAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle") 
	private DataSource ds;
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String a =  request.getParameter("omain_type");
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	StringBuilder sb=new StringBuilder("select distinct c.*,(select sum(t2.year_avg_amount)" +
    			" from ACRM_F_CI_DEPOSIT_ACT t2  " +
    			"where t2.account in(select t3.save_acc " +
    			" from ACRM_F_CI_LOAN_ACT t1 " +
    			" left join OCRM_F_CI_LOAN_SAVE t3 on t3.loan_acc = " +
    			" t1.account where t1.account = c.account)) as year_save_amount," +
    			"(select trunc(sum(t2.year_avg_amount)/c.year_avg_amount,2) * 100  " +
    			"from ACRM_F_CI_DEPOSIT_ACT t2  where t2.account in " +
    			"(select t3.save_acc from ACRM_F_CI_LOAN_ACT t1 " +
    			" left join OCRM_F_CI_LOAN_SAVE t3 on t3.loan_acc = t1.account " +
    			"where t1.account = c.account)) as avg_rate " +
    			"from ACRM_F_CI_LOAN_ACT c left join OCRM_F_CI_ACC_BELONG t on c.account = t.account  where 1=1 ");
    	//增加客户关联条件
    	if(!("").equals(request.getParameter("cust_id"))){
				sb.append(" and c.cust_id = '" + request.getParameter("cust_id")+"'");
		}else if (!("").equals(request.getParameter("base_id"))){
				sb.append(" and c.cust_id in ( select ta.cust_id " +
						"from OCRM_F_CI_RELATE_CUST_BASE ta where cust_base_id=" + request.getParameter("base_id")+")");
		}
    	//数据权限过滤
    	if( a !=null && a.equals("1") ){
    		//主办客户经理查看所有
    		//sb.append(" and c.cust_id = '"+request.getParameter("cust_id")+"'"  );
    	}else {
    		//协办客户经理查看分配给自己的
    		if(auth.getAuthorities().size()==1 && auth.getAuthorities().get(0).toString().equals("47")){
    			sb.append(" and t.MGR_ID = '"+auth.getUserId()+"'"  );
    		}else{
    			//查看辖内账户
    			setBranchFileldName("c.WEB_POSIT_NO");
    		}
    	}
		setPrimaryKey("c.account");
		SQL=sb.toString();
	    datasource = ds;
    }
	
}
