package com.xywz.sale.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.sale.model.XywzSaleCommsnMgmt;
import com.xywz.sale.service.XywzSaleCommsnMgmtService;
import com.xywztech.bob.common.CommonAction;



/*
 * 内贸商品明细Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzSaleCommsnMgmtAction")
public class XywzSaleCommsnMgmtAction extends CommonAction {
	
	@Autowired
	private XywzSaleCommsnMgmtService service;//定义属性
	

	
	@Autowired
	public void init() {
		model = new XywzSaleCommsnMgmt();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzSaleCommsnMgmt C WHERE C.commsnId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



