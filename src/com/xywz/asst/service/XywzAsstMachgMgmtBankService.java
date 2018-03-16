package com.xywz.asst.service;


import org.springframework.stereotype.Service;

import com.xywz.asst.model.XywzAsstMachgMgmtBank;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 外协加工银行管理Service
 * @author 
 * @since 
 */
@Service
public class XywzAsstMachgMgmtBankService extends CommonService {
   
	public XywzAsstMachgMgmtBankService(){
		JPABaseDAO<XywzAsstMachgMgmtBank, Long>  baseDAO = new JPABaseDAO<XywzAsstMachgMgmtBank, Long>(XywzAsstMachgMgmtBank.class);  
		super.setBaseDAO(baseDAO);
	}


}


