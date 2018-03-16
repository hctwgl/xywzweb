package com.xywztech.bcrm.custview.service;


import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiCreditVillageCust;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class PerCustFamilyService extends CommonService{
	
	   public PerCustFamilyService(){
		   JPABaseDAO<AcrmFCiCreditVillageCust, Long>  baseDAO=new JPABaseDAO<AcrmFCiCreditVillageCust, Long>(AcrmFCiCreditVillageCust.class);  
		   super.setBaseDAO(baseDAO);
	   }
}
