package com.xywz.purc.service;


import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.xywz.purc.model.XywzPurcProvrMgmtCust;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 供应商信息管理Service
 * @author 
 * @since 
 */
@Service
public class XywzPurcProvrMgmtCustService extends CommonService {
   
	public XywzPurcProvrMgmtCustService(){
		JPABaseDAO<XywzPurcProvrMgmtCust, Long>  baseDAO = new JPABaseDAO<XywzPurcProvrMgmtCust, Long>();  
		super.setBaseDAO(baseDAO);
	}

	/*得到当前的登录用户 ,和系统的登录时间**/
	@Override
	public Object save(Object model){
		XywzPurcProvrMgmtCust XywzPurcProvrMgmtCust = (XywzPurcProvrMgmtCust) model;
			AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			if(XywzPurcProvrMgmtCust.getInputPersId()==null){//没有则新增
				XywzPurcProvrMgmtCust.setInputPersId(auth.getUserId());  //录入人ID
				XywzPurcProvrMgmtCust.setInputPers(auth.getUsername());  //录入人名称
				XywzPurcProvrMgmtCust.setInputDt(new Date());   //录入日期
			}else{//更新
				XywzPurcProvrMgmtCust.setFinalMdfrId(auth.getUserId()); //最后一次修改人ID
				XywzPurcProvrMgmtCust.setFinalMdfr(auth.getUsername()); //最后一次修改人ID
				XywzPurcProvrMgmtCust.setLastModiDt(new Date());  //录入日期
			}
			return super.save(XywzPurcProvrMgmtCust);
		}
}


