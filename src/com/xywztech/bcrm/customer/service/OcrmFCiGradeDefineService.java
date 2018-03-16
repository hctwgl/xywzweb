package com.xywztech.bcrm.customer.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.OcrmFCiGradeDefine;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 
 * @author huwei
 * 客户等级定义
 *
 */
@Service
public class OcrmFCiGradeDefineService extends CommonService {

	public OcrmFCiGradeDefineService(){
		JPABaseDAO<OcrmFCiGradeDefine,Long> baseDao = new JPABaseDAO<OcrmFCiGradeDefine,Long>(OcrmFCiGradeDefine.class);
		super.setBaseDAO(baseDao);
	}
}
