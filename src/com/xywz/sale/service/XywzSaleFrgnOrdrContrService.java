package com.xywz.sale.service;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywz.sale.model.XywzSaleFrgnOrdrContr;
import com.xywz.sale.model.XywzSaleInvMerchdDtl;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;
import com.xywztech.crm.exception.BizException;


/**
 * 外贸合同Service
 * @author 
 * @since 2015-10-08 
 */
@Service
public class XywzSaleFrgnOrdrContrService extends CommonService {
   
	public XywzSaleFrgnOrdrContrService(){
		JPABaseDAO<XywzSaleFrgnOrdrContr, Long>  baseDAO = new JPABaseDAO<XywzSaleFrgnOrdrContr, Long>(XywzSaleFrgnOrdrContr.class);  
		super.setBaseDAO(baseDAO);
	}

@SuppressWarnings("unchecked")
public Map findFrgnOrdrContr(String sql,String contrNum) {
	StringBuffer sb = new StringBuffer();
	Map map = new HashMap();
	List<Object[]> list = this.baseDAO.findByNativeSQLWithIndexParam(sql);
	if(list==null||!(list.size()>0)){
		 throw new BizException(1, 0, "0001", "未查询到该合同信息！");
	}
	if (list != null && list.size() > 0) {
		Object[] o = list.get(0);

		for (int i = 0; i < o.length; i++) {
			if (o[i] == null) {
				o[i] = "";
			}
		}

		map.put("SIGN_DT", o[2].toString());
		map.put("CONTR_NUM", o[3]);
		map.put("CUR", o[5]);
        map.put("BRGN_MODE", o[7]);
		map.put("PAY_MD", o[9]);
		map.put("FINAL_TRAFF_DAY", o[14].toString());
		map.put("EMAIL", o[21]);
		map.put("F_VALUE", o[22]);
		map.put("CUST_SHT_NM", o[23]);
		map.put("F_COMMENT", o[24]); //英文名
		map.put("CUST_FULL_NM", o[25]);
		map.put("NGTV_POOR", o[26]);//合同的负差描述
		map.put("PKG", o[27]);
		map.put("SHIPPINGMARKS", o[28]);
		map.put("LOAD_TRAFF_PORT", o[29]);
		map.put("DISCHARGE_PORT", o[30]);
		map.put("ADVIS_BANK", o[31]);
		map.put("MORE_OR_LESS", o[32]);
		map.put("NEED_DOC", o[33]);
		map.put("FINAL_TRAFF_DETAIL", o[34]);
		map.put("MERCHD_NM", o[35]);
		map.put("BRGN_MODE_DETAIL",o[36]);
		
	}
//统一调整为 contrNum
	String searchJQL = "select a from XywzSaleInvMerchdDtl a where a.contrNum='"+contrNum+"' order by a.hsCode,a.merchdId";
	Map<String,Object> values = new HashMap<String,Object>();

	List<XywzSaleInvMerchdDtl> invList = baseDAO.findWithNameParm(searchJQL, values);
	

	
	map.put("xywzSaleInvMerchdDtl", invList);

	
	return map;
}
/*得到当前的登录用户 ,和系统的登录时间**/
@Override
public Object save(Object model){
	XywzSaleFrgnOrdrContr xywzSaleFrgnOrdrContr = (XywzSaleFrgnOrdrContr) model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if(xywzSaleFrgnOrdrContr.getOrdrId()==null){//没有则新增
			xywzSaleFrgnOrdrContr.setInputPersId(auth.getUserId());  //录入人ID
			xywzSaleFrgnOrdrContr.setInputPersNm(auth.getUsername());  //录入人名称
			xywzSaleFrgnOrdrContr.setInputDt(new Date());   //录入日期
		}else{//更新
			xywzSaleFrgnOrdrContr.setLastMdfrId(auth.getUserId()); //最后一次修改人ID
			xywzSaleFrgnOrdrContr.setLastMdfr(auth.getUsername()); //最后一次修改人
			xywzSaleFrgnOrdrContr.setLastModiDt(new Date());  //录入日期
		}
	if(xywzSaleFrgnOrdrContr.getOrdrId()==null){
		xywzSaleFrgnOrdrContr.setChkStat("0"); //默认未通过审核
	}
		return super.save(xywzSaleFrgnOrdrContr);
	}
	
}


