<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="org.springframework.security.web.WebAttributes"%>

<%
	String currentTime = ""+System.currentTimeMillis();
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>XXXX管理系统</title>
<link rel="stylesheet" type="text/css" href="contents/css/login_blue.css"/>
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/commonjs/controlCookie.js"></script>
<script>
	window.document.onkeydown = function(e){
		e = !e ? window.event : e;
		var key = window.event ? e.keyCode:e.which;
		if(13==key){//监视是否按下'Enter'键
			  setFromValue();
		  }
	}
	 
	var currentTime = <%=currentTime %>;
	function setTarget(){
		var target = 'chat<%=currentTime %>';
		document.getElementById('formLogin').target=target;
		//closeWindow();
	}
		
	
	//
    function check(){  
        if(document.getElementById("username").value.length==0)
        {
            alert("用户名为空，请输入");
            document.getElementById("username").focus();
            document.getElementById('submitBtn').disabled=false;
            return false;
        }
        for (var i = 0; i < document.getElementById("username").value.length; i++) {
        	   var asc = document.getElementById("username").value.charCodeAt(i);
        	   if(asc=='39'){
        		   alert("用户名包含非法字符，请重新输入");
        		   document.getElementById("username").focus();
                   document.getElementById('submitBtn').disabled=false;
        		   return false;
            	   }
            }
        if(document.getElementById("password").value.length==0)
        {
            alert("密码为空，请输入");
            document.getElementById("password").focus();
            document.getElementById('submitBtn').disabled=false;
            return false;
        }
        return true;
    }
	
	function setFromValue(){
		document.getElementById('submitBtn').disabled=true;
		document.getElementById('j_username').value = document.getElementById("username").value;
		document.getElementById('j_password').value = document.getElementById("password").value;
	    var tempValue = document.getElementById("username").value;
	    setCookie("CRM_USER_ID1","",30);
	    setCookie("CRM_USER_ID1",tempValue,30);
		document.getElementById('submit').click();
	}
	//从Cookie获取用户登录ID
	function getUserId(){
		var userid = getCookie("CRM_USER_ID1");
		if (userid!=null&&userid!=""){
			document.getElementById("username").value=userid;
			document.getElementById("password").focus();
		}else
			document.getElementById("username").focus();
	}
	
	function showErrorMsg() {
		document.getElementById('submitBtn').disabled=false;
	    var msg = document.getElementById("errorMsg").value;
	    //closeWindow();
	    if (msg != '' && msg != 'undefined') {
	    	 alert(msg);
	    	 document.getElementById('errorMsg').value = '';
	    	 document.getElementById("password").focus();
	    }				
	}

	function closeWindow() {
		if(window.opener != null){ 
			 window.focus(); 
			 window.opener.windowClose(); 
			 window.opener = null; 
  	 	}
	}

</script>
</head>

<body style="overflow:hidden;" scroll="no" onload="getUserId();showErrorMsg();" >
<div class="login_logo123"> </div>
<div class="login_bg">
  <div class="login_body clearfix">
    <div class="login_form">
      <!--登录左侧内容开始-->
      <div class="login_form_left">
      <div class="login_p">
        <!-- <div class="login_pt login_name">用户名：</div>-->
        <div class="login_pt login_name"></div>
        <div class="login_inner">
          <div class="login_input">
            <input type="text" name="userName" id="username"/>  
          </div>
        </div>
      </div>
      <div class="login_p">
      <!-- <div class="login_pt login_name">密码：</div>-->
        <div class="login_pt login_password"></div>
        <div class="login_inner">
          <div class="login_input">
            <input type="password" name="" id="password"/>
          </div>
        </div>
      </div>
      </div>
      <!--登录左侧内容结束-->
      <!--登录右侧内容开始-->
      <div class="login_form_right">
      	<div class="login_oper">
        	<div class="login_bt"><a href="#" id="submitBtn" onclick="setFromValue();"></a></div>
        </div>
      </div>
       <!--登录右侧内容结束-->
    </div>
  </div>  

</div>
<form id="formLogin" action="<%=request.getContextPath()%>/j_spring_security_check" method="post">
		<input type="hidden" value="" id="j_username" name="j_username"/>
		<input type="hidden" value="" id="j_password" name="j_password"/>
		<input type="submit" class="button" id="submit" value="登录" style="visibility:hidden;" onclick="if(!check()) return false; " />
		<%
          if (session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION) != null) {
        %> 
		     <input type="hidden" id="errorMsg" name="errorMsg" value='${sessionScope.SPRING_SECURITY_LAST_EXCEPTION.message}' />
		<%
        	} else {
		%>
			<input type="hidden" id="errorMsg" name="errorMsg" value='' />
		<%
        	} 
		%>
						
</form>

</body>
</html>
