package com.xywztech.bcrm.custmanager.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.custmanager.model.OcrmFCmCustManagEvaMgr;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
@Transactional(value="postgreTransactionManager")
public class CustomerManagerEstimateService extends CommonService{
	
	   public CustomerManagerEstimateService(){
		   JPABaseDAO<OcrmFCmCustManagEvaMgr, Long>  baseDAO=new JPABaseDAO<OcrmFCmCustManagEvaMgr, Long>(OcrmFCmCustManagEvaMgr.class);  
		   super.setBaseDAO(baseDAO);
	   }


	// 根据recordeId是否为空进行新增或者修改渠道
//	public Object save(Object model) {
//		 OcrmFCmCustManagEvaMgr ocrmFCmCustManagEvaMgr=(OcrmFCmCustManagEvaMgr)model;
////		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
////        String currenUserId = auth.getUserId();
////        String currenOrgId = auth.getUnitId();
////		String s=requset.getParameter('assMon');
////		//system.out.printlnln("评价月份"+s);
//		if (ocrmFCmCustManagEvaMgr.getId() == null) { //新增
//		   // channelInfo.setUpdateUser(currenUserId);
//	        //channelInfo.setCreateUser(currenUserId);
//			ocrmFCmCustManagEvaMgr.setStatus("5");
//	       // channelInfo.setCreateOrganization(currenOrgId);
//			
////		}else{
//		//更新
////			ocrmFCmCustManagEvaMgr.setStatus("5");  //保存
//		}
//	    return super.save(ocrmFCmCustManagEvaMgr);
//
//	}
	
	//客户经理提交评估
	public Object setStatus(Long id){
		 OcrmFCmCustManagEvaMgr ocrmFCmCustManagEvaMgr = em.find(OcrmFCmCustManagEvaMgr.class, id);
		 ocrmFCmCustManagEvaMgr.setStatus("0");  //客户经理已提交
		
		return super.save(ocrmFCmCustManagEvaMgr);
	}
	//批量删除
//	public void batchRemove(String idStr) {
//		super.batchRemove(idStr);
//	}
}
