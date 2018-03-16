package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiPrIvsCon;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 客户项目投资构成
 */

@Service
public class ProjectIvsConsService extends CommonService {

	public ProjectIvsConsService() {
		JPABaseDAO<AcrmFCiPrIvsCon, Long> baseDAO = new JPABaseDAO<AcrmFCiPrIvsCon, Long>(
				AcrmFCiPrIvsCon.class);
		super.setBaseDAO(baseDAO);
	}
}
