<%@page language="java" contentType="text/html; charset=utf-8"%>
<%@ page import="java.lang.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.ecc.echain.workflow.engine.*" %>
<%
CIBWorkFlowClient wfc = CIBWorkFlowClient.getInstance();
String instanceid = request.getParameter("instanceid");
String nodeid = request.getParameter("nodeid");
String currentuserid=request.getParameter("userid");
if(currentuserid==null||currentuserid.length()==0)
	currentuserid=(String)request.getSession().getAttribute("s_userid");	
EVO evo=new EVO();
evo.setInstanceID(instanceid);
evo.setNodeID(nodeid);
evo.setCurrentUserID(currentuserid);
String[] handlerHTML=wfc.getNodeHandlerHTML(evo);
%>



<%@page import="com.ecc.echain.ebank.cib.CIBWorkFlowClient"%><HTML>
<HEAD>
<TITLE>下一步骤、办理人选择</TITLE>
<META http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">
A{font-size:9pt}
BODY{font-size:9pt}
.selectNextNodeStyle {
	margin-left: 20px;
	margin-top: 20px;
}
.selectNextNodeStyle2 {
	margin-left: 20px;
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

<script type="text/javascript">
	function retSuc(){
		var retObj = [];
		retObj[0] = true;
		var node = null;
		var usertmp = null;
		var user =null;
		var roletmp = null;
		var role = null;
		//取所有节点
		var list = document.getElementsByName("nodeid");
		var listuser=null;
		for(var i=0;i<list.length;i++){
			if(!list[i].checked)
				continue;
			if(node == null)
				node = list[i].value;
			else
				node = node + "@" + list[i].value;

			//取节点下所有角色
			var roleList = document.getElementsByName(list[i].value+"roleid");
			
			roletmp = null;
			for(var k=0; k<roleList.length; k++){
				if(!roleList[k].checked)
					continue;

				if(roletmp==null)
					roletmp = roleList[k].value;
				else
					roletmp = role + ";" + roleList[k].value;

				usertmp=null;
				
				//取角色下所有人员
				if(roleList[k].value=="eChainOtherRole"){
					//CIB只有其它角色才可以选所有人
					usertmp = document.getElementById("seluser").value;
				}else{
					//取用户选择的人员
					listuser = document.getElementsByName(list[i].value+"_"+roleList[k].value+"_userid");
					for(var j=0;j<listuser.length;j++){
						if(!listuser[j].checked)
							continue;
						if(usertmp == null)
							usertmp = listuser[j].value;
						else
							usertmp = usertmp + ";" + listuser[j].value;
					}
				}
				if(user==null||user=="")
					user=usertmp;
				else
					user=user+"@"+usertmp;
			}

			if(role==null || role == "") 
				role = roletmp;
			else
				role = roletmp + "@" + roletmp;
		}
		
		if(node == null){
			alert("请选择下一节点");
			return;
		}
		var annouceUser = document.getElementById("annouceUserID").value;
		if(annouceUser!=null && annouceUser!="")
			retObj[4] = annouceUser;
			
		retObj[1] = node;
		retObj[2] = user;
		retObj[3] = role;
		window.returnValue = retObj;
		window.close();
	};
	
	function retFail(){
		var retObj = [];
		retObj[0] = false;
		window.returnValue = retObj;
		window.close();
	};

	//点击节点出角色
	function showNodeDiv(){
		var list = document.getElementsByName("nodeid");
		for(var i=0;i<list.length;i++){
			var divid = list[i].value + "NodeDiv";
			var divObj = document.getElementById(divid);
			if(divObj == null)
				continue;
			if(list[i].checked){
				//显示角色DIV
				divObj.style.display = "block";
				//显示已选角色下的人员
				var roleid = list[i].value+"roleid";
				var roleList = document.getElementsByName(roleid);
				for(var j=0; j<roleList.length; j++){
					if(roleList[j].checked){
						var divUser = document.getElementById(list[i].value+roleList[j].value+"RoleDiv");
						if(divUser == null)
							continue;
						divUser.style.display="block";
					}
				}
			}
			else{
				divObj.style.display = "none";
				//需同时将角色下人员隐藏
				var roleid = list[i].value+"roleid";
				var roleList = document.getElementsByName(roleid);
				for(var j=0; j<roleList.length; j++){
					var roleValue = roleList[j].value;
					var divUser = document.getElementById(list[i].value+roleValue+"RoleDiv");
					if(divUser == null)
						continue;
					divUser.style.display="none";
				}
			}
		}
	}

	//点击角色出人员
	function showRoleDiv(){
		var list = document.getElementsByName("nodeid");
		for(var i=0;i<list.length;i++){
			if(!list[i].checked)
				continue;
			var nodeValue = list[i].value;
			var roleList = document.getElementsByName(nodeValue+"roleid");
			for(var j=0;j<roleList.length;j++){
				var divid = nodeValue+roleList[j].value + "RoleDiv";
				var divObj = document.getElementById(divid);
				if(divObj == null)
					continue;
				if(roleList[j].checked)
					divObj.style.display = "block";
				else
					divObj.style.display = "none";
			}
		}
	}

	//其它角色
	function showOtherRoleDiv(nodeid,roleid){
		//关闭其它角色下用户DIV
		showRoleDiv();
		//所有人选择页面
		var contextPath="<%=request.getContextPath()%>";
		var url = contextPath+"/echain/common/selectUser.jsp?&count=1";
		var retObj2 = window.showModalDialog(url,'selectPage','dialogHeight:420px;dialogWidth:610px;help:no;resizable:no;status:no;');
		
		//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
		if(retObj2 == null)
			return;
		var status = retObj2[0];
		if(status != true)
			return;
		if(retObj2[1] != null){
			var retObj = [];

			if(nodeid==null){
				alert("请选择下一节点");
				return ;
			}
			retObj[0] = true;
			retObj[1] = nodeid;
			retObj[2] = "U."+retObj2[1];
			retObj[3] = "R."+roleid;	
			window.returnValue = retObj;
			window.close();	
		}
		
	}
	

//选择用户
function selUser(nodeid,roleid,count){
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/common/selectUser.jsp?&count="+count;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:420px;dialogWidth:610px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	if(retObj[1] != null){
		if(retObj[1].indexOf(";")!=-1){//返回多值
			var list=retObj[1].split(";");
			var seluser="";
			for(var i=0;i<list.length;i++){
				if(i>0)
					seluser+=";U."+list[i];
				else
					seluser+="U."+list[i];
			}
			document.getElementById("seluser").value =seluser;
		}else{
			document.getElementById("seluser").value = "U."+retObj[1];
		}
	}
	if(retObj[2] != null){
		document.getElementById(nodeid+"_"+roleid+"_userid").value = retObj[2];		
	}
}

//选择抄送人员
function doSelAnnouces(){
	var contextPath="<%=request.getContextPath()%>";
	//打开选择处理人的界面
	var url = contextPath+"/echain/common/selectUser.jsp?&count=n";
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:430px;dialogWidth:610px;help:no;resizable:no;status:no;');
		
	//返回数组:[状态:true/false;意见;下一节点;下一处理人];若没有返回值,或返回状态不为true,则表示取消
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;
	if(retObj[1] != null){
		if(retObj[1].indexOf(";")!=-1){//返回多值
			var list=retObj[1].split(";");
			var seluser="";
			for(var i=0;i<list.length;i++){
				if(i>0)
					seluser+=";U."+list[i];
				else
					seluser+="U."+list[i];
			}
			document.getElementById("annouceUserID").value =seluser;
		}else{
			document.getElementById("annouceUserID").value = "U."+retObj[1];
		}
	}
	if(retObj[2] != null){
		var annNames = retObj[2];
		document.getElementById("annouceUserName").value = annNames;
	}
}

//展开抄送人员DIV
function doOpenAnn(){
	var imgAnn = document.getElementById("openAnnounce");
	var alt = imgAnn.alt;
	isOpen = imgAnn.isOpen;

	if(isOpen=="false"){
		imgAnn.alt="收起";
		imgAnn.src="<%=request.getContextPath()%>/echain/images/up.png";
		document.getElementById("announceUser").style.display="";
		imgAnn.isOpen="true";
	}else{
		imgAnn.alt="展开";
		imgAnn.src="<%=request.getContextPath()%>/echain/images/down.png";
		document.getElementById("announceUser").style.display="none";
		imgAnn.isOpen="false";
	}
		
}

//关闭抄送人员DIV
function doCloseAnn(){
	document.getElementById("announceUser").style.display="none";
	document.getElementById("closeAnnounce").style.display="none";
	document.getElementById("openAnnounce").style.display="";
}

</script>

</HEAD>
<BODY>
<input type="hidden" id="seluser" value=""/>
<div class="selectNextNodeStyle">

<table border="0" width="550px" cellspacing="1" cellpadding="0" bgcolor="000000">
	<tr>
		<td width="30%" class="tdtitle">请选择下一节点</td>
		<td width="35%" class="tdtitle">请选择下一角色</td>
		<td width="35%" class="tdtitle">请选择下一处理人</td>
	</tr>
	<tr>
		<td class="td"><%=handlerHTML[0] %></td>
		<td class="td"><%=handlerHTML[1]%></td>
		<td class="td"><%=handlerHTML[2]%></td>
	</tr>
</table>
</div>

<img id="openAnnounce" alt="展开" isOpen="false" style="margin-left: 20px;" src="<%=request.getContextPath()%>/echain/images/down.png" onclick="doOpenAnn()">
<div style="display:none" id="announceUser" class="selectNextNodeStyle2">
	<table border="0" width="550px" cellspacing="1" cellpadding="0" bgcolor="000000">
		<tr>
			<td class="tdtitle">请选择抄送人员</td>
		</tr>
		<tr>
			<td class="td">
				<input type="text" id="annouceUserName" name="annouceUserName" style="width:350px" readonly="readonly">
					<a href="#" onclick="doSelAnnouces()">选择</a>
				<input type="hidden" id="annouceUserID" name="annouceUserID">
			</td>
		</tr>
	</table>
</div>

<center>
<input type="button" class="button" value="确  定" onclick="retSuc()">&nbsp;&nbsp;
<input type="button" class="button" value="取  消" onclick="retFail()"></center>
</BODY>
</HTML>
