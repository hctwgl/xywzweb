<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%
EVO evo = (EVO)request.getAttribute("evo");
%>
<html>
<head>
<title>eChain���̹���</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
//�ύ
function doSubmit(){
	var orgid = document.getElementById("orgid").value;
	var appid = document.getElementById("appid").value;
	var wfsign = document.getElementById("wfsign").value;
	if(orgid==null||orgid==""||appid==null||appid==""||wfsign==null||wfsign==""){
		alert("������������Ϣ");
		return;
	}
	document.forms[0].submit();
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
	if(retObj[2] != null)
		document.getElementById("wfname").value = retObj[2];
		
}
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowmanage">
<input type="hidden" name="actionType" value="orgWFLink">
<input type="hidden" name="subType" value="update">
<input type="hidden" id="orgid" name="orgid" value="<%=evo.getOrgid()%>">
<input type="hidden" id="appid" name="appid" value="<%=evo.getAppID()%>">
<input type="hidden" id="wfsign" name="wfsign" value="<%=evo.getWFSign()%>">
<fieldset style="background-color:#fafafa;"><legend>�������̹���</legend>
<br>
<table width="80%">
<tr><td width="40%" align="right">��������</td><td><%=evo.getOrgname()%></td></tr>
<tr><td width="40%" align="right">ҵ��Ʒ��</td><td><%=evo.getAppName()%></td></tr>
<tr><td width="40%" align="right">������չ1</td>
<td><input type="text" id="subtype1" name="subtype1" value="<%=evo.getExv10()==null?"":evo.getExv10()%>" size="30"></td></tr>
<tr><td width="40%" align="right">������չ2</td>
<td><input type="text" id="subtype2" name="subtype2" value="<%=evo.getExv19()==null?"":evo.getExv19()%>" size="30"></td></tr>
<tr><td width="40%" align="right">������չ3</td>
<td><input type="text" id="subtype3" name="subtype3" value="<%=evo.getExv32()==null?"":evo.getExv32()%>" size="30"></td></tr>
<tr><td width="40%" align="right">��������</td><td><input type="text" id="wfname" name="wfname" value="<%=evo.getWFName()%>" readonly="true" size="30">&nbsp;<a href=# onclick="selWF()">ѡ��</a></td></tr>
</table>
<br>
</fieldset>
<br>
<div align="center">	
<input type="button" class="button" value="&nbsp;��&nbsp;��&nbsp;" onclick="doSubmit()">	
<input type="reset" class="button" value="&nbsp;��&nbsp;��&nbsp;">	
</div>	  
</form>
</body></html>
