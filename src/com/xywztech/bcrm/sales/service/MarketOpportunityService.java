package com.xywztech.bcrm.sales.service;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.sales.model.MarketOpportunity;
import com.xywztech.bob.vo.AuthUser;

@Service
@Transactional(value="postgreTransactionManager")
public class MarketOpportunityService {
	private EntityManager em;

	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	// 查询商机列表
	@SuppressWarnings("unchecked")
	public List<MarketOpportunity> findAll() {
		Query query = getEntityManager().createQuery(
				"select mo FROM MarketOpportunity mo");
		return query.getResultList();
	}

	// 根据marketOpporId是否为空进行新增或者修改活动
	public void save(MarketOpportunity marketOpportunity) {
	    
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
		Date date = new Date();
        marketOpportunity.setUpdateUser(currenUserId);
        marketOpportunity.setUpdateDate(date);
		if (marketOpportunity.getMarketOpporId() == null) {
			//新增
		    marketOpportunity.setCreateUser(currenUserId);
	        marketOpportunity.setCreateDate(date);
			em.persist(marketOpportunity);
		} else {
			//修改
			em.merge(marketOpportunity);
		}
	}

	// 删除商机
	public void remove(long id) {
		MarketOpportunity marketOpportunity = find(id);
		if (marketOpportunity != null) {
			em.remove(marketOpportunity);
		}
	}

	//分配商机
	public void assignMgr(String id,String mgr){
		long idLong = Integer.parseInt(id);
		MarketOpportunity marketOpportunity = find(idLong);
		if(marketOpportunity!=null){
			marketOpportunity.setOperUserId(mgr);
			em.merge(marketOpportunity);
		}
	}
	
	private EntityManager getEntityManager() {
		return em;
	}
	
	public MarketOpportunity find(long id) {
		return em.find(MarketOpportunity.class, id);
	}
	
}
