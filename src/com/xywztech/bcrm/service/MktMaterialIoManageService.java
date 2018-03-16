package com.xywztech.bcrm.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.OcrmFMmMaterialDesc;
import com.xywztech.bcrm.model.OcrmFMmMktMaterialIoDesc;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;
@Service
public class MktMaterialIoManageService extends CommonService{
	public MktMaterialIoManageService(){
		   JPABaseDAO<OcrmFMmMktMaterialIoDesc, Long>  baseDAO=new JPABaseDAO<OcrmFMmMktMaterialIoDesc, Long>(OcrmFMmMktMaterialIoDesc.class);  
		   super.setBaseDAO(baseDAO);
	   }
	
	public String batchUpdate(String id,int leavingNum,int articleNum,String outinWay,String remarkIo) {
		JPABaseDAO<OcrmFMmMaterialDesc, Long> MatBaseDAO = new JPABaseDAO<OcrmFMmMaterialDesc, Long>(
				this.em,OcrmFMmMaterialDesc.class);
		//update物资明细表
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String jql="update OcrmFMmMaterialDesc set mktMaterialLeavingsNum = "+leavingNum+" where mktMaterialId = "+new Long(id);
		Map<String,Object> values=new HashMap<String,Object>();
		this.setBaseDAO(MatBaseDAO);
		this.batchUpdateByName(jql, values);
		//insert出入库明细表
		OcrmFMmMaterialDesc MaterialModel = (OcrmFMmMaterialDesc)this.find(Long.parseLong(id));
		OcrmFMmMktMaterialIoDesc IoModel = new OcrmFMmMktMaterialIoDesc();
		IoModel.setMktMaterialId(MaterialModel.getMktMaterialId());
		IoModel.setMktMaterialName(MaterialModel.getMktMaterialName());							
		IoModel.setArticleNum(articleNum);				
		IoModel.setOutinWay(outinWay);
		IoModel.setOutinTime(new Date().toString());
		IoModel.setRemark(remarkIo);
		this.setBaseDAO(baseDAO);
		this.save(IoModel);
		
		return "success";
	}

}
