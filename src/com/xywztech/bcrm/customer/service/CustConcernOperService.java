package com.xywztech.bcrm.customer.service;

import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.OcrmFCiAttentionCustInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

@Service
public class CustConcernOperService extends CommonService{
	
	   public CustConcernOperService(){
		   JPABaseDAO<OcrmFCiAttentionCustInfo, Long>  baseDAO=new JPABaseDAO<OcrmFCiAttentionCustInfo, Long>(OcrmFCiAttentionCustInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }
	   
	   public Object save(Object model,String sss) {
		   OcrmFCiAttentionCustInfo ocrmFCiAttentionCustInfo=(OcrmFCiAttentionCustInfo)model;
		   AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		   String currenUserId = auth.getUserId();
			   ocrmFCiAttentionCustInfo.setCustId(sss);
			   ocrmFCiAttentionCustInfo.setCreateDate(new Date());
			   ocrmFCiAttentionCustInfo.setUserId(currenUserId);

		
	    return super.save(ocrmFCiAttentionCustInfo);

	}
}
