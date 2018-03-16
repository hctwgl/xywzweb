package com.xywztech.bcrm.custmanager.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custmanager.model.OcrmFWpWorklogWDetail;
import com.xywztech.bcrm.custmanager.service.WeekWorkService;
import com.xywztech.bob.common.CommonAction;

/**
 * 周日记操作
 * @author lixb
 * @serial 2012-11-14
 *
 */
@SuppressWarnings("serial")
@Action("/WeekWork")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "WeekWork"})
})

public class WeekWorkAction  extends CommonAction{
    @Autowired
    private WeekWorkService weekWorkservice ;
    @Autowired
	public void init(){
	  	model = new OcrmFWpWorklogWDetail(); 
		setCommonService(weekWorkservice);
	}
    
    /**
     * 周日记保存
     * @return
     */
    public String weekSave(){
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String workPlanNewCusts =  request.getParameter("workPlanNewCusts");
        String workPlanCredits  =  request.getParameter("workPlanCredits");
        String workPlanStocks   =  request.getParameter("workPlanStocks");
      	String workPlanOthers   =  request.getParameter("workPlanOthers");
      	
      	String workExecuteNewCusts = request.getParameter("workExecuteNewCusts");         
      	String workExecuteCredits  = request.getParameter("workExecuteCredits");         
      	String workExecuteStocks   = request.getParameter("workExecuteStocks"); 
      	String workExecuteOthers   = request.getParameter("workExecuteOthers");  
      	
      	String idNewCusts  = request.getParameter("idNewCusts");
      	String idCredits   = request.getParameter("idCredits"); 
      	String idStocks    = request.getParameter("idStocks");  
      	String idOthers    = request.getParameter("idOthers");  
      	
      	String weekIds = request.getParameter("weekIds");//主表ID
      	String workLogDates = request.getParameter("workLogDates");
      	String createDateNews = request.getParameter("createDateNews");
      	if (null == weekIds || weekIds.equals("")) {
      		weekWorkservice.saveWorkLog(createDateNews,workLogDates);
      	}
      										// 主表ID      工作计划                                                  完成情况                                  类别                从表ID    主表周期
			weekWorkservice.saveWeekLogDetail(weekIds,workPlanNewCusts,workExecuteNewCusts,"1",idNewCusts,workLogDates,createDateNews); 
	      	weekWorkservice.saveWeekLogDetail(weekIds,workPlanCredits,workExecuteCredits,"2",idCredits,workLogDates,createDateNews);
	      	weekWorkservice.saveWeekLogDetail(weekIds,workPlanStocks,workExecuteStocks,"3",idStocks,workLogDates,createDateNews);
	      	weekWorkservice.saveWeekLogDetail(weekIds,workPlanOthers,workExecuteOthers,"4",idOthers,workLogDates,createDateNews);
    	return "success";
    }
}
    
