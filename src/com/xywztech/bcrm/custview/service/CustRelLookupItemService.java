package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.model.LookupMappingItem;

@Service
public class CustRelLookupItemService extends CommonService{
	
	   public CustRelLookupItemService(){
		   JPABaseDAO<LookupMappingItem, Long>  baseDAO=new JPABaseDAO<LookupMappingItem, Long>(LookupMappingItem.class);  
		   super.setBaseDAO(baseDAO);
	   }

}
