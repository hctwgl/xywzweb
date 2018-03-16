package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiPrAppState;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 客户项目立项批准情况
 */

@Service
public class ProjectAppStateService extends CommonService {

	public ProjectAppStateService() {
		JPABaseDAO<AcrmFCiPrAppState, Long> baseDAO = new JPABaseDAO<AcrmFCiPrAppState, Long>(
				AcrmFCiPrAppState.class);
		super.setBaseDAO(baseDAO);
	}
}
