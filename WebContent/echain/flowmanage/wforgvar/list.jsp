<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%
List list = (List)request.getAttribute("list");
%>
<html>
<head>
<title>eChain流程管理</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script>
var originClassName;
function invertmenu(){
	if (event.srcElement.tagName == 'TD'){
		originClassName=event.srcElement.parentElement.className;
		event.srcElement.parentElement.className = 'trclass3';
	}
	else{
		originClassName=event.srcElement.parentElement.parentElement.className;
		event.srcElement.parentElement.parentElement.className = 'trclass3';
	}
}
function resumemenu(){
	if (event.srcElement.tagName == 'TD')
		event.srcElement.parentElement.className=originClassName;
	else
		event.srcElement.parentElement.parentElement.className =originClassName;
}
function del(orgid,varid){
	if(confirm("您确定删除此机构流程常量设置信息吗？该操作将无法复原！"))
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=wforgvar&subType=del&orgid="+orgid+"&varid="+varid;
}
function empty(){
	document.getElementById("orgid").value="";
	document.getElementById("varid").value="";
}
function add(){
	window.location.href="<%=request.getContextPath()%>/echain/flowmanage/wforgvar/add.jsp";
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
		
}
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowmanage">
<input type="hidden" name="actionType" value="wforgvar">
<input type="hidden" name="subType" value="query">
<fieldset style="background-color:#fafafa;"><legend>机构流程常量查询</legend>
<table width="60%" align="center"><tr>
<td>机构号：
<input type="text" id="orgid" name="orgid" width="50%" readonly="true">&nbsp;<a href=# onclick="selOrg()">选择</a></td>
<td>常量ID：
<input type="text" id="varid" name="varid" readonly="true">&nbsp;<a href=# onclick="selWFVar()">选择</a></td></tr>
</table><br>
<center>
<input type="submit" class="button" value="&nbsp;查&nbsp;询&nbsp;">
<input type="button" class="button" value="&nbsp;重&nbsp;置&nbsp;" onclick="empty()">	
</center>
<table><tr><td height="3px"></td></tr></table>
</fieldset>
<table><tr><td height="3px"></td></tr></table>
<input type="button" name="submit12" value="&nbsp;新&nbsp;增&nbsp;"  class="button" onclick="add()">
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle><td width="15%">机构号</td><td width="20%">机构名称</td><td width="15%">常量ID</td><td width="20%">常量名称</td><td width="20%">常量值</td><td width="10%">操作</td></tr>
<%
if(list==null||list.isEmpty()){
%>
<tr class=trclass><td colspan='6'>没有机构常量配置信息</td></tr>
<%
}else{
	EVO vo;
	boolean tr = true;
	for(int i=0;i<list.size();i++){
		vo=(EVO)list.get(i);
	    if(tr){
%>
<tr class=trclass onmouseout='resumemenu()' onmouseover='invertmenu()'>
<%
		}else{
%>
<tr class=trclass2 onmouseout='resumemenu()' onmouseover='invertmenu()'>
<%
		}
%>
<td><%=vo.getOrgid()%></td>
<td><%=vo.getOrgname()%></td>
<td><%=vo.getFieldID()%></td>
<td><%=vo.getFieldName()%></td>
<td><%=vo.getFieldContent()%></td>
<td align="center">
<a href=# onclick="del('<%=vo.getOrgid()%>','<%=vo.getFieldID()%>')">删除</a>
</td>
</tr>
<%
		tr=!tr;
	}
}
%>
</table>
<table><tr><td height="3px"></td></tr></table>
<div align="right">
<font color=#999999>共计[<%=list==null?0:list.size()%>]条配置信息</font>
</div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('什么是流程常量？','&nbsp;&nbsp;流程常量指在流程运行脚本中使用的通配符，如\${授信额度}。')">什么是流程常量？</a>
</form>
</body></html>
