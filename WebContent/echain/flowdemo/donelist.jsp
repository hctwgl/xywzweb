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
&nbsp;我的已办任务列表>>><br>
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td>工作名称</td><td>业务流水号</td><td>流程名称</td><td>发起人</td><td>当前环节</td><td>当前办理人</td><td>节点状态</td>
</tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='7'>没有已办任务信息</td></tr>
<%
}else{
	EVO vo;
	String nodestatus;
	boolean tr = true;
	for(int i=0;i<vect.size();i++){
		vo=(EVO)vect.elementAt(i);
	    nodestatus=vo.getNodeStatus()==null?"<font color=red><b>未知状态</b></font>":vo.getNodeStatus().equals("1")?"<font color=red><b>催办</b></font>":vo.getNodeStatus().equals("4")?"<font color=red><b>重办</b></font>":vo.getNodeStatus().equals("5")?"<font color=red><b>退回</b></font>":vo.getNodeStatus().equals("6")?"<font color=red><b>挂起</b></font>":vo.getNodeStatus().equals("7")?"<font color=red><b>打回</b></font>":vo.getNodeStatus().equals("2")?"办理结束":"正常办理";
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
<td><a href='<%=request.getContextPath()%>/echain/flowdemo/form_main.jsp?instanceid=<%=vo.getInstanceID()%>&nodeid=<%=vo.getNodeID()%>'><%=vo.getJobName()%></a></td>
<td><%=vo.getBizseqno()%></td>
<td><%=vo.getWFName()%></td>
<td><%=vo.getAuthor()%></td>
<td><%=vo.getNodeName()%></td>
<td><%=vo.getCurrentNodeUser()%></td>
<td><%=nodestatus%></td>
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
<a href="#" onclick="showhelp('已办任务','&nbsp;&nbsp;已办任务指处于审批过程中并且当前登陆用户曾经参与过业务审批办理的流程实例；\n&nbsp;&nbsp;可以输入指定的实例号进行查询，不输实例号缺省查询前20条实例记录。')">关于已办任务</a>
</body></html>
