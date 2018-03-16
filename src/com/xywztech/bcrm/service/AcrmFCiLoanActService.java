package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.AcrmFCiLoanAct;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AcrmFCiLoanActService extends CommonService {
	public AcrmFCiLoanActService(){
		JPABaseDAO<AcrmFCiLoanAct,Long> baseDAO = new JPABaseDAO<AcrmFCiLoanAct,Long>(AcrmFCiLoanAct.class);
		super.setBaseDAO(baseDAO);
	}
}
