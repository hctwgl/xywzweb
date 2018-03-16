package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiPrFundSrc;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 客户项目资金来源
 */

@Service
public class ProjectFundSrcService extends CommonService {

	public ProjectFundSrcService() {
		JPABaseDAO<AcrmFCiPrFundSrc, Long> baseDAO = new JPABaseDAO<AcrmFCiPrFundSrc, Long>(
				AcrmFCiPrFundSrc.class);
		super.setBaseDAO(baseDAO);
	}
}
