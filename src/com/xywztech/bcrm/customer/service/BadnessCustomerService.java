package com.xywztech.bcrm.customer.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.OcrmFCiBadCustInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class BadnessCustomerService extends CommonService{
	
	   public BadnessCustomerService(){
		   JPABaseDAO<OcrmFCiBadCustInfo, String>  baseDAO=new JPABaseDAO<OcrmFCiBadCustInfo, String>(OcrmFCiBadCustInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }


	
}
