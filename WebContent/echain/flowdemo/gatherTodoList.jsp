<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%
Vector vect = (Vector)request.getAttribute("worklist");
%>

<%@page import="com.ecc.echain.workflow.model.GatherVO"%><html>
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
&nbsp;�ҵĴ��������б�>>><br>
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td>�������</td><td>ҵ����ˮ��</td><td>��췢����</td><td>��������</td><td>��������</td>
</tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='8'>û�д�����Ϣ</td></tr>
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
<div align="right"><font color=#999999>����[<%=vect==null?0:vect.size()%>]����Ϣ</font></div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('��������','&nbsp;&nbsp;��������ָ��ǰ��½�û���Ҫ��������񣬰������˰������񡢶��˰�����������Э�������Լ���ǩ��������\n&nbsp;&nbsp;��������ָ����ʵ���Ž��в�ѯ������ʵ����ȱʡ��ѯǰ20��ʵ����¼��')">���ڴ�������</a>
</body></html>
