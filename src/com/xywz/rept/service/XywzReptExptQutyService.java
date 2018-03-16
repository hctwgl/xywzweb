package com.xywz.rept.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xywz.acct.model.XywzAcctStmtMgmt;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.crm.exception.BizException;


/**
 * 账务对账单管理Service
 * @author 
 * @since 
 */
@Service
public class XywzReptExptQutyService extends CommonService {
   
	public XywzReptExptQutyService(){
		JPABaseDAO<XywzAcctStmtMgmt, Long>  baseDAO = new JPABaseDAO<XywzAcctStmtMgmt, Long>(XywzAcctStmtMgmt.class);  
		super.setBaseDAO(baseDAO);
	}
	
	@SuppressWarnings("unchecked")
	public Map findXywzAcctStmtMgmtSumInfo(String sql) {
		Map map = new HashMap();
		List<Object[]> list = this.baseDAO.findByNativeSQLWithIndexParam(sql);
		if(list==null||!(list.size()>0)){
			 throw new BizException(1, 0, "0001", "未查询到数据信息！");
		}
		map.put("acctStmtMgmtSum", list);
		return map;
	}


}


