package com.xywztech.bcrm.product.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.product.model.OcrmFPdProdProperty;

/**
 * 产品特征项
 * 
 * @author Administrator
 * 
 */
@Service
@Transactional(value="postgreTransactionManager")
public class ProductPropertyService {

    private EntityManager em;

    @PersistenceContext
    public void setEntityManager(EntityManager em) {
        this.em = em;
    }

    /**
     * 保存：包括新增和修改
     * 
     * @param ppm
     */
    public void save(OcrmFPdProdProperty ppm) {
        if (ppm.getId() == null) {
            em.persist(ppm);
        } else
            em.merge(ppm);
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
            em.remove(em.find(OcrmFPdProdProperty.class, id));
        }
    }

    /**
     * 查看记录
     * 
     * @param id
     * @return
     */
    public OcrmFPdProdProperty find(Long id) {
        return em.find(OcrmFPdProdProperty.class, id);
    }

    /**
     * 查看所有记录
     * 
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<OcrmFPdProdProperty> findAll() {
        String ppmFindAll = "select ppm from OcrmFPdProdProperty ppm";
        Query ppmQuery = em.createQuery(ppmFindAll);
        return ppmQuery.getResultList();
    }
}


