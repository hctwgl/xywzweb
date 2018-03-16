<%@ page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.cache.WFCache" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%@ page import="com.ecc.echain.workflow.engine.WorkFlowClient" %>
<%@ page import="com.ecc.echain.workflow.model.*" %>

<html>
<head>
<%
	String userID = (String)session.getAttribute("s_userid");
	String userName = (String)session.getAttribute("s_username");
	String mainInstanceID = request.getParameter("mainInstanceID");
	String mainNodeID = request.getParameter("mainNodeID");
	String bizSeqNo = request.getParameter("bizSeqNo");
	VO_wf_node_property wnp=WFCache.getInstance().getNodeProperty(mainNodeID);
	String mainNodeName = wnp.NodeName;
	String beforeInstanceID = request.getParameter("beforeInstanceID");
	
	String gatherTitle = "";
	String gatherDesc = "";
	if(beforeInstanceID!=null && !beforeInstanceID.equals("")){
		WorkFlowClient wfc = WorkFlowClient.getInstance();
		
		GatherVO vo = new GatherVO();
		vo.setInstanceID(beforeInstanceID);
		vo = wfc.getGatherInstanceInfo(vo);
		
		gatherTitle = vo.getGatherTitle();
		gatherDesc = vo.getGatherDesc();
	}
%>

<title>eChain������ʾ</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script language="javascript">
	//��ʼ����췢����
	function doLoad(){
		document.getElementById("gatherStartUserID").value="<%=userID%>";
		document.getElementById("gatherStartUserName").value="<%=userName%>";
		document.getElementById("gatherEndUserID").value="<%=userID%>";
		document.getElementById("gatherEndUserName").value="<%=userName%>"
	}

	/*
		ѡ��
		@param count 1-��ѡ n-��ѡ
		@param nameFlag ��ID��ֵ��nameFlag+"ID" ��Name��ֵ��nameFlag+"Name"
	*/
	function doSelectUser(count,nameFlag){
		var contextPath="<%=request.getContextPath()%>";
		//��ѡ�����˵Ľ���
		var url = contextPath+"/echain/common/selectUser.jsp?&count="+count;
		var retObj = window.showModalDialog(url,'selectPage','dialogHeight:420px;dialogWidth:610px;help:no;resizable:no;status:no;');
			
		//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
		if(retObj == null)
			return;
		var status = retObj[0];
		if(status != true)
			return;
		if(retObj[1] != null){
			if(retObj[1].indexOf(";")!=-1){//���ض�ֵ
				var list=retObj[1].split(";");
				var seluser="";
				for(var i=0;i<list.length;i++){
					if(i>0)
						seluser+=";U."+list[i];
					else
						seluser+="U."+list[i];
				}
				document.getElementById(nameFlag+"ID").value =seluser;
			}else{
				document.getElementById(nameFlag+"ID").value = "U."+retObj[1];
			}
		}
		if(retObj[2] != null)
			document.getElementById(nameFlag+"Name").value = retObj[2];
	}

	//�����»��
	function doStartGather(){
		document.forms[0].actionType.value="startGather";
		document.forms[0].submit();
	}

	//ȡ��
	function doCancle(){
		window.close();
	
	}
</script>
</head>
<body onload="doLoad()">
<form action="<%=request.getContextPath()%>/echaincommonservlet">
	<input type="hidden" id="method" name="method" value="echainflowdemo">
	<input type="hidden" id="actionType" name="actionType" />
	<input type="hidden" id="mainInstanceID" name="mainInstanceID" value="<%=mainInstanceID %>"/>
	<input type="hidden" id="mainNodeID" name="mainNodeID"  value="<%=mainNodeID %>"/>
	<input type="hidden" id="mainNodeName" name="mainNodeName" value="<%=mainNodeName %>"/>
	<input type="hidden" id="beforeInstanceID" name="beforeInstanceID" value="<%=beforeInstanceID %>"/>
	<input type="hidden" id="beforeInstanceID" name="beforeInstanceID" value="<%=beforeInstanceID %>"/>
	<input type="hidden" id="bizSeqNo" name="bizSeqNo" value="<%=bizSeqNo %>"/>

	<fieldset><legend>������</legend>
	<br>
	<table cellspacing=1 cellpadding=0>
		<tr>
			<td align="right" style="width:80px">��췢���ˣ�</td>
			<td>
				<input type="hidden" id="gatherStartUserID" name="gatherStartUserID">
				<input type="text" id="gatherStartUserName" readonly="true" style="background-color:#e3e4e3;width:165">
			</td>
			<td align="right" style="width:80px">�������ˣ�</td>
			<td >
				<input type="hidden" id="gatherEndUserID" name="gatherEndUserID" style="background-color:#F7FEA5;width:95px">
				<input type="text" id="gatherEndUserName" readonly="true" style="background-color:#F7FEA5;width:95px">
				<input name="Submit" type="button" style="width:35px" class="button" value="..." onClick="doSelectUser('1','gatherEndUser')">
			</td>
		</tr>
		<tr>
			<td align="right" style="width:80px">�������ˣ�</td>
			<td colspan="3">
				<input type="hidden" id="currentGatherUserListID" name="currentGatherUserListID" style="background-color:#F7FEA5;width:400px">
				<input type="text" id="currentGatherUserListName" readonly="true" style="background-color:#F7FEA5;width:400px">
				<input name="Submit" type="button" style="width:35px" class="button" value="..." onClick="doSelectUser('n','currentGatherUserList')">
			</td>
		</tr>
		<tr>
			<td align="right" style="width:80px">������⣺</td>
			<td colspan="3"><input type="text" id="gatherTitle" name="gatherTitle" style="background-color:#F7FEA5;width:440px" value="<%=gatherTitle %>"></td>
		</tr>
		<tr>
			<td align="right" style="width:80px">���������</td>
			<td colspan="3"><textarea id="gatherDesc" name="gatherDesc" rows="5" cols="60" style="background-color:#F7FEA5" ><%=gatherDesc %></textarea></td>
		</tr>
	</table>
	<br></fieldset><br>
	  <div align="center">
	  		<input name="Submit" type="button" class="button" value="������" onClick="doStartGather()">
	  		<input name="Submit2" type="button" class="button" value="ȡ��" onClick="doCancle()">
	  </div>
	
</form>
</body></html>
