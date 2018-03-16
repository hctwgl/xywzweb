<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%
List list = (List)request.getAttribute("list");
String orgid=request.getParameter("orgid");
String appid=request.getParameter("appid");
String wfsign=request.getParameter("wfsign");
if(orgid==null)orgid="";
if(appid==null)appid="";
if(wfsign==null)wfsign="";
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
function del(orgid,appid){
	if(confirm("��ȷ��ɾ���˻������̹�����Ϣ�𣿸ò������޷���ԭ��"))
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=orgWFLink&subType=del&orgid="+orgid+"&appid="+appid;
}
function empty(){
	document.getElementById("orgid").value="";
	document.getElementById("appid").value="";
	document.getElementById("wfsign").value="";
}
function add(){
	window.location.href="<%=request.getContextPath()%>/echain/flowmanage/orgWFLink/add.jsp";
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
//ѡ������
function selWF(){
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ�����˵Ľ���
	var url = contextPath+"/echain/common/selectWF.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:350px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	if(retObj[1] != null)
		document.getElementById("wfsign").value = retObj[1];
		
}
//ѡ��ҵ��Ʒ��
function selApp(){
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ�����˵Ľ���
	var url = contextPath+"/echain/common/selectApp.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:350px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	if(retObj[1] != null)
		document.getElementById("appid").value = retObj[1];
		
}
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowmanage">
<input type="hidden" name="actionType" value="orgWFLink">
<input type="hidden" name="subType" value="query">
<fieldset style="background-color:#fafafa;"><legend>�������̹�����ѯ</legend>
<table width="80%" align="center"><tr>
<td width="30%">�����ţ�
<input type="text" id="orgid" name="orgid" value="<%=orgid%>" readonly="true">&nbsp;<a href=# onclick="selOrg()">ѡ��</a></td>
<td width="30%">ҵ��Ʒ�֣�
<input type="text" id="appid" name="appid" value="<%=appid%>" readonly="true">&nbsp;<a href=# onclick="selApp()">ѡ��</a></td>
<td width="40%">�������̣�
<input type="text" id="wfsign" name="wfsign" value="<%=wfsign%>" readonly="true">&nbsp;<a href=# onclick="selWF()">ѡ��</a></td></tr>
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
<tr class=trtitle><td width="8%">������</td><td width="10%">��������</td><td width="10%">ҵ��Ʒ�ֱ���</td><td width="10%">ҵ��Ʒ������</td><td width="10%">������չ1</td><td width="10%">������չ2</td><td width="10%">������չ3</td><td width="8%">���̱�ʶ</td><td width="15%">��������</td><td width="9%">����</td></tr>
<%
if(list==null||list.isEmpty()){
%>
<tr class=trclass><td colspan='10'>û�л�������������Ϣ</td></tr>
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
<td><%=vo.getAppID()%></td>
<td><%=vo.getAppName()%></td>
<td><%=vo.getExv10()==null?"":vo.getExv10()%></td>
<td><%=vo.getExv19()==null?"":vo.getExv19()%></td>
<td><%=vo.getExv32()==null?"":vo.getExv32()%></td>
<td><%=vo.getWFSign()%></td>
<td><%=vo.getWFName()%></td>
<td align="center">
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=orgWFLink&subType=detail&orgid=<%=vo.getOrgid()%>&appid=<%=vo.getAppID()%>">�޸�</a>
<a href=# onclick="del('<%=vo.getOrgid()%>','<%=vo.getAppID()%>')">ɾ��</a>
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
<a href="#" onclick="showhelp('���ڻ������̹�����','&nbsp;&nbsp;1����������ʱ�����Ը��ݷ��������ڻ����Լ���Ҫ�����ҵ��Ʒ�ֶ�̬����Ԥ���������ģ�壻\n&nbsp;&nbsp;2�����ȹ������������õ�����ģ�壻\n&nbsp;&nbsp;3�����������δ������Ӧҵ��Ʒ�ֵ����̹��������ȡ�ϼ����������ã��Դ�����ֱ��������������������ģ��������Ϣ��')">���ڻ������̹�����</a>
</form>
</body></html>
