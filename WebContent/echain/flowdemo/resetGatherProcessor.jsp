<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@page import="com.ecc.echain.workflow.engine.WorkFlowClient"%>
<%@page import="com.ecc.echain.workflow.model.GatherVO"%><html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<%
	String instanceID = request.getParameter("instanceID");
	String currentGatherUserList = request.getParameter("currentGatherUserList");
	
	GatherVO vo = new GatherVO();
	
	vo.setCurrentUserID((String)request.getSession().getAttribute("s_userid"));
	vo.setInstanceID(instanceID);
	vo.setCurrentGatherUserList(currentGatherUserList);
	WorkFlowClient wfc = WorkFlowClient.getInstance();
	vo = wfc.wfResetProcessor(vo);
	
	int sign = vo.getSign();
	String tip = vo.getTip();
%>


<script type="text/javascript">

	function doLoad(){
		var retObj = [];
		var sign = "<%=sign%>";
		var tip = "<%=tip%>";

		retObj[0] = sign;
		retObj[1] = tip;

		window.returnValue = retObj;
		window.close();
	}
</script>

</head>
<body onload="doLoad()">

</body>
</html>