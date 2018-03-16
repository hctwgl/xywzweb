package com.xywz.logi.service;


import org.springframework.stereotype.Service;
import com.xywz.logi.model.XywzLogiShipCorpMgmt;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 银行管理Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzLogiShipCorpMgmtService extends CommonService {
   
	public XywzLogiShipCorpMgmtService(){
		JPABaseDAO<XywzLogiShipCorpMgmt, Long>  baseDAO = new JPABaseDAO<XywzLogiShipCorpMgmt, Long>();  
		super.setBaseDAO(baseDAO);
	}


}


