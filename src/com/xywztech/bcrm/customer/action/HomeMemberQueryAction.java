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

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;
/*
 * 
 * 
 *    wz  家庭信息维护--家庭成员维护
 * 
 */
@ParentPackage("json-default")
@Action(value="/homeMemberQuery", results={
    @Result(name="success", type="json"),
})
public class HomeMemberQueryAction extends BaseQueryAction{
	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	@SuppressWarnings("deprecation")
	public void prepare() {
// 		String houseCode=this.getJson().get("houseCode").toString();
 		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String houseCode = request.getParameter("houseId");
        String custId = "";
        StringBuilder sb;
        if(null != this.getJson().get("custId")){
        	custId=this.getJson().get("custId").toString();
        }
        if(!"".equals(custId) && null != custId){
        	sb=new StringBuilder("select vc.* from ACRM_F_CI_CREDIT_VILLAGE_CUST vc where vc.cust_id='"+custId+"'");
        }else {
        	sb=new StringBuilder("select vc.* from ACRM_F_CI_CREDIT_VILLAGE_CUST vc where vc.house_code='"+houseCode+"'");
        }
    	
        setPrimaryKey("vc.CUST_ID");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
