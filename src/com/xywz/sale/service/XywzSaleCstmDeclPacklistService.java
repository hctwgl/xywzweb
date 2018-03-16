package com.xywz.sale.service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import com.xywz.sale.model.XywzSaleCstmDeclPacklist;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.crm.exception.BizException;


/**
 * 外贸发票信息Service
 * @author 
 * @since 2015-10-08 
 */
@Service
public class XywzSaleCstmDeclPacklistService extends CommonService {
   
	public XywzSaleCstmDeclPacklistService(){
		JPABaseDAO<XywzSaleCstmDeclPacklist, Long>  baseDAO = new JPABaseDAO<XywzSaleCstmDeclPacklist, Long>(XywzSaleCstmDeclPacklist.class);  
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
	public List<XywzSaleCstmDeclPacklist> findAllXywzPackList(Long cstmPacklistId){
		List<XywzSaleCstmDeclPacklist> packList = new ArrayList<XywzSaleCstmDeclPacklist>();
		XywzSaleCstmDeclPacklist xywzSaleCstmDeclPacklist = new XywzSaleCstmDeclPacklist();
		packList.add(xywzSaleCstmDeclPacklist);
		packList.add(xywzSaleCstmDeclPacklist);
		return packList;
	}
	
	@SuppressWarnings("unchecked")
	public Map findPackList(String sql,String cstmPacklistId) {
		StringBuffer sb = new StringBuffer();
		Map map = new HashMap();
		List<Object[]> list = this.baseDAO.findByNativeSQLWithIndexParam(sql);
		if(list==null||!(list.size()>0)){
			 throw new BizException(1, 0, "0001", "未查询到箱单信息！");
		}
		if (list != null && list.size() > 0) {
			Object[] o = list.get(0);
			

			for (int i = 0; i < o.length; i++) {
				if (o[i] == null) {
					o[i] = "";
				}
			}
			map.put("INV_NUM", o[0]);
			map.put("CHKS_PERS", o[1]);
			map.put("INV_DT", o[2].toString());
			map.put("CONTR_NUM", o[3]);
			map.put("PAYMENTS", o[4]);
			map.put("PORTOFLOADING", o[5]);
			map.put("PORTOFDESTINATION", o[6]);
			map.put("SHIPPINGMARKS", o[7]);
		}

		String searchJQL = "select a from XywzSaleCstmDeclPacklist a where a.invNum='"+cstmPacklistId+"'";
		Map<String,Object> values = new HashMap<String,Object>();

		List<XywzSaleCstmDeclPacklist> packList = baseDAO.findWithNameParm(searchJQL, values);
		
		map.put("saleInvInfo", packList);
		return map;
	}

}


