package com.xywztech.bcrm.custview.service;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiPrMainMtrSuplly;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 客户项目主要原料提供
 */

@Service
public class ProjectMainMtrSupllyService extends CommonService {

	public ProjectMainMtrSupllyService() {
		JPABaseDAO<AcrmFCiPrMainMtrSuplly, Long> baseDAO = new JPABaseDAO<AcrmFCiPrMainMtrSuplly, Long>(
				AcrmFCiPrMainMtrSuplly.class);
		super.setBaseDAO(baseDAO);
	}
}
