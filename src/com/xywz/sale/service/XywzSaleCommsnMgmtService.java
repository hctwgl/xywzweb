package com.xywz.sale.service;


import org.springframework.stereotype.Service;

import com.xywz.sale.model.XywzSaleCommsnMgmt;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 外贸发票信息Service
 * @author 
 * @since 2015-10-08 
 */
@Service
public class XywzSaleCommsnMgmtService extends CommonService {
   
	public XywzSaleCommsnMgmtService(){
		JPABaseDAO<XywzSaleCommsnMgmt, Long>  baseDAO = new JPABaseDAO<XywzSaleCommsnMgmt, Long>(XywzSaleCommsnMgmt.class);  
		super.setBaseDAO(baseDAO);
	}

	/*得到当前的登录用户 ,和系统的登录时间**/
//	public Object save(Object model){
//		XywzSaleFrgnOrdrContr xywzSaleFrgnOrdrContr = (XywzSaleFrgnOrdrContr) model;
//			AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//			if(xywzSaleFrgnOrdrContr.getOrdrId()==null){//没有则新增
//				xywzSaleFrgnOrdrContr.set(auth.getUserId());  //录入人ID
//				xywzSaleFrgnOrdrContr.setInputPersNm(auth.getUsername());  //录入人名称
//				xywzSaleFrgnOrdrContr.setInputDt(new Date());   //录入日期
//			}else{//更新
//				xywzSaleFrgnOrdrContr.setLastMdfrId(auth.getUserId()); //最后一次修改人ID
//				xywzSaleFrgnOrdrContr.setLastMdfr(auth.getUsername()); //最后一次修改人
//				xywzSaleFrgnOrdrContr.setLastModiDt(new Date());  //录入日期
//			}
//			return super.save(XywzSaleFrgnOrdrContr);
//		}
//		

}


