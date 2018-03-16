package com.xywz.purc.service;


import org.springframework.stereotype.Service;

import com.xywz.purc.model.XywzPurcProvrMgmtBank;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 供应商银行信息管理Service
 * @author 
 * @since 
 */
@Service
public class XywzPurcProvrMgmtBankService extends CommonService {
   
	public XywzPurcProvrMgmtBankService(){
		JPABaseDAO<XywzPurcProvrMgmtBank, Long>  baseDAO = new JPABaseDAO<XywzPurcProvrMgmtBank, Long>();  
		super.setBaseDAO(baseDAO);
	}


}


