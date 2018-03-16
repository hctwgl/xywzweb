package com.xywztech.bcrm.service;

import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.OcrmFMmMaterialDesc;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;
@Service
public class MktMaterialManageService extends CommonService{
	public MktMaterialManageService(){
		   JPABaseDAO<OcrmFMmMaterialDesc, Long>  baseDAO=new JPABaseDAO<OcrmFMmMaterialDesc, Long>(OcrmFMmMaterialDesc.class);  
		   super.setBaseDAO(baseDAO);
	   }
	
	@Override
	public Object save(Object model) {
		OcrmFMmMaterialDesc ocrmFMmMaterialDesc=(OcrmFMmMaterialDesc)model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
        String currenOrgId = auth.getUnitId();
		if (ocrmFMmMaterialDesc.getMktMaterialId() == null) { //新增
			ocrmFMmMaterialDesc.setCreater(currenUserId);
			ocrmFMmMaterialDesc.setCreateDate(new Date());
			ocrmFMmMaterialDesc.setLatelyUpdateDate(new Date());
			ocrmFMmMaterialDesc.setLatelyUpdater(currenUserId);
		}else{
		//更新
			ocrmFMmMaterialDesc.setLatelyUpdateDate(new Date());
			ocrmFMmMaterialDesc.setLatelyUpdater(currenUserId);
		}
	    return super.save(ocrmFMmMaterialDesc);

	}}
