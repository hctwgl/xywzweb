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
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;

/**
 * 重点户设置
 *
 */

@ParentPackage("json-default")

@Action(value="/importantCustomer", results={
    @Result(name="success", type="json")})
public class ImportantCustomerSelectedAction extends BaseQueryAction {

	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	@Autowired
//	private ImportantCustomerSelectedService importantCustomerSelectedService;

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		//获取登录的用户所在机构的客户编号,获取未分配机构的客户信息
		 StringBuilder sb = new StringBuilder("select distinct m.OWENERID,m.SUPBRID,m.BRID,m.ROTECB,m.CKBAL,m.CKBALAVG,m.SECKBALAVG,m.YECKBALAVG,m.LOANBAL,m.LOANBALAVG," +
		 		"m.SELOANBALAVG,m.YELOANBALAVG,m.CDBAL,m.DPCDBAL,m.CDSUM,m.DPCDSUM,m.TIEXBAL,m.DPTIEXBAL,m.TIEXSUM,m.DPTIEXSUM,m.CUSTSUMBAL,m.MIDBAL,m.NASSUMBAL,m.EBANKSUM,m.ETLDATE," +
		 		"t1.*,t2.IF_NETBANK,t2.ENT_MAIN_INDUSTRY,t2.ENT_ECOM_TYPE,t2.ENT_HOLDING_TYPE,t2.ENT_SCALE,b.INSTITUTION_NAME from OCRM_F_CI_CUST_DESC t1 ");
	        sb.append("left join OCRM_F_CI_BELONG_ORG b on b.cust_id = t1.cust_id ");
	    	sb.append("left join OCRM_F_CI_BELONG_CUSTMGR c on c.cust_id = t1.cust_id ");
	    	sb.append("left join ACRM_F_CI_CUST_BAL m on m.CUST_ID = t1.CUST_ID ");
	    	sb.append("left join OCRM_F_CI_COM_CUST_INFO t2 on t2.CUST_ID = t1.CUST_ID ");
	    	sb.append("where t1.cust_typ='"+"2"+"' and 1>0 ");
				setPrimaryKey("t1.CUST_ID");
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
               if (key.equals("CUST_ZH_NAME")) {
                	sb.append(" and t1."+key+" like '%"+this.getJson().get(key)+"%'");
                } else if(key.equals("IMPORT_CUST_TYPE")){
                    sb.append(" and t1."+key+" like '%"+this.getJson().get(key)+"%'");
                } else if(key.equals("instncode")){
                	String codestr = this.getJson().get(key).toString();
                	String newStr = codestr.replace(",", "','");
                    sb.append(" and b.INSTITUTION_CODE in ('"+ newStr +"')");
                }
            }
        }
        
        SQL = sb.toString();
        datasource = ds;
	}
	
	/**
	 * 分配客户到客户经理
	 * @return
	 */
	public String assignCust() {
		//取得前台传过来的参数
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		//orgStr传过来的参数记录格式如：record|record
		String custStr = request.getParameter("custStr");
//		importantCustomerSelectedService.assignCust(custStr);
		
		return "success";
	}
}