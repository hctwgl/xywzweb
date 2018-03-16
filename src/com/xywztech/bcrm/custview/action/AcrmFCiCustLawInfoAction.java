package com.xywztech.bcrm.custview.action;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custview.model.AcrmFCiCustLawInfo;
import com.xywztech.bcrm.custview.service.AcrmFCiCustLawInfoService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/AcrmFCiCustLawInfoAction-info")
public class AcrmFCiCustLawInfoAction extends CommonAction{
	@Autowired
	private AcrmFCiCustLawInfoService acrmFCiCustLawInfoService;
	@Autowired
	public void init(){
		model = new AcrmFCiCustLawInfo();
		setCommonService(acrmFCiCustLawInfoService);
	}
	
	public void updatetest(){
		//system.out.printlnln("updatetest");
	}
	
	public String query(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);	
        String condition = request.getParameter("condition");
        StringBuilder jql =new StringBuilder("select c from AcrmFCiCustLawInfo c where 1=1 ");
		Map<String,Object> values=new HashMap<String,Object>();
		if(condition!=null||!"".equals(condition)){
			jql.append("and c.borrName = :borrName");
			values.put("borrName",condition);
		}
        super.indexPageByJql(jql.toString(), values);
        return "success";
	}	

}
