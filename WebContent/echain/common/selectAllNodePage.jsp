<%@page language="java" contentType="text/html; charset=utf-8"%>
<%@ page import="java.lang.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.ecc.echain.workflow.engine.*" %>
<%
WorkFlowClient wfc=WorkFlowClient.getInstance();
String instanceid = request.getParameter("instanceid");
String nodeid = request.getParameter("nodeid");
String currentuserid=request.getParameter("userid");
if(currentuserid==null||currentuserid.length()==0)
	currentuserid=(String)request.getSession().getAttribute("s_userid");	
EVO evo=new EVO();
evo.setInstanceID(instanceid);
evo.setNodeID(nodeid);
evo.setCurrentUserID(currentuserid);
Map map=wfc.getWFNodeList(evo);//哈希表里面对应节点id、节点名称；
StringBuffer userselhtml=new StringBuffer();//选择人员的html代码，可能是单选框、多选框、文本框
%>
<HTML>
<HEAD>
<TITLE>下一步骤、办理人选择</TITLE>
<META http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript">
	function retSuc(){
		var retObj = [];
		retObj[0] = true;
		var node = null;
		var list = document.getElementsByName("nodeid");
		for(var i=0;i<list.length;i++){
			if(list[i].checked){
				node = list[i].value;
				break;
			}
		}
		if(node == null){
			alert("请选择下一节点");
			return;
		}
		retObj[1] = node;		
		var user=document.getElementById("seluser").value;
		if(user==null||user==""){
			list = document.getElementsByName("userid");
			for(var i=0;i<list.length;i++){
				if(!list[i].checked)
					continue;
				if(user == null)
					user = list[i].value;
				else
					user = user + ";" + list[i].value;
			}
		}		
		retObj[2] = user;		
		window.returnValue = retObj;
		window.close();
	};
	
	function retFail(){
		var retObj = [];
		retObj[0] = false;
		window.returnValue = retObj;
		window.close();
	};
	
	function showNodeDiv(){
		var list = document.getElementsByName("nodeid");
		for(var i=0;i<list.length;i++){
			var divid = list[i].value + "NodeDiv";
			var divObj = document.getElementById(divid);
			if(divObj == null)
				continue;
			if(list[i].checked)
				divObj.style.display = "block";
			else
				divObj.style.display = "none";
		}
	}

//选择用户
function selUser(count){
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
	if(retObj[2] != null)
		document.getElementById("userid2").value = retObj[2];
		
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
<BODY>
<input type="hidden" id="seluser" value=""/>
<div class="selectNextNodeStyle">
<table border="0" width="550px" cellspacing="1" cellpadding="0" bgcolor="000000">
	<tr>
		<td width="40%" class="tdtitle">请选择下一节点</td>
		<td width="60%" class="tdtitle">请选择下一处理人</td>
	</tr>
	<tr>
		<td class="td">
		<%
			if(map!=null&&!map.isEmpty()){
				Iterator it = map.keySet().iterator();
				Map node;
				EVO evouser;
				String multeitFlag;//1:单人办理； * n：多人办理；
				String userId,userName,nodename;
				while(it.hasNext()){
					nodeid = (String)it.next();
					nodename=(String)map.get(nodeid);
					evo=new EVO();
					evo.setInstanceID(instanceid);
					evo.setNodeID(nodeid);
					evo.setCurrentUserID(currentuserid);
					evouser=wfc.getNodeUserList(evo);
					multeitFlag=evouser.getMulteitFlag();
					out.println("<input type=\"radio\" name=\"nodeid\" value=\""+ nodeid+ "\" onclick=\"showNodeDiv()\">"+ nodename+ "<br/>");	
					userselhtml.append("<div id=\""+nodeid+"NodeDiv\" style=\"display:none\">\n");	
					if (evouser.isExb())//选择所有人
						if (multeitFlag==null||multeitFlag.equals("1"))
							userselhtml.append("<input type=\"text\" id=\"userid2\" name=\"userid2\" value=\"\" readonly=true/>&nbsp;&nbsp;<a href=# onclick=\"selUser('1')\">选择</a><br/>");
						else
							userselhtml.append("<input type=\"text\" id=\"userid2\" name=\"userid2\" value=\"\" readonly=true/>&nbsp;&nbsp;<a href=# onclick=\"selUser('n')\">选择</a><br/>");
					else{
						Iterator it2 = evouser.paramMap.keySet().iterator();
						while(it2.hasNext()){
							userId = (String)it2.next();
							userName=(String)evouser.paramMap.get(userId);
							if (!userId.startsWith("U."))
								continue;
							else if (multeitFlag==null||multeitFlag.equals("1"))
								userselhtml.append("<input type=\"radio\" name=\"userid\" value=\"" + userId + "\">" + userName+"<br/>");
							else
								userselhtml.append("<input type=\"checkbox\" name=\"userid\" value=\"" + userId + "\">" + userName+"<br/>");
						}
					}						
					userselhtml.append("</div>");
				}
			}
		%>
		</td>
		<td class="td"><%=userselhtml.toString()%></td>
	</tr>
</table>
<br></div>
<center>
<input type="button" class="button" value="确  定" onclick="retSuc()">&nbsp;&nbsp;
<input type="button" class="button" value="取  消" onclick="retFail()"></center>
</BODY>
</HTML>
