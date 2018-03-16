package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiChannelAnalysi;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AcrmFCiChannelAnalysiService extends CommonService {
	
	public AcrmFCiChannelAnalysiService(){
		JPABaseDAO<AcrmFCiChannelAnalysi,Long> baseDao = new JPABaseDAO<AcrmFCiChannelAnalysi,Long>(AcrmFCiChannelAnalysi.class);
		super.setBaseDAO(baseDao);
	}
}
