/**
 * 
 */
package com.xywztech.bob.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Validateable;
import com.xywztech.bob.service.SysRoleKindTreeService;

/**
 * @author yaoliang
 *
 */
@Action("/sysRole-kind-tree")
@Results({ @Result(name = "success", type = "redirectAction", params = {
		"actionName", "sysRole-kind-tree" }) })
		
public class SysRoleKindTreeAction extends BaseAction implements
ModelDriven<Object>, Validateable{
	
	private List kindChild = new ArrayList(); 
	@Autowired
	SysRoleKindTreeService sysRoleKindTreeService;
	
	public String index(){
		
		StringBuffer sb = new StringBuffer("select ADMIN_AUTH_ROLE.* from ADMIN_AUTH_ROLE where ADMIN_AUTH_ROLE.APP_ID = '62' ");
		
//		Map params = this.getJson();
//		
//		Iterator iterator = params.keySet().iterator();
//		
//		while(iterator.hasNext()){
//			
//			String key = (String)iterator.next();
//			String keyValue = (String)params.get(key);			
//			if(key.equals("CATL_PARENT")){
//				if(keyValue==null || keyValue.equals("") || keyValue.equals("null")){
////					sb.append("  and CATL_PARENT is null ");
//				}else{
//					sb.append("  and role_name = '" + keyValue  + "' ");
//				}
//			}
////			else{
////				
////				if(keyValue!=null && !keyValue.equals("") && !keyValue.equals("null")){				
////					sb.append("  and " + key + " = '" + keyValue  + "' ");
////				}
////			}
//			
//		}		
		Map map = sysRoleKindTreeService.productListKinds(sb.toString());
		transToTreeNode((List)map.get("data"));
		return "success";
	}
	
	public void transToTreeNode(List list){
		kindChild = list;
		for(int i=0;i<kindChild.size();i++){			
			Map map = (Map)list.get(i);
			map.put("id", map.get("ID"));
			map.put("text", map.get("ROLE_NAME"));
			map.put("leaf", "true");
		}
		
	}
	
	
	public List getKindChild() {
		return kindChild;
	}

	public void setKindChild(List kindChild) {
		this.kindChild = kindChild;
	}

	public void validate() {
		// TODO Auto-generated method stub
		
	}

	public Object getModel() {
		return kindChild;
		// TODO Auto-generated method stub
	//	return null;
	}
}
