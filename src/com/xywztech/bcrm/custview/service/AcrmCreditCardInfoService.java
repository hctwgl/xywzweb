package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmCreditCardInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AcrmCreditCardInfoService extends CommonService {
	
	public AcrmCreditCardInfoService(){
		JPABaseDAO<AcrmCreditCardInfo,Long> baseDao = new JPABaseDAO<AcrmCreditCardInfo,Long>(AcrmCreditCardInfo.class);
		super.setBaseDAO(baseDao);
	}
}
