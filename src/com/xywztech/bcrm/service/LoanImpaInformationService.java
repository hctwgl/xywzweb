package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.AcrmFCiLoanImpaInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class LoanImpaInformationService extends CommonService{
	
	   public LoanImpaInformationService(){
		   JPABaseDAO<AcrmFCiLoanImpaInfo, String>  baseDAO=new JPABaseDAO<AcrmFCiLoanImpaInfo, String>(AcrmFCiLoanImpaInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }


	
}
