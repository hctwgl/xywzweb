package com.xywztech.bcrm.service;

import org.springframework.stereotype.Service;

import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.model.OcrmFCiContriParam;

/**
 * 贡献度参数树service
 * @author weijl
 * @since 2012-09-24
 */
@Service
public class ContributionParamTreeService extends CommonService {
	
   public ContributionParamTreeService(){
		JPABaseDAO<OcrmFCiContriParam, Long>  baseDAO=new JPABaseDAO<OcrmFCiContriParam, Long>(OcrmFCiContriParam.class);  
		super.setBaseDAO(baseDAO);
	}
	
}
