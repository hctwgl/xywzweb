package com.xywztech.bcrm.sales.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.sales.model.OcrmFCiMktModelManage;

@Service
@Transactional(value="postgreTransactionManager")
public class ActivityChannelModelService {

	private EntityManager em;
	
	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	// 查询渠道模板列表
	@SuppressWarnings("unchecked")
	public List<OcrmFCiMktModelManage> findAll() {
		Query query = getEntityManager().createQuery(
				"select ma FROM OcrmFCiMktModelManage ma");
		return query.getResultList();
	}

	// 根据mktActiId是否为空进行新增或者修改渠道模板
	public void save(OcrmFCiMktModelManage mktModel) {
		if (mktModel.getModelId() == null) {
			em.persist(mktModel);
		} else {
			// 修改
			em.merge(mktModel);
		}
	}

	//批量删除渠道模板
	public void batchRemove(String idStr) {
		String[] strarray = idStr.split(",");
		for (int i = 0; i < strarray.length; i++) {
			long id = Long.parseLong(strarray[i]);
			OcrmFCiMktModelManage mktModelService = find(id);
			if (mktModelService != null) {
				em.remove(mktModelService);
			}
		}
	}
	
	// 删除渠道模板
	public void remove(long id) {
		OcrmFCiMktModelManage mktModel = find(id);
		if (mktModel != null) {
			em.remove(mktModel);
		}
	}
	private EntityManager getEntityManager() {
		return em;
	}

	public OcrmFCiMktModelManage find(long id) {
		return em.find(OcrmFCiMktModelManage.class, id);
	}

}
