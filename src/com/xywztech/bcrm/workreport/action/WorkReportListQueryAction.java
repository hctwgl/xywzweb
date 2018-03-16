package com.xywztech.bcrm.workreport.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.common.CommonAction;

@Action("/WorkReportListQueryAction")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "WorkReportListQueryAction"})
})
public class WorkReportListQueryAction extends CommonAction 
{
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	private HttpServletRequest request;
	
	@Override
	public void prepare() 
	{ 
		// TODO Auto-generated method stub
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		this.setJson(request.getParameter("condition"));
		
		StringBuilder sb=new StringBuilder("select wrm.report_id,wrm.cust_manager_id,wrm.cust_manager_name,wrm.report_cycle,wrm.report_type,wrm.report_date from OCRM_F_WP_WORK_REPORT_MAIN wrm where 1=1 ");
		Map<String,Object> values=new HashMap<String,Object>();
		for (String key : this.getJson().keySet()) 
		{// 查询条件判断
			if (null != this.getJson().get(key) && !this.getJson().get(key).equals("")) 
			{
				if (key.equalsIgnoreCase("checkedNodes")) 
				{
					
					String checkedNodes = this.getJson().get(key).toString();
					if(!("100000".equals(checkedNodes)))
					{
						String orgIds []=checkedNodes.split(",");
						StringBuilder orgsb = new StringBuilder();
		                for(int i=0;i<orgIds.length;i++)
		                {
		                	if(i==0)
		                	{
		                		orgsb.append("'"+orgIds[i]+"'");
		                	}
		                	else
		                	{
		                		orgsb.append(",'"+orgIds[i]+"'");
		                	}
		                	
		                }
		                sb.append(" AND wrm.AFFI_INST_ID  in ("+ orgsb.toString()+") ");
					}
					//sb.append(" AND mgr." + key + " = "+ this.getJson().get(key));
				}
				else if(key.equalsIgnoreCase("cust_manager_name"))
				{
					sb.append(" AND wrm." + key + " like "+ "'%"+this.getJson().get(key) + "%'");
				}
				else if(key.equalsIgnoreCase("CUST_MANAGER_ID"))
				{
					sb.append(" AND wrm." + key + " = '"+ this.getJson().get(key)+"'");
				}
				else if(key.equalsIgnoreCase("report_type"))
				{
					sb.append(" AND wrm." + key + " = '"+ this.getJson().get(key)+"'");
				}
				else if(key.equalsIgnoreCase("report_date"))
				{
					sb.append(" AND wrm." + key + " = '"+ this.getJson().get(key).toString().substring(0, 10)+"'");
				}
				else if(key.equalsIgnoreCase("BIZ_CODE"))
				{
					sb.append(" AND wrm." + key + " = '"+ this.getJson().get(key).toString()+"'");
				}
			}
		}
		
		SQL = sb.toString();
		datasource = ds;
		
		
	}
}
