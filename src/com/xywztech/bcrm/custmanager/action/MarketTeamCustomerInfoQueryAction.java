package com.xywztech.bcrm.custmanager.action;

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
import com.xywztech.bob.action.BaseQueryAction;

@Action("/marketTeamCustomerInfo")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "marketTeamCustomerInfo"})
})
public class MarketTeamCustomerInfoQueryAction extends BaseQueryAction{
    
	@Autowired
    @Qualifier("dsOracle")
    private DataSource ds;
	private HttpServletRequest request;
//	private String marketTeamId;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
       
		String mktTI= request.getParameter("marketTeamId");
		// TODO Auto-generated method stub
//        StringBuilder sb = new StringBuilder("select p.id as id ,p.cust_id as cust_id ,p.join_date as join_date ,p.mkt_team_id as mkt_team_id,v.cust_zzdm as cust_zzdm ,v.cust_zh_name as cust_zh_name ,v.belong_instn as belong_insn  from ocrm_f_cm_mkt_team_cust p inner join OCRM_F_CI_CUST_DESC v on v.cust_id = p.cust_id  where 1>0");
        StringBuilder sb = new StringBuilder("select v.cert_num,p.id as id ,p.cust_id as cust_id ,p.join_date as join_date ,p.mkt_team_id as mkt_team_id,v.cust_zh_name as cust_zh_name  from ocrm_f_cm_mkt_team_cust p inner join OCRM_F_CI_CUST_DESC v on v.cust_id = p.cust_id  where 1>0");
         if(mktTI!=null&&mktTI!=""){
          	 sb.append(" and p.MKT_TEAM_ID ="+mktTI);
          }
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("MKT_TEAM_ID2"))
                    sb.append(" and MKT_TEAM_ID ="+this.getJson().get(key));
                if(key.equals("CUST_ZZDM"))
                    sb.append(" and "+key+" like '%"+this.getJson().get(key)+"%'");
                if(key.equals("CUST_ZH_NAME"))
                    sb.append(" and "+key+" like '%"+this.getJson().get(key)+"%'");
            }
        }
        
//        String marketTeamId1 =(String) this.getJson().get("marketTeamId"); 
        
        
		SQL = sb.toString();
        setPrimaryKey("p.ID desc");
        
		datasource = ds;
		
	}
}
