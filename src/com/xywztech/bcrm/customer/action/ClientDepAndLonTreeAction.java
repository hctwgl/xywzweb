/**
 * 
 */
package com.xywztech.bcrm.customer.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.xywztech.bcrm.customer.service.ClientDepAndLonService;
import com.xywztech.bob.action.BaseAction;

/**
 * @author yaoliang
 *集团客户存贷款信息查询
 */
@ParentPackage("json-default")
@Action(value="client-dep-and-lon-tree",results={@Result(name="success",type="json")})

public class ClientDepAndLonTreeAction  extends BaseAction {

	@SuppressWarnings("unchecked")
	private List depAndLonTreeList;
	
	
	@SuppressWarnings({ "unchecked" })
	public String index(){
		
		String group_no  = (String)getJson().get("group_no");
		StringBuffer depLonString = new StringBuffer("select t.id, t.cust_id, t.parent_id, coalesce (t2.cust_zh_name,t3.cust_zh_name) cust_zh_name,coalesce(t2.cust_zzdm,t3.cust_zzdm) cust_zzdm  from ocrm_f_ci_group_member t  left join acrm_f_ci_cust_info t2 on t2.cust_id = t.cust_id left join ACRM_F_CI_LATENT_CUST_INFO t3 on t.cust_id = t3.cust_id  connect by prior t.id = t.parent_id  " 
				+" start with t.parent_id = '0' and group_no ='"+group_no+"' "); 
		
		ClientDepAndLonService clientDepAndLonService = new ClientDepAndLonService();
		
		Map clientDepAndLonMap = clientDepAndLonService.clientDepAndLonList(depLonString.toString());
		
		List depAndLonListOracle = (List)clientDepAndLonMap.get("data");
		
		StringBuffer groupGpString = buildGpSql(depAndLonListOracle);
		
		groupGpString.append(" left join mdm.ocrm_f_ci_group_dep_ln t2 on t.cust_id = t2.cust_id ");
		
		List depAndLonList = (List)clientDepAndLonService.clientDepAndLonListGp(groupGpString.toString()).get("data");
		
		
		int level=0;//树节点的层次
		Map leftMap = new HashMap();//节点left开始位置
		Map rightMap = new HashMap();//节点right结束位置
		leftMap.put("left", 1);
		rightMap.put("right", 0);
		Map rootMap=null;
		
		for(int i=0;i<depAndLonList.size();i++){
			Map tempMap = (Map)depAndLonList.get(i);
			if((tempMap.get("parent_id")+"").equals("0")){
				rootMap = tempMap;
				rootMap.put("_parent", "null");
				rootMap.put("_is_leaf",false);
				rootMap.put("_level", "1");
				rootMap.put("_id", tempMap.get("id")+"");				
				break;
			}
		}
		ArrayList treeList = new ArrayList();		
		try{
			depLonChild(rootMap,depAndLonList,level);//构造树,并且计算层级		
			buildClientTree(rootMap,leftMap,rightMap,treeList);//计算每个节点的left和right位置.
		}catch(Exception ex){
			
			ex.printStackTrace();
			
		}

		depAndLonTreeList  = treeList;
		
		int j=0;
		int asureIndex= -1 ;//集团对外担保客户的位置
		Map asureMap = new HashMap();//集团对外担保客户Map
		while(j<depAndLonTreeList.size()){
			Map childMap = (Map)depAndLonTreeList.get(j);
			if(childMap.get("cust_id").equals("JTDWDBCY")){
				asureIndex = j;
				asureMap = childMap;
				asureMap.putAll(childMap);
			}			
			j++;
		}	
		/*将集团对外担保客户节点加到列表的最后 */
		if( (asureIndex!=-1) && (asureIndex != j-1) ){
			depAndLonTreeList.add(asureMap);
			depAndLonTreeList.remove(asureIndex);
		}
		
		return "success";
	}
	

	@SuppressWarnings("unchecked")
	public  StringBuffer buildGpSql(List memberList){
		StringBuffer  gpSql = new StringBuffer("select  t.id  ,t.cust_id ,t.parent_id  ,t.cust_zh_name ,t.cust_zzdm ," 
				+" t2.dep_time_point,t2.dep_year_avg,t2.dep_month_avg,t2.dep_quar_avg,t2.dep_cp_last_day,t2.dep_cp_last_month,t2.dep_cp_last_quar, " 
				+" t2.dep_cp_year_start,t2.dep_contri,t2.ln_time_point,t2.ln_month_avg,t2.ln_quar_avg,t2.ln_year_avg,t2.ln_cp_last_day,"
				+" t2.ln_cp_last_month,t2.ln_cp_last_quar,t2.ln_cp_year_start,t2.ln_contri "
				+"  from ( ");
		for(int i=0;i<memberList.size();i++){		
			Map memberMap = (Map)memberList.get(i);
			if( (memberMap.get("PARENT_ID")+"").equals("0") ){
				memberMap.put("CUST_ID", "0");
			}
			String id = memberMap.get("ID")+"";
			String cust_id = memberMap.get("CUST_ID")+"";
			String parent_id = memberMap.get("PARENT_ID")+"";
			String cust_zh_name = (String)memberMap.get("CUST_ZH_NAME");
			String cust_zzdm = (String)memberMap.get("CUST_ZZDM");	
			
			gpSql.append("select "+id+" id,'"+cust_id+"'  cust_id,"+parent_id+"  parent_id,'"+cust_zh_name+"' cust_zh_name, ");
			if(cust_zzdm!=null){
				gpSql.append(" '"+cust_zzdm+"'  cust_zzdm  union ");				
			}else
			{
				gpSql.append(" ''  cust_zzdm  union ");
			}			
		}
		
		int lastUnion = gpSql.lastIndexOf("union");
		StringBuffer buildStr = gpSql.replace(lastUnion, gpSql.length(), " ");
		buildStr.append(" ) t  ");
		return buildStr;
	}
	

	@SuppressWarnings("unchecked")
	public  StringBuffer buildOracleSql(List memberList){
		StringBuffer  gpSql = new StringBuffer("select  t.id  ,t.cust_id ,t.parent_id  ,t.cust_zh_name ,t.cust_zzdm ," 
				+" t2.dep_time_point,t2.dep_year_avg,t2.dep_month_avg,t2.dep_quar_avg,t2.dep_cp_last_day,t2.dep_cp_last_month,t2.dep_cp_last_quar, " 
				+" t2.dep_cp_year_start,t2.dep_contri,t2.ln_time_point,t2.ln_month_avg,t2.ln_month_avg,t2.ln_quar_avg,t2.ln_year_avg,t2.ln_cp_last_day,"
				+" t2.dep_cp_last_month,t2.dep_cp_last_quar,t2.dep_cp_year_start,t2.ln_contri "
				+"  from ( ");
		try{
		for(int i=0;i<memberList.size();i++){		
			Map memberMap = (Map)memberList.get(i);
			
			String id = memberMap.get("ID")+"";
			String cust_id = memberMap.get("CUST_ID")+"";
			String parent_id = memberMap.get("PARENT_ID")+"";
			String cust_zh_name = (String)memberMap.get("CUST_ZH_NAME");
			String cust_zzdm = (String)memberMap.get("CUST_ZZDM");			
			gpSql.append("select "+id+" id,'"+cust_id+"'  cust_id,"+parent_id+"  parent_id,'"+cust_zh_name+"' cust_zh_name, ");
			if(cust_zzdm!=null){
				gpSql.append(" '"+cust_zzdm+"'  cust_zzdm from dual union ");				
			}else
			{
				gpSql.append(" ''  cust_zzdm  from dual union ");
			}			
		}
		}catch(Exception ex){
			ex.printStackTrace();
		}
		int lastUnion = gpSql.lastIndexOf("union");
		StringBuffer buildStr = gpSql.replace(lastUnion, gpSql.length(), " ");
		buildStr.append(" ) t  ");
		return buildStr;
	}	
	
	
	@SuppressWarnings({ "unchecked" })
	public Map  buildClientTree(Map rootMap,Map leftMap,Map rightMap,List treeList){
		
		List childList = (List)rootMap.get("children");
		
		if(childList==null || childList.size()==0 ){//如果是叶子节点
			int left = (Integer)leftMap.get("left")+1;
			rightMap.put("right", left);//下一个子节点的开始位置
			leftMap.put("left", left);//下一个叶子节点额开始位置
			rootMap.put("_lft", left);//叶子节点的right和left相同.
			rootMap.put("_rgt", left);
			rootMap.put("_is_leaf", true);
			rootMap.remove("children");
			treeList.add(rootMap);
			return rightMap;
			
		}else//如果是子节点
		{			
			int left = (Integer)rightMap.get("right")+1;//子节点left的开始位置是,前一个right后开始
			leftMap.put("left", left);//设置子节点下叶子节点的left开始位置
			rightMap.put("right", left);//子节点的right开始位置
			rootMap.put("_lft", left);
			
			rootMap.put("cust_zzdm", "");
			
			rootMap.put("_is_leaf",false);
			
			for(int i=0;i<childList.size();i++){
				
				Map nodeMap = (Map)childList.get(i);
				rightMap = buildClientTree(nodeMap,leftMap,rightMap,treeList);
			}
			int right = (Integer)rightMap.get("right")+1;//得到当前节点的右边位置
			rightMap.put("right", right);//
			leftMap.put("left", right);	//下一节点left的开始位置，在当前节点后。		
			rootMap.put("_rgt", right);
			
			rootMap.remove("children");
			treeList.add(rootMap);
			return rightMap;
		}
	}
	
	//递归,构造树状结构,并且计算每个节点的层次level,并且汇总计算各个节点的存贷款贡献度情况
	@SuppressWarnings({ "unchecked" })
	public void depLonChild(Map parentMap,List depAndLonList,int level){
		level++;//每递归执行一次,层次加1
		ArrayList childList = new ArrayList();		
		for(int i=0;i<depAndLonList.size();i++){
			
			Map tempMap = (Map)depAndLonList.get(i);
			
			if((tempMap.get("parent_id")+"").equals((parentMap.get("id")+"")) ){
				
				tempMap.put("_parent", tempMap.get("parent_id")+"");
				
				childList.add(tempMap);				
				
				depLonChild(tempMap,depAndLonList,level);
			}
		}
		parentMap.put("_level", level);//添加层次
		parentMap.put("_id", parentMap.get("id")+"");
		
		if(childList.size()==0){
			parentMap.put("_is_leaf", true);
			if(parentMap.get("cust_id").equals("JTDWDBCY")){				
				parentMap.put("cust_zh_name", "集团对外担保成员");
			}			
		}else
		{		
			parentMap.put("_is_leaf", false);
			if(parentMap.get("cust_id").equals("JTDWDBCY")){				
				parentMap.put("cust_zh_name", "集团对外担保成员");
			}
			else{
				if(!(parentMap.get("parent_id")+"").equals("0")){
					HashMap cloneMap = new HashMap();				
					cloneMap.putAll(parentMap);		
					int tempLevel = level;
					tempLevel++;
					cloneMap.put("_level", tempLevel);
					cloneMap.put("_is_leaf", true);
					cloneMap.put("_id", parentMap.get("id")+"_1");
					cloneMap.put("_parent", parentMap.get("id")+"");
					childList.add(0,cloneMap);				
				}	
			}
		}		
		//汇总计算各个节点的存贷款数据
		HashMap tempParentMap = new HashMap();
		tempParentMap.putAll(parentMap);
		for(int j=0;j<childList.size();j++){
				
			Map childMap = (Map)childList.get(j);
				
				Iterator iterator = childMap.keySet().iterator();
				while(iterator.hasNext()){	
					
					String key = (String) iterator.next();
					if(key.equals("dep_time_point") || key.equals("dep_year_avg") || key.equals("dep_month_avg")|| key.equals("dep_quar_avg") || key.equals("dep_cp_last_day")
							|| key.equals("dep_cp_last_month") || key.equals("dep_cp_last_quar") || key.equals("dep_cp_year_start") || key.equals("dep_contri") 
							|| key.equals("ln_time_point") || key.equals("ln_month_avg") || key.equals("ln_quar_avg") || key.equals("ln_year_avg")
							|| key.equals("ln_cp_last_day") || key.equals("ln_cp_last_month") || key.equals("ln_cp_last_quar") || key.equals("ln_cp_year_start") || key.equals("ln_contri")){
						
					
						String keyValueP = parentMap.get(key)+"";
						String keyValueC = childMap.get(key)+"";
						if(keyValueP.equals("null")||keyValueP.equals("")){
							keyValueP="0.00";
							parentMap.put(key, keyValueP);
							tempParentMap.put(key, keyValueP);
						}
						if(keyValueC.equals("null")||keyValueC.equals("")){
							keyValueC="0.00";
							childMap.put(key, keyValueC);
						}
						String keyValueSum = (Double.parseDouble(keyValueP)+Double.parseDouble(keyValueC))+"";
						parentMap.put(key, keyValueSum);				
				}
			}
		}	
		if(childList.size()>0){
			Iterator iterator_temp = tempParentMap.keySet().iterator();
			while(iterator_temp.hasNext()){
				String key = (String) iterator_temp.next();
				if(key.equals("dep_time_point") || key.equals("dep_year_avg") || key.equals("dep_month_avg")|| key.equals("dep_quar_avg") || key.equals("dep_cp_last_day")
						|| key.equals("dep_cp_last_month") || key.equals("dep_cp_last_quar") || key.equals("dep_cp_year_start") || key.equals("dep_contri") 
						|| key.equals("ln_time_point") || key.equals("ln_month_avg") || key.equals("ln_quar_avg") || key.equals("ln_year_avg")
						|| key.equals("ln_cp_last_day") || key.equals("ln_cp_last_month") || key.equals("ln_cp_last_quar") || key.equals("ln_cp_year_start") || key.equals("ln_contri")){
				
					String keyValueP = parentMap.get(key)+"";
					String keyValueC = tempParentMap.get(key)+"";
					String keyValueSub = (Double.parseDouble(keyValueP)-Double.parseDouble(keyValueC))+"";
					parentMap.put(key, keyValueSub);				
					
					
				}
			}	
		}
		
		parentMap.put("children", childList);	

	}

	@SuppressWarnings("unchecked")
	public List getDepAndLonTreeList() {
		return depAndLonTreeList;
	}

	@SuppressWarnings("unchecked")
	public void setDepAndLonTreeList(List depAndLonTreeList) {
		this.depAndLonTreeList = depAndLonTreeList;
	}

	
	
}
