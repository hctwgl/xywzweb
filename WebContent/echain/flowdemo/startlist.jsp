<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%@ page import="com.ecc.echain.util.WfPropertyManager" %>
<%
Vector vect = (Vector)request.getAttribute("wflist");
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
&nbsp;�ɷ���������б�>>><br>
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td>��������</td><td>���̱�ʶ</td><td>ģ������</td><td>���̹���Ա</td><td>���̴�����</td><td>����</td>
</tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='6'>û�пɷ��������</td></tr>
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
<a href="<%=request.getContextPath()%>/echain/flowmanage/showpngfile.jsp?urlpath=<%=WfPropertyManager.getInstance().echainstudiopath%>processes\flowview\<%=vo.getWFID()%>.png">�鿴����ͼ</a>&nbsp;
<a href="<%=request.getContextPath()%>/echain/flowmanage/showxmlfile.jsp?urlpath=<%=WfPropertyManager.getInstance().echainstudiopath%>processes\issue\<%=vo.getWFID()%>.xml">�鿴xml�ļ�</a>&nbsp;
<a href='<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=initflow&wfid=<%=vo.getWFID()%>'>��������</a>&nbsp;
</td>
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
<a href="#" onclick="showhelp('������','&nbsp;&nbsp;������ָ��ǰ��½�û����Է�������������б��û�����ѡ��һ������ִ�С��������̡������Է���һ���µ���������')">����������</a>
</body></html>
