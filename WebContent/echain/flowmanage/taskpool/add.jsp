<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.ext.TaskPool" %>
<%
String sysid=(String)request.getSession().getAttribute("s_sysid");
%>
<html>
<head>
<title>eChain流程管理</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
//提交
function doSubmit(){
	var tpid = document.getElementById("tpid").value;
	var tpname = document.getElementById("tpname").value;
	if(tpid==null||tpid==""||tpname==null||tpname==""){
		alert("请输入完整信息");
		return;
	}
	document.forms[0].submit();
}

</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowmanage">
<input type="hidden" name="actionType" value="taskpool">
<input type="hidden" name="subType" value="add">
<fieldset style="background-color:#fafafa;"><legend>任务池设置</legend>
<br>
<table width="80%">
<tr><td width="40%" align="right">任务池ID：</td>
<td><input type="text" id="tpid" name="tpid" value="" size="30"></td></tr>
<tr><td width="40%" align="right">任务池名称：</td>
<td><input type="text" id="tpname" name="tpname" value="" size="30"></td></tr>
<tr><td width="40%" align="right">任务池描述：</td>
<td><textarea id="tpdsc" name="tpdsc"  rows="3" cols="60" ></textarea></td></tr>
<tr><td width="40%" align="right">子系统ID：</td>
<td><input type="text" id="sysid" name="sysid" value="<%=sysid %>" size="30"></td></tr>
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
