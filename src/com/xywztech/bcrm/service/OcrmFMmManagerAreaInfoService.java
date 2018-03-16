package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.OcrmFMmManagerAreaInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
@Service
public class OcrmFMmManagerAreaInfoService extends CommonService{
	public OcrmFMmManagerAreaInfoService(){
		JPABaseDAO<OcrmFMmManagerAreaInfo,Long> baseDao = new JPABaseDAO<OcrmFMmManagerAreaInfo,Long>(OcrmFMmManagerAreaInfo.class);
		super.setBaseDAO(baseDao);
	}
}
