package com.xywz.asst.service;


import org.springframework.stereotype.Service;
import com.xywz.asst.model.XywzAsstMachgMgmtEMS;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 外协加工工厂物流管理Service
 * @author 
 * @since 
 */
@Service
public class XywzAsstMachgMgmtEMSService extends CommonService {
   
	public XywzAsstMachgMgmtEMSService(){
		JPABaseDAO<XywzAsstMachgMgmtEMS, Long>  baseDAO = new JPABaseDAO<XywzAsstMachgMgmtEMS, Long>(XywzAsstMachgMgmtEMS.class);  
		super.setBaseDAO(baseDAO);
	}


}


