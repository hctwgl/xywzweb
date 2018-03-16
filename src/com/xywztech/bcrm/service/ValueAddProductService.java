package com.xywztech.bcrm.service;

import java.util.Date;

import javax.persistence.Query;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.OcrmFCiIncproductInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

@Service
public class ValueAddProductService extends CommonService{
	
	   public ValueAddProductService(){
		   JPABaseDAO<OcrmFCiIncproductInfo, Long>  baseDAO=new JPABaseDAO<OcrmFCiIncproductInfo, Long>(OcrmFCiIncproductInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }
	// 根据recordeId是否为空进行新增或者修改渠道
	@Override
	public Object save(Object model) {
		OcrmFCiIncproductInfo ocrmFCiIncproductInfo=(OcrmFCiIncproductInfo)model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
//        String currenOrgId = auth.getUnitId();
        if(isExist(ocrmFCiIncproductInfo.getServerId())){
        	ocrmFCiIncproductInfo.setUpdateUser(currenUserId);
			ocrmFCiIncproductInfo.setUpdateDate(new Date());
        }else{
        	ocrmFCiIncproductInfo.setCreateUser(currenUserId);
        	ocrmFCiIncproductInfo.setCreateDate(new Date());
        	ocrmFCiIncproductInfo.setUpdateUser(currenUserId);
        	ocrmFCiIncproductInfo.setUpdateDate(new Date());
        }
			return super.save(ocrmFCiIncproductInfo);

	}
	//根据主键判断对象是否已经存在
	public boolean isExist(Long serverId){
		String JQL = "select t from OcrmFCiIncproductInfo t where t.serverId= ?1";
		Query q = em.createQuery(JQL);
		q.setParameter(1, serverId);
		int flag = q.getFirstResult();
		if(flag > -1)
			return true;
		else
			return false;
	}
	//批量删除
//	public void batchRemove(String idStr) {
//		super.batchRemove(idStr);
//	}
}
