<%@ page contentType="text/html;charset=gb2312" language="java"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>无标题文档</title>
<STYLE type="text/css">
A:link { COLOR: #000000; FONT-SIZE: 12px; TEXT-DECORATION: none}
A:visited { COLOR: #000000; FONT-SIZE: 12px; TEXT-DECORATION: none}
A:hover { COLOR: #006CD9; FONT-SIZE: 12px; TEXT-DECORATION: none;  BACKGROUND-IMAGE: url(./images/left3.gif);}
BODY { FONT-SIZE: 12px;}
</style>
</head>
<body topmargin=0px leftmargin=0px>
<table bgcolor=#000000 cellspacing=1 cellpadding=3 width="100%">
<tr><td bgcolor=#e3e4e3 style="font-size:12px">
&nbsp;当前登录用户：<%=request.getSession().getAttribute("s_username")%>
</td></tr></table>
<center><br>
<a href="<%=request.getContextPath()%>/echainstudio.jnlp">流程定制</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=wflist" target="mainFrame">流程管理</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=instancelist&instanceid=-1&fromrow=0&torow=20" target="mainFrame">运行中实例</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=end&instanceid=-1" target="mainFrame">已办结实例</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=getWfPropertyManagers" target="mainFrame">流程运行参数</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=showFormSet" target="mainFrame">表单信息查看</a><br><br>
<a href="<%=request.getContextPath()%>/echain/common/showOrgUser.jsp" target="mainFrame">机构用户查看</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=freedate&subType=getFreeDate" target="mainFrame">工作日历管理</a><br><br>
<a href="<%=request.getContextPath()%>/echain/flowmanage/orgWFLink/list.jsp" target="mainFrame">机构流程关连</a><br><br>
<a href="<%=request.getContextPath()%>/echain/flowmanage/taskpool/list.jsp" target="mainFrame">任务池管理</a><br><br>
<a href="<%=request.getContextPath()%>/echain/flowmanage/wfvar/list.jsp" target="mainFrame">流程常量定义</a><br><br>
<a href="<%=request.getContextPath()%>/echain/flowmanage/wforgvar/list.jsp" target="mainFrame">机构流程常量设置</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=gotodemo" target="_top">[&nbsp;切换至流程演示&nbsp;]</a><br><br>
</center>
</body>
</html>
