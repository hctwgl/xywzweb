package com.xywztech.bcrm.serviceManage.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.serviceManage.model.AppointmentInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 签约管理Service
 * @author yuyz
 * @since 2012-12-05 
 */
@Service
public class AppointmentManageService extends CommonService {
   
   public AppointmentManageService(){
	   JPABaseDAO<AppointmentInfo, Long>  baseDAO=new JPABaseDAO<AppointmentInfo, Long>(AppointmentInfo.class);  
		super.setBaseDAO(baseDAO);
	}
   
   /**
    * 按照:orgId查询对象
    * @param orgId
    * @param value
    * @return
    */
   public Object findUniqueByRoleCode(String roleCode,Object value){
	  return super.baseDAO.findUniqueByProperty(roleCode,value );
   } 
   
   /**
    * 按照机构Name:orgName查询对象
    * @param orgName
    * @param value
    * @return
    */
   public Object findUniqueByRoleName(String orgName,Object value){
		  return super.baseDAO.findUniqueByProperty(orgName,value );
	   }
}
