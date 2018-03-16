package com.xywztech.bcrm.product.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.product.model.ProductFeatureValue;
/**
 * yaoliang
 * 2011-08-30
 * */
@Service
@Transactional(value="postgreTransactionManager")
public class ProductFeatureValueService {

	@PersistenceContext
	private EntityManager em;
	/**
	 * 保存
	 * */
	public void saveFeatureValue(ProductFeatureValue productFeatureValue){
		if(productFeatureValue.getFeatureValueId()==null){
			em.persist(productFeatureValue);
		}else{
			em.merge(productFeatureValue);
		}
	}
	
	public ProductFeatureValue getProductFeatureValue(Long id){
		
		return em.find(ProductFeatureValue.class, id);
	}
	
	public void deleteFeatureValue(Long featureValueId){
		
		ProductFeatureValue productFeatureValue = em.find(ProductFeatureValue.class, featureValueId);
		if(productFeatureValue!=null){
			em.remove(productFeatureValue);
		}
	}
	
	public void getFeatureValueList(){
		
		
	}
	
	
}
