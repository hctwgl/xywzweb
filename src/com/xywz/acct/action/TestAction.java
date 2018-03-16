package com.xywz.acct.action;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Action;  
import org.apache.struts2.convention.annotation.Result;  

import com.opensymphony.xwork2.ActionSupport;  

  
/** 
 * 使用注解来配置Action 
 *  
 */  

@Action(value = "TestAction", results = {
		@Result(name = "mysuccess",type="dispatcher", location = "/index.jsp"),
		@Result(name="error",location="/error.jsp")
}) 
public class TestAction extends ActionSupport{  

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String loginname;  
    private String pwd;  
    //Get请求返回对象
    protected Map<String, Object> json ; 
    
   public String login() {  
    	System.out.println("----TestAction--login-------");
    	return "mysuccess"; 
    }  
  
 
  public String add() throws Exception { 
    	System.out.println("----TestAction--add-------");
    this.setLoginname("wws");
    Map<String, Object> json = new HashMap<String, Object>();
    json.put("state", 200);
    JSONObject o = new JSONObject();
    o.put("name", "wws");
    o.put("age", 88);
    json.put("data", o);
    this.setJson(json);
    	return "error";   
    }  
  
    public String getLoginname() {  
        return loginname;  
    }  
  
    public void setLoginname(String loginname) {  
        this.loginname = loginname;  
    }  
  
    public String getPwd() {  
        return pwd;  
    }  
  
    public void setPwd(String pwd) {  
        this.pwd = pwd;  
    }
 
    public Map<String, Object> getJson() { 
      return json;
    } 
    
    public void setJson(Map<String, Object> json) {
          this.json = json;
      }
  
}
