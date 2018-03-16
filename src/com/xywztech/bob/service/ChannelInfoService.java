package com.xywztech.bob.service;


import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.model.ChannelInfo;
import com.xywztech.bob.vo.AuthUser;

@Service
public class ChannelInfoService extends CommonService{
	
	   public ChannelInfoService(){
		   JPABaseDAO<ChannelInfo, Long>  baseDAO=new JPABaseDAO<ChannelInfo, Long>(ChannelInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }


	   // 根据recordeId是否为空进行新增或者修改渠道
	   @Override
	public Object save(Object model) {
		   ChannelInfo channelInfo=(ChannelInfo)model;
		   AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		   String currenUserId = auth.getUserId();
		   String currenOrgId = auth.getUnitId();
		   if (channelInfo.getChannelId() == null) { //新增
			   channelInfo.setUpdateUser(currenUserId);
			   channelInfo.setCreateUser(currenUserId);
			   channelInfo.setCreateDate(new Date());
			   channelInfo.setUpdateDate(new Date());
			   channelInfo.setCreateOrganization(currenOrgId);

		}else{
		//更新
		    channelInfo.setUpdateDate(new Date());
		    channelInfo.setUpdateUser(currenUserId);
		}
	    return super.save(channelInfo);

	}
	//批量删除
//	public void batchRemove(String idStr) {
//		super.batchRemove(idStr);
//	}
}
