package com.xywztech.bcrm.customer.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.xywztech.bcrm.custview.model.AcrmFCiCreditVillageCust;
import com.xywztech.bcrm.service.HomeMemberInfoService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.crm.exception.BizException;

/**
 * 
 * @author wz
 * 家庭信息维护
 *
 */

@SuppressWarnings("serial")
@Action("/homeMemberInfo")
public class HomeMemberInfoAction extends CommonAction {
	
	@Autowired
	private HomeMemberInfoService homeMemberInfoService;
	@Autowired
	public void init(){
		model = new AcrmFCiCreditVillageCust();
		setCommonService(homeMemberInfoService);
	}
	
	@Override
	public DefaultHttpHeaders create() throws BizException{
    	
		Object result=homeMemberInfoService.save(model);
        if(result==null){
        	throw new BizException(1, 2, "1000", "该客户在其他家庭中已存在，无法作为户主新增！");
        }
        return new DefaultHttpHeaders("success");

    
}
}
