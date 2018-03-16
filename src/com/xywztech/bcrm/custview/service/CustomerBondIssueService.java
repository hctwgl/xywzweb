package com.xywztech.bcrm.custview.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.custview.model.CustomerBondIssue;


/**
 * 债券发行信息服务
 * 
 */
@Service
@Transactional(value="postgreTransactionManager")
public class CustomerBondIssueService {

    private EntityManager em;

    @PersistenceContext
    public void setEntityManager(EntityManager em) {
        this.em = em;
    }

    /**
     * 保存：包括新增和修改
     * 
     * @param cbi
     */
    public void save(CustomerBondIssue cbi) {
        if (cbi.getMXTID() == null) {
            em.persist(cbi);
        } else
            em.merge(cbi);
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
            em.remove(em.find(CustomerBondIssue.class, id));
        }
    }

    /**
     * 查看记录
     * 
     * @param id
     * @return
     */
    public CustomerBondIssue find(Long id) {
        return em.find(CustomerBondIssue.class, id);
    }

    /**
     * 查看所有记录
     * 
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<CustomerBondIssue> findAll() {
        String cbiFindAll = "select cbi from CustomerBondIssue cbi";
        Query cbiQuery = em.createQuery(cbiFindAll);
        return cbiQuery.getResultList();
    }
}
