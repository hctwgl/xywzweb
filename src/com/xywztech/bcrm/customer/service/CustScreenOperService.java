package com.xywztech.bcrm.customer.service;

import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.AcrmFCiCustScreen;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

/***
 * 屏蔽客户
 * @author ZM
 *
 */
@Service
public class CustScreenOperService extends CommonService{
	
	   public CustScreenOperService(){
		   JPABaseDAO<AcrmFCiCustScreen, Long>  baseDAO = new JPABaseDAO<AcrmFCiCustScreen, Long>(AcrmFCiCustScreen.class);  
		   super.setBaseDAO(baseDAO);
	   }
	   
	   public Object save(Object model,String custId) {
		   AcrmFCiCustScreen acrmFCiCustScreen=(AcrmFCiCustScreen)model;
		   AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	   	   acrmFCiCustScreen.setCustId(custId);					// 客户编号
	   	   acrmFCiCustScreen.setCreateUser(auth.getUserId());	// 创建人
	   	   acrmFCiCustScreen.setCreateDate(new Date());			// 创建时间
	   	   return super.save(acrmFCiCustScreen);
	
	   }
	   
	   @Override
	public void batchRemove(String idStr) {
			String[] strarray = idStr.split(",");
			for (int i = 0; i < strarray.length; i++) {
				long id = Long.parseLong(strarray[i]);
				AcrmFCiCustScreen acrmFCiCustScreen = new AcrmFCiCustScreen();
				acrmFCiCustScreen = em.find(AcrmFCiCustScreen.class, id);
				if (acrmFCiCustScreen != null) {
					em.remove(acrmFCiCustScreen);
				}
			}
		}
}
