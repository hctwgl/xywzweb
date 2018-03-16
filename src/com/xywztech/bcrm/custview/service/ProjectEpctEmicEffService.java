package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiPrEpctEmicEff;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 预计经济效率
 */

@Service
public class ProjectEpctEmicEffService extends CommonService {

	public ProjectEpctEmicEffService() {
		JPABaseDAO<AcrmFCiPrEpctEmicEff, Long> baseDAO = new JPABaseDAO<AcrmFCiPrEpctEmicEff, Long>(
				AcrmFCiPrEpctEmicEff.class);
		super.setBaseDAO(baseDAO);
	}
}
