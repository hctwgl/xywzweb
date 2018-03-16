package com.xywztech.bcrm.custview.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custview.model.AcrmFCiBlacklist;
import com.xywztech.bcrm.custview.service.AcrmFCiBlacklistService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/AcrmFCiBlacklistAction-info")
public class AcrmFCiBlacklistAction extends CommonAction{
	@Autowired
	private AcrmFCiBlacklistService acrmFCiBlacklistService;
	@Autowired
	public void init(){
		model = new AcrmFCiBlacklist();
		setCommonService(acrmFCiBlacklistService);
	}
	
	public void updatetest(){
		//system.out.printlnln("updatetest");
	}
	
	public String query(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);	
        String condition = request.getParameter("condition");
        StringBuilder jql =new StringBuilder("select c from AcrmFCiBlacklist c where 1=1 ");
		Map<String,Object> values=new HashMap<String,Object>();
		if(condition!=null||!"".equals(condition)){
			jql.append("and c.customId = :customId");
			values.put("customId",condition);
		}
        super.indexPageByJql(jql.toString(), values);
        return "success";
	}	

}
