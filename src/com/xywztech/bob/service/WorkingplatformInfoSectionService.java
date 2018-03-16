package com.xywztech.bob.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.workplat.model.WorkingplatformInfoSection;

/**
 * @describe 资讯栏目信息
 * @author WillJoe
 * 
 */
@Service
@Transactional(value="postgreTransactionManager")
public class WorkingplatformInfoSectionService {

	private EntityManager em;

	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	/**
	 * 保存：包括新增和修改
	 * 
	 * @param wis
	 */
	public void save(WorkingplatformInfoSection wis) {
		if (wis.getSectionId() == null) {
			em.persist(wis);
		} else
			em.merge(wis);
	}

	/**
	 * 移除记录
	 * 
	 * @param id
	 */
	public void remove(Long id) {
		em.remove(em.find(WorkingplatformInfoSection.class, id));
	}

	/**
	 * 查找记录
	 * 
	 * @param id
	 * @return
	 */
	public WorkingplatformInfoSection find(Long id) {
		return em.find(WorkingplatformInfoSection.class, id);
	}

	/**
	 * 查看所有记录
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<WorkingplatformInfoSection> findAll() {
		String wisFindAll = "select wis from WorkingplatformInfoSection wis";
		Query wisQuery = em.createQuery(wisFindAll);
		return wisQuery.getResultList();
	}
}
