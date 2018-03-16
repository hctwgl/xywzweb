package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.AcrmFCiGkSave;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class SaveInformationService extends CommonService{
	
	   public SaveInformationService(){
		   JPABaseDAO<AcrmFCiGkSave, String>  baseDAO=new JPABaseDAO<AcrmFCiGkSave, String>(AcrmFCiGkSave.class);  
		   super.setBaseDAO(baseDAO);
	   }


	
}
