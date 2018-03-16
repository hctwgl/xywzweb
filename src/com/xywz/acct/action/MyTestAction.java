package com.xywz.acct.action;

import org.apache.struts2.convention.annotation.Action;  
import org.apache.struts2.convention.annotation.Result;  

import com.opensymphony.xwork2.ActionSupport;  
import com.xywztech.bob.action.MyCommonAction;

  
/** 
 * 使用注解来配置Action 
 *  
 */  

@Action(value = "MyTestAction", results = {
		@Result(name = "mysuccess",type="dispatcher", location = "/index.html"),
		@Result(name = "game",type="dispatcher", location = "/game.html"),
		@Result(name="error",location="/error.html")
}) 
public class MyTestAction extends MyCommonAction{  

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String loginname;  
  private String pwd;  
  
    
   public String login() {  
    	System.out.println("----TestAction--login-------");
    	System.out.println("----TestAction--loginname-------"+loginname);
    	System.out.println("----TestAction--pwd-------"+pwd);
    	this.set("aaa", 123);
    	this.set("loginname", 333);
    	this.set("pwd", 444);
    	return "mysuccess"; 
    }  
   
   public String game() {  
   	System.out.println("----TestAction--game-------");
   	return "game"; 
   }  
  
 
    public String add() throws Exception { 
    	System.out.println("----TestAction--add-------");
    	System.out.println("----TestAction--loginname-------"+loginname);
    	System.out.println("----TestAction--pwd-------"+pwd);
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
 
  
}
