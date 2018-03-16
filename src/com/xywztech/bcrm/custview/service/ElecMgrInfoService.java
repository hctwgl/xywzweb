package com.xywztech.bcrm.custview.service;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiCustElecMgrInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class ElecMgrInfoService extends CommonService{
	
	   public ElecMgrInfoService(){
		   JPABaseDAO<AcrmFCiCustElecMgrInfo, Long>  baseDAO=new JPABaseDAO<AcrmFCiCustElecMgrInfo, Long>(AcrmFCiCustElecMgrInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }
}
