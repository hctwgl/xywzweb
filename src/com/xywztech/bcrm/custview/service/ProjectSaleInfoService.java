package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiPrSaleInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 产品销售
 */

@Service
public class ProjectSaleInfoService extends CommonService {

	public ProjectSaleInfoService() {
		JPABaseDAO<AcrmFCiPrSaleInfo, Long> baseDAO = new JPABaseDAO<AcrmFCiPrSaleInfo, Long>(
				AcrmFCiPrSaleInfo.class);
		super.setBaseDAO(baseDAO);
	}
}
