package com.xywz.ware.service;

import org.springframework.stereotype.Service;
import com.xywz.ware.model.XywzPlanQltyCheckDetl;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;



/**
 * 质量检核标准Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzPlanQltyCheckDetlService extends CommonService {
   
	public XywzPlanQltyCheckDetlService(){
		JPABaseDAO<XywzPlanQltyCheckDetl, Long>  baseDAO = new JPABaseDAO<XywzPlanQltyCheckDetl, Long>(XywzPlanQltyCheckDetl.class);  
		super.setBaseDAO(baseDAO);
	}


}


