package com.xywztech.bcrm.custmanager.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custmanager.model.OcrmFCmStudyInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class CustomerManagerLearningService extends CommonService{
	
	   public CustomerManagerLearningService(){
		   JPABaseDAO<OcrmFCmStudyInfo, Long>  baseDAO=new JPABaseDAO<OcrmFCmStudyInfo, Long>(OcrmFCmStudyInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }


	// 根据recordeId是否为空进行新增或者修改渠道
//	public Object save(Object model) {
//		OcrmFCmStudyInfo ocrmFCmStudyInfo=(OcrmFCmStudyInfo)model;
////		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
////        String currenUserId = auth.getUserId();
////        String currenOrgId = auth.getUnitId();
//		if (ocrmFCmStudyInfo.getId() == null) { //新增
//		   // channelInfo.setUpdateUser(currenUserId);
//	        //channelInfo.setCreateUser(currenUserId);
//	        ocrmFCmStudyInfo.setFR_DATE((new Date()));
//	        ocrmFCmStudyInfo.setTO_DATE((new Date()));
//	       // channelInfo.setCreateOrganization(currenOrgId);
//			
//		}else{
//		//更新
//			 ocrmFCmStudyInfo.setFR_DATE((new Date()));
//		        ocrmFCmStudyInfo.setTO_DATE((new Date()));
//		}
//	    return super.save(ocrmFCmStudyInfo);
//
//	}
	//批量删除
//	public void batchRemove(String idStr) {
//		super.batchRemove(idStr);
//	}
}
