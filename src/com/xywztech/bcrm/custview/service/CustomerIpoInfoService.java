package com.xywztech.bcrm.custview.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.custview.model.CustomerIpoInfo;


/**
 * 客户视图->股票发行信息
 * 
 * @author Administrator
 * 
 */
@Service
@Transactional(value="postgreTransactionManager")
public class CustomerIpoInfoService {

    private EntityManager em;

    @PersistenceContext
    public void setEntityManager(EntityManager em) {
        this.em = em;
    }

    /**
     * 保存：包括新增和修改
     * 
     * @param cii
     */
    public void save(CustomerIpoInfo cii) {
        if (cii.getMXTID() == null) {
            em.persist(cii);
        } else
            em.merge(cii);
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
            em.remove(em.find(CustomerIpoInfo.class, id));
        }
    }

    /**
     * 查看记录
     * 
     * @param id
     * @return
     */
    public CustomerIpoInfo find(Long id) {
        return em.find(CustomerIpoInfo.class, id);
    }

    /**
     * 查看所有记录
     * 
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<CustomerIpoInfo> findAll() {
        String ciiFindAll = "select cii from CustomerIpoInfo cii";
        Query ciiQuery = em.createQuery(ciiFindAll);
        return ciiQuery.getResultList();
    }
}