package com.xywz.cust.action;

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


@ParentPackage("json-default")
@Action(value="/XywzCustBusiTotalSumAction", results={
    @Result(name="success", type="json")
})
public class XywzCustBusiTotalSumAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("SELECT "+
				"TT.CUST_ID, "+
				"TT.CUST_SHT_NM, "+
				"TT.CNTRY_URBN, "+
				"TT.SIGN_DT,"+
				"TT.CUR,"+
				"TT.QTY,"+
				"TT.AMOUNT/10000 as AMOUNT "+
				"FROM ( "+
				"SELECT "+
				"CST.CUST_ID,"+
				"CST.CUST_SHT_NM,"+
				"CST.CNTRY_URBN,"+
				"FR.Next_Plan_Sngl_Dt AS SIGN_DT,"+
				"DT.CUR,"+
				"SUM(dt.QTY)    AS QTY,"+
				"SUM(dt.Amt) AS AMOUNT "+
				"from XYWZ_CUST_CUSTINFO CST "+                      //客户信息
				"INNER JOIN XYWZ_SALE_FRGN_ORDR_CONTR  FR "+           //外贸订单
				"ON ( CST.CUST_ID = FR.CUST_ID ) "+
				"INNER JOIN XYWZ_SALE_INV_MERCHD_DTL  DT "+          //发票商品明细
				"ON ( FR.Contr_Num = DT.Contr_Num ) "+
				"GROUP BY CST.CUST_ID,CST.Cust_Sht_Nm,CST.Cntry_Urbn,FR.Next_Plan_Sngl_Dt,DT.Cur "+
				"UNION ALL "+
				"select "+
				"CST.CUST_ID,"+
				"CST.CUST_SHT_NM,"+
				"CST.CNTRY_URBN,"+
				"INL.Contr_Dt AS SIGN_DT,"+
				"DT.CUR,"+
				"SUM(dt.QTY)    AS QTY,"+
				"SUM(dt.Amt) AS AMOUNT "+
				"from XYWZ_CUST_CUSTINFO CST "+                      //客户信息
				"INNER JOIN XYWZ_SALE_INLAND_ORDR_CONTR  INL "+        //贸订单
				"ON ( CST.CUST_ID = INL.CUST_ID ) "+
				"INNER JOIN XYWZ_SALE_INLAND_MERCHD_DTL  DT  "+         //发票商品明细
				"ON ( INL.Contr_Num = DT.INLAND_ORDR_NUM ) "+
				"GROUP BY CST.CUST_ID,CST.Cust_Sht_Nm,CST.Cntry_Urbn,INL.Contr_Dt,DT.Cur "+
				" )TT" +
    			"  where 1=1 ");    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("custId")){
                    sb.append(" and tt.CUST_ID ='"+this.getJson().get(key)+"'");
                }else if(key.equals("CntryUrbn")){
                	sb.append(" and tt.Cntry_Urbn ='"+this.getJson().get(key)+"'");
                }else if (key.equals("SignDtBegin")){
                	sb.append(" and tt.Sign_Dt >= '"+this.getJson().get(key)+"'");
                }else if (key.equals("SignDtEnd")){
                	sb.append(" and tt.Sign_Dt <= '"+this.getJson().get(key)+"'");
                }  
            }
        }

    	setPrimaryKey("CUST_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("CNTRY_URBN","XYWZ_COUNTRY");
    	addOracleLookup("CUR","XYWZ_CUR");
    	datasource = ds;
    }
}
