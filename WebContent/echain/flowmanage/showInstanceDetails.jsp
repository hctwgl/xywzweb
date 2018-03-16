<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%
Map hm = (Map)request.getAttribute("retobj");
if(hm==null)hm=new HashMap();
Map fMap;
String key,k,v;
%>
<html>
<head>
<title>eChain流程管理</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
</head>
<body>
<form>

<table class=tablemain cellspacing=1 cellpadding=0 style="table-layout:fixed">
<tr style="background-color: #ffffff"><td width="25%" height="0px"></td><td width="75%"></td></tr>
<%
Iterator it = hm.keySet().iterator();
while(it.hasNext()){
	key = (String)it.next();
	fMap=(Map)hm.get(key);
%>
<tr class=trtitle><td colspan="2"><%=key%></td></tr>
<%
	Iterator it2 = fMap.keySet().iterator();
	while(it2.hasNext()){
		k=(String)it2.next();
		v=(String)fMap.get(k);
%>
<tr class=trclass><td style="background-color: #f9f9f9"><%=k%></td><td><%=v%></td></tr>
<%
	}
}
%>
</table>
<br>
</form>
</body></html>
