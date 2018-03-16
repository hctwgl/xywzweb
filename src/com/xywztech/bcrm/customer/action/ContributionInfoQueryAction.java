package com.xywztech.bcrm.customer.action;

import java.util.Map;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;

/**
 * 客户模拟利润汇总查询
 * @author weijl
 * @since 2012-09-23
 */
@Action("/ContributionInfoQuery")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "ContributionInfoQuery"})
})
public class ContributionInfoQueryAction extends BaseQueryAction {

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; //声明数据源

	/**
	 * 设置查询SQL并为父类相关属性赋值
	 */
	@Override
	public void prepare() {

		String sortStr = "PI.CUST_ID DESC"; //设置默认排序
		
		StringBuilder queryStr = new StringBuilder("SELECT PI.CUST_ID,"+
				" PI.CUST_NAME, "+
				" PI.QUARTER1_PROFIT,"+
				" PI.QUARTER2_PROFIT,"+
				" PI.QUARTER3_PROFIT,"+
				" PI.QUARTER4_PROFIT,"+
				" PI.TOTAL_PROFIT, "+
				" PI.ETL_DATE, "+
				" SU.UNITNAME, "+
				" SUB.UNITNAME AS BANK, "+
				" CMI.USER_NAME AS CUST_MANAGER_NAME "+
				" FROM ACRM_F_CI_PROFIT_INFO PI "+
				" LEFT JOIN ADMIN_AUTH_ACCOUNT CMI"+
				" ON PI.CUST_MGR_ID = CMI.ACCOUNT_NAME "+
				" LEFT JOIN SYS_UNITS SU"+
				" ON PI.ORG_ID = SU.UNITID "+
				" LEFT JOIN SYS_UNITS SUB"+
				" ON PI.BANCH_ID = SUB.UNITID "+
				" WHERE 1>0 ");

		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("paramLevel"))
					queryStr.append(" AND PI.PARAM_LEVEL = '" + this.getJson().get(key)
							+ "'");
				if (key.equals("custName"))
					queryStr.append(" AND PI.CUST_NAME LIKE '%" + this.getJson().get(key)
							+ "%'");
				if (key.equals("custMgrName"))
					queryStr.append(" AND CMI.CUST_MANAGER_NAME LIKE '%" + this.getJson().get(key)
							+ "%'");
				if (key.equals("sumDate"))
//					queryStr.append(" AND PI.ETL_DATE = '" + this.getJson().get(key)
//							+ "'");
					queryStr.append(" AND PI.ETL_DATE = to_date('" + this.getJson().get(key)
							+ "','yyyy-MM-dd')");
				
//				sb.append(" and t.SEND_TIME >= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");//for db2 9.7
				if (key.equals("checkedNodes")){
					String nodes = this.getJson().get(key).toString();
					String newNodes = nodes.replace(",", "','");
					queryStr.append(" AND PI.ORG_ID IN  (" + newNodes
							+ ")");
				}
			}
		}
		
		SQL = queryStr.toString();
		setPrimaryKey(sortStr);
		datasource = ds;
	}

	/**
	 * 获取JSON数据
	 */
	@Override
	public Map<String, Object> getJson() {
		return super.getJson();
	}
}
