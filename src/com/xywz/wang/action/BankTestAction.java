package com.xywz.wang.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.core.QueryHelper;
import com.xywztech.bob.model.LookupMapping;
import com.xywztech.bob.service.LookupMappingService;


/**
 * @author wws
 * @since 2015-09-24
 */
@ParentPackage("json-default")
@Action(value="BankTestAction", results={
    @Result(name="success", type="json"),
    @Result(name = "game",type="dispatcher", location = "/game.html")
    })
public class BankTestAction{

 @Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle; //声明数据源
 private HttpServletRequest request;
 private HttpServletResponse response;
 @Autowired
 private LookupMappingService lookupMappingService;
	
	 private Map<String, Object> JSON; //声明JSON数据
  private Long ID;  
  private String name;
  private String comment; 

 public Map<String, Object> getJSON() {
		return JSON;
	}

	public void setJSON(Map<String, Object> jSON) {
		JSON = jSON;
	}

  public Long getID() {
    return ID;
  }

  public void setID(Long iD) {
    ID = iD;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }
  
  public String game() {  
    System.out.println("----TestAction--game-------");
    return "game"; 
   }  

  public String index() {
  ActionContext ctx = ActionContext.getContext();
  request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
  String name = request.getParameter("name");
  String start = request.getParameter("start");
  String limit = request.getParameter("limit");
  String queryStr = " SELECT P.* FROM ocrm_sys_lookup P WHERE 1=1 ";
  String countStr = "select count(1) as TOTAL from("+queryStr+") SUB_QUERY";
  queryStr += "limit  "+start+","+limit+"";
		try {		       
		   Map<String, Object> qh = new QueryHelper(queryStr, dsOracle.getConnection()).getJSON();
     Connection conn = dsOracle.getConnection();
     Statement stmt = conn.createStatement();
     ResultSet rs = stmt.executeQuery(countStr);
     if(rs.next()) {
         qh.put("count", rs.getInt("TOTAL"));
             }
     rs.close();
     stmt.close();
     conn.close();
			   setJSON(qh);
		} catch (Exception e) {
			  e.printStackTrace();
		}
		
		return "success";
	}
	
	 public String detail() {
	   ActionContext ctx = ActionContext.getContext();
	   request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
	   String id = request.getParameter("id");
	   String queryStr = " SELECT P.* FROM ocrm_sys_lookup P WHERE 1=1 and f_id='"+id+"'";
	     try {          
	      Connection conn = dsOracle.getConnection();
	      Statement stmt = conn.createStatement();
	      ResultSet rs = stmt.executeQuery(queryStr);
	      Map<String, Object> json = new HashMap<String, Object>();
       JSONObject o = new JSONObject();
	      if(rs.next()) {
	          o.put("F_ID", rs.getString("F_ID"));
	          o.put("F_NAME", rs.getString("F_NAME"));
	          o.put("F_COMMENT", rs.getString("F_COMMENT"));
	              }
	      json.put("data",o);
	      rs.close();
	      stmt.close();
	      conn.close();
	      setJSON(json);
	     } catch (Exception e) {
	         e.printStackTrace();
	     } 
	     return "success";
	   }
	 
   public String save() {
     ActionContext ctx = ActionContext.getContext();
     request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
     response = (HttpServletResponse)ctx.get(ServletActionContext.HTTP_RESPONSE);
     Long fid = this.ID;
     String fname = this.name;
     String fcomment = this.comment;
     LookupMapping model = new LookupMapping();
     model.setID(fid);
     model.setName(fname);
     model.setComment(fcomment);
     lookupMappingService.save(model);
     JSONObject o = new JSONObject();
     o.put("state", 200);
     try {
       ServletOutputStream out = response.getOutputStream();
       out.print(o.toString());
       out.flush();
       out.close();
     } catch (Exception e) {
  
           }
     return "success";
     }
	
	
}
