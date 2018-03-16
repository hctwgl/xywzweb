package com.xywztech.bcrm.customer.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.customer.service.CustomerTransService;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;

/**
 * 客户批量移交
 *
 */

@ParentPackage("json-default")

@Action(value="/customer_trans", results={
    @Result(name="success", type="json")})
public class CustomerTransAction extends BaseQueryAction {

	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	@Autowired
	private CustomerTransService customerTransService;

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		//获取登录的用户所在机构的客户编号,获取未分配机构的客户信息
		StringBuilder sb = new StringBuilder("" +
				"select t1.CUST_ID,t1.CUST_ZH_NAME,t2.MGR_ID,t2.MGR_NAME,t2.ASSIGN_USERNAME,t2.ASSIGN_DATE,t2.MAIN_TYPE,t2.ID" +
				" from OCRM_F_CI_CUST_DESC t1,OCRM_F_CI_BELONG_CUSTMGR t2" +
				" where t1.CUST_ID = t2.CUST_ID ");		//不属于本级机构客户经理的机构
		setPrimaryKey("t1.CUST_ID");
		if(request.getParameter("start")!=null)
        	start = new Integer(request.getParameter("start")).intValue();
        if(request.getParameter("limit")!=null)
        	limit = new Integer(request.getParameter("limit")).intValue();
        //查询条件
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("MGR_ID")){
                    sb.append(" and t2."+key+" like '%"+this.getJson().get(key)+"%'");
                }
                else if (key.equals("MGR_NAME")) {
                	sb.append(" and t2."+key+" like '%"+this.getJson().get(key)+"%'");
                }
            }
        }
        SQL = sb.toString();
        datasource = ds;
	}
	
	/**
	 * 主管批量移交客户
	 * @return
	 */
	public String batchTrans() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		String data = request.getParameter("data");
		customerTransService.batchTrans(data);
		return "success";
	}
}