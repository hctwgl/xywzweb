<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
<%@ page language="java" pageEncoding="utf-8"%>
<%@ page import="org.springframework.security.core.GrantedAuthority" language="java"%>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" language="java"%>
<%@ page import="com.xywztech.bob.vo.AuthUser" language="java"%>
<%@ page import="java.util.List" language="java" %>
<%@ page import="com.xywztech.bob.common.LogService" language="java" %>
<%@ page import="com.xywztech.crm.constance.SystemConstance" language="java" %>
<%@ page import="com.xywztech.bob.core.LookupManager" language="java" %>
<%@ page import="com.xywztech.crm.constance.OperateTypeConstant" language="java" %>
<%@ page import="org.springframework.context.ApplicationContext" language="java" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" language="java" %>
<%@ page import="java.util.Map" language="java" %>
<html>
	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/resource/ext3/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/resource/ext3/ext-all.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/resource/ext3/ux/ux-all.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/common/ViewContext.js"></script>
	<head>
	<script type="text/javascript">
		var intervalID; 
		var __a="<%=request.getContextPath()%>";
		var basepath = "/" + __a.substring(1, __a.length);
		<%
		if((SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof String)){
			//Session过期，重新登录
			out.print("top.location.href = basepath;");
		}else{
			AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
			String userId = auth.getUserId();
			out.print("var __userId = '"+userId+"';");
			out.print("var __userName = '"+auth.getUsername()+"';");
			out.print("var __userCname = '"+auth.getCname()+"';");
			//当前用户角色ID串
			String role = "";
			//当前用户角色Code串
			String roleCode ="";
			for(int i=0;i<auth.getAuthorities().size();i++)
				role += auth.getAuthorities().get(i).getAuthority()+"$";
		
			for(int i=0;i<auth.getRolesInfo().size();i++){
			   Map roleMap=(Map)auth.getRolesInfo().get(i);
			   roleCode+=roleMap.get("ROLE_CODE")+"$";
			}
			//当前用户机构ID
			String orgId = auth.getUnitId();
			//公共JS变量
			out.print("var __roles = '"+role+"';");
			out.print("var __roleCodes = '"+roleCode+"';");
			out.print("var __units = '"+auth.getUnitId()+"';");
			out.print("var __grants = [];");
			String resId = request.getParameter("resId");
			out.print("var __resId = '"+resId+"';");
			out.print("var __unitname = '"+auth.getUnitName()+"';");
			out.print("var __unitlevel = '"+auth.getUnitlevel()+"';");
			out.print("var __appId = '"+SystemConstance.LOGIC_SYSTEM_APP_ID+"';");
			//登录类型（单角色或多角色）
			out.print("var __loginType = '"+auth.getLoginType()+"';");
			//security变量
			out.print("var __secMsgType = '';");
			out.print("var __secMsg = '';");
			if (auth.getCredentialInfo() != null) {
				out.print("__secMsgType = '"+auth.getCredentialInfo().getInfoType()+"';");
				out.print("__secMsg = '"+auth.getCredentialInfo().getMessage()+"';");
			}
			//判断如果是菜单URL请求，则做两件事  
			//1、将菜单下的控制点写入公共变量
			//2、记录菜单访问日志
			if(resId!=null && !"-1".equals(resId) && !"".equals(resId)){
				List<String> grants = auth.findGrantByRes(resId);
				if(grants!=null){
					for(int i=0;i<grants.size();i++){
						out.print("__grants.push('"+grants.get(i)+"');");
					}
				}
				//增加菜单日志访问记录
				//LogUtils lu=new LogUtils();
				LogService.loginfo.setLoginIp(request.getRemoteAddr());
				LogService.loginfo.setLogTypeId(Long.valueOf(OperateTypeConstant.VISIT_MENU+""));
				LogService.loginfo.setAfterValue(request.getServletPath());
				LogService.loginfo.setContent(OperateTypeConstant.getOperateText(OperateTypeConstant.VISIT_MENU)+":"+LookupManager.getInstance().getMenuName(resId));
				LogService.addLog();
			}
			//获取异常描述信息
			ApplicationContext app =WebApplicationContextUtils.getRequiredWebApplicationContext(getServletContext()) ;
			Map<String, String> errMsgMap = (Map<String, String>) app.getBean("getErrMsgMap");
			Map<String, String> errPageMap = (Map<String, String>) app.getBean("getErrPageMap");
			String defaultErrMsg = (String) app.getBean("getDefaultErrMsg");
			String defaultErrPage = (String) app.getBean("getDefaultErrPage");
			out.print("var __errMsgMap = [];");
			for(String key : errMsgMap.keySet()){
				out.print("__errMsgMap.push({code:'"+key+"',content:'"+errMsgMap.get(key)+"'});");
			}
		}
		%>
		JsContext.initContext();
	</script>
	<link  type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/contents/resource/ext3/resources/css/ext-all.css" />
	<link  type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/contents/resource/ext3/resources/css/xtheme-zhongxin_crm.css" />
	<link  type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/contents/css/comm.css" />
	<link  type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/contents/css/frame.css" />
	<link  type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/contents/css/elements.css" />

	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/common/Crm-Ext-Patch-1.000-v1.0.js"></script> 
	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/common/Crm-Ext-Extends-1.000-v1.0.js"></script> 
	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/com.yucheng.bcrm/com.yucheng.bcrm.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/common/Com.yucheng.crm.index.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/common/Com.yucheng.crm.security.js"></script> 

	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/systemManager/grantAuthortication/accordionTool.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/system/comfunctionset/commonfuntion.js"></script> 

	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/resource/ext3/locale/ext-lang-zh_CN.js"></script>

	<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/xtIndex/xtIndex.js"></script>
	<title>XXXX管理系统</title>
	</head>
	<body style="overflow-x:hidden;overflow-y:hidden;">
		<div class="topbg">
			<div class="top123">
    			<div id="logo" class="logo" > </div>
    			<div id="nav" class="nav">
      				<ul id="rootMenus" class="nav_ul">
      				</ul>
   				</div>
    			<div id="invokeIcons">
    			</div>
			</div>
		</div>
		<iframe id="indexPageFrame" style="border:0 solid #000;height:0px;width:100%;" src='' ></iframe>
		<div id="wholeContent" class="bg" style="display:none;">
 			<div class="bgbody clearfix">
    			<div id="frame_contents" class="frame_contents" >
     				<div id="frame_container" class="frame_container"> 
        				<div id="hiddenLeftMenuDiv" class="frame_left">
          					<div id="left_menu" class="left_menu">
            					<div class="left_menu_tit" id="left_menu_tit">
             						<p class="left_menu_p" id="left_menu_p"><span id="firstTitleSpan" class="left_menu_w"></span></p>
            					</div>
          					</div>
        				</div>
        				<div id = 'widttt'  class="frame_center"> 
          					<div id="rightTagConent" class="frame_center_tab">
            					<ul id="fc_tab_ul" class="fc_tab_ul">
            					</ul>
          					</div>
          					<div id="functionContents" class="frame_center_con">
            					<div class="frame_center_top">
            						<div class="frame_center_top2"></div>
            					</div>
            					<div class="frame_center_middle">
             						<div id="frame_center_contents" class="frame_center_contents"> 
              						</div>             
            					</div>
            					<div class="frame_center_dd">
            						<div class="frame_center_dd2"></div>
            					</div>
          					</div>
        				</div>
      				</div>
    			</div>
  			</div>
		</div>
	</body>
</html>