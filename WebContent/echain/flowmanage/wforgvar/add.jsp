<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<html>
<head>
<title>eChain流程管理</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
//提交
function doSubmit(){
	var orgid = document.getElementById("orgid").value;
	var varid = document.getElementById("varid").value;
	var varvalue = document.getElementById("varvalue").value;
	if(orgid==null||orgid==""||varid==null||varid==""||varvalue==null||varvalue==""){
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
//选择流程常量
function selWFVar(){
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/flowmanage/wfvar/selectWFVar.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:350px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	if(retObj[1] != null)
		document.getElementById("varid").value = retObj[1];
	if(retObj[2] != null)
		document.getElementById("varname").value = retObj[2];		
}
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowmanage">
<input type="hidden" name="actionType" value="wforgvar">
<input type="hidden" name="subType" value="add">
<input type="hidden" id="orgid" name="orgid">
<input type="hidden" id="varid" name="varid">
<fieldset style="background-color:#fafafa;"><legend>机构流程常量设置</legend>
<br>
<table width="80%">
<tr><td width="40%" align="right">所属机构</td>
<td><input type="text" id="orgname" name="orgname" value="" readonly="true" size="30">&nbsp;<a href=# onclick="selOrg()">选择</a></td></tr>
<tr><td width="40%" align="right">流程常量</td>
<td><input type="text" id="varname" name="varname" value="" readonly="true" size="30">&nbsp;<a href=# onclick="selWFVar()">选择</a></td></tr>
<tr><td width="40%" align="right">常量值</td>
<td><textarea id="varvalue" name="varvalue"  rows="3" cols="60" ></textarea></td></tr>
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
