package com.xywz.logi.service;


import org.springframework.stereotype.Service;

import com.xywz.logi.model.XywzLogiCstmDeclMerchd;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 银行管理Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzLogiCstmDeclMerchdService extends CommonService {
   
	public XywzLogiCstmDeclMerchdService(){
		JPABaseDAO<XywzLogiCstmDeclMerchd, Long>  baseDAO = new JPABaseDAO<XywzLogiCstmDeclMerchd, Long>();  
		super.setBaseDAO(baseDAO);
	}


}


