package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiPayManagerment;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AcrmFCiPayManagermentService extends CommonService {
	
	public AcrmFCiPayManagermentService(){
		JPABaseDAO<AcrmFCiPayManagerment,Long> baseDao = new JPABaseDAO<AcrmFCiPayManagerment,Long>(AcrmFCiPayManagerment.class);
		super.setBaseDAO(baseDao);
	}
}
