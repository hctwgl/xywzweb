package com.xywz.sale.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.sale.model.XywzSaleFrgnOrdrContr;
import com.xywz.sale.service.XywzSaleFrgnOrdrContrService;
import com.xywztech.bob.common.CommonAction;



/*
 * 外贸合同Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzSaleFrgnOrdrContrAction")
public class XywzSaleFrgnOrdrContrAction extends CommonAction {
	
	@Autowired
	private XywzSaleFrgnOrdrContrService service;//定义属性
	

	
	@Autowired
	public void init() {
		model = new XywzSaleFrgnOrdrContr();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzSaleFrgnOrdrContr C WHERE C.ordrId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
    public String updateStatus(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String flag = request.getParameter("flag");
		String jql="update XywzSaleFrgnOrdrContr C set C.chkStat='1' WHERE C.ordrId IN ("+idStr+")";
		if (flag!=null && flag.equals("fanxiada")){		
			 jql="update XywzSaleFrgnOrdrContr C set C.chkStat='0' WHERE C.ordrId IN ("+idStr+")";

		}
		
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch update successfully");
		
        return "success";
    }
    
  
}



