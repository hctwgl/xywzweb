package com.xywztech.bcrm.custview.service;

import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.AcrmFCiCustRale;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

@Service
public class CustRelInfoService extends CommonService{
	
	   public CustRelInfoService(){
		   JPABaseDAO<AcrmFCiCustRale, Long>  baseDAO=new JPABaseDAO<AcrmFCiCustRale, Long>(AcrmFCiCustRale.class);  
		   super.setBaseDAO(baseDAO);
	   }
	   
	   public Object saveCustInfo(AcrmFCiCustRale acrmFCiCustRale) throws Exception {
		   AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		   String currenUserId = auth.getCname();
		   String currenOrgId = auth.getUnitName();
		   if (acrmFCiCustRale.getMxtid() == null) { //新增
			   acrmFCiCustRale.setCreateUser(currenUserId);
			   acrmFCiCustRale.setCreateDate(new Date());
			   acrmFCiCustRale.setCreateOrg(currenOrgId);
		}
	    return super.save(acrmFCiCustRale);
	}
}
