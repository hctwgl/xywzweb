package com.xywztech.bcrm.customer.service;

import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.OcrmFCiGradeApply;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

/**
 * 
 * @author huwei
 * 客户评级申请
 *
 */
@Service
public class OcrmFCiGradeApplyService extends CommonService{
	public OcrmFCiGradeApplyService(){
		JPABaseDAO<OcrmFCiGradeApply, Long> baseDAO = new JPABaseDAO<OcrmFCiGradeApply, Long>(OcrmFCiGradeApply.class);
		super.setBaseDAO(baseDAO);
	}
	
	@Override
	public Object save(Object model) {
		OcrmFCiGradeApply ocrmFMmMaterialDesc=(OcrmFCiGradeApply)model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		ocrmFMmMaterialDesc.setApplyDate(new Date());
		ocrmFMmMaterialDesc.setApplyOrg(auth.getUnitId());
		ocrmFMmMaterialDesc.setApplyUser(auth.getUserId());
		ocrmFMmMaterialDesc.setStatus("等待提交..");
		return super.save(ocrmFMmMaterialDesc);
	}
	
}
