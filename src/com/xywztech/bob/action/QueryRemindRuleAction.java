package com.xywztech.bob.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.xywztech.bob.vo.AuthUser;

@ParentPackage("json-default")
@Action(value = "/queryremindrule", results = { @Result(name = "success", type = "json") })
public class QueryRemindRuleAction extends BaseQueryAction {

    @Autowired
    @Qualifier("dsOracle")
    private DataSource ds;

    @Override
	public void prepare() {
        AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();

        StringBuilder sb = new StringBuilder(
                "select wrr.* from ocrm_f_wp_remind_rule wrr where wrr.creator = '"
                        + currenUserId + "' ");

        SQL = sb.toString();
        setPrimaryKey("wrr.SECTION_TYPE");
        addOracleLookup("SECTION_TYPE", "REMIND_TYPE");
        addOracleLookup("RULE_NAME", "GROUP_STS");
        datasource = ds;
    }

}
