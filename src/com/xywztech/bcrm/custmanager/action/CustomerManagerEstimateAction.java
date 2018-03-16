package com.xywztech.bcrm.custmanager.action;

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
import com.xywztech.bcrm.custmanager.model.OcrmFCmCustManagEvaMgr;
import com.xywztech.bcrm.custmanager.service.CustomerManagerEstimateService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.vo.AuthUser;


@SuppressWarnings("serial")
@Action("/customerManagerEstimate")
public class CustomerManagerEstimateAction  extends CommonAction{
    @Autowired
    private CustomerManagerEstimateService customerManagerEstimateService ;
    @Autowired
	public void init(){
	  	model = new OcrmFCmCustManagEvaMgr(); 
		setCommonService(customerManagerEstimateService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		//needLog=true;
	}
  //（自定义）批量删除
    @Override
	public String batchDestroy(){
    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr =request.getParameter("idStr");
			
			String jql="delete from OcrmFCmCustManagEvaMgr c where c.id in ("+idStr+")";
			Map<String,Object> values=new HashMap<String,Object>();
			customerManagerEstimateService.batchUpdateByName(jql, values);
			addActionMessage("batch removed successfully");
	        return "success";
    }

    //分页查询
    public HttpHeaders indexPage() throws Exception{
      try{	
    	StringBuilder sb=new StringBuilder("select c from OcrmFCmCustManagEvaMgr c where 1=1 ");
    	Map<String,Object> values=new HashMap<String,Object>();
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
//        String id = request.getParameter("ID");
//        if (id!=null&&!id.equals("")) {
//			sb.append(" and c.id = "+id+" ");
//		}
        if(request.getParameter("start")!=null)
        	start = new Integer(request.getParameter("start")).intValue();
        if(request.getParameter("limit")!=null)
        	limit = new Integer(request.getParameter("limit")).intValue();
		this.setJson(request.getParameter("condition"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("custMgrName")){
                    sb.append("and c.custMgrName like :custMgrName");
                    values.put("custMgrName", "%"+(String)this.getJson().get(key)+"%");
                }
               
                else if(key.equals("id")){
                    sb.append(" and c.id = :id");
                    values.put("id", Long.parseLong((String) this.getJson().get(key)));
                } else if(key.equals("assMon")){
                    sb.append("and c.assMon = :custMgrName");
                    values.put("custMgrName", this.getJson().get(key));
                }
//                else{
//                	sb.append(" and c."+key+" = :"+key);
//                	values.put(key, this.getJson().get(key));
//                	
//                }
            }
        }
    	return super.indexPageByJql(sb.toString(), values);
      }catch(Exception e){
    	  e.printStackTrace();
    	  throw e;
      }
	}
    //自定义查询
//    public HttpHeaders query() throws Exception{
//      try{	
//    	StringBuilder sb=new StringBuilder("select c from ChannelInfo c where 1=1 ");
//    	Map<String,Object> values=new HashMap<String,Object>();
//    	ActionContext ctx = ActionContext.getContext();
//        request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
//        //获取查询条件，查询条件用condition封装
//        this.setJson(request.getParameter("condition"));
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//    	for(String key:this.getJson().keySet()){
//            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
//                if(key.equals("channelName")){
//                    sb.append("and c.channelName like :channelName");
//                    values.put("channelName", "%"+(String)this.getJson().get(key)+"%");
//                }
//                else if(key.equals("createDateS")){
//                    sb.append(" and c.createDate >= :createDateS" );
//                    
//                    //Date date = sdf.parse("2008-08-08");
//
//                    values.put("createDateS", sdf.parse((String)this.getJson().get(key)));
//                }	
//                else if(key.equals("createDateE")){
//                    sb.append(" and c.createDate <= :createDateE");
//                    values.put("createDateE", sdf.parse((String)this.getJson().get(key)));
//                    
//                }    
//                else if(key.equals("channelId")){
//                    sb.append(" and c.channelId = :channelId");
//                    values.put("channelId", Long.parseLong((String) this.getJson().get(key)));
//                } 
//                else{
//                	sb.append(" and c."+key+" = :"+key);
//                	values.put(key, this.getJson().get(key));
//                	
//                }
//            }
//        }
//    	return super.indexByJql(sb.toString(), values);
//      }catch(Exception e){
//    	  e.printStackTrace();
//    	  throw e;
//      }
//	}
    
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
		String custMgrName = request.getParameter("custMgrName");
		//system.out.printlnln("*********initFlow run************");
//system.out.printlnntln("*********工作流ID，instanceid："+instanceid+"*********");//system.out.printlnrintln("*********用户ID，userid："+userId+"*********"//system.out.println.println("*********机构ID，orgid："+orgId+"*********");
		EVO vo=new EVO();
    	vo.setCurrentUserID(userId);
    	vo.setOrgid(orgId);
    	vo.setInstanceID(instanceid);//设置当前任务实例号
//    	vo.setWFSign("cust_manager_pg");  //设置任务标识，对应流程定制中的任务标识
    	vo.setWFID("12");    //设置任务的文件名称（对应任务标识，如存储kevinmxt任务的文件名称为2.xml，就设置为2）
    	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String date = format.format(new java.util.Date()).toString();
    	vo.setJobName(custMgrName+"_客户经理评估_"+date);  //  设置工作名称，显示在待办列表中
    	vo=WorkFlowClient.getInstance().initializeWFWholeDocUNID(vo);   //发起任务
    	WorkFlowClient.getInstance().wfSaveJob(vo);
//    	Long idLong = new Long(Integer.parseInt(instanceid));
//    	customerManagerEstimateService.setStatus(idLong);
	}
    
}