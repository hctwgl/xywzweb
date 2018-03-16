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
boolean isMeetingSign=false;//是否会签节点
String commentReaders="";//意见读者，允许多值，用分行";"分割
if(nodeid==null||nodeid.equals("")||nodeid.equals("null"))
	nodename="已办结";
else{
	VO_wf_node_property wnp=WFCache.getInstance().getNodeProperty(nodeid);
	nodename=wnp.NodeName;
	isMeetingSign=wnp.isMeetingSign;
	if(isMeetingSign){//是会签节点,读取上一节点办理人(会签节点发起人)，设置为意见阅读者		
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
<title>eChain流程演示</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script language="javascript">
function submitForm(act){
	if(confirm("您确实要执行该操作吗？")){
		document.forms[0].actionType.value=act;
		document.forms[0].submit();
	}
}
//提交
function doSubmit(){
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var contextPath="<%=request.getContextPath()%>";
	//打开选择下一节点及处理人的界面
	var url = contextPath+"/echain/common/selectNextNodePage.jsp?instanceid="+instanceid+"&nodeid="+nodeid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:300px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
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
		//选择用户是否有代办判断
		url = contextPath+"/echain/common/checkIsEntrust.jsp?instanceid="+instanceid+"&userList="+nextnodeuser;
		retObj = window.showModalDialog(url,'selectPage','dialogHeight:300px;dialogWidth:600px;help:no;resizable:no;status:no;');

		if(retObj==null) return;
		
		if(retObj[0]=="true"){
			//给entrustModel赋
			var entrustModel = retObj[1];
			//var entrustModel = confirm("您所选用户中:"+retObj[2]+"\n点击【确定】坚持发送给原办理人，点击【取消】发送给代办人");
			if(entrustModel!=null && entrustModel!="")
				document.getElementById("entrustModel").value=entrustModel;
			else{
				alert("请选择代办模式");
				return;
			}
		}
	}
	
	//提交节点
	document.forms[0].actionType.value="submit";
	document.forms[0].submit();
}
//转办
function doChange(){
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/common/selectNodeUser.jsp?instanceid="+instanceid+"&nodeid="+nodeid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:300px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	document.getElementById("nextnodeid").value = document.getElementById("nodeid").value;
	if(retObj[1] != null)
		document.getElementById("nextnodeuser").value = retObj[1];
		
	//提交节点
	document.forms[0].actionType.value="change";
	document.forms[0].submit();
}

//抄送
function doAnnounce(){
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/common/selectAnnounceUser.jsp?instanceid="+instanceid+"&nodeid="+nodeid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:300px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	document.getElementById("nextnodeid").value = document.getElementById("nodeid").value;
	if(retObj[1] != null)
		document.getElementById("nextnodeuser").value = retObj[1];
		
	//提交节点
	document.forms[0].actionType.value="announce";
	document.forms[0].submit();
}

//审批协助
function doAssist(){
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/common/selectUser.jsp?&count=1";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:430px;dialogWidth:610px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	document.getElementById("nextnodeid").value = document.getElementById("nodeid").value;
	if(retObj[1] != null)
		document.getElementById("nextnodeuser").value = retObj[1];
		
	//提交节点
	document.forms[0].actionType.value="wfAssist";
	document.forms[0].submit();
}
//打回
function doCallback(){
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var contextPath="<%=request.getContextPath()%>";
	//打开选择下一节点及处理人的界面
	var url = contextPath+"/echain/common/selectNodeTreatedPage.jsp?instanceid="+instanceid+"&nodeid="+nodeid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:300px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
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
	
	//提交节点
	document.forms[0].actionType.value="wfCallBack";
	document.forms[0].submit();
}
//跳转
function doJump(){
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var contextPath="<%=request.getContextPath()%>";
	//打开选择下一节点及处理人的界面
	var url = contextPath+"/echain/common/selectAllNodePage.jsp?instanceid="+instanceid+"&nodeid="+nodeid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:500px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	document.getElementById("nextnodeid").value = retObj[1];
	if(retObj[2] != null)
		document.getElementById("nextnodeuser").value = retObj[2];
	//提交节点
	document.forms[0].actionType.value="wfJump";
	document.forms[0].submit();
}

//会办
function doGather(){
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var bizSeqNo = "<%=bizSeqNo%>";
	//发起会办
	var contextPath="<%=request.getContextPath()%>";
	//打开选择下一节点及处理人的界面
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
<fieldset><legend>流程意见信息</legend>
<br>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td width="5%">序号</td>
<td width="12%">审批节点</td>
<td width="15%">意见时间</td>
<td width="10%">审批人</td>
<td width="10%">意见标识</td>
<td>流程意见</td>
</tr>
<%
if(vectComment==null||vectComment.isEmpty()){
%>
<tr class=trclass><td colspan='6'>没有流程意见信息</td></tr>
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

<fieldset><legend>业务意见信息</legend>
<br>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td width="5%">序号</td>
<td width="12%">审批节点</td>
<td width="15%">意见时间</td>
<td width="10%">审批人</td>
<td width="10%">意见标识</td>
<td>审批意见</td>
</tr>
<%
if(vectComment==null||vectComment.isEmpty()){
%>
<tr class=trclass><td colspan='6'>没有业务意见信息</td></tr>
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

<fieldset><legend align="right" style="font-style:italic">&nbsp;&nbsp;当前审批步骤：【<%=nodename %>】&nbsp;&nbsp;当前办理人：【<%=username %>】&nbsp;&nbsp;</legend>
<b>我的流程意见</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
意见标识：<select id="suggestSign_wf" name="suggestSign_wf" style="width:150">
<option value="">---请选择---</option>
<option value="同意">同意</option>
<option value="否决">否决</option>
<option value="打回">打回</option>
<option value="退回">退回</option>
<option value="在审">在审</option>
<option value="">无</option></select><br>
<textarea  id="suggestContent_wf" name="suggestContent_wf" rows="5" cols="100" style="background-color:#F7FEA5"></textarea><br>
<input type="checkbox" id="suggestControl_wf" name="suggestControl_wf" value="1" checked=true onchange="change_wf()">所有流程参与者可读<br><br>

<b>我的业务意见</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
意见标识：<select id="suggestSign_biz" name="suggestSign_biz" style="width:150">
<option value="">---请选择---</option>
<option value="同意">同意</option>
<option value="否决">否决</option>
<option value="打回">打回</option>
<option value="退回">退回</option>
<option value="在审">在审</option>
<option value="">无</option></select><br>
<textarea id="suggestContent_biz" name="suggestContent_biz" rows="5" cols="100" style="background-color:#F7FEA5"></textarea><br>
<input type="checkbox" id="suggestControl_biz" name="suggestControl_biz" value="0" onchange="change_biz()">所有流程参与者可读<br><br>
</fieldset><br>

	  <div align="center">
	
			<% if(actionMap!=null && actionMap.get("signin")!=null) {%>
				<input name="Submit42" type="button" class="button" value="签　　收" onClick="submitForm('signin')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("signoff")!=null) {%>
				<input name="Submit42" type="button" class="button" value="撤销签收" onClick="submitForm('signoff')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("tasksignoff")!=null) {%>
				<input name="Submit42" type="button" class="button" value="放回任务池" onClick="submitForm('tasksignoff')">
			<%}%>
			<%if(actionMap!=null && actionMap.get("save")!=null) {%>	    
			<input type="button" name="submit12" value="保　　存"  class="button" onClick="submitForm('save')">
			<%}	%>			
			<%if(actionMap!=null && actionMap.get("submit")!=null) {%>	
			  <input type="button" name="submit12" value="提　　交"  class="button" onClick="doSubmit()">
			<%}%>
			<% if(actionMap!=null && actionMap.get("change")!=null) {%>
				<input name="Submit422" type="button"  value="转　　办" class="button" onClick="doChange()">
			<%}%>
			<% if(actionMap!=null && actionMap.get("announce")!=null) {%>
				<input name="Submit422" type="button"  value="抄　　送" class="button" onClick="doAnnounce()">
			<%}%>
			<% if(actionMap!=null && actionMap.get("assist")!=null) {%>
				<input name="Submit422" type="button"  value="审批协助" class="button" onClick="doAssist()">
			<%}%>
			<%if(actionMap!=null && actionMap.get("urge")!=null) {%>
				<input name="Submit322" type="button" class="button" value="催　　办"onClick="submitForm('urge','')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("again")!=null) {%>
				<input name="Submit31" type="button" class="button" value="拿　　回"  onClick="submitForm('redo')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("cancel")!=null) {%>
				<input name="Submit32" type="button" class="button" value="撤　　办"   onClick="submitForm('undo')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("returnback")!=null) {%>
				<input name="Submit42" type="button" class="button" value="退　　回"   onClick="submitForm('back')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("hang")!=null) {%>
				<input name="Submit423" type="button" class="button" value="挂　　起"  onClick="submitForm('hang')" width="2" size="2">
			<%}%>
			<% if(actionMap!=null && actionMap.get("wake")!=null) {%>
				<input name="Submit42" type="button" class="button" value="唤　　醒" onClick="submitForm('aweak')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("callback")!=null) {%>
				<input name="Submit42" type="button" class="button" value="打　　回" onClick="doCallback()">				
			<%}%>
			<% if(actionMap!=null && actionMap.get("jump")!=null) {%>
				<input name="Submit42" type="button" class="button" value="跳　　转" onClick="doJump()">				
			<%}%>
			<% if(actionMap!=null && actionMap.get("gather")!=null) {%>
				<input name="Submit43" type="button" class="button" value="发起会办" onClick="doGather()">	
			<%}%>
			
	  </div>
	  
</form>
</body></html>
