package com.xywztech.bcrm.service;



import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.AcrmFCiCustContriApron;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AcrmFCiCustContriApronService extends CommonService{
	
	   public AcrmFCiCustContriApronService(){
		   JPABaseDAO<AcrmFCiCustContriApron, Long>  baseDAO=new JPABaseDAO<AcrmFCiCustContriApron, Long>(AcrmFCiCustContriApron.class);  
		   super.setBaseDAO(baseDAO);
	   }
}
