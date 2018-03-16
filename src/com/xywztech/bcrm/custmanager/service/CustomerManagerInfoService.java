package com.xywztech.bcrm.custmanager.service;


import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custmanager.model.OcrmFCmCustMgrInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


@Service
public class CustomerManagerInfoService extends CommonService{
	
	private JPABaseDAO<OcrmFCmCustMgrInfo, Long> baseDao;

	@SuppressWarnings("unchecked")
	public CustomerManagerInfoService(){
		this.baseDao = new JPABaseDAO(OcrmFCmCustMgrInfo.class);
		super.setBaseDAO(this.baseDao);
	}

}