<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.ext.TaskPool" %>
<%
String sysid=(String)request.getSession().getAttribute("s_sysid");
%>
<html>
<head>
<title>eChain���̹���</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
//�ύ
function doSubmit(){
	var tpid = document.getElementById("tpid").value;
	var tpname = document.getElementById("tpname").value;
	if(tpid==null||tpid==""||tpname==null||tpname==""){
		alert("������������Ϣ");
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
<fieldset style="background-color:#fafafa;"><legend>���������</legend>
<br>
<table width="80%">
<tr><td width="40%" align="right">�����ID��</td>
<td><input type="text" id="tpid" name="tpid" value="" size="30"></td></tr>
<tr><td width="40%" align="right">��������ƣ�</td>
<td><input type="text" id="tpname" name="tpname" value="" size="30"></td></tr>
<tr><td width="40%" align="right">�����������</td>
<td><textarea id="tpdsc" name="tpdsc"  rows="3" cols="60" ></textarea></td></tr>
<tr><td width="40%" align="right">��ϵͳID��</td>
<td><input type="text" id="sysid" name="sysid" value="<%=sysid %>" size="30"></td></tr>
</table>
<br>
</fieldset>
<br>
<div align="center">	
<input type="button" class="button" value="&nbsp;��&nbsp;��&nbsp;" onclick="doSubmit()">	
<input type="reset" class="button" value="&nbsp;��&nbsp;��&nbsp;">	
</div>	  
</form>
</body></html>
