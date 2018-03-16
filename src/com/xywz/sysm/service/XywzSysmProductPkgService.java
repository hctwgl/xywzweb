package com.xywz.sysm.service;


import org.springframework.stereotype.Service;
import com.xywz.sysm.model.XywzSysmProductDetail;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 外协加工产品信息管理Service
 * @author 
 * @since 
 */
@Service
public class XywzSysmProductPkgService extends CommonService {
   
	public XywzSysmProductPkgService(){
		JPABaseDAO<XywzSysmProductDetail, Long>  baseDAO = new JPABaseDAO<XywzSysmProductDetail, Long>();  
		super.setBaseDAO(baseDAO);
	}


}


