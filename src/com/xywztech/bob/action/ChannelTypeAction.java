package com.xywztech.bob.action;

import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.model.ChannelType;
import com.xywztech.bob.service.ChannelTypeService;
@SuppressWarnings("serial")
@Action("/channel-type")
public class ChannelTypeAction  extends CommonAction{

    
	@Autowired
    private ChannelTypeService channelTypeService ;
    @Autowired
	public void init(){
	  	model = new ChannelType(); 
	  	//list = new ArrayList<ChannelType>();
		setCommonService(channelTypeService);
	}
    

}