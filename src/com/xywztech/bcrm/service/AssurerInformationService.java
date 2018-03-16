package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.AcrmFCiAssurerInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AssurerInformationService extends CommonService{
	
	   public AssurerInformationService(){
		   JPABaseDAO<AcrmFCiAssurerInfo, String>  baseDAO=new JPABaseDAO<AcrmFCiAssurerInfo, String>(AcrmFCiAssurerInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }


	
}
