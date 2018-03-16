package com.xywztech.bcrm.service;
import java.util.Date;

import net.sf.json.JSONArray;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.model.OcrmFMmMktThiApply;
import com.xywztech.bcrm.model.OcrmFMmMktThiApplyDetail;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;
@Service
public class OcrmFMmMktThiApplyDetailService extends CommonService{
	public OcrmFMmMktThiApplyDetailService(){
		   JPABaseDAO<OcrmFMmMktThiApply, Long>  baseDAO=new JPABaseDAO<OcrmFMmMktThiApply, Long>(OcrmFMmMktThiApply.class);  
		   super.setBaseDAO(baseDAO);
	   }
	
	public Object save(String commWay,String mktActivityName,String mktActivityNum) {	
		OcrmFMmMktThiApply ocrmFMmMktThiApply=new OcrmFMmMktThiApply();
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String currenUserId = auth.getUserId();
        String currenOrgId = auth.getUnitId();
		if (ocrmFMmMktThiApply.getApplyId() == null) { //新增
			ocrmFMmMktThiApply.setCommWay(commWay);
			ocrmFMmMktThiApply.setMktActiId(Long.parseLong(mktActivityNum));
			ocrmFMmMktThiApply.setMktActivityName(mktActivityName);
	        ocrmFMmMktThiApply.setCreateDate(new Date());
	        ocrmFMmMktThiApply.setCreateUser(currenUserId);
	}	
		   return super.save(ocrmFMmMktThiApply);
	}

	public void batchSave(JSONArray jarray2,
			JSONArray jarray3, JSONArray jarray4,JSONArray jarray5) {
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String applyId = auth.getPid();
        JPABaseDAO<OcrmFMmMktThiApplyDetail, Long> DetailBaseDAO = new JPABaseDAO<OcrmFMmMktThiApplyDetail, Long>(
				this.em,OcrmFMmMktThiApplyDetail.class);
			for(int i=0;i<jarray2.size();i++){
				OcrmFMmMktThiApplyDetail ocrmFMmMktThiApplyDetail=new OcrmFMmMktThiApplyDetail();
				ocrmFMmMktThiApplyDetail.setApplyId(Long.parseLong(applyId));
				ocrmFMmMktThiApplyDetail.setApplyNum(Integer.parseInt(jarray2.get(i).toString()));
				if(jarray3.get(i).toString()!=null&&!("").equals(jarray3.get(i).toString())){
					ocrmFMmMktThiApplyDetail.setApproveNum(Integer.parseInt(jarray3.get(i).toString()));
				}else{

					ocrmFMmMktThiApplyDetail.setApproveNum(Integer.parseInt(jarray2.get(i).toString()));
				}
				ocrmFMmMktThiApplyDetail.setMktActivityId(Long.parseLong(jarray4.get(i).toString()));
				ocrmFMmMktThiApplyDetail.setMktMaterial(jarray5.get(i).toString());
				super.setBaseDAO(DetailBaseDAO);
				super.save(ocrmFMmMktThiApplyDetail);
			}

	}

	public void batchSave1(JSONArray jarray, JSONArray jarray2,
			JSONArray jarray3, JSONArray jarray4, JSONArray jarray5,
			JSONArray jarray6) {
        JPABaseDAO<OcrmFMmMktThiApplyDetail, Long> DetailBaseDAO = new JPABaseDAO<OcrmFMmMktThiApplyDetail, Long>(
				this.em,OcrmFMmMktThiApplyDetail.class);
			for(int i=0;i<jarray2.size();i++){
				OcrmFMmMktThiApplyDetail ocrmFMmMktThiApplyDetail=new OcrmFMmMktThiApplyDetail();
				ocrmFMmMktThiApplyDetail.setRecordeId(Long.parseLong(jarray6.get(i).toString()));
				ocrmFMmMktThiApplyDetail.setApplyId(Long.parseLong(jarray.get(i).toString()));
				ocrmFMmMktThiApplyDetail.setApplyNum(Integer.parseInt(jarray2.get(i).toString()));
				if(jarray3.get(i).toString()!=null&&!("").equals(jarray3.get(i).toString())){
					ocrmFMmMktThiApplyDetail.setApproveNum(Integer.parseInt(jarray3.get(i).toString()));
				}else{

					ocrmFMmMktThiApplyDetail.setApproveNum(Integer.parseInt(jarray2.get(i).toString()));
				}
				ocrmFMmMktThiApplyDetail.setMktActivityId(Long.parseLong(jarray4.get(i).toString()));
				ocrmFMmMktThiApplyDetail.setMktMaterial(jarray5.get(i).toString());
				super.setBaseDAO(DetailBaseDAO);
				super.save(ocrmFMmMktThiApplyDetail);
			}
		
	}
}


