<%@ page language="java" contentType="text/html; charset=gb2312"%>
<%
String tip = (String)request.getAttribute("tip");
if(tip==null)tip="";
else
	tip="<font color=red>"+tip+"</font>";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
document.onkeydown = function(event){
	if(!event){
		event = window.event;			
	}
	if(event.keyCode==13) { 
		doSubmit();
	} 
};
//�ύ
function doSubmit(){
	var orgid = document.getElementById("orgid").value;
	var userid = document.getElementById("userid").value;
	var password = document.getElementById("password").value;
	if(orgid==null||orgid==""||userid==null||userid==""||password==null||password==""){
		alert("������������Ϣ");
		return;
	}
	document.forms[0].submit();
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
	if(retObj[2] != null)
		document.getElementById("orgname").value = retObj[2];
		
}
</script>
<title>eChain���湤����ƽ̨</title>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowmanage">
<input type="hidden" name="actionType" value="login">
<input type="hidden" id="orgid" name="orgid">
<input type="hidden" id="sysid" name="sysid" value="echaindefault">
<center>
<font class=title>eChain���湤��������������̨</font>
<hr>
<br>
<table width="80%">
<tr><td align="right" width="40%">����������</td><td align="left"><input type="text" name="orgname" value="" readonly="true">&nbsp;<a href=# onclick="selOrg()">ѡ��</a></td></tr>
<tr><td align="right" width="40%">�û�����</td><td align="left"><input type="text" id="userid" name="userid" value=""></td></tr>
<tr><td align="right" width="40%">�û����룺</td><td align="left"><input type="password" id="password" name="password" value="">&nbsp;<input type="button" class="button" value="&nbsp;��&nbsp;¼&nbsp;" onclick="doSubmit()"></td></tr>
</table>
<br>
<%=tip %>
</center>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('�������̹������̨','&nbsp;&nbsp;�������̹������̨��eChain�����������Ʒ�ṩ�Ļ�������ģ�飬�û����Ե�½�ù������̨�������������е�����ʵ�����й���ά����Ҳ���Բ鿴����ĳһ������ҵ�����ʷ����ۼ���\n&nbsp;&nbsp;��ʹ��ϵͳע�����ʵ�û����������̹���Ա��ɫȨ�ޣ���½�ù������̨��')">�������̹������̨</a>
</form>
</body>
</html>
