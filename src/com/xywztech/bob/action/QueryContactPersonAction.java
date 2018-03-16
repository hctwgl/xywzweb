package com.xywztech.bob.action;

import java.sql.SQLException;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.xywztech.bob.core.QueryHelper;

@ParentPackage("json-default")
@Action(value="/querycontactperson", results={
    @Result(name="success", type="json")
})
public class QueryContactPersonAction{
    
	@Autowired
	private DataSource ds;
    private Map<String, Object> JSON;
    public Map<String, Object> getJSON() {
		return JSON;
	}

	public void setJSON(Map<String, Object> jSON) {
		JSON = jSON;
	}
    public String index() {
        try {
        	
        	setJSON(new QueryHelper("select * from fdm.ACRM_F_CI_LINKMAN", ds.getConnection()).getJSON());
		} catch (SQLException e) {
			e.printStackTrace();
		}
        return "success";
    }
    



}

