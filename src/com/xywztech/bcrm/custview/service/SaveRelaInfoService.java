package com.xywztech.bcrm.custview.service;


import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.OcrmFCiLoanSave;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
/**
 * 营销账户关联表service--新增，修改，删除
 * @author songxs
 * @since 2012-12-19
 *
 */
@Service
public class SaveRelaInfoService extends CommonService{
	
	public SaveRelaInfoService(){
		JPABaseDAO<OcrmFCiLoanSave, String>  baseDAO = new JPABaseDAO<OcrmFCiLoanSave, String>(OcrmFCiLoanSave.class);  
		super.setBaseDAO(baseDAO);
	}
}
