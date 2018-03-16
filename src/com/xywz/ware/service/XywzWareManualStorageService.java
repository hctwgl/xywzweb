package com.xywz.ware.service;


import java.util.Date;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.xywz.plan.model.XywzPlanPrdcPlanAdvsSngl;
import com.xywz.ware.model.XywzWareInvtyInfo;
import com.xywz.ware.model.XywzWareManualStorage;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 自定义仓库信息表Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzWareManualStorageService extends CommonService {
	

   
	public XywzWareManualStorageService(){
		JPABaseDAO<XywzWareManualStorage, Long>  baseDAO = new JPABaseDAO<XywzWareManualStorage, Long>(XywzWareManualStorage.class);  
		super.setBaseDAO(baseDAO);
	}
	@Override
	public Object save(Object model){
		XywzWareManualStorage xywzWareManualStorage = (XywzWareManualStorage) model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	
//		xywzWareManualStorage.setIntoWhsDt(new Date());
//		xywzWareManualStorage.setIntoWhsExecPers(auth.getUserId());
		if(null==xywzWareManualStorage.getStoreId()||xywzWareManualStorage.getStoreId().equals("")){
			xywzWareManualStorage.setStoreStatus("01");
		}
		xywzWareManualStorage.setLastOprPers(auth.getUserId());
		xywzWareManualStorage.setFinalOprDt(new Date());
		return super.save(xywzWareManualStorage);
	}
	
	
	public void updateStatus(String id){
		
		XywzWareManualStorage xywzWareManualStorage=em.find(XywzWareManualStorage.class, id);
		xywzWareManualStorage.setStoreStatus("01");
		super.save(xywzWareManualStorage);
		
		//向库存表中插入数据
		XywzWareInvtyInfo xywzWareInvtyInfo = new XywzWareInvtyInfo();
		xywzWareInvtyInfo.setDenst(xywzWareManualStorage.getDenst());
		xywzWareInvtyInfo.setJianCnt(xywzWareManualStorage.getJianCnt());
		xywzWareInvtyInfo.setLen(xywzWareManualStorage.getLen());
		xywzWareInvtyInfo.setNgtvPoor(xywzWareManualStorage.getNgtvPoor());
		xywzWareInvtyInfo.setPrdName(xywzWareManualStorage.getPrdName());
		xywzWareInvtyInfo.setRemZhiCnt(xywzWareManualStorage.getRemZhiCnt());
		xywzWareInvtyInfo.setSpcModel(xywzWareManualStorage.getSpcModel());
		xywzWareInvtyInfo.setWeight(xywzWareManualStorage.getWeight());
		xywzWareInvtyInfo.setZhiCnt(xywzWareManualStorage.getZhiCnt());
		
		xywzWareInvtyInfo.setOutIntoWhsInd("01");

		
		super.save(xywzWareInvtyInfo);
		
	}
	/*
	 * 手动入库提交质检
	 */
	public void submitCheck(String id){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();	
		XywzWareManualStorage xywzWareManualStorage=em.find(XywzWareManualStorage.class, Long.parseLong(id));
		xywzWareManualStorage.setStoreStatus("02");
		try{
			super.save(xywzWareManualStorage);
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
		//向任务单表中插入待质检数据
		XywzPlanPrdcPlanAdvsSngl xywzPlanPrdcPlanAdvsSngl = new XywzPlanPrdcPlanAdvsSngl();
//		xywzPlanPrdcPlanAdvsSngl.setContrNum("");
//		xywzPlanPrdcPlanAdvsSngl.setMerchdType("");//商品类型
		xywzPlanPrdcPlanAdvsSngl.setChannalType("3");//渠道类型
		xywzPlanPrdcPlanAdvsSngl.setPrdName(xywzWareManualStorage.getPrdName());//品名
		xywzPlanPrdcPlanAdvsSngl.setSpcModel(xywzWareManualStorage.getSpcModel());//规格型号
//		xywzPlanPrdcPlanAdvsSngl.setNgtvPoor(xywzWareManualStorage.getNgtvPoor());//负差
//		xywzPlanPrdcPlanAdvsSngl.setMaterials("");//材质
//		xywzPlanPrdcPlanAdvsSngl.setTolerance("");//公差
		xywzPlanPrdcPlanAdvsSngl.setDenst(xywzWareManualStorage.getDenst());//密度
		xywzPlanPrdcPlanAdvsSngl.setLen(xywzWareManualStorage.getLen());//长度
		xywzPlanPrdcPlanAdvsSngl.setZhiCnt(xywzWareManualStorage.getZhiCnt());//支/件
		xywzPlanPrdcPlanAdvsSngl.setJianCnt(xywzWareManualStorage.getJianCnt());//件
		xywzPlanPrdcPlanAdvsSngl.setRemZhiCnt(xywzWareManualStorage.getRemZhiCnt());//零支
		xywzPlanPrdcPlanAdvsSngl.setWeight(xywzWareManualStorage.getWeight());//重量
//		xywzPlanPrdcPlanAdvsSngl.setWorkshop("");//车间
//		xywzPlanPrdcPlanAdvsSngl.setMerchdId("");//商品ID
		xywzPlanPrdcPlanAdvsSngl.setIssuesDt(new Date());//下达日期
		xywzPlanPrdcPlanAdvsSngl.setIssuesUserid(auth.getUserId());//下达人
		xywzPlanPrdcPlanAdvsSngl.setIssuesUsername(auth.getUsername());//下达人名称
		xywzPlanPrdcPlanAdvsSngl.setScheduStatus("2");
		xywzPlanPrdcPlanAdvsSngl.setSourceId(xywzWareManualStorage.getStoreId());
		super.save(xywzPlanPrdcPlanAdvsSngl);
		
	}

}


