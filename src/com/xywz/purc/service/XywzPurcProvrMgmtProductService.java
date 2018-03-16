package com.xywz.purc.service;


import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywz.plan.model.XywzPlanPrdcPlanAdvsSngl;
import com.xywz.purc.model.XywzPurcProvrMgmtProduct;
import com.xywz.ware.model.XywzWareInvtyInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 外采合同商品信息管理Service
 * @author 
 * @since 
 */
@Service
public class XywzPurcProvrMgmtProductService extends CommonService {
   
	public XywzPurcProvrMgmtProductService(){
		JPABaseDAO<XywzPurcProvrMgmtProduct, Long>  baseDAO = new JPABaseDAO<XywzPurcProvrMgmtProduct, Long>(XywzPurcProvrMgmtProduct.class);  
		super.setBaseDAO(baseDAO);
	}

	@Override
	public Object save(Object model){
		XywzPurcProvrMgmtProduct xywzPurcProvrMgmtProduct = (XywzPurcProvrMgmtProduct) model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	
//		xywzWareManualStorage.setIntoWhsDt(new Date());
//		xywzWareManualStorage.setIntoWhsExecPers(auth.getUserId());
		if(null==xywzPurcProvrMgmtProduct.getMerchdId()||xywzPurcProvrMgmtProduct.getMerchdId().equals("")){
			xywzPurcProvrMgmtProduct.setPurcStatus("01");
		}
		xywzPurcProvrMgmtProduct.setLastOprPers(auth.getUserId());
		xywzPurcProvrMgmtProduct.setFinalOprDt(new Date());
		return super.save(xywzPurcProvrMgmtProduct);
	}
	
	
	public void updateStatus(String id){
		
		XywzPurcProvrMgmtProduct xywzPurcProvrMgmtProduct=em.find(XywzPurcProvrMgmtProduct.class, id);
		xywzPurcProvrMgmtProduct.setPurcStatus("01");
		super.save(xywzPurcProvrMgmtProduct);
		
		//向库存表中插入数据
		XywzWareInvtyInfo xywzWareInvtyInfo = new XywzWareInvtyInfo();
//		xywzWareInvtyInfo.setDenst(xywzPurcProvrMgmtProduct.getDenst());
		xywzWareInvtyInfo.setJianCnt(xywzPurcProvrMgmtProduct.getPieces());
		xywzWareInvtyInfo.setLen(xywzPurcProvrMgmtProduct.getLen());
//		xywzWareInvtyInfo.setNgtvPoor(xywzPurcProvrMgmtProduct.getNgtvPoor());
		xywzWareInvtyInfo.setPrdName(xywzPurcProvrMgmtProduct.getHsCode());
//		xywzWareInvtyInfo.setRemZhiCnt(xywzPurcProvrMgmtProduct.getRemZhiCnt());
		xywzWareInvtyInfo.setSpcModel(xywzPurcProvrMgmtProduct.getModel());
		xywzWareInvtyInfo.setWeight(xywzPurcProvrMgmtProduct.getQty());
		xywzWareInvtyInfo.setZhiCnt(xywzPurcProvrMgmtProduct.getPiecesCnt());
		
		xywzWareInvtyInfo.setOutIntoWhsInd("01");

		
		super.save(xywzWareInvtyInfo);
		
	}
	/*
	 * 外采商品提交质检
	 */
	public void submitCheck(String id){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();	
		XywzPurcProvrMgmtProduct xywzPurcProvrMgmtProduct=em.find(XywzPurcProvrMgmtProduct.class, Long.parseLong(id));
		xywzPurcProvrMgmtProduct.setPurcStatus("02");
		try{
			super.save(xywzPurcProvrMgmtProduct);
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
		//向任务单表中插入待质检数据
		XywzPlanPrdcPlanAdvsSngl xywzPlanPrdcPlanAdvsSngl = new XywzPlanPrdcPlanAdvsSngl();
		xywzPlanPrdcPlanAdvsSngl.setContrNum(xywzPurcProvrMgmtProduct.getPuchSnglId());
//		xywzPlanPrdcPlanAdvsSngl.setMerchdType("");//商品类型
		xywzPlanPrdcPlanAdvsSngl.setChannalType("2");//渠道类型
		xywzPlanPrdcPlanAdvsSngl.setPrdName(xywzPurcProvrMgmtProduct.getHsCode());//品名
		xywzPlanPrdcPlanAdvsSngl.setSpcModel(xywzPurcProvrMgmtProduct.getModel());//规格型号
//		xywzPlanPrdcPlanAdvsSngl.setNgtvPoor(xywzPurcProvrMgmtProduct.getNgtvPoor());//负差
//		xywzPlanPrdcPlanAdvsSngl.setMaterials("");//材质
//		xywzPlanPrdcPlanAdvsSngl.setTolerance("");//公差
//		xywzPlanPrdcPlanAdvsSngl.setDenst(denst);//密度
		xywzPlanPrdcPlanAdvsSngl.setLen(xywzPurcProvrMgmtProduct.getLen());//长度
		xywzPlanPrdcPlanAdvsSngl.setZhiCnt(xywzPurcProvrMgmtProduct.getPiecesCnt());//支/件
		xywzPlanPrdcPlanAdvsSngl.setJianCnt(xywzPurcProvrMgmtProduct.getPieces());//件
//		xywzPlanPrdcPlanAdvsSngl.setRemZhiCnt(xywzPurcProvrMgmtProduct.getRemZhiCnt());//零支
		xywzPlanPrdcPlanAdvsSngl.setWeight(xywzPurcProvrMgmtProduct.getQty());//重量
//		xywzPlanPrdcPlanAdvsSngl.setWorkshop("");//车间
//		xywzPlanPrdcPlanAdvsSngl.setMerchdId("");//商品ID
		xywzPlanPrdcPlanAdvsSngl.setIssuesDt(new Date());//下达日期
		xywzPlanPrdcPlanAdvsSngl.setIssuesUserid(auth.getUserId());//下达人
		xywzPlanPrdcPlanAdvsSngl.setIssuesUsername(auth.getUsername());//下达人名称
		xywzPlanPrdcPlanAdvsSngl.setScheduStatus("2");
		xywzPlanPrdcPlanAdvsSngl.setSourceId(xywzPurcProvrMgmtProduct.getMerchdId());
		super.save(xywzPlanPrdcPlanAdvsSngl);
		
	}

}


