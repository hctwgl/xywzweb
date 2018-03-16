package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiCustIntegral;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AcrmFCiCustIntegralService extends CommonService {
	public AcrmFCiCustIntegralService(){
		JPABaseDAO<AcrmFCiCustIntegral,Long> baseDao = new JPABaseDAO<AcrmFCiCustIntegral, Long>(AcrmFCiCustIntegral.class);
		super.setBaseDAO(baseDao);
	}
}
