package com.xywztech.bcrm.customer.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

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

@ParentPackage("json-default")
@Action(value = "/customer-org-chart", results = { @Result(name = "success", type = "json") })
public class CustomerOrgChartAction {

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;

	private HttpServletRequest request;
	
	private Map member = new HashMap();
	
	private String dataXml; 
	
	protected Map<String, Object> json; 


	@SuppressWarnings("unchecked")
	public String index() throws Exception {

		ActionContext ctx = ActionContext.getContext();

		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);

		// 集团客户ID
		String groupCustNo = request.getParameter("groupCustNo");

		@SuppressWarnings("rawtypes")
		List list = BlocMemberShowListQueryAction.getList(groupCustNo);
		
        //dataXml = this.queryGroupImg(list);
        this.json = new HashMap<String,Object>();  
        this.json.put("json",list);
		
		return "success";
	}
	
	public String queryGroupImg(List list) {
		StringBuffer sb = new StringBuffer("");
		if (list.size() > 0) {
			int rank = 0; //当前层级
			TreeSet curParentSet = new TreeSet(); //当前父节点
			TreeSet nextParentSet = new TreeSet(); //下层父节点
			curParentSet.add("0");
			String memberCustName = "";
			String flag = "0";
			sb.append("<?xml version='1.0' encoding='gb2312'?><custnet>");
			for (int i = 0; i < list.size(); i++) {
					member = (Map) list.get(i);
						
					if (member != null && curParentSet.contains(member.get("PARENT_ID")+"")) {
						
						memberCustName = (String) member.get("CUST_ZH_NAME");
						
						//JTDWDBCY  虚拟节点
						if((member.get("CUST_ID")+"").equals("JTDWDBCY"))
							memberCustName = "集团对外担保客户";
						
						//正式客户
						if((member.get("IS_POTENTIAL")+"").equals("1"))
							flag = "1";
						//潜在客户
						if((member.get("IS_POTENTIAL")+"").equals("2"))
							flag = "2";
						//担保客户
						if((member.get("MEMBER_TYPE")+"").equals("2"))
							flag = "3";
							
						sb.append("<dot id='" + member.get("ID")+ "' name='" + memberCustName+ "' rank='" + rank + "' flag='"+ flag + "'/>"); //rank 第几层显示  
						
						if ( "0".equals (member.get("PARENT_ID")+"") ) {
							sb.append("<line id='" + rank + "_" + i	+ "' name='' dot_start='"+ member.get("ID") + "' dot_end='"+ member.get("ID") + "'/>");
						} else {
							sb.append("<line id='" + rank + "_" + i	+ "' name='" + member.get("RELATION_NAME")+ "' dot_start='"	+ member.get("PARENT_ID")+ "' dot_end='" + member.get("ID")+ "'/>");
						}
						nextParentSet.add(member.get("ID")+"");
						list.set(i, null);
					}
					
					if (i == list.size() - 1) {
						if (nextParentSet.size() == 0) {
							break;
						}
						rank = rank + 1;
						curParentSet.clear();
						curParentSet.addAll(nextParentSet);
						nextParentSet.clear();
						i = -1; //重新循环
					}
			}
			sb.append("</custnet>");
		}
		return sb.toString();
		
	}
	//public String getDataXml() {
	//	return dataXml;
	//}
	public Map<String, Object> getJson() { 
		return json;
	} 
}