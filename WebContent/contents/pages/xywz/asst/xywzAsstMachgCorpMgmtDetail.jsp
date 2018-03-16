<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/contents/pages/common/includes.jsp"%>


<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/xywz/asst/xywzAsstMachgCorpMgmtDetail.js"></script>

<script type="text/javascript">
<%
if(!(SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof String)){
AuthUser auth2=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
String asstMachgId = request.getParameter("asstMachgId");//方案编号

if(asstMachgId == null){
	asstMachgId = "";
}
out.print("var asstMachgId = '"+asstMachgId+"';");//方案编号
}
%>
</script>
</head>
<body>
</body>
</html>