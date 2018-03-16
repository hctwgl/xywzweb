package com.xywz.plan.service;


import org.springframework.stereotype.Service;
import com.xywz.plan.model.XywzPlanTskSngl;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 合同任务管理Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzPlanTskSnglService extends CommonService {
   
	public XywzPlanTskSnglService(){
		JPABaseDAO<XywzPlanTskSngl, Long>  baseDAO = new JPABaseDAO<XywzPlanTskSngl, Long>(XywzPlanTskSngl.class);  
		super.setBaseDAO(baseDAO);
	}


}


