<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%@ page import="com.ecc.echain.util.WfPropertyManager" %>
<%
Vector vect = (Vector)request.getAttribute("wflist");
%>
<html>
<head>
<title>eChain流程演示</title>
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
</script>
</head>
<body>
&nbsp;可发起的流程列表>>><br>
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td>流程名称</td><td>流程标识</td><td>模块名称</td><td>流程管理员</td><td>流程创建人</td><td>操作</td>
</tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='6'>没有可发起的流程</td></tr>
<%
}else{
	EVO vo;
	boolean tr = true;
	for(int i=0;i<vect.size();i++){
		vo=(EVO)vect.elementAt(i);
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
<td><%=vo.getWFName()%></td>
<td><%=vo.getWFSign()%></td>
<td><%=vo.getAppName()%></td>
<td><%=vo.getWFAdmin()%></td>
<td><%=vo.getAuthor()%></td>
<td align="center">
<a href="<%=request.getContextPath()%>/echain/flowmanage/showpngfile.jsp?urlpath=<%=WfPropertyManager.getInstance().echainstudiopath%>processes\flowview\<%=vo.getWFID()%>.png">查看流程图</a>&nbsp;
<a href="<%=request.getContextPath()%>/echain/flowmanage/showxmlfile.jsp?urlpath=<%=WfPropertyManager.getInstance().echainstudiopath%>processes\issue\<%=vo.getWFID()%>.xml">查看xml文件</a>&nbsp;
<a href='<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=initflow&wfid=<%=vo.getWFID()%>'>发起流程</a>&nbsp;
</td>
</tr>
<%
		tr=!tr;
	}
}
%>
</table>
<table><tr><td height="3px"></td></tr></table>
<div align="right"><font color=#999999>共计[<%=vect==null?0:vect.size()%>]条信息</font></div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('任务发起','&nbsp;&nbsp;任务发起指当前登陆用户可以发起的所有流程列表，用户可以选择一个流程执行【发起流程】动作以发起一个新的审批任务；')">关于任务发起</a>
</body></html>
