<%@ page contentType="text/html;charset=gb2312" language="java"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>�ޱ����ĵ�</title>
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
&nbsp;��ǰ��¼�û���<%=request.getSession().getAttribute("s_username")%>
</td></tr></table>
<center><br>
<a href="<%=request.getContextPath()%>/echainstudio.jnlp">���̶���</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=wflist" target="mainFrame">���̹���</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=instancelist&instanceid=-1&fromrow=0&torow=20" target="mainFrame">������ʵ��</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=end&instanceid=-1" target="mainFrame">�Ѱ��ʵ��</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=getWfPropertyManagers" target="mainFrame">�������в���</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=showFormSet" target="mainFrame">����Ϣ�鿴</a><br><br>
<a href="<%=request.getContextPath()%>/echain/common/showOrgUser.jsp" target="mainFrame">�����û��鿴</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=freedate&subType=getFreeDate" target="mainFrame">������������</a><br><br>
<a href="<%=request.getContextPath()%>/echain/flowmanage/orgWFLink/list.jsp" target="mainFrame">�������̹���</a><br><br>
<a href="<%=request.getContextPath()%>/echain/flowmanage/taskpool/list.jsp" target="mainFrame">����ع���</a><br><br>
<a href="<%=request.getContextPath()%>/echain/flowmanage/wfvar/list.jsp" target="mainFrame">���̳�������</a><br><br>
<a href="<%=request.getContextPath()%>/echain/flowmanage/wforgvar/list.jsp" target="mainFrame">�������̳�������</a><br><br>
<a href="<%=request.getContextPath()%>/echaincommonservlet?method=echainflowmanage&actionType=gotodemo" target="_top">[&nbsp;�л���������ʾ&nbsp;]</a><br><br>
</center>
</body>
</html>
