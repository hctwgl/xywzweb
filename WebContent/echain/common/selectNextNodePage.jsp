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
EVO evonode=wfc.getNextNodeList(evo);
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
		var usertmp = null;
		var user =null;
		var list = document.getElementsByName("nodeid");
		var listuser=null;
		for(var i=0;i<list.length;i++){
			if(!list[i].checked)
				continue;
			if(node == null)
				node = list[i].value;
			else
				node = node + "@" + list[i].value;
			usertmp=null;
			if(document.getElementById(list[i].value+"_userid_id")){
				usertmp=document.getElementById(list[i].value+"_userid_id").value;
			}else{
				listuser = document.getElementsByName(list[i].value+"_userid");		
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
		if(node == null){
			alert("请选择下一节点");
			return;
		}
		retObj[1] = node;
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
function selUser(nodeid,count){
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
		document.getElementById(nodeid+"_userid_id").value =document.getElementById("seluser").value;
	}
	if(retObj[2] != null){
		document.getElementById(nodeid+"_userid").value = retObj[2];		
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
			if(evonode.paramMap!=null&&!evonode.paramMap.isEmpty()){
				String nodeRouterType=evonode.getNodeRouterType();//“0”一般处理；“1”单选处理；“2”多选处理；3.条件单选处理;4.条件多选处理
				Iterator it = evonode.paramMap.keySet().iterator();
				Map node;
				EVO evouser;
				String multeitFlag;//1:单人办理； * n：多人办理；
				String userId,userName;
				boolean ifselectuser=true;//下一节点是否可以选择用户
				while(it.hasNext()){
					nodeid = (String)it.next();
					node=(Map)evonode.paramMap.get(nodeid);
					ifselectuser=true;//下一节点是否可以选择用户
					if(node!=null&&node.get("ifselectuser").toString().equals("0"))
						ifselectuser=false;
					evo=new EVO();
					evo.setInstanceID(instanceid);
					evo.setNodeID(nodeid);
					evo.setCurrentUserID(currentuserid);
					evouser=wfc.getNodeUserList(evo);
					multeitFlag=evouser.getMulteitFlag();
					if (evonode.paramMap.size() == 1){//后续只有一个路由
						out.println("<input type=\"radio\" name=\"nodeid\" value=\"" 
							+ (String)node.get("nodeid") 
							+ "\" checked>" 
							+ (String)node.get("nodename")+"<br/>");
						if(!ifselectuser){
							//无需选择用户
						}else if(evouser.isExb()){//选择所有人
							userselhtml.append("<input type=\"hidden\" id=\""+nodeid+"_userid_id\" name=\""+nodeid+"_userid_id\"/>");
							if (multeitFlag==null||multeitFlag.equals("1"))
								userselhtml.append("<input type=\"text\" id=\""+nodeid+"_userid\" name=\""+nodeid+"_userid\" value=\"\" readonly=true/>&nbsp;&nbsp;<a href=# onclick=\"selUser('"+nodeid+"','1')\">选择</a><br/>");
							else
								userselhtml.append("<input type=\"text\" id=\""+nodeid+"_userid\" name=\""+nodeid+"_userid\" value=\"\" readonly=true/>&nbsp;&nbsp;<a href=# onclick=\"selUser('"+nodeid+"','n')\">选择</a><br/>");
						}else{
							Iterator it2 = evouser.paramMap.keySet().iterator();
							while(it2.hasNext()){
								userId = (String)it2.next();
								userName=(String)evouser.paramMap.get(userId);
								if (multeitFlag==null||multeitFlag.equals("1"))
									userselhtml.append("<input type=\"radio\" name=\""+nodeid+"_userid\" value=\"" 
									+ userId + "\">" + userName+"<br/>");
								else
									userselhtml.append("<input type=\"checkbox\" name=\""+nodeid+"_userid\" value=\"" 
									+ userId + "\">" + userName+"<br/>");
							}
						}
						
					}else if(nodeRouterType==null||nodeRouterType.equals("0")||nodeRouterType.equals("1")||nodeRouterType.equals("3")){//单选
						out.println("<input type=\"radio\" name=\"nodeid\" value=\""
							+ (String)node.get("nodeid")
							+ "\" onclick=\"showNodeDiv()\">"
							+ (String)node.get("nodename")
							+ "<br/>");	
						userselhtml.append("<div id=\""+nodeid+"NodeDiv\" style=\"display:none\">\n");	
						if(!ifselectuser){
							//无需选择用户
						}else if(evouser.isExb()){//选择所有人
							userselhtml.append("<input type=\"hidden\" id=\""+nodeid+"_userid_id\" name=\""+nodeid+"_userid_id\"/>");
							if (multeitFlag==null||multeitFlag.equals("1"))
								userselhtml.append("<input type=\"text\" id=\""+nodeid+"_userid\" name=\""+nodeid+"_userid\" value=\"\" readonly=true/>&nbsp;&nbsp;<a href=# onclick=\"selUser('"+nodeid+"','1')\">选择</a><br/>");
							else
								userselhtml.append("<input type=\"text\" id=\""+nodeid+"_userid\" name=\""+nodeid+"_userid\" value=\"\" readonly=true/>&nbsp;&nbsp;<a href=# onclick=\"selUser('"+nodeid+"','n')\">选择</a><br/>");
						}else{
							Iterator it2 = evouser.paramMap.keySet().iterator();
							while(it2.hasNext()){
								userId = (String)it2.next();
								userName=(String)evouser.paramMap.get(userId);
								if (multeitFlag==null||multeitFlag.equals("1"))
									userselhtml.append("<input type=\"radio\" name=\""+nodeid+"_userid\" value=\"" 
									+ userId + "\">" + userName+"<br/>");
								else
									userselhtml.append("<input type=\"checkbox\" name=\""+nodeid+"_userid\" value=\"" 
									+ userId + "\">" + userName+"<br/>");
							}
						}						
						userselhtml.append("</div>");
					}else{//多选
						out.println("<input type=\"checkbox\" name=\"nodeid\" value=\"" 
							+ (String)node.get("nodeid")
							+ "\" onclick=\"showNodeDiv()\">"
							+ (String)node.get("nodename")
							+ "<br/>");
						userselhtml.append("<div id=\""+nodeid+"NodeDiv\" style=\"display:none\">\n");
						userselhtml.append("<fieldset><legend>"+(String)node.get("nodename")+"办理人</legend>");
						if(!ifselectuser){
							//无需选择用户
						}else if(evouser.isExb()){//选择所有人
							userselhtml.append("<input type=\"hidden\" id=\""+nodeid+"_userid_id\" name=\""+nodeid+"_userid_id\"/>");
							if (multeitFlag==null||multeitFlag.equals("1"))
								userselhtml.append("<input type=\"text\" id=\""+nodeid+"_userid\" name=\""+nodeid+"_userid\" value=\"\" readonly=true/>&nbsp;&nbsp;<a href=# onclick=\"selUser('"+nodeid+"','1')\">选择</a><br/>");
							else
								userselhtml.append("<input type=\"text\" id=\""+nodeid+"_userid\" name=\""+nodeid+"_userid\" value=\"\" readonly=true/>&nbsp;&nbsp;<a href=# onclick=\"selUser('"+nodeid+"','n')\">选择</a><br/>");
						}else{
							Iterator it2 = evouser.paramMap.keySet().iterator();
							while(it2.hasNext()){
								userId = (String)it2.next();
								userName=(String)evouser.paramMap.get(userId);
								if (multeitFlag==null||multeitFlag.equals("1"))
									userselhtml.append("<input type=\"radio\" name=\""+nodeid+"_userid\" value=\"" 
									+ userId + "\">" + userName+"<br/>");
								else
									userselhtml.append("<input type=\"checkbox\" name=\""+nodeid+"_userid\" value=\"" 
									+ userId + "\">" + userName+"<br/>");
							}
						}
						userselhtml.append("</fieldset><br/>");
						userselhtml.append("</div>");
					}
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
