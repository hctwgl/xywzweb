package com.xywztech.bcrm.custmanager.action;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custmanager.model.OcrmFWpWorklogWDetail;
import com.xywztech.bcrm.custmanager.service.MonthWorkService;
import com.xywztech.bob.common.CommonAction;

/**
 * 月日记管理
 * @author lixb
 * @since 2012-11-16
 */
@SuppressWarnings("serial")
@Action("/MonthWork")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "MonthWork"})
})

public class MonthWorkAction  extends CommonAction{
    @Autowired
    private MonthWorkService monthWorkservice ;
    @Autowired
	public void init(){
	  	model = new OcrmFWpWorklogWDetail(); 
		setCommonService(monthWorkservice);
	}
    
    /**
     * 月日记批量保存
     * @return
     */
    public String monthSave(){
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
       
        String mainIdshow = request.getParameter("mainIdshow");				//主表ID
        String idShow = request.getParameter("workIdshow");					//从表月ID
        String worklogIdShow = request.getParameter("worklogIdshow");		//关联主表外键
        String workTypeShow = request.getParameter("workTypeshow");			//类型
        String workShow = request.getParameter("workshow");					//项目（中文）
    	String workOrderShow = request.getParameter("workOrdershow");		//序号
    	String workPlanShow = request.getParameter("workPlanshow");			//月工作计划
    	String workExecuteShow = request.getParameter("workExecuteshow");	//实际完成情况
    	
    	JSONObject jsonObject1 = JSONObject.fromObject(idShow);
    	JSONArray jarray1 =  jsonObject1.getJSONArray("workId");
    	
    	JSONObject jsonObject2 = JSONObject.fromObject(worklogIdShow);
    	JSONArray jarray2 =  jsonObject2.getJSONArray("worklogId");
    	
    	JSONObject jsonObject3 = JSONObject.fromObject(workTypeShow);
    	JSONArray jarray3 =  jsonObject3.getJSONArray("workType");
    	
    	JSONObject jsonObject4 = JSONObject.fromObject(workShow);
    	JSONArray jarray4 =  jsonObject4.getJSONArray("work");
    	
    	JSONObject jsonObject5 = JSONObject.fromObject(workOrderShow);
    	JSONArray jarray5 =  jsonObject5.getJSONArray("workOrder");
    	
    	JSONObject jsonObject6 = JSONObject.fromObject(workPlanShow);
    	JSONArray jarray6 =  jsonObject6.getJSONArray("workPlan");
    	
    	JSONObject jsonObject7 = JSONObject.fromObject(workExecuteShow);
    	JSONArray jarray7 =  jsonObject7.getJSONArray("workExecute");
    	
//    	JSONObject jsonObject1 = JSONObject.fromObject(workType);
//    	JSONArray jarray1 =  jsonObject1.getJSONArray("workType");
//    	JSONObject jsonObject2 = JSONObject.fromObject(workPlan);
//    	JSONArray jarray2 =  jsonObject2.getJSONArray("workPlan");
//    	JSONObject jsonObject3 = JSONObject.fromObject(workExecute);
//    	JSONArray jarray3 =  jsonObject3.getJSONArray("workExecute");
	   monthWorkservice.batchSave(mainIdshow,jarray1,jarray2,jarray3,jarray4,jarray5,jarray6,jarray7);
    	return "success";
    }
}
    
