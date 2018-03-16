package com.xywz.purc.service;


import org.springframework.stereotype.Service;
import com.xywz.purc.model.XywzPurcProvrMgmtEMS;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 供应商快递公司信息管理Service
 * @author 
 * @since  
 */
@Service
public class XywzPurcProvrMgmtEMSService extends CommonService {
   
	public XywzPurcProvrMgmtEMSService(){
		JPABaseDAO<XywzPurcProvrMgmtEMS, Long>  baseDAO = new JPABaseDAO<XywzPurcProvrMgmtEMS, Long>(XywzPurcProvrMgmtEMS.class);  
		super.setBaseDAO(baseDAO);
	}


}


