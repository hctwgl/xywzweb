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
&nbsp;�ҵĴ�ǩ�������б�>>><br>
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td>��������</td><td>ҵ����ˮ��</td><td>��������</td><td>������</td><td>��ǰ����</td><td>��һ������</td><td>�ڵ�״̬</td><td>����ʱ��</td>
</tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='8'>û�д�ǩ����Ϣ</td></tr>
<%
}else{
	EVO vo;
	String nodestatus;
	boolean tr = true;
	for(int i=0;i<vect.size();i++){
		vo=(EVO)vect.elementAt(i);
	    nodestatus=vo.getNodeStatus()==null?"<font color=red><b>δ֪״̬</b></font>":vo.getNodeStatus().equals("1")?"<font color=red><b>�߰�</b></font>":vo.getNodeStatus().equals("4")?"<font color=red><b>�ذ�</b></font>":vo.getNodeStatus().equals("5")?"<font color=red><b>�˻�</b></font>":vo.getNodeStatus().equals("6")?"<font color=red><b>����</b></font>":vo.getNodeStatus().equals("7")?"<font color=red><b>���</b></font>":vo.getNodeStatus().equals("2")?"�������":"��������";
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
<td><%=vo.getPreUser()%></td>
<td><%=nodestatus%></td>
<td><%=vo.getNodePlanEndTime()%></td>
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
<a href="#" onclick="showhelp('��ǩ������','&nbsp;&nbsp;��ǩ������ָ���ڵ�ǰ��½�û���ǩ�ն����е����������û�ִ��ǩ�ն����󣬸������Զ������û��Ĵ��������б�\n&nbsp;&nbsp;��������ָ����ʵ���Ž��в�ѯ������ʵ����ȱʡ��ѯǰ20��ʵ����¼��')">���ڴ�ǩ������</a>
</body></html>
