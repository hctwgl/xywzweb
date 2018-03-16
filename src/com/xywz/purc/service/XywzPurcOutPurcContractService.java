package com.xywz.purc.service;


import java.math.BigDecimal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Query;

import org.springframework.stereotype.Service;


import com.xywz.pub.tool.Xywz_NumberToCN;
import com.xywz.purc.model.XywzPurcOutPurcContract;
import com.xywz.purc.model.XywzPurcProvrMgmtProduct;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.crm.exception.BizException;


/**
 * 外部采购合同管理Service
 * @author 
 * @since  
 */
@Service
public class XywzPurcOutPurcContractService extends CommonService {
   
	public XywzPurcOutPurcContractService(){
		JPABaseDAO<XywzPurcOutPurcContract, Long>  baseDAO = new JPABaseDAO<XywzPurcOutPurcContract, Long>(XywzPurcOutPurcContract.class);  
		super.setBaseDAO(baseDAO);
	}

	public List<XywzPurcOutPurcContract> findAllXywzPurcOutPurcContractInfo(Long invId){
		List<XywzPurcOutPurcContract> outPurcContract = new ArrayList<XywzPurcOutPurcContract>();
		XywzPurcOutPurcContract xywzPurcOutPurcContract = new XywzPurcOutPurcContract();
		outPurcContract.add(xywzPurcOutPurcContract);
		outPurcContract.add(xywzPurcOutPurcContract);
		return outPurcContract;
	}
	
	@SuppressWarnings("unchecked")
	public void check(String puchSnglId) throws ParseException {
		String sql = "select c from XywzPurcProvrMgmtProduct c where  c.puchSnglId='" + puchSnglId + "'";
		Query q = em.createQuery(sql.toString());
		List<XywzPurcProvrMgmtProduct> list = q.getResultList();
		if (list.size() == 0) {
			return;
		} else {
			throw new BizException(1, 0, "0001", "该合同下有有效的商品信息，不能删除！");
		}
	}
	
	@SuppressWarnings("unchecked")
	public Map findPurcOutPurcContractInfo(String sql,String sheetID) {
		StringBuffer sb = new StringBuffer();
		Map map = new HashMap();
		List<Object[]> list = this.baseDAO.findByNativeSQLWithIndexParam(sql);
		if(list==null||!(list.size()>0)){
			 throw new BizException(1, 0, "0001", "未查询到外部采购合同信息！");
		}
		if (list != null && list.size() > 0) {
			Object[] o = list.get(0);
			

			for (int i = 0; i < o.length; i++) {
				if (o[i] == null) {
					o[i] = "";
				}
			}
			map.put("PROVR_FULL_NM", o[0]);
			map.put("PUCH_SNGL_ID", o[1]);
			map.put("CONTR_DT", o[2].toString());
			map.put("MEMO1", o[3]);
			map.put("DELY_ADDR", o[4]);
			map.put("MEMO2", o[5]);
			map.put("MEMO3", o[6]);
			map.put("MEMO4", o[7]);
			map.put("MEMO5", o[8]);
			map.put("MEMO6", o[9]);
			map.put("MEMO", o[10]);
			map.put("ADDR", o[11]);
			map.put("TEL",o[12]);
			map.put("FAX", o[13]);
			map.put("BANK_FULL_NM", o[14]);
			map.put("ACCT_NUM", o[15]);
			
			double money=Double.parseDouble(o[16].toString());
			BigDecimal numberOfMoney = new BigDecimal(money);
			String s = Xywz_NumberToCN.number2CNMontrayUnit(numberOfMoney);

			
			map.put("TOTAL_AMT", s);
		}
		
		String searchJQL = "select a from XywzPurcProvrMgmtProduct a where a.puchSnglId='"+sheetID+"'";
		Map<String,Object> values = new HashMap<String,Object>();

		List<XywzPurcProvrMgmtProduct> invList = baseDAO.findWithNameParm(searchJQL, values);
		
		map.put("provrMgmtProduct", invList);
		return map;
	}
}


