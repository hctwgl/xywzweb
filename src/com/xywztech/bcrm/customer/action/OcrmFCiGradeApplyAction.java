package com.xywztech.bcrm.customer.action;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import com.ecc.echain.workflow.engine.EVO;
import com.ecc.echain.workflow.engine.WorkFlowClient;
import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.customer.model.OcrmFCiGradeApply;
import com.xywztech.bcrm.customer.service.OcrmFCiGradeApplyService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.vo.AuthUser;

/**
 * 
 * @author huwei
 * 客户评级申请
 *
 */
@SuppressWarnings("serial")
@Action("/ocrmFCiGradeApply-info")
public class OcrmFCiGradeApplyAction extends CommonAction{
	
	@Autowired
	private OcrmFCiGradeApplyService service;
	@Autowired
	public void init() {
		model = new OcrmFCiGradeApply();
		setCommonService(service);
	}
	
	public HttpHeaders indexPage() throws Exception {
		try {
			StringBuilder sb = new StringBuilder(
					"select c from OcrmFCiGradeApply c where 1=1 ");
			Map<String, Object> values = new HashMap<String, Object>();
			ActionContext ctx = ActionContext.getContext();
			request = (HttpServletRequest) ctx
					.get(StrutsStatics.HTTP_REQUEST);
			 if(request.getParameter("start")!=null)
			 start = new Integer(request.getParameter("start")).intValue();
			 if(request.getParameter("limit")!=null)
			 limit = new Integer(request.getParameter("limit")).intValue();
			this.setJson(request.getParameter("condition"));

			// 获取客户号
			if (request.getParameter("id") != null) {
				sb.append(" and c.id = " + request.getParameter("id"));
			}

			for (String key : this.getJson().keySet()) {
				if (null != this.getJson().get(key)
						&& !this.getJson().get(key).equals("")) {
					sb.append(" and c." + key + " = :" + key);
					values.put(key, this.getJson().get(key));
				}
			}
			return super.indexPageByJql(sb.toString(), values);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	/**
	 * 发起工作流
	 * */
	public void initFlow() throws Exception{

		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
		String userId = auth.getUserId();
		String orgId = auth.getUnitId();
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
		.get(StrutsStatics.HTTP_REQUEST);
		String instanceid = request.getParameter("instanceid");
		String custName = request.getParameter("custname");
		String custMgrName = auth.getCname();
		//system.out.printlnln("*********initFlow run************");
//system.out.printlnntln("*********工作流ID，instanceid："+instanceid+"*********");//system.out.printlnrintln("*********用户ID，userid："+userId+"*********"//system.out.println.println("*********机构ID，orgid："+orgId+"*********");
		EVO vo=new EVO();
    	vo.setCurrentUserID(userId);
    	vo.setOrgid(orgId);
    	vo.setInstanceID(instanceid);//设置当前任务实例号
//    	vo.setWFSign("cust_class");  //设置任务标识，对应流程定制中的任务标识
    	vo.setWFID("13");    //设置任务的文件名称（对应任务标识，如存储kevinmxt任务的文件名称为2.xml，就设置为2）
    	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String date = format.format(new java.util.Date()).toString();
    	vo.setJobName(custMgrName+"_客户评级申请_客户:"+custName);  //  设置工作名称，显示在待办列表中
    	vo=WorkFlowClient.getInstance().initializeWFWholeDocUNID(vo);   //发起任务
    	WorkFlowClient.getInstance().wfSaveJob(vo);
//    	Long idLong = new Long(Integer.parseInt(instanceid));
//    	customerManagerEstimateService.setStatus(idLong);
	}
	
}
