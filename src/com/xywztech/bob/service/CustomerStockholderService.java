package com.xywztech.bob.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bob.model.CustomerStockholder;

/**
 * 债券发行信息服务
 * 
 */
@Service
@Transactional(value="postgreTransactionManager")
public class CustomerStockholderService {

    private EntityManager em;

    @PersistenceContext
    public void setEntityManager(EntityManager em) {
        this.em = em;
    }

    /**
     * 保存：包括新增和修改
     * 
     * @param cs
     */
    public void save(CustomerStockholder cs) {
        if (cs.getMXTID() == null) {
            em.persist(cs);
        } else
            em.merge(cs);
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
            em.remove(em.find(CustomerStockholder.class, id));
        }
    }

    /**
     * 查看记录
     * 
     * @param id
     * @return
     */
    public CustomerStockholder find(Long id) {
        return em.find(CustomerStockholder.class, id);
    }

    /**
     * 查看所有记录
     * 
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<CustomerStockholder> findAll() {
        String csFindAll = "select cs from CustomerStockholder cs";
        Query csQuery = em.createQuery(csFindAll);
        return csQuery.getResultList();
    }
}
