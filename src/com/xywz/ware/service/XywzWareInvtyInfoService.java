package com.xywz.ware.service;


import java.util.Date;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.xywz.ware.model.XywzWareInvtyInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 仓库库存信息表Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzWareInvtyInfoService extends CommonService {
   
	public XywzWareInvtyInfoService(){
		JPABaseDAO<XywzWareInvtyInfo, Long>  baseDAO = new JPABaseDAO<XywzWareInvtyInfo, Long>(XywzWareInvtyInfo.class);  
		super.setBaseDAO(baseDAO);
	}
	@Override
	public Object save(Object model){
		XywzWareInvtyInfo xywzWareInvtyInfo = (XywzWareInvtyInfo) model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	
		xywzWareInvtyInfo.setIntoWhsDt(new Date());
		xywzWareInvtyInfo.setIntoWhsExecPers(auth.getUserId());
		xywzWareInvtyInfo.setLastOprPers(auth.getUserId());
		xywzWareInvtyInfo.setFinalOprDt(new Date());
		return super.save(xywzWareInvtyInfo);
	}

}


