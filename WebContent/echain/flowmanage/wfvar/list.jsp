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
<title>eChain���̹���</title>
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
	if(confirm("��ȷ��ɾ�������̳��������𣿸ò������޷���ԭ��"))
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=wfvar&subType=del&varid="+varid;
}
function add(){
	window.location.href="<%=request.getContextPath()%>/echain/flowmanage/wfvar/add.jsp";
}
</script>
</head>
<body>
<form>
&nbsp;���̳�������>>><br>
<table><tr><td height="3px"></td></tr></table>
<input type="button" name="submit12" value="&nbsp;��&nbsp;��&nbsp;"  class="button" onclick="add()">
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle><td width="20%">����ID</td><td width="25%">��������</td><td width="25%">��������</td><td width="20%">����ֵ</td><td width="10%">����</td></tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='5'>û�����̳���������Ϣ</td></tr>
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
<a href=# onclick="del('<%=(String)vecRow.elementAt(0)%>')">ɾ��</a>
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
<font color=#999999>����[<%=vect==null?0:vect.size()%>]��������Ϣ</font>
</div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('ʲô�����̳�����','&nbsp;&nbsp;���̳���ָ���������нű���ʹ�õ�ͨ�������\${���Ŷ��}��')">ʲô�����̳�����</a>
</form>
</body></html>
