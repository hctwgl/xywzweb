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
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowmanage">
<input type="hidden" name="actionType" value="instancelist">
&nbsp;������ʵ��>>>
<input type="text" name="instanceid"><input type="submit" class="button" value="&nbsp;��ʵ���Ų���&nbsp;"><--ʵ����Ϊ�ձ�ʾ��ѯ����ʵ��
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td width="15%">��������</td><td width="12%">��������</td><td width="12%">��ǰ����</td><td width="12%">��ǰ������</td><td width="10%">����״̬</td><td width="10%">�ڵ�״̬</td><td>����</td>
</tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='7'>û�з���������ʵ����Ϣ</td></tr>
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
	    nodestatus=vo.getNodeStatus()==null?"<font color=red><b>δ֪״̬</b></font>":vo.getNodeStatus().equals("1")?"<font color=red><b>�߰�</b></font>":vo.getNodeStatus().equals("4")?"<font color=red><b>�ذ�</b></font>":vo.getNodeStatus().equals("5")?"<font color=red><b>�˻�</b></font>":vo.getNodeStatus().equals("6")?"<font color=red><b>����</b></font>":vo.getNodeStatus().equals("7")?"<font color=red><b>���</b></font>":vo.getNodeStatus().equals("2")?"�������":"��������";
		wfstatus=vo.getWFStatus()==null?"δ֪״̬":vo.getWFStatus().equals("0")?"��ת��":vo.getWFStatus().equals("1")?"��ת����":vo.getWFStatus().equals("2")?"<font color=red><b>����</b></font>":vo.getWFStatus().equals("3")?"<font color=red><b>�쳣��ֹ</b></font>":vo.getWFStatus().equals("4")?"Ԥ����":vo.getWFStatus().equals("5")?"<font color=red><b>����</b></font>":"��ת��";
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
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=urge&instanceid=<%=instanceid%>&nodeid=<%=nodeid%>">�߰�</a>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=undo&instanceid=<%=instanceid%>&nodeid=<%=nodeid%>">����</a>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=hang&instanceid=<%=instanceid%>&nodeid=<%=nodeid%>">����</a>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=aweak&instanceid=<%=instanceid%>&nodeid=<%=nodeid%>">����</a>
<a href="#" onClick="window.open('<%=request.getContextPath()%>/echain/studio/eChainMonitor.jsp?instanceid=<%=instanceid%>','name','left=0,top=0,width=1024,height=768,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes');">����</a>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=showInstanceDetails&instanceid=<%=instanceid%>&nodeid=<%=nodeid%>">����</a>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=del&instanceid=<%=instanceid%>">ɾ��</a>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=showwfvarible&instanceid=<%=instanceid%>">���̱���</a>
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
<a href="#" onclick="showhelp('������ʵ��','&nbsp;&nbsp;���̹���Ա���Բ鿴�������������е�ʵ��������Ա���Բ�������Щʵ���İ�����������Щʵ�����й����Ԥ��\n&nbsp;&nbsp;��������ָ����ʵ���Ž��в�ѯ������ʵ����ȱʡ��ѯǰ20��ʵ����¼��')">����������ʵ��</a>
</form>
</body></html>
