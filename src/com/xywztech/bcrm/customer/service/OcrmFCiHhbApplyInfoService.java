package com.xywztech.bcrm.customer.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.customer.model.OcrmFCiCustDesc;
import com.xywztech.bcrm.customer.model.OcrmFCiHhbApplyInfo;
import com.xywztech.bcrm.customer.model.OcrmFCiHhbMapping;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
@Transactional(value="postgreTransactionManager")
public class OcrmFCiHhbApplyInfoService extends CommonService {

	public OcrmFCiHhbApplyInfoService(){
		JPABaseDAO<OcrmFCiHhbApplyInfo,Long> baseDao = new JPABaseDAO<OcrmFCiHhbApplyInfo,Long>(OcrmFCiHhbApplyInfo.class);
		super.setBaseDAO(baseDao);
	}
	
	//审批通过
	//修改审批字段状态为“通过”
	//更新统一客户视图表，合并客户编号对应的客户状态为已合并，02
	//产生历史记录
	public String approvelUpdate(String idStr,String hbCustId){
		JPABaseDAO<OcrmFCiHhbApplyInfo,Long> laiBaseDAO = new JPABaseDAO<OcrmFCiHhbApplyInfo,Long>(this.em,OcrmFCiHhbApplyInfo.class);
		//硬编码，与数据字典对应，approvelStatus='2',审批状态：通过
		String jql="update OcrmFCiHhbApplyInfo c set c.approvelStatus='2' where c.id='"+idStr+"'";
		Map<String,Object> values=new HashMap<String,Object>();
		this.setBaseDAO(laiBaseDAO);
		this.batchUpdateByName(jql, values);
		//更新统一客户视图表，合并客户编号对应的客户状态为已合并，02
		JPABaseDAO<OcrmFCiCustDesc,Long> upDao = new JPABaseDAO<OcrmFCiCustDesc,Long>(this.em,OcrmFCiCustDesc.class);
		String jql2="update OcrmFCiCustDesc c set c.custStat ='02' where c.custId='"+hbCustId+"'";
		Map<String,Object> values2=new HashMap<String,Object>();
		this.setBaseDAO(upDao);
		this.batchUpdateByName(jql2, values2);
		//产生历史记录
		OcrmFCiHhbMapping hhbMap = new OcrmFCiHhbMapping();
		hhbMap.setSourceCustId(hbCustId);
		hhbMap.setTargetCustId(idStr);
		Date ndate = new Date();
		hhbMap.setHhbDt(ndate);
		JPABaseDAO<OcrmFCiHhbMapping,Long> hhbBaseDAO = new JPABaseDAO<OcrmFCiHhbMapping,Long>(this.em,OcrmFCiHhbMapping.class);
		this.setBaseDAO(hhbBaseDAO);
		hhbBaseDAO.save(hhbMap);
		return "success";
	}
	
	//审批不通过
	public String approvelBackUpdate(String idStr){
		JPABaseDAO<OcrmFCiHhbApplyInfo,Long> laiBaseDAO = new JPABaseDAO<OcrmFCiHhbApplyInfo,Long>(this.em,OcrmFCiHhbApplyInfo.class);
		//硬编码，与数据字典对应，approvelStatus='3',审批状态：不通过
		String jql="update OcrmFCiHhbApplyInfo c set c.approvelStatus='3' where c.id='"+idStr+"'";
		Map<String,Object> values=new HashMap<String,Object>();
		this.setBaseDAO(laiBaseDAO);
		this.batchUpdateByName(jql, values);
		return "success";
	}
}
