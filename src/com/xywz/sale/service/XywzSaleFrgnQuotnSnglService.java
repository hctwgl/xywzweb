package com.xywz.sale.service;


import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywz.sale.model.XywzSaleFrgnQuotnSngl;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 外协加工银行管理Service
 * @author 
 * @since 2015-10-08 
 */
@Service
public class XywzSaleFrgnQuotnSnglService extends CommonService {
   
	public XywzSaleFrgnQuotnSnglService(){
		JPABaseDAO<XywzSaleFrgnQuotnSngl, Long>  baseDAO = new JPABaseDAO<XywzSaleFrgnQuotnSngl, Long>(XywzSaleFrgnQuotnSngl.class);  
		super.setBaseDAO(baseDAO);
	}

/*得到当前的登录用户 ,和系统的登录时间**/
@Override
public Object save(Object model){
	    XywzSaleFrgnQuotnSngl xywzSaleFrgnQuotnSngl = (XywzSaleFrgnQuotnSngl) model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if(xywzSaleFrgnQuotnSngl.getQuotnSnglId()==null){//没有则新增
			xywzSaleFrgnQuotnSngl.setInputPersId(auth.getUserId());  //录入人ID
			xywzSaleFrgnQuotnSngl.setInputPersNm(auth.getUsername());  //录入人名称
			xywzSaleFrgnQuotnSngl.setInputDt(new Date());   //录入日期
		}else{//更新
			xywzSaleFrgnQuotnSngl.setLastMdfrId(auth.getUserId()); //最后一次修改人ID
			xywzSaleFrgnQuotnSngl.setLastMdfr(auth.getUsername()); //最后一次修改人ID
			xywzSaleFrgnQuotnSngl.setLastModiDt(new Date());  //录入日期
		}
		return super.save(xywzSaleFrgnQuotnSngl);
	}
	

}


