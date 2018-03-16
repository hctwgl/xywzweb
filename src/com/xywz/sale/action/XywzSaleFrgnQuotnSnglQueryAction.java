package com.xywz.sale.action;

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
@Action(value="/XywzSaleFrgnQuotnSnglQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzSaleFrgnQuotnSnglQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select T.*,T1.PORT_NAME_CN AS PORT_NAME_CN, T2.PORT_NAME_CN AS UN_PORT_NAME_CN " +
    			"from xywz_sale_frgn_quotn_sngl T  " +
    			"LEFT OUTER JOIN XYWZ_LOGI_PORT_INFO_MGMT T1 "+
    			"ON ( T.portof_loading = T1.PORT_ID ) "+
    			"LEFT OUTER JOIN XYWZ_LOGI_PORT_INFO_MGMT T2 "+
    			"ON ( T.portof_discharge = T2.PORT_ID ) "+
    			"where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("chkStat")){
                    sb.append(" and T.CHK_STAT like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("quotnSnglNum")){
                	sb.append(" and T.QUOTN_SNGL_NUM like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }

    	setPrimaryKey("T.QUOTN_SNGL_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("CHK_STAT", "XYWZ_IF_FLAG");
    	datasource = ds;
    }
}
