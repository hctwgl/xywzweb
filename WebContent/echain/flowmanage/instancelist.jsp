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
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowmanage">
<input type="hidden" name="actionType" value="instancelist">
&nbsp;运行中实例>>>
<input type="text" name="instanceid"><input type="submit" class="button" value="&nbsp;按实例号查找&nbsp;"><--实例号为空表示查询所有实例
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td width="15%">工作名称</td><td width="12%">流程名称</td><td width="12%">当前环节</td><td width="12%">当前办理人</td><td width="10%">流程状态</td><td width="10%">节点状态</td><td>操作</td>
</tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='7'>没有符合条件的实例信息</td></tr>
<%
}else{
	EVO vo;
	String wfstatus,nodestatus;
	boolean tr = true;
	String instanceid,nodeid;
	for(int i=0;i<vect.size();i++){
		vo=(EVO)vect.elementAt(i);
		instanceid=vo.getInstanceID();
		nodeid=vo.getNodeID();
	    nodestatus=vo.getNodeStatus()==null?"<font color=red><b>未知状态</b></font>":vo.getNodeStatus().equals("1")?"<font color=red><b>催办</b></font>":vo.getNodeStatus().equals("4")?"<font color=red><b>重办</b></font>":vo.getNodeStatus().equals("5")?"<font color=red><b>退回</b></font>":vo.getNodeStatus().equals("6")?"<font color=red><b>挂起</b></font>":vo.getNodeStatus().equals("7")?"<font color=red><b>打回</b></font>":vo.getNodeStatus().equals("2")?"办理结束":"正常办理";
		wfstatus=vo.getWFStatus()==null?"未知状态":vo.getWFStatus().equals("0")?"流转中":vo.getWFStatus().equals("1")?"流转结束":vo.getWFStatus().equals("2")?"<font color=red><b>挂起</b></font>":vo.getWFStatus().equals("3")?"<font color=red><b>异常中止</b></font>":vo.getWFStatus().equals("4")?"预结束":vo.getWFStatus().equals("5")?"<font color=red><b>过期</b></font>":"流转中";
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
<td><a href='<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=openform&instanceid=<%=instanceid%>&nodeid=<%=nodeid%>'><%=vo.getJobName()%></a></td>
<td><%=vo.getWFName()%></td>
<td><%=vo.getNodeName()%></td>
<td><%=vo.getCurrentNodeUser()%></td>
<td><%=wfstatus%></td>
<td><%=nodestatus%></td>
<td>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=urge&instanceid=<%=instanceid%>&nodeid=<%=nodeid%>">催办</a>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=undo&instanceid=<%=instanceid%>&nodeid=<%=nodeid%>">撤办</a>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=hang&instanceid=<%=instanceid%>&nodeid=<%=nodeid%>">挂起</a>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=aweak&instanceid=<%=instanceid%>&nodeid=<%=nodeid%>">唤醒</a>
<a href="#" onClick="window.open('<%=request.getContextPath()%>/echain/studio/eChainMonitor.jsp?instanceid=<%=instanceid%>','name','left=0,top=0,width=1024,height=768,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes');">跟踪</a>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=showInstanceDetails&instanceid=<%=instanceid%>&nodeid=<%=nodeid%>">详情</a>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=del&instanceid=<%=instanceid%>">删除</a>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=showwfvarible&instanceid=<%=instanceid%>">流程变量</a>
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
<a href="#" onclick="showhelp('运行中实例','&nbsp;&nbsp;流程管理员可以查看所有正在运行中的实例（管理员可以不参与这些实例的办理），并对这些实例进行管理干预；\n&nbsp;&nbsp;可以输入指定的实例号进行查询，不输实例号缺省查询前20条实例记录。')">关于运行中实例</a>
</form>
</body></html>
