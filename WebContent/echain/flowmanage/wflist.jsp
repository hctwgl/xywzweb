<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%@ page import="com.ecc.echain.util.WfPropertyManager" %>
<%
Vector vect = (Vector)request.getAttribute("wflist");
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
function delinstance(wfid){
	if(confirm("★★★警告★★★\n======该操作将导致严重的无法挽回的后果======\n\n您确定删除此流程下所有实例吗？该操作将无法复原！")){
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=delinstance&wfid="+wfid;
	}
}
function delwf(wfid){
	if(confirm("★★★警告★★★\n======该操作将导致严重的无法挽回的后果======\n\n您确定删除此流程以及该流程下所有实例吗？该操作将无法复原！")){
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=delwf&wfid="+wfid;
	}
}
function clearallinstance(){
	if(confirm("★★★警告★★★\n======该操作将导致严重的无法挽回的后果======\n\n您确定删除所有的实例吗？该操作将无法复原！")){
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=clearallinstance";
	}
}
function clearallwf(){
	if(confirm("★★★警告★★★\n======该操作将导致严重的无法挽回的后果======\n\n您确定删除所有的流程以及实例吗？该操作将无法复原！")){
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=clearallwf";
	}
}
function clearallhangupwf(){
	if(confirm("★★★警告★★★\n======该操作将导致严重的无法挽回的后果======\n\n您确定删除所有的挂起状态的历史版本流程吗？该操作将无法复原！")){
		window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=clearallhangupwf";
	}
}
function reloadWFCache(wfid){
	window.location.href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=reloadWFCache&wfid="+wfid;
}
</script>
</head>
<body>
&nbsp;流程列表>>><br>
<table><tr><td height="3px"></td></tr></table>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td>流程名称</td><td>流程标识</td><td>模块名称</td><td>流程管理员</td><td>流程版本</td><td>操作</td>
</tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='6'>没有可用的流程</td></tr>
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
<a href="<%=request.getContextPath()%>/echain/flowmanage/showpngfile.jsp?urlpath=<%=WfPropertyManager.getInstance().echainstudiopath%>processes\flowview\<%=vo.getWFID()%>.png">查看流程图</a>
<a href="<%=request.getContextPath()%>/echain/flowmanage/showxmlfile.jsp?urlpath=<%=WfPropertyManager.getInstance().echainstudiopath%>processes\issue\<%=vo.getWFID()%>.xml">查看xml文件</a>
<a href="#" onClick="delwf(<%=vo.getWFID()%>)">删除流程</a>
<a href="#" onClick="delinstance(<%=vo.getWFID()%>)">删除实例</a>
<a href="#" onClick="reloadWFCache(<%=vo.getWFID()%>)">重新加载流程缓存</a>
</td>
</tr>
<%
		tr=!tr;
	}
}
%>
</table>
<table><tr><td height="3px"></td></tr></table>
<div align="right"><font color=#999999>共计[<%=vect==null?0:vect.size()%>]条信息</font></div>
<br>
<div align="center">
<input type="button" name="submit12" value="清空历史版本流程"  class="button" onClick="clearallhangupwf()">&nbsp;
<input type="button" name="submit12" value="清空流程"  class="button" onClick="clearallwf()">&nbsp;
<input type="button" name="submit12" value="清空实例"  class="button" onClick="clearallinstance()">&nbsp;
<input type="button" name="submit12" value="重新加载流程缓存"  class="button" onClick="reloadWFCache('')">&nbsp;
</div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('关于流程管理','&nbsp;&nbsp;流程管理列表中显示系统中所有已发布的流程，流程管理员可以对这些流程模板进行管理维护；\n&nbsp;&nbsp;为了提升流程引擎处理性能，已发布的流程模板会在系统启动时初始化加载到内存中。')">关于流程管理</a>
</body></html>
