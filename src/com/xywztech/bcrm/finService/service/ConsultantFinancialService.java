package com.xywztech.bcrm.finService.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.finService.model.OcrmFFmProdConf;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.crm.exception.BizException;

@Service
@SuppressWarnings("unchecked")
@Transactional(value = "postgreTransactionManager")
public class ConsultantFinancialService {
	private JPABaseDAO baseDAO;

	public JPABaseDAO getBaseDAO() {
		return baseDAO;
	}

	@Autowired
	public void setBaseDAO(JPABaseDAO baseDAO) {
		this.baseDAO = baseDAO;
	}

	public Map findTargetProd(String sql) {
		Map json = new HashMap();
		List dataList = new ArrayList();
		List<Object[]> list = baseDAO.findByNativeSQLWithIndexParam(sql);

		for (Object[] o : list) {
			Map map = new HashMap();
			map.put("productId", o[0]);
			map.put("prodBusId", o[1]);
			map.put("prodName", o[2]);

			if (o[3] != null && !o[3].equals(""))
				map.put("riskLevel", o[3]);
			else
				map.put("riskLevel", "5");
			map.put("prodScale", o[4]);

			dataList.add(map);
		}
		json.put("data", dataList);
		return json;
	}

	public Map findProd(String sql) {
		Map json = new HashMap();
		List dataList = new ArrayList();
		List<Object[]> list = baseDAO.findByNativeSQLWithIndexParam(sql);

		for (Object[] o : list) {
			Map map = new HashMap();
			map.put("PRODUCT_ID", o[0]);
			map.put("PROD_BUS_ID", o[1]);
			map.put("PROD_NAME", o[2]);
			if (o[3] != null && !o[3].equals(""))
				map.put("RISK_LEVEL", o[3]);
			else
				map.put("RISK_LEVEL", "5");
			map.put("prodScale", 0);
			map.put("CATL_NAME", o[4]);
			dataList.add(map);

		}
		json.put("data", dataList);
		return json;
	}

	public Map findTarget(String sql) {
		Map json = new HashMap();
		List dataList = new ArrayList();
		List<Object[]> list = baseDAO.findByNativeSQLWithIndexParam(sql);
		for (Object[] o : list) {
			Map map = new HashMap();
			map.put("DEMAND_TYPE", o[0]);
			map.put("TARGET_ID", o[1]);
			map.put("TARGET_NAME", o[2]);
			map.put("TARGET_SCALE", o[3]);
			map.put("TAEGET_DESC", o[4]);

			dataList.add(map);

		}
		json.put("data", dataList);
		return json;
	}

	public Map findDemand(String sql) {
		StringBuffer sb = new StringBuffer();
		Map map = new HashMap();
		List<Object[]> list = this.baseDAO.findByNativeSQLWithIndexParam(sql);
		if(list==null||!(list.size()>0)){
			 throw new BizException(1, 0, "0001", "该客户还未做理财规划！");
		}
		if (list != null && list.size() > 0) {
			Object[] o = list.get(0);

			for (int i = 0; i < o.length; i++) {
				if (o[i] == null) {
					o[i] = "";
				}
			}
			map.put("DEMAND_ID", o[0]);
			map.put("EXTRA_PERFORMACE", o[1]);
			map.put("INVESTMENT", o[2]);
			map.put("PENSION", o[3]);
			map.put("RESERVE", o[4]);
			map.put("LIQUIDITY", o[5]);
			map.put("PROTECTION", o[6]);
			map.put("PLAN_RISK_LEV", o[7]);

		}
		return map;
	}

	public Object save(Object obj) {
		Object o = this.baseDAO.save(obj);
		baseDAO.flush();
		return o;
	}

	public void deleteOrUpdate(String sql, Map paramMap) {
		try {
			baseDAO.batchExecuteWithNameParam(sql, paramMap);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		baseDAO.flush();
	}

	public void saveProd(List<String> prodInfo) {
		boolean flag = true;
		BigDecimal targetId = BigDecimal.valueOf(0);
		BigDecimal scale = BigDecimal.valueOf(0);
		for (String s : prodInfo) {

			String[] ss = s.split(":");
			OcrmFFmProdConf o = new OcrmFFmProdConf();
			o.setTargetId(BigDecimal.valueOf(Long.parseLong(ss[0])));
			o.setProdId(BigDecimal.valueOf(Long.parseLong(ss[1])));
			if (ss[2] != null && !ss[2].equals("undefined")
					&& !ss[2].equals("null")) {
				o.setConfScale(BigDecimal.valueOf(Double.parseDouble((ss[2]))));
				scale = BigDecimal.valueOf(Double.parseDouble(scale.toString())
						+ Double.parseDouble(o.getConfScale().toString()));
			}
			if (flag) {
				String sql = "delete from OcrmFFmProdConf o where o.targetId=:targetId";
				Map paramMap = new HashMap();
				paramMap.put("targetId", o.getTargetId());
				baseDAO.batchExecuteWithNameParam(sql, paramMap);
				targetId = o.getTargetId();

				flag = false;
			}
			this.baseDAO.save(o);
		}
		Map map = new HashMap();
		StringBuffer sb = new StringBuffer();
		sb.append("update OcrmFFmFinTarget o ");
		sb.append(" set o.targetScale=:targetScale");
		sb.append(" where o.targetId=:targetId");
		map.put("targetId", targetId);
		map.put("targetScale", scale);
		baseDAO.batchExecuteWithNameParam(sb.toString(), map);

		this.baseDAO.flush();
	}

	public String findDemandPlanRiskLev(String demandId) {
		StringBuffer sb = new StringBuffer();
		sb.append(" select O2.CONF_SCALE,O3.RISK_LEVEL");
		sb
				.append(" from OCRM_F_FM_FIN_TARGET O1, OCRM_F_FM_PROD_CONF O2,OCRM_F_PD_PROD_INFO O3");
		sb.append(" where O1.DEMAND_ID = " + demandId);
		sb.append(" and O1.TARGET_ID = O2.TARGET_ID");
		sb.append(" and O2.PROD_ID = O3.PRODUCT_ID");
		List<Object[]> list = this.baseDAO.findByNativeSQLWithIndexParam(sb
				.toString());
		Double sum1 = 0.00;
		Double sum2 = 0.00;
		for (Object[] o : list) {
			sum2 += Double.parseDouble(o[0].toString());
			if (o[1] == null || o[1].equals(""))
				o[1] = 5;
			sum1 += (Double.parseDouble(o[0].toString()) * Double
					.parseDouble(o[1].toString()));

		}
		Double result = sum1 / sum2;
		if (result <= 1) {
			return "1";
		} else if (result <= 2) {
			return "2";
		} else if (result <= 3) {
			return "3";
		} else if (result <= 4) {
			return "4";
		} else
			return "5";
	}
}
