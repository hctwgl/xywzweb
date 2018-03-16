package com.xywztech.bcrm.custview.service;

import java.util.Date;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custview.model.OcrmFCiComCustInfo;
import com.xywztech.bcrm.model.OcrmFCiCustMflag;
import com.xywztech.bcrm.model.OcrmFCiCustinfoUphi;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

@Service
public class CustQueryForPubInfoService extends CommonService{
	JPABaseDAO<OcrmFCiComCustInfo, Long>  baseDAO=null;
	   public CustQueryForPubInfoService(){
		baseDAO =new JPABaseDAO<OcrmFCiComCustInfo, Long>(OcrmFCiComCustInfo.class);  
		   super.setBaseDAO(baseDAO);
	   }

	   // 根据recordeId是否为空进行新增或者修改渠道
	   public Object bathsave(Object model,String flag,JSONArray jarray) {
		   OcrmFCiComCustInfo ocrmFCiComCustInfo=(OcrmFCiComCustInfo)model;
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
   
		   if (flag!=null&&!"".equals(flag)) { //新增
			   OcrmFCiCustMflag  oflag = new OcrmFCiCustMflag();
			   		oflag.setCustId(ocrmFCiComCustInfo.getCustId());
			   		oflag.setModifyFlag(flag);
			   		oflag.setUpdateDate(new Date());
			   		oflag.setUpdateUser(currenUserId);
			   		JPABaseDAO<OcrmFCiCustMflag, Long>  baseDAO2=new JPABaseDAO<OcrmFCiCustMflag, Long>(this.em,OcrmFCiCustMflag.class);
			   		this.setBaseDAO(baseDAO2);
			   		this.save(oflag);
			}
		   
		   this.setBaseDAO(baseDAO);
	    return super.save(ocrmFCiComCustInfo);

	}
}
