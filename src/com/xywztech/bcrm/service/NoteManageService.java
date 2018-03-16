package com.xywztech.bcrm.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import net.sf.json.JSONArray;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.OcrmFCiCustDesc;
import com.xywztech.bcrm.model.OcrmFWkMessageSend;
import com.xywztech.bcrm.system.model.AdminAuthAccount;
import com.xywztech.bcrm.vo.ConstantUtil;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

@Service
public class NoteManageService extends CommonService{
	
		public NoteManageService(){
		   JPABaseDAO<OcrmFWkMessageSend, Long>  baseDAO=new JPABaseDAO<OcrmFWkMessageSend, Long>(OcrmFWkMessageSend.class);  
		   super.setBaseDAO(baseDAO);
	   }
		//批量删除
	public void batchDel(String idStr) throws Exception {
		String[] strarray = idStr.split(",");
		for (int i = 0; i < strarray.length; i++) {
			Long id = Long.parseLong(strarray[i]);
			OcrmFWkMessageSend obj = (OcrmFWkMessageSend) find(id);
			if (obj != null) {
				obj.setState("1");
				em.persist(obj);
			}
		}
	}
	//查看详情
	@SuppressWarnings("unchecked")
	public String  lopkDetail(Long messageId,Long isReadFlag){
		OcrmFWkMessageSend  cms = new OcrmFWkMessageSend();
		cms.setMessageId(messageId);
		String JQL = "select t from OcrmFWkMessageSend t where t.messageId = ?1";
		Query q =em.createQuery(JQL);
		q.setParameter(1, messageId);
		List<OcrmFWkMessageSend>  rs = q.getResultList();
		cms = rs.get(0);
		cms.setReadTime(new Date());
		cms.setIsReadFlag(ConstantUtil.MESSAGE_SEND_IS_READ_FLAG_YES);
		super.save(cms);
		return "";
	}
	//根据账号名称获取客户经理信息
	@SuppressWarnings("unchecked")
	public AdminAuthAccount getAdminAuthAccount(String staffId) {
		String JQL = "select t from AdminAuthAccount t where t.accountName = ?1";
		Query q = em.createQuery(JQL);
		q.setParameter(1, staffId);
		List<AdminAuthAccount> list = q.getResultList();
		if (list.size() > 0)
			return list.get(0);
		else
			return null;
	}
	//根据客户ID获取客户信息
	@SuppressWarnings("unchecked")
	public OcrmFCiCustDesc getOcrmFCiCustDesc(String custId) {
		String JQL = "select t from OcrmFCiCustDesc t where t.custId = ?1";
		Query q = em.createQuery(JQL);
		q.setParameter(1, custId);
		List<OcrmFCiCustDesc> rsList = q.getResultList();
		if (rsList.size() > 0)
			return rsList.get(0);
		else
			return null;
	}
	//根据手机号获取收件人为用户的信息
	@SuppressWarnings("unchecked")
	public AdminAuthAccount getAdminAuthAccountByTel(String tel) {
		String JQL = "select t from AdminAuthAccount t where t.mobilephone = ?1";
		Query q = em.createQuery(JQL);
		q.setParameter(1, tel);
		List<AdminAuthAccount> list = q.getResultList();
		if (list.size() > 0)
			return list.get(0);
		else
			return null;
	}
	//根据手机号获取收件人为客户的信息
	@SuppressWarnings("unchecked")
	public OcrmFCiCustDesc getOcrmFCiCustDescByTel(String tel) {
		String JQL = "select t from OcrmFCiCustDesc t where t.telephoneNum = ?1";
		Query q = em.createQuery(JQL);
		q.setParameter(1, tel);
		List<OcrmFCiCustDesc> rsList = q.getResultList();
		if (rsList.size() > 0)
			return rsList.get(0);
		else
			return null;
	}
	//通过sendType:1,发送短信  arr1---custIdArray;arr2---managerIdArray
	public String sendMessageNow(JSONArray arr1,JSONArray arr2,String handTel_s,String content_s,Long sendType) throws Exception{
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
        AdminAuthAccount account = this.getAdminAuthAccount(currenUserId);
        //接收人为客户
        			for(int i=0;i<arr1.size();i++){
        				OcrmFCiCustDesc receive = this.getOcrmFCiCustDesc((String)arr1.get(i));
        				OcrmFWkMessageSend cms = new OcrmFWkMessageSend();
        				cms.setSendChannel(ConstantUtil.SEND_CHANNEL_USER);
        				cms.setSendType(sendType);
        				cms.setSendUserType(ConstantUtil.SEND_USER_TYPE_USER);
        				cms.setSendUserId(account.getAccountName());
        				cms.setSendUserName(account.getUserName());
        				cms.setSendUserTel(account.getMobilephone());
        				cms.setSendUserMail(null);
        				cms.setReceiveUserType(ConstantUtil.RECEIVE_USER_TYPE_CUST);
        				cms.setReceiveUserId(receive.getCustId());
        				cms.setReceiveUserName(receive.getCustZhName());
        				cms.setReceiveUserTel(receive.getTelephoneNum());
        				cms.setReceiveUserMail(null);
        				cms.setTitle(null);
        				cms.setContent(content_s);
        				cms.setSendTime(new Date());
        				cms.setIsReadFlag(ConstantUtil.MESSAGE_SEND_IS_READ_FLAG_NO);
        				cms.setState(ConstantUtil.MESSAGE_SEND_IS_DEL_FLAG_NO);
        				cms.setTimer(null);
        				cms.setIsSendFlag(ConstantUtil.MESSAGE_SEND_IS_SEND_FLAG_YES);
        				cms.setMessageType(ConstantUtil.MESSAGE_TYPE_GENERAL);
        				cms.setCorrelativeModuleType(null);
        				cms.setCorrelativeModuleName(null);
        				cms.setCorrelativeModuleId(null);
        				super.save(cms);
        			}
        			//接受人为客户经理
        			for(int i=0;i<arr2.size();i++){
        				AdminAuthAccount receive = this.getAdminAuthAccount((String)arr2.get(i));
        				OcrmFWkMessageSend cms = new OcrmFWkMessageSend();
        				cms.setSendChannel(ConstantUtil.SEND_CHANNEL_USER);
        				cms.setSendType(sendType);
        				cms.setSendUserType(ConstantUtil.SEND_USER_TYPE_USER);
        				cms.setSendUserId(account.getAccountName());
        				cms.setSendUserName(account.getUserName());
        				cms.setSendUserTel(account.getMobilephone());
        				cms.setSendUserMail(account.getEmail());
        				cms.setReceiveUserType(ConstantUtil.RECEIVE_USER_TYPE_USER);
        				cms.setReceiveUserId(receive.getAccountName());
        				cms.setReceiveUserName(receive.getUserName());
        				cms.setReceiveUserTel(receive.getMobilephone());
        				cms.setReceiveUserMail(null);
        				cms.setTitle(null);
        				cms.setContent(content_s);
        				cms.setSendTime(new Date());
        				cms.setIsReadFlag(ConstantUtil.MESSAGE_SEND_IS_READ_FLAG_NO);
        				cms.setState(ConstantUtil.MESSAGE_SEND_IS_DEL_FLAG_NO);
        				cms.setTimer(null);
        				cms.setIsSendFlag(ConstantUtil.MESSAGE_SEND_IS_SEND_FLAG_YES);
        				cms.setMessageType(ConstantUtil.MESSAGE_TYPE_GENERAL);
        				cms.setCorrelativeModuleType(null);
        				cms.setCorrelativeModuleName(null);
        				cms.setCorrelativeModuleId(null);
        				super.save(cms);
        			}
        			//接收号码为手动输入号码
        			String[] tel_array = handTel_s.split(",");
        			if(tel_array.length>1){
        				
        			
        			for (int i = 0; i < tel_array.length; i++) {//接受人为客户经理的手机号
        				if(this.getAdminAuthAccountByTel(tel_array[i])!=null){
        					AdminAuthAccount receive = this.getAdminAuthAccountByTel(tel_array[i]);
            				OcrmFWkMessageSend cms = new OcrmFWkMessageSend();
            				cms.setSendChannel(ConstantUtil.SEND_CHANNEL_USER);
            				cms.setSendType(sendType);
            				cms.setSendUserType(ConstantUtil.SEND_USER_TYPE_USER);
            				cms.setSendUserId(account.getAccountName());
            				cms.setSendUserName(account.getUserName());
            				cms.setSendUserTel(account.getMobilephone());
            				cms.setSendUserMail(account.getEmail());
            				cms.setReceiveUserType(ConstantUtil.RECEIVE_USER_TYPE_USER);
            				cms.setReceiveUserId(receive.getAccountName());
            				cms.setReceiveUserName(receive.getUserName());
            				cms.setReceiveUserTel(receive.getMobilephone());
            				cms.setReceiveUserMail(null);
            				cms.setTitle(null);
            				cms.setContent(content_s);
            				cms.setSendTime(new Date());
            				cms.setIsReadFlag(ConstantUtil.MESSAGE_SEND_IS_READ_FLAG_NO);
            				cms.setState(ConstantUtil.MESSAGE_SEND_IS_DEL_FLAG_NO);
            				cms.setTimer(null);
            				cms.setIsSendFlag(ConstantUtil.MESSAGE_SEND_IS_SEND_FLAG_YES);
            				cms.setMessageType(ConstantUtil.MESSAGE_TYPE_GENERAL);
            				cms.setCorrelativeModuleType(null);
            				cms.setCorrelativeModuleName(null);
            				cms.setCorrelativeModuleId(null);
            				super.save(cms);
        				}else if(this.getOcrmFCiCustDescByTel(tel_array[i])!=null){
        					OcrmFCiCustDesc receive = this.getOcrmFCiCustDescByTel(tel_array[i]);
            				OcrmFWkMessageSend cms = new OcrmFWkMessageSend();
            				cms.setSendChannel(ConstantUtil.SEND_CHANNEL_USER);
            				cms.setSendType(sendType);
            				cms.setSendUserType(ConstantUtil.SEND_USER_TYPE_USER);
            				cms.setSendUserId(account.getAccountName());
            				cms.setSendUserName(account.getUserName());
            				cms.setSendUserTel(account.getMobilephone());
            				cms.setSendUserMail(account.getEmail());
            				cms.setReceiveUserType(ConstantUtil.RECEIVE_USER_TYPE_CUST);
            				cms.setReceiveUserId(receive.getCustId());
            				cms.setReceiveUserName(receive.getCustZhName());
            				cms.setReceiveUserTel(receive.getTelephoneNum());
            				cms.setReceiveUserMail(null);
            				cms.setTitle(null);
            				cms.setContent(content_s);
            				cms.setSendTime(new Date());
            				cms.setIsReadFlag(ConstantUtil.MESSAGE_SEND_IS_READ_FLAG_NO);
            				cms.setState(ConstantUtil.MESSAGE_SEND_IS_DEL_FLAG_NO);
            				cms.setTimer(null);
            				cms.setIsSendFlag(ConstantUtil.MESSAGE_SEND_IS_SEND_FLAG_YES);
            				cms.setMessageType(ConstantUtil.MESSAGE_TYPE_GENERAL);
            				cms.setCorrelativeModuleType(null);
            				cms.setCorrelativeModuleName(null);
            				cms.setCorrelativeModuleId(null);
            				super.save(cms);
        				}else{
            				OcrmFWkMessageSend cms = new OcrmFWkMessageSend();
            				cms.setSendChannel(ConstantUtil.SEND_CHANNEL_USER);
            				cms.setSendType(sendType);
            				cms.setSendUserType(ConstantUtil.SEND_USER_TYPE_USER);
            				cms.setSendUserId(account.getAccountName());
            				cms.setSendUserName(account.getUserName());
            				cms.setSendUserTel(account.getMobilephone());
            				cms.setSendUserMail(account.getEmail());
            				cms.setReceiveUserType(null);
            				cms.setReceiveUserId(null);
            				cms.setReceiveUserName(tel_array[i]);
            				cms.setReceiveUserTel(tel_array[i]);
            				cms.setReceiveUserMail(null);
            				cms.setTitle(null);
            				cms.setContent(content_s);
            				cms.setSendTime(new Date());
            				cms.setIsReadFlag(ConstantUtil.MESSAGE_SEND_IS_READ_FLAG_NO);
            				cms.setState(ConstantUtil.MESSAGE_SEND_IS_DEL_FLAG_NO);
            				cms.setTimer(null);
            				cms.setIsSendFlag(ConstantUtil.MESSAGE_SEND_IS_SEND_FLAG_YES);
            				cms.setMessageType(ConstantUtil.MESSAGE_TYPE_GENERAL);
            				cms.setCorrelativeModuleType(null);
            				cms.setCorrelativeModuleName(null);
            				cms.setCorrelativeModuleId(null);
            				super.save(cms);
        				}
        			}
        			}
		return "success";
	}
	//通过sendType:1,发送短信  arr1---custIdArray;arr2---managerIdArray
	public String sendByTime(JSONArray arr1,JSONArray arr2,String handTel_s,String content_s,String datetime,Long sendType) throws Exception{
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String currenUserId = auth.getUserId();
		AdminAuthAccount account = this.getAdminAuthAccount(currenUserId);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date dt = sdf.parse(datetime);
		//接收人为客户
		for(int i=0;i<arr1.size();i++){
			OcrmFCiCustDesc receive = this.getOcrmFCiCustDesc((String)arr1.get(i));
			OcrmFWkMessageSend cms = new OcrmFWkMessageSend();
			cms.setSendChannel(ConstantUtil.SEND_CHANNEL_USER);
			cms.setSendType(sendType);
			cms.setSendUserType(ConstantUtil.SEND_USER_TYPE_USER);
			cms.setSendUserId(account.getAccountName());
			cms.setSendUserName(account.getUserName());
			cms.setSendUserTel(account.getMobilephone());
			cms.setSendUserMail(null);
			cms.setReceiveUserType(ConstantUtil.RECEIVE_USER_TYPE_CUST);
			cms.setReceiveUserId(receive.getCustId());
			cms.setReceiveUserName(receive.getCustZhName());
			cms.setReceiveUserTel(receive.getTelephoneNum());
			cms.setReceiveUserMail(null);
			cms.setTitle(null);
			cms.setContent(content_s);
			cms.setSendTime(null);
			cms.setIsReadFlag(ConstantUtil.MESSAGE_SEND_IS_READ_FLAG_NO);
			cms.setState(ConstantUtil.MESSAGE_SEND_IS_DEL_FLAG_NO);
			cms.setTimer(new Date(dt.getTime()));
			cms.setIsSendFlag(ConstantUtil.MESSAGE_SEND_IS_SEND_FLAG_YES);
			cms.setMessageType(ConstantUtil.MESSAGE_TYPE_GENERAL);
			cms.setCorrelativeModuleType(null);
			cms.setCorrelativeModuleName(null);
			cms.setCorrelativeModuleId(null);
			super.save(cms);
		}
		//接受人为客户经理
		for(int i=0;i<arr2.size();i++){
			AdminAuthAccount receive = this.getAdminAuthAccount((String)arr2.get(i));
			OcrmFWkMessageSend cms = new OcrmFWkMessageSend();
			cms.setSendChannel(ConstantUtil.SEND_CHANNEL_USER);
			cms.setSendType(sendType);
			cms.setSendUserType(ConstantUtil.SEND_USER_TYPE_USER);
			cms.setSendUserId(account.getAccountName());
			cms.setSendUserName(account.getUserName());
			cms.setSendUserTel(account.getMobilephone());
			cms.setSendUserMail(account.getEmail());
			cms.setReceiveUserType(ConstantUtil.RECEIVE_USER_TYPE_USER);
			cms.setReceiveUserId(receive.getAccountName());
			cms.setReceiveUserName(receive.getUserName());
			cms.setReceiveUserTel(receive.getMobilephone());
			cms.setReceiveUserMail(null);
			cms.setTitle(null);
			cms.setContent(content_s);
			cms.setSendTime(null);
			cms.setIsReadFlag(ConstantUtil.MESSAGE_SEND_IS_READ_FLAG_NO);
			cms.setState(ConstantUtil.MESSAGE_SEND_IS_DEL_FLAG_NO);
			cms.setTimer(new Date(dt.getTime()));
			cms.setIsSendFlag(ConstantUtil.MESSAGE_SEND_IS_SEND_FLAG_YES);
			cms.setMessageType(ConstantUtil.MESSAGE_TYPE_GENERAL);
			cms.setCorrelativeModuleType(null);
			cms.setCorrelativeModuleName(null);
			cms.setCorrelativeModuleId(null);
			super.save(cms);
		}
		//接收号码为手动输入号码
		if(!"".equals(handTel_s)){
			String[] tel_array = handTel_s.split(",");
			for (int i = 0; i < tel_array.length; i++) {//接受人为客户经理的手机号
				if(this.getAdminAuthAccountByTel(tel_array[i])!=null){
					AdminAuthAccount receive = this.getAdminAuthAccountByTel(tel_array[i]);
					OcrmFWkMessageSend cms = new OcrmFWkMessageSend();
					cms.setSendChannel(ConstantUtil.SEND_CHANNEL_USER);
					cms.setSendType(sendType);
					cms.setSendUserType(ConstantUtil.SEND_USER_TYPE_USER);
					cms.setSendUserId(account.getAccountName());
					cms.setSendUserName(account.getUserName());
					cms.setSendUserTel(account.getMobilephone());
					cms.setSendUserMail(account.getEmail());
					cms.setReceiveUserType(ConstantUtil.RECEIVE_USER_TYPE_USER);
					cms.setReceiveUserId(receive.getAccountName());
					cms.setReceiveUserName(receive.getUserName());
					cms.setReceiveUserTel(receive.getMobilephone());
					cms.setReceiveUserMail(null);
					cms.setTitle(null);
					cms.setContent(content_s);
					cms.setSendTime(null);
					cms.setIsReadFlag(ConstantUtil.MESSAGE_SEND_IS_READ_FLAG_NO);
					cms.setState(ConstantUtil.MESSAGE_SEND_IS_DEL_FLAG_NO);
					cms.setTimer(new Date(dt.getTime()));
					cms.setIsSendFlag(ConstantUtil.MESSAGE_SEND_IS_SEND_FLAG_YES);
					cms.setMessageType(ConstantUtil.MESSAGE_TYPE_GENERAL);
					cms.setCorrelativeModuleType(null);
					cms.setCorrelativeModuleName(null);
					cms.setCorrelativeModuleId(null);
					super.save(cms);
				}else if(this.getOcrmFCiCustDescByTel(tel_array[i])!=null){
					OcrmFCiCustDesc receive = this.getOcrmFCiCustDescByTel(tel_array[i]);
					OcrmFWkMessageSend cms = new OcrmFWkMessageSend();
					cms.setSendChannel(ConstantUtil.SEND_CHANNEL_USER);
					cms.setSendType(sendType);
					cms.setSendUserType(ConstantUtil.SEND_USER_TYPE_USER);
					cms.setSendUserId(account.getAccountName());
					cms.setSendUserName(account.getUserName());
					cms.setSendUserTel(account.getMobilephone());
					cms.setSendUserMail(account.getEmail());
					cms.setReceiveUserType(ConstantUtil.RECEIVE_USER_TYPE_CUST);
					cms.setReceiveUserId(receive.getCustId());
					cms.setReceiveUserName(receive.getCustZhName());
					cms.setReceiveUserTel(receive.getTelephoneNum());
					cms.setReceiveUserMail(null);
					cms.setTitle(null);
					cms.setContent(content_s);
					cms.setSendTime(null);
					cms.setIsReadFlag(ConstantUtil.MESSAGE_SEND_IS_READ_FLAG_NO);
					cms.setState(ConstantUtil.MESSAGE_SEND_IS_DEL_FLAG_NO);
					cms.setTimer(new Date(dt.getTime()));
					cms.setIsSendFlag(ConstantUtil.MESSAGE_SEND_IS_SEND_FLAG_YES);
					cms.setMessageType(ConstantUtil.MESSAGE_TYPE_GENERAL);
					cms.setCorrelativeModuleType(null);
					cms.setCorrelativeModuleName(null);
					cms.setCorrelativeModuleId(null);
					super.save(cms);
				}else{
					OcrmFWkMessageSend cms = new OcrmFWkMessageSend();
					cms.setSendChannel(ConstantUtil.SEND_CHANNEL_USER);
					cms.setSendType(sendType);
					cms.setSendUserType(ConstantUtil.SEND_USER_TYPE_USER);
					cms.setSendUserId(account.getAccountName());
					cms.setSendUserName(account.getUserName());
					cms.setSendUserTel(account.getMobilephone());
					cms.setSendUserMail(account.getEmail());
					cms.setReceiveUserType(null);
					cms.setReceiveUserId(null);
					cms.setReceiveUserName(tel_array[i]);
					cms.setReceiveUserTel(tel_array[i]);
					cms.setReceiveUserMail(null);
					cms.setTitle(null);
					cms.setContent(content_s);
					cms.setSendTime(null);
					cms.setIsReadFlag(ConstantUtil.MESSAGE_SEND_IS_READ_FLAG_NO);
					cms.setState(ConstantUtil.MESSAGE_SEND_IS_DEL_FLAG_NO);
					cms.setTimer(new Date(dt.getTime()));
					cms.setIsSendFlag(ConstantUtil.MESSAGE_SEND_IS_SEND_FLAG_YES);
					cms.setMessageType(ConstantUtil.MESSAGE_TYPE_GENERAL);
					cms.setCorrelativeModuleType(null);
					cms.setCorrelativeModuleName(null);
					cms.setCorrelativeModuleId(null);
					super.save(cms);
				}
		}
			
		}
		
		return "success";
	}
	
	 
	  //通过手机号码查找用户ID
//	  public VCrmFwkMessage findIdByTel(String tel) throws SQLException{
//		  dsOracle = (DataSource) LookupManager.getInstance().getApplicationContext().getBean("dsOracle");
//		  	String sql = "select v.* from V_CRM_FWK_MESSAGE v where v.SENDUSERTEL  = '"+tel+"'";
//				Connection conn = dsOracle.getConnection();
//				 QueryHelper qh = new QueryHelper(sql, conn);
//				  ResultSet rs =qh.executeQuery();
//				  VCrmFwkMessage vm =null;
//				  while(rs.next()){
//					  Long sendUserId = rs.getLong(1);
//					  String sendUserName = rs.getString(2);
//					  Long sendUserType = rs.getLong(3);
//					  String sendUserTel = rs.getString(4);
//					  vm.setSendUserId(sendUserId);
//					  vm.setSendUserName(sendUserName);
//					  vm.setSendUserType(sendUserType);
//					  vm.setSendUserTel(sendUserTel);
//				  }
//		  	if(vm!=null){
//		  		return vm;
//		  	}else
//		  		return null;
//	  }
}
