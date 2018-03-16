/**
 * 
 */
package com.xywztech.bcrm.product.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.product.model.ProductCategory;
import com.xywztech.bob.vo.AuthUser;

/**
 * @author yaoliang
 * 2011-08-24
 * 产品种类Service
 *
 */
@Service
@Transactional(value="postgreTransactionManager")
public class ProductKindsService {
	
	
	EntityManager em;
	@PersistenceContext
	public void setEm(EntityManager em){
		
		this.em = em;
	}	

	@SuppressWarnings("unchecked")
	public List<ProductCategory> getProductKindsList(){
		
		StringBuffer sb = new StringBuffer ("select productKinds from ProductCategory  productKinds  ");
		
		Query query = em.createQuery(sb.toString());
		
		return query.getResultList();
	}
	
	public void saveProductKinds(ProductCategory productKinds){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if(productKinds.getCatlCode() == null){
			
			ProductCategory parentCate = getProductKinds(productKinds.getCatlParent());
			if(parentCate == null){
				em.persist(productKinds);	
				auth.setPid(productKinds.getCatlCode().toString());
				
			}else
			{
				em.persist(parentCate);
				em.persist(productKinds);	
				auth.setPid(productKinds.getCatlCode().toString());

			}
		}else{
			em.merge(productKinds);
		}
	}
	
	public ProductCategory getProductKinds(String caltCode){
		return em.find(ProductCategory.class, caltCode);
	}
	
	public void deleteProductKinds(String caltCode){		
		ProductCategory productKinds = em.find(ProductCategory.class, caltCode);
		if(productKinds != null){
			em.remove(productKinds);			
			StringBuffer sb = new StringBuffer(" select count(productCategory.catlCode) "					
					+" from ProductCategory as  productCategory where productCategory.catlParent ='"+productKinds.getCatlParent()+"'");
			Query query = em.createQuery(sb.toString());
			long count = (Long)query.getSingleResult();
			if(count == 0){
				ProductCategory parentCate = getProductKinds(productKinds.getCatlParent());
//				parentCate.setIsLeaf("Y");
				em.persist(parentCate);
			}
		}
	}
}
