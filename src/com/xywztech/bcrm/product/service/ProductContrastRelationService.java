package com.xywztech.bcrm.product.service;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.product.model.OcrmFPdProdItemRel;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 产品对照关系service
 * @author ZSXIN
 *
 */
@Service
public class ProductContrastRelationService extends CommonService{
	
	   public ProductContrastRelationService(){
		   JPABaseDAO<OcrmFPdProdItemRel, String>  baseDAO=new JPABaseDAO<OcrmFPdProdItemRel, String>(OcrmFPdProdItemRel.class);  
		   super.setBaseDAO(baseDAO);
	   }
	   /**
	    * 删除的方法
	    * @param idStr
	    */
	   public void remove(String idStr){
	       em.remove(em.find(OcrmFPdProdItemRel.class, idStr));
	   }
	
}
