<%@page language="java" contentType="text/html; charset=utf-8"%>
<%@ page import="java.lang.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.ecc.echain.workflow.engine.*" %>
<%
WorkFlowClient wfc=WorkFlowClient.getInstance();
String instanceid = request.getParameter("instanceid");
String nodeid = request.getParameter("nodeid");
EVO evo=new EVO();
evo.setInstanceID(instanceid);
evo.setNodeID(nodeid);
List list=wfc.getWFTreatedNodeList(evo);
%>
<HTML>
<HEAD>
<TITLE>打回步骤选择</TITLE>
<META http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript">
	function retSuc(){
		var retObj = [];
		retObj[0] = true;
		var node = null;

		//取打回模式
		var callBackModel = "";
		var callBack = document.getElementsByName("callBackModel");
		for(var i=0; i<callBack.length; i++){
			if(callBack[i].checked)
				callBackModel = callBack[i].value;
		}
		if(callBackModel==""){
			alert("请选择打回模式");
			return;
		}
		
		var list = document.getElementsByName("nodeid");
		for(var i=0;i<list.length;i++){
			if(list[i].checked){
				node = list[i].value;
				break;
			}
		}
		if(node == null){
			alert("请选择要打回的步骤");
			return;
		}
		retObj[1] = node;		
		var user = document.getElementById("userid_"+node).value;
		retObj[2] = user;	
		retObj[3] = callBackModel;	
		window.returnValue = retObj;
		window.close();
	};
	
	function retFail(){
		var retObj = [];
		retObj[0] = false;
		window.returnValue = retObj;
		window.close();
	};
</script>

<style type="text/css">
A{font-size:9pt}
BODY{font-size:9pt}
.selectNextNodeStyle {
	margin: 20px;
}
.button
{
	BORDER-RIGHT:#A7A6AA 1px solid; 
	PADDING-RIGHT:1px;
	BORDER-TOP:#A7A6AA 1px solid;
	PADDING-LEFT:2px;
	FONT-SIZE:12px;
	FILTER:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#ffffff, EndColorStr=#F0F0F0);
	BORDER-LEFT: #A7A6AA 1px solid; 
	CURSOR:hand;
	COLOR:#4B4B4B;
	PADDING-TOP:2px; 
    BORDER-BOTTOM: #A7A6AA 1px solid; 
	background:background-attachment
}
.tdtitle{
	font-weight:700;
	font-size: 9pt;
    color: #000000;
    padding: 5px 5px 5px 5px;
	background-color:#e3e4e3;    
    height: 20px;
	BORDER: #B7BAC1 0pt solid;
}
.td{
	font-size: 9pt;
    color: #000000;
    padding: 5px 5px 5px 5px;
	background-color:#FFFFFF;    
    height: 20px;
	BORDER: #B7BAC1 0pt solid;
}
</style>

</HEAD>
<BODY>
<div class="selectNextNodeStyle">
<table border="1" width="500px" cellspacing="1" cellpadding="0" bgcolor="000000">
	<tr>
		<td width="100%" class="tdtitle">请选择打回模式</td>
	</tr>
	<tr>
		<td width="100%" style="font-size:9pt" class="td">
			<input type="radio" name="callBackModel" value="0">提交给打回发起人
			<input type="radio" name="callBackModel" value="1" checked="checked">逐级提交
		</td>
	</tr>
	<tr>
		<td width="100%" class="tdtitle">请选择已办理过的步骤</td>
	</tr>
	<tr>
		<td class="td">
			<table border="0" width="70%" align="center">
		<%
			if (list!=null&&list.size()>0){
				Map hm;
				String nodeId,nodeName,userId,userName;
				for(int i=0;i<list.size();i++){
					hm=(Map)list.get(i);
					nodeId=(String)hm.get("nodeid");
					nodeName=(String)hm.get("nodename");
					userId=(String)hm.get("userid");
					userName=(String)hm.get("username");
					out.println("<tr><td width=\"50%\" style=\"font-size:9pt\">");
					out.println("<input type=\"radio\" name=\"nodeid\" value=\"" + nodeId + "\">" + nodeName+"<input type=\"hidden\" id=\"userid_"+nodeId+"\" value=\""+userId+"\"></td>");
					out.println("<td width=\"50%\"><input type=\"text\" value=\""+userName+"\" readonly=\"true\" style=\"border:0;background-color:#e3e4e3;width:220px\"></td></tr>");
				}
			}						
		%>
			</table>
		</td>
	</tr>
</table>
<br></div>
<center>
<input type="button" class="button" value="&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;" onclick="retSuc()">&nbsp;&nbsp;
<input type="button" class="button" value="&nbsp;&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;&nbsp;" onclick="retFail()"></center>
</BODY>
</HTML>
