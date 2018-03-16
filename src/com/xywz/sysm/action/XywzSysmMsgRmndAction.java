package com.xywz.sysm.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywz.sysm.model.XywzSysmMsgRmnd;
import com.xywz.sysm.service.XywzSysmMsgRmndService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.vo.AuthUser;



/*
 * 外协加工产品信息管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzSysmMsgRmndAction")
public class XywzSysmMsgRmndAction extends CommonAction {
	
	@Autowired
	private XywzSysmMsgRmndService service;//定义XywzAsstMachgProduct属性
	

	
	@Autowired
	public void init() {
		model = new XywzSysmMsgRmnd();
		setCommonService(service);
	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzSysmMsgRmnd C WHERE remId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");		
        return "success";
    }
    
    public void insertRemind(){
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String confirmSend = request.getParameter("confirmSend");
        String contrNum = request.getParameter("contrNum");
        String custNm= request.getParameter("custNm");
        System.out.println(confirmSend+":"+contrNum+":"+custNm);
    	service.insertRemind(confirmSend,contrNum,custNm);
    }
    public void insertRemindComm(){
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String remName = request.getParameter("remName");
        String recvCstid = request.getParameter("recvCstid");
        String str1= request.getParameter("str1");
        String str2= request.getParameter("str2");
        String sign= request.getParameter("sign");
        System.out.println(remName+":"+recvCstid+":"+str1+":"+str2+":"+sign);
    	service.insertRemindComm(remName,recvCstid,str1,str2,sign);
    }
    public String updateRemindComm(){
		    AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	   	ActionContext ctx = ActionContext.getContext();
            request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    		String idStr = request.getParameter("idStr");
    		String flag = request.getParameter("flag");
    		String jql="update XywzSysmMsgRmnd C set C.readFlag='1',C.readCstid='"+auth.getUnitId()+"',C.readCstnm='"+auth.getUsername()+"' WHERE C.remId IN ("+idStr+")";
    		if (flag!=null && flag.equals("wuxiao")){		
    			 jql="update XywzSysmMsgRmnd C set C.validflag='0',C.readCstid='"+auth.getUnitId()+"',C.readCstnm='"+auth.getUsername()+"' WHERE C.remId IN ("+idStr+")";

    		}
    		
    		Map<String,Object> values=new HashMap<String,Object>();
    		service.batchUpdateByName(jql, values);
    		addActionMessage("batch update successfully");
    		
            return "success";
        }
}



