package com.xywztech.bcrm.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custview.model.AcrmCreditCardInfo;
import com.xywztech.bcrm.custview.service.AcrmCreditCardInfoService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/acrmCreditCardInfo-info")
public class AcrmCreditCardInfoAction extends CommonAction {
	@Autowired
	private AcrmCreditCardInfoService acrmCreditCardInfoService;
	@Autowired
	public void init(){
		model = new AcrmCreditCardInfo();
		setCommonService(acrmCreditCardInfoService);
	}
	
	//分页查询
	public HttpHeaders indexPage() throws Exception{
		try {
			StringBuilder sb=new StringBuilder("select c from AcrmCreditCardInfo c where 1=1 ");
	    	Map<String,Object> values=new HashMap<String,Object>();
	    	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	        if(request.getParameter("start")!=null)
	        	start = new Integer(request.getParameter("start")).intValue();
	        if(request.getParameter("limit")!=null)
	        	limit = new Integer(request.getParameter("limit")).intValue();
		
			//获取客户编号
			if(request.getParameter("cust_id")!=null){
//				String aa="custId";
//				sb.append(" and c.custId = :"+aa);
//				String tt= request.getParameter("cust_id");
//				values.put(aa, tt);
				sb.append(" and c.customId = '"+request.getParameter("cust_id")+"'");
			}
			return super.indexPageByJql(sb.toString(), values);
		} catch (Exception e) {
			e.printStackTrace();
	    	  throw e;
		}
	}
	
}
