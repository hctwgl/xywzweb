package com.xywztech.bcrm.custview.service;


import java.util.Date;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.OcrmFCiComCustInfo;
import com.xywztech.bcrm.model.OcrmFCiCustinfoUphi;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

/***
 * 对公客户基本信息
 * @author songxs
 * @since 2012-9-26
 *
 */
@Service
public class ComCustomerBaseInfoService extends CommonService{
	
	public ComCustomerBaseInfoService(){
		JPABaseDAO<OcrmFCiComCustInfo, String>  baseDAO = new JPABaseDAO<OcrmFCiComCustInfo, String>(OcrmFCiComCustInfo.class);  
		super.setBaseDAO(baseDAO);
	}
/**
 * 保存对公客户基本信息调整历史
 * @param jarray 从前台获取的要保存的数组
 */
	@SuppressWarnings("unchecked")
	public void bathsave(JSONArray jarray) {
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String currenUserId = auth.getUserId();
		if (jarray.size() > 0){
			for (int i = 0; i < jarray.size(); ++i){
				JSONObject wa = (JSONObject)jarray.get(i);
				OcrmFCiCustinfoUphi ws = new OcrmFCiCustinfoUphi();
				ws.setCustId((String)wa.get("custId"));
				ws.setUpdateBeCont((String)wa.get("updateBeCont"));
				ws.setUpdateAfCont((String)wa.get("updateAfCont"));
				ws.setUpdateItem((String)wa.get("updateItem"));
				ws.setUpdateUser(currenUserId);
				ws.setUpdateDate(new Date(System.currentTimeMillis()));
				this.save(ws);
			}
		}
		return;
	}
}


