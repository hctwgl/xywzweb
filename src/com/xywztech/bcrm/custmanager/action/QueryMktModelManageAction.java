package com.xywztech.bcrm.custmanager.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
@Action(value = "/mktModelManage", results = { @Result(name = "success", type = "json") })
public class QueryMktModelManageAction extends BaseQueryAction {

    @Autowired
    @Qualifier("dsOracle")
    private DataSource ds;

    @Override
	public void prepare() {
        StringBuilder sb = new StringBuilder("select t.* "
                + "from OCRM_F_CI_MKT_MODEL_MANAGE t where 1=1 ");
        for (String key : this.getJson().keySet()) {
            if (null != this.getJson().get(key)
                    && !this.getJson().get(key).equals("")) {
                if (key.equals("MODEL_ID")) {
                	sb.append(" and t." + key + " like '%" + this.getJson().get(key) + "%'");
                } else if (key.equals("MODEL_NAME")){
                    sb.append(" and t." + key + " like '%"
                            + this.getJson().get(key) + "%'");
                }else if (key.equals("MODEL_TYPE")) {
                	if(this.getJson().get(key) != null && !this.getJson().get(key).equals("")){
                		sb.append(" and t." + key + " = '" + this.getJson().get(key) + "'");
                	}
                } 
            }
        }

        SQL = sb.toString();
        setPrimaryKey("t.ID");
        addOracleLookup("MODEL_TYPE", "MODEL_TYPE");
        datasource = ds;
    }

}
