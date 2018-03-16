package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.OcrmFCiIntegralSetting;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class OcrmFCiIntegralSettingService extends CommonService {
	public OcrmFCiIntegralSettingService(){
		JPABaseDAO<OcrmFCiIntegralSetting,Long> baseDao = new JPABaseDAO<OcrmFCiIntegralSetting,Long>(OcrmFCiIntegralSetting.class);
		super.setBaseDAO(baseDao);
	}
}
