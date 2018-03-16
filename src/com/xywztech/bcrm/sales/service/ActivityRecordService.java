package com.xywztech.bcrm.sales.service;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.sales.model.ActivityRecord;
import com.xywztech.bob.vo.AuthUser;

@Service
@Transactional(value="postgreTransactionManager")
public class ActivityRecordService {
	
	private EntityManager em;

	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	// 查询营销活动关联的活动记录
	@SuppressWarnings("unchecked")
	public List<ActivityRecord> findAll(String activityId) {
		if(activityId != null)
		{
		long activityIdLong = Long.parseLong(activityId);
		Query query = getEntityManager().createQuery(
				"select ar from ActivityRecord ar where ar.marketActivityId = "+activityIdLong);
		return query.getResultList();
		}
		return null;
        
	}

	// 根据recordeId是否为空进行新增或者修改活动记录
	public void save(ActivityRecord activityRecord) {
	    
        AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
		Date date = new Date();
        activityRecord.setUpdateUser(currenUserId);
        activityRecord.setUpdateDate(date);
        
		if (activityRecord.getRecordId() == null) {
		    //新增
	        activityRecord.setCreateUser(currenUserId);
	        activityRecord.setCreateDate(date);
			em.persist(activityRecord);
		}
		else
		{
		   //修改
            em.merge(activityRecord);
		}
	}
	
	// 删除活动记录
	public void remove(long id) {
		ActivityRecord activityRecord = find(id);
    	if (activityRecord != null) {
        em.remove(activityRecord);
    	}
	}
	
	//批量删除活动记录
	public void batchRemove(String idStr) {
		String[] strarray = idStr.split(",");
		for (int i = 0; i < strarray.length; i++) {
			long id = Long.parseLong(strarray[i]);
			ActivityRecord activityRecord = find(id);
			if (activityRecord != null) {
				em.remove(activityRecord);
			}
		}
	}
		
	private EntityManager getEntityManager() {
		return em;
	}

	public ActivityRecord find(long id) {
		return em.find(ActivityRecord.class, id);
	}
}
