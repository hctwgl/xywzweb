package com.xywz.cust.service;


import org.springframework.stereotype.Service;

import com.xywz.asst.model.XywzAsstMachgContcrMgmt;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 银行管理Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzCustCustBankService extends CommonService {
   
	public XywzCustCustBankService(){
		JPABaseDAO<XywzAsstMachgContcrMgmt, Long>  baseDAO = new JPABaseDAO<XywzAsstMachgContcrMgmt, Long>();  
		super.setBaseDAO(baseDAO);
	}


}


