<%@page language="java" contentType="text/html; charset=utf-8"%>
<%@ page import="java.lang.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.ecc.echain.workflow.engine.*" %>
<%
	String grantorList = "";
	String grantorDesc = "";
	String isEntrust = "false";
	
	//流程实例号
	String instanceid = request.getParameter("instanceid");
	//待判断的userid，多个以;分隔
	String userList = request.getParameter("userList");
	String currentUserID = (String)request.getSession().getAttribute("s_userid");
	
	WorkFlowClient wfc = WorkFlowClient.getInstance();
	EVO vo = new EVO();
	vo.setInstanceID(instanceid);
	vo.setCurrentUserID(currentUserID);
	vo = wfc.getInstanceInfo(vo);
	
	//机构ID，可以为空
	String orgid = vo.getOrgid();
	//应用模块ID，可以为空
	String appid = vo.getAppID();
	
	if(userList!=null){
		String[] users = userList.split(";");
		for(int i=0; i<users.length; i++){
			users[i] = users[i].startsWith("U.")?users[i].substring(2):users[i];
			String tmp = Entrust.getInstance().getGrantor(orgid,users[i],appid);
			if(!tmp.equals("")){
				grantorList += ";"+tmp;
				grantorDesc += users[i]+"的代办人是"+tmp+";";
			}
		}
	}
	
	if(grantorList.length()>1){
		grantorList = grantorList.substring(1);
		isEntrust = "true";
	}

%>


<%@page import="com.ecc.echain.ext.Entrust"%><HTML>
<HEAD>
<TITLE>校验所选用户是否有代办</TITLE>
<META http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript">

	function doSubmit(){
		retObj = [];
		var entrustModel = "";
		var entrust = document.getElementsByName("entrustModel");
		for(var i=0; i<entrust.length; i++){
			if(entrust[i].checked)
				entrustModel = entrust[i].value;
		}

		if(entrustModel==""){
			alert("请选择代办模式");
			return;
		}

		retObj[0] = "<%=isEntrust%>" ;
		retObj[1] = entrustModel;
		retObj[2] = "<%=grantorList%>" ; 
		retObj[3] = "<%=grantorDesc%>" ;
		window.returnValue = retObj;
		window.close();
	}

	
	function doReturn(){
		retObj = [];
		var isEntrust = "<%=isEntrust%>" ;
		if(isEntrust=="false"){
			retObj[0] = isEntrust;
			window.returnValue = retObj;
			window.close();
		}
	}
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
<BODY onload="doReturn()">
<div class="selectNextNodeStyle">
<table border="0" width="550px" cellspacing="1" cellpadding="0" bgcolor="000000">
	<tr>
		<td class="tdtitle">由于当前选择的审批人设置了工作委托，请指定代办模式</td>
	</tr>
	<tr>
		<td class="td">
		<input type="radio" name="entrustModel" value="0" checked="checked">代办人办理<br>
		<input type="radio" name="entrustModel" value="1">原办理人代人都可以办理<br>
		<input type="radio" name="entrustModel" value="2">原办理人办理<br>
		</td>
	</tr>
</table>
<br></div>
<div align="center">
	<input type="button" class="button" value="确    定" onclick="doSubmit()">
	<input type="button" class="button" value="取    消" onclick="window.close()">
</div>
</BODY>
</HTML>
