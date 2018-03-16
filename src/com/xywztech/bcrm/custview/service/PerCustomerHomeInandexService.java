package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiHomeInandex;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class PerCustomerHomeInandexService extends CommonService{
	   public PerCustomerHomeInandexService(){
		   JPABaseDAO<AcrmFCiHomeInandex, String>  baseDAO=new JPABaseDAO<AcrmFCiHomeInandex, String>(AcrmFCiHomeInandex.class);  
		   super.setBaseDAO(baseDAO);
	   }


	
}
