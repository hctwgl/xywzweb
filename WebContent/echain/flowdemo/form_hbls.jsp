<%@ page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.cache.WFCache" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%@ page import="com.ecc.echain.workflow.engine.WorkFlowClient" %>
<%@ page import="com.ecc.echain.workflow.model.*" %>

<html>
<head>
<%
	//VO_wf_node_property wnp=WFCache.getInstance().getNodeProperty(mainNodeID);
	//String mainNodeName = wnp.NodeName;
	String currentUserID = (String)session.getAttribute("s_userid");
	
	Vector actionVOs = (Vector)request.getAttribute("actionVO");
	
%>

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
<body >
<form action="<%=request.getContextPath()%>/echaincommonservlet">
	<input type="hidden" id="method" name="method" value="echainflowdemo">
	<input type="hidden" id="actionType" name="actionType" />
	
	<fieldset><legend>操作痕迹列表</legend><br>
		<table class=tablemain cellspacing=1 cellpadding=0>
			<tr class=trtitle>
				<td>序号</td>
				<td>办理人</td>
				<td>办理时间</td>
				<td>执行操作</td>
			</tr>
			
			<%
				GatherActionVO actionVO = null;
				boolean tr = true;
				int k=0;
				for(int i=0; i<actionVOs.size(); i++){
					k++;
					actionVO = (GatherActionVO)actionVOs.get(i);
					if(tr){
						out.print("<tr class=trclass onmouseout='resumemenu()' onmouseover='invertmenu()'>");
					}else{
						out.print("<tr class=trclass2 onmouseout='resumemenu()' onmouseover='invertmenu()'>");
					}
			%>
				<td><%=k %></td>
				<td><%=actionVO.getTransActorName() %></td>
				<td><%=actionVO.getActTime() %></td>
				<td><%=actionVO.getActionName() %></td>
			</tr>	
			<%
					tr = !tr;
				}	
			%>
			
		</table>
		<br>
	</fieldset>
</form>
</body></html>
