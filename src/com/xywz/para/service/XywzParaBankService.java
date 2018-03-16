package com.xywz.para.service;


import org.springframework.stereotype.Service;
import com.xywz.para.model.XywzParaBank;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 银行管理Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzParaBankService extends CommonService {
   
	public XywzParaBankService(){
		JPABaseDAO<XywzParaBank, Long>  baseDAO = new JPABaseDAO<XywzParaBank, Long>(XywzParaBank.class);  
		super.setBaseDAO(baseDAO);
	}


}


