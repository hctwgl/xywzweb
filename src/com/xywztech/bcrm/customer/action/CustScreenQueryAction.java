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
 *    zhangmin 屏蔽客户搜索
 * 
 */
@ParentPackage("json-default")
@Action(value="/custScreenQuery", results={
    @Result(name="success", type="json"),
})
public class CustScreenQueryAction extends BaseQueryAction{
	
	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	@SuppressWarnings("deprecation")
	public void prepare() {
 		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        StringBuilder sb = new StringBuilder("SELECT DISTINCT A.*,D.ID SCREEN_ID ,D.CREATE_DATE SCREEN_DATE,'1' SCREEN_STUTS FROM(");
        StringBuilder customCondition=new StringBuilder("SELECT * FROM (SELECT t01.*,t03.MGR_ID,t03.MGR_NAME,t02.INSTITUTION_CODE,t02.INSTITUTION_NAME FROM OCRM_F_CI_CUST_DESC  t01 left join OCRM_F_CI_BELONG_ORG t02 on t02.cust_id= t01.cust_id and t02.MAIN_TYPE='1' left join  OCRM_F_CI_BELONG_CUSTMGR t03 on t03.cust_id=t01.cust_id  and t03.main_type='1')  WHERE 1=1");
        StringBuilder orgCondition=new StringBuilder("SELECT * FROM OCRM_F_CI_BELONG_ORG WHERE 1=1");
        StringBuilder mgrCondition=new StringBuilder("SELECT * FROM OCRM_F_CI_BELONG_CUSTMGR WHERE 1=1");
        StringBuilder screenCondition=new StringBuilder("SELECT * FROM ACRM_F_CI_CUST_SCREEN WHERE 1=1");
    	String customerString =request.getParameter("customerId");
    	//如果输入客户号
    	if (customerString!=null&&!("").equals(customerString)) {
    		customCondition.append(" AND CUST_ID = '"+customerString+"' ");
		}
    	//处理condition查询条件
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
            	//如果输入客户基本查询条件
                if(key.equals("CUST_ZH_NAME")||key.equals("CERT_NUM")||key.equals("CUST_ID"))
                	customCondition.append(" AND "+key+" like"+" '%"+this.getJson().get(key)+"%'");
                //如果输入客户基本查询条件
                else if(key.equals("CUST_TYP")||key.equals("CUST_LEV")||key.equals("CUST_STAT")){
                	customCondition.append(" AND "+key+" = '"+this.getJson().get(key)+"'");
                }
//                else if((key.equals("groupHostOrgNoName"))){
                else if((key.equals("instncode"))){//按机构号码查询
                	String org=this.getJson().get(key).toString();
                	String orgName []=org.split(",");
                	StringBuilder orgsb = new StringBuilder();
	                for(int i=0;i<orgName.length;i++){
	                	if(i==0)
	                	orgsb.append("'"+orgName[i]+"'");
	                	else
	                		orgsb.append(",'"+orgName[i]+"'");
	                }
	                orgCondition.append(" AND INSTITUTION_CODE IN ("+orgsb.toString()+")");
                }
                else if(key.equals("custMgrId")){//按归属客户经理Id查询
                	String mgr = this.getJson().get(key).toString();
                	String mgrId[] = mgr.split(",");
                	StringBuilder mgrb = new StringBuilder();
                	for(int j=0;j<mgrId.length;j++){
                		if(j==0)
                			mgrb.append("'"+mgrId[j]+"'");
                		else
                			mgrb.append(",'"+mgrId[j]+"'");
                	}
                	mgrCondition.append(" AND MGR_ID IN("+mgrb.toString()+") ");
                }
            }
        }
        
        //拼装最终的查询语句
        //性能优化原则：优先拼接小结果集
        if(this.getJson().get("custMgrId")!=null&&!this.getJson().get("custMgrId").equals("")){
        	sb.append(mgrCondition)
        	.append(") C LEFT JOIN (")
        	.append(customCondition)
        	.append(") A ON C.CUST_ID=A.CUST_ID LEFT JOIN (")
        	.append(orgCondition).append(") B ON C.CUST_ID=B.CUST_ID");
        }else if(this.getJson().get("instncode")!=null&&!this.getJson().get("instncode").equals("")){
        	sb.append(orgCondition)
        	.append(") B LEFT JOIN (")
        	.append(customCondition)
        	.append(") A ON B.CUST_ID=A.CUST_ID LEFT JOIN (")
        	.append(mgrCondition).append(") C ON B.CUST_ID=C.CUST_ID");
        }else{
        	sb.append(customCondition)
        	.append(") A LEFT JOIN (")
        	.append(orgCondition)
        	.append(") B ON A.CUST_ID=B.CUST_ID LEFT JOIN (")
        	.append(mgrCondition).append(") C ON A.CUST_ID=C.CUST_ID");
        }
        sb.append(" INNER JOIN (select * from acrm_f_ci_cust_screen) D ");
        sb.append(" ON A.CUST_ID = D.CUST_ID ");
        sb.append(" where 1=1 ");
//        addOracleLookup("CUST_TYP", "PAR0100021");
//        addOracleLookup("CUST_LEV", "P_CUST_GRADE");
//        addOracleLookup("CERT_TYPE", "PAR0100006");
//        addOracleLookup("CUST_STAT","CUSTOMER_STATUS");
       setPrimaryKey("A.CRM_DT DESC");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
