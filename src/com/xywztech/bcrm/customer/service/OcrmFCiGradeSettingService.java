package com.xywztech.bcrm.customer.service;


import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.OcrmFCiGradeSetting;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 
 * @author huwei
 * 客户评级指标定义
 *
 */

@Service
public class OcrmFCiGradeSettingService extends CommonService {
	public OcrmFCiGradeSettingService(){
		JPABaseDAO<OcrmFCiGradeSetting,Long> baseDao = new JPABaseDAO<OcrmFCiGradeSetting,Long>(OcrmFCiGradeSetting.class);
		super.setBaseDAO(baseDao);
	}
}
