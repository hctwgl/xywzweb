package com.xywztech.bob.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bob.model.CustomerInvestment;

/**
 * 客户视图->对外股权投资情况
 * 
 * 
 */
@Service
@Transactional(value="postgreTransactionManager")
public class CustomerInvestmentService {

    private EntityManager em;

    @PersistenceContext
    public void setEntityManager(EntityManager em) {
        this.em = em;
    }

    /**
     * 保存：包括新增和修改
     * 
     * @param ci
     */
    public void save(CustomerInvestment ci) {
        if (ci.getMXTID() == null) {
            em.persist(ci);
        } else
            em.merge(ci);
    }

    /**
     * 移除记录
     * 
     * @param id
     */
    public void remove(String idStr) {
        String[] strarray = idStr.split(",");
        for (int i = 0; i < strarray.length; i++) {
            long id = Long.parseLong(strarray[i]);
            em.remove(em.find(CustomerInvestment.class, id));
        }
    }

    /**
     * 查看记录
     * 
     * @param id
     * @return
     */
    public CustomerInvestment find(Long id) {
        return em.find(CustomerInvestment.class, id);
    }

    /**
     * 查看所有记录
     * 
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<CustomerInvestment> findAll() {
        String ciFindAll = "select ci from CustomerInvestment ci";
        Query ciQuery = em.createQuery(ciFindAll);
        return ciQuery.getResultList();
    }

}