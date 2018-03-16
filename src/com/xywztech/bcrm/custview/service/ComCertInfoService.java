package com.xywztech.bcrm.custview.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiCertInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
/**
 * 对公客户证件信息service--新增，修改，删除
 * @author songxs
 * @since 2012-10-11
 *
 */
@Service
public class ComCertInfoService extends CommonService{
	
	public ComCertInfoService(){
		JPABaseDAO<AcrmFCiCertInfo, String>  baseDAO = new JPABaseDAO<AcrmFCiCertInfo, String>(AcrmFCiCertInfo.class);  
		super.setBaseDAO(baseDAO);
	}
}
