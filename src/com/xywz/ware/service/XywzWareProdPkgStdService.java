package com.xywz.ware.service;


import org.springframework.stereotype.Service;

import com.xywz.ware.model.XywzWareProdPkgStd;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 产品包装标准Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzWareProdPkgStdService extends CommonService {
   
	public XywzWareProdPkgStdService(){
		JPABaseDAO<XywzWareProdPkgStd, Long>  baseDAO = new JPABaseDAO<XywzWareProdPkgStd, Long>(XywzWareProdPkgStd.class);  
		super.setBaseDAO(baseDAO);
	}

}


