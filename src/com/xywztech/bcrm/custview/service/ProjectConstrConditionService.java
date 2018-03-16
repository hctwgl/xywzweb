package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiPrConstrCondition;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 客户项目建设条件
 */

@Service
public class ProjectConstrConditionService extends CommonService {

	public ProjectConstrConditionService() {
		JPABaseDAO<AcrmFCiPrConstrCondition, Long> baseDAO = new JPABaseDAO<AcrmFCiPrConstrCondition, Long>(
				AcrmFCiPrConstrCondition.class);
		super.setBaseDAO(baseDAO);
	}
}
