<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.ext.TaskPool" %>
<%
String orgid=(String)request.getSession().getAttribute("s_orgid");
String userid=(String)request.getSession().getAttribute("s_userid");
Vector vect=new TaskPool().query(null);
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
function del(tpid){
	if(confirm("��ȷ��ɾ��������أ��Լ������û��������𣿸ò������޷���ԭ��"))
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=taskpool&subType=del&tpid="+tpid;
}
function add(){
	window.location.href="<%=request.getContextPath()%>/echain/flowmanage/taskpool/add.jsp";
}
//ѡ���û�
function selUser(tpid){
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ�����˵Ľ���
	var url = contextPath+"/echain/flowmanage/taskpool/setUser.jsp?&count=n&tpid="+tpid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:400px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	document.getElementById("tpid").value = tpid;
	if(retObj[1] != null)
		document.getElementById("userlist").value = retObj[1];
	document.forms[0].submit();
}
//ѡ���ɫ
function selRole(tpid){
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ�����˵Ľ���
	var url = contextPath+"/echain/flowmanage/taskpool/setRole.jsp?&count=n&tpid="+tpid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:350px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	document.getElementById("tpid").value = tpid;
	if(retObj[1] != null)
		document.getElementById("userlist").value = retObj[1];
	document.forms[0].submit();
}
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowmanage">
<input type="hidden" name="actionType" value="taskpool">
<input type="hidden" name="subType" value="setUser">
<input type="hidden" id="tpid" name="tpid">
<input type="hidden" id="userlist" name="userlist">
&nbsp;���������>>><br>
<table><tr><td height="3px"></td></tr></table>
<input type="button" name="submit12" value="&nbsp;��&nbsp;��&nbsp;"  class="button" onclick="add()">
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle><td width="15%">�����ID</td><td width="30%">���������</td><td width="40%">���������</td><td width="15%">����</td></tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='4'>û�������������Ϣ</td></tr>
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
//select tpid,tpname,tpdsc
%>
<td><%=(String)vecRow.elementAt(0)%></td>
<td><%=(String)vecRow.elementAt(1)%></td>
<td><%=(vecRow.elementAt(2)==null?"-":(String)vecRow.elementAt(2))%></td>
<td align="center">
<a href=# onclick="del('<%=(String)vecRow.elementAt(0)%>')">ɾ��</a>
<a href=# onclick="selRole('<%=(String)vecRow.elementAt(0)%>')">������ɫ����</a>
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
<a href="#" onclick="showhelp('ʲô������أ�','&nbsp;&nbsp;����һ��ҵ�����룬������Ա�������̰���ʱѡ���ύ������أ���ñ�ҵ�����뽫�ύ��ָ��������أ�\n&nbsp;&nbsp;ӵ�������Ȩ�޵ľ�����Ա�ɵ�¼����أ����в�ѯ���鿴ҵ���������顢Ҳ�ɶ�һ��ҵ�������¼�������죬������ȷ�Ϻ���ñ�ҵ�����뽫ת��������Ա�Ĵ��������б��У�\n&nbsp;&nbsp;�µ�������صİ�����ԱҲ���Բ鿴�������������������ʷ������ҵ��')">ʲô������أ�</a>
</form>
</body></html>
