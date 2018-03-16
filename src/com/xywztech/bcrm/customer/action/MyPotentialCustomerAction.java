package com.xywztech.bcrm.customer.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Validateable;
import com.opensymphony.xwork2.ValidationAwareSupport;
import com.xywztech.bcrm.customer.model.OcrmFCiCustDesc;
import com.xywztech.bcrm.customer.service.MyPotentialCustomerService;
import com.xywztech.crm.exception.BizException;

@Action("myPotentialCustomer")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "myPotentialCustomer"})
})
public class MyPotentialCustomerAction extends ValidationAwareSupport implements ModelDriven<Object>, Validateable{
	private static final long serialVersionUID = -2010621122837504304L;
	private OcrmFCiCustDesc wi = new OcrmFCiCustDesc();
	private Long id;
    
    @Autowired
    private MyPotentialCustomerService myPotentialCustomerService;
    private HttpServletRequest request; 
    // GET /orders
    public HttpHeaders index() {
        return new DefaultHttpHeaders("index")
            .disableCaching();
    }
	
    // GET /orders/1
    public HttpHeaders show() {
        return new DefaultHttpHeaders("show");
    }

    // GET /orders/1/edit
    public String edit() {
        return "edit";
    }

    // GET /orders/new
    public String editNew() {
   
        return "editNew";
    }

    // GET /orders/1/deleteConfirm
    public String deleteConfirm() {
        return "deleteConfirm";
    }

    // DELETE /orders/1
    public String destroy() {
    	//myPotentialCustomerService.remove(id);
        return "success";
    }

    // POST /orders
    
    public HttpHeaders create() throws BizException{
    	String sihn = "success";
    	
    	
    		ActionContext ctx = ActionContext.getContext();
    	      request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	      String custId = request.getParameter("custId");
    	      String custZhName = request.getParameter("custZhName");
    	      String custTyp = request.getParameter("custTyp");
    	      String linkUser = request.getParameter("linkUser");
    	      String postNo = request.getParameter("postNo");
    	      String custEnName = request.getParameter("custEnName");
    	      String certType = request.getParameter("certType");
    	      String linkPhone = request.getParameter("linkPhone");
    	      String custStat = request.getParameter("custStat");
    	      if(custStat.length()<1){
    	    	custStat="2";  
    	      };
    	      String otherName = request.getParameter("otherName");
    	      String certNum = request.getParameter("certNum");
    	      String commuAddr = request.getParameter("commuAddr");
    	      
    	     	boolean s = myPotentialCustomerService.save(custId,custZhName,custTyp,linkUser,postNo,custEnName,certType,linkPhone,custStat,otherName,certNum,commuAddr);
    	     	if(s){
    	    		return new DefaultHttpHeaders("success")
    	    	    .setLocationId(wi.getCustId());
    	        }	
            	else{
            		sihn="failure";
            		throw new BizException(1, 2, "1000", "Sorry,the user you input already exists, please enter again!");
            	}
		
}

    // PUT /orders/1
    public String update() {
    	//myPotentialCustomerService.save(model);
        return "success";
    }
    //校验方法
    public void validate() {

    }
    
    public Long getId() 
    { 
        return this.id; 
    } 

    public void setId(Long id) {
 
        this.id = id;
    }

	
	public Object getModel() {
		// TODO Auto-generated method stub
		return null;
	}
}
