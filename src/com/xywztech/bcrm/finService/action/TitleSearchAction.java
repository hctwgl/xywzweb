package com.xywztech.bcrm.finService.action;

import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.xywztech.bcrm.service.TitleQueryService;
import com.xywztech.bcrm.system.model.OcrmFSeTitle;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/TitleQuery")
public class TitleSearchAction extends CommonAction{
    @Autowired
    private TitleQueryService titleQueryService ;
    @Autowired
	public void init(){
	  	model = new OcrmFSeTitle(); 
		setCommonService(titleQueryService);
	}
 	
 	public String loadTitleRs(){
 		json = titleQueryService.loadTitleRs();
 		return "success";
 	}
 	
}
