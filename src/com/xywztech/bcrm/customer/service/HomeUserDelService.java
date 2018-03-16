package com.xywztech.bcrm.customer.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.custview.model.AcrmFCiCreditVillageCust;


@Service
@Transactional(value = "postgreTransactionManager")
public class HomeUserDelService {
	private EntityManager em;

	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	// 删除
	public void remove(JSONArray jarray) {
		if (jarray.size() > 0) {
			for (int i = 0; i < jarray.size(); i++) {
				String custId = jarray.get(i).toString();
				AcrmFCiCreditVillageCust villageCust = em.find(AcrmFCiCreditVillageCust.class, custId);
				/*
				 * Query q =em.createQuery(
				 * "select c from CustomerRelateCustomerBase2 c where c.customerBaseId=?1 "
				 * ); q.setParameter(1,id); List<CustomerRelateCustomerBase2>
				 * list= q.getResultList(); for(int n=0;n< list.size();n++){
				 * CustomerRelateCustomerBase2 customerRelateCustomerBase2 =
				 * em.find(CustomerRelateCustomerBase2.class,
				 * list.get(i).getId()); em.remove(customerRelateCustomerBase2);
				 * }
				 */
				if (villageCust != null) {
					em.remove(villageCust);
				}
			}
		}
	}
}
