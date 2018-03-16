package com.xywztech.bcrm.custview.service;


import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.springframework.stereotype.Service;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custview.model.AcrmFCiDemandInfo;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

/**
 * 
 * @author huwei
 *客户需求信息
 */
@Service
public class AcrmFCiDemandInfoService extends CommonService {
	
	public AcrmFCiDemandInfoService(){
		JPABaseDAO<AcrmFCiDemandInfo,Long> baseDao = new JPABaseDAO<AcrmFCiDemandInfo,Long>(AcrmFCiDemandInfo.class);
		super.setBaseDAO(baseDao);
	}
	//增加或者修客户的喜好的方法
	 @Override
	public Object save(Object model) {
		 /*'custId':cust_id,
			'expFinancSer' : exp_financ_ser,
			'expFinaMgrLinkWay' : Exexp_fina_mgr_link_way,
			'expRecFinanInfo' : exp_rec_finan_info,
			'expJoinSalonActiv':exp_join_salon_activ,
			'personHobby':person_hobby,
			'expLinkTime':exp_link_time,
			//礼物收件人的姓名
			'presentRecName':Ext.getCmp('presentRecName').getValue(),
			//礼物收件人的地址
			'presentRecAddr':Ext.getCmp('presentRecAddr').getValue(),
			//礼物收件人的电话
			'presentRecLinkPhon':Ext.getCmp('presentRecLinkPhon').getValue(),
			//特别需求
			
			'especialDemand':Ext.getCmp('especialDemand').getValue(),
			//忌讳
			'taboo':Ext.getCmp('taboo').getValue(),
			//备注
			'remark':Ext.getCmp('remark').getValue()*/
		  AcrmFCiDemandInfo acrmFCiDemandInfo = (AcrmFCiDemandInfo)model;
		  ActionContext ctx = ActionContext.getContext();
		  HttpServletRequest request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		  	String id_pk = request.getParameter("id");
		  if(id_pk.length()!=0){
			  long id = Long.parseLong(request.getParameter("id"));
			  acrmFCiDemandInfo.setId(id);
		  }
		  acrmFCiDemandInfo.setCustId(request.getParameter("custId"));
		  acrmFCiDemandInfo.setExpFinancSer(request.getParameter("expFinancSer"));
		  acrmFCiDemandInfo.setExpFinaMgrLinkWay(request.getParameter("expFinaMgrLinkWay"));
		  acrmFCiDemandInfo.setExpRecFinanInfo(request.getParameter("expRecFinanInfo"));
		  acrmFCiDemandInfo.setExpJoinSalonActiv(request.getParameter("expJoinSalonActiv"));
		  acrmFCiDemandInfo.setPersonHobby(request.getParameter("personHobby"));
		  acrmFCiDemandInfo.setExpLinkTime(request.getParameter("expLinkTime"));
		  acrmFCiDemandInfo.setPresentRecName(request.getParameter("presentRecName"));
		  acrmFCiDemandInfo.setPresentRecAddr(request.getParameter("presentRecAddr"));
		  acrmFCiDemandInfo.setPresentRecLinkPhon(request.getParameter("presentRecLinkPhon"));
		  acrmFCiDemandInfo.setEspecialDemand(request.getParameter("especialDemand"));
		  acrmFCiDemandInfo.setTaboo(request.getParameter("taboo"));
		  acrmFCiDemandInfo.setRemark(request.getParameter("remark"));
	      return super.save(acrmFCiDemandInfo);

	 }
	
}
