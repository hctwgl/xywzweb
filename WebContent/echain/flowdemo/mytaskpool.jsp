<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%
Vector vect = (Vector)request.getAttribute("worklist");
%>
<html>
<head>
<title>eChain������ʾ</title>
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
&nbsp;�ҵ������>>><br>
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td>�����ID</td><td>���������</td><td>���������</td><td>����</td>
</tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='4'>û���������Ϣ</td></tr>
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
<td><a href='<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=tp_todo&tpid=<%=tpid%>'>[�鿴������������б�]</a></td>
</tr>
<%
		tr=!tr;
	}
}
%>
</table>
<table><tr><td height="3px"></td></tr></table>
<div align="right"><font color=#999999>����[<%=vect==null?0:vect.size()%>]����Ϣ</font></div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('�ҵ������','&nbsp;&nbsp;�ҵ������ָ��ǰ��½�û�������������أ��û����Դ��������������Ҫ����������������������û��Ĵ������ˡ�')">�����ҵ������</a>
</body></html>
