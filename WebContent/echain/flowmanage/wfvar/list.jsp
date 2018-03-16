<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.ext.WFVar" %>
<%
String orgid=(String)request.getSession().getAttribute("s_orgid");
String userid=(String)request.getSession().getAttribute("s_userid");
Vector vect=WFVar.getInstance().query(null);
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
function del(varid){
	if(confirm("您确定删除此流程常量设置吗？该操作将无法复原！"))
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=wfvar&subType=del&varid="+varid;
}
function add(){
	window.location.href="<%=request.getContextPath()%>/echain/flowmanage/wfvar/add.jsp";
}
</script>
</head>
<body>
<form>
&nbsp;流程常量定义>>><br>
<table><tr><td height="3px"></td></tr></table>
<input type="button" name="submit12" value="&nbsp;新&nbsp;增&nbsp;"  class="button" onclick="add()">
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle><td width="20%">常量ID</td><td width="25%">常量名称</td><td width="25%">常量描述</td><td width="20%">常量值</td><td width="10%">操作</td></tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='5'>没有流程常量设置信息</td></tr>
<%
}else{
	Vector vecRow;
	boolean tr = true;
	for (int i=0;i<vect.size();i++) {
		vecRow = (Vector) vect.elementAt(i);
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
<td><%=(String)vecRow.elementAt(0)%></td>
<td><%=(String)vecRow.elementAt(1)%></td>
<td><%=(vecRow.elementAt(2)==null?"-":(String)vecRow.elementAt(2))%></td>
<td><%=(String)vecRow.elementAt(3)%></td>
<td align="center">
<a href=# onclick="del('<%=(String)vecRow.elementAt(0)%>')">删除</a>
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
<font color=#999999>共计[<%=vect==null?0:vect.size()%>]条配置信息</font>
</div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('什么是流程常量？','&nbsp;&nbsp;流程常量指在流程运行脚本中使用的通配符，如\${授信额度}。')">什么是流程常量？</a>
</form>
</body></html>
