package com.xywz.purc.service;


import org.springframework.stereotype.Service;
import com.xywz.purc.model.XywzPurcProvrMgmtCstFollow;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 供应商客户跟进Service
 * @author 
 * @since 
 */
@Service
public class XywzPurcProvrMgmtCstFollowService extends CommonService {
   
	public XywzPurcProvrMgmtCstFollowService(){
		JPABaseDAO<XywzPurcProvrMgmtCstFollow, Long>  baseDAO = new JPABaseDAO<XywzPurcProvrMgmtCstFollow, Long>(XywzPurcProvrMgmtCstFollow.class);  
		super.setBaseDAO(baseDAO);
	}


}


