<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%@ page import="com.ecc.echain.util.WfPropertyManager" %>
<%
Vector vect = (Vector)request.getAttribute("wflist");
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
function delinstance(wfid){
	if(confirm("���ﾯ�����\n======�ò������������ص��޷���صĺ��======\n\n��ȷ��ɾ��������������ʵ���𣿸ò������޷���ԭ��")){
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=delinstance&wfid="+wfid;
	}
}
function delwf(wfid){
	if(confirm("���ﾯ�����\n======�ò������������ص��޷���صĺ��======\n\n��ȷ��ɾ���������Լ�������������ʵ���𣿸ò������޷���ԭ��")){
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=delwf&wfid="+wfid;
	}
}
function clearallinstance(){
	if(confirm("���ﾯ�����\n======�ò������������ص��޷���صĺ��======\n\n��ȷ��ɾ�����е�ʵ���𣿸ò������޷���ԭ��")){
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=clearallinstance";
	}
}
function clearallwf(){
	if(confirm("���ﾯ�����\n======�ò������������ص��޷���صĺ��======\n\n��ȷ��ɾ�����е������Լ�ʵ���𣿸ò������޷���ԭ��")){
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=clearallwf";
	}
}
function clearallhangupwf(){
	if(confirm("���ﾯ�����\n======�ò������������ص��޷���صĺ��======\n\n��ȷ��ɾ�����еĹ���״̬����ʷ�汾�����𣿸ò������޷���ԭ��")){
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=clearallhangupwf";
	}
}
function reloadWFCache(wfid){
	window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=reloadWFCache&wfid="+wfid;
}
</script>
</head>
<body>
&nbsp;�����б�>>><br>
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td>��������</td><td>���̱�ʶ</td><td>ģ������</td><td>���̹���Ա</td><td>���̰汾</td><td>����</td>
</tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='6'>û�п��õ�����</td></tr>
<%
}else{
	EVO vo;
	boolean tr = true;
	for(int i=0;i<vect.size();i++){
		vo=(EVO)vect.elementAt(i);
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
<td><a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=instancelist&wfsign=<%=vo.getWFSign()%>&appid=<%=vo.getAppID()%>"><%=vo.getWFName()%></a></td>
<td><%=vo.getWFSign()%></td>
<td><%=vo.getAppName()%></td>
<td><%=vo.getWFAdmin()%></td>
<td><%=vo.getTip()%></td>
<td align="center">
<a href="<%=request.getContextPath()%>/echain/flowmanage/showpngfile.jsp?urlpath=<%=WfPropertyManager.getInstance().echainstudiopath%>processes\flowview\<%=vo.getWFID()%>.png">�鿴����ͼ</a>
<a href="<%=request.getContextPath()%>/echain/flowmanage/showxmlfile.jsp?urlpath=<%=WfPropertyManager.getInstance().echainstudiopath%>processes\issue\<%=vo.getWFID()%>.xml">�鿴xml�ļ�</a>
<a href="#" onClick="delwf(<%=vo.getWFID()%>)">ɾ������</a>
<a href="#" onClick="delinstance(<%=vo.getWFID()%>)">ɾ��ʵ��</a>
<a href="#" onClick="reloadWFCache(<%=vo.getWFID()%>)">���¼������̻���</a>
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
<br>
<div align="center">
<input type="button" name="submit12" value="�����ʷ�汾����"  class="button" onClick="clearallhangupwf()">&nbsp;
<input type="button" name="submit12" value="�������"  class="button" onClick="clearallwf()">&nbsp;
<input type="button" name="submit12" value="���ʵ��"  class="button" onClick="clearallinstance()">&nbsp;
<input type="button" name="submit12" value="���¼������̻���"  class="button" onClick="reloadWFCache('')">&nbsp;
</div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('�������̹���','&nbsp;&nbsp;���̹����б�����ʾϵͳ�������ѷ��������̣����̹���Ա���Զ���Щ����ģ����й���ά����\n&nbsp;&nbsp;Ϊ�������������洦�����ܣ��ѷ���������ģ�����ϵͳ����ʱ��ʼ�����ص��ڴ��С�')">�������̹���</a>
</body></html>
