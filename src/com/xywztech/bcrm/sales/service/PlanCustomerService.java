package com.xywztech.bcrm.sales.service;

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

import com.xywztech.bcrm.sales.model.PlanCustomer;
import com.xywztech.bob.service.CommonQueryService;
import com.xywztech.bob.vo.AuthUser;

@Service
@Transactional(value="postgreTransactionManager")
public class PlanCustomerService {
	
	@Autowired
	private CommonQueryService cqs ;
	
	private EntityManager em;

	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	// 查询营销计划关联的客户列表
	@SuppressWarnings("unchecked")
	public List<PlanCustomer> findAll(String planId) {
		if(planId != null)
		{
		long planIdLong = Long.parseLong(planId);
		Query query = getEntityManager().createQuery(
				"select pc FROM PlanCustomer pc where pc.planId = "+planIdLong);
		return query.getResultList();
		}
		return null;
	}

	// 新增客户
	public void save(PlanCustomer planCustomer) {
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
		if (planCustomer.getPlanCustomerdetailId() == null) {
			planCustomer.setCreateDate(new Date());
			planCustomer.setCreateUser(currenUserId);
			em.persist(planCustomer);
		}
	}

	// 删除客户
	public void remove(long id) {
			PlanCustomer planCustomer = find(id);
			if (planCustomer != null) {
				em.remove(planCustomer);
			}
	}
	
	//批量删除客户
	public void batchRemove(String idStr) {
		String[] strarray = idStr.split(",");
		for (int i = 0; i < strarray.length; i++) {
			long id = Long.parseLong(strarray[i]);
			PlanCustomer planCustomer = find(id);
			if (planCustomer != null) {
				em.remove(planCustomer);
			}
		}
	}
	
	
	private EntityManager getEntityManager() {
		return em;
	}

	public PlanCustomer find(long id) {
		return em.find(PlanCustomer.class, id);
	}
	
	//批量新增名单关联的客户
	@SuppressWarnings("unchecked")
	public void batchAdd(String idStr,String rollId) throws Exception     {
		if (idStr != null && rollId != null) {
			
			Date currDate = new Date();
			
			AuthUser auth=(AuthUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	        
			String currenUserId = auth.getUserId();
			String idStrs[]=idStr.split(",");
			StringBuilder sb = new StringBuilder(
					"select cust_id,cust_zh_name from (select cust_id,cust_zh_name from OCRM_F_CI_CUST_DESC " +
					" union select cust_id,cust_zh_name from acrm_f_ci_latent_cust_info) fi" +
					" where fi.cust_id in ("
							+ idStr + ")");
			cqs.setPrimaryKey("CUST_ID");
			
			Map<String, Object> map = cqs.excuteQuery(sb.toString(),0,999999999);
			
			@SuppressWarnings("rawtypes")
			List list = (List) map.get("data");
			Map<String, Object> tempMap;
			
			String tempCustId;
			
			String tempCustName;
			
			String tempCustZzdm;
			
			String id="";
			for (int i = 0; i < list.size(); i++) {
				
					tempMap = (Map<String, Object>) list.get(i);
					tempCustId = (String) tempMap.get("CUST_ID");
					tempCustName = (String) tempMap.get("CUST_ZH_NAME");
//					tempCustZzdm = (String) tempMap.get("CUST_ZZDM");
					
					PlanCustomer plancustomer = new PlanCustomer();
					plancustomer.setCustomerId(tempCustId);
					plancustomer.setCreateDate(currDate);
					plancustomer.setCreateUser(currenUserId);
					plancustomer.setPlanId(Long.valueOf(rollId).longValue());
					plancustomer.setCustomerName(tempCustName);
					this.save(plancustomer);
				}
		}
    }
	
	//批量新增名单关联的客户
	@SuppressWarnings("unchecked")
	public void updateExecutor(String idStr,String rollId) throws Exception     {
		//system.out.printlnln("idStr");
		if (idStr != null && rollId != null) {
			
			StringBuilder sb = new StringBuilder(
					"select fi.PCDE_ID,fi.CUST_NAME,fi.CREATE_USER,fi.CUST_ID,fi.EXECUTOR,fi.PLAN_ID,fi.CREATE_DATE from OCRM_F_MM_PLAN_CUST fi where fi.pcde_ID in ("
							+ rollId + ")");
			cqs.setPrimaryKey("PCDE_ID");
			
			Map<String, Object> map = cqs.excuteQuery(sb.toString(),0,999999999);
			
			@SuppressWarnings("rawtypes")
			List list = (List) map.get("data");
			Map<String, Object> tempMap;
			
			String tempCustId;
			PlanCustomer plancustomer = null;
			for (int i = 0; i < list.size(); i++) {
				
					tempMap = (Map<String, Object>) list.get(i);
					tempCustId = (String) tempMap.get("PCDE_ID");
					plancustomer = this.find(Long.valueOf(tempCustId).longValue());
					plancustomer.setExecutor(idStr);
					this.save(plancustomer);
					
				}
		}
    }
}
