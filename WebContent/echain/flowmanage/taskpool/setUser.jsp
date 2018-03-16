<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.ecc.echain.org.*"%>
<%@ page import="com.ecc.echain.org.model.*"%>
<%@ page import="com.ecc.echain.ext.TaskPool" %>
<%
String orgid=(String)request.getSession().getAttribute("s_orgid");
String count=request.getParameter("count");//1单选；n多选
String tpid=request.getParameter("tpid");
OrgModel rootOrgModel=OrgFactory.getInstance().getOrgClass().getRootOrg(null);//读取根机构
Map hm=new TaskPool().queryUser(orgid,tpid);
%>
<html>
<head>
<script type="text/javascript" src="<%=request.getContextPath() %>/echain/common/jquery-1.4.4.js"></script>
<link type="text/css" rel="stylesheet"	href="<%=request.getContextPath() %>/echain/common/xtree/css/xtree2.css">
<script type="text/javascript"	src="<%=request.getContextPath() %>/echain/common/xtree/js/xtree2.js"></script>
<script type="text/javascript"	src="<%=request.getContextPath() %>/echain/common/xtree/js/xloadtree2.js"></script>
<style type='text/css'>
A{font-size:9pt}
BODY{font-size:9pt}
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
</style>
<script type="text/javascript" language="javascript">
var cout="<%=count %>";
function retSuc(){
	var retObj = [];
	retObj[0] = true;
	var userid = null;
	var username = null;
	var attribute= document.form1.formid;
	for (var i = 0; i < attribute.length; i++){
		if(userid==null){
			userid= attribute.options[i].value;
			username= attribute.options[i].text;
		}
	    else{
			userid=userid+";"+attribute.options[i].value;
			username=username+";"+attribute.options[i].text;
		}
	}
	if(userid==null||userid==""){
		alert("您没有选择用户");
		return;
	}
	retObj[1] = userid;
	retObj[2] = username;
	window.returnValue = retObj;
	window.close();
};
	
function retFail(){
	var retObj = [];
	retObj[0] = false;
	window.returnValue = retObj;
	window.close();
};

function move(side){
	var temp1 = new Array();
	var tempa = new Array();
	var current1 = 0;
	var y=0;
	attribute1 = document.form1.PrepareSelected;
    attribute2 = document.form1.formid;
	if (side == "in"){
		for (var i = 0; i < attribute2.length; i++){
	 		y=current1++;
	 		temp1[y] = attribute2.options[i].value;
	 		tempa[y] = attribute2.options[i].text;
        }		
	 	for (var i = 0; i < attribute1.length; i++){  
	        if(cout=='1'){
				if(attribute1.options[i].selected){
					temp1 = new Array();
					tempa = new Array();
					temp1[0]=attribute1.options[i].value;
					tempa[0]=attribute1.options[i].text;
					break;
				}
	        }else{
				var m=1;
				for(var j=0;j<temp1.length;j++){
					if(!attribute1.options[i].selected||attribute1.options[i].value==temp1[j] ){
						 m=0;
						break;
					}
				}
				if(m==1&&attribute1.options[i].selected){
					y=current1++;
					temp1[y] = attribute1.options[i].value;
					tempa[y] = attribute1.options[i].text;
				}
	       }
	    }
	}else{
		for (var i = 0; i < attribute2.length; i++){
		   if(!attribute2.options[i].selected ){
				y=current1++;
				temp1[y] = attribute2.options[i].value;
				tempa[y] = attribute2.options[i].text;
		   }
	    }
	    for(var i = 0; i < attribute2.length; i++){
	         attribute2[i]=null;
	    }
	}
	for (var i = 0; i < temp1.length; i++){
	 	  attribute2.options[i] = new Option();
	 	  attribute2.options[i].value = temp1[i];
	 	  attribute2.options[i].text =  tempa[i];
	}
}

function getUser(id){
     document.getElementById("selecteddiv").innerHTML="<br><select name='PrepareSelected' multiple size='12' style='width:250'  onDblclick='move(\"in\");'></select> <br><br>";
	 $.ajax({
			type:"post",
			url:"<%=request.getContextPath()%>/echaincommonservlet",	
			data:{"method":"echaincommon","actionType":"selectuser","kind":"getyh","orgid":id},				
			success:function(returnData){
				var html="<select name='PrepareSelected' multiple size='12' style='height:320px;width:180'  onDblclick='move(\"in\");'>";
				$.each(returnData,function(i,p){
					html+="<option value='"+p[0]+"'>"+p[1]+"</option>";
				});
				html+="	</select>";
				document.getElementById("selecteddiv").innerHTML=html;
			}
	 });
}
//初始化选择用户
function inituser(){
	var html="<select name='formid' multiple size='12' style='height:320px;width:180' onDblclick='move(\"out\")'>";
<%
String userid,username;
if(hm!=null&&!hm.isEmpty()){
	Iterator it=hm.keySet().iterator();
	while(it.hasNext()){
		userid=(String)it.next();
		username=(String)hm.get(userid);
		out.print("html+='<option value=\""+userid+"\">"+username+"</option>';");
	}
}
%>
	html+="	</select>";
	document.getElementById("seldiv").innerHTML=html;
} 
</script>
<body onload="inituser()">
<!-- 左侧菜单+主区域 -->
<table width="100%" border="0" cellspacing="1" cellpadding="0" bgcolor="#000000">
	<tr>
		<td width="200" align="center" valign="top" bgcolor="#e3e4e3">
			<div id="leftMenuBar" style="height:350px; width: 150; overflow: auto; text-align: left;">
				<script type="text/javascript">
	  //xtree
	    var path='<%=request.getContextPath()%>/echain/common/xtree/images/';
      	webFXTreeConfig.rootIcon        =path+"folder.png",
	    webFXTreeConfig.openRootIcon    =path+"openfolder.png",
	    webFXTreeConfig.folderIcon      = path+"folder.png",
	    webFXTreeConfig.openFolderIcon  = path+"openfolder.png",
	    webFXTreeConfig.fileIcon        = path+"dot.png",
	    webFXTreeConfig.iIcon           = path+"I.png",
	    webFXTreeConfig.lIcon           = path+"L.png",
	    webFXTreeConfig.lMinusIcon      = path+"Lminus.png",
	    webFXTreeConfig.lPlusIcon       = path+"Lplus.png",
	    webFXTreeConfig.tIcon           = path+"T.png",
	    webFXTreeConfig.tMinusIcon      = path+"Tminus.png",
	    webFXTreeConfig.tPlusIcon       = path+"Tplus.png",
	    webFXTreeConfig.plusIcon        = path+"plus.png",
	    webFXTreeConfig.minusIcon       = path+"minus.png",
	    webFXTreeConfig.blankIcon       = path+"blank.png",
        webFXTreeConfig.loadingIcon     =path+"loading.gif";
        var tree = new WebFXTree("root");
<%    
		if(rootOrgModel!=null){
			out.print("tree.add(new WebFXLoadTreeItem(\""+rootOrgModel.getOrgname()+"\",\""+request.getContextPath()+"/echaincommonservlet?method=echaincommon&actionType=selectuser&kind=getjg&orgid="+rootOrgModel.getOrgid()+"\",\"javascript:getUser('"+rootOrgModel.getOrgid()+"');\"));	");	 
		}
%>;
	     tree.indentWidth = 19;
         tree.open = true;//节点打开状态，true为打开
         tree._selectedItem = null;
         tree._fireChange = true;
         tree.rendered = false;
         tree.suspendRedraw = false;
         tree.showLines = true;//连线显示状态，true为显示
         tree.showExpandIcons = true;//扩展和收缩图标显示状态，true为显示
         tree.showRootNode = false;//根节点显示状态，true为显示
         tree.showRootLines = false;//根节点连线显示状态，true为显示
         tree.write();
				</script>
			</div>
		</td>

		<!-- 右侧的主工作区域 -->
		<td width="450" align="left" valign="top"  bgcolor="#ffffff">
		<form NAME="form1">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td width="45%" align="center" valign="top">
						<fieldset><legend align="center" style="font-size:9pt">可选用户</legend>
							<div id="selecteddiv">
								<select name='PrepareSelected' multiple size='12' style='height:320px;width:180' onDblclick="move('in');"></select>
							</div>
						</fieldset>
						</td>
						<td width="10%" align="center">
							<input name="save2" type="button" class="button" value=">>>" onclick="move('in');"><br><br>
							<input name="save22" type="button" class="button" value="<<<" onclick="move('out');">
						</td>
						<td width="45%" align="center" valign="top">
						<fieldset><legend align="center" style="font-size:9pt">已选用户</legend>
							<div id="seldiv">
								<select name="formid" multiple size="12" style="height:320px;width:180" onDblclick="move('out');"></select>
							</div>
						</fieldset>
						</td>
					</tr>
				</table>
			</form>
		</td>
	</tr>
</table>
<br>
<center>
	<input type="button" class="button" value="确　　定" onclick="retSuc()">&nbsp;&nbsp; 
	<input type="button" class="button" value="取　　消" onclick="retFail()">
</center>
</body>
</html>
