package com.xywztech.bcrm.customer.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.OcrmFCiBrandDefine;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 
 * @author huwei
 * 客户品牌定义
 *
 */
@Service
public class OcrmFCiBrandDefineService extends CommonService{

		public OcrmFCiBrandDefineService(){
			JPABaseDAO<OcrmFCiBrandDefine,Long> baseDao = new JPABaseDAO<OcrmFCiBrandDefine,Long>(OcrmFCiBrandDefine.class);
			super.setBaseDAO(baseDao);
	}
}
