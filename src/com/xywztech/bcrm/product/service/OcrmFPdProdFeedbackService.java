package com.xywztech.bcrm.product.service;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.product.model.OcrmFPdProdFeedback;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class OcrmFPdProdFeedbackService extends CommonService{
	private EntityManager em;
	public OcrmFPdProdFeedbackService(){
		JPABaseDAO<OcrmFPdProdFeedback,Long> baseDao = new JPABaseDAO<OcrmFPdProdFeedback,Long>(OcrmFPdProdFeedback.class);
		super.setBaseDAO(baseDao);
		
	}
  public void remove(String id){
		
	  OcrmFPdProdFeedback model = em.find(OcrmFPdProdFeedback.class, id);
		if(model!=null){
			em.remove(model);
		}
	}
}
