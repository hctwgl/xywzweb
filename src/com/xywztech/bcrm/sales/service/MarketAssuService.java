package com.xywztech.bcrm.sales.service;

import java.math.BigDecimal;
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
import com.xywztech.bcrm.sales.model.OcrmFMmTask;
import com.xywztech.bcrm.sales.model.PlanCustomer;
import com.xywztech.bob.vo.AuthUser;

@Service
@Transactional(value = "postgreTransactionManager")
public class MarketAssuService {

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
	public List<OcrmFMmTask> findAll() {
		Query query = getEntityManager().createQuery(
				"select mp FROM OcrmFMmTask mp");
		return query.getResultList();
	}

	// 根据plaId是否为空进行新增或者修改营销计划
	public void save(OcrmFMmTask ocrmFMmTask, String id) {

		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		String currenUserId = auth.getUserId();
		Date date = new Date();
		if (ocrmFMmTask.getTaskId() == null) {
			if (ocrmFMmTask.getTaskParentId() != null) {
				// 生成下达任务（按下单人数一一对应）
				ocrmFMmTask.setTaskDistDate(date);
				ocrmFMmTask.setTaskStat("2");
				ocrmFMmTask.setDistUser(currenUserId);
				ocrmFMmTask.setDistOrg(auth.getUnitId());
				// ocrmFMmTask.setOperUser(id);
				em.persist(ocrmFMmTask);

				// 将上级任务设置为【已下达】
				// long tempId = ocrmFMmTask.getTaskParentId();
				BigDecimal tempId = ocrmFMmTask.getTaskParentId();
				OcrmFMmTask ws2 = em.find(OcrmFMmTask.class, tempId);
				ws2.setTaskStat("3");
				ws2.setTaskDistDate(date);
				ws2.setDistUser(currenUserId);
				em.merge(ws2);

			} else {
				// 新增
				ocrmFMmTask.setCreateUser(currenUserId);
				ocrmFMmTask.setCreateDate(date);
				ocrmFMmTask.setTaskStat("1");
				em.persist(ocrmFMmTask);
			}
		} else {
			// 修改
			em.merge(ocrmFMmTask);
		}
	}

	// 删除营销计划
	public void remove(long id) {
		OcrmFMmTask ocrmFMmTask = find(id);
		if (ocrmFMmTask != null) {
			em.remove(ocrmFMmTask);
		}
	}

	// 删除营销计划
	public void oper(long id) {
		OcrmFMmTask ws2 = em.find(OcrmFMmTask.class, id);
		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		String currenUserId = auth.getUserId();
		String currenUserUnit = auth.getUnitId();
		if (ws2 != null) {
			ws2.setTaskStat("3");
			// ws2.setOperUser(currenUserId);
			// ws2.setOperOrg(currenUserUnit);
			ws2.setDistUser(auth.getUsername());
			ws2.setTaskDistDate(new Date());
		}
	}

	// 关闭营销任务
	public void closePlan(OcrmFMmTask ocrmFMmTask) {
		if (ocrmFMmTask.getTaskId() != null) {

			Date currDate = new Date();
			// AuthUser auth=(AuthUser)
			// SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			// String currenUserId = auth.getUserId();
			// ocrmFMmTask.setTaskEndDate(currDate);
			// ocrmFMmTask.setTaskStat("5");
			em.merge(ocrmFMmTask);
		}
	}

	// 批量创建营销活动
	public void saveActivity(OcrmFMmTask ocrmFMmTask) {
		if (ocrmFMmTask.getTaskId() != null) {

			Date currDate = new Date();
			AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
					.getAuthentication().getPrincipal();
			String currenUserId = auth.getUserId();

			PlanCustomer planCustomer = new PlanCustomer();

			Long id = ocrmFMmTask.getTaskId();
			// String planName = marketPlan.getPlanName();
			// Date planStartDate = marketPlan.getPlanStartDate();
			// Date planEndDate = marketPlan.getPlanEndDate();

			List<PlanCustomer> custList = planCustomerService.findAll(String
					.valueOf(id));
			for (int i = 0; i < custList.size(); i++) {
				MarketActivity marketActivity = new MarketActivity();
				marketActivity.setUpdateDate(currDate);
				marketActivity.setUpdateUser(currenUserId);
				marketActivity.setCreateDate(currDate);
				marketActivity.setCreateUser(currenUserId);

				planCustomer = custList.get(i);

				marketActivity.setActivityCustomerId(planCustomer
						.getCustomerId());
				marketActivity.setActivityCustomerName(planCustomer
						.getCustomerName());
				marketActivity
						.setActivityOperaterId(planCustomer.getExecutor());

				marketActivityService.save(marketActivity);
			}
			// 营销计划 执行中 状态
			// marketPlan.setMarketPlanStatement("2");
			// marketPlan.setUpdateDate(currDate);
			// marketPlan.setUpdateUser(currenUserId);
			save(ocrmFMmTask, "0");

		}
	}

	private EntityManager getEntityManager() {
		return em;
	}

	public OcrmFMmTask find(long id) {
		return em.find(OcrmFMmTask.class, id);
	}

}
