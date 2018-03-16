package com.xywz.sale.service;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import com.xywz.sale.model.XywzSaleInvInfo;
import com.xywz.sale.model.XywzSaleInvMerchdDtl;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.core.MenuManager;
import com.xywztech.bob.core.QueryHelper;
import com.xywztech.crm.exception.BizException;


/**
 * 外贸发票信息Service
 * @author 
 * @since 2015-10-08 
 */
@Service
public class XywzSaleInvInfoService extends CommonService {
	
	private DataSource dsOracle;
	private static Logger log = Logger.getLogger(MenuManager.class);
	private ApplicationContext applicationContext;
   
	public XywzSaleInvInfoService(){
		JPABaseDAO<XywzSaleInvInfo, Long>  baseDAO = new JPABaseDAO<XywzSaleInvInfo, Long>(XywzSaleInvInfo.class);  
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

	public List<XywzSaleInvInfo> findAllXywzSaleInvInfo(Long invId){
		List<XywzSaleInvInfo> saleInvInfos = new ArrayList<XywzSaleInvInfo>();
		XywzSaleInvInfo xywzSaleInvInfo = new XywzSaleInvInfo();
		saleInvInfos.add(xywzSaleInvInfo);
		saleInvInfos.add(xywzSaleInvInfo);
		return saleInvInfos;
	}
	
	@SuppressWarnings("unchecked")
	public Map findInvInfo(String sql,String invId) {
		StringBuffer sb = new StringBuffer();
		Map map = new HashMap();
		List<Object[]> list = this.baseDAO.findByNativeSQLWithIndexParam(sql);
		if(list==null||!(list.size()>0)){
			 throw new BizException(1, 0, "0001", "未查询到该客户的发票信息！");
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
			map.put("S_CNO", o[3]);
			map.put("PAYMENTS", o[4]);
			map.put("PORTOFLOADING", o[5]);
			map.put("PORTOFDESTINATION", o[6]);
			map.put("SHIPPINGMARKS", o[7]);
		}

//		String searchJQL = "select a from XywzSaleInvMerchdDtl a where a.invNum='"+invId+"'";
//		String searchJQL = "SELECT TT.HS_CODE,TT.MODEL,TT.QTY,TT.UPRC,TT.AMT FROM ( " +
//				           "SELECT INV_NUM,HS_CODE,MODEL,QTY,UPRC,AMT " +
//				           "FROM XYWZ_SALE_INV_MERCHD_DTL " +
//				           "UNION ALL " +
//				           "SELECT INV_NUM,HS_CODE,'SUB TOTAL' AS MODEL,SUM(QTY) AS QTY,0 AS UPRC, SUM(AMT) AS AMT " +
//				           "FROM XYWZ_SALE_INV_MERCHD_DTL " +
//				           "GROUP BY HS_CODE,INV_NUM ) TT " +
//				           "WHERE TT.INV_NUM='"+invId+"' " +
//				           "ORDER BY TT.HS_CODE DESC,TT.UPRC ASC";
//		Map<String,Object> values = new HashMap<String,Object>();

		//List<XywzSaleInvMerchdDtl> invList = baseDAO.findWithNameParm(searchJQL, values);
		List invList1=loadInvProd(invId);
		int i=0;
		
		ArrayList<XywzSaleInvMerchdDtl> invList12 = new ArrayList<XywzSaleInvMerchdDtl>();
		for (i=0; i < invList1.size();i++){
			XywzSaleInvMerchdDtl invList = new XywzSaleInvMerchdDtl();
			Map dataMap=(Map) invList1.get(i);
			//Map model=(Map)invList1.get(i);
			String hsCode=dataMap.get("HS_CODE").toString();
			String model=dataMap.get("MODEL").toString();
			BigDecimal qty=BigDecimal.valueOf(Float.valueOf(dataMap.get("QTY").toString()));
			BigDecimal uprc= BigDecimal.valueOf(Float.valueOf(dataMap.get("UPRC").toString()));
			BigDecimal amt= BigDecimal.valueOf(Float.valueOf(dataMap.get("AMT").toString()));
			
			invList.setHsCode(hsCode);
			invList.setModel(model);
			invList.setQty(qty);
			invList.setUprc(uprc);
			invList.setAmt(amt);
			
			invList12.add(invList);
			map.put("saleInvInfo", invList12);
			System.out.print("hsCode:"+invList.getHsCode());
		}
		return map;
	}
	
	private List loadInvProd(String invId) {
		StringBuffer prodSql = new StringBuffer(" SELECT TT.HS_CODE,TT.MODEL,TT.QTY,TT.UPRC,TT.AMT FROM ( " +
				           "SELECT T1.INV_NUM AS INV_NUM,T2.HS_CODE AS HS_CODE,T1.MODEL AS MODEL,convert(T2.SUTTLE_GROSS_WEIGHT , DECIMAL(24,3)) AS QTY,T1.UPRC AS UPRC,T1.AMT AS AMT " +
				           "FROM XYWZ_SALE_INV_MERCHD_DTL T1 " +
						   "INNER JOIN XYWZ_SALE_CSTM_DECL_PACKLIST T2 "+
						   "ON ( T1.INV_NUM = T2.INV_NUM AND T1.MODEL = T2.size) "+
				           "UNION ALL " +
				           "SELECT T4.INV_NUM AS INV_NUM,T4.HS_CODE AS HS_CODE,'SUB TOTAL' AS MODEL,SUM(convert(T4.SUTTLE_GROSS_WEIGHT , DECIMAL(24,3))) AS QTY,0 AS UPRC, SUM(T3.AMT) AS AMT " +
				           "FROM XYWZ_SALE_INV_MERCHD_DTL T3 " +
						   "INNER JOIN XYWZ_SALE_CSTM_DECL_PACKLIST T4 "+
						   "ON ( T3.INV_NUM = T4.INV_NUM AND T3.MODEL = T4.size ) "+
				           "GROUP BY T4.HS_CODE,T4.INV_NUM ) TT " +
				           "WHERE TT.INV_NUM='"+invId+"' " +
				           "ORDER BY TT.HS_CODE ASC,TT.UPRC DESC,TT.AMT ASC");
		
		QueryHelper qh;
		List resultList = new ArrayList();
		List prodSList;
		applicationContext = new ClassPathXmlApplicationContext("applicationContext-dataSource.xml");
		dsOracle = (DataSource) applicationContext.getBean("dsOracle");
		try {
			qh = new QueryHelper(prodSql.toString(), dsOracle.getConnection());			
			prodSList = (List) qh.getJSON().get("data");
			if (prodSList != null && prodSList.size() > 0) {
				resultList.addAll(prodSList);
			} 
			return resultList;
		} catch (Exception e) {
			log.error("加载产品数据时发生异常:", e);
			e.printStackTrace();
			return resultList;
		}
		
	}
	
}


