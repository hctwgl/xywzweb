<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%
List list = (List)request.getAttribute("list");
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
function del(orgid,varid){
	if(confirm("��ȷ��ɾ���˻������̳���������Ϣ�𣿸ò������޷���ԭ��"))
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=wforgvar&subType=del&orgid="+orgid+"&varid="+varid;
}
function empty(){
	document.getElementById("orgid").value="";
	document.getElementById("varid").value="";
}
function add(){
	window.location.href="<%=request.getContextPath()%>/echain/flowmanage/wforgvar/add.jsp";
}
//ѡ�����
function selOrg(){
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ�����˵Ľ���
	var url = contextPath+"/echain/common/selectOrg.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:350px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	if(retObj[1] != null)
		document.getElementById("orgid").value = retObj[1];
}
//ѡ�����̳���
function selWFVar(){
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ�����˵Ľ���
	var url = contextPath+"/echain/flowmanage/wfvar/selectWFVar.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:350px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	if(retObj[1] != null)
		document.getElementById("varid").value = retObj[1];
		
}
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowmanage">
<input type="hidden" name="actionType" value="wforgvar">
<input type="hidden" name="subType" value="query">
<fieldset style="background-color:#fafafa;"><legend>�������̳�����ѯ</legend>
<table width="60%" align="center"><tr>
<td>�����ţ�
<input type="text" id="orgid" name="orgid" width="50%" readonly="true">&nbsp;<a href=# onclick="selOrg()">ѡ��</a></td>
<td>����ID��
<input type="text" id="varid" name="varid" readonly="true">&nbsp;<a href=# onclick="selWFVar()">ѡ��</a></td></tr>
</table><br>
<center>
<input type="submit" class="button" value="&nbsp;��&nbsp;ѯ&nbsp;">
<input type="button" class="button" value="&nbsp;��&nbsp;��&nbsp;" onclick="empty()">	
</center>
<table><tr><td height="3px"></td></tr></table>
</fieldset>
<table><tr><td height="3px"></td></tr></table>
<input type="button" name="submit12" value="&nbsp;��&nbsp;��&nbsp;"  class="button" onclick="add()">
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle><td width="15%">������</td><td width="20%">��������</td><td width="15%">����ID</td><td width="20%">��������</td><td width="20%">����ֵ</td><td width="10%">����</td></tr>
<%
if(list==null||list.isEmpty()){
%>
<tr class=trclass><td colspan='6'>û�л�������������Ϣ</td></tr>
<%
}else{
	EVO vo;
	boolean tr = true;
	for(int i=0;i<list.size();i++){
		vo=(EVO)list.get(i);
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
<td><%=vo.getOrgid()%></td>
<td><%=vo.getOrgname()%></td>
<td><%=vo.getFieldID()%></td>
<td><%=vo.getFieldName()%></td>
<td><%=vo.getFieldContent()%></td>
<td align="center">
<a href=# onclick="del('<%=vo.getOrgid()%>','<%=vo.getFieldID()%>')">ɾ��</a>
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
<font color=#999999>����[<%=list==null?0:list.size()%>]��������Ϣ</font>
</div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('ʲô�����̳�����','&nbsp;&nbsp;���̳���ָ���������нű���ʹ�õ�ͨ�������\${���Ŷ��}��')">ʲô�����̳�����</a>
</form>
</body></html>
