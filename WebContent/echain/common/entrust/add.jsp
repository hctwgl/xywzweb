<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.ext.Entrust" %>
<%
String orgid=(String)request.getSession().getAttribute("s_orgid");
String userid=(String)request.getSession().getAttribute("s_userid");
String username=(String)request.getSession().getAttribute("s_username");
%>
<html>
<head>
<script type="text/javascript" src="<%=request.getContextPath() %>/echain/common/calendar.js"></script>
<title>eChain流程管理</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
//提交
function doSubmit(){
	var Vicar = document.getElementById("Vicar").value;
	var BeginTime = document.getElementById("BeginTime").value;
	var EndTime = document.getElementById("EndTime").value;
	if(BeginTime==null||BeginTime==""||EndTime==null||EndTime==""||Vicar==null||Vicar==""){
		alert("请输入完整信息");
		return;
	}
	document.forms[0].submit();
}
//选择业务品种
function selApp(){
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/common/selectApp.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:350px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	if(retObj[1] != null)
		document.getElementById("AppID").value = retObj[1];
	if(retObj[2] != null)
		document.getElementById("AppName").value = retObj[2];
		
}
//选择用户
function selUser(){
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/common/selectUser.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:430px;dialogWidth:610px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	if(retObj[1] != null)
		document.getElementById("Vicar").value = retObj[1];
	if(retObj[2] != null)
		document.getElementById("VicarName").value = retObj[2];
}

function change(){
	var attribute= document.getElementsByName('vType');
	if(attribute[0].checked){
		document.getElementById("VicariousType").value="0";
		document.getElementById("app_div").style.display="none";
		document.getElementById("app_div2").style.display="none";
	}else{
		document.getElementById("VicariousType").value="1";
		document.getElementById("app_div").style.display="";
		document.getElementById("app_div2").style.display="";
	}
}
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echaincommon">
<input type="hidden" name="actionType" value="entrust">
<input type="hidden" name="subType" value="add">
<input type="hidden" id="orgid" name="orgid" value="<%=orgid%>">
<input type="hidden" id="UserID" name="UserID" value="<%=userid%>">
<input type="hidden" id="AppID" name="AppID">
<input type="hidden" id="Vicar" name="Vicar">
<input type="hidden" id="VicariousType" name="VicariousType" value="0">
<fieldset style="background-color:#fafafa;"><legend>工作委托设置</legend>
<br>
<table width="80%">
<tr><td width="40%" align="right">委托人：</td>
<td><input type="text" id="UserName" name="UserName" value="<%=username%>" readonly="true" size="30"></td></tr>
<tr><td width="40%" align="right">被委托人：</td>
<td><input type="text" id="VicarName" name="VicarName" value="" readonly="true" size="30">&nbsp;<a href=# onclick="selUser()">选择</a></td></tr>
<tr><td width="40%" align="right">委托类型：</td>
<td>
<input type="radio" name="vType" value="0" checked=true onclick="change()">默认指定
<input type="radio" name="vType" value="1" onclick="change()">特殊指定
</td></tr>

<tr><td width="40%" align="right"><div id="app_div" style="display:none">应用分类：</div></td>
<td><div id="app_div2" style="display:none"><input type="text" id="AppName" name="AppName" value="" readonly="true" size="30">&nbsp;<a href=# onclick="selApp()">选择</a></div></td></tr>

<tr><td width="40%" align="right">起止时间：</td>
<td><input type="text" id="BeginTime" name="BeginTime" onFocus="calendar(false)" value="" size="13">--<input type="text" id="EndTime" name="EndTime" onFocus="calendar(false)" value="" size="13"></td></tr>
</table>
<br>
</fieldset>
<br>
<div align="center">	
<input type="button" class="button" value="&nbsp;提&nbsp;交&nbsp;" onclick="doSubmit()">	
<input type="reset" class="button" value="&nbsp;重&nbsp;置&nbsp;">	
</div>	  
</form>
</body></html>
