package com.xywztech.bcrm.customer.service;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.customer.model.OcrmFCiCustDesc;
import com.xywztech.bcrm.customer.model.OcrmFCiHhbApplyInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

@Service
@Transactional(value = "postgreTransactionManager")
public class OcrmFCiCustDescService extends CommonService {

	public OcrmFCiCustDescService(){
		JPABaseDAO<OcrmFCiCustDesc,Long> baseDao = new JPABaseDAO<OcrmFCiCustDesc,Long>(OcrmFCiCustDesc.class);
		super.setBaseDAO(baseDao);
	}
	
	//处理所申请合并的客户信息，生成申请记录
	public String hbCustInfoApply(String mergeData,String targetData){
		try {
			// 取得登录用户的信息
			AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String applyInit = auth.getUnitId();//申请人机构
			String applyUser = auth.getUnitName();//申请人
			String approvelStatus = "1";//审批状态默认为“等审批”
			//处理目标数据
			String[] appInfo = targetData.split(",");
			String tarCustId = appInfo[0];
			String tarCustName = appInfo[1];
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date createDate = sdf.parse(appInfo[2]);
			String applyReason = appInfo[3];
			//处理合并数据
			String[] mergeDatas = mergeData.split("&");
			//生成申请记录
			String[] mergeInfo =null;
			String hbCustId;
			String hbCustName;
			OcrmFCiHhbApplyInfo ocrmFCiHhbApplyInfo = new OcrmFCiHhbApplyInfo();
			JPABaseDAO<OcrmFCiHhbApplyInfo,Long> hhbAppBaseDAO = new JPABaseDAO<OcrmFCiHhbApplyInfo,Long>(this.em,OcrmFCiHhbApplyInfo.class);
			for(int i=0; i<mergeDatas.length; i++){
				mergeInfo = mergeDatas[i].split(",");
				hbCustId = mergeInfo[0];//合并客户编号
				hbCustName = mergeInfo[1];//合并客户名称
				
				ocrmFCiHhbApplyInfo.setApplyInit(applyInit);//申请人机构
				ocrmFCiHhbApplyInfo.setApplyUser(applyUser);//申请人
				ocrmFCiHhbApplyInfo.setApprovelStatus(approvelStatus);//审批状态
				ocrmFCiHhbApplyInfo.setCreateDate(createDate);//申请日期
				ocrmFCiHhbApplyInfo.setApplyReason(applyReason);//申请理由
				ocrmFCiHhbApplyInfo.setTarCustId(tarCustId);//目标客户编号
				ocrmFCiHhbApplyInfo.setTarCustName(tarCustName);//目标客户名称
				ocrmFCiHhbApplyInfo.setHbCustId(hbCustId);//合并客户编号
				ocrmFCiHhbApplyInfo.setHbCustName(hbCustName);//合并客户名称
				this.setBaseDAO(hhbAppBaseDAO);
				hhbAppBaseDAO.save(ocrmFCiHhbApplyInfo);

			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return "success";
	}
}
