package com.xywz.plan.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.plan.model.XywzPlanPrdcPlanAdvsSngl;
import com.xywz.plan.service.XywzPlanPrdcPlanAdvsSnglService;
import com.xywztech.bob.common.CommonAction;



/*
 * 生产计划通知单Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzPlanPrdcPlanAdvsSnglAction")
public class XywzPlanPrdcPlanAdvsSnglAction extends CommonAction {
	
	@Autowired
	private XywzPlanPrdcPlanAdvsSnglService service;
	

	
	@Autowired
	public void init() {
		model = new XywzPlanPrdcPlanAdvsSngl();
		setCommonService(service);

	}
	
	public void updateXywzPlanPrdcPlanAdvsSngl() {
		service.updateInfo(model);
		
	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzPlanPrdcPlanAdvsSngl C WHERE C.planId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
    
	//按吨数任务下达
    public String giveTask(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String typeStr = request.getParameter("typeStr");
		String workShop = request.getParameter("workShop");
		String[] ids =idStr.split(",");
		String[] types =typeStr.split(",");
		for(int i=0;i<ids.length;i++){
			String id =ids[i];
			String type =types[i];
			service.saveTask(id,type,workShop);
			
		}				
        return "success";
    }
    
	//按支件任务下达
    public String giveTaskNew(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String typeStr = request.getParameter("typeStr");
		String weightStr = request.getParameter("weightStr");
		String zhiCntStr = request.getParameter("zhiCntStr");
		String jianCntStr = request.getParameter("jianCntStr");
		String remZhiCntStr = request.getParameter("remZhiCntStr");
		String sumZhiStr = request.getParameter("sumZhiStr");
		String planNum=request.getParameter("planNum");
		String toleance=request.getParameter("tolerance");
		System.out.println("idStr:::"+idStr);
		System.out.println("typeStr:::"+typeStr);
		System.out.println("weightStr:::"+weightStr);
		System.out.println("zhiCntStr:::"+zhiCntStr);
		System.out.println("jianCntStr:::"+jianCntStr);
		System.out.println("remZhiCntStr:::"+remZhiCntStr);
		System.out.println("sumZhiStr:::"+sumZhiStr);
		System.out.println("toleance:::"+toleance);
		String[] ids =idStr.split(",");
		String[] types =typeStr.split(",");
		String[] weights =weightStr.split(",");
		String[] zhiCnts =zhiCntStr.split(",");
		String[] jianCnts =jianCntStr.split(",");
		String[] remZhiCnts =remZhiCntStr.split(",");
		String[] sumZhis =sumZhiStr.split(",");
		String[] sumtoleance=toleance.split(",");
		for(int i=0;i<sumtoleance.length;i++){
			sumtoleance[i]=sumtoleance[i].replace("α", "");
		}
		for(int i=0;i<ids.length;i++){
			String id =ids[i];
			String type =types[i];
			service.saveTaskNew(id,type,weights[i],zhiCnts[i],jianCnts[i],remZhiCnts[i],sumZhis[i],planNum,sumtoleance[i]);
			
		}				
        return "success";
    }
    
	//排产
    public String giveScheduling(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String scheduNum = request.getParameter("scheduNum");
		//String scheduDate = request.getParameter("scheduDate");
		String[] ids =idStr.split(",");
		for(int i=0;i<ids.length;i++){
			String id =ids[i];
			service.giveScheduling(id,scheduNum);
			
		}				
        return "success";
    }
	//提交质检
    public String submitQuality(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String[] ids =idStr.split(",");
		for(int i=0;i<ids.length;i++){
			String id =ids[i];
			service.submitQuality(id);
			
		}				
        return "success";
    }
    
    public void updateStatus(){
    	//service1 = new XywzLogiDelvMerchdService();
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String planId = request.getParameter("planId");
		String jql="";
		System.out.print("falg="+planId);
		System.out.print(planId);
		jql="delete from XywzPlanPrdcPlanAdvsSngl C "+
		   		"WHERE C.planId IN ("+planId+")"; //反下达
		
		Map<String,Object> values=new HashMap<String,Object>();
//		Map<String,Object> values1=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
//		service1.batchUpdateByName(dvlJql, values1);
		addActionMessage("batch update successfully");
    	
    }
    public void updateOverStatus(){
    	//service1 = new XywzLogiDelvMerchdService();
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String planId = request.getParameter("planId");
		String jql="";
		System.out.print("falg="+planId);
		System.out.print(planId);
		jql="update XywzPlanPrdcPlanAdvsSngl C set scheduStatus='0' "+
		   		"WHERE C.planId IN ("+planId+")"; //反下达
		
		Map<String,Object> values=new HashMap<String,Object>();
//		Map<String,Object> values1=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
//		service1.batchUpdateByName(dvlJql, values1);
		addActionMessage("batch update successfully");
    	
    }
    
    public void cancelScheduling(){
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String planId = request.getParameter("idStr");
		String jql="";
		System.out.print("falg="+planId);
		System.out.print(planId);
		jql="update XywzPlanPrdcPlanAdvsSngl C set scheduStatus='0' "+
		   		"WHERE C.planId IN ("+planId+")"; //反下达
		
		Map<String,Object> values=new HashMap<String,Object>();
//		Map<String,Object> values1=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
//		service1.batchUpdateByName(dvlJql, values1);
		addActionMessage("batch update successfully");
    }
    
}



