<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%
String instanceid =request.getParameter("instanceid");
String flag = request.getParameter("flag");
String nodeid = request.getParameter("nodeid");
String ywxx_url=request.getContextPath()+"/echaincommonservlet?method=echainflowdemo&actionType=openform&tab=ywxx&instanceid="+instanceid+"&nodeid="+nodeid;
String lcsp_url=request.getContextPath()+"/echaincommonservlet?method=echainflowdemo&actionType=openform&tab=lcsp&instanceid="+instanceid+"&nodeid="+nodeid;
String lcgz_url=request.getContextPath()+"/echaincommonservlet?method=echainflowdemo&actionType=openform&tab=lcgz&instanceid="+instanceid+"&nodeid="+nodeid;
String lcyj_url=request.getContextPath()+"/cibServlet?actionType=lcyj&instanceid="+instanceid+"&nodeid="+nodeid;

if(flag!=null && flag.equalsIgnoreCase("gather")){
	String mainNodeID=request.getParameter("mainNodeID");
	String mainInstandeID = request.getParameter("mainInstandeID");
	ywxx_url=request.getContextPath()+"/echaincommonservlet?method=echainflowdemo&actionType=openform&tab=ywxx&instanceid="+mainInstandeID+"&nodeid="+mainNodeID;
	lcsp_url = request.getContextPath()+"/echaincommonservlet?method=echainflowdemo&actionType=openformgather&tab=hbsp&instanceid="+instanceid;
	lcgz_url=request.getContextPath()+"/echaincommonservlet?method=echainflowdemo&actionType=openformgather&tab=hbls&instanceid="+instanceid+"&nodeid="+nodeid;
}

String bizType = "";
if(nodeid!=null&&nodeid.trim().length()>0){
	VO_wf_node_property wnp=WFCache.getInstance().getNodeProperty(nodeid);
	String nodeFormID = wnp.NodeFormID;
    if(nodeFormID==null || nodeFormID.equals(""))
    	nodeFormID = WFCache.getInstance().getCacheWFObj(wnp.WFID).WFMainFormID;
    
  	//如果是授信，则显示业务要素修改
    if(nodeFormID.equalsIgnoreCase("zhsx_apply"))
    	bizType = "zhsx_apply";
}		            

%>

<%@page import="com.ecc.echain.workflow.model.VO_wf_node_property"%>
<%@page import="com.ecc.echain.workflow.cache.WFCache"%><HTML>
<HEAD>
<TITLE>标签页范例</TITLE>
<META http-equiv="Content-Type" content="text/html; charset=GBK"/>
<link href="./relatedTab.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">	
function show(divid) {
	document.getElementById("ywxx").className="";
	document.getElementById("lcsp").className="";
	document.getElementById("lcgz").className="";
	document.getElementById("lcyj").className="";
	document.getElementById(divid).className="activated";
	document.getElementById("ywxx_div").style.display="none";
	document.getElementById("lcsp_div").style.display="none";
	document.getElementById("lcgz_div").style.display="none";
	document.getElementById("lcyj_div").style.display="none";
	document.getElementById(divid+"_div").style.display="";
}

function doLoad(){

	//非授信业务不需要显示
	var bizType = "<%=bizType%>";
	if(bizType=="" || bizType!="zhsx_apply"){
		document.getElementById("lcyj").style.display="none";
	}
}
</script>
</HEAD>
<BODY style="margin:10px 5px 10px 10px;" onload="doLoad()">
<div id='relatedtabs_text_tabs' class="relatedtabs_tabs">
<a id="ywxx" href="#" onclick="show('ywxx')" class=""><span>业务信息</span></a>
<a id="lcsp" href="#" onclick="show('lcsp')" class="activated"><span>流程办理</span></a>
<a id="lcgz" href="#" onclick="show('lcgz')" class=""><span>审批历史</span></a>
<a id="lcyj" href="#" onclick="show('lcyj')" class=""><span>业务要素修改</span></a>
</div>
<div id='relatedtabs_text_main' class="relatedtabs_main">
<div id='ywxx_div' style="display:none"><iframe src="<%=ywxx_url%>" FRAMEBORDER=0 class="relatedtabs_main_iframe"></iframe></div>
<div id='lcsp_div' style="display:"><iframe src="<%=lcsp_url%>" FRAMEBORDER=0 class="relatedtabs_main_iframe"></iframe></div>
<div id='lcgz_div' style="display:none"><iframe src="<%=lcgz_url%>" FRAMEBORDER=0 class="relatedtabs_main_iframe"></iframe></div>
<div id='lcyj_div' style="display:none"><iframe src="<%=lcyj_url%>" FRAMEBORDER=0 class="relatedtabs_main_iframe"></iframe></div>
</div>
</BODY></HTML>