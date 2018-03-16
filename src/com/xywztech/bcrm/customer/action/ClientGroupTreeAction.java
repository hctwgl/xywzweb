/**
 * 
 */
package com.xywztech.bcrm.customer.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Validateable;
import com.xywztech.bob.action.BaseAction;
import com.xywztech.bob.service.SystemUnitRecursiveService;

/**
 * @author yaoliang
 *集团成员树
 */
@ParentPackage("json-default")

@Action(value="/client-group-tree", results={
    @Result(name="success", type="json")
})
//@Results({ @Result(name = "success", type = "redirectAction", params = {
//		"actionName", "system-unit-recursive" }) })
public class ClientGroupTreeAction extends BaseAction implements
ModelDriven<Object>, Validateable{
	private SystemUnitRecursiveService  systemUnitRecursiveService = new SystemUnitRecursiveService();
	@SuppressWarnings("unchecked")
	private List groupMemeberList ;
	@SuppressWarnings({ "unchecked" })
	public String index(){
		String group_no  = (String)getJson().get("group_no");
//		StringBuffer stringBuffer = new StringBuffer("select t.id, t.cust_id, t.parent_id, coalesce (t2.cust_zh_name,t3.cust_zh_name) cust_zh_name,coalesce(t2.cust_zzdm,t3.cust_zzdm) cust_zzdm  from ocrm_f_ci_group_member t  left join acrm_f_ci_cust_info t2 on t2.cust_id = t.cust_id left join ACRM_F_CI_LATENT_CUST_INFO t3 on t.cust_id = t3.cust_id  connect by prior t.id = t.parent_id  " 
//				+" start with t.parent_id = '0' and goup_no ='"+group_no+"' "); 
//		StringBuffer stringBuffer = new StringBuffer("WITH report ( id,cust_id,PARENT_ID,member_type ) AS(SELECT id,cust_id,PARENT_ID,member_type FROM ocrm_f_ci_group_member  UNION ALL"+
//				"(SELECT 	T1.id,	T1.cust_id,t1.PARENT_ID,T1.member_type FROM ocrm_f_ci_group_member T1, report T2 WHERE T2.cust_id = T1.PARENT_ID))"+
//				" SELECT DISTINCT report.id,report.cust_id,report.PARENT_ID,report.member_type,ocrm_f_ci_cust_desc.cust_zh_name"+
//				" FROM report left join ocrm_f_ci_group_member on report.id=ocrm_f_ci_group_member.PARENT_ID"+
//				" left join ocrm_f_ci_cust_desc on ocrm_f_ci_cust_desc.cust_id = report.cust_id");		

		//wzy,20130506,modify:修改查询sql（请孙睿帮忙修改）
		StringBuffer stringBuffer = new StringBuffer("WITH report AS\n" +
" (SELECT id, cust_id, PARENT_ID, member_type\n" + 
"    FROM ocrm_f_ci_group_member\n" + 
"  UNION ALL (SELECT T1.id, T1.cust_id, t1.PARENT_ID, T1.member_type\n" + 
"              FROM ocrm_f_ci_group_member T1))\n" + 
"SELECT DISTINCT report.id, report.cust_id, report.PARENT_ID, report.member_type, ocrm_f_ci_cust_desc.cust_zh_name\n" + 
"  FROM report\n" + 
"  left join ocrm_f_ci_group_member\n" + 
"    on report.id = ocrm_f_ci_group_member.PARENT_ID\n" + 
"  left join ocrm_f_ci_cust_desc\n" + 
"    on ocrm_f_ci_cust_desc.cust_id = report.cust_id");


		Map systemUnitMap = systemUnitRecursiveService.systemUnitList(stringBuffer.toString());
		List unitList = (List)systemUnitMap.get("data");
		Map rootMap=null;
		List childrenString = new ArrayList();
		try{
			for(int i=0;i<unitList.size();i++){			
				Map tempMap = (Map)unitList.get(i);
				String tempType = tempMap.get("MEMBER_TYPE")+"";
				if(tempType.equals("1")||tempType.equals("2")){
					String tem=tempMap.get("ID")+""+tempType;
					tempMap.put("id", tem);
				}else{
				tempMap.put("id", tempMap.get("ID"));
				}
				tempMap.put("text", tempMap.get("CUST_ZH_NAME"));
				tempMap.put("expanded", true);
				if((tempMap.get("PARENT_ID")+"").equals("0")){
					rootMap = tempMap;
				}
			}
			for(int j=0;j<unitList.size();j++){
				Map temp =(Map) unitList.get(j);
				
				String a =  rootMap.get("ID")+"";
				String b =  temp.get("PARENT_ID")+"";
				
				if(a.equals(b)){
					if(temp.get("CUST_ID").equals("JTDWDBCY"))
					{
						temp.put("text", "集团对外担保成员");
					}
					children(temp,unitList);
					childrenString.add(temp);					
					
				}
			}
		}catch(Exception ex){
			ex.printStackTrace();
		}
		if(childrenString.size() == 0){
			rootMap.put("leaf", "true");			
		}
		rootMap.put("children", childrenString);
		
		//system.out.printlnln(rootMap);
		
		groupMemeberList = childrenString;
		return "success";
	}	
	//递归得到children元素
	@SuppressWarnings({  "unchecked" })
	public void children(Map parentMap,List unitList){

		List childList = new ArrayList();
		for(int i=0;i<unitList.size();i++){			
			Map tempMap = (Map)unitList.get(i);			
			if((tempMap.get("PARENT_ID")+"").equals(parentMap.get("ID")+""))
			{
				childList.add(tempMap);
				children(tempMap,unitList);
			}
		}
		parentMap.put("children", childList);
		if(childList.size()==0){			
			parentMap.put("leaf", "true");
		}
	}		
	
	
	public void validate() {
		// TODO Auto-generated method stub
		
	}
	public Object getModel() {
		// TODO Auto-generated method stub
		return groupMemeberList;
	}

}
