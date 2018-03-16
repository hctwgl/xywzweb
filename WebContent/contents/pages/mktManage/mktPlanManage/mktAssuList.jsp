<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/contents/pages/common/includes.jsp"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript"src="<%=request.getContextPath()%>/contents/pages/com.yucheng.bcrm/com.yucheng.bcrm.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/common/Com.yucheng.crm.common.OrgUserManage.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/common/Com.yucheng.bcrm.common.OrgField.js"></script>
<!-- 指标信息 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/common/Com.yucheng.bcrm.common.indexfeild.js"></script>
<!-- 营销任务指标信息操作(增删改) -->
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/mktAssuRelateTarget.js"></script>
<!-- 营销任务基本信息操作(增删改) -->
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/mktAssuRelateEdit.js"></script>
<!-- 营销任务分解 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/mktAssuResolve.js"></script>
<!-- 营销任务执行人 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/mktAssuRelateOperObj.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/mktAssuMonthList.js"></script>
<script type="text/javascript"src="<%=request.getContextPath()%>/contents/resource/ext3/ux/CustomerQueryMagnifier.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/mktAssuList.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/custDetailList.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/prodDetailList.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/planCustList.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/planProdList.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/mktAssuYearList.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/mktAssuSearchList.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/common/ImportWindow.js"></script>
<!-- 营销任务下达和调整 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/mktAssuTransAdjust.js"></script>
<!-- 营销任务关闭 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/mktAssuCloseInfo.js"></script>
<!-- 营销任务详情 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/contents/pages/mktManage/mktPlanManage/mktAssuDetailInfo.js"></script>
</head>
<body>
<input id='planIdStr' type='hidden'/>
<input id='executeIdStr' type='hidden'/>
 <div id="s1" class="x-hide-display">
           <p>
		<font size="2" face="Verdana">
		您可以继续操作下面的功能。
		</font>
		</p>
	    <p>
	    <font size="2" face="Verdana">需要指定实施营销计划的目标客户，请点击<A HREF="specifiesTheTargetCustomers.html">指定目标客户</A>。</font>
		<font size="2" face="Verdana">需要制定营销的指标，请点击<A HREF="developmentOfMarketingIndicators.html">制定营销指标</A>。</font>
		<font size="2" face="Verdana">需要指定要实施营销计划的机构，请点击<A HREF="designatedMarketingAgency.html">指定营销机构</A>。</font>
		<font size="2" face="Verdana">需要对已经执行的营销计划进行评价，请点击<A HREF="evaluationOfMarketingPlan.html">营销计划评价</A>。</font>
		<font size="2" face="Verdana">需要制定新的销售活动，请点击<A HREF="../crm/sellManager/sellAction/makeSell.html">制定销售活动</A>。</font>
		<font size="2" face="Verdana">需要创建新的商机，请点击<A HREF="../crm/sellManager/tradeManager/makeTrade.html">创建商机</A>。</font>
        </p>
        </div>
</body>
</html>