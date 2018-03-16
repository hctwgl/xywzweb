package com.xywz.logi.service;


import org.springframework.stereotype.Service;

import com.xywz.logi.model.XywzLogiCfmSngl;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 银行管理Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzLogiCfmSnglService extends CommonService {
   
	public XywzLogiCfmSnglService(){
		JPABaseDAO<XywzLogiCfmSngl, Long>  baseDAO = new JPABaseDAO<XywzLogiCfmSngl, Long>();  
		super.setBaseDAO(baseDAO);
	}
}


