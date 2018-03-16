package com.xywz.asst.service;


import org.springframework.stereotype.Service;

import com.xywz.asst.model.XywzAsstMachgProduct;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 外协加工产品信息管理Service
 * @author 
 * @since 
 */
@Service
public class XywzAsstMachgProductService extends CommonService {
   
	public XywzAsstMachgProductService(){
		JPABaseDAO<XywzAsstMachgProduct, Long>  baseDAO = new JPABaseDAO<XywzAsstMachgProduct, Long>();  
		super.setBaseDAO(baseDAO);
	}


}


