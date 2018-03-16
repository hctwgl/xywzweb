package com.xywztech.bcrm.customer.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.xywztech.bcrm.customer.service.HomeUserAddService;
import com.xywztech.bcrm.custview.model.AcrmFCiCreditVillageCust;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.crm.exception.BizException;
@SuppressWarnings("serial")
@Action("/homeUserAdd")
public class HomeUserAddAction extends CommonAction{ 
	@Autowired
    private HomeUserAddService homeUserAddService ;
	@Autowired
	public void init(){
	  	model = new AcrmFCiCreditVillageCust(); 
		setCommonService(homeUserAddService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}
	
	@Override
	public DefaultHttpHeaders create() throws BizException{
    	
    		Object result=homeUserAddService.save(model);
	        if(result==null){
	        	throw new BizException(1, 2, "1000", "该客户在其他家庭中已存在，无法作为户主新增！");
	        }
	        return new DefaultHttpHeaders("success");

        
    }
}
