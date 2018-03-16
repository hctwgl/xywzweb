package com.xywztech.bcrm.action;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.model.OcrmFMmMaterialDesc;
import com.xywztech.bcrm.service.MktMaterialManageService;
import com.xywztech.bob.common.CommonAction;


@SuppressWarnings("serial")
@Action("mktMaterialManage-info")
public class MktMaterialManageAction  extends CommonAction{
    @Autowired
    private MktMaterialManageService mktMaterialManageService ;
    @Autowired
	public void init(){
	  	model = new OcrmFMmMaterialDesc(); 
		setCommonService(mktMaterialManageService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}

    //分页查询
    public HttpHeaders indexPage() throws Exception{
      try{	
    	StringBuilder sb=new StringBuilder("select c from OcrmFMmMaterialDesc c where 1=1 ");
    	Map<String,Object> values=new HashMap<String,Object>();
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        if(request.getParameter("start")!=null)
        	start = new Integer(request.getParameter("start")).intValue();
        if(request.getParameter("limit")!=null)
        	limit = new Integer(request.getParameter("limit")).intValue();
		this.setJson(request.getParameter("condition"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("mktMaterialName")){
                    sb.append("and c.mktMaterialName like :mktMaterialName");
                    values.put("mktMaterialName", "%"+(String)this.getJson().get(key)+"%");
                }
                else if(key.equals("mktMaterialId")){
                    sb.append("and c.mktMaterialId = :mktMaterialId");
                    values.put("mktMaterialId", Long.parseLong((String)this.getJson().get(key)));
                }
                else if(key.equals("createDate")){
                    sb.append(" and c.createDate >= :createDate" );                 
                    values.put("createDate", sdf.parse((String)this.getJson().get(key)));
                }
                else if(key.equals("latelyUpdateDate")){
                    sb.append(" and c.latelyUpdateDate >= :latelyUpdateDate" );                 
                    values.put("latelyUpdateDate", sdf.parse((String)this.getJson().get(key)));
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
    //自定义查询
    public HttpHeaders query() throws Exception{
      try{	
    	StringBuilder sb=new StringBuilder("select c from OcrmFMmMaterialDesc c where 1=1 and c.mktMaterialStat = '1' ");
    	Map<String,Object> values=new HashMap<String,Object>();
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        //获取查询条件，查询条件用condition封装
        this.setJson(request.getParameter("condition"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("mktMaterialName")){
                    sb.append("and c.mktMaterialName like :mktMaterialName");
                    values.put("mktMaterialName", "%"+(String)this.getJson().get(key)+"%");
                }
                else{
                	sb.append(" and c."+key+" = :"+key);
                	values.put(key, this.getJson().get(key));
                	
                }
            }
        }
    	return super.indexByJql(sb.toString(), values);
      }catch(Exception e){
    	  e.printStackTrace();
    	  throw e;
      }
	}
    
}