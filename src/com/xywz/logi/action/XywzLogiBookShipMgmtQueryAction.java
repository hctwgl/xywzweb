package com.xywz.logi.action;

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
@Action(value="/XywzLogiBookShipMgmtQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzLogiBookShipMgmtQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("SELECT " +
			  "T1.BOOK_SHIP_ID, "+
			  "T1.CONTR_NUM,"+
			  "T1.SELL_PERS_MEM_ID,"+
			  "T1.SELL_PERS_MEM,"+
			  "T1.SHIP_NAME,"+
			  "T1.LOAD_TRAFF_PORT,"+
			  "T1.PORTOF_DISCHARGE,"+
			  "T1.EXPCT_TO_PORT_DAY,"+
			  "T1.TRAFF_MODE,"+
			  "T1.PRC,"+
			  "T1.QTY,"+
			  "T1.TOTL_PRC,"+
			  "T1.SHIP_CORP_ID,"+
			  "T2.CORP_NM,"+
			  "T1.SHIP_AGENT_NM,"+
			  "T1.SHIP_AGENT_CONTCR,"+
			  "T1.SHIP_AGENT_CONT_TEL,"+
			  "T1.GDS_AGENT_NM,"+
			  "T1.GDS_AGENT_CONTCR,"+
			  "T1.GDS_AGENT_CONT_TEL,"+
			  "T1.CONTCR_ID,"+
			  "T1.CONTCR,"+
			  "T1.MAK_DOC_PERS_ID,"+
			  "T1.MAK_DOC,"+
			  "T1.GDS_DESC "+
			"FROM XYWZ_LOGI_BOOK_SHIP_MGMT T1 "+
			"LEFT JOIN XYWZ_LOGI_SHIP_CORP_MGMT T2 "+
			"ON T1.Ship_Corp_Id = T2.Ship_Corp_Id "+
			"LEFT OUTER JOIN XYWZ_SALE_FRGN_ORDR_CONTR T3 "+
			"ON ( T1.Contr_Num = T3.Contr_Num ) "+
			"where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("contrNum")){
                    sb.append(" and t1.CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("sellPersMem")){
                	sb.append(" and t1.SELL_PERS_MEM like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("shipName")){
                	sb.append(" and t1.SHIP_NAME = "+this.getJson().get(key));
                }else if (key.equals("loadTraffPort")){
                	sb.append(" and LOAD_TRAFF_PORT like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("portofDischarge")){
                	sb.append(" and PORTOF_DISCHARGE like '%"+this.getJson().get(key)+"%'");
                }    
            }
        }

    	setPrimaryKey("BOOK_SHIP_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("TRAFF_MODE","XYWZ_SEND_TYPE");
    	datasource = ds;
    }
}
