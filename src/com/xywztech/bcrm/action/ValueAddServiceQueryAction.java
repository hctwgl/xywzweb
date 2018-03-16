package com.xywztech.bcrm.action;

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

@ParentPackage("json-default")
@Action(value="/ValueAddServiceQuery", results={
    @Result(name="success", type="json"),
})
public class ValueAddServiceQueryAction extends BaseQueryAction{
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	public void prepare() {
 		ActionContext ctx = ActionContext.getContext();
 		HttpServletRequest request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String optype = request.getParameter("optype");
        StringBuilder sb = new StringBuilder("select t.* from OCRM_F_CI_INCREMENT_INFO t where 1>0");
        if("0".equals(optype)){
//        	sb.append(" and t.REQUESTMENT is not null and t.REQUESTMENT <> ''");
        }
        if("1".equals(optype)){
        	sb.append(" and t.FEEDBACK is not null");
        }
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("id"))
                    sb.append(" and t.ID ="+this.getJson().get(key));
                else{
                	sb.append(" and t."+key+" = "+this.getJson().get(key));
                }
            }
        }
        addOracleLookup("CUST_GRADE", "P_CUST_GRADE");
        setPrimaryKey("t.ID desc");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
