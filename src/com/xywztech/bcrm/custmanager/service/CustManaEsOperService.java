package com.xywztech.bcrm.custmanager.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custmanager.model.OcrmFCmCustManagEvaMgr;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class CustManaEsOperService extends CommonService{
	
	   public CustManaEsOperService(){
		   JPABaseDAO<OcrmFCmCustManagEvaMgr, Long>  baseDAO=new JPABaseDAO<OcrmFCmCustManagEvaMgr, Long>(OcrmFCmCustManagEvaMgr.class);  
		   super.setBaseDAO(baseDAO);
	   }


	// 根据recordeId是否为空进行新增或者修改渠道
	@Override
	public Object save(Object model) {
		 OcrmFCmCustManagEvaMgr ocrmFCmCustManagEvaMgr=(OcrmFCmCustManagEvaMgr)model;
//		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String currenUserId = auth.getUserId();
//        String currenOrgId = auth.getUnitId();
//		String s=requset.getParameter('assMon');
//		//system.out.printlnln("评价月份"+s);
		if (ocrmFCmCustManagEvaMgr.getId() == null) { //新增
		   // channelInfo.setUpdateUser(currenUserId);
	        //channelInfo.setCreateUser(currenUserId);
			ocrmFCmCustManagEvaMgr.setStatus("2");
	       
			
		}else{
		//更新
			ocrmFCmCustManagEvaMgr.setStatus("2");
		}
	    return super.save(ocrmFCmCustManagEvaMgr);

	}
	//批量删除
//	public void batchRemove(String idStr) {
//		super.batchRemove(idStr);
//	}
}
