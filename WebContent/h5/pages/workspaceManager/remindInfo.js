/***
 * 提醒信息查询
 * 作者 ：wangwan1@yuchengtech.com
 * 时间 ：2014-11-06
 * 版本 ：v1.0.0
 */
var panelId="remindInfoPanel";
var listReader = {
		mapping : [{name : 'INFO_ID'},
		           {name : 'CUST_ID'},
		           {name : 'CUST_NAME_T'},
	          	   {name : 'REMIND_REMARK'},
	          	   {name:'RULE_CODE_ORA'},
	          	   {name : 'MSG_CRT_DATE'},
	          	   {name : 'MSG_END_DATE'}],
	     record:'<li><a href="javascript:remindInfoShowDetail(\'@INFO_ID\');">'
				+ '<div class="listCell lcBig" style="width:25%;">提醒类别:@RULE_CODE_ORA</div>'
				+ '<div class="listCell" style="width:25%;">客户名称:@CUST_NAME_T</div>'
				+ '<div class="listCell" style="width:25%;">提醒日期:@MSG_CRT_DATE</div>'
				+ '<div class="listCell" style="width:25%;">提醒到期日:@MSG_END_DATE</div>'
				+'</a></li>'
}
var config = {
	filter : false,
	pageConfig : {
		limit : 10,
		queryUrl : basePath + 'MobileRemindInfoQueryAction.json?RULE_CODE='+'01',
		listViewId : 'remindInfo_list',
		listReader : listReader,
		success : function(response){},
		error : function(){
			mesUtil.alert('数据加载失败');
		}
	}
}
function addCustomerVisit() {
	createCustomerVisitPanel({});
}
/***
 * 显示详情页面
 * @param 提醒ID infoId
 */
function remindInfoShowDetail(infoId) {
	var condition = {};
	condition.INFO_ID = infoId;
	$.ajax({
		type : "GET",
		url : basePath + 'remindListQueryAction.json?condition='+$.toJSON(condition),
		cache : false,
		// async: false,
		dataType : "json",
			success : function(response) {
				debugger;
				createRemindInfoPanel(response.json.data[0]);
			},
			error : function() {
				
			}
	});
}
/***
 *查看详情
 */
function createRemindInfoPanel(data){
debugger;
	var ruleType   = mobileUtils.getDataToString(data.RULE_CODE_ORA);
	var custName = mobileUtils.getDataToString(data.CUST_NAME);
	var remindRemark = mobileUtils.getDataToString(data.REMIND_REMARK);
	var msgCrtDate     = mobileUtils.getDataToString(data.MSG_CRT_DATE);
	var msgEndDate     = mobileUtils.getDataToString(data.MSG_END_DATE);

	var panelContent = '<header>'
					 + '<div class="top_header"> '
					 + '<a href="javascript:$.ui.loadContent(\'remindInfoPanel\');" class="button backButton" >返回</a> '
					 + ' <h1>提醒信息详情</h1></div></header>'
					 + '<form id="remindInfoForm" action="" method="get">'
					 + '<div class="toolsBar noSearch">'
					 + '<div class="tbLeft">'
					 + '<div class="tabsMenu selected">提醒信息详情</div>'
					 + '</div>'
					 + '<div class="tbRight">'
//					 +'<a class="txtBt icon-reply" onclick="javascript:$.ui.loadContent(\'remindInfoPanel\');">返回</a>'
					 + '</div></div>'
					 + '<div class="formContent viewContent">'
						+'<div class="formCell"><label>提醒类别：</label><div class="fcContent">'+ruleType+'</div></div>'
						+'<div class="formCell"><label>客户名称：</label><div class="fcContent">'+custName+'</div></div>'
						+'<div class="formCell"><label>提醒日期：</label><div class="fcContent">'+msgCrtDate+'</div></div>'
						+'<div class="formCell"><label>提醒内容：</label><div class="fcContent">'+remindRemark+'</div></div>'
						+'<div class="formCell"><label>提醒到期日：</label><div class="fcContent">'+msgEndDate+'</div></div>'
						+ '</div>'
					 + '</form>';
	var contentDiv = '<div id="remindInfoDetailPanel" title="提醒信息详情" class="panel" data-footer="none">'
  				   	+ panelContent
 				    + '</div>';
	var el = $.query("#remindInfoDetailPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("remindInfoDetailPanel", contentDiv);
	} else {
		$.ui.updatePanel("remindInfoDetailPanel", panelContent);
	}
	$.ui.loadContent("remindInfoDetailPanel");

}
function  resetSearchCustPanel(){
	$(':input','#CustomerCheckForm')  
	 .not(':button, :submit, :reset, :hidden')  
	 .val('')  
	 .removeAttr('checked')  
	 .removeAttr('selected');
}
