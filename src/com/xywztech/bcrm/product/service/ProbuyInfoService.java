package com.xywztech.bcrm.product.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.product.model.OcrmFCiPProbuyInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class ProbuyInfoService extends CommonService{
	
	   public ProbuyInfoService(){
		   JPABaseDAO<OcrmFCiPProbuyInfo, String>  baseDAO=new JPABaseDAO<OcrmFCiPProbuyInfo, String>(OcrmFCiPProbuyInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }


	
}
