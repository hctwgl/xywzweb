package com.xywztech.bob.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.xywztech.bob.service.PlanProductService;

@ParentPackage("json-default")

@Action(value="/plan-product-batch", results={
    @Result(name="success", type="json")
})
public class PlanProductBatchAction {

	private String idStr;
	public String getIdStr() {
		return idStr;
	}

	public void setIdStr(String idStr) {
		this.idStr = idStr;
	}

	public String getRollId() {
		return rollId;
	}

	public void setRollId(String rollId) {
		this.rollId = rollId;
	}

	private String rollId;
	@Autowired
	private PlanProductService planProductService;
	
	public String index(){
		return "success";
	}
	
    public String batchCreate() throws Exception {

    	//system.out.printlnln("idStr==================="+idStr);
   //system.out.printlnntln("rollId====================="+rollId);
    	planProductService.batchAdd(idStr,rollId);
        return "success";
    }    
}
