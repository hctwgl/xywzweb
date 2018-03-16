/***
 * 我的商机
 * 作者 ：zb
 * 时间 ：
 * 版本 ：v1.0.0
 */
var user 				= parent.mobileApp.getUserInfo();//当前登陆用户的基本信息保存对象
var userId				= user.userId;//从当前登陆用户对象中获取用户编号
var oppor_Stat			= "";//商机状态
var oppor_Stage			= "";//商机阶段
var opporName			= "";//商机名称
var activ_oppor_Stat	= "";//商机跟踪中商机状态
var activ_opporId		="";//商机跟踪中，所跟踪的商机id
/***
 * 后台查询到列表数据展示格式对象
 */
var listReader = {
		mapping : [{name : 'OPPOR_ID'},//商机编号
		           {name : 'OPPOR_NAME'},//商机名称
	          	   {name : 'OPPOR_STAT'},//商机状态：0-暂存、1-待分配、2-认领、3-待审批、4-执行中、5-退回、6-到期退回、7-失败关闭、8-成功关闭
	          	   {name : 'STAT_NAME'},//商机状态名称
	          	   {name : 'OPPOR_STAGE'},//商机阶段：1-了解商机、2-确认商机、3-方案论证、4-商务谈判、5-商机成交
	          	   {name : 'STAGE_NAME'},//商机阶段名称
	          	   {name : 'OPPOR_TYPE'},//商机类型：0-资产业务1-负债业务2-中间业务	3-综合业务
	          	   {name : 'TYPE_NAME'},//商机类型名称
	          	   {name : 'OPPOR_SOURCE'},//商机来源：0-手动创建1-提醒创建2-外部名单批量创建3-内部名单批量创建4-渠道(大堂)5-渠道(柜员)6-渠道(网银)7-渠道(手机银行)8-渠道(门户)9-渠道(外呼)10-渠道(新媒体)11-渠道（CRM自动）12-渠道（其他）
	          	   {name : 'SOURCE_NAME'},//商机类型名称
	          	   {name : 'CUST_NAME'},//客户名称
	          	   {name : 'PROD_NAME'},//产品名称
	          	   {name : 'OPPOR_START_DATE'},//商机开始日期
	          	   {name : 'OPPOR_END_DATE'},//商机完成日期
	          	   {name : 'OPPOR_DUE_DATE'}//商机有效期
	          	   ],
	    record: '<li id="li_@OPPOR_ID">'
	    	+'<div class="editTools"><a class="icon-cancel-circle" id="@OPPOR_ID" onclick="javascript:deleteMyOpportunity(\'@OPPOR_ID\');"></a></div>'
			+ '<a href="javascript:myOpportunityShowDetail(\'@OPPOR_ID\')">'
			+ '<div class="listCell lcBig"style="width:33%;">商机名称：@OPPOR_NAME<br/>商机状态：@STAT_NAME<br/>商机类型：@TYPE_NAME</div>'
			+ '<div class="listCell"style="width:33%;">商机来源：@SOURCE_NAME<br/>客户名称：@CUST_NAME<br/>产品名称：@PROD_NAME</div>'
			+ '<div class="listCell"style="width:33%;">开始时间：@OPPOR_START_DATE<br/>结束时间：@OPPOR_END_DATE<br/>　有效期：@OPPOR_DUE_DATE</div>'
			+ '</a>'
			+ '</li>'
	};
/***
 * 请求后台并展示我的商机数据
 */
var config = {
		filter : false,
		pageConfig : {
			limit : 10,
			queryUrl : basePath + 'myOpportunityAction.json?executeUserId='+userId+"&opporStat="+oppor_Stat+"&opporStage="+oppor_Stage+"&opporName="+opporName,
			listViewId : 'myOpportunity_list',
			listReader : listReader,
			success : function(response){},
			error : function(){
				mesUtil.alert('数据加载失败');
			}
		}
	};
/**
 * 取消修改，返回到详情页面
 * @param data panel信息
 */
function cancleModify(){
	$('#editMyOpportunityInfoForm')[0].reset();
	setDisabled(true);
}
/***
 * 按条件查询我的商机
 */
function searchMyOpportunity(){
	oppor_Stat = $("#selectOpporStat").val()+"";
	oppor_Stage = $("#selectOpporStage").val()+"";
	opporName = $("#searchField").val();
	var url = basePath + 'myOpportunityAction.json?executeUserId='+userId;
	if((oppor_Stat != null) && (oppor_Stat != "undefined")&& (oppor_Stat != "")&& (oppor_Stat != "null")) {
		var stats=oppor_Stat.split(',');
		var isStatAll=false;
		for (var i=0;i<stats.length;i++) {
			var stat=stats[i];
			if(stat==null||stat==""){
				isStatAll=true;
				oppor_Stat="";
				break;
			}
		}
		if(!isStatAll){
			url +="&opporStat="+oppor_Stat;
		}
	} 
	if((oppor_Stage != null )&& (oppor_Stage != "undefined")&& (oppor_Stage != "")&& (oppor_Stage != "null")) {
		var stages=oppor_Stage.split(",");
		var isStageAll=false;
		for (var j=0;j<stages.length;j++) {
			var stage=stages[j];
			if(stage==null||stage==""){
				isStageAll=true;
				oppor_Stage="";
				break;
			}
		}
		if(!isStageAll){
			url +="&opporStage="+oppor_Stage;
		}
	} 
	if(opporName != null && opporName != "undefined"&& opporName != "") {
		url +="&opporName="+opporName;
	} 
	var myOpportunity = PageBarFactory.get(config);
	myOpportunity.queryFun(url);
	//var myOpportunity = $('#myOpportunityPanel').scrollBar(config);
	//myOpportunity.scrollBar.queryFun(url);
	closePopWin('div_search');
};
/***
 * 点击头部删除按钮触发事件
 */
function deleteMyOpportunitys() {
	var myOpportunity = PageBarFactory.get(config);
	var lis = $("#myOpportunity_list li .editTools");
	var display = 'block';
	var buttonName = '完成';
	if($("#deleteMyOpportunitys").html() == "完成") {
		display = 'none';
		buttonName = '编辑';
		myOpportunity.disableScroller(false);
		//$("#myOpportunity_list").scrollBar.disableScroller(false);
	} else {
		myOpportunity.disableScroller(true);
		//$("#myOpportunity_list").scrollBar.disableScroller(true);
	}
	$("#deleteMyOpportunitys").html(buttonName);
	if(lis.length > 0) {
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.display = display;
		}
	}
}
/***
 * 点击每条记录上删除按钮触发事件
 */
function deleteMyOpportunity(opporId) {
	mobileUtils.showLoading('正在提交...');
	$.ajax({
		type : "GET",
		url : basePath+'myOpportunityAction!delete.json?opporId='+opporId,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			mesUtil.alert('删除成功！');
			toMyOpportunityPanelAndRefreshData();
			deleteMyOpportunitys();
		},
		error:function(){
			mobileUtils.hideLoading();
			mesUtil.alert('删除失败！');
		}
	});	
}
/***
 * 获取当前日期
 */
function getNowDate(){
	var date=new Date();
	return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
};
/***
 * 获取当前日期和时间
 */
function getNowDateTime(){
	var date=new Date();
	return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
};
/***
 * 重置
 */
function resetForm(formId) {
	$('#'+formId)[0].reset();
}
/***
 * 返回我的商机主面板
 */
function toMyOpportunityPanel() {
	$.ui.loadContent('myOpportunityPanel');
}
/***
 * 返回我的商机主面板
 */
function toMyOpportunityPanelAndRefreshData() {
	var myOpportunity = PageBarFactory.get(config);
	//var myOpportunity = $('#myOpportunityPanel').scrollBar(config);
	myOpportunity.queryFun();
	//myOpportunity.scrollBar.queryFun();
	$.ui.loadContent('myOpportunityPanel');
}
/***
 * 点击我的商机页面上添加商机按钮触发事件
 */
function addMyOpportunity() {
	addMyOpportunityPanel();
};
/***
 * 展示商机详情时请求后台获得数据
 * opporId：所请求商机的编号
 */
function myOpportunityShowDetail(opporId) {
	var condition = {};
	condition.OPPOR_ID = opporId;
	$.ajax({
		type : "GET",
		url : basePath + 'myOpportunityAction.json?condition='+$.toJSON(condition)+'&param=abcabc',
		cache : false,
		// async: false,
		dataType : "json",
		success : function(response) {
			mobileUtils.hideLoading();
			createMyOpportunityPanel(response.json.data[0]);
			$("#title_h1").text("商机详情");
			setDisabled(true);
		},
		error : function() {
			mobileUtils.hideLoading();
			mesUtil.alert('查询失败！');
		}
	});
};
/***
 * 点击保存我的商机信息时触发事件
 */
function saveMyOpportunityInfo(formId) {
	var opporName 		= $("#input_opporName").val();//商机名称
	var opporStartDate 	= $("#input_opporStartDate").val();//开始时间
	var opporEndDate   	= $("#input_opporEndDate").val();//结束时间
	var opporDueDate	= $("#input_opporDueDate").val();//有效期
	var custName		= $("#custName").val();//客户名称
	var prodName		= $("#input_prodName").val();//商机产品名称
	var opporContent    = $("#textarea_opporContent").val();//商机内容
	if(opporName == null || opporName == "undefined" || opporName == ""){
		mesUtil.alert("请输入商机名称！");
		return;
	}
	if(opporStartDate == null || opporStartDate == "undefined" || opporStartDate == ""){
		mesUtil.alert("请输入商机开始时间！");
		return;
	}
	if(opporEndDate == null || opporEndDate == "undefined" || opporEndDate == ""){
		mesUtil.alert("请输入商机结束时间！");
		return;
	}
	if(opporDueDate == null || opporDueDate == "undefined" || opporDueDate == ""){
		mesUtil.alert("请输入有效期！");
		return;
	}
	if(custName == null || custName == "undefined" || custName == ""){
		mesUtil.alert("请输入客户名称！");
		return;
	}
	if(prodName == null || prodName == "undefined" || prodName == ""){
		mesUtil.alert("请输入商机产品名称！");
		return;
	}
	if(opporContent == null || opporContent == "undefined" || opporContent == ""){
		mesUtil.alert("请输入商机内容！");
		return;
	}
	var condition = $("#"+formId).serialize();//获取form表单的值
	mobileUtils.showLoading('正在保存...');
	$.ajax({
		type : "POST",
		url : basePath+'myOpportunityAction.json?'+condition,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			mesUtil.alert('保存成功！');
			//保存成功后返回列表界面并刷新数据
			toMyOpportunityPanelAndRefreshData();
			setDisabled(true);
		},
		error:function(){
			mobileUtils.hideLoading();
			mesUtil.alert('保存失败！');
		}
	});	
};
/***
 * 点击商机跟踪式触发事件
 */
function activOpportunity(){
	activ_oppor_Stat=$("#input_opporStat").val();
	activ_opporId=$("#input_opporId").val();
	activOpportunityListPanel();
}
/***
 * 点击商机关闭时触发事件
 */
function closeOpportunity(opporStat){
	if(opporStat!=4||opporStat!="4"){
		mesUtil.alert("该商机未在执行中，不能关闭！");
		return;
	}
	$("#afui").actionsheet('<a  onclick="updateOpportunity(8);" >成功关闭</a>'
			+'<a  onclick="updateOpportunity(7);">失败关闭</a>');
};
/***
 * 选择关闭类型后更新商机的状态
 */
function updateOpportunity(stat){
	var opporId=$("#input_opporId").val();
	mobileUtils.showLoading('正在关闭商机...');
	$.ajax({
		type : "POST",
		url : basePath+'myOpportunityAction!closeOpportunity.json?stat='+stat+'&opporId='+opporId,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			mesUtil.alert('保存成功！');
			toMyOpportunityPanelAndRefreshData();
		},
		error:function(){
			mobileUtils.hideLoading();
			mesUtil.alert('保存失败！');
		}
	});	
};
/***
 * 点击修改按钮时触发事件
 */
function modifyMyOpportunity(){
	setDisabled(false);
};
/***
 * 保存商机跟踪信息按钮触发事件
 */
function saveActivOpportunity(formID) {
	var salesActivName    = $("#input_salesActivName").val();
	if(salesActivName == null || salesActivName == "undefined" || salesActivName == ""){
		mesUtil.alert("请输入销售活动名称！");
		return;
	}
	var execDate    = $("#input_execDate").val();
	if(execDate == null || execDate == "undefined" || execDate == ""){
		mesUtil.alert("请输入执行日期！");
		return;
	}
	var activContent    = $("#textarea_activContent").val();
	if(activContent == null || activContent == "undefined" || activContent == ""){
		mesUtil.alert("请输入执行内容！");
		return;
	}
	var nextContactTime    = $("#input_nextContactTime").val();
	if(nextContactTime == null || nextContactTime == "undefined" || nextContactTime == ""){
		mesUtil.alert("请输入下次联系时间！");
		return;
	}
	var nextExecContent    = $("#textarea_nextExecContent").val();
	if(nextExecContent == null || nextExecContent == "undefined" || nextExecContent == ""){
		mesUtil.alert("请输入下次执行内容！");
		return;
	}
	/*var activMemo    = $("#textarea_activMemo").val();
	if(activMemo == null || activMemo == "undefined" || activMemo == ""){
		mesUtil.alert("请输入备注！");
		return;
	}*/
	var condition = $("#"+formID).serialize();//获取form表单的值
	mobileUtils.showLoading('正在保存...');
	$.ajax({
		type : "POST",
		url : basePath+'opportunityFollowUpAction!saveOrUpdateBusiOpporActiv.json?'+condition+'&nextContactTime='+nextContactTime,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			mesUtil.alert('保存成功！');
			activOpportunityListPanel();//成功回到商机跟踪列表界面
		},
		error:function(){
			mobileUtils.hideLoading();
			mesUtil.alert('保存失败！');
		}
	});	
};
/***
 * 在商机详情切换到修改页面时设置相应输入内容字段可编辑
 */
function setDisabled(flag){
	$('#input_opporName').attr("disabled",flag);
	$('#select_opporStage').attr("disabled",flag);
	$('#select_opporSource').attr("disabled",flag);
	$('#select_opporType').attr("disabled",flag);
	$('#input_opporStartDate').attr("disabled",flag);
	$('#input_opporEndDate').attr("disabled",flag);
	$('#input_opporDueDate').attr("disabled",flag);
	$('#custName').attr("disabled",flag);
	$('#input_prodName').attr("disabled",flag);
	$('#textarea_opporContent').attr("disabled",flag);
	if(flag){
		$('#detail_div').show();
		$('#modify_div').hide();
		$("#title_h1").text("商机详情");
		
	}else{
		$('#detail_div').hide();
		$('#modify_div').show();
		$("#title_h1").text("修改商机");
	}
};

/***
 * 添加我的商机展示面板
 */
function addMyOpportunityPanel() {
	var createrId		= user.userId;
	var createrName		= user.userName;
	var createOrgId		= user.unitId;
	var createOrgName	= user.unitName;
	var createDateTime	= getNowDateTime();
	
	var panelContent 	= '<header>'
					 + '	<div class="top_header">'
					 + '		<a href="javascript:toMyOpportunityPanel();" class="button backButton">返回</a>'
					 + ' 		<h1>新增商机</h1>'
					 + '	</div>'
					 + '</header>'
					 + '<form id="addMyOpportunityForm" action="" method="get">'
					 + '	<div class="toolsBar noSearch">'
					 + '		<div class="tbLeft">'
					 + '			<div class="tabsMenu selected">新增我的商机</div>'
					 + '		</div>'
					 + '		<div class="tbRight">'
					 + '			<a class="txtBt icon-loop" onclick="javascript:resetForm(\'addMyOpportunityForm\');">重置</a>'
					 + '			<a class="txtBt icon-checkmark" onclick="javascript:saveMyOpportunityInfo(\'addMyOpportunityForm\');">保存</a>'
					 + '		</div>'
					 + '	</div>'
					 + '	<div class="formContent">'
					 + '     	<input readonly="true" name="createrId" value="'+ createrId+'" type="hidden" placeholder="创建者编号">'
					 + '     	<input readonly="true" name="createrName" value="'+ createrName+'" type="hidden" placeholder="创建者姓名">'
					 + '     	<input readonly="true" name="createOrgId" value="'+ createOrgId+'" type="hidden" placeholder="创建机构编号">'
					 + '     	<input readonly="true" name="createOrgName" value="'+ createOrgName+'" type="hidden" placeholder="创建机构名称">'
					 + '     	<input readonly="true" name="createDateTime" value="'+ createDateTime+'" type="hidden" placeholder="创建时间">'
					 + '     	<input readonly="true" name="executeUserId" value="'+ createrId+'" type="hidden" placeholder="执行者编号">'
					 + '     	<input readonly="true" name="executeUserName" value="'+ createrName+'" type="hidden" placeholder="执行者姓名">'
					 + '     	<input readonly="true" name="executeOrgId" value="'+ createOrgId+'" type="hidden" placeholder="执行机构编号">'
					 + '     	<input readonly="true" name="executeOrgName" value="'+ createOrgName+'" type="hidden" placeholder="执行机构名称">'
					 + '     	<input readonly="true" name="updateUserId" value="'+ createrId+'" type="hidden" placeholder="更新者编号">'
					 + '     	<input readonly="true" name="updateUserName" value="'+ createrName+'" type="hidden" placeholder="更新者姓名">'
					 + '     	<input readonly="true" name="updateOrgId" value="'+ createOrgId+'" type="hidden" placeholder="更新机构编号">'
					 + '     	<input readonly="true" name="updateOrgName" value="'+ createOrgName+'" type="hidden" placeholder="更新机构名称">'
					 + '     	<input readonly="true" name="updateDateTime" value="'+ createDateTime+'" type="hidden" placeholder="更新时间">'
					 + '     	<input readonly="true" name="claimUserId" value="'+ createrId+'" type="hidden" placeholder="认领者编号">'
					 + '     	<input readonly="true" name="claimUserName" value="'+ createrName+'" type="hidden" placeholder="认领者姓名">'
					 + '     	<input readonly="true" name="claimOrgId" value="'+ createOrgId+'" type="hidden" placeholder="认领机构编号">'
					 + '     	<input readonly="true" name="claimOrgName" value="'+ createOrgName+'" type="hidden" placeholder="认领机构名称">'
					 + '     	<input readonly="true" name="opporStat" value="4" type="hidden" placeholder="商机状态" class="">'//4为执行状态
					 + '     	<div class="formCell"><label><span class="red">*</span>商机名称：</label><div class="fcContent"><input id="input_opporName" name="opporName" value="" type="text" placeholder="商机名称" class=""></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>商机阶段：</label><div class="fcContent">'
					 + '			<select id="select_opporStage" name="opporStage">'
					 + '				<option value="1" selected="selected">了解商机</option>'
					 + '				<option value="2">确认商机</option>'
					 + '				<option value="3">方案论证</option>'
					 + '				<option value="4">商务谈判</option>'
					 + '				<option value="5">商机成交</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>商机来源：</label><div class="fcContent">'
					 + '			<select id="select_opporSource" name="opporSource">'
					 + '				<option value="0" selected="selected">手动创建</option>'
					 + '				<option value="1">提醒创建</option>'
					 + '				<option value="2">外部名单批量创建</option>'
					 + '				<option value="3">内部名单批量创建</option>'
					 + '				<option value="4">渠道(大堂)</option>'
					 + '				<option value="5">渠道(柜员)</option>'
					 + '				<option value="6">渠道(网银)</option>'
					 + '				<option value="7">渠道(手机银行)</option>'
					 + '				<option value="8">渠道(门户)</option>'
					 + '				<option value="9">渠道(外呼)</option>'
					 + '				<option value="10">渠道(新媒体)</option>'
					 + '				<option value="11">渠道(CRM自动)</option>'
					 + '				<option value="12">渠道(其他)</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>商机类型：</label><div class="fcContent">'
					 + '			<select id="select_opporType" name="opporType">'
					 + '				<option value="0" selected="selected">资产业务</option>'
					 + '				<option value="1">负债业务</option>'
					 + '				<option value="2">中间业务</option>'
					 + '				<option value="3">综合业务</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>开始时间：</label><div class="fcContent"><input id="input_opporStartDate" name="opporStartDate" value="'+getNowDate()+'" type="date" placeholder="开始时间" class=""></div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>结束时间：</label><div class="fcContent"><input id="input_opporEndDate" name="opporEndDate" value="'+getNowDate()+'" type="date" placeholder="结束时间" class=""></div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>有效期：</label><div class="fcContent"><input id="input_opporDueDate" name="opporDueDate" value="'+getNowDate()+'" type="date" placeholder="有效期" class=""></div></div>'
					 + '     	<input id="custId" readonly="true" name="custId" value="" type="hidden" placeholder="客户编号">'
					 + '     	<div class="formCell"><label><span class="red">*</span>客户名称：</label><div class="fcContent"><input  id="custName" readonly="true" name="custName" type="text"  placeholder="请选择..." onclick="javascript:custChoose(\'custName\',\'custId\',\'addMyOpportunityPanel\');" ><div class="fcContent"></div></div>'
					 + '     	<input id="input_prodId" readonly="true" name="prodId" value="" type="hidden" placeholder="产品编号">'
					 + '     	<div class="formCell"><label><span class="red">*</span>产品名称：</label><div class="fcContent"><input id="input_prodName" name="prodName" value="" type="text" placeholder="产品名称" class=""></div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>商机内容：</label><div class="fcContent"><textarea id="textarea_opporContent" name="opporContent" rows="6" placeholder="商机内容" class=""></textarea></div></div>'
					 + '   </div>'
					 + '</form>';
	var contentDiv = '<div id="addMyOpportunityPanel" title="新增商机" class="panel" data-footer="none">'
  				   + panelContent
 				   + '</div>';
	var el = $.query("#addMyOpportunityPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("addMyOpportunityPanel", contentDiv);
	} else {
		$.ui.updatePanel("addMyOpportunityPanel", panelContent);
	}
	$.ui.loadContent("addMyOpportunityPanel");
};
/***
 * 商机详情和商机修改时，展示的面板信息
 * data:详情信息面板展示前请求后台获取的详情信息对象
 */
function createMyOpportunityPanel(data) {
	var opporId  		= mobileUtils.getDataToString(data.OPPOR_ID);//商机编号
	var opporName 		= mobileUtils.getDataToString(data.OPPOR_NAME);//商机名称
	var opporStat 	  	= mobileUtils.getDataToString(data.OPPOR_STAT);//商机状态：0-暂存、1-待分配、2-认领、3-待审批、4-执行中、5-退回、6-到期退回、7-失败关闭、8-成功关闭
	var opporStage     	= mobileUtils.getDataToString(data.OPPOR_STAGE);//商机阶段：1-了解商机、2-确认商机、3-方案论证、4-商务谈判、5-商机成交
	var opporSource 	= mobileUtils.getDataToString(data.OPPOR_SOURCE);//商机来源：0-手动创建1-提醒创建2-外部名单批量创建3-内部名单批量创建4-渠道(大堂)5-渠道(柜员)6-渠道(网银)7-渠道(手机银行)8-渠道(门户)9-渠道(外呼)10-渠道(新媒体)11-渠道（CRM自动）12-渠道（其他）
	var opporType	 	= mobileUtils.getDataToString(data.OPPOR_TYPE);//商机类型：0-资产业务1-负债业务2-中间业务3-综合业务
	var opporStartDate 	= mobileUtils.getDataToString(data.OPPOR_START_DATE);//开始时间
	var opporEndDate   	= mobileUtils.getDataToString(data.OPPOR_END_DATE);//结束时间
	var opporDueDate	= mobileUtils.getDataToString(data.OPPOR_DUE_DATE);//有效期
	var custId			= mobileUtils.getDataToString(data.CUST_ID);//客户编号
	var custName		= mobileUtils.getDataToString(data.CUST_NAME);//客户名称
	var prodId			= mobileUtils.getDataToString(data.PROD_ID);//商机产品ID
	var prodName		= mobileUtils.getDataToString(data.PROD_NAME);//商机产品名称
	var opporContent    = mobileUtils.getDataToString(data.OPPOR_CONTENT);//商机内容
	
	var createrId		= mobileUtils.getDataToString(data.CREATER_ID);//创建人id
	var createrName		= mobileUtils.getDataToString(data.CREATER_NAME);//创建人名称
	var createOrgId		= mobileUtils.getDataToString(data.CREATE_ORG_ID);//创建机构id
	var createOrgName	= mobileUtils.getDataToString(data.CREATE_ORG_NAME);//创建机构名称
	var createDateTime	= mobileUtils.getDataToString(data.CREATE_DATE_TIME);//创建时间
	var executeUserId	= mobileUtils.getDataToString(data.EXECUTE_USER_ID);//执行人id
	var executeUserName	= mobileUtils.getDataToString(data.EXECUTE_USER_NAME);//执行人名称
	var executeOrgId	= mobileUtils.getDataToString(data.EXECUTE_ORG_ID);//执行机构id
	var executeOrgName	= mobileUtils.getDataToString(data.EXECUTE_ORG_NAME);//执行机构名称
	var claimUserId		= mobileUtils.getDataToString(data.CLAIM_USER_ID);//认领人id
	var claimUserName	= mobileUtils.getDataToString(data.CLAIM_USER_NAME);//认领人名称
	var claimOrgId		= mobileUtils.getDataToString(data.CLAIM_ORG_ID);//认领机构id
	var claimOrgName	= mobileUtils.getDataToString(data.CLAIM_ORG_NAME);//认领机构名称
	//修改时需要修改操作人信息
	var updateUserId	= user.userId;
	var updateUserName	= user.userName;
	var updateOrgId		= user.unitId;
	var updateOrgName	= user.unitName;
	var updateDateTime	= getNowDateTime();
	
	var panelContent 	= '<header>'
					 + '	<div class="top_header">'
					 + '		<a href="javascript:toMyOpportunityPanel();" class="button backButton">返回</a>'
					 + ' 		<h1 id="title_h1">商机详情</h1>'
					 + '	</div>'
					 + '</header>'	
					 + '<form id="editMyOpportunityInfoForm" action="" method="get">'
					 + '	<div id="detail_div" class="toolsBar noSearch">'
					 + '		<div class="tbLeft">'
					 + '			<div class="tabsMenu selected">商机详情</div>'
					 + '		</div>'
					 + '		<div id="detail_div" class="tbRight">'
					 + '			<a class="txtBt icon-pencil" onclick="javascript:modifyMyOpportunity();">修改</a>'
					 + '			<a class="txtBt icon-checkmark" onclick="javascript:activOpportunity();">商机跟踪</a>'
					 + '			<a class="txtBt icon-close" onclick="javascript:closeOpportunity('+opporStat+');">商机关闭</a>'
					 + '		</div>'
					 + '	</div>'
					 + '	<div  id="modify_div" class="toolsBar noSearch" style="display:none;">'
					 + '		<div class="tbLeft">'
					 + '			<div class="tabsMenu selected">修改商机详情</div>'
					 + '		</div>'
					 + '		<div class="tbRight">'
					 + '			<a class="txtBt icon-loop" onclick="javascript:cancleModify();">取消</a>'
					 + '			<a class="txtBt icon-loop" onclick="javascript:resetForm(\'editMyOpportunityInfoForm\');">重置</a>'
					 + '			<a class="txtBt icon-checkmark" onclick="javascript:saveMyOpportunityInfo(\'editMyOpportunityInfoForm\');">保存</a>'
					 + '		</div>'
					 + '	</div>'
					 + '	<div class="formContent">'
					 + '     	<input readonly="true" name="createrId" value="'+ createrId+'" type="hidden" placeholder="创建者编号">'
					 + '     	<input readonly="true" name="createrName" value="'+ createrName+'" type="hidden" placeholder="创建者姓名">'
					 + '     	<input readonly="true" name="createOrgId" value="'+ createOrgId+'" type="hidden" placeholder="创建机构编号">'
					 + '     	<input readonly="true" name="createOrgName" value="'+ createOrgName+'" type="hidden" placeholder="创建机构名称">'
					 + '     	<input readonly="true" name="createDateTime" value="'+ createDateTime+'" type="hidden" placeholder="创建时间">'
					 + '     	<input readonly="true" name="executeUserId" value="'+ executeUserId+'" type="hidden" placeholder="执行者编号">'
					 + '     	<input readonly="true" name="executeUserName" value="'+ executeUserName+'" type="hidden" placeholder="执行者姓名">'
					 + '     	<input readonly="true" name="executeOrgId" value="'+ executeOrgId+'" type="hidden" placeholder="执行机构编号">'
					 + '     	<input readonly="true" name="executeOrgName" value="'+ executeOrgName+'" type="hidden" placeholder="执行机构名称">'
					 + '     	<input readonly="true" name="claimUserId" value="'+ claimUserId+'" type="hidden" placeholder="认领者编号">'
					 + '     	<input readonly="true" name="claimUserName" value="'+ claimUserName+'" type="hidden" placeholder="认领者姓名">'
					 + '     	<input readonly="true" name="claimOrgId" value="'+ claimOrgId+'" type="hidden" placeholder="认领机构编号">'
					 + '     	<input readonly="true" name="claimOrgName" value="'+ claimOrgName+'" type="hidden" placeholder="认领机构名称">'
					 + '     	<input readonly="true" name="updateUserId" value="'+ updateUserId+'" type="hidden" placeholder="更新者编号">'
					 + '     	<input readonly="true" name="updateUserName" value="'+ updateUserName+'" type="hidden" placeholder="更新者姓名">'
					 + '     	<input readonly="true" name="updateOrgId" value="'+ updateOrgId+'" type="hidden" placeholder="更新机构编号">'
					 + '     	<input readonly="true" name="updateOrgName" value="'+ updateOrgName+'" type="hidden" placeholder="更新机构名称">'
					 + '     	<input readonly="true" name="updateDateTime" value="'+ updateDateTime+'" type="hidden" placeholder="更新时间">'
					 + '     	<input id="input_opporId" readonly="true" name="opporId" value="'+ opporId+'" type="hidden" placeholder="商机编号">'
					 + '     	<input id="input_opporStat" readonly="true" name="opporStat" value="'+opporStat+'" type="hidden" placeholder="商机状态" class="">'
					 + '     	<div class="formCell"><label><span class="red">*</span>商机名称：</label><div class="fcContent"><input id="input_opporName" name="opporName" value="'+opporName+'" type="text" placeholder="商机名称" class=""></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>商机阶段：</label><div class="fcContent">'
					 + '			<select id="select_opporStage" name="opporStage">'
					 + '				<option id="option_opporStage1" value="1" selected="selected">了解商机</option>'
					 + '				<option id="option_opporStage2" value="2">确认商机</option>'
					 + '				<option id="option_opporStage3" value="3">方案论证</option>'
					 + '				<option id="option_opporStage4" value="4">商务谈判</option>'
					 + '				<option id="option_opporStage5" value="5">商机成交</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>商机来源：</label><div class="fcContent">'
					 + '			<select id="select_opporSource" name="opporSource">'
					 + '				<option id="option_opporSource0" value="0" selected="selected">手动创建</option>'
					 + '				<option id="option_opporSource1" value="1">提醒创建</option>'
					 + '				<option id="option_opporSource2" value="2">外部名单批量创建</option>'
					 + '				<option id="option_opporSource3" value="3">内部名单批量创建</option>'
					 + '				<option id="option_opporSource4" value="4">渠道(大堂)</option>'
					 + '				<option id="option_opporSource5" value="5">渠道(柜员)</option>'
					 + '				<option id="option_opporSource6" value="6">渠道(网银)</option>'
					 + '				<option id="option_opporSource7" value="7">渠道(手机银行)</option>'
					 + '				<option id="option_opporSource8" value="8">渠道(门户)</option>'
					 + '				<option id="option_opporSource9" value="9">渠道(外呼)</option>'
					 + '				<option id="option_opporSource10" value="10">渠道(新媒体)</option>'
					 + '				<option id="option_opporSource11" value="11">渠道(CRM自动)</option>'
					 + '				<option id="option_opporSource12" value="12">渠道(其他)</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>商机类型：</label><div class="fcContent">'
					 + '			<select id="select_opporType" name="opporType">'
					 + '				<option id="option_opporType0" value="0" selected="selected">资产业务</option>'
					 + '				<option id="option_opporType1" value="1">负债业务</option>'
					 + '				<option id="option_opporType2" value="2">中间业务</option>'
					 + '				<option id="option_opporType3" value="3">综合业务</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>开始时间：</label><div class="fcContent"><input id="input_opporStartDate" name="opporStartDate" value="'+ opporStartDate +'" type="date" placeholder="开始时间" class=""></div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>结束时间：</label><div class="fcContent"><input id="input_opporEndDate" name="opporEndDate" value="'+ opporEndDate +'" type="date" placeholder="结束时间" class=""></div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>　有效期：</label><div class="fcContent"><input id="input_opporDueDate" name="opporDueDate" value="'+ opporDueDate +'" type="date" placeholder="有效期" class=""></div></div>'
					 + '     	<input id="custId" readonly="true" name="custId" value="'+ custId+'" type="hidden" placeholder="客户编号">'
					 + '     	<div class="formCell"><label><span class="red">*</span>客户名称：</label><div class="fcContent"><input  id="custName" readonly="true" name="custName" value="'+ custName +'" type="text"  placeholder="请选择..." onclick="javascript:custChoose(\'custName\',\'custId\',\'createMyOpportunityPanel\');" ><div class="fcContent"></div></div>'
					 + '     	<input readonly="true" name="prodId" value="'+ prodId+'" type="hidden" placeholder="产品编号">'
					 + '     	<div class="formCell"><label><span class="red">*</span>产品名称：</label><div class="fcContent"><input id="input_prodName" name="prodName" value="'+ prodName +'" type="text" placeholder="产品名称" class=""></div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>商机内容：</label><div class="fcContent"><textarea id="textarea_opporContent" name="opporContent" rows="6" placeholder="商机内容" class="">'+opporContent+'</textarea></div></div>'
					 + '   </div>'
					 + '</form>';
	var contentDiv = '<div id="createMyOpportunityPanel" title="商机详情" class="panel" data-footer="none">'
  				   + panelContent
 				   + '</div>';
	var el = $.query("#createMyOpportunityPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("createMyOpportunityPanel", contentDiv);
	} else {
		$.ui.updatePanel("createMyOpportunityPanel", panelContent);
	}
	if(1==opporStage||"1"==opporStage){
		$('#option_opporStage1').attr('selected','selected');
	}else if(2==opporStage||"2"==opporStage){
		$('#option_opporStage2').attr('selected','selected');
	}else if(3==opporStage||"3"==opporStage){
		$('#option_opporStage3').attr('selected','selected');
	}else if(4==opporStage||"4"==opporStage){
		$('#option_opporStage4').attr('selected','selected');
	}else if(5==opporStage||"5"==opporStage){
		$('#option_opporStage5').attr('selected','selected');
	}
	if(0==opporSource||"0"==opporSource){
		$('#option_opporSource0').attr('selected','selected');
	}else if(1==opporSource||"1"==opporSource){
		$('#option_opporSource1').attr('selected','selected');
	}else if(2==opporSource||"2"==opporSource){
		$('#option_opporSource2').attr('selected','selected');
	}else if(3==opporSource||"3"==opporSource){
		$('#option_opporSource3').attr('selected','selected');
	}else if(4==opporSource||"4"==opporSource){
		$('#option_opporSource4').attr('selected','selected');
	}else if(5==opporSource||"5"==opporSource){
		$('#option_opporSource5').attr('selected','selected');
	}else if(6==opporSource||"6"==opporSource){
		$('#option_opporSource6').attr('selected','selected');
	}else if(7==opporSource||"7"==opporSource){
		$('#option_opporSource7').attr('selected','selected');
	}else if(8==opporSource||"8"==opporSource){
		$('#option_opporSource8').attr('selected','selected');
	}else if(9==opporSource||"9"==opporSource){
		$('#option_opporSource9').attr('selected','selected');
	}else if(10==opporSource||"10"==opporSource){
		$('#option_opporSource10').attr('selected','selected');
	}else if(11==opporSource||"11"==opporSource){
		$('#option_opporSource11').attr('selected','selected');
	}else if(12==opporSource||"12"==opporSource){
		$('#option_opporSource12').attr('selected','selected');
	}
	if(0==opporType||"0"==opporType){
		$('#option_opporType0').attr('selected','selected');
	}else if(1==opporType||"1"==opporType){
		$('#option_opporType1').attr('selected','selected');
	}else if(2==opporType||"2"==opporType){
		$('#option_opporType2').attr('selected','selected');
	}else if(3==opporType||"3"==opporType){
		$('#option_opporType3').attr('selected','selected');
	}
	$.ui.loadContent("createMyOpportunityPanel");
	setDisabled(true);
};
/***
 * 商机跟踪添加面板
 */
function createActivOpportunityPanel(){
	if(activ_oppor_Stat!=4||activ_oppor_Stat!="4"){
		mesUtil.alert("该商机未在执行中，不能添加销售活动！");
		return;
	}
	var execUserId		= user.userId;
	var execUserName	= user.userName;
	var execOrgId		= user.unitId;
	var execOrgName		= user.unitName;
	
	var panelContent 	= '<header>'
					 + '	<div class="top_header">'
					 + '		<a href="javascript:$.ui.loadContent(\'activOpportunityListPanel\');" class="button backButton">返回</a>'
					 + ' 		<h1>新增销售活动</h1>'
					 + '	</div>'
					 + '</header>'	
					 + '<form id="activOpportunityInfoForm" action="" method="get">'
					 + '	<div class="toolsBar noSearch">'
					 + '		<div class="tbLeft">'
					 + '			<div class="tabsMenu selected">新增销售活动</div>'
					 + '		</div>'
					 + '		<div class="tbRight">'
					 + '			<a class="txtBt icon-loop" onclick="javascript:resetForm(\'activOpportunityInfoForm\');">重置</a>'
					 + '			<a class="txtBt icon-checkmark" onclick="javascript:saveActivOpportunity(\'activOpportunityInfoForm\');">保存</a>'
					 + '		</div>'
					 + '	</div>'
					 + '	<div class="formContent">'
					 + '     	<input readonly="true" name="opporId" value="'+ activ_opporId+'" type="hidden" placeholder="商机编号">'
					 + '     	<input readonly="true" name="execUserId" value="'+ execUserId+'" type="hidden" placeholder="执行人编号">'
					 + '     	<input readonly="true" name="execUserName" value="'+ execUserName+'" type="hidden" placeholder="执行人姓名">'
					 + '     	<input readonly="true" name="execOrgId" value="'+ execOrgId+'" type="hidden" placeholder="执行机构编号">'
					 + '     	<input readonly="true" name="execOrgName" value="'+ execOrgName+'" type="hidden" placeholder="执行机构名称">'
					 + '     	<div class="formCell"><label><span class="red">*</span>销售活动名称：</label><div class="fcContent"><input id="input_salesActivName" name="salesActivName" value="" type="text" placeholder="销售活动名称" class=""></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>销售阶段：</label><div class="fcContent">'
					 + '			<select id="selectSalesStage" name="salesStage">'
					 + '				<option id="option_salesStage1" value="1" selected="selected">了解客户需求</option>'
					 + '				<option id="option_salesStage2" value="2">确认客户需求</option>'
					 + '				<option id="option_salesStage3" value="3">确认产品/服务</option>'
					 + '				<option id="option_salesStage4" value="4">制定服务方案</option>'
					 + '				<option id="option_salesStage5" value="5">产品介绍</option>'
					 + '				<option id="option_salesStage6" value="6">销售洽谈</option>'
					 + '				<option id="option_salesStage7" value="7">签约/购买</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>执行日期：</label><div class="fcContent"><input id="input_execDate" name="execDate" value="'+getNowDate()+'" type="date" placeholder="执行日期" class=""></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>执行方式：</label><div class="fcContent">'
					 + '			<select id="selectExecWay" name="execWay">'
					 + '				<option id="option_execWay1" value="1" selected="selected">网点</option>'
					 + '				<option id="option_execWay2" value="2">电话</option>'
					 + '				<option id="option_execWay3" value="3">短信</option>'
					 + '				<option id="option_execWay4" value="4">上门拜访</option>'
					 + '				<option id="option_execWay5" value="5">其他</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>执行内容：</label><div class="fcContent"><textarea id="textarea_activContent" name="activContent" rows="6" placeholder="执行内容" class=""></textarea></div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>下次联系时间：</label><div class="fcContent"><input id="input_nextContactTime" name="nextContactTime" value="'+getNowDateTime()+'" type="datetime" placeholder="下次联系时间" class=""></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>下次执行方式：</label><div class="fcContent">'
					 + '			<select id="selectNextExecWay" name="nextExecWay">'
					 + '				<option id="option_nextExecWay1" value="1" selected="selected">网点</option>'
					 + '				<option id="option_nextExecWay2" value="2">电话</option>'
					 + '				<option id="option_nextExecWay3" value="3">短信</option>'
					 + '				<option id="option_nextExecWay4" value="4">上门拜访</option>'
					 + '				<option id="option_nextExecWay5" value="5">其他</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>下次执行内容：</label><div class="fcContent"><textarea id="textarea_nextExecContent" name="nextExecContent" rows="6" placeholder="下次执行内容" class=""></textarea></div></div>'
					 + '     	<div class="formCell"><label>备注：</label><div class="fcContent"><textarea id="textarea_activMemo" name="activMemo" rows="6" placeholder="备注" class=""></textarea></div></div>'
					 + '   </div>'
					 + '</form>';
	var contentDiv = '<div id="activOpportunityPanel" class="panel">'
  				   + panelContent
 				   + '</div>';
	var el = $.query("#activOpportunityPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("activOpportunityPanel", contentDiv);
	} else {
		$.ui.updatePanel("activOpportunityPanel", panelContent);
	}
	$.ui.loadContent("activOpportunityPanel");
};
/***
 * 商机跟踪列详情
 * salesActivId:展示详情的销售信息id
 */
function activOpportunityShowDetail(salesActivId){
	$.ajax({
		type : "GET",
		url : basePath + 'opportunityFollowUpAction.json?salesActivId='+salesActivId+'&param=abcabc',
		cache : false,
		// async: false,
		dataType : "json",
		success : function(response) {
			mobileUtils.hideLoading();
			activOpportunityShowDetailPanel(response.json.data[0]);
			setActivDisabled(true);
		},
		error : function() {
			mobileUtils.hideLoading();
			mesUtil.alert('查询失败！');
		}
	});
};
/**
 * 取消修改，返回到详情页面
 * @param data panel信息
 */
function cancleActivModify(){
	$('#activOpportunityDetailInfoForm')[0].reset();
	setActivDisabled(true);
}
/***
 * 切换到修改界面
 */
function modifyActivOpportunity() {
	if(activ_oppor_Stat!=4||activ_oppor_Stat!="4"){
		mesUtil.alert("该商机未在执行中，不能修改销售活动！");
		return;
	}
	setActivDisabled(false);
}
/***
 * 销售活动详情面版与修改面板之间可编辑的切换
 */
function setActivDisabled(flag){
	$('#input_salesActivName').attr("disabled",flag);
	$('#selectSalesStage').attr("disabled",flag);
	$('#input_execDate').attr("disabled",flag);
	$('#selectExecWay').attr("disabled",flag);
	$('#textarea_activContent').attr("disabled",flag);
	$('#input_nextContactTime').attr("disabled",flag);
	$('#selectNextExecWay').attr("disabled",flag);
	$('#textarea_nextExecContent').attr("disabled",flag);
	$('#textarea_activMemo').attr("disabled",flag);
	if(flag){
		$('#div_deail').show();
		$('#div_modify').hide();
		$("#h1_header").text("销售活动详情");
	}else{
		$('#div_deail').hide();
		$('#div_modify').show();
		$("#h1_header").text("修改销售活动");
	}
};
Date.prototype.format = function(format) {
    var o = {"M+":this.getMonth() + 1,
        // month
        "d+": this.getDate(),
        // day
        "h+":this.getHours(),
        // hour
        "m+": this.getMinutes(),
        // minute
        "s+":this.getSeconds(),
        // second
        "q+":Math.floor((this.getMonth() + 3) / 3),
        // quarter
        "S":this.getMilliseconds()
        // millisecond
    };
    if (/(y+)/.test(format) || /(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() +"").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
};
function timestampformat(timestamp) {
    return (new Date(timestamp * 1000)).format("yyyy-MM-dd hh:mm:ss");
} 
/***
 * 商机跟踪列详情面版创建
 * salesActivId:展示详情的销售信息id
 */
function activOpportunityShowDetailPanel(data){
	var salesActivId  	= mobileUtils.getDataToString(data.SALES_ACTIV_ID);//销售活动编号
	var opporId  		= mobileUtils.getDataToString(data.OPPOR_ID);//商机编号
	var salesActivName  = mobileUtils.getDataToString(data.SALES_ACTIV_NAME);//销售活动名称
	var salesStage  	= mobileUtils.getDataToString(data.SALES_STAGE);//销售阶段:当创建新的销售活动并跟进销售阶段后，需要更新商机阶段和商机达成概率（对应关系详见业务规则）1-了解客户需求、2-确认客户需求、3-确认产品/服务、4-制定服务方案、5-产品介绍、6-销售洽谈、7-签约/购买
	var execWay  		= mobileUtils.getDataToString(data.EXEC_WAY);//活动执行方式:1-网点、2-电话、3-短信、4-上门拜访、5-其他
	var activContent  	= mobileUtils.getDataToString(data.ACTIV_CONTENT);//活动内容
	var execDate  		= mobileUtils.getDataToString(data.EXEC_DATE);//执行时间
	var nextContactTime = mobileUtils.getDataToString(data.NEXT_CONTACT_TIME);//下次联系时间
	
	//nextContactTime = timestampformat(nextContactTime);
	var nextExecWay  	= mobileUtils.getDataToString(data.NEXT_EXEC_WAY);//下次执行方式:1-网点、2-电话、3-短信、4-上门拜访、5-其他
	var nextExecContent = mobileUtils.getDataToString(data.NEXT_EXEC_CONTENT);//下次执行内容
	var activMemo  		= mobileUtils.getDataToString(data.ACTIV_MEMO);//备注
	
	var execUserId		= user.userId;//执行人id
	var execUserName	= user.userName;//执行人名称
	var execOrgId		= user.unitId;//执行组织ＩＤ
	var execOrgName		= user.unitName;//执行组织名称
	
	var panelContent 	= '<header>'
					 + '	<div class="top_header">'
					 + '		<a href="javascript:$.ui.loadContent(\'activOpportunityListPanel\');" class="button backButton">返回</a>'
					 + ' 		<h1>销售活动</h1>'
					 + '	</div>'
					 + '</header>'	
					 + '<form id="activOpportunityDetailInfoForm" action="" method="get">'
					 + '	<div id="div_modify" class="toolsBar noSearch">'
					 + '		<div class="tbLeft">'
					 + '			<div class="tabsMenu selected">修改销售活动</div>'
					 + '		</div>'
					 + '		<div class="tbRight">'
					 + '			<a class="txtBt icon-loop" onclick="javascript:cancleActivModify();">取消</a>'
					 + '			<a class="txtBt icon-loop" onclick="javascript:$(\'#activOpportunityDetailInfoForm\')[0].reset();">重置</a>'
					 + '			<a class="txtBt icon-checkmark" id="modifyCustomerVisit" onclick="javascript:saveActivOpportunity(\'activOpportunityDetailInfoForm\');">保存</a>'
					 + '		</div>'
					 + '	</div>'
					 + '	<div id="div_deail" class="toolsBar noSearch">'
					 + '		<div class="tbLeft">'
					 + '			<div class="tabsMenu selected">销售活动详情</div>'
					 + '		</div>'
					 + '		<div class="tbRight">'
					 + '			<a class="txtBt icon-pencil" onclick="javascript:modifyActivOpportunity();">修改</a>'
					 + '		</div>'
					 + '	</div>'
					 + '	<div class="formContent">'
					 + '     	<input readonly="true" name="salesActivId" value="'+ salesActivId+'" type="hidden" placeholder="销售活动编号">'
					 + '     	<input readonly="true" name="opporId" value="'+ opporId+'" type="hidden" placeholder="商机编号">'
					 + '     	<input readonly="true" name="execUserId" value="'+ execUserId+'" type="hidden" placeholder="执行人编号">'
					 + '     	<input readonly="true" name="execUserName" value="'+ execUserName+'" type="hidden" placeholder="执行人姓名">'
					 + '     	<input readonly="true" name="execOrgId" value="'+ execOrgId+'" type="hidden" placeholder="执行机构编号">'
					 + '     	<input readonly="true" name="execOrgName" value="'+ execOrgName+'" type="hidden" placeholder="执行机构名称">'
					 + '     	<div class="formCell"><label><span class="red">*</span>销售活动名称：</label><div class="fcContent"><input id="input_salesActivName" name="salesActivName" value="'+salesActivName+'" type="text" placeholder="销售活动名称" class=""></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>销售阶段：</label><div class="fcContent">'
					 + '			<select id="selectSalesStage" name="salesStage" value="'+salesStage+'">'
					 + '				<option id="option_salesStage1" value="1">了解客户需求</option>'
					 + '				<option id="option_salesStage2" value="2">确认客户需求</option>'
					 + '				<option id="option_salesStage3" value="3">确认产品/服务</option>'
					 + '				<option id="option_salesStage4" value="4">制定服务方案</option>'
					 + '				<option id="option_salesStage5" value="5">产品介绍</option>'
					 + '				<option id="option_salesStage6" value="6">销售洽谈</option>'
					 + '				<option id="option_salesStage7" value="7">签约/购买</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>执行日期：</label><div class="fcContent"><input id="input_execDate" name="execDate" value="'+execDate+'" type="datetime" placeholder="执行日期" class=""></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>执行方式：</label><div class="fcContent">'
					 + '			<select id="selectExecWay" name="execWay" value="'+execWay+'">'
					 + '				<option id="option_execWay1" value="1" selected="selected">网点</option>'
					 + '				<option id="option_execWay2" value="2">电话</option>'
					 + '				<option id="option_execWay3" value="3">短信</option>'
					 + '				<option id="option_execWay4" value="4">上门拜访</option>'
					 + '				<option id="option_execWay5" value="5">其他</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>执行内容：</label><div class="fcContent"><textarea id="textarea_activContent" name="activContent" rows="6" placeholder="执行内容" class="">'+activContent+'</textarea></div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>下次联系时间：</label><div class="fcContent"><input id="input_nextContactTime" name="nextContactTime" value="'+nextContactTime+'" type="datetime" placeholder="下次联系时间" class=""></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>下次执行方式：</label><div class="fcContent">'
					 + '			<select id="selectNextExecWay" name="nextExecWay" value="'+nextExecWay+'">'
					 + '				<option id="option_nextExecWay1" value="1">网点</option>'
					 + '				<option id="option_nextExecWay2" value="2">电话</option>'
					 + '				<option id="option_nextExecWay3" value="3">短信</option>'
					 + '				<option id="option_nextExecWay4" value="4">上门拜访</option>'
					 + '				<option id="option_nextExecWay5" value="5">其他</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '     	<div class="formCell"><label><span class="red">*</span>下次执行内容：</label><div class="fcContent"><textarea id="textarea_nextExecContent" name="nextExecContent" rows="6" placeholder="下次执行内容" class="">'+nextExecContent+'</textarea></div></div>'
					 + '     	<div class="formCell"><label>备注：</label><div class="fcContent"><textarea id="textarea_activMemo" name="activMemo" rows="6" placeholder="备注" class="">'+activMemo+'</textarea></div></div>'
					 + '   </div>'
					 + '</form>';
	var contentDiv = '<div id="activOpportunityShowDetailPanel" class="panel">'
  				   + panelContent
 				   + '</div>';
	var el = $.query("#activOpportunityShowDetailPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("activOpportunityShowDetailPanel", contentDiv);
	} else {
		$.ui.updatePanel("activOpportunityShowDetailPanel", panelContent);
	}
	if(1==salesStage||"1"==salesStage){
		$('#option_salesStage1').attr('selected','selected');
	}else if(2==salesStage||"2"==salesStage){
		$('#option_salesStage2').attr('selected','selected');
	}else if(3==salesStage||"3"==salesStage){
		$('#option_salesStage3').attr('selected','selected');
	}else if(4==salesStage||"4"==salesStage){
		$('#option_salesStage4').attr('selected','selected');
	}else if(5==salesStage||"5"==salesStage){
		$('#option_salesStage5').attr('selected','selected');
	}else if(6==salesStage||"6"==salesStage){
		$('#option_salesStage6').attr('selected','selected');
	}else if(7==salesStage||"7"==salesStage){
		$('#option_salesStage7').attr('selected','selected');
	}
	if(1==execWay||"1"==execWay){
		$('#option_execWay1').attr('selected','selected');
	}else if(2==execWay||"2"==execWay){
		$('#option_execWay2').attr('selected','selected');
	}else if(3==execWay||"3"==execWay){
		$('#option_execWay3').attr('selected','selected');
	}else if(4==execWay||"4"==execWay){
		$('#option_execWay4').attr('selected','selected');
	}
	if(1==nextExecWay||"1"==nextExecWay){
		$('#option_nextExecWay1').attr('selected','selected');
	}else if(2==nextExecWay||"2"==nextExecWay){
		$('#option_nextExecWay2').attr('selected','selected');
	}else if(3==nextExecWay||"3"==nextExecWay){
		$('#option_nextExecWay3').attr('selected','selected');
	}else if(4==nextExecWay||"4"==nextExecWay){
		$('#option_nextExecWay4').attr('selected','selected');
	}
	
	$.ui.loadContent("activOpportunityShowDetailPanel");
};
/***
 * 返回我的商机跟踪列表界面并刷新
 */
function toActivOpportunityListPanelAndRefreshData() {
	var opportunityFollowUp = PageBarFactory.get(activConfig);
	opportunityFollowUp.queryFun(basePath + 'opportunityFollowUpAction.json?opporId='+activ_opporId+'&salesActivName='+$("#searchActivKey")[0].value);
	//var opportunityFollowUp = $('#opportunityFollowUpAction').scrollBar(activConfig);
	//opportunityFollowUp.scrollBar.queryFun();
	$.ui.loadContent('opportunityFollowUpAction');
}
/***
 * 点击头部删除按钮触发事件
 */
function deleteActivOpportunitys() {
	if(activ_oppor_Stat!=4||activ_oppor_Stat!="4"){
		mesUtil.alert("该商机未在执行中，不能删除销售活动！");
		return;
	}
	var lis = $("#opportunityFollowUp_list li .editTools");
	var display = 'block';
	var buttonName = '完成';
	if($("#deleteActivOpportunitys").html() == "完成") {
		display = 'none';
		buttonName = '编辑';
		var opportunityFollowUp = PageBarFactory.get(activConfig);
		opportunityFollowUp.disableScroller(false);
		//$("#opportunityFollowUp_list").scrollBar.disableScroller(false);
	} else {
		var opportunityFollowUp = PageBarFactory.get(activConfig);
		opportunityFollowUp.disableScroller(true);
		//$("#opportunityFollowUp_list").scrollBar.disableScroller(true);
	}
	$("#deleteActivOpportunitys").html(buttonName);
	if(lis.length > 0) {
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.display = display;
		}
	}
}
/***
 * 删除
 */
function deleteActivOpportunity(salesActivId){
	mobileUtils.showLoading('正在提交...');
	$.ajax({
		type : "GET",
		url : basePath+'opportunityFollowUpAction!delete.json?salesActivId='+salesActivId,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			$("#li_activ_"+salesActivId).remove();
			mesUtil.alert('删除成功！');
			deleteActivOpportunitys();
			toActivOpportunityListPanelAndRefreshData();
		},
		error:function(){
			mobileUtils.hideLoading();
			mesUtil.alert('删除失败！');
		}
	});	
}
/***
 * 请求后台并展示ListReader
 */
var activListReader = {
		mapping : [{name : 'SALES_ACTIV_ID'},//销售活动编号
		           {name : 'OPPOR_ID'},//商机编号
	          	   {name : 'SALES_ACTIV_NAME'},//销售活动名称
	          	   {name : 'SALES_STAGE'},//销售阶段:当创建新的销售活动并跟进销售阶段后，需要更新商机阶段和商机达成概率（对应关系详见业务规则)1-了解客户需求、2-确认客户需求、3-确认产品/服务、4-制定服务方案、5-产品介绍、6-销售洽谈、7-签约/购买
	          	   {name : 'SALESSTAGE_NAME'},//销售阶段名称
	          	   {name : 'EXEC_DATE'},//活动执行日期
	          	   {name : 'EXEC_WAY'},//活动执行方式:1-网点、2-电话、3-短信、4-上门拜访、5-其他
	          	   {name : 'WAY_NAME'},//执行方式名称
	          	   {name : 'ACTIV_CONTENT'},//活动内容
	          	   {name : 'EXEC_USER_ID'},//活动执行人
	          	   {name : 'EXEC_USER_NAME'},//活动执行人名称
	          	   {name : 'EXEC_ORG_ID'},//活动执行机构ID
	          	   {name : 'EXEC_ORG_NAME'},//活动执行机构
	          	   {name : 'NEXT_CONTACT_TIME'},//下次联系时间
	          	   {name : 'NEXT_EXEC_WAY'},//下次执行方式:1-网点、2-电话、3-短信、4-上门拜访、5-其他
	          	   {name : 'NEXT_EXEC_CONTENT'},//下次执行内容
	          	   {name : 'ACTIV_MEMO'}//备注
	          	   ],
	    record: '<li id="li_activ_@SALES_ACTIV_ID">'
	    	+'<div class="editTools"><a class="icon-cancel-circle" id="@SALES_ACTIV_ID" onclick="javascript:deleteActivOpportunity(\'@SALES_ACTIV_ID\');"></a></div>'
			+ '<a href="javascript:activOpportunityShowDetail(\'@SALES_ACTIV_ID\')">'
			+ '<div class="listCell lcBig"style="width:33%;">销售活动名称：@SALES_ACTIV_NAME<br/>　　销售阶段：@SALESSTAGE_NAME</div>'
			+ '<div class="listCell"style="width:33%;">活动执行方式：@WAY_NAME<br/>活动执行日期：@EXEC_DATE</div>'
			+ '<div class="listCell"style="width:33%;">　　活动内容：@ACTIV_CONTENT<br/>　　　　备注：@ACTIV_MEMO</div>'
			+ '</a>'
			+ '</li>'
	};
/***
 * 请求后台并展示商机跟踪config
 */
var activConfig = {
		filter : false,
		pageConfig : {
			limit : 10,
			queryUrl : basePath + 'opportunityFollowUpAction.json?opporId='+activ_opporId+'&salesActivName='+$("#searchActivKey").val(),
			listViewId : 'opportunityFollowUp_list',
			listReader : activListReader,
			success : function(response){
				mobileUtils.hideLoading();
			},
			error : function(){
				mobileUtils.hideLoading();
				mesUtil.alert('数据加载失败');
			}
		}
	};
/***
 * 商机跟踪列表面板
 */
function activOpportunityListPanel(){
	var panelContent 	= '<header id="activOpportunityList_header">'
					 + '	<div class="top_header">'
					 + '		<a href="javascript:$.ui.loadContent(\'createMyOpportunityPanel\');" class="button backButton">返回</a>'
					 + ' 		<h1>商机跟踪记录</h1>'
					 + '	</div>'
					 + '</header>'	
					 + '<div>'	
					 + '	<div class="toolsBar noSearch">'
					 + '		<div class="tbLeft">'
					 + '			<input type="text" id="searchActivKey" class="txtSearch" placeholder="请输入销售活动名称…"/>'
					 + '			<a class="btSearch icon-search" id="searchActivButton">查询</a>'
					 + '		</div>'
					 + '		<div class="tbRight">'
					 + '			<a class="txtBt icon-checkmark" onclick="javascript:createActivOpportunityPanel();">新增</a>'
					 + '			<a class="txtBt icon-pencil" id="deleteActivOpportunitys" onclick="javascript:deleteActivOpportunitys();">编辑</a>'
					 + '		</div>'
					 + '	</div>'
					 + '	<div>'
					 + '     	<ul class="list" id="opportunityFollowUp_list"></ul>'
					 + '   </div>'
					 + '</div>';
	var contentDiv = '<div id="activOpportunityListPanel" class="panel" data-header="activOpportunityList_header">'
  				   + panelContent
 				   + '</div>';
	var el = $.query("#activOpportunityListPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("activOpportunityListPanel", contentDiv);
	} else {
		$.ui.updatePanel("activOpportunityListPanel", panelContent);
	}
	$.ui.loadContent("activOpportunityListPanel");
	var showOpportunityFollowUp = PageBarFactory.get(activConfig);
	showOpportunityFollowUp.queryFun(basePath + 'opportunityFollowUpAction.json?opporId='+activ_opporId+'&salesActivName='+$("#searchActivKey")[0].value);
	//var showOpportunityFollowUp = $('#opportunityFollowUp_list').scrollBar(activConfig);
	//showOpportunityFollowUp.scrollBar.queryFun();
	$("#searchActivButton").click(function(){
		showOpportunityFollowUp.queryFun(basePath + 'opportunityFollowUpAction.json?opporId='+activ_opporId+'&salesActivName='+$("#searchActivKey")[0].value);
		//showOpportunityFollowUp.scrollBar.queryFun(basePath + 'opportunityFollowUpAction.json?salesActivName='+$("#searchActivKey")[0].value+'&opporId='+activ_opporId);
	});
};