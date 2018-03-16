package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.AcrmFCiGkZjyw;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class BetweenBusinessInformationService extends CommonService{
	
	   public BetweenBusinessInformationService(){
		   JPABaseDAO<AcrmFCiGkZjyw, String>  baseDAO=new JPABaseDAO<AcrmFCiGkZjyw, String>(AcrmFCiGkZjyw.class);  
		   super.setBaseDAO(baseDAO);
	   }


	
}
