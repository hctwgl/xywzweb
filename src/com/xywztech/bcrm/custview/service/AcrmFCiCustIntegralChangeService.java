package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiCustIntegralChange;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AcrmFCiCustIntegralChangeService extends CommonService {
	public AcrmFCiCustIntegralChangeService(){
		JPABaseDAO<AcrmFCiCustIntegralChange,Long> baseDao = new JPABaseDAO<AcrmFCiCustIntegralChange, Long>(AcrmFCiCustIntegralChange.class);
		super.setBaseDAO(baseDao);
	}
}
