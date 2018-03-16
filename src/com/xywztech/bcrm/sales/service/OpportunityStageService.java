package com.xywztech.bcrm.sales.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.sales.model.OpportunityStage;

@Service
@Transactional(value="postgreTransactionManager")
public class OpportunityStageService {
	
	private EntityManager em;

	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	// 查询商机关联的阶段
	@SuppressWarnings("unchecked")
	public List<OpportunityStage> findAll(String oppporStageId) {
		if(oppporStageId != null)
		{
		long oppporStageIdLong = Long.parseLong(oppporStageId);
		Query query = getEntityManager().createQuery(
				"select os from OpportunityStage os where os.marketOpporId = "+oppporStageIdLong);
		return query.getResultList();
		}
		return null;
        
	}

	// 根据recordeId是否为空进行新增或者修改商机阶段
	public void save(OpportunityStage opportunityStage) {
		if (opportunityStage.getId() == null) {
		    //新增
			em.persist(opportunityStage);
		}
		else
		{
		   //修改
            em.merge(opportunityStage);
		}
	}
	
	// 删除商机阶段
	public void remove(long id) {
		OpportunityStage opportunityStage = find(id);
    	if (opportunityStage != null) {
        em.remove(opportunityStage);
    	}
	}
	
	public void batchUpdate(JSONArray jarray,JSONArray jarray2,JSONArray jarray3,JSONArray jarray4,String marketOpporId) throws ParseException{
		
	     if(jarray.size()>0)
	        {
	        	for (int i=0;i<jarray.size();i++)
	        	{  
	        		OpportunityStage opportunityStage = new OpportunityStage();
	        		
	        		opportunityStage.setId(Long.parseLong(jarray.get(i).toString()));
	        		opportunityStage.setOpportunityStage(jarray4.get(i).toString());
	        		opportunityStage.setMarketOpporId(Long.parseLong(marketOpporId));
	        		String comDateStr = jarray2.get(i).toString();
	        		if (comDateStr!=null&&!comDateStr.equals("")&&!comDateStr.equals("null")) {
	        			Date comDate = new SimpleDateFormat("yyyy-MM-dd").parse(comDateStr);
	        			opportunityStage.setStageCompleteDate(comDate);
					}
	        		opportunityStage.setStageDesc(jarray3.get(i).toString());
	        		opportunityStage.setUpdateDate(new Date());
	        		em.merge(opportunityStage);
	        	}
	        }
		
		
	}  
		
	private EntityManager getEntityManager() {
		return em;
	}

	public OpportunityStage find(long id) {
		return em.find(OpportunityStage.class, id);
	}
}
