package com.xywz.cust.service;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.xywz.cust.model.XywzCustCustInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 银行管理Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzCustCustInfoService extends CommonService {
   
	public XywzCustCustInfoService(){
		JPABaseDAO<XywzCustCustInfo, Long>  baseDAO = new JPABaseDAO<XywzCustCustInfo, Long>();  
		super.setBaseDAO(baseDAO);
	}
	
	@Override
	public Object save(Object model){
		XywzCustCustInfo xywzCustCustInfo =(XywzCustCustInfo) model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Date date = new Date();
		DateFormat format=new SimpleDateFormat("yyyyMMddHHmmss");
		DateFormat format1=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String lastModifyTime=format1.format(date);
		//String custNo=format.format(date);
		//System.out.println(time);
		if(xywzCustCustInfo.getCustId()==null){//没有则新增
			String custNo1=format.format(date);
			xywzCustCustInfo.setCustNo(custNo1);  //录入人ID	
			xywzCustCustInfo.setInputPersNm(auth.getUsername()); //自动获取系统登陆人名称
			xywzCustCustInfo.setInputDt(new Date());		     //自动获取新增日期	
			xywzCustCustInfo.setSetupDt(new Date());
		}else{
			xywzCustCustInfo.setFinalModiDt(lastModifyTime);
			xywzCustCustInfo.setModiDt(new Date());
		}
		return super.save(xywzCustCustInfo);
	}


}


