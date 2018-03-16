package com.xywztech.bcrm.service;

import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.OcrmFWpWorkTask;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

@Service
public class OcrmFWpWorkTaskService extends CommonService {

	public OcrmFWpWorkTaskService(){
		
		JPABaseDAO<OcrmFWpWorkTask, Long>  baseDAO=new JPABaseDAO<OcrmFWpWorkTask, Long>(OcrmFWpWorkTask.class);  
		   super.setBaseDAO(baseDAO);
	}
	
	/*得到当前的登录用户 ,和系统的登录时间**/
	@Override
	public Object save(Object model){
		OcrmFWpWorkTask ocrmFWpWorkTask = (OcrmFWpWorkTask) model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String name = auth.getUsername();
		if(ocrmFWpWorkTask.getId()==null){//新增
			ocrmFWpWorkTask.setUpdateUser(name);
			ocrmFWpWorkTask.setCreateUser(name);
			ocrmFWpWorkTask.setCreateDate(new Date());
			ocrmFWpWorkTask.setUpdateDate(new Date());
		}else{//更新
			ocrmFWpWorkTask.setUpdateUser(name);
			ocrmFWpWorkTask.setUpdateDate(new Date());	
		}
		return super.save(ocrmFWpWorkTask);
	}
}
