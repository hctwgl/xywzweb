package com.xywz.sale.service;


import org.springframework.stereotype.Service;

import com.xywz.sale.model.XywzSaleInlandMerchdDtl;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;


/**
 * 内贸商品明细Service
 * @author 
 * @since 2015-10-08 
 */
@Service
public class XywzSaleInlandMerchdDtlService extends CommonService {
   
	public XywzSaleInlandMerchdDtlService(){
		JPABaseDAO<XywzSaleInlandMerchdDtl, Long>  baseDAO = new JPABaseDAO<XywzSaleInlandMerchdDtl, Long>(XywzSaleInlandMerchdDtl.class);  
		super.setBaseDAO(baseDAO);
	}

//	/*得到当前的登录用户 ,和系统的登录时间**/
//	public Object save(Object model){
//		XywzSaleInlandQuotnSngl xywzSaleInlandQuotnSngl = (XywzSaleInlandQuotnSngl) model;
//			AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//			if(xywzSaleInlandQuotnSngl.getSnglId()==null){//没有则新增
//				xywzSaleInlandQuotnSngl.setInputPersId(auth.getUserId());  //录入人ID
//				xywzSaleInlandQuotnSngl.setInputPersNm(auth.getUsername());  //录入人名称
//				xywzSaleInlandQuotnSngl.setInputDt(new Date());   //录入日期
//			}else{//更新
//				xywzSaleInlandQuotnSngl.setLastMdfrId(auth.getUserId()); //最后一次修改人ID
//				xywzSaleInlandQuotnSngl.setLastMdfr(auth.getUsername()); //最后一次修改人
//				xywzSaleInlandQuotnSngl.setLastModiDt(new Date());  //录入日期
//			}
//			return super.save(xywzSaleInlandQuotnSngl);
//		}
		

}


