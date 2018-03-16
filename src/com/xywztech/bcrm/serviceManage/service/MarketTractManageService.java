package com.xywztech.bcrm.serviceManage.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.serviceManage.model.MarketTrackRecord;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 客户服务执行Service
 * @author yuyz
 * @since 2012-12-17 
 */
@Service
public class MarketTractManageService extends CommonService {
   
   public MarketTractManageService(){
	   JPABaseDAO<MarketTrackRecord, Long>  baseDAO=new JPABaseDAO<MarketTrackRecord, Long>(MarketTrackRecord.class);  
		super.setBaseDAO(baseDAO);
	}
}
