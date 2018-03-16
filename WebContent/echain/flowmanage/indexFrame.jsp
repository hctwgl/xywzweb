<%@ page contentType="text/html;charset=gb2312" language="java"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>eChain易擎工作流平台</title>
</head>
<%request.getSession().setAttribute("s_sysid", "echaindefault");
request.getSession().setAttribute("s_orgid", "100000");
request.getSession().setAttribute("s_orgname", "某某银行");
request.getSession().setAttribute("s_userid", "admin");
request.getSession().setAttribute("s_username", "系统管理员"); %>
<frameset rows="60,*" frameborder="1" framespacing="0">
  <frame src="top.jsp" name="topFrame" scrolling="NO" noresize>
  <frameset cols="160,*" frameborder="1" framespacing="0">
		<frame src="left.jsp" name="leftFrame" scrolling="NO" noresize>
		<frame src="main.jsp" name="mainFrame">
	</frameset>
</frameset>
<noframes><body>
</body></noframes>
</html>
