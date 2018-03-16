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
 * 客户模拟利润明细查询
 * @author weijl
 * @since 2012-09-23
 */
@Action("/ContributionProfitDetailQuery")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "ContributionProfitDetailQuery"})
})
public class ContributionProfitDetailQueryAction extends BaseQueryAction {

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; //声明数据源

	/**
	 * 设置查询SQL并为父类属性赋值
	 */
	@Override
	public void prepare() {
		
		String sortStr = "PD.CUST_ID DESC"; //设置默认排序
		
		StringBuilder queryStr = new StringBuilder("SELECT PD.CUST_ID,"+
				" PD.CUST_NAME, "+
				" PD.NBAIL_DE_AVG,"+ 
				" PD.NBAIL_DE_PROFIT,"+ 
				" PD.BAIL_DE_AVG,"+ 
				" PD.BAIL_DE_PROFIT,"+ 
				" PD.INTERBANK_DE_AVG,"+ 
				" PD.INTERBANK_DE_PROFIT,"+ 
				" PD.COM_LOAN_AVG,"+ 
				" PD.COM_LOAN_PROFIT,"+ 
				" PD.DISCOUNT_AVG,"+ 
				" PD.DISCOUNT_PROFIT,"+ 
				" PD.MIDBU_TOTAL_INCOME,"+ 
				" PD.MIDBU_PROFIT,"+ 
				" PD.ETL_DATE, "+
				" PD.TOTAL_PROFIT, "+
				" SU.UNITNAME, "+
				" SUB.UNITNAME AS BANK, "+
				" CMI.CUST_MANAGER_NAME "+
				" FROM ACRM_F_CI_PROFIT_DETAIL PD "+
				" LEFT JOIN OCRM_F_CM_CUST_MGR_INFO CMI"+
				" ON PD.CUST_MGR_ID = CMI.CUST_MANAGER_ID "+
				" LEFT JOIN SYS_UNITS SU"+
				" ON PD.ORG_ID = SU.UNITID "+
				" LEFT JOIN SYS_UNITS SUB"+
				" ON PD.BANCH_ID = SUB.UNITID "+
				" WHERE 1>0 ");

		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("paramLeveld"))
					queryStr.append(" AND PD.PARAM_LEVEL = '" + this.getJson().get(key)
							+ "'");
				if (key.equals("custNamed"))
					queryStr.append(" AND PD.CUST_NAME LIKE '%" + this.getJson().get(key)
							+ "%'");
				if (key.equals("marketStuffd"))
					queryStr.append(" AND CMI.CUST_MANAGER_NAME LIKE '%" + this.getJson().get(key)
							+ "%'");
				if (key.equals("sumDated"))
//					queryStr.append(" AND PD.ETL_DATE = '" + this.getJson().get(key)
//							+ "'");
					queryStr.append(" AND PD.ETL_DATE = to_date('" + this.getJson().get(key)
							+ "','yyyy-MM-dd')");
				if (key.equals("frequencyd"))
					queryStr.append(" AND PD.FREQUENCY = '" + this.getJson().get(key)
						+ "'");
				if (key.equals("unitsd")){
					String nodes = this.getJson().get(key).toString();
					String newNodes = nodes.replace(",", "','");
					queryStr.append(" AND PD.ORG_ID IN  (" + newNodes
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
