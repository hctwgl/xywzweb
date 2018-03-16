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
@Action(value = "/querycustmgrpg", results = { @Result(name = "success", type = "json"), })
public class QueryCustMgrPGAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource dsOracle;

    private HttpServletRequest request;
    
	@Override
	public void prepare() {

        ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);
        String id = request.getParameter("ID");
		StringBuilder sb = new StringBuilder(
				"select t.* from OCRM_F_CM_CUST_MANAG_EVA_MGR t where 1>0 ");
		if(id!=null&&!id.equals("")){
			sb.append(" and t.ID = '"+id+"'");
		}

        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
            	if(key.equals("ID"))
                    sb.append(" and t."+key+" = '"+this.getJson().get(key)+"'");
            }
        }
		this.setPrimaryKey("t.ID");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
