package com.xywztech.bcrm.sales.service;


import org.springframework.stereotype.Service;

import com.xywztech.bcrm.system.model.FwSysProp;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
@Service
public class MktMyActiDetailMangeService extends CommonService{
	
	 public MktMyActiDetailMangeService(){
		   JPABaseDAO<FwSysProp, Long>  baseDAO = new JPABaseDAO<FwSysProp, Long>(FwSysProp.class);  
		   super.setBaseDAO(baseDAO);
	 }
	 
	 public Object saveData(Object obj) {
			return baseDAO.save(obj);
		}
	 
}
