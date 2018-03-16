package com.xywztech.bcrm.customer.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.customer.model.OcrmFCiBelongHist;
import com.xywztech.bcrm.custview.model.OcrmFCiBelongCustmgr;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

/**
 * 客户移交
 * 
 */

@Service
@Transactional(value = "postgreTransactionManager")
public class CustomerTransService extends CommonService {

	private JPABaseDAO<OcrmFCiBelongHist, Long> belongHistDAO = null;

	public CustomerTransService() {
		belongHistDAO = new JPABaseDAO<OcrmFCiBelongHist, Long>(
				OcrmFCiBelongHist.class);
		super.setBaseDAO(belongHistDAO);
	}

	/**
	 * 主管批量移交,移交过程中，要更新客户的当前归属信息 同时要在归属历史表中增加一条移交的信息
	 * 
	 * @param data
	 *            String
	 * @return
	 */
	public String batchTrans(String data) {
		try {
			JPABaseDAO<OcrmFCiBelongCustmgr, Long> custmgrDAO = new JPABaseDAO<OcrmFCiBelongCustmgr, Long>(
					this.em, OcrmFCiBelongCustmgr.class);
			// 取得登录用户的信息
			AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
					.getAuthentication().getPrincipal();
			// 传过来的data数据，包含：
			// 1.第一个'&'之前的值：afterMgrId,afterMgrName,workTranLevel,workTranDate,workTranReason，将每个值存到数组belgongHisStr里面
			// 2.第二个及其后面的'&'之前的值：belMgrId(归属客户经理信息表ID),beforeMainType
			String[] records = data.split("&");
			// 存放归属信息表需要用到的值
			String[] belongHisArr = records[0].split(",");

			for (int i = 1; i < records.length; i++) {
				String[] belCustmgrArr = records[i].split(",");
				// 客户归属客户经理信息
				OcrmFCiBelongCustmgr bc = new OcrmFCiBelongCustmgr();
				this.setBaseDAO(custmgrDAO); 					// 操作表OcrmFCiBelongCustmgr
				//通过ID编号获取数据库中对应的记录
				bc = (OcrmFCiBelongCustmgr) this.find(Long.parseLong(belCustmgrArr[0]));
				// 增加客户归属历史信息
				OcrmFCiBelongHist bh = new OcrmFCiBelongHist();
				bh.setCustId(bc.getCustId()); 					// 客户编号
				bh.setBeforeInstCode(auth.getUnitId());			// 调整前客户机构编号
				bh.setAfterInstCode(auth.getUnitId()); 			// 调整后客户机构编号 
				bh.setBeforeInstName(auth.getUnitName()); 		// 调整前客户机构名称
				bh.setAfterInstName(auth.getUnitName()); 		// 调整后客户机构名称 
				bh.setBeforeMainType(bc.getMainType()); 		// 调整前主协办类型
				bh.setAfterMainType(belCustmgrArr[1]); 			// 调整后主协办类型 
				bh.setBeforeMgrId(bc.getMgrId()); 				// 调整前归属客户经理编号
				bh.setAfterMgrId(belongHisArr[0]); 				// 调整后归属客户经理编号
				bh.setBeforeMgrName(bc.getMgrName()); 			// 调整前归属客户经理名称
				bh.setAfterMgrName(belongHisArr[1]); 			// 调整后归属客户经理名称
				bh.setAssignDate(new Date()); 					// 分配日期
				bh.setAssignUser(auth.getUnitId()); 			// 分配人
				bh.setAssignUsername(auth.getUnitName()); 		// 分配人名称
				bh.setWorkTranLevel(belongHisArr[2]); 			// 工作移交级别
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date date = sdf.parse(belongHisArr[3]);
				bh.setWorkTranDate(date); 						// 工作移交日期
				bh.setWorkTranReason(belongHisArr[4]); 			// 工作移交理由
				// etl日期
				this.setBaseDAO(belongHistDAO);
				this.save(bh);
				
				// 更新客户归属客户经理信息
				bc.setAssignDate(new Date()); 					// 分配日期
				bc.setAssignUser(auth.getUnitId()); 			// 分配人
				bc.setAssignUsername(auth.getUnitName()); 		// 分配人名称
				bc.setMgrId(belongHisArr[0]); 					// 新客户经理编号
				bc.setMgrName(belongHisArr[1]); 				// 新客户经理名称
				bc.setId(Long.parseLong(belCustmgrArr[0]));	// 归属客户经理信息表的主键，根据主键更新记录
				bc.setMainType(belCustmgrArr[1]);				//主协办类型
				this.save(bc); 									// 更新
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return "success";
	}
}
