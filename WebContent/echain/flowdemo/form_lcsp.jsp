<%@ page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.cache.WFCache" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%@ page import="com.ecc.echain.workflow.engine.WorkFlowClient" %>
<%@ page import="com.ecc.echain.workflow.model.*" %>
<%
String instanceid = (String)request.getAttribute("instanceid");
String nodeid = (String)request.getAttribute("nodeid");
String bizSeqNo = (String)request.getAttribute("bizSeqNo");
String nodename="";
boolean isMeetingSign=false;//�Ƿ��ǩ�ڵ�
String commentReaders="";//������ߣ������ֵ���÷���";"�ָ�
if(nodeid==null||nodeid.equals("")||nodeid.equals("null"))
	nodename="�Ѱ��";
else{
	VO_wf_node_property wnp=WFCache.getInstance().getNodeProperty(nodeid);
	nodename=wnp.NodeName;
	isMeetingSign=wnp.isMeetingSign;
	if(isMeetingSign){//�ǻ�ǩ�ڵ�,��ȡ��һ�ڵ������(��ǩ�ڵ㷢����)������Ϊ����Ķ���		
		EVO evotmp=new EVO();
		evotmp.setInstanceID(instanceid);
		evotmp.setNodeID(nodeid);
		evotmp=WorkFlowClient.getInstance().getPreNodeUser(evotmp);
		commentReaders = evotmp.getUserID();
		if(commentReaders==null)
			commentReaders="";
	}
}
String username=(String)request.getSession().getAttribute("s_username");
Vector vectComment = (Vector)request.getAttribute("vectComment");
HashMap actionMap = (HashMap)request.getAttribute("getNodeControlFormAction");
if(actionMap==null)actionMap=new HashMap();
%>
<html>
<head>
<title>eChain������ʾ</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script language="javascript">
function submitForm(act){
	if(confirm("��ȷʵҪִ�иò�����")){
		document.forms[0].actionType.value=act;
		document.forms[0].submit();
	}
}
//�ύ
function doSubmit(){
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ����һ�ڵ㼰�����˵Ľ���
	var url = contextPath+"/echain/common/selectNextNodePage.jsp?instanceid="+instanceid+"&nodeid="+nodeid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:300px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;

	var nextnodeid = retObj[1];
	var nextnodeuser = retObj[2];
	var nextnoderole = retObj[3];
	
	if(nextnodeid!=null)
		document.getElementById("nextnodeid").value = nextnodeid;
	if(nextnodeuser != null)
		document.getElementById("nextnodeuser").value = nextnodeuser;
	if(retObj[3] != null)
		document.getElementById("nextnoderole").value = nextnoderole;
	if(retObj[4] != null)
		document.getElementById("nextAnnouceUsers").value = retObj[4];
	
	if(nextnodeuser!=null){
		//ѡ���û��Ƿ��д����ж�
		url = contextPath+"/echain/common/checkIsEntrust.jsp?instanceid="+instanceid+"&userList="+nextnodeuser;
		retObj = window.showModalDialog(url,'selectPage','dialogHeight:300px;dialogWidth:600px;help:no;resizable:no;status:no;');

		if(retObj==null) return;
		
		if(retObj[0]=="true"){
			//��entrustModel��
			var entrustModel = retObj[1];
			//var entrustModel = confirm("����ѡ�û���:"+retObj[2]+"\n�����ȷ������ַ��͸�ԭ�����ˣ������ȡ�������͸�������");
			if(entrustModel!=null && entrustModel!="")
				document.getElementById("entrustModel").value=entrustModel;
			else{
				alert("��ѡ�����ģʽ");
				return;
			}
		}
	}
	
	//�ύ�ڵ�
	document.forms[0].actionType.value="submit";
	document.forms[0].submit();
}
//ת��
function doChange(){
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ�����˵Ľ���
	var url = contextPath+"/echain/common/selectNodeUser.jsp?instanceid="+instanceid+"&nodeid="+nodeid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:300px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	document.getElementById("nextnodeid").value = document.getElementById("nodeid").value;
	if(retObj[1] != null)
		document.getElementById("nextnodeuser").value = retObj[1];
		
	//�ύ�ڵ�
	document.forms[0].actionType.value="change";
	document.forms[0].submit();
}

//����
function doAnnounce(){
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ�����˵Ľ���
	var url = contextPath+"/echain/common/selectAnnounceUser.jsp?instanceid="+instanceid+"&nodeid="+nodeid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:300px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	document.getElementById("nextnodeid").value = document.getElementById("nodeid").value;
	if(retObj[1] != null)
		document.getElementById("nextnodeuser").value = retObj[1];
		
	//�ύ�ڵ�
	document.forms[0].actionType.value="announce";
	document.forms[0].submit();
}

//����Э��
function doAssist(){
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ�����˵Ľ���
	var url = contextPath+"/echain/common/selectUser.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:430px;dialogWidth:610px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	document.getElementById("nextnodeid").value = document.getElementById("nodeid").value;
	if(retObj[1] != null)
		document.getElementById("nextnodeuser").value = retObj[1];
		
	//�ύ�ڵ�
	document.forms[0].actionType.value="wfAssist";
	document.forms[0].submit();
}
//���
function doCallback(){
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ����һ�ڵ㼰�����˵Ľ���
	var url = contextPath+"/echain/common/selectNodeTreatedPage.jsp?instanceid="+instanceid+"&nodeid="+nodeid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:300px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	document.getElementById("nextnodeid").value = retObj[1];
	if(retObj[2] != null)
		document.getElementById("nextnodeuser").value = retObj[2];
	if(retObj[3] != null)
		document.getElementById("callBackModel").value = retObj[3];
	
	//�ύ�ڵ�
	document.forms[0].actionType.value="wfCallBack";
	document.forms[0].submit();
}
//��ת
function doJump(){
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ����һ�ڵ㼰�����˵Ľ���
	var url = contextPath+"/echain/common/selectAllNodePage.jsp?instanceid="+instanceid+"&nodeid="+nodeid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	document.getElementById("nextnodeid").value = retObj[1];
	if(retObj[2] != null)
		document.getElementById("nextnodeuser").value = retObj[2];
	//�ύ�ڵ�
	document.forms[0].actionType.value="wfJump";
	document.forms[0].submit();
}

//���
function doGather(){
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var bizSeqNo = "<%=bizSeqNo%>";
	//������
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ����һ�ڵ㼰�����˵Ľ���
	var url = contextPath+"/echain/flowdemo/startGather.jsp?mainInstanceID="+instanceid+"&mainNodeID="+nodeid+"&bizSeqNo="+bizSeqNo;
	window.open (url, "selectPage", "height=450, width=600,toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
}

function change_wf(){
	if(document.getElementById("suggestControl_wf").checked)
		document.getElementById("suggestControl_wf").value="1";
	else
		document.getElementById("suggestControl_wf").value="0";
}
function change_biz(){
	if(document.getElementById("suggestControl_biz").checked)
		document.getElementById("suggestControl_biz").value="1";
	else
		document.getElementById("suggestControl_biz").value="0";
}
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
<input type="hidden" id="method" name="method" value="echainflowdemo">
<input type="hidden" id="instanceid" name="instanceid" value="<%=instanceid%>"/>
<input type="hidden" id="nodeid" name="nodeid" value="<%=nodeid%>"/>
<input type="hidden" id="actionType" name="actionType" />
<input type="hidden" id="nextnodeid" name="nextnodeid" />
<input type="hidden" id="nextnodeuser" name="nextnodeuser" />
<input type="hidden" name="nextnoderole" />
<input type="hidden" id="nextAnnouceUsers" name="nextAnnouceUsers">
<input type="hidden" id="commentType" name="commentType" value="<%=(isMeetingSign?"2":"1")%>"/>
<input type="hidden" id="commentReaders" name="commentReaders" value="<%=commentReaders%>"/>
<input type="hidden" id="entrustModel" name="entrustModel" value=""/>
<input type="hidden" id="callBackModel" name="callBackModel" value=""/>
<jsp:include flush="true" page="/echain/common/showta.jsp"/>
<fieldset><legend>���������Ϣ</legend>
<br>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td width="5%">���</td>
<td width="12%">�����ڵ�</td>
<td width="15%">���ʱ��</td>
<td width="10%">������</td>
<td width="10%">�����ʶ</td>
<td>�������</td>
</tr>
<%
if(vectComment==null||vectComment.isEmpty()){
%>
<tr class=trclass><td colspan='6'>û�����������Ϣ</td></tr>
<%
}else{
	CommentVO cvo;
	boolean tr = true;
	int k=0;
	for(int i=0;i<vectComment.size();i++){
		cvo=(CommentVO)vectComment.elementAt(i);
		if(cvo.getCommentType()==null||!cvo.getCommentType().equals("0"))
			continue;
	    if(tr){
			out.print("<tr class=trclass onmouseout='resumemenu()' onmouseover='invertmenu()'>");
		}else{
			out.print("<tr class=trclass2 onmouseout='resumemenu()' onmouseover='invertmenu()'>");
		}
	    k++;
%>
<td><%=k%></td>
<td><%=cvo.getNodeName()%></td>
<td><%=cvo.getCommentTime()%></td>
<td><%=cvo.getUserName()%></td>
<td><%=cvo.getCommentSign()==null?"-":cvo.getCommentSign()%></td>
<td><a href="#" onclick="showta('wf_<%=k%>')"><%=cvo.getCommentContent()==null?"-":cvo.getCommentContent().length()>30?cvo.getCommentContent().substring(0,30)+"......":cvo.getCommentContent()%></a></td>
<input type="hidden" id="wf_<%=k%>" value="<%=cvo.getCommentContent()%>">
</tr>
<%
		tr=!tr;
	}
}
%>
</table><br></fieldset><br>

<fieldset><legend>ҵ�������Ϣ</legend>
<br>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td width="5%">���</td>
<td width="12%">�����ڵ�</td>
<td width="15%">���ʱ��</td>
<td width="10%">������</td>
<td width="10%">�����ʶ</td>
<td>�������</td>
</tr>
<%
if(vectComment==null||vectComment.isEmpty()){
%>
<tr class=trclass><td colspan='6'>û��ҵ�������Ϣ</td></tr>
<%
}else{
	CommentVO cvo;
	boolean tr = true;
	int k=0;
	for(int i=0;i<vectComment.size();i++){
		cvo=(CommentVO)vectComment.elementAt(i);
		if(cvo.getCommentType()==null||cvo.getCommentType().equals("")||cvo.getCommentType().equals("0"))
			continue;
	    if(tr){
			out.print("<tr class=trclass onmouseout='resumemenu()' onmouseover='invertmenu()'>");
		}else{
			out.print("<tr class=trclass2 onmouseout='resumemenu()' onmouseover='invertmenu()'>");
		}
	    k++;
%>
<td><%=k%></td>
<td><%=cvo.getNodeName()%></td>
<td><%=cvo.getCommentTime()%></td>
<td><%=cvo.getUserName()%></td>
<td><%=cvo.getCommentSign()==null?"-":cvo.getCommentSign()%></td>
<td><a href="#" onclick="showta('biz_<%=k%>')"><%=cvo.getCommentContent()==null?"-":cvo.getCommentContent().length()>30?cvo.getCommentContent().substring(0,30)+"......":cvo.getCommentContent()%></a></td>
<input type="hidden" id="biz_<%=k%>" value="<%=cvo.getCommentContent()%>">
</tr>
<%
		tr=!tr;
	}
}
%>
</table><br></fieldset><br>

<fieldset><legend align="right" style="font-style:italic">&nbsp;&nbsp;��ǰ�������裺��<%=nodename %>��&nbsp;&nbsp;��ǰ�����ˣ���<%=username %>��&nbsp;&nbsp;</legend>
<b>�ҵ��������</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
�����ʶ��<select id="suggestSign_wf" name="suggestSign_wf" style="width:150">
<option value="">---��ѡ��---</option>
<option value="ͬ��">ͬ��</option>
<option value="���">���</option>
<option value="���">���</option>
<option value="�˻�">�˻�</option>
<option value="����">����</option>
<option value="">��</option></select><br>
<textarea  id="suggestContent_wf" name="suggestContent_wf" rows="5" cols="100" style="background-color:#F7FEA5"></textarea><br>
<input type="checkbox" id="suggestControl_wf" name="suggestControl_wf" value="1" checked=true onchange="change_wf()">�������̲����߿ɶ�<br><br>

<b>�ҵ�ҵ�����</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
�����ʶ��<select id="suggestSign_biz" name="suggestSign_biz" style="width:150">
<option value="">---��ѡ��---</option>
<option value="ͬ��">ͬ��</option>
<option value="���">���</option>
<option value="���">���</option>
<option value="�˻�">�˻�</option>
<option value="����">����</option>
<option value="">��</option></select><br>
<textarea id="suggestContent_biz" name="suggestContent_biz" rows="5" cols="100" style="background-color:#F7FEA5"></textarea><br>
<input type="checkbox" id="suggestControl_biz" name="suggestControl_biz" value="0" onchange="change_biz()">�������̲����߿ɶ�<br><br>
</fieldset><br>

	  <div align="center">
	
			<% if(actionMap!=null && actionMap.get("signin")!=null) {%>
				<input name="Submit42" type="button" class="button" value="ǩ������" onClick="submitForm('signin')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("signoff")!=null) {%>
				<input name="Submit42" type="button" class="button" value="����ǩ��" onClick="submitForm('signoff')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("tasksignoff")!=null) {%>
				<input name="Submit42" type="button" class="button" value="�Ż������" onClick="submitForm('tasksignoff')">
			<%}%>
			<%if(actionMap!=null && actionMap.get("save")!=null) {%>	    
			<input type="button" name="submit12" value="��������"  class="button" onClick="submitForm('save')">
			<%}	%>			
			<%if(actionMap!=null && actionMap.get("submit")!=null) {%>	
			  <input type="button" name="submit12" value="�ᡡ����"  class="button" onClick="doSubmit()">
			<%}%>
			<% if(actionMap!=null && actionMap.get("change")!=null) {%>
				<input name="Submit422" type="button"  value="ת������" class="button" onClick="doChange()">
			<%}%>
			<% if(actionMap!=null && actionMap.get("announce")!=null) {%>
				<input name="Submit422" type="button"  value="��������" class="button" onClick="doAnnounce()">
			<%}%>
			<% if(actionMap!=null && actionMap.get("assist")!=null) {%>
				<input name="Submit422" type="button"  value="����Э��" class="button" onClick="doAssist()">
			<%}%>
			<%if(actionMap!=null && actionMap.get("urge")!=null) {%>
				<input name="Submit322" type="button" class="button" value="�ߡ�����"onClick="submitForm('urge','')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("again")!=null) {%>
				<input name="Submit31" type="button" class="button" value="�á�����"  onClick="submitForm('redo')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("cancel")!=null) {%>
				<input name="Submit32" type="button" class="button" value="��������"   onClick="submitForm('undo')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("returnback")!=null) {%>
				<input name="Submit42" type="button" class="button" value="�ˡ�����"   onClick="submitForm('back')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("hang")!=null) {%>
				<input name="Submit423" type="button" class="button" value="�ҡ�����"  onClick="submitForm('hang')" width="2" size="2">
			<%}%>
			<% if(actionMap!=null && actionMap.get("wake")!=null) {%>
				<input name="Submit42" type="button" class="button" value="��������" onClick="submitForm('aweak')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("callback")!=null) {%>
				<input name="Submit42" type="button" class="button" value="�򡡡���" onClick="doCallback()">				
			<%}%>
			<% if(actionMap!=null && actionMap.get("jump")!=null) {%>
				<input name="Submit42" type="button" class="button" value="������ת" onClick="doJump()">				
			<%}%>
			<% if(actionMap!=null && actionMap.get("gather")!=null) {%>
				<input name="Submit43" type="button" class="button" value="������" onClick="doGather()">	
			<%}%>
			
	  </div>
	  
</form>
</body></html>
