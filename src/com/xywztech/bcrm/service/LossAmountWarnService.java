package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.OcrmFWpDpoutalertParm;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class LossAmountWarnService extends CommonService{
	
	   public LossAmountWarnService(){
		   JPABaseDAO<OcrmFWpDpoutalertParm, Long>  baseDAO=new JPABaseDAO<OcrmFWpDpoutalertParm, Long>(OcrmFWpDpoutalertParm.class);  
		   super.setBaseDAO(baseDAO);
	   }

}
