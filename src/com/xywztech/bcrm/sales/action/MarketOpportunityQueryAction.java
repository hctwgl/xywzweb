package com.xywztech.bcrm.sales.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
@Action(value="/marketOpportunityQuery", results={
    @Result(name="success", type="json"),
})
public class MarketOpportunityQueryAction extends BaseQueryAction{
    
    @Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
    
    @Override
	public void prepare(){
        StringBuilder sb = new StringBuilder("select o.*,u.username from ocrm_f_mm_mkt_opportunity o " +
        		"left join sys_users u on o.oper_user_id = u.userid where 1>0");
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("MKT_OPPOR_STAT"))
                    sb.append(" and o."+key+"= '"+this.getJson().get(key)+"'");
                else if(key.equals("createDateS"))
                    sb.append(" and o.CREATE_DATE >= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");
                else if(key.equals("createDateE"))
                    sb.append(" and o.CREATE_DATE <= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");
                else{
                	sb.append(" and o."+key+" like '%"+this.getJson().get(key)+"%'");
                }
            }
        }
        setPrimaryKey("o.MKT_OPPOR_STAT,o.update_date desc ");
        addOracleLookup("MKT_OPPOR_STAT", "CHANCE_STATUS");
        addOracleLookup("MKT_OPPOR_TYPE", "OPPOR_TYPE");
        SQL=sb.toString();
        datasource = ds;
    }
	
//    @SuppressWarnings("unchecked")
//    public String index() {
//        StringBuilder sb = new StringBuilder("select o.*,u.username from ocrm_f_mm_mkt_opportunity o " +
//        		"left join sys_users u on o.oper_user_id = u.userid where 1>0");
//        for(String key:this.getJson().keySet()){
//            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
//                if(key.equals("MKT_OPPOR_STAT"))
//                    sb.append(" and o."+key+"="+this.getJson().get(key));
//                else if(key.equals("createDateS"))
//                    sb.append(" and o.CREATE_DATE >= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");
//                else if(key.equals("createDateE"))
//                    sb.append(" and o.CREATE_DATE <= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");
//                else{
//                	sb.append(" and o."+key+" like '%"+this.getJson().get(key)+"%'");
//                }
//            }
//        }
//        sb.append(" order by o.update_date desc ");
//        cqs.setPrimaryKey("o.MKT_OPPOR_STAT");
//        cqs.addOracleLookup("MKT_OPPOR_STAT", "CHANCE_STATUS");
//        cqs.addOracleLookup("MKT_OPPOR_TYPE", "OPPOR_TYPE");
//        this.setJson((Map<String, Object>) cqs.excuteQuery(sb.toString(),this.getStart(),this.getLimit()));       
//        return "success";
//    }
}
