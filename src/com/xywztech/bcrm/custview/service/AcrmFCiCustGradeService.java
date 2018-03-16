package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiCustGrade;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 
 * @author huwei
 * 客户评级信息
 *
 */
@Service
public class AcrmFCiCustGradeService  extends CommonService{

	public AcrmFCiCustGradeService(){
		JPABaseDAO<AcrmFCiCustGrade,Long> baseDao = new JPABaseDAO<AcrmFCiCustGrade,Long>(AcrmFCiCustGrade.class);
		super.setBaseDAO(baseDao);
	}
	
}
