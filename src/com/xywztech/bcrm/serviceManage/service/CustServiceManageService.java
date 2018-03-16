package com.xywztech.bcrm.serviceManage.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.serviceManage.model.CustServiceInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 客户服务管理Service
 * @author yuyz
 * @since 2012-12-06 
 */
@Service
public class CustServiceManageService extends CommonService {
   
   public CustServiceManageService(){
	   JPABaseDAO<CustServiceInfo, Long>  baseDAO=new JPABaseDAO<CustServiceInfo, Long>(CustServiceInfo.class);  
		super.setBaseDAO(baseDAO);
	}
}
