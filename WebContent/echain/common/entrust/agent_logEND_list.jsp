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
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echaincommon">
<input type="hidden" name="actionType" value="entrust">
<input type="hidden" name="subType" value="query">
&nbsp;�ҵĹ���ί����ʷ>>><br>
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle><td width="30%">������������</td><td width="20%">ҵ����ˮ��</td><td width="20%">��������</td><td width="20%">ί�нڵ�����ʱ��</td><td width="10%">������</td></tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='5'>û�й���ί�м�¼��Ϣ</td></tr>
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
<font color=#999999>����[<%=vect==null?0:vect.size()%>]����¼��Ϣ</font>
</div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('����ί��','&nbsp;&nbsp;�û���ָ��ʱ������޷�������������ҵ�������ݼٵȣ����������ðѸ�ʱ��εĹ���ί�и������˽��а���\n&nbsp;&nbsp;����ί��ʱ��Ҫ����ָ����ί��ʱ����Լ���Ҫί�е����̣�Ҳ�����������е�����ȫ��ί�У�ί������Ϊ��Ĭ��ָ��������')">���ڹ���ί��</a>
</form>
</body></html>
