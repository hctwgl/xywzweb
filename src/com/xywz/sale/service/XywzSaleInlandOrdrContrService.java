package com.xywz.sale.service;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import com.xywz.pub.tool.Xywz_NumberToCN;
import com.xywz.sale.model.XywzSaleInlandMerchdDtl;
import com.xywz.sale.model.XywzSaleInlandOrdrContr;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;
import com.xywztech.crm.exception.BizException;


/**
 * 内贸合同管理Service
 * @author 
 * @since 2015-10-08 
 */
@Service
public class XywzSaleInlandOrdrContrService extends CommonService {
   
	public XywzSaleInlandOrdrContrService(){
		JPABaseDAO<XywzSaleInlandOrdrContr, Long>  baseDAO = new JPABaseDAO<XywzSaleInlandOrdrContr, Long>(XywzSaleInlandOrdrContr.class);  
		super.setBaseDAO(baseDAO);
	}
	
	public List<XywzSaleInlandOrdrContr> findAllXywzSaleInlandOrdrContrInfo(Long invId){
		List<XywzSaleInlandOrdrContr> saleInlandOrdrContr = new ArrayList<XywzSaleInlandOrdrContr>();
		XywzSaleInlandOrdrContr xywzSaleInlandOrdrContr = new XywzSaleInlandOrdrContr();
		saleInlandOrdrContr.add(xywzSaleInlandOrdrContr);
		saleInlandOrdrContr.add(xywzSaleInlandOrdrContr);
		return saleInlandOrdrContr;
	}
	
	@SuppressWarnings("unchecked")
	public Map findXywzSaleInlandOrdrContrInfo(String sql,String sheetID) {
		StringBuffer sb = new StringBuffer();
		Map map = new HashMap();
		List<Object[]> list = this.baseDAO.findByNativeSQLWithIndexParam(sql);
		if(list==null||!(list.size()>0)){
			 throw new BizException(1, 0, "0001", "未查询到内贸合同信息！");
		}
		if (list != null && list.size() > 0) {
			Object[] o = list.get(0);
			

			for (int i = 0; i < o.length; i++) {
				if (o[i] == null) {
					o[i] = "";
				}
			}
			map.put("CUST_NM", o[0]);
			map.put("CONTR_NUM", o[1]);
			map.put("CONTR_DT", o[2].toString());
			map.put("QLTY_TECH_STD_REQST", o[3]);
			map.put("FINAL_TRAFF_DETAIL", o[4]);
			map.put("TRAFF_MODE", o[5]);
			map.put("NGTV_POOR", o[6]);
			map.put("PKG", o[7]);
			map.put("HESIT_PRD", o[8]);
			map.put("STL_MODE", o[9]);
			map.put("ADDR", o[10]);
			map.put("TEL",o[11]);
			map.put("FAX", o[11]);
			map.put("BANK_FULL_NM", o[12]);
			map.put("ACCT_NUM", o[13]);
			map.put("CUST_FULL_NM", o[15]);
			
			double money=Double.parseDouble(o[14].toString());
			BigDecimal numberOfMoney = new BigDecimal(money);
			String s = Xywz_NumberToCN.number2CNMontrayUnit(numberOfMoney);

			
			map.put("TOTAL_AMT", s);
		}
		
		String searchJQL = "select a from XywzSaleInlandMerchdDtl a where a.inlandOrdrNum='"+sheetID+"'";
		Map<String,Object> values = new HashMap<String,Object>();

		List<XywzSaleInlandMerchdDtl> invList = baseDAO.findWithNameParm(searchJQL, values);
		
		map.put("saleInlandMerchdDtl", invList);
		return map;
	}

	/*得到当前的登录用户 ,和系统的登录时间**/
	@Override
	public Object save(Object model){
		XywzSaleInlandOrdrContr XywzSaleInlandOrdrContr = (XywzSaleInlandOrdrContr) model;
			AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			if(XywzSaleInlandOrdrContr.getOrdrId()==null || XywzSaleInlandOrdrContr.getOrdrId().equals("")){//没有则新增
				XywzSaleInlandOrdrContr.setInputPersId(auth.getUserId());  //录入人ID
				XywzSaleInlandOrdrContr.setInputPersNm(auth.getUsername());  //录入人名称
				XywzSaleInlandOrdrContr.setInputDt(new Date());   //录入日期
			}else{//更新
				XywzSaleInlandOrdrContr.setLastMdfrId(auth.getUserId()); //最后一次修改人ID
				XywzSaleInlandOrdrContr.setLastMdfr(auth.getUsername()); //最后一次修改人
				XywzSaleInlandOrdrContr.setLastModiDt(new Date());  //录入日期
			}
			//新增默认未通过审核
			if(XywzSaleInlandOrdrContr.getOrdrId()==null){
				XywzSaleInlandOrdrContr.setChkStat("0"); 
			}
			
			return super.save(XywzSaleInlandOrdrContr);
		}
		

}


