package com.xywz.plan.service;


import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywz.plan.model.XywzPlanQltyCheckAdvsSngl;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 质量检验标准通知单Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzPlanQltyCheckAdvsSnglService extends CommonService {
   
	public XywzPlanQltyCheckAdvsSnglService(){
		JPABaseDAO<XywzPlanQltyCheckAdvsSngl, Long>  baseDAO = new JPABaseDAO<XywzPlanQltyCheckAdvsSngl, Long>(XywzPlanQltyCheckAdvsSngl.class);  
		super.setBaseDAO(baseDAO);
	}

	@Override
	public Object save(Object model){
		XywzPlanQltyCheckAdvsSngl xywzPlanQltyCheckAdvsSngl = (XywzPlanQltyCheckAdvsSngl) model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	
		xywzPlanQltyCheckAdvsSngl.setModiDt(new Date());
		xywzPlanQltyCheckAdvsSngl.setLastMdfr(auth.getUserId());
		xywzPlanQltyCheckAdvsSngl.setLastMdfrNm(auth.getUsername());
		return super.save(xywzPlanQltyCheckAdvsSngl);
	}
	
	

}


