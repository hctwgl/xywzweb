<%@ page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.cache.WFCache" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%@ page import="com.ecc.echain.workflow.engine.WorkFlowClient" %>
<%@ page import="com.ecc.echain.workflow.model.*" %>
<%
String instanceid = request.getParameter("instanceid");
String nodeid = request.getParameter("nodeid");

Vector vectComment = (Vector)request.getAttribute("vectComment");
//Vector[] vectSubComment = (Vector[])request.getAttribute("vectSubComment");
Map subMap = (Map)request.getAttribute("vectSubComment");

%>
<html>
<head>
<title>eChain流程演示</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script language="javascript">
	function doSave(){
		document.forms[0].actionType.value="lcyj_save";
		document.forms[0].submit();
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
	
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/cibServlet">
<input type="hidden" id="method" name="method" value="echainflowdemo">
<input type="hidden" id="instanceid" name="instanceid" value="<%=instanceid%>"/>
<input type="hidden" id="nodeid" name="nodeid" value="<%=nodeid%>"/>
<input type="hidden" id="actionType" name="actionType" />
<jsp:include flush="true" page="/echain/common/showta.jsp"/>

<fieldset><legend>业务要素修改历史</legend>
<br>
<table class=tablemain cellspacing=1 cellpadding=0>
<tr class=trtitle>
<td width="5%">序号</td>
<td width="12%">审批节点</td>
<td width="10%">审批人</td>
<td>企业名称</td>
<td>业务品种</td>
<td>金额(币种)</td>
<td>期限</td>
<td>利率</td>
<td>担保方式</td>
<td>业务意见</td>
</tr>
<%
if(vectComment==null||vectComment.isEmpty()){
%>
<tr class=trclass><td colspan='10'>没有业务要素修改历史记录</td></tr>
<%
}else{
	CommentExtVO cevo;
	boolean tr = true;
	int k=0;
	for(int i=0;i<vectComment.size();i++){
		cevo=(CommentExtVO)vectComment.elementAt(i);
		if(cevo.getVa()==null && cevo.getVb()==null && cevo.getVc()==null && cevo.getVd()==null && cevo.getVe()==null && cevo.getVf()==null)
			continue;
	    if(tr){
			out.print("<tr class=trclass onmouseout='resumemenu()' onmouseover='invertmenu()'>");
		}else{
			out.print("<tr class=trclass2 onmouseout='resumemenu()' onmouseover='invertmenu()'>");
		}
	    k++;
%>
<td><%=k%></td>
<td><%=cevo.getNodeName()==null?"":cevo.getNodeName()%></td>
<td><%=cevo.getUserName()==null?"":cevo.getUserName()%></td>
<td><%=cevo.getVa()==null?"":cevo.getVa()%></td>
<td><%=cevo.getVb()==null?"":cevo.getVb()%></td>
<td><%=cevo.getVc()==null?"":cevo.getVc()%></td>
<td><%=cevo.getVd()==null?"":cevo.getVd()%></td>
<td><%=cevo.getVe()==null?"":cevo.getVe()%></td>
<td><%=cevo.getVf()==null?"":cevo.getVf()%></td>
<td><a href="#" onclick="showta('biz_<%=k%>')"><%=cevo.getVx()==null?"-":cevo.getVx().length()>30?cevo.getVx().substring(0,30)+"......":cevo.getVx()%></a></td>
<input type="hidden" id="biz_<%=k%>" value="<%=cevo.getVx()%>">
</tr>
<%
		tr=!tr;
	}
	if(k==0){
		
%>
	<tr class=trclass><td colspan='10'>没有业务要素修改历史记录</td></tr>
<%
	}
}
%>
</table><br></fieldset><br>





<fieldset><legend align="left" style="font-style:italic">&nbsp;&nbsp;业务要素修改&nbsp;&nbsp;</legend><br>

<table cellspacing=1 cellpadding=0>
	<tr>
		<td align="right" width="10%" >企业名称：</td> <td> <input type="text" name="va" style="background-color:#F7FEA5"> </td>
		<td align="right" width="10%">业务品种：</td> <td> <input type="text" name="vb" style="background-color:#F7FEA5"> </td>
		<td align="right" width="10%">金额（币种）：</td> <td> <input type="text" name="vc" style="background-color:#F7FEA5"> </td>
	</tr>
	
	<tr>
		<td align="right" width="10%">期限    ：</td> <td> <input type="text" name="vd" style="background-color:#F7FEA5"> </td>
		<td align="right" width="10%">利率    ：</td> <td> <input type="text" name="ve" style="background-color:#F7FEA5"> </td>
		<td align="right" width="10%">担保方式：</td> <td> <input type="text" name="vf" style="background-color:#F7FEA5"> </td>
	</tr>
	
	<tr>
		<td align="right" width="10%">业务意见：</td>
		<td colspan="3">
			<textarea name="vx" rows="4" cols="80" style="background-color:#F7FEA5"></textarea>
		</td>
	</tr>
	
</table><br>
</fieldset>
<br><br><br>

<%
//动态生成集团成员的业务要素修改历史
if(subMap!=null && subMap.keySet().size()>0){
	int i = 0;
	//for(int i=0; i<vectSubComment.length; i++){
	for(Iterator it = subMap.keySet().iterator();it.hasNext();){
		String key = (String)it.next();
		Vector subVect = (Vector)subMap.get(key);
%>
		<fieldset><legend><%=key %>的业务要素修改信息</legend>
			<br>
			<table class=tablemain cellspacing=1 cellpadding=0>
			<tr class=trtitle>
			<td width="5%">序号</td>
			<td width="12%">审批节点</td>
			<td width="10%">审批人</td>
			<td>企业名称</td>
			<td>业务品种</td>
			<td>金额(币种)</td>
			<td>期限</td>
			<td>利率</td>
			<td>担保方式</td>
			<td>业务意见</td>	
			</tr>
			<%
			if(vectComment==null||vectComment.isEmpty()){
			%>
			<tr class=trclass><td colspan='10'>没有业务要素修改历史记录</td></tr>
			<%
			}else{
				CommentExtVO subCevo;
				boolean tr = true;
				int k=0;
				for(int j=0;j<subVect.size();j++){
					subCevo=(CommentExtVO)subVect.elementAt(j);
					
					if(subCevo.getVa().length()<=0 && subCevo.getVb().length()<=0 && subCevo.getVc().length()<=0 && subCevo.getVd().length()<=0 && subCevo.getVe().length()<=0 && subCevo.getVf().length()<=0)
						continue;
				    if(tr){
						out.print("<tr class=trclass onmouseout='resumemenu()' onmouseover='invertmenu()'>");
					}else{
						out.print("<tr class=trclass2 onmouseout='resumemenu()' onmouseover='invertmenu()'>");
					}
				    k++;
			%>
				<td><%=k%></td>
				<td><%=subCevo.getNodeName()==null?"":subCevo.getNodeName()%></td>
				<td><%=subCevo.getUserName()==null?"":subCevo.getUserName()%></td>
				<td><%=subCevo.getVa()==null?"":subCevo.getVa()%></td>
				<td><%=subCevo.getVb()==null?"":subCevo.getVb()%></td>
				<td><%=subCevo.getVc()==null?"":subCevo.getVc()%></td>
				<td><%=subCevo.getVd()==null?"":subCevo.getVd()%></td>
				<td><%=subCevo.getVe()==null?"":subCevo.getVe()%></td>
				<td><%=subCevo.getVf()==null?"":subCevo.getVf()%></td>
				<td><a href="#" onclick="showta('subBiz_<%=k%>')"><%=subCevo.getVx()==null?"-":subCevo.getVx().length()>30?subCevo.getVx().substring(0,30)+"......":subCevo.getVx()%></a></td>
				<input type="hidden" id="subBiz_<%=k%>" value="<%=subCevo.getVx()%>">
				</tr>
			<%
					tr=!tr;
				}
				if(k==0){
					
			%>
				<tr class=trclass><td colspan='10'>没有业务要素修改历史记录</td></tr>
			<%
				}
			}
			%>
		</table><br><br>
		
		<!-- 成员业务要素修改 -->
		<br>
			<table cellspacing=1 cellpadding=0>
				<tr>
					<td align="right" width="10%" >企业名称：</td> <td> <input type="text" name="va<%=i %>" style="background-color:#F7FEA5"> </td>
					<td align="right" width="10%">业务品种：</td> <td> <input type="text" name="vb<%=i %>" style="background-color:#F7FEA5"> </td>
					<td align="right" width="10%">金额（币种）：</td> <td> <input type="text" name="vc<%=i %>" style="background-color:#F7FEA5"> </td>
				</tr>
				
				<tr>
					<td align="right" width="10%">期限    ：</td> <td> <input type="text" name="vd<%=i %>" style="background-color:#F7FEA5"> </td>
					<td align="right" width="10%">利率    ：</td> <td> <input type="text" name="ve<%=i %>" style="background-color:#F7FEA5"> </td>
					<td align="right" width="10%">担保方式：</td> <td> <input type="text" name="vf<%=i %>" style="background-color:#F7FEA5"> </td>
				</tr>
				<tr>
					<td align="right" width="10%">业务意见：</td>
					<td colspan="3">
						<textarea name="vy<%=i %>" rows="4" cols="80" style="background-color:#F7FEA5"></textarea>
					</td>
				</tr>
				
			</table><br>
		</fieldset>
		<br><br>
		
<%
		i++;
	}
}

%>


	  <div align="center">
		<input name="Submit" type="button" class="button" value="保存" onClick="doSave()">	
	  </div>
	  
</form>
</body></html>
