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
function del(orgid,appid){
	if(confirm("您确定删除此机构流程关连信息吗？该操作将无法复原！"))
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
//选择机构
function selOrg(){
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/common/selectOrg.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:350px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	if(retObj[1] != null)
		document.getElementById("orgid").value = retObj[1];
}
//选择流程
function selWF(){
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/common/selectWF.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:350px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	if(retObj[1] != null)
		document.getElementById("wfsign").value = retObj[1];
		
}
//选择业务品种
function selApp(){
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/common/selectApp.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:350px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
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
<fieldset style="background-color:#fafafa;"><legend>机构流程关连查询</legend>
<table width="80%" align="center"><tr>
<td width="30%">机构号：
<input type="text" id="orgid" name="orgid" value="<%=orgid%>" readonly="true">&nbsp;<a href=# onclick="selOrg()">选择</a></td>
<td width="30%">业务品种：
<input type="text" id="appid" name="appid" value="<%=appid%>" readonly="true">&nbsp;<a href=# onclick="selApp()">选择</a></td>
<td width="40%">所属流程：
<input type="text" id="wfsign" name="wfsign" value="<%=wfsign%>" readonly="true">&nbsp;<a href=# onclick="selWF()">选择</a></td></tr>
</table><br>
<center>
<input type="submit" class="button" value="&nbsp;查&nbsp;询&nbsp;">
<input type="button" class="button" value="&nbsp;重&nbsp;置&nbsp;" onclick="empty()">	
</center>
<table><tr><td height="3px"></td></tr></table>
</fieldset>
<table><tr><td height="3px"></td></tr></table>
<input type="button" name="submit12" value="&nbsp;新&nbsp;增&nbsp;"  class="button" onclick="add()">
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle><td width="8%">机构号</td><td width="10%">机构名称</td><td width="10%">业务品种编码</td><td width="10%">业务品种名称</td><td width="10%">子类扩展1</td><td width="10%">子类扩展2</td><td width="10%">子类扩展3</td><td width="8%">流程标识</td><td width="15%">流程名称</td><td width="9%">操作</td></tr>
<%
if(list==null||list.isEmpty()){
%>
<tr class=trclass><td colspan='10'>没有机构流程配置信息</td></tr>
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
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=orgWFLink&subType=detail&orgid=<%=vo.getOrgid()%>&appid=<%=vo.getAppID()%>">修改</a>
<a href=# onclick="del('<%=vo.getOrgid()%>','<%=vo.getAppID()%>')">删除</a>
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
<font color=#999999>共计[<%=list==null?0:list.size()%>]条配置信息</font>
</div>
<jsp:include flush="true" page="/echain/common/tip.jsp"/>
<a href="#" onclick="showhelp('关于机构流程关连？','&nbsp;&nbsp;1、发起流程时，可以根据发起人所在机构以及拟要发起的业务品种动态关连预定义的流程模板；\n&nbsp;&nbsp;2、优先关连本机构配置的流程模板；\n&nbsp;&nbsp;3、如果本机构未设置相应业务品种的流程关连，则读取上级机构的配置，以此类推直至读到符合条件的流程模板配置信息。')">关于机构流程关连？</a>
</form>
</body></html>
