<%@ page contentType="text/html;charset=gb2312" language="java"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<link type="text/css" rel="stylesheet"	href="<%=request.getContextPath() %>/echain/common/xtree/css/xtree2.css">
<script type="text/javascript"	src="<%=request.getContextPath() %>/echain/common/xtree/js/xtree2.js"></script>
<title>�ޱ����ĵ�</title>
<STYLE type="text/css">
A:link { COLOR: #000000; FONT-SIZE: 12px; TEXT-DECORATION: none}
A:visited { COLOR: #000000; FONT-SIZE: 12px; TEXT-DECORATION: none}
A:hover { COLOR: #006CD9; FONT-SIZE: 12px; TEXT-DECORATION: none;}
BODY { FONT-SIZE: 12px;}
</style>
<script type="text/javascript" language="javascript">
function linkto(url){
	parent.mainFrame.window.location=url;
}
</script>
</head>
<body topmargin=0px leftmargin=0px>
<table bgcolor=#000000 cellspacing=1 cellpadding=3 width="100%">
<tr><td bgcolor=#e3e4e3 style="font-size:12px">
&nbsp;��ǰ��¼�û���<%=request.getSession().getAttribute("s_username")%>
</td></tr></table>
<div id="leftMenuBar" style="height:470px; width:350; overflow: auto; text-align:left;margin-top:5;margin-left:5">
		<script type="text/javascript">
	  //xtree
	  var path='<%=request.getContextPath()%>/echain/common/xtree/images/';
      	webFXTreeConfig.rootIcon        = path+"folder.png",
	    webFXTreeConfig.openRootIcon    = path+"openfolder.png",
	    webFXTreeConfig.folderIcon      = path+"folder.png",
	    webFXTreeConfig.openFolderIcon  = path+"openfolder.png",
	    webFXTreeConfig.fileIcon        = path+"dot.png",
	    webFXTreeConfig.iIcon           = path+"I.png",
	    webFXTreeConfig.lIcon           = path+"L.png",
	    webFXTreeConfig.lMinusIcon      = path+"Lminus.png",
	    webFXTreeConfig.lPlusIcon       = path+"Lplus.png",
	    webFXTreeConfig.tIcon           = path+"T.png",
	    webFXTreeConfig.tMinusIcon      = path+"Tminus.png",
	    webFXTreeConfig.tPlusIcon       = path+"Tplus.png",
	    webFXTreeConfig.plusIcon        = path+"plus.png",
	    webFXTreeConfig.minusIcon       = path+"minus.png",
	    webFXTreeConfig.blankIcon       = path+"blank.png",
        webFXTreeConfig.loadingIcon     = path+"loading.gif";
       var tree = new WebFXTree("eChain������ʾ");
       var tree_wt=new WebFXTreeItem("����ί��");
       tree_wt.add(new WebFXTreeItem("ί������","javascript:linkto('<%=request.getContextPath()%>/echain/common/entrust/list.jsp')"));
       var tree_wt_cx=new WebFXTreeItem("ί�в�ѯ");
       tree_wt_cx.add(new WebFXTreeItem("������","javascript:linkto('<%=request.getContextPath()%>/echain/common/entrust/agent_log_list.jsp')"));
       tree_wt_cx.add(new WebFXTreeItem("�Ѱ��","javascript:linkto('<%=request.getContextPath()%>/echain/common/entrust/agent_logEND_list.jsp')"));
       tree_wt_cx.open = true;
       tree_wt.add(tree_wt_cx);
       tree_wt.open = true;
       tree.add(tree_wt);
       var tree_bl=new WebFXTreeItem("�������");
       tree_bl.add(new WebFXTreeItem("������","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=start')"));
       tree_bl.add(new WebFXTreeItem("��ǩ������","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=signinlist')"));
       tree_bl.add(new WebFXTreeItem("�ҵ������","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=mytaskpool')"));
       tree_bl.add(new WebFXTreeItem("��������","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=todo')"));
       tree_bl.open = true;
       tree.add(tree_bl);
       var tree_ck=new WebFXTreeItem("����鿴");
       tree_ck.add(new WebFXTreeItem("�ҷ��������","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=mystart')"));
       tree_ck.add(new WebFXTreeItem("�Ѱ�����","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=done')"));
       tree_ck.add(new WebFXTreeItem("�ɲ鿴����","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=available')"));
       tree_ck.add(new WebFXTreeItem("���͸��ҵ�����","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=announcelist')"));
       tree_ck.add(new WebFXTreeItem("�쳣����","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=ex')"));
       tree_ck.add(new WebFXTreeItem("�������","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=end&instanceid=-1')"));
       tree_ck.open = true;
       tree.add(tree_ck);
       var tree_hb=new WebFXTreeItem("���");
       var tree_hb_to=new WebFXTreeItem("��������");
       tree_hb_to.add(new WebFXTreeItem("�ҷ���Ļ��","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=newGagther')"));
       tree_hb_to.add(new WebFXTreeItem("�Ҳ���Ļ��","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=partGather')"));
       var tree_hb_done=new WebFXTreeItem("�Ѱ�����");
       tree_hb_done.add(new WebFXTreeItem("�ҷ���Ļ��","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=newGagtherDone')"));
       tree_hb_done.add(new WebFXTreeItem("�Ҳ���Ļ��","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=partGatherDone')"));
       var tree_hb_end=new WebFXTreeItem("����ѯ");
       tree_hb_end.add(new WebFXTreeItem("�ҷ���Ļ��","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=newGagtherEnd')"));
       tree_hb_end.add(new WebFXTreeItem("�Ҳ���Ļ��","javascript:linkto('<%=request.getContextPath()%>/echaincommonservlet?method=echainflowdemo&actionType=partGatherEnd')"));
       tree_hb_to.open = true;
       tree_hb_done.open = true;
       tree_hb_end.open = true;
       tree_hb.open = true;
       tree_hb.add(tree_hb_to);
       tree_hb.add(tree_hb_done);
       tree_hb.add(tree_hb_end);
       tree.add(tree_hb);
       tree.indentWidth = 19;
          tree.open = true;//�ڵ��״̬��trueΪ��
          tree._selectedItem = null;
          tree._fireChange = true;
          tree.rendered = false;
          tree.suspendRedraw = false;
          tree.showLines = true;//������ʾ״̬��trueΪ��ʾ
          tree.showExpandIcons = true;//��չ������ͼ����ʾ״̬��trueΪ��ʾ
          tree.showRootNode = false;//���ڵ���ʾ״̬��trueΪ��ʾ
          tree.showRootLines = true;//���ڵ�������ʾ״̬��trueΪ��ʾ
          tree.write();
</script>
</div>
</body>
</html>
