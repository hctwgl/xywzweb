package com.xywztech.bcrm.index.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.xywztech.bcrm.index.service.IndexInfoService;
import com.xywztech.bob.action.BaseAction;

@ParentPackage("json-default")
@Action(value = "/IndexComplexQueryInfoAction", results = { @Result(name = "success", type = "json"), })
public class IndexComplexQueryInfoAction extends BaseAction
{
	@Autowired
	IndexInfoService iis;
	
	private String  ID;
	
	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String index() throws Exception
	{ 
		setJson(iis.searchSubIndexComplexList(ID));
		
		return "success";
	}
}
