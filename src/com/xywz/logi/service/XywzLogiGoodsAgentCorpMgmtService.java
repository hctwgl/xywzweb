package com.xywz.logi.service;


import org.springframework.stereotype.Service;

import com.xywz.logi.model.XywzLogiGoodsAgentCorpMgmt;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 账务对账单管理Service
 * @author 
 * @since 
 */
@Service
public class XywzLogiGoodsAgentCorpMgmtService extends CommonService {
   
	public XywzLogiGoodsAgentCorpMgmtService(){
		JPABaseDAO<XywzLogiGoodsAgentCorpMgmt, Long>  baseDAO = new JPABaseDAO<XywzLogiGoodsAgentCorpMgmt, Long>(XywzLogiGoodsAgentCorpMgmt.class);  
		super.setBaseDAO(baseDAO);
	}


}


