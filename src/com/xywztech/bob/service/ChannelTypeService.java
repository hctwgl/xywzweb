package com.xywztech.bob.service;

import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.model.ChannelType;
import com.xywztech.bob.vo.AuthUser;

@Service
public class ChannelTypeService extends CommonService{
	
	   public ChannelTypeService(){
		   JPABaseDAO<ChannelType, Long>  baseDAO=new JPABaseDAO<ChannelType, Long>(ChannelType.class);  
		   super.setBaseDAO(baseDAO);
	   }


	// 根据recordeId是否为空进行新增或者修改渠道
	@Override
	public Object save(Object model) {
	    ChannelType channelType=(ChannelType)model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
        channelType.setUpdateUser(currenUserId);
        Date date = new Date(); 
        channelType.setUpdateDate(date);
		if (channelType.getChannelTypeId() == null) {
		    //新增
	        channelType.setCreateUser(currenUserId);
	        channelType.setCreateDate(date);
		}
		return super.save(channelType);
	}
	
}
