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
function del(tpid){
	if(confirm("您确定删除此任务池（以及关连用户）设置吗？该操作将无法复原！"))
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=taskpool&subType=del&tpid="+tpid;
}
function add(){
	window.location.href="<%=request.getContextPath()%>/echain/flowmanage/taskpool/add.jsp";
}
//选择用户
function selUser(tpid){
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/flowmanage/taskpool/setUser.jsp?&count=n&tpid="+tpid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:400px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
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
//选择角色
function selRole(tpid){
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/flowmanage/taskpool/setRole.jsp?&count=n&tpid="+tpid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:350px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
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
&nbsp;任务池设置>>><br>
<table><tr><td height="3px"></td></tr></table>
<input type="button" name="submit12" value="&nbsp;新&nbsp;增&nbsp;"  class="button" onclick="add()">
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle><td width="15%">任务池ID</td><td width="30%">任务池名称</td><td width="40%">任务池描述</td><td width="15%">操作</td></tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='4'>没有任务池设置信息</td></tr>
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
<a href=# onclick="del('<%=(String)vecRow.elementAt(0)%>')">删除</a>
<a href=# onclick="selRole('<%=(String)vecRow.elementAt(0)%>')">关连角色设置</a>
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
<a href="#" onclick="showhelp('什么是任务池？','&nbsp;&nbsp;对于一笔业务申请，审批人员可在流程办理时选择提交给任务池，则该笔业务申请将提交至指定的任务池；\n&nbsp;&nbsp;拥有任务池权限的经办人员可登录任务池，进行查询、查看业务申请详情、也可对一笔业务申请记录进行认领，认领获得确认后，则该笔业务申请将转至经办人员的待办事宜列表中；\n&nbsp;&nbsp;新调入任务池的办理人员也可以查看或者认领任务池所有历史的审批业务。')">什么是任务池？</a>
</form>
</body></html>
