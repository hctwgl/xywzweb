package com.xywztech.bcrm.sales.service;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.sales.model.ActivityAppraise;
import com.xywztech.bob.vo.AuthUser;

@Service
@Transactional(value="postgreTransactionManager")
public class ActivityAppraiseService {
	
	private EntityManager em;

	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	// 查询营销活动关联的评价
	@SuppressWarnings("unchecked")
	public List<ActivityAppraise> findAll(String activityId) {
		if(activityId != null)
		{
		long activityIdLong = Long.parseLong(activityId);
		Query query = getEntityManager().createQuery("select ar FROM ActivityAppraise ar where ar.marketActivityId = "+activityIdLong);
        return query.getResultList();
		}
		return null;
	}

	// 根据appraiseId是否为空进行新增或者修改活动评价
	public void save(ActivityAppraise activityAppraise) {
	    
		Integer score=activityAppraise.getActiPertinentyScore()+activityAppraise.getActiSflScore()+activityAppraise.getActiCompetScore()+
		activityAppraise.getActiCustRefScore()+activityAppraise.getActiMktInfluenceScore();
        AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
		Date date = new Date();     
        activityAppraise.setUpdateUser(currenUserId);
        activityAppraise.setUpdateDate(date);  
        activityAppraise.setScore(score);
     
        
		if (activityAppraise.getAppraiseId() == null) {
		    //新增
	        activityAppraise.setCreateUser(currenUserId);
	        activityAppraise.setCreateDate(date);
	        activityAppraise.setScore(score);
			em.persist(activityAppraise);
		}
		else
		{
		   //修改
            em.merge(activityAppraise);
		}
	}
	
	// 删除活动评价
	public void remove(long id) {
		ActivityAppraise activityAppraise = find(id);
    	if (activityAppraise != null) {
        em.remove(activityAppraise);
    	}
	}
	
	//批量删除活动记录评价
	public void batchRemove(String idStr) {
		String[] strarray = idStr.split(",");
		for (int i = 0; i < strarray.length; i++) {
			long id = Long.parseLong(strarray[i]);
			ActivityAppraise activityAppraise = find(id);
			if (activityAppraise != null) {
				em.remove(activityAppraise);
			}
		}
	}
		
	private EntityManager getEntityManager() {
		return em;
	}

	public ActivityAppraise find(long id) {
		return em.find(ActivityAppraise.class, id);
	}
}
