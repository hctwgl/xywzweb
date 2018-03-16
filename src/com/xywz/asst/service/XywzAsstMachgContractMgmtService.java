package com.xywz.asst.service;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xywz.asst.model.XywzAsstMachgContractMgmt;
import com.xywz.asst.model.XywzAsstMachgProduct;
import com.xywz.pub.tool.Xywz_NumberToCN;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.crm.exception.BizException;


/**
 * 外协加工合同信息Service
 * @author 
 * @since 
 */
@Service
public class XywzAsstMachgContractMgmtService extends CommonService {
   
	public XywzAsstMachgContractMgmtService(){
		JPABaseDAO<XywzAsstMachgContractMgmt, Long>  baseDAO = new JPABaseDAO<XywzAsstMachgContractMgmt, Long>(XywzAsstMachgContractMgmt.class);  
		super.setBaseDAO(baseDAO);
	}

	public List<XywzAsstMachgContractMgmt> findAllXywzAsstMachgContractMgmtInfo(Long invId){
		List<XywzAsstMachgContractMgmt> asstMachgContractMgmt = new ArrayList<XywzAsstMachgContractMgmt>();
		XywzAsstMachgContractMgmt xywzAsstMachgContractMgmt = new XywzAsstMachgContractMgmt();
		asstMachgContractMgmt.add(xywzAsstMachgContractMgmt);
		asstMachgContractMgmt.add(xywzAsstMachgContractMgmt);
		return asstMachgContractMgmt;
	}
	
	@SuppressWarnings("unchecked")
	public Map findXywzAsstMachgContractMgmtInfo(String sql,String sheetID) {
		StringBuffer sb = new StringBuffer();
		Map map = new HashMap();
		List<Object[]> list = this.baseDAO.findByNativeSQLWithIndexParam(sql);
		if(list==null||!(list.size()>0)){
			 throw new BizException(1, 0, "0001", "未查询到外协加工合同信息！");
		}
		if (list != null && list.size() > 0) {
			Object[] o = list.get(0);
			

			for (int i = 0; i < o.length; i++) {
				if (o[i] == null) {
					o[i] = "";
				}
			}
			map.put("MACHG_ORDR_NM", o[0]);
			map.put("MACHG_CONTR_NUM", o[1]);
			map.put("CONTR_DT", o[2].toString());
			map.put("MEMO1", o[3]);
			map.put("QLTY_REQST", o[4]);
			map.put("MEMO2", o[5]);
			map.put("MEMO3", o[6]);
			map.put("MEMO4", o[7]);
			map.put("PKG_REQST", o[8]);
			map.put("STL_MODE_AND_TERM", o[9]);
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
			map.put("SIGN_SITE", o[17]);
		}
		
		String searchJQL = "select a from XywzAsstMachgProduct a where a.machgContrNum='"+sheetID+"'";
		Map<String,Object> values = new HashMap<String,Object>();

		List<XywzAsstMachgProduct> invList = baseDAO.findWithNameParm(searchJQL, values);
		
		map.put("asstMachgProduct", invList);
		return map;
	}

}


