package com.xywz.sale.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xywz.sale.model.XywzSaleLabelMgmt;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.crm.exception.BizException;


/**
 * 标签管理Service
 * @author 
 * @since 2015-10-08 
 */
@Service

public class XywzSaleLabelMgmtService extends CommonService {
	   
	public XywzSaleLabelMgmtService(){
		JPABaseDAO<XywzSaleLabelMgmt, Long>  baseDAO = new JPABaseDAO<XywzSaleLabelMgmt, Long>(XywzSaleLabelMgmt.class);  
		super.setBaseDAO(baseDAO);
	}
	@SuppressWarnings("unchecked")
	public Map findlabel(String sql,String invId) {
		StringBuffer sb = new StringBuffer();
		Map map = new HashMap();
		List<Object[]> list = this.baseDAO.findByNativeSQLWithIndexParam(sql);
		if(list==null||!(list.size()>0)){
			 throw new BizException(1, 0, "0001", "未查询标签信息！");
		}
		if (list != null && list.size() > 0) {
			Object[] o = list.get(0);

			for (int i = 0; i < o.length; i++) {
				if (o[i] == null) {
					o[i] = "";
				}
			}
//			map.put("INV_DT", o[2].toString());
			map.put("SHIPPINGMARKS", o[1]);
			map.put("SIZE", o[2]);
			map.put("QUALITY", o[3]);
			map.put("HEAT_NUMBER", o[4]);
			map.put("THICKNESS", o[5]);
			map.put("MILLS_NAME", o[6]);
			map.put("BACK_NOTE", o[7]);
			map.put("BUNDLE_NUMBER", o[8]);
			map.put("PCS_BUNDLE", o[9]); 
			map.put("COLOUR", o[10]);
			map.put("MEMO", o[11]);
			map.put("HS_CODE", o[12]);
			map.put("QTY", o[13]);
		}

//		String searchJQL = "select a from XywzSaleInvMerchdDtl a where a.invNum='"+invId+"'";
//		Map<String,Object> values = new HashMap<String,Object>();
	//
//		List<XywzSaleInvMerchdDtl> invList = baseDAO.findWithNameParm(searchJQL, values);
	//	
//		map.put("saleInvInfo", invList);
		return map;
	}

}


