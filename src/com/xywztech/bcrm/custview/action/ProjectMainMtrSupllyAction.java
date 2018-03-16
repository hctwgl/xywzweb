package com.xywztech.bcrm.custview.action;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.custview.model.AcrmFCiPrMainMtrSuplly;
import com.xywztech.bcrm.custview.service.ProjectMainMtrSupllyService;
import com.xywztech.bob.common.CommonAction;

/**
 * 客户项目主要原料提供
 *
 */
@SuppressWarnings("serial")
@Action("/project_main_mtr_suplly")
public class ProjectMainMtrSupllyAction  extends CommonAction{
    @Autowired
    private ProjectMainMtrSupllyService projectMainMtrSupllyService ;
    @Autowired
	public void init(){
	  	model = new AcrmFCiPrMainMtrSuplly(); 
		setCommonService(projectMainMtrSupllyService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}

    //分页查询
    public HttpHeaders indexPage() throws Exception{
      try{	
    	StringBuilder sb=new StringBuilder("select t from AcrmFCiPrMainMtrSuplly t where 1=1 ");
    	Map<String,Object> values=new HashMap<String,Object>();
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        if(request.getParameter("start")!=null)
        	start = new Integer(request.getParameter("start")).intValue();
        if(request.getParameter("limit")!=null)
        	limit = new Integer(request.getParameter("limit")).intValue();
		this.setJson(request.getParameter("condition"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Set<String> k = this.getJson().keySet();
    	for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("projectId")){
                    sb.append(" and t.projectId = :projectId");
                    values.put("projectId", this.getJson().get(key));
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