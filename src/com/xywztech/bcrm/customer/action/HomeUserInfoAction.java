package com.xywztech.bcrm.customer.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;
/*
 * 
 * 
 *    wz  家庭信息维护
 * 
 */
@ParentPackage("json-default")
@Action(value="/homeUserInfoAction", results={
    @Result(name="success", type="json"),
})
public class HomeUserInfoAction extends BaseQueryAction{
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	@SuppressWarnings("deprecation")
	public void prepare() {
      
    	StringBuilder sb=new StringBuilder("select vc.*,");
    	StringBuilder sb2=new StringBuilder("(select sum(s.AMOUNT_RMB) from ACRM_F_RE_SAVESUMAVGINFO s " +
    			"inner join ACRM_F_CI_CREDIT_VILLAGE_CUST b on s.custom_id = b.cust_id and b.HOUSE_CODE=vc.house_code ");
    	for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
            	if(key.equals("odsStDate")){
               	 	sb2.append(" and s.ODS_ST_DATE like '%"+this.getJson().get(key)+"%'");
                }else{
                	//Nothing
                }
            }
        }
    	sb2.append(" ) as SUM_NOW_DEP_BAL ");
    	sb.append(sb2);
    	sb.append("from ACRM_F_CI_CREDIT_VILLAGE_CUST vc where vc.master_relt='01'");
    	 for(String key:this.getJson().keySet()){
             if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                 if(key.equals("profeKind")){
                     sb.append(" and vc.PROFE_KIND = '"+this.getJson().get(key)+"'");
                 }
                 else if(key.equals("yeIncomeS")){
                 	sb.append(" and vc.YE_INCOME >= "+this.getJson().get(key));
                 }
                 else if(key.equals("yeIncomeE")){
                	 sb.append(" and vc.YE_INCOME <= "+this.getJson().get(key));
                 }
                 else if(key.equals("awardYnLineS")){
                	 sb.append(" and vc.AWARD_YN_LINE >= "+this.getJson().get(key));
                 }
                 else if(key.equals("awardYnLineE")){
                	 sb.append(" and vc.AWARD_YN_LINE <= "+this.getJson().get(key));
                 }
                 else if(key.equals("villaName")){
                	 sb.append(" and vc.VILLA_NAME = '"+this.getJson().get(key)+"'");
                 }
                 else if(key.equals("nowDepBal")){
                	 sb.append(" and vc.NOW_DEP_BAL = "+this.getJson().get(key));
                 }
                 else if(key.equals("ageS")){
                	 sb.append(" and cast( year(CURRENT TIMESTAMP) AS INTEGER) - CAST (right(left (vc.IDENTI_CARD_NO, 10),4) AS INTEGER) >="
                			 +this.getJson().get(key));
                	 sb.append(" and right(left (vc.IDENTI_CARD_NO, 10),4)<>''");
                 }
                 else if(key.equals("ageE")){
                	 sb.append(" and cast( year(CURRENT TIMESTAMP) AS INTEGER) - CAST (right(left (vc.IDENTI_CARD_NO, 10),4) AS INTEGER) <="
                			 +this.getJson().get(key));
                	 sb.append(" and right(left (vc.IDENTI_CARD_NO, 10),4)<>''");
                 }
             }
         }
        setPrimaryKey("vc.CUST_ID");

		SQL = sb.toString();
		datasource = dsOracle;
	}
}
