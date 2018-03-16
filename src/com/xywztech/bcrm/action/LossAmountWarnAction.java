package com.xywztech.bcrm.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.model.OcrmFWpDpoutalertParm;
import com.xywztech.bcrm.service.LossAmountWarnService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/LossAmountWarn")
public class LossAmountWarnAction  extends CommonAction{
    @Autowired
    private LossAmountWarnService lossAmountWarnService ;
    @Autowired
	public void init(){
	  	model = new OcrmFWpDpoutalertParm(); 
		setCommonService(lossAmountWarnService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}
  //（自定义）批量删除
    @Override
	public String batchDestroy(){

    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
			String jql="delete from OcrmFWpDpoutalertParm c where c.id in ("+idStr+")";
			Map<String,Object> values=new HashMap<String,Object>();
			lossAmountWarnService.batchUpdateByName(jql, values);
			addActionMessage("batch removed successfully");
	        return "success";

    }

    //分页查询
    public HttpHeaders indexPage() throws Exception{
      try{	
    	StringBuilder sb=new StringBuilder("select c from OcrmFWpDpoutalertParm c where 1=1 ");
    	Map<String,Object> values=new HashMap<String,Object>();
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        if(request.getParameter("start")!=null)
        	start = new Integer(request.getParameter("start")).intValue();
        if(request.getParameter("limit")!=null)
        	limit = new Integer(request.getParameter("limit")).intValue();
		this.setJson(request.getParameter("condition"));
    	for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("transTimes")){
                    sb.append(" and c.transTimes like :transTimes");
                    values.put("transTimes", "%"+(String)this.getJson().get(key)+"%");
                }else  if(key.equals("alertLevel")){
                    sb.append(" and c.alertLevel like :alertLevel");
                    values.put("alertLevel", "%"+(String)this.getJson().get(key)+"%");
                }
                else if(key.equals("id")){
                    sb.append(" and c.id = :id");
                    values.put("id", Long.parseLong((String) this.getJson().get(key)));
                } 
                else{
                	sb.append(" and c."+key+" = :"+key);
                	values.put(key, this.getJson().get(key));
                	
                }
            }
        }
    	return super.indexPageByJql(sb.toString(), values);
      }catch(Exception e){
    	  e.printStackTrace();
    	  throw e;
      }
	}
    
}