package com.xywztech.bcrm.action;

import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.xywztech.bcrm.model.OcrmFMmAreaInfo;
import com.xywztech.bcrm.service.OcrmFMmAreaInfoService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/OcrmFMmAreaInfoAction-info")
public class OcrmFMmAreaInfoAction extends CommonAction{
	@Autowired
	private OcrmFMmAreaInfoService ocrmFMmAreaInfoService;
	@Autowired
	public void init(){
		model = new OcrmFMmAreaInfo();
		setCommonService(ocrmFMmAreaInfoService);
	}	

}
