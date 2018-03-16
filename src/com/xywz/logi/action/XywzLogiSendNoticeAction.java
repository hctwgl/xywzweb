package com.xywz.logi.action;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.logi.model.XywzLogiSendNotice;
import com.xywz.logi.service.XywzLogiSendNoticeService;
import com.xywztech.bob.common.CommonAction;



/*
 * 银行管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzLogiSendNoticeAction")
public class XywzLogiSendNoticeAction extends CommonAction {
	
	@Autowired
	private XywzLogiSendNoticeService service;//定义XywzParaBank属性

	
	@Autowired
	public void init() {
		model = new XywzLogiSendNotice();
		setCommonService(service);
		insertSheetHis();
	}
	
	public void insertSheetHis(){
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String sheetId=request.getParameter("sheetId");
		if (sheetId == null){
		   return;	
		}
		service.insertSheetHis(sheetId);
	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzLogiSendNotice C WHERE C.sendSheetAdvsId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");		
        return "success";
    }
    
    public String updateStatus(){
    	//service1 = new XywzLogiDelvMerchdService();
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String sheetNum = request.getParameter("sheetNum");
		String flag = request.getParameter("flag");
		String jql="";
		String dvlJql="";
		Date date = new Date();
		DateFormat format=new SimpleDateFormat("yyyy-MM-dd");
		String sendDt=format.format(date);
		
		System.out.print("falg="+flag);
		System.out.print(sheetNum);
		if (flag==null){
		   jql="update XywzLogiSendNotice C set C.confirmSend='1',C.sendDt='"+sendDt+"',C.cancelSendDt = NULL " +
		   		"WHERE C.sendSheetAdvsNum IN ('"+sheetNum+"')"; //确认发货
//		   model = new XywzLogiDelvMerchd();
//		   setCommonService(service1);
//		   dvlJql="update XywzLogiDelvMerchdService c set c.confirmSend='1' where c.sendSheetAdvsNumIN ('"+sheetNum+"')";
		}
		if (flag!=null && flag.equals("fanxiada")){		
		  jql="update XywzLogiSendNotice C set C.confirmSend='0',C.cancelSendDt='"+sendDt+"',C.sendDt = NULL " +
		  		"WHERE C.sendSheetAdvsNum IN ('"+sheetNum+"')";//取消发货
//		  dvlJql="update XywzLogiDelvMerchdService c set c.confirmSend='0' where c.sendSheetAdvsNumIN ('"+sheetNum+"')";
		}
		
		Map<String,Object> values=new HashMap<String,Object>();
//		Map<String,Object> values1=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
//		service1.batchUpdateByName(dvlJql, values1);
		addActionMessage("batch update successfully");
        return "success";
    }
}



