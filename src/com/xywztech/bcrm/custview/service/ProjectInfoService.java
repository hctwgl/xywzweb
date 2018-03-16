package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiPrInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 客户总表
 */

@Service
public class ProjectInfoService extends CommonService {

	public ProjectInfoService() {
		JPABaseDAO<AcrmFCiPrInfo, Long> baseDAO = new JPABaseDAO<AcrmFCiPrInfo, Long>(
				AcrmFCiPrInfo.class);
		super.setBaseDAO(baseDAO);
	}
}
