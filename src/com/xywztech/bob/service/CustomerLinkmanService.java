package com.xywztech.bob.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bob.model.CustomerLinkman;

/**
 * 客户视图—>客户联系人信息
 * @author Administrator
 *
 */
@Service
@Transactional(value="postgreTransactionManager")
public class CustomerLinkmanService {
	
    private EntityManager em;

    @PersistenceContext
    public void setEntityManager(EntityManager em) {
        this.em = em;
    }

    /**
     * 保存：包括新增和修改
     * 
     * @param cl
     */
    public void save(CustomerLinkman cl) {
        if (cl.getID() == null) {
            em.persist(cl);
        } else
            em.merge(cl);
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
            
            em.remove(em.find(CustomerLinkman.class, id));
        }
    }

    /**
     * 查看记录
     * 
     * @param id
     * @return
     */
    public CustomerLinkman find(Long id) {
        return em.find(CustomerLinkman.class, id);
    }

    /**
     * 查看所有记录
     * 
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<CustomerLinkman> findAll() {
        String clFindAll = "select cl from CustomerLinkman cl";
        Query clQuery = em.createQuery(clFindAll);
        return clQuery.getResultList();
    }
}