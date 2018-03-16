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
@Action(value = "/saveAccountInfoQuery-Action", results = { @Result(name = "success", type = "json")})
public class SaveAccountInfoQueryAction extends CommonAction {
	
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
		String acc =request.getParameter("acc");
		StringBuilder sb = new StringBuilder("select c.account,c.acct_name,c.year_avg_amount,c.curre_firm_interest," +
				"c.caculate_date,t.rel_rate,t.id,t.stat_date,t.end_date,c.amount,t.loan_acc" +
				" from ACRM_F_CI_DEPOSIT_ACT c left join OCRM_F_CI_LOAN_SAVE t on t.save_acc = c.account " +
				"left join ACRM_F_CI_LOAN_ACT t1 on t1.account = t.loan_acc where t1.account = '"+acc+"'"
				);
  
		SQL=sb.toString();
		datasource = ds;
	}
}
