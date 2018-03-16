<%@ page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.cache.WFCache" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%@ page import="com.ecc.echain.workflow.engine.WorkFlowClient" %>
<%@ page import="com.ecc.echain.workflow.model.*" %>
<jsp:include flush="true" page="/echain/common/showta.jsp"/>
<html>
<head>
<%
	//VO_wf_node_property wnp=WFCache.getInstance().getNodeProperty(mainNodeID);
	//String mainNodeName = wnp.NodeName;
	String currentUserID = (String)session.getAttribute("s_userid");
	
	GatherVO vo = (GatherVO)request.getAttribute("gatherVO");
	Vector actionVOs = (Vector)request.getAttribute("actionVO");
	
	//У�������������Ƿ�ȫ���ύ
	WorkFlowClient wf = WorkFlowClient.getInstance();
	
	GatherVO tmp = new GatherVO();
	tmp.setInstanceID(vo.getInstanceID());
	int checkFlag = 0;
	try{
		tmp = wf.wfCheckIsFinishGather(tmp);
		checkFlag = tmp.getSign();
	}catch(Exception e){
		e.printStackTrace();
	}
	
	//��ť���ƣ�
	Map actionMap = new HashMap();
		
	String gatherStartUserID = vo.getGatherStartUserID();
	String gatherEndUserID = vo.getGatherEndUserID();
	String currentGatherUserList = vo.getCurrentGatherUserList()==null?"":vo.getCurrentGatherUserList();
	String currentGatherProcessors = vo.getCurrentGatherProcessors();
	String gatherEndTime = vo.getGatherEndTime();
	
	if(currentGatherUserList.contains(currentUserID)){
		//�ύ��죺��췢���ˣ�û��Ȩ��
		if(currentUserID!=null && currentGatherUserList.contains(currentUserID+";") && gatherEndTime==null )
			actionMap.put("submitGather","true");
		
		//�����»�죺��ǰ���ķ����˻��ǻ����˲��ܷ�����
		if(currentUserID!=null && !(currentUserID.equals(gatherStartUserID)||currentUserID.equals(gatherEndUserID)) && gatherEndTime==null)
			actionMap.put("newGather","true");
		
		//ת���죺��ǰ���ķ����˻��ǻ����˲��� �ύ���
		if(currentUserID!=null && !(currentUserID.equals(gatherStartUserID)||currentUserID.equals(gatherEndUserID)) && gatherEndTime==null)
			actionMap.put("changeGather","true");
	}
	
	//���û������ˣ���ǰ��췢���˲���Ȩ��
	if(currentUserID!=null && currentUserID.equals(gatherStartUserID) && (currentGatherProcessors==null||currentGatherProcessors.equals("")) && gatherEndTime==null)
		actionMap.put("resetGather","true");
	
	//������죺��ǰ�������˲���Ȩ��
	if(currentUserID!=null && currentUserID.equals(gatherEndUserID) && gatherEndTime==null)
		actionMap.put("endGather","true");
%>

<title>eChain������ʾ</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script language="javascript">

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
		var mainInstanceID = "<%=vo.getMainInstanceID()%>";
		var mainNodeID = "<%=vo.getMainNodeID()%>";
		var beforeInstanceID = "<%=vo.getInstanceID()%>";
		//������
		var contextPath="<%=request.getContextPath()%>";
		
		var url = contextPath+"/echain/flowdemo/startGather.jsp?mainInstanceID="+mainInstanceID+"&mainNodeID="+mainNodeID+"&beforeInstanceID="+beforeInstanceID+"&bizSeqNo=<%=vo.getBizSeqNo()%>";

		window.open (url, "selectPage", "height=450, width=600,toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
	}

	//���ת��
	function doChangeGather(){
		var contextPath="<%=request.getContextPath()%>";
		//��ѡ�����˵Ľ���
		var url = contextPath+"/echain/common/selectUser.jsp?&count=1";
		var retObj = window.showModalDialog(url,'selectPage','dialogHeight:420px;dialogWidth:610px;help:no;resizable:no;status:no;');
			
		//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
		if(retObj == null)
			return;
		var status = retObj[0];
		if(status != true)
			return;

		var seluserID="";//�û����
		var seluserName="";//�û�����
		
		if(retObj[1] != null){
			if(retObj[1].indexOf(";")!=-1){//���ض�ֵ
				var list=retObj[1].split(";");
				
				for(var i=0;i<list.length;i++){
					if(i>0)
						seluserID+=";U."+list[i];
					else
						seluserID+="U."+list[i];
				}
			}else{
				seluserID = "U."+retObj[1];
			}
		}
		if(retObj[2] != null)
			seluserName = retObj[2];

		//���û����µ����ʵ����
		if(seluserID == null || seluserID =="")
			return;

		document.getElementById("nextUserID").value=seluserID;
		
		document.forms[0].actionType.value="changeGather";
		document.forms[0].submit();
	}
	
	//�ύ���
	function doSubmit(){
		var suggest = document.getElementById("suggest").value;
		if(suggest==null || suggest==""){
			alert("����������Ϊ��");
			return;
		}
		
		if(confirm("ȷ��������ύ�������ˣ�")){
			document.forms[0].actionType.value="gatherSubmit";
			document.forms[0].submit();
		}
	}

	//�������
	function doEndGather(){
		//У�飺�û��������Ƿ�ȫ������������������
		var sign = "<%=checkFlag%>";
		if(sign != 0){
			if(!confirm("���л�������δ��д�����\n��ȷ��Ҫ���������")){
				return;
			}
		}
		
		document.forms[0].actionType.value="endGather";
		document.forms[0].submit();
	}
	
	//ȡ��
	function doCancle(){
		window.close();
	}

	//�ظ���������
	function doResetProcessor(){
		var contextPath="<%=request.getContextPath()%>";
		//��ѡ�����˵Ľ���
		var url = contextPath+"/echain/common/selectUser.jsp?&count=n";
		var retObj = window.showModalDialog(url,'selectPage','dialogHeight:420px;dialogWidth:610px;help:no;resizable:no;status:no;');
			
		//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
		if(retObj == null)
			return;
		var status = retObj[0];
		if(status != true)
			return;

		var seluserID="";//�û����
		var seluserName="";//�û�����
		
		if(retObj[1] != null){
			if(retObj[1].indexOf(";")!=-1){//���ض�ֵ
				var list=retObj[1].split(";");
				
				for(var i=0;i<list.length;i++){
					if(i>0)
						seluserID+=";U."+list[i];
					else
						seluserID+="U."+list[i];
				}
			}else{
				seluserID = "U."+retObj[1];
			}
		}
		if(retObj[2] != null)
			seluserName = retObj[2];

		//���û����µ����ʵ����
		var instanceID = "<%=vo.getInstanceID()%>";
		var url = contextPath+"/echain/flowdemo/resetGatherProcessor.jsp?&instanceID="+instanceID+"&currentGatherUserList="+seluserID;
		var retObj2 = window.showModalDialog(url,'selectPage','dialogHeight:400px;dialogWidth:600px;help:no;resizable:no;status:no;');
		var sign = retObj2[0];
		if(sign!=0){
			alert("���û��λ���Աʧ�ܣ��Ѿ��вλ���Ա�ύ���");
		}else{
			alert("���û��λ���Ա�ɹ�");
			document.getElementById("currentGatherUserListID").value=seluserID;
			document.getElementById("currentGatherUserListName").value=seluserName;
		}
		
	}

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

	function doLoad(){
		//��찴ťȨ�ޡ�
		var currentUserID = "<%=currentUserID%>";
		var gatherStartUserID = "<%=gatherStartUserID%>";
		var gatherEndUserID = "<%=gatherEndUserID%>";
	}
	
</script>
</head>
<body onload="doLoad()">
<form action="<%=request.getContextPath()%>/echaincommonservlet">
	<input type="hidden" id="method" name="method" value="echainflowdemo">
	<input type="hidden" id="actionType" name="actionType" />
	<input type="hidden" id="instanceID" name="instanceID" value="<%=vo.getInstanceID() %>">
	<input type="hidden" id="nextUserID" name="nextUserID" />

	<fieldset><legend>��촦��</legend>
	<br>
	<table cellspacing=1 cellpadding=0>
		<tr>
			<td align="right" style="width:80px">��췢���ˣ�</td>
			<td>
				<input type="hidden" id="gatherStartUserID" name="gatherStartUserID">
				<input type="text" id="gatherStartUserName" readonly="true" style="background-color:#e3e4e3;width:165" value="<%=vo.getGatherStartUserName() %>">
			</td>
			<td align="right" style="width:80px">�������ˣ�</td>
			<td >
				<input type="hidden" id="gatherEndUserID" name="gatherEndUserID" style="background-color:#F7FEA5;width:110px">
				<input type="text" id="gatherEndUserName" readonly="true" style="background-color:#e3e4e3;width:140px" readonly="true" value="<%=vo.getGatherEndUserName() %>">
			</td>
		</tr>
		<tr>
			<td align="right" style="width:80px">�������ˣ�</td>
			<td colspan="3">
				<input type="hidden" id="currentGatherUserListID" name="currentGatherUserListID" style="background-color:#F7FEA5;width:400px">
				<input type="text" id="currentGatherUserListName" readonly="true" style="background-color:#e3e4e3;width:440px" readonly="true" value="<%=vo.getAllProcessorName() %>">
			</td>
		</tr>
		<tr>
			<td align="right" style="width:80px">������⣺</td>
			<td colspan="3"><input type="text" id="gatherTitle" name="gatherTitle" style="background-color:#e3e4e3;width:440px" readonly="true" value="<%=vo.getGatherTitle() %>"></td>
		</tr>
		<tr>
			<td align="right" style="width:80px">���������</td>
			<td colspan="3"><textarea id="gatherDesc" name="gatherDesc" rows="5" cols="60" style="background-color:#e3e4e3" readonly="true" ><%=vo.getGatherDesc()==null?"":vo.getGatherDesc() %></textarea></td>
		</tr>
	</table>
	<br></fieldset><br>
	
	<fieldset><legend>�������б�</legend><br>
		<table class=tablemain cellspacing=1 cellpadding=0>
			<tr class=trtitle>
				<td width="5%">���</td>
				<td width="18%">���ʱ��</td>
				<td width="17%">������</td>
				<td width="60%">������</td>
			</tr>
			
			<%
				GatherActionVO actionVO = null;
				boolean tr = true;
				int k=1;
				for(int i=0; i<actionVOs.size(); i++){
					actionVO = (GatherActionVO)actionVOs.get(i);
					if(tr){
						out.print("<tr class=trclass onmouseout='resumemenu()' onmouseover='invertmenu()'>");
					}else{
						out.print("<tr class=trclass2 onmouseout='resumemenu()' onmouseover='invertmenu()'>");
					}
			%>
				<td><%=k %></td>
				<td><%=actionVO.getActTime() %></td>
				<td><%=actionVO.getTransActorName() %></td>
				<td><a href="#" onclick="showta('wf_<%=k%>')"><%=actionVO.getSuggest()==null?"":actionVO.getSuggest().length()>30?actionVO.getSuggest().substring(0,30)+"...":actionVO.getSuggest() %></a></td>
				<input type="hidden" id="wf_<%=k%>" value="<%=actionVO.getSuggest()%>">
			</tr>	
			<%
					tr = !tr;
					k++;
				}	
			%>
			
		</table>
		<br>
	</fieldset>
	
	<br>
	<fieldset><legend>�ҵĻ�����</legend><br>
		<textarea id="suggest" name="suggest" rows="5" cols="100" style="background-color:#F7FEA5"></textarea>
		<br>	
	</fieldset>
	
	<div align="center">
		
		<% if(actionMap!=null && actionMap.get("submitGather")!=null) {%>
				<input name="Submit" type="button" class="button" value="�ύ������" onClick="doSubmit()">
		<%}%>
		<% if(actionMap!=null && actionMap.get("newGather")!=null) {%>
				<input name="Submit2" type="button" class="button" value="�����»��" onClick="doStartGather()">
		<%}%>
		<% if(actionMap!=null && actionMap.get("changeGather")!=null) {%>
				<input name="Submit2" type="button" class="button" value="ת��������" onClick="doChangeGather()">
		<%}%>
		<% if(actionMap!=null && actionMap.get("endGather")!=null) {%>
				<input name="Submit3" type="button" class="button" value="�������" onClick="doEndGather()">
		<%}%>
		<% if(actionMap!=null && actionMap.get("resetGather")!=null) {%>
				<input name="Submit4" type="button" class="button" value="���û�������" onClick="doResetProcessor()">
		<%}%>
		
	</div>
	
</form>
</body></html>
