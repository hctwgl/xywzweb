package com.xywztech.bcrm.finService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.finService.model.OcrmFFmRiskParam;
import com.xywztech.bob.common.JPABaseDAO;

@Service
@SuppressWarnings("unchecked")
@Transactional(value = "postgreTransactionManager")
public class AssessParamService {
	private JPABaseDAO baseDAO;

	public JPABaseDAO getBaseDAO() {
		return baseDAO;
	}

	@Autowired
	public void setBaseDAO(JPABaseDAO baseDAO) {
		this.baseDAO = baseDAO;
	}

	public void saveAssessParam(OcrmFFmRiskParam o) {
		this.baseDAO.merge(o);
		this.baseDAO.flush();

	}
}
