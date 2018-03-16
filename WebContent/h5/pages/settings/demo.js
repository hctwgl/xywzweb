/***
 * 客户接触
 * 作者 ：
 * 时间 ：
 * 版本 ：v1.0.0
 */

/**
 * 列表配置信息中的reader
 */
var listReader = {
		mapping : [{name : 'CUST_ID'},
		           {name : 'CUST_NAME'},
	          	   {name : 'CUST_TYPE'},
	          	   {name : 'ADDR'},
	          	   {name : 'VISIT_DATE'}],
	    record:''
			+ '<li id="li_@CUST_ID">'
			+'<div class="editTools"><a class="icon-cancel-circle" id="@CUST_ID" onclick="javascript:deleteCustomerVisit(\'@CUST_ID\');"></a></div>'
			+ '<a href="javascript:customerVisitShowDetail(\'@CUST_ID\');">'
			+ '<div class="listCell lcBig"style="width:35%;">客户名称：@CUST_NAME</div>'
			+ '<div class="listCell" style="width:35%;">客户类型：@CUST_TYPE<br/>地址：@ADDR</div>'
			+ '<div class="listCell" >拜访日期：@VISIT_DATE</div>'
			+'</a></li>'
};
/**
 * 列表配置信息
 */
var config = {
	filter : false,
	pageConfig : {
		limit : 5, //分页大小
		queryUrl : basePath + 'mobileDemoAction.json',//查询URL
		listViewId : 'customerVisit_list',
		listReader : listReader,
		success : function(response){
			//alert('加载成功');
		},
		beforeRecordShow : function(record, data) {
			return record = record.replace('拜访日期', '接触日期');
		},
		error : function(){
			mesUtil.alert('数据加载失败');
		}
	}
};
/**
 * 新增
 */
function addCustomerVisit() {
	createCustomerVisitPanel({});
	$('#custId').attr("disabled",false);
	$('#custName').attr("disabled",false);
	$('#visitDate').attr("disabled",false);
	$('#addr').attr("disabled",false);
	$('#detailTBar').hide();
	$('#addTBar').show();
	$("#visitHeader").text("新增客户接触");
}
/**
 * 列表按钮
 * 编辑
 */
function editCustomerVisit(customerVisit) {	
	var lis = $("#customerVisit_list li .editTools");
	var display = 'block';
	var buttonName = '完成';
	if($("#editCustomerVisit").html() == "完成") {
		display = 'none';
		buttonName = '编辑';
		customerVisit.disableScroller(false);
	} else {
		customerVisit.disableScroller(true);
	}
	$("#editCustomerVisit").html(buttonName);
	if(lis.length > 0) {
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.display = display;
		}
	}
}
/**
 * 删除
 * @param custId 客户ID
 */
function deleteCustomerVisit(custId) {
	mobileUtils.showLoading('正在提交...');
	$.ajax({
		type : "GET",
		url : basePath+'mobileDemoAction!delete.json?custId='+custId,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			$("#li_"+custId).remove();
			//alert('删除成功！');
		},
		error:function(){
			mobileUtils.hideLoading();
			alert('删除失败！');
		}
	});	
}
/**
 * 创建详情panel
 * @param data panel信息
 */
function createCustomerVisitPanel (data) {
	var custId   = mobileUtils.getDataToString(data.CUST_ID);
	var custName = mobileUtils.getDataToString(data.CUST_NAME);
	var custDate = mobileUtils.getDataToString(data.CUST_DATE);
	var addr     = mobileUtils.getDataToString(data.ADDR);
	var panelContent = '<header>'
					 + '<div class="top_header"> '
					 + '<a href="javascript:$.ui.loadContent(\'customerVisitPanel\');" class="button backButton" >返回</a> '
					 + ' <h1 id="visitHeader">客户接触详情</h1></div></header>'
					 + '<form id="CustomerVisitInfoForm" action="" method="get">'
					 + '	<div id="detailTBar" class="toolsBar noSearch">'
					 + '	<div class="tbLeft">'
					 + '		<div class="tabsMenu selected">客户接触详情</div>'
					 + '		</div>'
					 + '		<div class="tbRight">'
					 + '		<a class="txtBt icon-pencil" id="addCustomerVisit" onclick="javascript:editCustomerVisitInfo();">编辑</a>'
					 + '		</div>'
					 + '	</div>'
					 + '	<div id="addTBar" class="toolsBar noSearch" style="display:none;">'
					 + '	<div class="tbLeft">'
					 + '		<div class="tabsMenu selected">新增客户接触</div>'
					 + '		</div>'
					 + '		<div class="tbRight">'
					 + '			<a class="txtBt icon-loop" onclick="javascript:resetForm();">重置</a>'
					 + '			<a class="txtBt icon-checkmark" onclick="javascript:saveCustomerVisitInfo();">保存</a>'
					 + '		</div>'
					 + '	</div>'
					 + '	<div  id="editTBar" class="toolsBar noSearch" style="display:none;">'
					 + '		<div class="tbLeft">'
					 + '			<div class="tabsMenu selected">编辑客户接触</div>'
					 + '		</div>'
					 + '		<div class="tbRight">'
					 + '			<a class="txtBt icon-reply" onclick="javascript:cancelEditCustomerVisitInfo();">取消</a>'
					 + '			<a class="txtBt icon-loop" onclick="javascript:resetForm();">重置</a>'
					 + '			<a class="txtBt icon-checkmark" onclick="javascript:saveCustomerVisitInfo();">保存</a>'
					 + '		</div>'
					 + '	</div>'
					 + '<div class="formContent">'
					 + '<div class="formCell"><label><span class="red">*</span>客户ID：</label><div class="fcContent"><input id="custId" readonly="true" name="custId" value="'+ custId+'" type="text" placeholder="客户Id"></div></div>'
					 + '<div class="formCell"><label><span class="red">*</span>客户名称：</label><div class="fcContent"><input  id="custName" readonly="true" name="custName"  type="text"  placeholder="请选择..." onclick="javascript:custChoose(\'custName\',\'custId\',\'createCustomerVisitPanel\');" ></div></div>'
					 + '<div class="formCell"><label>访问日期：</label><div class="fcContent"><input id="visitDate" name="visitDate" value="'+ custDate +'" disabled="true" type="text" placeholder="访问日期"></div></div>'
					 + '<div class="formCell"><label>地址：</label><div class="fcContent"><textarea disabled="true" id="addr" name="addr" rows="6" placeholder="地址">'+addr+'</textarea></div></div>'
					 + '</div>'
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
	$.ui.loadContent("createCustomerVisitPanel");
}
/***
 * 重置
 */
function resetForm() {
	$('#CustomerVisitInfoForm')[0].reset();
}
/***
 * 编辑详情
 */
function editCustomerVisitInfo(){
	$('#custId').attr("disabled",false);
	$('#custName').attr("disabled",false);
	$('#visitDate').attr("disabled",false);
	$('#addr').attr("disabled",false);
	$('#detailTBar').hide();
	$('#addTBar').hide();
	$('#editTBar').show();
	$("#visitHeader").text("编辑客户接触");
};
/***
 * 取消编辑
 */
function cancelEditCustomerVisitInfo(){
	$('#custId').attr("disabled",true);
	$('#custName').attr("disabled",true);
	$('#visitDate').attr("disabled",true);
	$('#addr').attr("disabled",true);
	$('#detailTBar').show();
	$('#editTBar').hide();
	$('#addTBar').hide();
	$("#visitHeader").text("客户接触详情");
};
/***
 * 保存客户接触信息
 */
function saveCustomerVisitInfo() {
	var condition = $("#CustomerVisitInfoForm").serialize();//获取form表单的值
	mobileUtils.showLoading('正在保存...');
	$.ajax({
		type : "POST",
		url : basePath+'mobileDemoAction.json?'+condition,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			//alert('保存成功！');
			cancelEditCustomerVisitInfo();
		},
		error:function(){
			mobileUtils.hideLoading();
			alert('保存失败！');
		}
	});	
}
/***
 * 显示详情页面
 * @param custId 客户ID
 */
function customerVisitShowDetail(custId) {
	$.ajax({
		type : "GET",
		url : basePath + 'mobileDemoAction.json?custId='+custId,
		cache : false,
		// async: false,
		dataType : "json",
			success : function(response) {
				createCustomerVisitPanel(response.json.data[0]);
			},
			error : function() {
				
			}
	});
}

/***
 * 显示详情页面（仅提供UI结构）
 * @param yourParameters 自定义参数
 */
function demoView(){
	var panelContent = '<header>'
		+ '<div class="top_header"> '
		+ '<a href="javascript:$.ui.loadContent(\'customerVisitPanel\');" class="button backButton" >返回</a> '
		+ ' <h1>客户接触</h1></div></header>'
		+ '<form id="form1" action="" method="get">'
		+ '<div class="toolsBar noSearch">'
		+ '<div class="tbLeft">'
		+ '<div class="tabsMenu selected">详细信息</div>'
		+ '</div>'
		+ '<div class="tbRight">'
		+'<a class="txtBt icon-pencil" onclick="javascript:void(0);">编辑</a>'
		+'<a class="txtBt icon-reply" onclick="javascript:$.ui.loadContent(\'customerVisitPanel\');">返回</a>'
		+ '</div>'
		+ '</div>'
		+ '<div class="formContent viewContent">'
		+'<div class="formCell"><label>产品名称：</label><div class="fcContent">工银理财"共赢3号"2014年第44期A款法人理财产品4044ZSTA</div></div>'
		+'<div class="formCell"><label>产品分类：</label><div class="fcContent">银行理财</div></div>'
		+'<div class="formCell"><label>产品名称：</label><div class="fcContent">工银理财"共赢3号"2014年第44期A款法人理财产品4044ZSTA</div></div>'
		+'<div class="formCell"><label>产品分类：</label><div class="fcContent">银行理财</div></div>'
		+'<div class="formCell"><label>产品状态：</label><div class="fcContent">正常</div></div>'
		+'<div class="formCell"><label>期限：</label><div class="fcContent">24个月</div></div>'
		+'<div class="formCell"><label>费率：</label><div class="fcContent">6.65%</div></div>'
		+'<div class="formCell"><label>利率：</label><div class="fcContent">7.02%</div></div>'
		+'<div class="formCell"><label>预计年化收益率：</label><div class="fcContent">6.50%</div></div>'
		+'<div class="formCell"><label>产品介绍：</label><div class="fcContent">本产品主要投资于以下符合监管要求的各类资产一是债券存款等高流动性资产包括但不限于各类债券存款货币市场基金债券基金质押式回购等货币市场交易工具二是债权类资产特定客户委托贷款。</div></div>'
		+ '</div>'
		+ '</form>';
	var contentDiv = '<div id="testPanel" title="客户接触" class="panel" data-footer="none">'+ panelContent+ '</div>';
	var el = $.query("#testPanel").get(0);
	if(!el) {
	$.ui.addContentDiv("testPanel", contentDiv);
	} else {
	$.ui.updatePanel("testPanel", panelContent);
	}
	$.ui.loadContent("testPanel");
}



