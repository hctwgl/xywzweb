package com.xywz.logi.service;


import org.springframework.stereotype.Service;
import com.xywz.logi.model.XywzLogiBookShipMgmt;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 银行管理Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzLogiBookShipMgmtService extends CommonService {
   
	public XywzLogiBookShipMgmtService(){
		JPABaseDAO<XywzLogiBookShipMgmt, Long>  baseDAO = new JPABaseDAO<XywzLogiBookShipMgmt, Long>();  
		super.setBaseDAO(baseDAO);
	}


}


