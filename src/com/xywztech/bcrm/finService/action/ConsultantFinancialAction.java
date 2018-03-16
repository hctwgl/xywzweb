package com.xywztech.bcrm.finService.action;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.finService.model.OcrmFFmCustDemand;
import com.xywztech.bcrm.finService.model.OcrmFFmFinTarget;
import com.xywztech.bcrm.finService.service.ConsultantFinancialService;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;
import com.xywztech.crm.exception.BizException;

@SuppressWarnings("unchecked")
@ParentPackage("json-default")
@Action(value = "/ConsultantFinancial", results = { @Result(name = "success", type = "json") })
public class ConsultantFinancialAction extends BaseQueryAction {
	@Autowired
	private HttpServletRequest request;

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;

	@Autowired
	private ConsultantFinancialService consultantFinancialService;

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(ServletActionContext.HTTP_REQUEST);

		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();

		StringBuilder sb = new StringBuilder("");
		sb.append(" SELECT B2.* FROM OCRM_F_CI_BELONG_CUSTMGR B1,(");
		sb.append(" SELECT O1.CUST_ID,O1.CORE_ID SOURCE_CUST_ID,O1.CUST_ZH_NAME,O1.CUST_LEV,O2.CUST_RISK_CHARACT,O2.LIMIT_DATE,O3.ASSET_SUM,O4.OTHER_BANK");
		sb.append(" FROM OCRM_F_CI_CUST_DESC O1");
		sb.append(" LEFT OUTER JOIN OCRM_F_SE_CUST_RISK_INFO_LIST O2 ON O1.CUST_ID = O2.CUST_NO");
		sb.append(" AND O2.HIS_FLAG='1' ");
		sb.append(" AND O1.CUST_TYP='1' ");
		sb.append(" LEFT OUTER JOIN ACRM_F_AG_BUSINESS_SUM O3 ON O1.CUST_ID = O3.CUST_ID");
		sb.append(" AND O3.INST_CODE = '" + auth.getUnitId() + "'");
		sb.append(" LEFT OUTER JOIN (SELECT A1.CUST_ID, SUM(A1.AMOUNT_VALUE) OTHER_BANK");
		sb.append(" FROM OCRM_F_FM_FIN_INFO A1");
		// sb.append(" where BELONG_TYPE = '1'");
		sb.append(" WHERE ASSET_DEBT_TYPE = '1'");
		sb.append(" GROUP BY A1.CUST_ID) O4 ON O1.CUST_ID = O4.CUST_ID");
		sb.append(" WHERE 1=1");
		sb.append(" AND O1.CUST_ID=O2.CUST_NO");

		// setPrimaryKey("O.PARAM_ID");

		if (request.getParameter("start") != null)
			start = new Integer(request.getParameter("start")).intValue();
		if (request.getParameter("limit") != null)
			limit = new Integer(request.getParameter("limit")).intValue();

		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("SOURCE_CUST_ID")) {
					sb.append(" AND O1.CORE_ID LIKE '%"
							+ this.getJson().get(key) + "%'");
				} else if (key.equals("CUST_NAME")) {
					sb.append(" AND O1.CUST_ZH_NAME LIKE '%"
							+ this.getJson().get(key) + "%'");
				} else if (key.equals("CUST_RISK_CHARACT")) {
					sb.append(" AND O2.CUST_RISK_CHARACT = '"
							+ this.getJson().get(key) + "'");
				} else if (key.equals("IS_HAVE")) {
					if (this.getJson().get(key).equals("1")) {
						sb.append(" AND O1.CUST_ID IN ");
					} else if (this.getJson().get(key).equals("2")) {
						sb.append(" AND O1.CUST_ID NOT IN");
					}
					sb.append(" (SELECT CUST_ID FROM OCRM_F_FM_CUST_DEMAND)");
				}
			}
		}
		sb.append(" ) B2 WHERE B2.CUST_ID=B1.CUST_ID AND B1.MGR_ID='"
				+ auth.getUserId() + "' AND SYSDATE<B2.LIMIT_DATE");
		SQL = sb.toString();
		datasource = ds;

	}

	public String findProd() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		String dt = sdf.format(date);
		StringBuilder sb = new StringBuilder("");
		sb.append(" SELECT O.PRODUCT_ID, O.PROD_BUS_ID, O.PROD_NAME, O.RISK_LEVEL,P.CATL_NAME");
		sb.append(" FROM OCRM_F_PD_PROD_INFO O LEFT JOIN OCRM_F_PD_PROD_CATL P ON O.CATL_CODE= P.CATL_CODE");
		sb.append(" WHERE 1=1");
		/**-查询出仅启用的并且在 有效期内的 产品-start*/
		//1-启用，2-未启动，参考码值：ENABLE_STATE
		sb.append(" AND O.PROD_SWITCH ='1' ");
		sb.append(" AND  (( O.PROD_START_DATE <= TO_DATE('"+dt+"','YYYY-mm-dd')");
		sb.append(" AND O.PROD_END_DATE >= TO_DATE('"+dt+"','YYYY-mm-dd')) or ");
		sb.append("  O.DISPLAY_FLAG = '1') ");//新增产品条件2012-07-28
		sb.append(" AND O.RISK_LEVEL <>'0'");
		
		/**-查询出仅启用的并且在 有效期内的 产品-end*/

		if (request.getParameter("start") != null)
			start = new Integer(request.getParameter("start")).intValue();
		if (request.getParameter("limit") != null)
			limit = new Integer(request.getParameter("limit")).intValue();

		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("PROD_BUS_ID")) {
					sb.append(" AND O.PROD_BUS_ID LIKE '%"
							+ this.getJson().get(key) + "%'");
				} else if (key.equals("PROD_NAME")) {
					sb.append(" AND O.PROD_NAME LIKE '%"
							+ this.getJson().get(key) + "%'");
				} else if (key.equals("PROD_RISK")) {
					String prodRisk=(String)this.getJson().get(key);
					if(prodRisk.equals("5")){
						sb.append(" AND (O.RISK_LEVEL LIKE '%"+prodRisk+"%' OR O.RISK_LEVEL IS NULL)");
					}else
					sb.append(" AND O.RISK_LEVEL LIKE '%"
							+ prodRisk + "%'");
				}else if(key.equals("FIN_PROD")){ //理财产品大类
					sb.append(" AND P.CATL_BUS_ID='"+this.getJson().get(key).toString()+"'");
				}
			}
		}

		this.json = consultantFinancialService.findProd(sb.toString());
		return "success";
	}

	public String findTarget() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		String demandId = request.getParameter("DEMAND_ID");
		StringBuffer sb = new StringBuffer();
		sb.append(" SELECT O.DEMAND_TYPE,O.TARGET_ID, O.TARGET_NAME, O.TARGET_SCALE, O.TAEGET_DESC");
		sb.append(" FROM OCRM_F_FM_FIN_TARGET O");
		sb.append(" WHERE O.DEMAND_ID = " + demandId);

		this.json = this.consultantFinancialService.findTarget(sb.toString());

		return "success";
	}

	public String saveAll() throws Exception {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);

		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();

		String custId = request.getParameter("custId");
		String demandId = request.getParameter("demandId");
		String riskLev = request.getParameter("riskLev");
		String planRiskLev = this.consultantFinancialService
				.findDemandPlanRiskLev(demandId);
		if (Long.parseLong(planRiskLev) > Long.parseLong(riskLev)) {
			throw new BizException(1, 0, "0001", "请新增目标并配置产品组合！");
		}
		StringBuffer sb = new StringBuffer();
		sb.append(" update OcrmFFmCustDemand o");
		sb.append(" set o.available=:available,o.creatorId=:creatorId,o.createDt=:createDt");
		sb.append(" where o.custId=:custId");

		Map paramMap = new HashMap();
		paramMap.put("available", "2");
		paramMap.put("creatorId", auth.getUserId());
		paramMap.put("createDt", new Date());
		paramMap.put("custId", custId);
		this.consultantFinancialService.deleteOrUpdate(sb.toString(), paramMap);
		sb = new StringBuffer();
		sb.append(" update OcrmFFmCustDemand o");
		sb.append(" set o.available=:available,o.creatorId=:creatorId,o.createDt=:createDt,o.planRiskLev=:planRiskLev");
		sb.append(" where o.demandId=:demandId");
		paramMap.put("available", "1");
		paramMap.remove("custId");
		paramMap.put("planRiskLev", planRiskLev);
		paramMap.put("demandId", Long.parseLong(demandId));
		this.consultantFinancialService.deleteOrUpdate(sb.toString(), paramMap);

		return "success";
	}

	public String saveDemand(){
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);

		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();

		OcrmFFmCustDemand demand = new OcrmFFmCustDemand();
		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("custId")) {
					demand.setCustId(this.getJson().get(key).toString());
				} else if (key.equals("PROTECTION")) {
					demand.setProtection(this.getJson().get(key).toString());// 保护
				} else if (key.equals("RESERVE")) {
					demand.setReserve(this.getJson().get(key).toString());// 储备
				} else if (key.equals("LIQUIDITY")) {
					demand.setLiquidity(this.getJson().get(key).toString());// 流动资金
				} else if (key.equals("PENSION")) {
					demand.setPension(this.getJson().get(key).toString());// 退休
				} else if (key.equals("EXTRA_PERFORMACE")) {
					demand.setExtraPerformace(this.getJson().get(key)
							.toString());// 投机
				} else if (key.equals("INVESTMENT")) {
					demand.setInvestment(this.getJson().get(key).toString());// 投资
				}
			}
		}

		demand.setAvailable("2");
		demand.setCreateDt(new Date());
		demand.setCreatorId(auth.getUserId());
		demand = (OcrmFFmCustDemand) this.consultantFinancialService
				.save(demand);
		 this.json.clear();
		this.json.put("id", demand.getDemandId());
		// ServletActionContext.getResponse().getWriter().write(
		// "{id:" + demand.getDemandId() + "}");
		// throw new BizException(1, 2, "1000",
		// "Sorry,the user you input already exists, please enter again!");
		return "success";
	}

	public String deleteTarget() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		Map map = new HashMap();
		long id = Long.parseLong(request.getParameter("id"));
		map.put("targetId", id);

		StringBuffer sb = new StringBuffer();
		sb.append(" delete from OcrmFFmFinTarget o where o.targetId=:targetId");

		this.consultantFinancialService.deleteOrUpdate(sb.toString(), map);

		sb = new StringBuffer();
		sb.append("delete from OcrmFFmProdConf o where o.targetId=:targetId");
		this.consultantFinancialService.deleteOrUpdate(sb.toString(), map);
		return "success";
	}

	public String saveTarget() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);

		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();

		OcrmFFmFinTarget target = new OcrmFFmFinTarget();
		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("C_DEMAND_TYPE")) {
					target.setDemandType(this.getJson().get(key).toString());
				} else if (key.equals("C_TARGET_NAME")) {
					target.setTargetName(this.getJson().get(key).toString());
				} else if (key.equals("C_TARGET_DESC")) {
					target.setTaegetDesc(this.getJson().get(key).toString());
				} else if (key.equals("C_DEMOND_ID")) {
					target.setDemandId(BigDecimal.valueOf(Long.parseLong(this
							.getJson().get(key).toString())));
				}
			}
		}
		target.setCreateDate(new Date());
		target.setCreatorId(auth.getUserId());
		this.consultantFinancialService.save(target);

		return "success";
	}

	public String saveProd() {
		List list = (List) this.json.get("prodInfo");
		this.consultantFinancialService.saveProd(list);
		return "success";
	}

	public String findTargetProd() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		String targetId = request.getParameter("targetId");
		StringBuffer sb = new StringBuffer();
		sb.append(" select o2.PRODUCT_ID,o2.PROD_BUS_ID,o2.PROD_NAME,o2.RISK_LEVEL,o1.conf_scale");
		sb.append(" from ocrm_f_fm_prod_conf o1, OCRM_F_PD_PROD_INFO o2");
		sb.append(" where o1.prod_id=o2.PRODUCT_ID and o1.target_id = "
				+ targetId);

		this.json = this.consultantFinancialService.findTargetProd(sb
				.toString());
		return "success";
	}

	public String findDemand() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);

		String custId = request.getParameter("custId");
		StringBuffer sb = new StringBuffer();
		sb.append(" SELECT O.DEMAND_ID,O.EXTRA_PERFORMACE,O.INVESTMENT,O.PENSION,O.RESERVE,O.LIQUIDITY,O.PROTECTION,O.PLAN_RISK_LEV");
		sb.append(" FROM OCRM_F_FM_CUST_DEMAND O ");
		sb.append(" WHERE CUST_ID = '" + custId + "'");
		sb.append(" AND AVAILABLE='1'");
		this.json= this.consultantFinancialService.findDemand(sb.toString());

		

		return "success";
	}

	public void setProdInfo(List prodInfo) {
		this.json.put("prodInfo", prodInfo);
	}

}
