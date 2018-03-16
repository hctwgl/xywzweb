package com.xywztech.bob.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bob.model.PlanProduct;
import com.xywztech.bob.vo.AuthUser;

@Service
@Transactional(value="postgreTransactionManager")
public class PlanProductService {
	
	@Autowired
	private CommonQueryService cqs ;
	
	private EntityManager em;

	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	// 查询营销计划关联的产品
	@SuppressWarnings("unchecked")
	public List<PlanProduct> findAll(String planId) {
		if(planId != null)
		{			
			long planIdLong = Long.parseLong(planId);
			Query query = getEntityManager().createQuery("select pp FROM PlanProduct pp where pp.planId = "+planIdLong);
			return query.getResultList();
		}
		return null;
	}

	// 新增产品
	public void save(PlanProduct planProduct) {
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
		if (planProduct.getProductDetailId() == null) {
		    planProduct.setCreateDate(new Date());
		    planProduct.setCreateUser(currenUserId);
			em.persist(planProduct);
		} 
	}

	// 删除产品
	public void remove(long id) {
			PlanProduct planProduct = find(id);
	    	if (planProduct != null) {
	        em.remove(planProduct);
	    	}
		}
	
	//批量删除产品
	public void batchRemove(String idStr) {
		String[] strarray = idStr.split(",");
		for (int i = 0; i < strarray.length; i++) {
			long id = Long.parseLong(strarray[i]);
			PlanProduct planProduct = find(id);
			if (planProduct != null) {
				em.remove(planProduct);
			}
		}
	}


	private EntityManager getEntityManager() {
		return em;
	}
	public PlanProduct find(long id) {
		return em.find(PlanProduct.class, id);
	}
	
	//批量新增名单关联的客户
	@SuppressWarnings("unchecked")
	public void batchAdd(String idStr,String rollId) throws Exception     {
		if (idStr != null && rollId != null) {
			
			Date currDate = new Date();
			
			AuthUser auth=(AuthUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	        
			String currenUserId = auth.getUserId();
			StringBuilder sb = new StringBuilder(
					"select fi.PRODUCT_ID,fi.PROD_NAME from ocrm_f_pd_prod_info fi where fi.product_id in ("
							+ idStr.trim() + ")");
			cqs.setPrimaryKey("product_id");
			
			Map<String, Object> map = cqs.excuteQuery(sb.toString(),0,999999999);
			
			@SuppressWarnings("rawtypes")
			List list = (List) map.get("data");
			Map<String, Object> tempMap;
			
			String product_id;
			
			String prod_name;
			
			String id="";
			for (int i = 0; i < list.size(); i++) {
				
					tempMap = (Map<String, Object>) list.get(i);
					product_id = (String) tempMap.get("PRODUCT_ID");
					prod_name = (String) tempMap.get("PROD_NAME");
					
					PlanProduct planProduct = new PlanProduct();
					planProduct.setProductId(product_id);
					planProduct.setCreateDate(currDate);
					planProduct.setCreateUser(currenUserId);
					planProduct.setPlanId(Long.valueOf(rollId).longValue());
					planProduct.setProductName(prod_name);
					em.persist(planProduct);
				}
		}
    }

}
