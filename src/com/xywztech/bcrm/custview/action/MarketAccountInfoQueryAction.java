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
 * 营销账户汇总信息查询
 * @author songxs
 * @since 2012-12-18
 */
@SuppressWarnings("serial")
@ParentPackage("json-default")
@Action(value = "/marketAccountInfoQuery-Action", results = { @Result(name = "success", type = "json")})
public class MarketAccountInfoQueryAction extends CommonAction {
	
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
		String custId =request.getParameter("custid");
		StringBuilder sb = new StringBuilder(
				
				"select c.cust_id,c.STAT_DATE,sum(c.amount) as loan_amount," +
				"sum(c.YEAR_AVG_AMOUNT) as year_loan_amount, sum(t1.amount) as save_amount," +
				" sum(t1.YEAR_AVG_AMOUNT) as year_save_amount, trunc(sum(t1.YEAR_AVG_AMOUNT)/sum(c.YEAR_AVG_AMOUNT),2)*100 as avg_rate " +
				"from ACRM_F_CI_LOAN_ACT c " +
				"left join OCRM_F_CI_LOAN_SAVE t on t.loan_acc = c.account " +
				"left join ACRM_F_CI_DEPOSIT_ACT t1 on t1.account = t.save_acc " +
				" group by c.cust_id,c.STAT_DATE " +
				" having c.cust_id = '"+custId+"'");
  
		SQL=sb.toString();
		datasource = ds;
	}
}
