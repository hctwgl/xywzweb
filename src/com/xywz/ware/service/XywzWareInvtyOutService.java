package com.xywz.ware.service;


import java.math.BigInteger;
import java.util.Date;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywz.ware.model.XywzWareInvtyInfo;
import com.xywz.ware.model.XywzWareInvtyOut;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 仓库出货信息表Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzWareInvtyOutService extends CommonService {
   
	public XywzWareInvtyOutService(){
		JPABaseDAO<XywzWareInvtyOut, Long>  baseDAO = new JPABaseDAO<XywzWareInvtyOut, Long>(XywzWareInvtyOut.class);  
		super.setBaseDAO(baseDAO);
	}

	//仓库出库
	public void distriWare(String invtyId,String jianCnt,String remZhiCnt,String chdId,String contrNum){
		
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		//修改仓库表中的只件
		XywzWareInvtyInfo xywzWareInvtyInfo=em.find(XywzWareInvtyInfo.class, Long.parseLong(invtyId));
		
		BigInteger sum1 = xywzWareInvtyInfo.getZhiCnt().multiply(xywzWareInvtyInfo.getJianCnt()).add(xywzWareInvtyInfo.getRemZhiCnt());
		BigInteger sum2 = xywzWareInvtyInfo.getZhiCnt().multiply(new BigInteger(jianCnt)).add(new BigInteger(remZhiCnt));
		BigInteger remsum = sum1.subtract(sum2);
		BigInteger jianCnt1=remsum.divide(xywzWareInvtyInfo.getZhiCnt());
		BigInteger remZhiCnt1=remsum.remainder(xywzWareInvtyInfo.getZhiCnt());
		xywzWareInvtyInfo.setJianCnt(jianCnt1);
		xywzWareInvtyInfo.setRemZhiCnt(remZhiCnt1);
		super.save(xywzWareInvtyInfo);
		
		//向出库表中插入数据
		XywzWareInvtyOut xywzWareInvtyOut = new XywzWareInvtyOut();
		xywzWareInvtyOut.setInvtyId(xywzWareInvtyInfo.getInvtyId());//库存ID
		
		xywzWareInvtyOut.setContrNum(contrNum);//合同号
		xywzWareInvtyOut.setMerchdId(Long.parseLong(chdId));//商品ID
		
		xywzWareInvtyOut.setLen(xywzWareInvtyInfo.getLen());//长度
		xywzWareInvtyOut.setNgtvPoor(xywzWareInvtyInfo.getNgtvPoor());//负差
		xywzWareInvtyOut.setPrdName(xywzWareInvtyInfo.getPrdName());//品名
		xywzWareInvtyOut.setSpcModel(xywzWareInvtyInfo.getSpcModel());//规格型号
		xywzWareInvtyOut.setDenst(xywzWareInvtyInfo.getDenst());//密度

		xywzWareInvtyOut.setZhiCnt(xywzWareInvtyInfo.getZhiCnt());//支/件
		xywzWareInvtyOut.setJianCnt(new BigInteger(jianCnt));//件数
		xywzWareInvtyOut.setRemZhiCnt(new BigInteger(remZhiCnt));//零支
		xywzWareInvtyOut.setSumZhi(sum2);
//		xywzWareInvtyOut.setWeight();//重量
		xywzWareInvtyOut.setMemo("仓库库存分配");//备注
		Map<String,String> map = XywzWareQualityCheckService.getCustInfo(contrNum);
		
		xywzWareInvtyOut.setOutCustId(map.get("custId"));//出库客户ID
		xywzWareInvtyOut.setOutCustName(map.get("custName"));//出库客户姓名
		xywzWareInvtyOut.setOutWhsDt(new Date());//出库日期
		xywzWareInvtyOut.setOutWhsExecPers(auth.getUserId());//出库执行人
		
		super.save(xywzWareInvtyOut);
		
	}
	
	//库存再分配
	public void againDistriWare(String outId,String jianCnt,String remZhiCnt,String chdId,String contrNum){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();	
		
		XywzWareInvtyOut xywzWareInvtyOut=em.find(XywzWareInvtyOut.class, Long.parseLong(outId));
		
		BigInteger sum1 = xywzWareInvtyOut.getZhiCnt().multiply(xywzWareInvtyOut.getJianCnt()).add(xywzWareInvtyOut.getRemZhiCnt());
		BigInteger sum2 = xywzWareInvtyOut.getZhiCnt().multiply(new BigInteger(jianCnt)).add(new BigInteger(remZhiCnt));
		BigInteger remsum = sum1.subtract(sum2);
		BigInteger jianCnt1=remsum.divide(xywzWareInvtyOut.getZhiCnt());
		BigInteger remZhiCnt1=remsum.remainder(xywzWareInvtyOut.getZhiCnt());
		xywzWareInvtyOut.setJianCnt(jianCnt1);
		xywzWareInvtyOut.setRemZhiCnt(remZhiCnt1);
		
		super.save(xywzWareInvtyOut);
		
		//向出库表中插入数据
		XywzWareInvtyOut newOut = new XywzWareInvtyOut();
		newOut.setInvtyId(xywzWareInvtyOut.getInvtyId());//库存ID
		
		newOut.setContrNum(contrNum);//合同号
		newOut.setMerchdId(Long.parseLong(chdId));//商品ID
		
		newOut.setLen(xywzWareInvtyOut.getLen());//长度
		newOut.setNgtvPoor(xywzWareInvtyOut.getNgtvPoor());//负差
		newOut.setPrdName(xywzWareInvtyOut.getPrdName());//品名
		newOut.setSpcModel(xywzWareInvtyOut.getSpcModel());//规格型号
		newOut.setDenst(xywzWareInvtyOut.getDenst());//密度

		newOut.setZhiCnt(xywzWareInvtyOut.getZhiCnt());//支/件
		newOut.setJianCnt(new BigInteger(jianCnt));//件数
		newOut.setRemZhiCnt(new BigInteger(remZhiCnt));//零支
//		newOut.setWeight(new BigDecimal(weight));//重量
		newOut.setMemo("库存分配再调整");//备注
		Map<String,String> map = XywzWareQualityCheckService.getCustInfo(contrNum);
		
		newOut.setOutCustId(map.get("custId"));//出库客户ID
		newOut.setOutCustName(map.get("custName"));//出库客户姓名
		newOut.setOutWhsDt(new Date());//出库日期
		newOut.setOutWhsExecPers(auth.getUserId());//出库执行人
		newOut.setAgainOutId(xywzWareInvtyOut.getOutId());
		super.save(newOut);
		
	}
}


