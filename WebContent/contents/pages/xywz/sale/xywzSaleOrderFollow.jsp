<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/contents/pages/common/includes.jsp"%>


<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/xywz/sale/xywzSaleOrderFollow.js"></script>

<script type="text/javascript">
<%
if(!(SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof String)){
AuthUser auth2=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
String contrNum = request.getParameter("contrNum");//合同编号

if(contrNum == null){
	contrNum = "";
}
out.print("var contrNum = '"+contrNum+"';");//合同编号
}
%>
</script>
</head>
<body>
</body>
</html>