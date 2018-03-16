package com.xywz.plan.service;


import org.springframework.stereotype.Service;
import com.xywz.plan.model.XywzPlanJobAdvsSngl;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 车间作业通知单Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzPlanJobAdvsSnglService extends CommonService {
   
	public XywzPlanJobAdvsSnglService(){
		JPABaseDAO<XywzPlanJobAdvsSngl, Long>  baseDAO = new JPABaseDAO<XywzPlanJobAdvsSngl, Long>(XywzPlanJobAdvsSngl.class);  
		super.setBaseDAO(baseDAO);
	}


}


