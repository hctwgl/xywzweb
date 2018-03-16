package com.xywz.asst.service;


import org.springframework.stereotype.Service;

import com.xywz.asst.model.XywzAsstMachgContcrMgmt;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 外协加工工厂联系人管理Service
 * @author 
 * @since 
 */
@Service
public class XywzAsstMachgContcrMgmtService extends CommonService {
   
	public XywzAsstMachgContcrMgmtService(){
		JPABaseDAO<XywzAsstMachgContcrMgmt, Long>  baseDAO = new JPABaseDAO<XywzAsstMachgContcrMgmt, Long>();  
		super.setBaseDAO(baseDAO);
	}


}


