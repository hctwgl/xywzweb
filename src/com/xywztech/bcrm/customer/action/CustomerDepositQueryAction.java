package com.xywztech.bcrm.customer.action;

import java.text.SimpleDateFormat;
import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.customer.service.CustomerDepositService;
import com.xywztech.bob.action.BaseQueryAction;

/**
 * 客户托管查询Action 
 * auther sujm
 * address:成都软件园 
 * 
 * 
 */

@ParentPackage("json-default")
@Action(value = "/customer_deposit_query", results = { @Result(name = "success", type = "json") })
public class CustomerDepositQueryAction extends BaseQueryAction {

	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	@Autowired
	private CustomerDepositService customerDepositService;

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		StringBuilder sb = new StringBuilder("" + "select cd.cust_zh_name,"
//				+ "       ci.source_cust_id," 
//				+ "       cpci.sex,"
				+ "		  cm.BEFORE_MGR_CODE,"
				+ "       cm.before_mgr_name," 
				+ "	  	  cm.cust_id,"
				+ "       cm.managed_mgr_name," 
				+ " 	  cm.BEFORE_INST_CODE,"
				+ "		  cm.BEFORE_INST_NAME,"
				+ "		  cm.APPLY_DATE,"
				+ "       cd.cust_lev,"
				+ "       bc.main_type, "//--主协标志
				+ "       cm.approve_stat,"
				+ "       cm.approve_date," 
				+ "       cm.approve_user_name,"
				+ "       cm.managed_end_date," 
				+ "       cm.id"
				+ "  from OCRM_F_CI_MANAGED cm"
				+ "  left join OCRM_F_CI_CUST_DESC cd"
				+ "    on cm.cust_id = cd.cust_id"
				+ "  left join OCRM_F_CI_BELONG_CUSTMGR bc"
				+ "    on cm.cust_id = bc.cust_id"
				+ "   and cm.before_mgr_code = bc.mgr_id where 1>0 ");

		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("instncode"))//所属机构
					{
					String ss = this.getJson().get(key).toString();
			    	String TorgStr = ss.replace(";", "','"); 
					sb.append(" and cm.BEFORE_INST_CODE in ('"+TorgStr +"')");
					}
				else if (key.equals("CUST_LEV"))//客户级别
					{
					sb.append(" and cd." + key + " =" + " '"+ this.getJson().get(key) + "'");
					}
				 else if (key.equals("CUST_ID"))//核心客户号
					{
					sb.append(" and cm." + key + " = '"+ this.getJson().get(key) + "'");
					} 
				 else if (key.equals("CUST_ZH_NAME"))//客户名称 
					{
					sb.append(" and cd." + key + " like" + " '%"+ this.getJson().get(key) + "%'");
					}
				 else if (key.equals("BEFORE_MGR_CODE1"))//客户经理 
					{
					 String ss = this.getJson().get(key).toString();
				     String TorgStr = ss.replace(";", "','"); 
					sb.append(" and cm.BEFORE_MGR_CODE in( '"+ TorgStr + "')");
					}
				 else if (key.equals("MANAGED_MGR_CODE1"))//托管客户经理 
					{
					 String ss = this.getJson().get(key).toString();
				     String TorgStr = ss.replace(";", "','"); 
					sb.append(" and cm.MANAGED_MGR_CODE in( '"+ TorgStr + "')");
					}
				 else if (key.equals("MAIN_TYPE"))//主协标志
				 	{
					sb.append(" and bc." + key + " = '"+ this.getJson().get(key) + "'");
				 	}
				 else if (key.equals("APPLY_DATE_START"))//申请时间从
				 	{
					sb.append(" and cm.APPLY_DATE >= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");
				 	}
				 else if (key.equals("APPLY_DATE_END"))//申请时间到
				 	{
					sb.append(" and cm.APPLY_DATE <= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");
				 	}
		}

		setPrimaryKey("cm.managed_start_date DESC");
		SQL = sb.toString();
		datasource = ds;
	}

	}
	
	/**
     * 审批通过
     * @return
     * @throws Exception 
     */
    public String approvel() throws Exception{
    	try{
    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
			//调用审批方法
			customerDepositService.approve(idStr);
	        return "success";
    	}catch(Exception e){
    		e.printStackTrace();
    		throw e;
    	}
    }
    
    /**
     * 审批不通过
     * @return
     * @throws Exception 
     */
    public String approvelBack() throws Exception {
    	try{
    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
			//Object o = ocrmFCiLatentApplyInfoService.find(Long.parseLong(idStr));
			customerDepositService.approveBack(idStr);
	        return "success";
    	}catch(Exception e){
    		e.printStackTrace();
    		throw e;
    	}
    }
}