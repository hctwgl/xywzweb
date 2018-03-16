package com.xywztech.bcrm.custmanager.action;

import java.util.Map;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.xywztech.bcrm.custmanager.model.OcrmFCmCustMgrInfo;
import com.xywztech.bcrm.custmanager.service.CustomerManagerInfoService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.vo.AuthUser;

@Action("/CustomerManagerInfoAction1")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "CustomerManagerInfoAction1"})
})
public class CustomerManagerInfoQueryAction extends CommonAction {
	
	@Autowired
	private CustomerManagerInfoService service;//定义UserManagerService属性
	
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	
	@Autowired
	public void init() {
		model = new OcrmFCmCustMgrInfo();
		setCommonService(service);
		needLog = true;//新增修改删除记录是否记录日志,默认为false，不记录日志
	}
	@Override
	public void prepare() {
		// TODO Auto-generated method stub

		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
//		ArrayList list = (ArrayList) auth.getAuthorities();

		String userId = auth.getUserId();

		StringBuilder sb = new StringBuilder("SELECT su.*, s.MOBILEPHONE AS TELEPHONE, su.IF_CREDIT AS IS_HAVING_CARD, un.UNITNAME, s.USER_NAME, s.ORG_ID as UNITID, s.SEX as GENDER,  s.EMAIL"
				+" FROM OCRM_F_CM_CUST_MGR_INFO su INNER JOIN ADMIN_AUTH_ACCOUNT s   ON su.CUST_MANAGER_ID = s.ACCOUNT_NAME left join sys_units un on un.unitid=s.ORG_ID WHERE 1 > 0 ");

//		if (list.contains(new GrantedAuthorityImpl("2"))) {
//			sb.append(" and su.user_id = '"+userId+"' ");
//		}
		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("AGE"))
					sb.append(" and " + key + " > '" + this.getJson().get(key)
							+ "'");
				if (key.equals("checkedNodes")){
					String orgStr = this.getJson().get(key).toString();
					String newStr = orgStr.replace(",", "','");
					sb.append(" and UNITID in  ('" + newStr
							+ "')");}
				if (key.equals("USER_ID"))
					sb.append(" and " + key + " like " + " '%"
							+ this.getJson().get(key) + "%'");
				if (key.equals("CUST_MANAGER_ID"))
					sb.append(" and " + key + " like " + " '%"
							+ this.getJson().get(key) + "%'");
				if (key.equals("ECONOMICYEAR"))
					sb.append(" and " + key + "= '" + this.getJson().get(key)
							+ "'");
				else {
					if (key.equals("USER_NAME") || key.equals("MANAGER_TYPE")
							|| key.equals("MANAGER_LEVEL")
							|| key.equals("EDUCATIONLEVEL")
							|| key.equals("IS_HAVING_CARD"))
						sb.append(" and " + key + " like " + " '%"
								+ this.getJson().get(key) + "%'");
					else {
						if (key.equals("ATTENDONDATE")) {
							String sd = null;
							sd = (String) this.getJson().get("ATTENDONDATE");
							String sd1 = sd.substring(0, 7);
							sb.append(" and ATTENDONDATE like " + " '%" + sd1
									+ "%'");
						}
					}
				}
			}
		}

		SQL = sb.toString();
		setPrimaryKey("su.USER_ID desc");
		datasource = ds;
//		addOracleLookup("ACCESSIONSTATE", "MANAGER_STATUS");
		addOracleLookup("MANAGER_TYPE", "MANAGER_TYPE");
		addOracleLookup("MANAGER_LEVEL", "MANAGER_LEVEL");
		addOracleLookup("LEVL", "MANAGER_GRADE");
		addOracleLookup("GENDER","DEM0100005");
		addOracleLookup("POLITICAL_STAT", "POL_LANDSCAPE");
		addOracleLookup("IS_HAVING_CARD", "IS_HAVING_CODE");
		addOracleLookup("EDUCATION", "DEM0100007");
//		setBranchFileldName4("UNITID");

	}

	@Override
	public Map<String, Object> getJson() {
		return super.getJson();
	}
}
