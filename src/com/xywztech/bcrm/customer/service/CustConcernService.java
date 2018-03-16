package com.xywztech.bcrm.customer.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.OcrmFCiAttentionCustInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class CustConcernService extends CommonService{
	
	   public CustConcernService(){
		   JPABaseDAO<OcrmFCiAttentionCustInfo, Long>  baseDAO=new JPABaseDAO<OcrmFCiAttentionCustInfo, Long>(OcrmFCiAttentionCustInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }

}
