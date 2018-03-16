package com.xywztech.bcrm.custview.service;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.OcrmFCiPerCustInfo;
import com.xywztech.bcrm.model.OcrmFCiCustinfoUphi;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

/***
 * 对私客户基本信息
 * @author 2012
 * @since 2012-10-10
 *
 */

@Service
public class PerCustomerBaseInfoService extends CommonService{
	
	public PerCustomerBaseInfoService(){
		JPABaseDAO<OcrmFCiPerCustInfo, String>  baseDAO=new JPABaseDAO<OcrmFCiPerCustInfo, String>(OcrmFCiPerCustInfo.class);  
		super.setBaseDAO(baseDAO);
	}
	/**
	 * 对私客户基本信息调整历史
	 * @param jarray 从前台获取的要进行保存的历史记录
	 */
	@SuppressWarnings("unchecked")
	   public void bathsave(JSONArray jarray) {
		   AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		   String currenUserId = auth.getUserId();
		   SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		   Date date=new Date();
		   String s=sdf.format(date);
		   Date dateTime = null;
		try {
			dateTime = sdf.parse(s);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			if (jarray.size() > 0){
				for (int i = 0; i < jarray.size(); ++i){
					JSONObject wa = (JSONObject)jarray.get(i);
					OcrmFCiCustinfoUphi ws = new OcrmFCiCustinfoUphi();
					ws.setCustId((String)wa.get("custId"));
					ws.setUpdateBeCont((String)wa.get("updateBeCont"));
					ws.setUpdateAfCont((String)wa.get("updateAfCont"));
					ws.setUpdateItem((String)wa.get("updateItem"));
				    ws.setUpdateUser(currenUserId);
				    ws.setUpdateDate(dateTime);
             this.save(ws);
				}
			}
			return;
	}
}
