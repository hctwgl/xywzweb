package com.xywztech.bcrm.serviceManage.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.serviceManage.model.OcrmFCustBusinessApply;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class CustBusinessApplyService extends CommonService {
   
   public CustBusinessApplyService(){
	   JPABaseDAO<OcrmFCustBusinessApply, Long>  baseDAO=new JPABaseDAO<OcrmFCustBusinessApply, Long>(OcrmFCustBusinessApply.class);  
		super.setBaseDAO(baseDAO);
	}
}
