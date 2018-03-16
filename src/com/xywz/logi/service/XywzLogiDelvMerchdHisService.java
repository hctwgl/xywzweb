package com.xywz.logi.service;


import org.springframework.stereotype.Service;

import com.xywz.logi.model.XywzLogiDelvMerchdHis;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 银行管理Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzLogiDelvMerchdHisService extends CommonService {
   
	public XywzLogiDelvMerchdHisService(){
		JPABaseDAO<XywzLogiDelvMerchdHis, Long>  baseDAO = new JPABaseDAO<XywzLogiDelvMerchdHis, Long>();  
		super.setBaseDAO(baseDAO);
	}


}


