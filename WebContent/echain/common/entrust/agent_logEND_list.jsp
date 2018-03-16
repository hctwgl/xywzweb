<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.ext.Entrust" %>
<%
String orgid=(String)request.getSession().getAttribute("s_orgid");
String userid=(String)request.getSession().getAttribute("s_userid");
Vector vect=new Entrust().queryAgentLogEND(userid);
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
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echaincommon">
<input type="hidden" name="actionType" value="entrust">
<input type="hidden" name="subType" value="query">
&nbsp;我的工作委托历史>>><br>
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle><td width="30%">工作任务名称</td><td width="20%">业务流水号</td><td width="20%">流程名称</td><td width="20%">委托节点受理时间</td><td width="10%">代办人</td></tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='5'>没有工作委托记录信息</td></tr>
<%
}else{
	Vector vecRow;
	boolean tr = true;
	String instanceid;
	for (int i=0;i<vect.size();i++) {
		vecRow = (Vector) vect.elementAt(i);
		instanceid=(String)vecRow.elementAt(0);
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
<td><a href='<%=request.getContextPath()%>/echain/flowdemo/form_main.jsp?instanceid=<%=instanceid%>'><%=(String)vecRow.elementAt(1)%></a></td>
<td><%=(String)vecRow.elementAt(2)%></td>
<td><%=(String)vecRow.elementAt(3)%></td>
<td><%=(String)vecRow.elementAt(4)%></td>
<td><%=(String)vecRow.elementAt(5)%></td>
</tr>
<%
		tr=!tr;
	}
}
%>
</table>
<table><tr><td height="3px"></td></tr></table>
<div align="right">
<font color=#999999>共计[<%=vect==null?0:vect.size()%>]条记录信息</font>
</div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('工作委托','&nbsp;&nbsp;用户在指定时间段内无法在线审批办理业务（如出差、休假等），可以设置把该时间段的工作委托给代办人进行办理；\n&nbsp;&nbsp;工作委托时需要设置指定的委托时间段以及需要委托的流程，也可以设置所有的流程全部委托（委托类型为“默认指定”）。')">关于工作委托</a>
</form>
</body></html>
