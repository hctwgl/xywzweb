<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.ecc.echain.org.*"%>
<%@ page import="com.ecc.echain.org.model.*"%>
<%
OrgModel rootOrgModel=OrgFactory.getInstance().getOrgClass().getRootOrg(null);//读取根机构
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
</style>
<script type="text/javascript" language="javascript">
function getUser(id){
     document.getElementById("selecteddiv").innerHTML="<br><select name='PrepareSelected' multiple size='12' style='height:480px;width:400'></select> <br><br>";
	 $.ajax({
			type:"post",
			url:"<%=request.getContextPath()%>/echaincommonservlet",	
			data:{"method":"echaincommon","actionType":"selectuser","kind":"getyh","orgid":id},				
			success:function(returnData){
				var html="<select name='PrepareSelected' multiple size='12' style='height:480px;width:400'>";
				$.each(returnData,function(i,p){
					html+="<option value='"+p[0]+"'>"+p[1]+"</option>"
				});
				html+="	</select>";
				document.getElementById("selecteddiv").innerHTML=html;
			}
	 });
}
     
</script>
<body>
<!-- 左侧菜单+主区域 -->
<table width="100%" border="0" cellspacing="1" cellpadding="0" bgcolor="#000000">
	<tr>
		<td width="250" align="center" valign="top" bgcolor="#e3e4e3">
			<div id="leftMenuBar" style="height:500px; width:250; overflow: auto; text-align: left;">
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
		<td width="400" align="left" valign="top"  bgcolor="#ffffff">
			<fieldset><legend align="center" style="font-size:9pt">机构下用户</legend>
				<div id="selecteddiv">
					<select name='PrepareSelected' multiple size='12' style="height:480px;width:400"></select>
				</div>
			</fieldset>
		</td>
	</tr>
</table>
</body>
</html>
