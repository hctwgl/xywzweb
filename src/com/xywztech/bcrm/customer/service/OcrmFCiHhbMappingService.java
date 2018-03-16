package com.xywztech.bcrm.customer.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.OcrmFCiHhbMapping;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class OcrmFCiHhbMappingService extends CommonService {

	public OcrmFCiHhbMappingService(){
		JPABaseDAO<OcrmFCiHhbMapping,Long> baseDao = new JPABaseDAO<OcrmFCiHhbMapping,Long>(OcrmFCiHhbMapping.class);
		super.setBaseDAO(baseDao);
	}
	
}
