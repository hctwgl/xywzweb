package com.xywztech.bcrm.index.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import com.xywztech.bcrm.index.service.IndexInfoService;
import com.xywztech.bob.action.BaseAction;

@ParentPackage("json-default")
@Action(value = "/IndexInfoQueryAction", results = { @Result(name = "success", type = "json"), })
public class IndexInfoQueryAction extends BaseAction
{
	@Autowired
	IndexInfoService iis;
	
	
	private String  typeid;
	public String getTypeid() {
		return typeid;
	}
	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String index() throws Exception
	{
		setJson(iis.searchSubIndexList(typeid));
		return "success";
	}
}
