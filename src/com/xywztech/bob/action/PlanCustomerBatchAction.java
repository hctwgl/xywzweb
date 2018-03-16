package com.xywztech.bob.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.xywztech.bcrm.sales.service.PlanCustomerService;

@ParentPackage("json-default")

@Action(value="/plancustomerbatch", results={
    @Result(name="success", type="json")
})
public class PlanCustomerBatchAction {

	private String idStr;
	private String rollId;
	
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
	
	@Autowired
	private PlanCustomerService planCustomerService;
	
	public String index(){
		return "success";
	}
	
    public String batchCreate() throws Exception {
//
//    	//system.out.printlnln("idStr==================="+idStr);
//   //system.out.printlnntln("rollId====================="+rollId);
    	planCustomerService.batchAdd(idStr,rollId);
        return "success";
    }   
    
    public String updateExecutor()throws Exception{
    	planCustomerService.updateExecutor(idStr,rollId);
    	return "success";
    }
}
