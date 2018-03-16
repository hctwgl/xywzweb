<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%
Vector vect = (Vector)request.getAttribute("worklist");
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
&nbsp;我的任务池>>><br>
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td>任务池ID</td><td>任务池名称</td><td>任务池描述</td><td>操作</td>
</tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='4'>没有任务池信息</td></tr>
<%
}else{
	Vector vecRow;
	boolean tr = true;
	String tpid,tpname,tpdsc;
	for(int i=0;i<vect.size();i++){
		vecRow=(Vector)vect.elementAt(i);
		tpid=(String)vecRow.elementAt(0);
		tpname=(String)vecRow.elementAt(1);
		tpdsc=(String)vecRow.elementAt(2);
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
<td><%=tpid%></td>
<td><%=tpname%></td>
<td><%=tpdsc%></td>
<td><a href='<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=tp_todo&tpid=<%=tpid%>'>[查看任务池中任务列表]</a></td>
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
<a href="#" onclick="showhelp('我的任务池','&nbsp;&nbsp;我的任务池指当前登陆用户所关连的任务池，用户可以从任务池中认领需要办理的任务，任务认领后进入用户的待办事宜。')">关于我的任务池</a>
</body></html>
