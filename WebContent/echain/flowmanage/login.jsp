<%@ page language="java" contentType="text/html; charset=gb2312"%>
<%
String tip = (String)request.getAttribute("tip");
if(tip==null)tip="";
else
	tip="<font color=red>"+tip+"</font>";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
document.onkeydown = function(event){
	if(!event){
		event = window.event;			
	}
	if(event.keyCode==13) { 
		doSubmit();
	} 
};
//提交
function doSubmit(){
	var orgid = document.getElementById("orgid").value;
	var userid = document.getElementById("userid").value;
	var password = document.getElementById("password").value;
	if(orgid==null||orgid==""||userid==null||userid==""||password==null||password==""){
		alert("请输入完整信息");
		return;
	}
	document.forms[0].submit();
}
//选择机构
function selOrg(){
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/common/selectOrg.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:350px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	if(retObj[1] != null)
		document.getElementById("orgid").value = retObj[1];
	if(retObj[2] != null)
		document.getElementById("orgname").value = retObj[2];
		
}
</script>
<title>eChain易擎工作流平台</title>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowmanage">
<input type="hidden" name="actionType" value="login">
<input type="hidden" id="orgid" name="orgid">
<input type="hidden" id="sysid" name="sysid" value="echaindefault">
<center>
<font class=title>eChain易擎工作流引擎管理控制台</font>
<hr>
<br>
<table width="80%">
<tr><td align="right" width="40%">所属机构：</td><td align="left"><input type="text" name="orgname" value="" readonly="true">&nbsp;<a href=# onclick="selOrg()">选择</a></td></tr>
<tr><td align="right" width="40%">用户名：</td><td align="left"><input type="text" id="userid" name="userid" value=""></td></tr>
<tr><td align="right" width="40%">用户密码：</td><td align="left"><input type="password" id="password" name="password" value="">&nbsp;<input type="button" class="button" value="&nbsp;登&nbsp;录&nbsp;" onclick="doSubmit()"></td></tr>
</table>
<br>
<%=tip %>
</center>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('关于流程管理控制台','&nbsp;&nbsp;关于流程管理控制台是eChain工作流引擎产品提供的基础功能模块，用户可以登陆该管理控制台对所有正在运行的流程实例进行管理维护，也可以查看跟踪某一个审批业务的历史办理痕迹；\n&nbsp;&nbsp;请使用系统注册的真实用户（具有流程管理员角色权限）登陆该管理控制台。')">关于流程管理控制台</a>
</form>
</body>
</html>
