package com.xywztech.bcrm.action;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.model.OcrmFWkMessageSend;
import com.xywztech.bcrm.service.NoteManageService;
import com.xywztech.bcrm.vo.ConstantUtil;
import com.xywztech.bob.common.CommonAction;
@SuppressWarnings("serial")
@Action("/NoteManage")
public class NoteManageAction extends CommonAction {
	
	@Autowired
    private NoteManageService  noteManageService ;

    @Autowired
	public void init(){
	  	model = new OcrmFWkMessageSend(); 
		setCommonService(noteManageService);
	}
    
    //批量删除
    public String batchDel() throws Exception {
    	ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String idStr = request.getParameter("idStr");
        noteManageService.batchDel(idStr);
        addActionMessage("rollMember create successfully");
        return "success";
    }
    //查看
    public void lopkDetail() throws Exception{
    	ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String messageId = request.getParameter("messageId");
    	String readFlag = request.getParameter("readFlag");
    	noteManageService.lopkDetail(new Long(messageId),new Long(readFlag));
    }
    //发送短信sentType=1
    public String sendNoteNow() throws Exception{
    	ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String cust_idArr = request.getParameter("cust_json");
    	String manager_idArr = request.getParameter("manager_json");
    	String handTel_s = request.getParameter("handTel_s");
    	String content_s = request.getParameter("content_s");
    	JSONObject custIdObject =JSONObject.fromObject(cust_idArr);
	    JSONArray custIdJarray =  custIdObject.getJSONArray("custIdArr");
	    JSONObject managerIdObject =JSONObject.fromObject(manager_idArr);
	    JSONArray managerIdJarray =  managerIdObject.getJSONArray("managerIdArr");
        noteManageService.sendMessageNow(custIdJarray, managerIdJarray, handTel_s,content_s,ConstantUtil.MESSAGE_SEND_TYPE_TEL);
    	return "success";
    }
    //定时发送
    public String sendByTime() throws Exception{
    	ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String cust_idArr = request.getParameter("cust_json");
    	String manager_idArr = request.getParameter("manager_json");
    	String handTel_s = request.getParameter("handTel_s");
    	String content_s = request.getParameter("content_s");
    	String datetime = request.getParameter("datetime");
    	JSONObject custIdObject =JSONObject.fromObject(cust_idArr);
	    JSONArray custIdJarray =  custIdObject.getJSONArray("custIdArr");
	    JSONObject managerIdObject =JSONObject.fromObject(manager_idArr);
	    JSONArray managerIdJarray =  managerIdObject.getJSONArray("managerIdArr");
        noteManageService.sendByTime(custIdJarray, managerIdJarray, handTel_s,content_s,datetime,ConstantUtil.MESSAGE_SEND_TYPE_TEL);
    	return "success";
    }

    
}
