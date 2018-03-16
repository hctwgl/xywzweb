package com.xywztech.bcrm.customer.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.OcrmFCiManaged;
import com.xywztech.bcrm.customer.model.OcrmFCiTransferAppInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

/**
 * 客户托管设置与审批Service
 * auther by:ZhangMin
 * create Date: 北京 4月19日:阴 15～22℃ 明:多云转阵雨 13～23℃
 * update Date: 北京 4月19日:阴 15～22℃ 明:多云转阵雨 13～23℃
 */

@Service
public class CustomerDepositService extends CommonService {

	private JPABaseDAO<OcrmFCiManaged, Long> managedDAO = null;
    @Autowired
    private CustomerTransferAppInfoService customertransferappinfoservice ;
	public CustomerDepositService() {
		managedDAO = new JPABaseDAO<OcrmFCiManaged, Long>(
				OcrmFCiManaged.class);
		super.setBaseDAO(managedDAO);
	}

	/**
	 * 客户托管设置
	 * 
	 * @param data
	 *            
	 * @return String
	 */
	public String batchDeposit(String data) {
		try {
//			JPABaseDAO<OcrmFCiBelongCustmgr, Long> custmgrDAO = new JPABaseDAO<OcrmFCiBelongCustmgr, Long>(this.em, OcrmFCiBelongCustmgr.class);
			// 取得登录用户的信息
			AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			// 传过来的data数据，包含：
			// 1.第一个'&'之前的值：custStr,&custNameStr,&mgrId,mgrName,begDate,endDate,managedModuleStr，将每个值存到数组belongHisArr里面
			String[] records = data.split("&");
			// 存放归属信息表需要用到的值
			String[] custStr = records[0].split(",");//客户ID
			String[] custNameStr = records[1].split(",");//客户名称
			String[] depositInfoStr = records[2].split(",");//托管信息
			String managedModuleStr = records[3];//托管模块
			for (int i = 0; i < custStr.length; i++) {

				OcrmFCiManaged fcm = new OcrmFCiManaged();//new OcrmFCiManaged();
				fcm.setCustId(custStr[i]);//客户编号
				fcm.setCustName(custNameStr[i]);//客户名称
				fcm.setApplyDate(new Date());//申请时间
				fcm.setApproveStat("1");//审批状态 待审批
				fcm.setManagedInstCode(auth.getUnitId());//托管机构
				fcm.setManagedInstName(auth.getUnitName());//托管机构名称
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date startDate = sdf.parse(depositInfoStr[2]);
				Date endDate = sdf.parse(depositInfoStr[3]);
				fcm.setManagedStartDate(startDate);//托管开始时间
				fcm.setManagedEndDate(endDate);//托管结束时间
				fcm.setManagedMgrCode(depositInfoStr[0]);//托管客户经理
				fcm.setManagedMgrName(depositInfoStr[1]);//托管客户经理名称
				fcm.setManagedModule(managedModuleStr);//托管模块
				fcm.setManagedModuleName("");//托管模块
				fcm.setBeforeInstCode(auth.getUnitId());//原客户机构
				fcm.setBeforeInstName(auth.getUnitName());//原客户机构名称
				fcm.setBeforeMgrCode(auth.getUserId());//原客户经理
				fcm.setBeforeMgrName(auth.getUsername());//原客户经理编号

//				this.setBaseDAO(managedDAO);
				this.save(fcm);
				//更新客户转移日志表信息
//				for(int i=0;i<jarray1.size();i++){
					
					OcrmFCiTransferAppInfo ofta = new OcrmFCiTransferAppInfo();
				
					ofta.setCustId(custStr[i]);//客户编号
					ofta.setBeforeOrgId(auth.getUnitId());//原客户机构
					ofta.setOldMgrId(auth.getUserId());//原客户经理
					ofta.setOldMgrName(auth.getUsername());//原客户经理编号
					ofta.setApplyUserId(auth.getUserId());//申请人编号
					ofta.setApplyUserName(auth.getUsername());//申请人名称
					ofta.setNewMgrId(depositInfoStr[0]);//托管客户经理
					ofta.setNewMgrName(depositInfoStr[1]);//托管客户经理名称
//					ofta.setAfterOrgId(auth.getUnitId());
					ofta.setApplyDate(new Date());
//					ofta.setRemark(remark);
					ofta.setOperType("2");//定义 调整类型为“转移”
//					ofta.setRightType(jarray5.get(i).toString());
//					ofta.setSignId(jarray11.get(i).toString());
					ofta.setAppStatus("1");
//					ofta.setTempOrgId(jarray13.get(i).toString());
//					ofta.setCustName(jarray12.get(i).toString());
					
				customertransferappinfoservice.saveApplyLogInfo(ofta);
//				}
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return "success";
	}
	
	/**
	 * 审批通过
	 * @param idStr
	 * @return
	 */
	public String approve(String idStr) {
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		//修改认领单的状态和审批人信息
		String jql="update OcrmFCiManaged p set p.approveStat='2',p.approveUserCode=:value1,"
			+"p.approveUserName=:value2,p.approveInstCode=:value3,p.approveInstName=:value4,p.approveDate=:value5 where p.id=:value6";
		Map<String,Object> values=new HashMap<String,Object>();
		values.put("value1",auth.getUserId());
		values.put("value2",auth.getUsername());
		values.put("value3",auth.getUnitId());
		values.put("value4",auth.getUnitName());
		values.put("value5",new Date());
		values.put("value6", Long.parseLong(idStr));
		//this.setBaseDAO(laiBaseDAO);
		this.batchUpdateByName(jql, values);
		
		//更新客户转移日志表信息		
			OcrmFCiTransferAppInfo ofta = new OcrmFCiTransferAppInfo();
			OcrmFCiManaged ofcm = em.find(OcrmFCiManaged.class, Long.parseLong(idStr));
			ofta.setCustId(ofcm.getCustId());//客户编号
			ofta.setBeforeOrgId(auth.getUnitId());//原客户机构
			ofta.setOldMgrId(auth.getUserId());//原客户经理
			ofta.setOldMgrName(auth.getUsername());//原客户经理编号
			ofta.setApplyUserId(auth.getUserId());//申请人编号
			ofta.setApplyUserName(auth.getUsername());//申请人名称
			ofta.setNewMgrId(ofcm.getManagedMgrCode());//托管客户经理
			ofta.setNewMgrName(ofcm.getManagedMgrName());//托管客户经理名称
			ofta.setApplyDate(ofcm.getApplyDate());
			ofta.setAppDate3(new Date());
			ofta.setOperType("2");//定义 调整类型为“托管”
			ofta.setAppStatus("2");
		customertransferappinfoservice.saveApplyLogInfo(ofta);		
		
		return "success";
	}
	
	/**
	 * 审批拒绝
	 * @param idStr
	 * @return
	 */
	public String approveBack(String idStr) {
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		//修改认领单的状态和审批人信息
		String jql="update OcrmFCiManaged p set p.approveStat='3',p.approveUserCode=:value1,"
			+"p.approveUserName=:value2,p.approveInstCode=:value3,p.approveInstName=:value4,p.approveDate=:value5 where p.id= :value6";
		Map<String,Object> values=new HashMap<String,Object>();
		values.put("value1",auth.getUserId());
		values.put("value2",auth.getUsername());
		values.put("value3",auth.getUnitId());
		values.put("value4",auth.getUnitName());
		values.put("value5",new Date());
		values.put("value6", Long.parseLong(idStr));
		//this.setBaseDAO(laiBaseDAO);
		this.batchUpdateByName(jql, values);
		
		//更新客户转移日志表信息		
		OcrmFCiTransferAppInfo ofta = new OcrmFCiTransferAppInfo();
		OcrmFCiManaged ofcm = em.find(OcrmFCiManaged.class, Long.parseLong(idStr));
		ofta.setCustId(ofcm.getCustId());//客户编号
		ofta.setBeforeOrgId(auth.getUnitId());//原客户机构
		ofta.setOldMgrId(auth.getUserId());//原客户经理
		ofta.setOldMgrName(auth.getUsername());//原客户经理编号
		ofta.setApplyUserId(auth.getUserId());//申请人编号
		ofta.setApplyUserName(auth.getUsername());//申请人名称
		ofta.setNewMgrId(ofcm.getManagedMgrCode());//托管客户经理
		ofta.setNewMgrName(ofcm.getManagedMgrName());//托管客户经理名称
		ofta.setApplyDate(ofcm.getApplyDate());
		ofta.setAppDate3(new Date());
		ofta.setOperType("2");//定义 调整类型为“托管”
		ofta.setAppStatus("3");
	customertransferappinfoservice.saveApplyLogInfo(ofta);	
		return "success";
	}
}
