package com.xywz.asst.service;


import org.springframework.stereotype.Service;
import com.xywz.asst.model.XywzAsstMachgMgmtCstFollow;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 外协加工工厂客户跟进Service
 * @author 
 * @since 
 */
@Service
public class XywzAsstMachgMgmtCstFollowService extends CommonService {
   
	public XywzAsstMachgMgmtCstFollowService(){
		JPABaseDAO<XywzAsstMachgMgmtCstFollow, Long>  baseDAO = new JPABaseDAO<XywzAsstMachgMgmtCstFollow, Long>(XywzAsstMachgMgmtCstFollow.class);  
		super.setBaseDAO(baseDAO);
	}


}


