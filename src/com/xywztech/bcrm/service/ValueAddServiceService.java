package com.xywztech.bcrm.service;

import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.OcrmFCiIncrementInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

@Service
public class ValueAddServiceService extends CommonService{
	
	   public ValueAddServiceService(){
		   JPABaseDAO<OcrmFCiIncrementInfo, Long>  baseDAO=new JPABaseDAO<OcrmFCiIncrementInfo, Long>(OcrmFCiIncrementInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }


	// 根据主键是否为空进行新增或者修改渠道
	@Override
	public Object save(Object model) {
		OcrmFCiIncrementInfo ocrmFCiIncrementInfo=(OcrmFCiIncrementInfo)model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
        String currenOrgId = auth.getUnitId();
		if (ocrmFCiIncrementInfo.getId() == null) { //新增
			ocrmFCiIncrementInfo.setCreateUser(currenUserId);
			ocrmFCiIncrementInfo.setCreateDate(new Date());
			ocrmFCiIncrementInfo.setCreateOrg(currenOrgId);
		}
		//更新
	    return super.save(ocrmFCiIncrementInfo);
	}
	//批量删除
//	public void batchRemove(String idStr) {
//		super.batchRemove(idStr);
//	}
}
