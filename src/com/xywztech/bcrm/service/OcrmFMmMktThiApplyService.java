package com.xywztech.bcrm.service;

import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.OcrmFMmMktThiApply;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;
@Service
public class OcrmFMmMktThiApplyService extends CommonService{
	public OcrmFMmMktThiApplyService(){
		   JPABaseDAO<OcrmFMmMktThiApply, Long>  baseDAO=new JPABaseDAO<OcrmFMmMktThiApply, Long>(OcrmFMmMktThiApply.class);  
		   super.setBaseDAO(baseDAO);
	   }
	
	@Override
	public Object save(Object model) {
		OcrmFMmMktThiApply ocrmFMmMktThiApply=(OcrmFMmMktThiApply)model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
        String currenOrgId = auth.getUnitId();
		if (ocrmFMmMktThiApply.getApplyId() == null) { //新增
			ocrmFMmMktThiApply.setCreateUser(currenUserId);
			ocrmFMmMktThiApply.setCreateDate(new Date());
	}	
		   return super.save(ocrmFMmMktThiApply);
	}
}



