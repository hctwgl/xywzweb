package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.AcrmFCiGkGjyw;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class InternationalBusinessInformationService extends CommonService{
	
	   public InternationalBusinessInformationService(){
		   JPABaseDAO<AcrmFCiGkGjyw, String>  baseDAO=new JPABaseDAO<AcrmFCiGkGjyw, String>(AcrmFCiGkGjyw.class);  
		   super.setBaseDAO(baseDAO);
	   }


	
}
