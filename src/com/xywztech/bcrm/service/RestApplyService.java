package com.xywztech.bcrm.service;

import javax.sql.DataSource;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.RestApply;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


@Service
//@Transactional(value="postgreTransactionManager")
public class RestApplyService extends CommonService {

	@SuppressWarnings("unused")
	private DataSource dsOracle;

	public RestApplyService() {
		JPABaseDAO<RestApply, Long> baseDAO = new JPABaseDAO<RestApply, Long>(
				RestApply.class);
		super.setBaseDAO(baseDAO);
	}

}
