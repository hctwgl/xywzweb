package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.OcrmFMmAreaInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
@Service
public class OcrmFMmAreaInfoService extends CommonService {
	public OcrmFMmAreaInfoService(){
		JPABaseDAO<OcrmFMmAreaInfo,Long> baseDao = new JPABaseDAO<OcrmFMmAreaInfo,Long>(OcrmFMmAreaInfo.class);
		super.setBaseDAO(baseDao);
	}
}
