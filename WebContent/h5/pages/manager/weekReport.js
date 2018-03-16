/***
 * 工作周报
 * 作者 ：lyd
 * 时间 ：
 * 版本 ：v1.0.0
 */
var user = parent.mobileApp.getUserInfo();//当前登陆用户的基本信息保存对象
var userId		= user.userId;//从当前登陆用户对象中获取用户编号

var listReader = {
		mapping : [{name : 'REP_ID'},
		           {name : 'REP_STATUS'},
		           {name : 'REP_NAME_STATUS'},
	          	   {name : 'REP_COMMIT_TIME'},
	          	   {name : 'REP_START_TIME'},
	          	   {name : 'REP_END_TIME'},
	          	   {name : 'REP_CONTENT'}],
	    record:''//@CUST_ID
			+ '<li>'
			+ '<div class="editTools"><a class="icon-cancel-circle" id="@OPPOR_ID" onclick="javascript:deleteWeekReport(\'@REP_ID\',\'@REP_STATUS\');"></a></div>'
			+ '<a href="javascript:weekReportShowDetail(\'@REP_ID\')">'
			+ '<div class="listCell lcBig"style="width:30%;">提交状态：@REP_NAME_STATUS<br/>提交日期：@REP_COMMIT_TIME</div>'
			+ '<div class="listCell lcBig"style="width:30%;">周期：@REP_START_TIME<br/>至@REP_END_TIME</div>'
			+ '<div class="listCell" >本周工作内容：@REP_CONTENT</div>'
			+'</a></li>'
}
var config = {
	filter : false,
	pageConfig : {
		limit : 10,
		queryUrl : basePath + 'weekReportAction.json?createrId='+userId,
		listViewId : 'weekReport_list',
		listReader : listReader,
		success : function(response){},
		error : function(){
			mesUtil.alert('数据加载失败');
		}
	}
}
 
function addWeekReport() {
	createWeekReportPanel({},0);
}
/**
 * 创建详情panel
 * @param data panel信息,type 操作类型 0：新增 1 详情
 */
function createWeekReportPanel (data,type) {
	
	var repId = mobileUtils.getDataToString(data.REP_ID);
	var repStatus  = mobileUtils.getDataToString(data.REP_STATUS);
	var repId   = mobileUtils.getDataToString(data.REP_ID);
	var userIdTmp = mobileUtils.getDataToString(data.USER_ID);
	var repStartTime = mobileUtils.getDataToString(data.REP_START_TIME);
	var repEndTime  = mobileUtils.getDataToString(data.REP_END_TIME);
	var repContent  = mobileUtils.getDataToString(data.REP_CONTENT);
	var repNextContent  = mobileUtils.getDataToString(data.REP_NEXT_CONTENT);
	
	var panelContent = '';
	var contentDiv = '';
	if(0 == type){
	     panelContent = '<form id="WeekReportInfoForm" action="" method="get">'
					 +'<div class="toolsBar noSearch">'
					 +'<div class="tbLeft">'
					 +'<div class="tabsMenu selected">新增工作周报</div>'
					 +'</div>'
					 +'<div class="tbRight">'
					 +'<a class="txtBt icon-loop" click="">重置</a>'
					 +'<a class="txtBt icon-checkmark" id="addWeekReport2" onclick="javascript:saveWeekReportInfo(2);">提交</a>'
					 +'<a class="txtBt icon-checkmark" id="addWeekReport" onclick="javascript:saveWeekReportInfo(1);">保存</a>'
					 +'</div>'
					 +'</div>'
					 
					 + '<input name="userId" value="'+userId+'" type="hidden" />'
					 
					 + '<div class="formCell"><label><span class="red">*</span>周期起始日期：</label><div class="fcContent"><input id="repStartTime" name="repStartTime" value="" readonly="readonly"  onclick="dateUtils.datePicker(\'repStartTime\',\'date\');" type="text" ></div></div>'
					 + '<div class="formCell"><label><span class="red">*</span>周期结束日期：</label><div class="fcContent"><input id="repEndTime" name="repEndTime" value=""  readonly="readonly"  onclick="dateUtils.datePicker(\'repEndTime\',\'date\');" type="text" ></div></div>'
					 + '<div class="formCell"><label><span class="red">*</span>本周工作内容：</label><div class="fcContent"><textarea id="repContent" name="repContent" rows="6" placeholder="本周工作内容"></textarea></div></div>'
					 + '<div class="formCell"><label><span class="red">*</span>下周工作计划：</label><div class="fcContent"><textarea id="repNextContent" name="repNextContent" rows="6" placeholder="下周工作计划"></textarea></div></div>'
					 + '</div>'
					 
					 + '</form>';
	
	}else if(1 == type){
		
		panelContent = '<form id="WeekReportInfoForm" action="" method="get">'
			 +'<div class="toolsBar noSearch">'
			 +'<div class="tbLeft">'
			 +'<div class="tabsMenu selected">工作周报详情</div>'
			 +'</div>'
			 +'<div class="tbRight">'
			 +'<a class="txtBt icon-checkmark" id="submitWeekReport" onclick="javascript:submitWeekReport();">提交</a>'
			 +'</div>'
			 +'</div>'
			 + '<div class="formContent /*row2*/">'
			 
			 + '<div class="formCell"><label>周期起始日期：</label><div class="fcContent"><input name="repStartTime" value="'+repStartTime+'"  readonly="readonly"  onclick="dateUtils.datePicker(\'repStartTime\',\'date\');" type="text" ></div></div>'
			 + '<div class="formCell"><label>周期结束日期：</label><div class="fcContent"><input name="repEndTime" value="'+repEndTime+'"  readonly="readonly"  onclick="dateUtils.datePicker(\'repEndTime\',\'date\');" type="text" ></div></div>'
			 + '<div class="formCell"><label>本周工作内容：</label><div class="fcContent"><textarea name="repContent" rows="6" placeholder="本周工作内容">'+repContent+'</textarea></div></div>'
			 + '<div class="formCell"><label>下周工作计划：</label><div class="fcContent"><textarea name="repNextContent" rows="6" placeholder="下周工作计划">'+repNextContent+'</textarea></div></div>'
			 + '</div>'
			 + '<input id="repIdStr" name="repId" type="hidden" value="'+repId+'"/>'
			 + '</form>';
	}else{
		
	}
	
	contentDiv = '<div id="createWeekReportPanel" title="工作周报详情" class="panel" data-footer="none">'
		   + '<header>'
		   + '<div class="top_header"> '
		   + '<a id="button backButton" href="javascript:toWeekReportPanel();" class="button" >返回</a> '
		   + ' <h1>工作周报</h1></div></header>'
		   + panelContent
		   + '</div>';
	
	var el = $.query("#createWeekReportPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("createWeekReportPanel", contentDiv);
	} else {
		$.ui.updatePanel("createWeekReportPanel", panelContent);
	}
	$.ui.loadContent("createWeekReportPanel");
	
	if(1 == type){
        if(repStatus == 1){
			$("#submitWeekReport").attr('onclick','mesUtil.alert("周报已经提交！");');
		}
		
	}
}
/***
 * 保存周报信息
 * @param type shi 保存操作的类型，1:普通保存 2:提交式保存
 */
function saveWeekReportInfo(type) {
	
	if(!validateForm()){//表单验证
		return false;
	}

	var condition = $("#WeekReportInfoForm").serialize();//获取form表单的值
	mobileUtils.showLoading('正在保存...');
	if(type == 2){
		condition += '&subFlag=1';
	}
	
	$.ajax({
		type : "POST",
		url : basePath+'weekReportAction!saveData.json?'+condition,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			//alert('保存成功！');
			
			$.ui.loadContent('weekReportPanel');
			var signInQuery = PageBarFactory.get(config);
			var url = queryConfigUrl();
		    signInQuery.queryFun(url);
		},
		error:function(){
			mobileUtils.hideLoading();
			mesUtil.alert('保存失败！');
		}
	});	
}
/***
 * 显示详情页面
 * @param custId 客户ID
 */
function weekReportShowDetail(objId) {
	var condition = {};
	condition.REP_ID = objId;
	$.ajax({
		type : "GET",
		url : basePath + 'weekReportAction.json?condition='+$.toJSON(condition),
		cache : false,
		// async: false,
		dataType : "json",
			success : function(response) {
				createWeekReportPanel(response.json.data[0],1);
			},
			error : function() {
				
			}
	});
}

/***
 * 提交周报信息
 */
function submitWeekReport() {
	var repId = $("#repIdStr").val();//获取form表单的值
	mobileUtils.showLoading('正在保存...');
	$.ajax({
		type : "POST",
		url : basePath+'weekReportAction!submitStatus.json?repId='+repId,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			//alert('保存成功！');
			
			$.ui.loadContent('weekReportPanel');
			var signInQuery =PageBarFactory.get(config);
			var url = queryConfigUrl();
		    signInQuery.queryFun(url);
		},
		error:function(){
			mobileUtils.hideLoading();
			mesUtil.alert('保存失败！');
		}
	});	
}

/***
 * 表单验证
 */

function validateForm(){
	var repStartTime = $("#repStartTime").val();
	var repEndTime = $("#repEndTime").val();
	var repContent = $.trim($("#repContent").val());
	var repNextContent = $.trim($("#repNextContent").val());

	if(!$("#repStartTime").valid()){
		mesUtil.alert('请选择周期起始日期！');
		return false;
	}
	
	if(!$("#repEndTime").valid()){
		mesUtil.alert('请选择周期结束日期！');
		return false;
	}
	
	if(compareTime(repStartTime,repEndTime) == -1){
		mesUtil.alert('周期结束日期不能早于周期起始日期！');
		return false;
	}

	if('' == repContent || undefined == repContent){
		mesUtil.alert('请输入本周工作内容！');
		return false;
	}
	if('' == repNextContent || undefined == repNextContent){
		mesUtil.alert('请输入下周工作计划！');
		return false;
	}
	
	return true;
}

/***
 * 点击头部删除按钮触发事件
 */
function deleteWeekReports() {
	
	var lis = $("#weekReport_list li .editTools");
	var display = 'block';
	var buttonName = '完成';
	if($("#deleteWeekReport").html() == "完成") {
		display = 'none';
		buttonName = '编辑';
		 var scrollObj = PageBarFactory.get(config);
		 scrollObj.disableScroller(false);
	} else {
		var scrollObj = PageBarFactory.get(config);
		 scrollObj.disableScroller(true);
	}
	$("#deleteWeekReport").html(buttonName);
	if(lis.length > 0) {
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.display = display;
		}
	}
}
/***
 * 点击每条记录上删除按钮触发事件
 */
function deleteWeekReport(repId,status) {
	
	if(status == 1){
		mesUtil.alert('周报已经提交不能删除！');
		return;
	}
		
	mobileUtils.showLoading('正在提交...');
	$.ajax({
		type : "GET",
		url : basePath+'weekReportAction!delete.json?repId='+repId,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			mesUtil.alert('删除成功！');
			toWeekReportPanelAndRefreshData();
			deleteWeekReports();
		},
		error:function(){
			mobileUtils.hideLoading();
			mesUtil.alert('删除失败！');
		}
	});	
}

/**
 * 操作成功刷新列表
 */
function toWeekReportPanelAndRefreshData(){
	$.ui.loadContent('weekReportPanel');
	var signInQuery = PageBarFactory.get(config);
	var url = queryConfigUrl();
    signInQuery.queryFun(url);
}

/***
 * 比较两个日期先后顺序
 */
function compareTime(beginTime,endTime){ 
	 var beginTimes=beginTime.substring(0,10).split('-');
	 var endTimes=endTime.substring(0,10).split('-');
	 
	 beginTime=beginTimes[1]+'-'+beginTimes[2]+'-'+beginTimes[0]+' '+beginTime.substring(10,19);
	 endTime=endTimes[1]+'-'+endTimes[2]+'-'+endTimes[0]+' '+endTime.substring(10,19);

	 var a =(Date.parse(endTime)-Date.parse(beginTime))/3600/1000;
	 
	 if(a<0){
	 return -1;
	 }else if (a>0){
	 return 1;
	 }else if (a==0){
	 return 0;
	 }else{
		 
	 return 'exception'
	 }
	}

/***
 * 返回工作周报主面板
 */
function toWeekReportPanel() {
	$.ui.loadContent('weekReportPanel');
}
