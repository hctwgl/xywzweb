package com.xywz.sale.service;


import org.springframework.stereotype.Service;

import com.xywz.sale.model.XywzSaleInvMerchdDtl;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 外贸发票商品明细Service
 * @author 
 * @since 2015-10-08 
 */
@Service
public class XywzSaleInvMerchdDtlService extends CommonService {
   
	public XywzSaleInvMerchdDtlService(){
		JPABaseDAO<XywzSaleInvMerchdDtl, Long>  baseDAO = new JPABaseDAO<XywzSaleInvMerchdDtl, Long>(XywzSaleInvMerchdDtl.class);  
		super.setBaseDAO(baseDAO);
	}
	



}


