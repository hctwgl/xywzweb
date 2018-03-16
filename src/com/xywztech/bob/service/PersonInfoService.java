package com.xywztech.bob.service;

import org.springframework.stereotype.Service;

import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.model.PersonInfo;

@Service
public class PersonInfoService extends CommonService{
	
	   public PersonInfoService(){
		   JPABaseDAO<PersonInfo, Long>  baseDAO=new JPABaseDAO<PersonInfo, Long>(PersonInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }


//	// 根据recordeId是否为空进行新增或者修改渠道
//	public Object save(Object model) {
//		PersonInfo personInfo=(PersonInfo)model;
//		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String currenUserId = auth.getUserId();
//        String currenOrgId = auth.getUnitId();
//		if (personInfo.getId() == null) { //新增
//			personInfo.setName(currenUserId);
//			personInfo.setAge(currenUserId);
//			personInfo.setSex(currenUserId);
//			
//		}else{
//		//更新
//			personInfo.setName(currenUserId);
//			personInfo.setAge(currenUserId);
//			personInfo.setSex(currenUserId);
//		}
//	    return super.save(personInfo);
//
//	}
	//批量删除
//	public void batchRemove(String idStr) {
//		super.batchRemove(idStr);
//	}
	   
	   
}
