package com.xywz.cust.service;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.xywz.cust.model.XywzCustCustContact;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 银行管理Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzCustContactService extends CommonService {
   
	public XywzCustContactService(){
		JPABaseDAO<XywzCustCustContact, Long>  baseDAO = new JPABaseDAO<XywzCustCustContact, Long>();  
		super.setBaseDAO(baseDAO);
	}
	
	@Override
	public Object save(Object model){
		XywzCustCustContact xywzCustCustContact =(XywzCustCustContact) model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Date date = new Date();
		//DateFormat format=new SimpleDateFormat("yyyyMMddHHmmss");
		DateFormat format1=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String lastModifyTime=format1.format(date);
		if(xywzCustCustContact.getCustContcrId()==null){//没有则新增
			xywzCustCustContact.setSetupTm(lastModifyTime);		     //自动获取新增日期	
		}
		return super.save(xywzCustCustContact);
	}


}


