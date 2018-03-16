package com.xywz.logi.service;


import org.springframework.stereotype.Service;
import com.xywz.logi.model.XywzLogiPortInfoMgmt;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;



/**
 * 外协加工产品信息管理Service
 * @author 
 * @since 
 */
@Service
public class XywzLogiPortInfoMgmtService extends CommonService {
   
	public XywzLogiPortInfoMgmtService(){
		JPABaseDAO<XywzLogiPortInfoMgmt, Long>  baseDAO = new JPABaseDAO<XywzLogiPortInfoMgmt, Long>();  
		super.setBaseDAO(baseDAO);
	}

	/*
	public Object save(Object model){
		XywzLogiPortInfoMgmt xywzLogiPortInfoMgmt =(XywzLogiPortInfoMgmt) model;
		//AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Date date = new Date();
		DateFormat format1=new SimpleDateFormat("yyyyMMddHHmmss");
		String portId=format1.format(date);
		if(xywzLogiPortInfoMgmt.getPortId()==null){//没有则新增
			xywzLogiPortInfoMgmt.setPortId(portId);  //录入人ID
		}
		return super.save(xywzLogiPortInfoMgmt);
	}
    */

}


