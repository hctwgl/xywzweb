package com.xywz.purc.service;


import org.springframework.stereotype.Service;

import com.xywz.purc.model.XywzPurcProvrMgmtContact;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 供应商联系人信息管理Service
 * @author 
 * @since 
 */
@Service
public class XywzPurcProvrMgmtContactService extends CommonService {
   
	public XywzPurcProvrMgmtContactService(){
		JPABaseDAO<XywzPurcProvrMgmtContact, Long>  baseDAO = new JPABaseDAO<XywzPurcProvrMgmtContact, Long>();  
		super.setBaseDAO(baseDAO);
	}


}


