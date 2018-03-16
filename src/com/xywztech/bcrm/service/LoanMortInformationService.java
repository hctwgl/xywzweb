package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.AcrmFCiLoanMortInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class LoanMortInformationService extends CommonService{
	
	   public LoanMortInformationService(){
		   JPABaseDAO<AcrmFCiLoanMortInfo, String>  baseDAO=new JPABaseDAO<AcrmFCiLoanMortInfo, String>(AcrmFCiLoanMortInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }


	
}
