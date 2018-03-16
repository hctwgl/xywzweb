package com.xywz.purc.action;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.purc.model.XywzPurcOutPurcContract;
import com.xywz.purc.service.XywzPurcOutPurcContractService;
import com.xywztech.bob.common.CommonAction;



/*
 * 外部采购合同管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzPurcOutPurcContractAction")
public class XywzPurcOutPurcContractAction extends CommonAction {
	
	@Autowired
	private XywzPurcOutPurcContractService service;//定义XywzPurcOutPurcContract属性
	

	
	@Autowired
	public void init() {
		model = new XywzPurcOutPurcContract();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String puchSnglId = request.getParameter("puchSnglId");
		try {
			service.check(puchSnglId);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		String jql="DELETE FROM XywzPurcOutPurcContract C WHERE C.id IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
}



