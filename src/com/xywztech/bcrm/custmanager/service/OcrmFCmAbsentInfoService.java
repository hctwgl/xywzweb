package com.xywztech.bcrm.custmanager.service;

import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.custmanager.model.OcrmFCmAbsentInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
@Transactional(value="postgreTransactionManager")
public class OcrmFCmAbsentInfoService extends CommonService{
	
	   public OcrmFCmAbsentInfoService(){
		   JPABaseDAO<OcrmFCmAbsentInfo, Long>  baseDAO=new JPABaseDAO<OcrmFCmAbsentInfo, Long>(OcrmFCmAbsentInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }


	// 根据recordeId是否为空进行新增或者修改渠道
	@Override
	public Object save(Object model) {
		 OcrmFCmAbsentInfo OcrmFCmAbsentInfo=(OcrmFCmAbsentInfo)model;
		 
//		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String currenUserId = auth.getUserId();
//        String currenOrgId = auth.getUnitId();
//		String s=requset.getParameter('assMon');
//		//system.out.printlnln("评价月份"+s);
		if (OcrmFCmAbsentInfo.getId() == null) { //新增
			OcrmFCmAbsentInfo.setAbsentStat("0");
			OcrmFCmAbsentInfo.setCreateDate(new Date());
		   // channelInfo.setUpdateUser(currenUserId);
	        //channelInfo.setCreateUser(currenUserId);
			//OcrmFCmAbsentInfo.setStatus("5");
			//OcrmFCmAbsentInfo
	       // channelInfo.setCreateOrganization(currenOrgId);
			
//		}else{
		//更新
//			ocrmFCmCustManagEvaMgr.setStatus("5");  //保存
		}
	    return super.save(OcrmFCmAbsentInfo);

	}
	
	//客户经理提交请假申请
	public Object setStatus(Long id){
		OcrmFCmAbsentInfo info = em.find(OcrmFCmAbsentInfo.class, id);
		//info.setStatus("0");  //客户经理已提交
		info.setAbsentStat("1");//提交申请
		return super.save(info);
		
	}
	//批量删除
//	public void batchRemove(String idStr) {
//		super.batchRemove(idStr);
//	}
}
