package com.xywz.sale.service;


import org.springframework.stereotype.Service;

import com.xywz.sale.model.XywzSaleFrgnMerchdList;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 外贸商品清单Service
 * @author 
 * @since 2015-10-08 
 */
@Service
public class XywzSaleFrgnMerchdListService extends CommonService {
   
	public XywzSaleFrgnMerchdListService(){
		JPABaseDAO<XywzSaleFrgnMerchdList, Long>  baseDAO = new JPABaseDAO<XywzSaleFrgnMerchdList, Long>(XywzSaleFrgnMerchdList.class);  
		super.setBaseDAO(baseDAO);
	}

	/*得到当前的登录用户 ,和系统的登录时间**/
//	public Object save(Object model){
//		XywzSaleInlandOrdrContr XywzSaleInlandOrdrContr = (XywzSaleInlandOrdrContr) model;
//			AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//			if(XywzSaleInlandOrdrContr.getOrdrId()==null){//没有则新增
//				XywzSaleInlandOrdrContr.set(auth.getUserId());  //录入人ID
//				XywzSaleInlandOrdrContr.setInputPersNm(auth.getUsername());  //录入人名称
//				XywzSaleInlandOrdrContr.setInputDt(new Date());   //录入日期
//			}else{//更新
//				XywzSaleInlandOrdrContr.setLastMdfrId(auth.getUserId()); //最后一次修改人ID
//				XywzSaleInlandOrdrContr.setLastMdfr(auth.getUsername()); //最后一次修改人
//				XywzSaleInlandOrdrContr.setLastModiDt(new Date());  //录入日期
//			}
//			return super.save(XywzSaleInlandOrdrContr);
//		}
//		

}


