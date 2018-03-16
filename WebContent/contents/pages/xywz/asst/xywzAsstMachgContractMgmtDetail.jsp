<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/contents/pages/common/includes.jsp"%>


<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/xywz/asst/xywzAsstMachgContractMgmtDetail.js"></script>

<script type="text/javascript">
<%
if(!(SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof String)){
AuthUser auth2=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
String machgContrNum = request.getParameter("machgContrNum");//方案编号

if(machgContrNum == null){
	machgContrNum = "";
}
out.print("var machgContrNum = '"+machgContrNum+"';");//方案编号
}
%>
</script>
</head>
<body>
</body>
</html>