<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.ext.Entrust" %>
<%
String orgid=(String)request.getSession().getAttribute("s_orgid");
String userid=(String)request.getSession().getAttribute("s_userid");
Vector vect=new Entrust().query(userid);
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
function del(pkey){
	if(confirm("��ȷ��ɾ���˹���ί�������𣿸ò������޷���ԭ��"))
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echaincommon&actionType=entrust&subType=del&pkey="+pkey;
}
function add(){
	window.location.href="<%=request.getContextPath()%>/echain/common/entrust/add.jsp";
}
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echaincommon">
<input type="hidden" name="actionType" value="entrust">
<input type="hidden" name="subType" value="query">
&nbsp;�ҵĹ���ί������>>><br>
<table><tr><td height="3px"></td></tr></table>
<input type="button" name="submit12" value="&nbsp;��&nbsp;��&nbsp;"  class="button" onclick="add()">
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle><td width="15%">ί����</td><td width="15%">��ί����</td><td width="15%">ί������</td><td width="15%">Ӧ�÷���</td><td width="30%">��ֹʱ��</td><td width="10%">����</td></tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='6'>û�й���ί��������Ϣ</td></tr>
<%
}else{
	Vector vecRow;
	boolean tr = true;
	String vtype="",vtime="";
	for (int i=0;i<vect.size();i++) {
		vecRow = (Vector) vect.elementAt(i);
		vtype=(String)vecRow.elementAt(5);
		if(vtype==null||vtype.equals("")||vtype.equals("0"))
			vtype="Ĭ��ָ��";
		else
			vtype="����ָ��";
		vtime=((String)vecRow.elementAt(8)).substring(0,10)+"����"+((String)vecRow.elementAt(9)).substring(0,10);
	    if(tr){
%>
<tr class=trclass onmouseout='resumemenu()' onmouseover='invertmenu()'>
<%
		}else{
%>
<tr class=trclass2 onmouseout='resumemenu()' onmouseover='invertmenu()'>
<%
		}
//select pkey,UserID,UserName,Vicar,VicarName,VicariousType,AppID,AppName,BeginTime,EndTime,orgid
%>
<td><%=(String)vecRow.elementAt(2)%></td>
<td><%=(String)vecRow.elementAt(4)%></td>
<td><%=vtype%></td>
<td><%=(vecRow.elementAt(7)==null?"-":(String)vecRow.elementAt(7))%></td>
<td><%=vtime%></td>
<td align="center">
<a href=# onclick="del('<%=(String)vecRow.elementAt(0)%>')">ɾ��</a>
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
<a href="#" onclick="showhelp('����ί��','&nbsp;&nbsp;�û���ָ��ʱ������޷�������������ҵ�������ݼٵȣ����������ðѸ�ʱ��εĹ���ί�и������˽��а���\n&nbsp;&nbsp;����ί��ʱ��Ҫ����ָ����ί��ʱ����Լ���Ҫί�е����̣�Ҳ�����������е�����ȫ��ί�У�ί������Ϊ��Ĭ��ָ��������')">���ڹ���ί��</a>
</form>
</body></html>
