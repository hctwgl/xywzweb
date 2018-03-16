<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/contents/pages/common/includes.jsp"%>


<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/xywz/purc/xywzPurcOutPurcContractDetail.js"></script>

<script type="text/javascript">
<%
if(!(SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof String)){
AuthUser auth2=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
String puchSnglId = request.getParameter("puchSnglId");//方案编号

if(puchSnglId == null){
	puchSnglId = "";
}
out.print("var puchSnglId = '"+puchSnglId+"';");//方案编号
}
%>
</script>
</head>
<body>
</body>
</html>