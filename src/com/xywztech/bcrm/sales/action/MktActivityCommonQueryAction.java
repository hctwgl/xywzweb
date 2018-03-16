package com.xywztech.bcrm.sales.action;

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
 * @描述：营销活动放大镜查询Action
 * @author wzy
 * @date:2013-03-04
 */
@ParentPackage("json-default")
@Action(value = "/mktActivityCommonQueryAction", results = { @Result(name = "success", type = "json"), })
public class MktActivityCommonQueryAction extends CommonAction {

	private static final long serialVersionUID = 1L;

	@Autowired
	@Qualifier("dsOracle")
	private DataSource dsOracle;

	// 覆盖父类的prepare方法：构造查询列表数据的方法逻辑
	@Override
	public void prepare() {
		ActionContext ctx = null;
		StringBuilder sb = null;
		try {
			ctx = ActionContext.getContext();
			request = (HttpServletRequest) ctx
					.get(StrutsStatics.HTTP_REQUEST);
			sb = new StringBuilder("");

			sb.append("select t.mkt_acti_id,");
			sb.append("       t.plan_name,");
			sb.append("       t.mkt_acti_type,");
			sb.append("       t.acti_plan_start_date,");
			sb.append("       t.acti_plan_end_date,");
			sb.append("       t.acti_start_date,");
			sb.append("       t.acti_end_date");
			sb.append("  from ocrm_f_mm_mkt_activity t");
			sb.append(" where t.acti_status = '3'");// 营销活动状态是“执行中-3”

			// 构造SQL的查询条件(从前台页面传入的查询条件参数)
			for (String key : this.getJson().keySet()) {
				if (null != this.getJson().get(key)
						&& !this.getJson().get(key).equals("")) {
					if (key.equals("MKT_ACTI_TYPE")) {// 营销活动类型
						sb.append(" and t.mkt_acti_type ='"
								+ this.getJson().get(key) + "'");
					} else if (key.equals("PLAN_NAME")) {// 营销活动名称
						sb.append(" and t.plan_name like'%"
								+ this.getJson().get(key) + "%'");
					}
				}
			}

			// 数据字典设置
			addOracleLookup("MKT_ACTI_TYPE", "ACTI_TYPE");// 营销活动类型

			// 设置排序
			setPrimaryKey("t.plan_name asc");

			// 给SQL对象赋值(完整的查询SQL)
			SQL = sb.toString();

			// 数据源
			datasource = dsOracle;
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}