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
@Action(value = "/querycustomerloanprice", results = { @Result(name = "success", type = "json") })
public class QueryLoanPriceAction extends BaseQueryAction {

    @Autowired
    @Qualifier("dsOracle")
    private DataSource ds;

    @Override
	public void prepare() {
        AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();

        StringBuilder sb = new StringBuilder(
                "select t.* "
                        + "from ocrm_f_ci_loan_price_ctrl t where 1>0 and t.cust_id = '"
                        + currenUserId + "' ");

        SQL = sb.toString();
        setPrimaryKey("t.ID");
        addOracleLookup("FTP", "FTP");
//        addGreenplumLookup("LOAN_LIMIT_TIME", "DKQX");
//        addGreenplumLookup("CURRENCY", "CCY");
        datasource = ds;
    }

}
