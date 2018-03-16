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
<title>eChain流程管理</title>
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
	if(confirm("您确定删除此工作委托设置吗？该操作将无法复原！"))
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
&nbsp;我的工作委托设置>>><br>
<table><tr><td height="3px"></td></tr></table>
<input type="button" name="submit12" value="&nbsp;新&nbsp;增&nbsp;"  class="button" onclick="add()">
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle><td width="15%">委托人</td><td width="15%">被委托人</td><td width="15%">委托类型</td><td width="15%">应用分类</td><td width="30%">起止时间</td><td width="10%">操作</td></tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='6'>没有工作委托设置信息</td></tr>
<%
}else{
	Vector vecRow;
	boolean tr = true;
	String vtype="",vtime="";
	for (int i=0;i<vect.size();i++) {
		vecRow = (Vector) vect.elementAt(i);
		vtype=(String)vecRow.elementAt(5);
		if(vtype==null||vtype.equals("")||vtype.equals("0"))
			vtype="默认指定";
		else
			vtype="特殊指定";
		vtime=((String)vecRow.elementAt(8)).substring(0,10)+"——"+((String)vecRow.elementAt(9)).substring(0,10);
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
<a href=# onclick="del('<%=(String)vecRow.elementAt(0)%>')">删除</a>
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
<font color=#999999>共计[<%=vect==null?0:vect.size()%>]条配置信息</font>
</div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('工作委托','&nbsp;&nbsp;用户在指定时间段内无法在线审批办理业务（如出差、休假等），可以设置把该时间段的工作委托给代办人进行办理；\n&nbsp;&nbsp;工作委托时需要设置指定的委托时间段以及需要委托的流程，也可以设置所有的流程全部委托（委托类型为“默认指定”）。')">关于工作委托</a>
</form>
</body></html>
