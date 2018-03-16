package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiDepandloan;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 
 * @author huwei
 * 存贷比信息
 *
 */
@Service
public class AcrmFCiDepandloanService extends CommonService{

	public AcrmFCiDepandloanService(){
		JPABaseDAO<AcrmFCiDepandloan,Long> baseDao = new JPABaseDAO<AcrmFCiDepandloan,Long>(AcrmFCiDepandloan.class);
		super.setBaseDAO(baseDao);
	}
	
}
