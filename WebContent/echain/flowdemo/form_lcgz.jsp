<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%
String instanceid = (String)request.getAttribute("instanceid");
String nodeid = (String)request.getAttribute("nodeid");
Vector vect = (Vector)request.getAttribute("vect");
%>
<html>
<head>
<title>eChain流程演示</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script language="javascript">
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
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowdemo">
<input type="hidden" name="instanceid" value="<%=instanceid%>"/>
<input type="hidden" name="nodeid" value="<%=nodeid%>"/>
<input type="hidden" name="actionType" />
<input type="hidden" name="nextnodeid" />
<input type="hidden" name="nextnodeuser" />

<fieldset><legend>流程办理信息</legend>
<br>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td width="5%">序号</td>
<td width="10%">当前审批步骤</td>
<td width="8%">当前办理人</td>
<td width="15%">办理时间</td>
<td width="10%">下一审批步骤</td>
<td width="8%">下一办理人</td>
<td>办理描述</td></tr>
<%
if(vect==null||vect.isEmpty()){
%>
<tr class=trclass><td colspan='7'>没有流程办理信息</td></tr>
<%
}else{
	EVO vo;
	boolean tr = true;
	for(int i=0;i<vect.size();i++){
		vo=(EVO)vect.elementAt(i);
	    if(tr){
			out.print("<tr class=trclass onmouseout='resumemenu()' onmouseover='invertmenu()'>");
		}else{
			out.print("<tr class=trclass2 onmouseout='resumemenu()' onmouseover='invertmenu()'>");
		}
%>
<td><%=(i+1)%></td>
<td><%=vo.getNodeName()%></td>
<td><%=vo.getUserName()%></td>
<td><%=vo.getNodeStartTime()%></td>
<td><%=vo.getNextNodeName()==null?"-":vo.getNextNodeName()%></td>
<td><%=vo.getNextNodeUser()==null?"-":vo.getNextNodeUser()%></td>
<td><%=vo.getMethods()%></td>
</tr>
<%
		tr=!tr;
	}
}
%>
</table>
<br><br>
</fieldset>
<div align="center">	
<input name="Submit52" type="button"  value="图形跟踪" class="button" onClick="window.open('<%=request.getContextPath()%>/echain/studio/eChainMonitor.jsp?instanceid=<%=instanceid%>','name','left=0,top=0,width=1024,height=768,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes');">		
</div>	  
</form>
</body></html>
