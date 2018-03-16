package com.xywz.sysm.service;


import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywz.sysm.model.XywzSysmMsgRmnd;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 外协加工产品信息管理Service
 * @author 
 * @since 
 */
@Service
public class XywzSysmMsgRmndService extends CommonService {
   
	public XywzSysmMsgRmndService(){
		JPABaseDAO<XywzSysmMsgRmnd, Long>  baseDAO = new JPABaseDAO<XywzSysmMsgRmnd, Long>();  
		super.setBaseDAO(baseDAO);
	}

	public void insertRemind(String confirmSend,String contrNum,String custNm) {
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		XywzSysmMsgRmnd xywzSysmMsgRmnd = new XywzSysmMsgRmnd();
		System.out.println(confirmSend+":"+contrNum+":"+custNm);
		if (confirmSend == null || confirmSend.equals("0") ){
			xywzSysmMsgRmnd.setRemName("104");
			Date date = new Date();
			xywzSysmMsgRmnd.setRemBegDt(date);
			xywzSysmMsgRmnd.setReadFlag("0"); //0:未阅读；1：已阅读
			xywzSysmMsgRmnd.setValidFlag("1");//0：失效；1：有效
			xywzSysmMsgRmnd.setRemTouchCstid(auth.getUserId());
			xywzSysmMsgRmnd.setRemTouchCstnm(auth.getUsername());
			xywzSysmMsgRmnd.setRecvCstid("gxb");
			xywzSysmMsgRmnd.setRecvCstnm("供销部");
			xywzSysmMsgRmnd.setRemContent("合同号为："+contrNum+",客户为："+custNm+",已确认发货，请及时处理!");
			xywzSysmMsgRmnd.setOperDt(date);
			super.save(xywzSysmMsgRmnd);
		}
		if (confirmSend.equals("1")){
			xywzSysmMsgRmnd.setRemName("104");
			Date date = new Date();
			xywzSysmMsgRmnd.setRemBegDt(date);
			xywzSysmMsgRmnd.setReadFlag("0"); //0:未阅读；1：已阅读
			xywzSysmMsgRmnd.setValidFlag("1");//0：失效；1：有效
			xywzSysmMsgRmnd.setRemTouchCstid(auth.getUserId());
			xywzSysmMsgRmnd.setRemTouchCstnm(auth.getUsername());
			xywzSysmMsgRmnd.setRecvCstid("gxb");
			xywzSysmMsgRmnd.setRecvCstnm("供销部");
			xywzSysmMsgRmnd.setRemContent("合同号为："+contrNum+",客户为："+custNm+",已确认取消发货，请及时处理!");
			xywzSysmMsgRmnd.setOperDt(date);
			super.save(xywzSysmMsgRmnd);
		}
	}
		
		public void insertRemindComm(String remName,String recvCstid,String str1,String str2,String sign) {
			AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			XywzSysmMsgRmnd xywzSysmMsgRmnd = new XywzSysmMsgRmnd();
			System.out.println(remName+":"+recvCstid+":"+str1+":"+str2+":"+sign);
			String recvCstnm="";
			String remContent="";
			if (recvCstid.equals("gxb")) {
				recvCstnm="供销部";	
			} 
			if (remName.equals("105")){
				if (sign.equals("105-1")){
					remContent="采购单编号为："+str1+",供应商为："+str2+",已录入完毕，请及时处理!";
				}
				if (sign.equals("105-2")){
					remContent="采购单编号为："+str1+",供应商为："+str2+",已修改，请知悉!";
				}
			}

			xywzSysmMsgRmnd.setRemName(remName);
			Date date = new Date();
			xywzSysmMsgRmnd.setRemBegDt(date);
			xywzSysmMsgRmnd.setReadFlag("0"); //0:未阅读；1：已阅读
			xywzSysmMsgRmnd.setValidFlag("1");//0：失效；1：有效
			xywzSysmMsgRmnd.setRemTouchCstid(auth.getUserId());
			xywzSysmMsgRmnd.setRemTouchCstnm(auth.getUsername());
			xywzSysmMsgRmnd.setRecvCstid(recvCstid);
			xywzSysmMsgRmnd.setRecvCstnm(recvCstnm);
			xywzSysmMsgRmnd.setRemContent(remContent);
			xywzSysmMsgRmnd.setOperDt(date);
			super.save(xywzSysmMsgRmnd);		
	}


}


