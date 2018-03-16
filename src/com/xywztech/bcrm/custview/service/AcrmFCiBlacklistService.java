package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiBlacklist;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AcrmFCiBlacklistService extends CommonService {
	public AcrmFCiBlacklistService(){
		JPABaseDAO<AcrmFCiBlacklist,Long> baseDao = new JPABaseDAO<AcrmFCiBlacklist,Long>(AcrmFCiBlacklist.class);
		super.setBaseDAO(baseDao);
	}
}
