package com.xywztech.bcrm.customer.action;

import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.customer.service.AgileSearchService;
import com.xywztech.bcrm.system.model.DataSetColumn;
import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
@Action(value="/queryagileresult", results={
    @Result(name="success", type="json")
})
public class QueryAgileResultAction extends BaseQueryAction{
    
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	private HttpServletRequest request;

	@Autowired
	private AgileSearchService agileSearchService;
	
	@Override
    public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		
		String conditionAttrs = request.getParameter("conditionAttrs");
		String results = request.getParameter("results");
		String radio = request.getParameter("radio");
		String groupParams = request.getParameter("groupParams");
		String sumParams = request.getParameter("sumParams");
		
		JSONArray jaCondition = JSONArray.fromObject(conditionAttrs);
		JSONArray jaColumns = JSONArray.fromObject(results);
		
		
		Map<String, Object> res = agileSearchService.generatorSql(jaCondition, jaColumns,radio, groupParams, sumParams);
		SQL=(String)res.get("SQL");
		Map<DataSetColumn,String> lookups = (Map<DataSetColumn,String>)res.get("lookupColumns");
		Iterator<DataSetColumn> itl = lookups.keySet().iterator();
		while(itl.hasNext()){
			DataSetColumn dsc = itl.next();
			this.addOracleLookup(dsc.getColNameE()+"_"+lookups.get(dsc),  dsc.getNotes());
		}
		
		datasource = ds;
    }
	
}
