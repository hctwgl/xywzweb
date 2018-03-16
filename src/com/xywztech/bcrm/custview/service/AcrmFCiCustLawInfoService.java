package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiCustLawInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AcrmFCiCustLawInfoService extends CommonService {
	public AcrmFCiCustLawInfoService(){
		JPABaseDAO<AcrmFCiCustLawInfo,Long> baseDao = new JPABaseDAO<AcrmFCiCustLawInfo,Long>(AcrmFCiCustLawInfo.class);
		super.setBaseDAO(baseDao);
	}
}

