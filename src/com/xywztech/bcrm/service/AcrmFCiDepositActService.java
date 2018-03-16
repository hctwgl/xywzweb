package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.AcrmFCiDepositAct;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AcrmFCiDepositActService extends CommonService {
	public AcrmFCiDepositActService(){
		JPABaseDAO<AcrmFCiDepositAct,Long> baseDAO = new JPABaseDAO<AcrmFCiDepositAct,Long>(AcrmFCiDepositAct.class);
		super.setBaseDAO(baseDAO);
	}
}
