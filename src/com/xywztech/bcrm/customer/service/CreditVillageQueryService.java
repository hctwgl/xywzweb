package com.xywztech.bcrm.customer.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.AcrmFCiCreditVillage;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class CreditVillageQueryService extends CommonService {

	public CreditVillageQueryService(){
		JPABaseDAO<AcrmFCiCreditVillage,Long> baseDao=new JPABaseDAO<AcrmFCiCreditVillage, Long>(AcrmFCiCreditVillage.class);
		super.setBaseDAO(baseDao);
	}
}
