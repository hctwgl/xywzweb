package com.xywztech.bcrm.sales.service;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.sales.model.MarketActivity;
import com.xywztech.bcrm.sales.model.MarketPlan;
import com.xywztech.bcrm.sales.model.PlanCustomer;
import com.xywztech.bob.vo.AuthUser;

@Service
@Transactional(value="postgreTransactionManager")
public class MarketPlanService{
	
	private EntityManager em;
	
	@Autowired
	private PlanCustomerService planCustomerService;
	
	@Autowired
	private MarketActivityService marketActivityService;
	
	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	// 查询营销计划列表
	@SuppressWarnings("unchecked")
	public List<MarketPlan> findAll() {
		Query query = getEntityManager().createQuery("select mp FROM MarketPlan mp");
        return query.getResultList();
	}

	// 根据plaId是否为空进行新增或者修改营销计划
	public void save(MarketPlan marketPlan) {
		
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
		Date date = new Date(); 
		marketPlan.setUpdateUser(currenUserId);
		marketPlan.setUpdateDate(date);
		marketPlan.setMarketPlanStatement("1");
		if (marketPlan.getPlanId() == null) {
			//新增
			marketPlan.setCreateUser(currenUserId);
			marketPlan.setCreateDate(date);
			em.persist(marketPlan);
		} else {
			//修改
			em.merge(marketPlan);
		}
	}
	//批量删除营销计划
	public void batchRemove(String idStr) {
		String[] strarray = idStr.split(",");
		for (int i = 0; i < strarray.length; i++) {
			long id = Long.parseLong(strarray[i]);
			MarketPlan marketPlan = find(id);
			if (marketPlan != null) {
				em.remove(marketPlan);
			}
		}
	}
	
	// 删除营销计划
    public void remove(long id) {
    		MarketPlan marketPlan = find(id);
        	if (marketPlan != null) {
            em.remove(marketPlan);
		}
    }
    
    //关闭营销计划
    public void closePlan(MarketPlan marketPlan)
    {
    	if (marketPlan.getPlanId() != null)
    	{
    		
    	Date currDate = new Date();	
    	AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();	
        
    	//设置为关闭状态
    	marketPlan.setMarketPlanStatement("3");
    	//设置关闭日期
    	marketPlan.setActualEndDate(currDate);
    	
    	marketPlan.setUpdateDate(currDate);
    	marketPlan.setUpdateUser(currenUserId);
    	em.merge(marketPlan);
    	}
    }

    //批量创建营销活动
	public void saveActivity(MarketPlan marketPlan)
    {
		if (marketPlan.getPlanId() != null) {
			
			String marketActivityName;
			
			Date currDate = new Date();
			AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	        String currenUserId = auth.getUserId();
			
			PlanCustomer planCustomer = new PlanCustomer();
			
			long planId = marketPlan.getPlanId(); 
			String planName = marketPlan.getPlanName();
			Date planStartDate = marketPlan.getPlanStartDate();
			Date planEndDate = marketPlan.getPlanEndDate();
			
			List<PlanCustomer> custList = planCustomerService.findAll(String.valueOf(planId));
			for(int i=0;i<custList.size();i++)
			{
				MarketActivity marketActivity = new MarketActivity();
				marketActivity.setUpdateDate(currDate);
				marketActivity.setUpdateUser(currenUserId);
				marketActivity.setCreateDate(currDate);
				marketActivity.setCreateUser(currenUserId);
				
				marketActivity.setPlanId(planId);
				marketActivity.setPlanName(planName);
				marketActivity.setActivityStartDate(planStartDate);
				marketActivity.setActivityEndDate(planEndDate);
				
				planCustomer = custList.get(i);
				
				marketActivityName = "客户“"+planCustomer.getCustomerName()+"”关于计划"+marketPlan.getPlanName()+"”的营销活动";
				marketActivity.setMarketActivityName(marketActivityName);
				
				marketActivity.setActivityCustomerId(planCustomer.getCustomerId());
				marketActivity.setActivityCustomerName(planCustomer.getCustomerName());
				marketActivity.setActivityOperaterId(planCustomer.getExecutor());
				
				marketActivityService.save(marketActivity);
			}
			//营销计划 执行中 状态
			marketPlan.setMarketPlanStatement("2");
			marketPlan.setUpdateDate(currDate);
			marketPlan.setUpdateUser(currenUserId);
			em.merge(marketPlan);
			
			
		}
    }
    
	private EntityManager getEntityManager() {
		return em;
	}

	public MarketPlan find(long id) {
		return em.find(MarketPlan.class, id);
	}

}
