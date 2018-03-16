package com.xywztech.bcrm.customer.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.AcrmFCiCreditVillageArea;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AcrmFCiCreditVillageAreaService extends CommonService{
	public AcrmFCiCreditVillageAreaService(){
		JPABaseDAO<AcrmFCiCreditVillageArea,Long> baseDao = new JPABaseDAO<AcrmFCiCreditVillageArea,Long>(AcrmFCiCreditVillageArea.class);
		super.setBaseDAO(baseDao);
	}
}
