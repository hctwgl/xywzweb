package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiCbalanceSheet;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class PerCustomerBalanceSheetService extends CommonService{
	   public PerCustomerBalanceSheetService(){
		   JPABaseDAO<AcrmFCiCbalanceSheet, String>  baseDAO=new JPABaseDAO<AcrmFCiCbalanceSheet, String>(AcrmFCiCbalanceSheet.class);  
		   super.setBaseDAO(baseDAO);
	   }


	
}
