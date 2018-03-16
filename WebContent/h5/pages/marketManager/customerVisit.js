/***
 * 客户接触
 * 作者 ：
 * 时间 ：
 * 版本 ：v1.0.0
 */
var user 		= parent.mobileApp.getUserInfo();//当前登陆用户的基本信息保存对象
var userId		= user.userId;//从当前登陆用户对象中获取用户编号
/***
 * 后台查询到列表数据展示格式对象
 */
var listReader = {
		mapping : [{name : 'CONTACT_ID'},
		           {name : 'CONTACT_THEME'},
		           {name : 'CONTACT_DATE'},
		           {name : 'CHANEL_NAME'},
		           {name : 'CUST_PARTICIPANT'},
		           {name : 'OUR_PARTICIPANT'},
		           {name : 'CONTACT_CONTENT'}
		           ],
	    record:''
			+ '<li id="li_@CONTACT_ID">'
			+'<div class="editTools"><a class="icon-cancel-circle" id="@CONTACT_ID" onclick="javascript:deleteCustomerVisit(\'@CONTACT_ID\');"></a></div>'
			+ '<a href="javascript:customerVisitShowDetail(\'@CONTACT_ID\')">'
			+ '<div class="listCell lcBig" style="width:33%;">接触主题：@CONTACT_THEME<br/>接触时间：@CONTACT_DATE</div>'
			+ '<div class="listCell" style="width:33%;">客户参与人：@CUST_PARTICIPANT<br/>我方参与人：@OUR_PARTICIPANT</div>'
			+ '<div class="listCell" style="width:33%;">接触渠道：@CHANEL_NAME<br/>沟通内容：@CONTACT_CONTENT</div>'
			+'</a></li>'
};
/***
 * 请求后台并展示我的商机数据
 */
var config = {
	filter : false,
	pageConfig : {
		limit : 10,
		queryUrl : basePath + 'customerVisitAction.json?contactUserId='+ userId,
		listViewId : 'customerVisit_list',
		listReader : listReader,
		success : function(response){},
		error : function(){
			mesUtil.alert('数据加载失败');
		}
	}
};
 
/***
 * 获取当前日期
 */
function getNowDate(){
	var date=new Date();
	return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
};
/***
 *添加客户
 * */
function addCustomerVisit() {
	addCustomerVisitPanel({});
}
/***
 * 点击列表界面编辑按钮，进入删除功能
 */
function editCustomerVisit() {
	
	var lis = $("#customerVisit_list li .editTools");
	var display = 'block';
	var buttonName = '完成';
	if($("#editCustomerVisit").html() == "完成") {
		display = 'none';
		buttonName = '编辑';
		var customerVisit = PageBarFactory.get(config);
		customerVisit.disableScroller(false);
		//$("#customerVisit_list").scrollBar.disableScroller(false);
	} else {
		var customerVisit = PageBarFactory.get(config);
		customerVisit.disableScroller(true);
		//$("#customerVisit_list").scrollBar.disableScroller(true);
	}
	$("#editCustomerVisit").html(buttonName);
	if(lis.length > 0) {
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.display = display;
		}
	}
}
/***
 * 删除客户接触数据
 */
function deleteCustomerVisit(contactId) {
	mobileUtils.showLoading('正在提交...');
	$.ajax({
		type : "GET",
		url : basePath+'customerVisitAction!delete.json?contactId='+contactId,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			$("#li_"+contactId).remove();
			mesUtil.alert('删除成功！');
			editCustomerVisit();
			toCustomerVisitPanelAndRefreshData();
		},
		error:function(){
			mobileUtils.hideLoading();
			mesUtil.alert('删除失败！');
		}
	});	
};
/***
 * 返回我的商机主面板
 */
function toCustomerVisitPanel() {
	$.ui.loadContent('customerVisitPanel');
}
/***
 * 返回我的商机主面板
 */
function toCustomerVisitPanelAndRefreshData() {
	var customerVisit = PageBarFactory.get(config);
	customerVisit.queryFun();
	//var customerVisit = $('#customerVisitPanel').scrollBar(config);
	//customerVisit.scrollBar.queryFun();
	$.ui.loadContent('customerVisitPanel');
}
/***
 * 在客户接触详情切换到修改页面时设置相应输入内容字段可编辑
 */
function setDisabled(flag){
	$('#input_contactTheme').attr("disabled",flag);
	$('#custName').attr("disabled",flag);
	$('#selectContactChanel').attr("disabled",flag);
	$('#textarea_custParticipant').attr("disabled",flag);
	$('#textarea_ourParticipant').attr("disabled",flag);
	$('#textarea_contactContent').attr("disabled",flag);
	$('#input_contactDate').attr("disabled",flag);
	if(flag){
		$('#div_deail').show();
		$('#div_modify').hide();
		$("#h1_header").text("客户接触详情");
	}else{
		$('#div_deail').hide();
		$('#div_modify').show();
		$("#h1_header").text("修改客户接触");
	}
};
/**
 * 取消修改，返回到详情页面
 * @param data panel信息
 */
function cancleModify(){
	$('#modifyCustomerVisitInfoForm')[0].reset();
	setDisabled(true);
}
/**
 * 创建详情panel
 * @param data panel信息
 */
function createCustomerVisitPanel (data) {
	var contactId   	= mobileUtils.getDataToString(data.CONTACT_ID);
	var contactTheme 	= mobileUtils.getDataToString(data.CONTACT_THEME);
	var custId 			= mobileUtils.getDataToString(data.CUST_ID);
	var custName     	= mobileUtils.getDataToString(data.CUST_NAME);
	var contactChanel   = mobileUtils.getDataToString(data.CONTACT_CHANEL);
	var custParticipant = mobileUtils.getDataToString(data.CUST_PARTICIPANT);
	var ourParticipant  = mobileUtils.getDataToString(data.OUR_PARTICIPANT);
	var contactContent  = mobileUtils.getDataToString(data.CONTACT_CONTENT);
	var contactDate     = mobileUtils.getDataToString(data.CONTACT_DATE);
	
	var contactUserId   = mobileUtils.getDataToString(data.CONTACT_USER_ID);
	var contactUserName = mobileUtils.getDataToString(data.CONTACT_USER_NAME);
	var contactOrgId    = mobileUtils.getDataToString(data.CONTACT_ORG_ID);
	var contactOrgName  = mobileUtils.getDataToString(data.CONTACT_ORG_NAME);
	
	var panelContent = '<header>'
					 + '	<div class="top_header"> '
					 + '		<a href="javascript:$.ui.loadContent(\'customerVisitPanel\');" class="button backButton" >返回</a> '
					 + ' 		<h1 id="h1_header">客户接触</h1>'
					 + '	</div>'
					 + '</header>'
					 + '<form id="modifyCustomerVisitInfoForm" action="" method="get">'
					 + '	<div id="div_modify" class="toolsBar noSearch">'
					 + '		<div class="tbLeft">'
					 + '			<div class="tabsMenu selected">修改客户接触</div>'
					 + '		</div>'
					 + '		<div class="tbRight">'
					 + '			<a class="txtBt icon-loop" onclick="javascript:cancleModify();">取消</a>'
					 + '			<a class="txtBt icon-loop" onclick="javascript:$(\'#modifyCustomerVisitInfoForm\')[0].reset();">重置</a>'
					 + '			<a class="txtBt icon-checkmark" id="modifyCustomerVisit" onclick="javascript:saveCustomerVisitInfo(\'modifyCustomerVisitInfoForm\');">保存</a>'
					 + '		</div>'
					 + '	</div>'
					 + '	<div id="div_deail" class="toolsBar noSearch">'
					 + '		<div class="tbLeft">'
					 + '			<div class="tabsMenu selected">客户接触详情</div>'
					 + '		</div>'
					 + '		<div class="tbRight">'
					 + '			<a class="txtBt icon-pencil" onclick="javascript:modifyCustomerVisit();">修改</a>'
					 + '		</div>'
					 + '	</div>'
					 + '	<div class="formContent /*row2*/">'
					 + '     	<input readonly="true" name="contactId" value="'+ contactId+'" type="hidden" placeholder="客户接触编号"/>'
					 + '     	<input readonly="true" name="contactUserId" value="'+ contactUserId+'" type="hidden" placeholder="客户接触人ＩＤ"/>'
					 + '     	<input readonly="true" name="contactUserName" value="'+ contactUserName+'" type="hidden" placeholder="客户接触人名称"/>'
					 + '     	<input readonly="true" name="contactOrgId" value="'+ contactOrgId+'" type="hidden" placeholder="客户接触组织ＩＤ"/>'
					 + '     	<input readonly="true" name="contactOrgName" value="'+ contactOrgName+'" type="hidden" placeholder="客户接触组织名称"/>'
					 + '		<div class="formCell"><label><span class="red">*</span>接触主题：</label><div class="fcContent"><input id="input_contactTheme" name="contactTheme" value="'+contactTheme+'" type="text" placeholder="接触主题"/></div></div>'
					 + '		<div class="formCell"><label><span class="red">*</span>接触日期：</label><div class="fcContent"><input id="input_contactDate" name="contactDate" value="'+ contactDate +'" type="date" placeholder="访问日期"/></div></div>'
					 + '    	<input id="custId" readonly="true" name="custId" value="'+custId+'" type="hidden" placeholder="客户编号"/>'
					 + '     	<div class="formCell"><label><span class="red">*</span>客户名称：</label><div class="fcContent"><input  id="custName" readonly="true" name="custName" value="'+ custName +'" type="text"  placeholder="请选择..." onclick="javascript:custChoose(\'custName\',\'custId\',\'createCustomerVisitPanel\');" readonly="true"/><div class="fcContent"></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>接触渠道：</label><div class="fcContent">'
					 + '			<select id="selectContactChanel" name="contactChanel" value="'+contactChanel+'">'
					 + '				<option id="option_0" value="0">现场拜访</option>'
					 + '				<option id="option_1" value="1">电话拜访</option>'
					 + '				<option id="option_2" value="2">会议拜访</option>'
					 + '				<option id="option_3" value="3">邮件拜访</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>客户参与人员：</label><div class="fcContent"><input id="textarea_custParticipant" name="custParticipant" value="'+custParticipant+'" type="text" placeholder="客户参与人员" /></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>我方参与人员：</label><div class="fcContent"><input id="textarea_ourParticipant" name="ourParticipant" value="'+ourParticipant+'" type="text" placeholder="客户参与人员"/></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>接触内容：</label><div class="fcContent"><textarea id="textarea_contactContent" name="contactContent" rows="6" placeholder="接触内容">'+contactContent+'</textarea></div></div>'
					 + '	</div>'
					 + '</form>';
	var contentDiv = '<div id="createCustomerVisitPanel" title="客户接触详情" class="panel" data-footer="none">'
  				   	+ panelContent
 				    + '</div>';
	var el = $.query("#createCustomerVisitPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("createCustomerVisitPanel", contentDiv);
	} else {
		$.ui.updatePanel("createCustomerVisitPanel", panelContent);
	}
	if(0==contactChanel||"0"==contactChanel){
		$('#option_0').attr('selected','selected');
	}else if(1==contactChanel||"1"==contactChanel){
		$('#option_1').attr('selected','selected');
	}else if(2==contactChanel||"2"==contactChanel){
		$('#option_2').attr('selected','selected');
	}else if(3==contactChanel||"3"==contactChanel){
		$('#option_3').attr('selected','selected');
	}
	$.ui.loadContent("createCustomerVisitPanel");
}
/***
 * 保存客户接触信息
 * formID:需要保存的formID
 */
function modifyCustomerVisit() {
	setDisabled(false);
}
/***
 * 保存客户接触信息
 * formID:需要保存的formID
 */
function saveCustomerVisitInfo(formID) {
	var contactTheme    = $("#input_contactTheme").val();
	if(contactTheme == null || contactTheme == "undefined" || contactTheme == ""){
		mesUtil.alert("请输入客户接触主题！");
		return;
	}
	var contactDate    = $("#input_contactDate").val();
	if(contactDate == null || contactDate == "undefined" || contactDate == ""){
		mesUtil.alert("请输入客户接触日期！");
		return;
	}
	var custName    = $("#custName").val();
	if(custName == null || custName == "undefined" || custName == ""){
		mesUtil.alert("请选择客户！");
		return;
	}
	var contactChanel    = $("#selectContactChanel").val();
	if(contactChanel == null || contactChanel == "undefined" || contactChanel == ""){
		mesUtil.alert("请选择接触渠道！");
		return;
	}
	var custParticipant    = $("#textarea_custParticipant").val();
	if(custParticipant == null || custParticipant == "undefined" || custParticipant == ""){
		mesUtil.alert("请输入客户参与人员！");
		return;
	}
	var ourParticipant    = $("#textarea_ourParticipant").val();
	if(ourParticipant == null || ourParticipant == "undefined" || ourParticipant == ""){
		mesUtil.alert("请输入我方参与人员！");
		return;
	}
	var contactContent    = $("#textarea_contactContent").val();
	if(contactContent == null || contactContent == "undefined" || contactContent == ""){
		mesUtil.alert("请输入接触内容！");
		return;
	}
	var condition = $("#"+formID).serialize();//获取form表单的值
	mobileUtils.showLoading('正在保存...');
	$.ajax({
		type : "POST",
		url : basePath+'customerVisitAction.json?'+condition,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			mesUtil.alert('保存成功！');
			toCustomerVisitPanelAndRefreshData();
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
function customerVisitShowDetail(contactId) {
	$.ajax({
		type : "GET",
		url : basePath + 'customerVisitAction.json?contactId='+contactId+'&param=abcabc',
		cache : false,
		// async: false,
		dataType : "json",
			success : function(response) {
				createCustomerVisitPanel(response.json.data[0]);
				setDisabled(true);
			},
			error : function() {
				mesUtil.alert('请求失败！');
			}
	});
}
/**
* 创建详情panel
* @param data panel信息
*/
function addCustomerVisitPanel () {
	var contactUserId		= user.userId;
	var contactUserName		= user.userName;
	var contactOrgId		= user.unitId;
	var contactOrgName		= user.unitName;
	
	var panelContent = '<header>'
					 + '	<div class="top_header"> '
					 + '		<a href="javascript:$.ui.loadContent(\'customerVisitPanel\');" class="button backButton" >返回</a> '
					 + ' 		<h1>新增客户接触</h1>'
					 + '	</div>'
					 + '</header>'
					 + '<form id="addCustomerVisitInfoForm" action="" method="get">'
					 + '	<div id="div_add" class="toolsBar noSearch">'
					 + '		<div class="tbLeft">'
					 + '			<div class="tabsMenu selected">新增客户接触</div>'
					 + '		</div>'
					 + '		<div class="tbRight">'
					 + '			<a class="txtBt icon-loop" onclick="javascript:$(\'#addCustomerVisitInfoForm\')[0].reset();">重置</a>'
					 + '			<a class="txtBt icon-checkmark" id="addCustomerVisit" onclick="javascript:saveCustomerVisitInfo(\'addCustomerVisitInfoForm\');">保存</a>'
					 + '		</div>'
					 + '	</div>'
					 + '	<div class="formContent /*row2*/">'
					 + '     	<input readonly="true" name="contactUserId" value="'+ contactUserId+'" type="hidden" placeholder="客户接触人ＩＤ"/>'
					 + '     	<input readonly="true" name="contactUserName" value="'+ contactUserName+'" type="hidden" placeholder="客户接触人名称"/>'
					 + '     	<input readonly="true" name="contactOrgId" value="'+ contactOrgId+'" type="hidden" placeholder="客户接触组织ＩＤ"/>'
					 + '     	<input readonly="true" name="contactOrgName" value="'+ contactOrgName+'" type="hidden" placeholder="客户接触组织名称"/>'
					 + '		<div class="formCell"><label><span class="red">*</span>接触主题：</label><div class="fcContent"><input id="input_contactTheme" name="contactTheme" value="" type="text" placeholder="接触主题"/></div></div>'
					 + '		<div class="formCell"><label><span class="red">*</span>接触日期：</label><div class="fcContent"><input id="input_contactDate" name="contactDate" value="'+ getNowDate() +'" type="date" placeholder="访问日期"/></div></div>'
					 + '    	<input id="custId" readonly="true" name="custId" value="" type="hidden" placeholder="客户编号"/>'
					 + '     	<div class="formCell"><label><span class="red">*</span>客户名称：</label><div class="fcContent"><input  id="custName" readonly="true" name="custName" type="text"  placeholder="请选择..." onclick="javascript:custChoose(\'custName\',\'custId\',\'addCustomerVisitPanel\');" readonly="true"/><div class="fcContent"></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>接触渠道：</label><div class="fcContent">'
					 + '			<select id="selectContactChanel" name="contactChanel">'
					 + '				<option value="0" selected="selected">现场拜访</option>'
					 + '				<option value="1">电话拜访</option>'
					 + '				<option value="2">会议拜访</option>'
					 + '				<option value="3">邮件拜访</option>'
					 + '			</select>'
					 + '		</div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>客户参与人员：</label><div class="fcContent"><input id="textarea_custParticipant" name="custParticipant" value="" type="text" placeholder="客户参与人员" class=""/></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>我方参与人员：</label><div class="fcContent"><input id="textarea_ourParticipant" name="ourParticipant" value="" type="text" placeholder="客户参与人员" class=""/></div></div>'
					 + '    	<div class="formCell"><label><span class="red">*</span>接触内容：</label><div class="fcContent"><textarea id="textarea_contactContent" name="contactContent" rows="6" placeholder="接触内容" class=""></textarea></div></div>'
					 + '	</div>'
					 + '</form>';
	var contentDiv = '<div id="addCustomerVisitPanel" title="新增客户接触" class="panel" data-footer="none">'
 				   	+ panelContent
				    + '</div>';
	var el = $.query("#addCustomerVisitPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("addCustomerVisitPanel", contentDiv);
	} else {
		$.ui.updatePanel("addCustomerVisitPanel", panelContent);
	}
	$.ui.loadContent("addCustomerVisitPanel");
}