package com.xywztech.bcrm.custview.action;

import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.xywztech.bcrm.custview.model.AcrmFCiCreditVillageCust;
import com.xywztech.bcrm.custview.service.PerCustFamilyService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/perCustFamily")
public class PerCustFamilyAction  extends CommonAction{
    @Autowired
    private PerCustFamilyService perCustFamilyService ;
    @Autowired
	public void init(){
	  	model = new AcrmFCiCreditVillageCust(); 
		setCommonService(perCustFamilyService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}
}