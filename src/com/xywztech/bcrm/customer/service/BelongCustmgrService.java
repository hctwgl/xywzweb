package com.xywztech.bcrm.customer.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.OcrmFCiBelongCustmgr;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 归属客户经理服务类
 *
 */

@Service
public class BelongCustmgrService extends CommonService {

	public BelongCustmgrService() {
		JPABaseDAO<OcrmFCiBelongCustmgr, Long> baseDAO = new JPABaseDAO<OcrmFCiBelongCustmgr, Long>(
				OcrmFCiBelongCustmgr.class);
		super.setBaseDAO(baseDAO);
	}
	
	
	
}
