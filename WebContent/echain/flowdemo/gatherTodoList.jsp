<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%
Vector vect = (Vector)request.getAttribute("worklist");
%>

<%@page import="com.ecc.echain.workflow.model.GatherVO"%><html>
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
&nbsp;我的待办任务列表>>><br>
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td>会办主题</td><td>业务流水号</td><td>会办发起人</td><td>会办参与人</td><td>会办汇总人</td>
</tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='8'>没有待办信息</td></tr>
<%
}else{
	GatherVO vo;
	String nodestatus;
	boolean tr = true;
	for(int i=0;i<vect.size();i++){
		vo=(GatherVO)vect.elementAt(i);
	    
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
<td><a href="<%=request.getContextPath()%>/echain/flowdemo/form_main.jsp?instanceid=<%=vo.getInstanceID()%>&flag=gather&mainNodeID=<%=vo.getMainNodeID() %>&mainInstandeID=<%=vo.getMainInstanceID() %>"><%=vo.getGatherTitle() %></a></td>
<td><%=vo.getBizSeqNo()==null?"":vo.getBizSeqNo()%></td>
<td><%=vo.getGatherStartUserName()%></td>
<td><%=vo.getAllProcessorName()%></td>
<td><%=vo.getGatherEndUserName()%></td>
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
<a href="#" onclick="showhelp('待办任务','&nbsp;&nbsp;待办任务指当前登陆用户需要办理的任务，包括单人办理任务、多人办理任务、审批协助任务以及会签会办等任务；\n&nbsp;&nbsp;可以输入指定的实例号进行查询，不输实例号缺省查询前20条实例记录。')">关于待办任务</a>
</body></html>
