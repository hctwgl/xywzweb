package com.xywz.plan.service;


import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywz.plan.model.XywzPlanPrdState;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 合同任务管理Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzPlanPrdStateService extends CommonService {
   
	public XywzPlanPrdStateService(){
		JPABaseDAO<XywzPlanPrdState, Long>  baseDAO = new JPABaseDAO<XywzPlanPrdState, Long>(XywzPlanPrdState.class);  
		super.setBaseDAO(baseDAO);
	}
	
	@Override
	public Object save(Object model){
		XywzPlanPrdState xywzPlanPrdState =(XywzPlanPrdState) model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		System.out.print(xywzPlanPrdState.getProdid());
		//if(xywzPlanPrdState.getProdid()==null){
		 xywzPlanPrdState.setInputPersNm(auth.getUsername()); //自动获取系统登陆人名称
		 xywzPlanPrdState.setInputDt(new Date());		     //自动获取新增日期	
		 xywzPlanPrdState.setInputPersId(auth.getUserId());
		//}
		return super.save(xywzPlanPrdState);
	}


}


