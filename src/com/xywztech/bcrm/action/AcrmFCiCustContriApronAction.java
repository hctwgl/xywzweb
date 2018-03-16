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
import com.xywztech.bcrm.model.AcrmFCiCustContriApron;
import com.xywztech.bcrm.service.AcrmFCiCustContriApronService;
import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@Action("/AcrmFCiCustContriApron")
public class AcrmFCiCustContriApronAction  extends CommonAction{
    @Autowired
    private AcrmFCiCustContriApronService acrmFCiCustContriApronService ;
    @Autowired
	public void init(){
	  	model = new AcrmFCiCustContriApron(); 
		setCommonService(acrmFCiCustContriApronService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}
  //（自定义）批量删除
    @Override
	public String batchDestroy(){
    	try{
    	   	ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
			String idStr = request.getParameter("idStr");
			String jql="delete from AcrmFCiCustContriApron c where c.id in ("+idStr+")";
			Map<String,Object> values=new HashMap<String,Object>();
			acrmFCiCustContriApronService.batchUpdateByName(jql, values);
			addActionMessage("batch removed successfully");
	        return "success";
    	}catch(Exception e){
    		e.printStackTrace();
    		return "failure";
    	}
    }

    //分页查询
    public HttpHeaders indexPage()  throws Exception{
      try{	
    	StringBuilder sb=new StringBuilder("select c from AcrmFCiCustContriApron c where 1=1 ");
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
                if(key.equals("accTyp")){
                    sb.append(" and c.accTyp like :accTyp");
                    values.put("accTyp", "%"+(String)this.getJson().get(key)+"%");
                }else if(key.equals("timeLimit")){
                	sb.append(" and c.timeLimit like :timeLimit");
                	values.put("timeLimit", this.getJson().get(key));
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