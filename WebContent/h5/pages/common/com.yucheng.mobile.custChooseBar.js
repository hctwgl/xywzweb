/**
 * 客户选择器
 * @since 2014/11/19
 * @author wangwan1@yuchengtech.com
 * 
 */
/**
 * 客户选择器-返回数据方法
 * @param custId  待返回所选客户ID
 * @param custName 待返回所选客户名称
 * @param inputName 返回客户名称表单name
 * @param inputId   返回客户Id表单name
 * @param panelId	返回面板Id
 */
function returnValue(custId,custName,inputName,inputId,panelId){
	$.ui.loadContent(panelId);
	inputName='#'+inputName;
	inputId='#'+inputId;
	$(inputId).val(custId);
	$(inputName).val(custName);
}
/**
 * 客户选择器-渲染带选择客户面板
 * @param inputName 返回客户名称表单name
 * @param inputId   返回客户Id表单name
 * @param panelId   返回面板Id
 */
function custChoose(inputName,inputId,panelId){
	var listReader = {
			mapping : [{name : 'CUST_ID'},
			           {name : 'CUST_NAME'},
		          	   {name : 'IDENT_NO'},
		          	   {name : 'PANEL_ID'},
		          	   {name: 'LINKMAN_TEL'},
		          	   {name : 'CUST_TYPE_ORA'},
		          	   {name : 'IDENT_TYPE_ORA'},
		          	   {name : 'CUST_LEVEL_ORA'},
		          	   {name : 'CUST_STAT_ORA'}],
		     record:'<li><a id="test" onclick="returnValue(\'@CUST_ID\',\'@CUST_NAME\',\''+inputName+'\',\''+inputId+'\',\''+panelId+'\');" href="javascript:void(0);" >'
					+ '<div class="listCell lcBig" style="width:20%;">@CUST_NAME</div>'
					+ '<div class="listCell" style="width:20%;">联系电话:@LINKMAN_TEL</div>'
					+ '<div class="listCell" style="width:20%;">客户类型:@CUST_TYPE_ORA<br/>客户号:@CUST_ID</div>'
					+ '<div class="listCell" style="width:20%;">证件类型:@IDENT_TYPE_ORA<br/>证件号码:@IDENT_NO</div>'
					+ '<div class="listCell" style="width:20%;">客户状态:@CUST_STAT_ORA<br/>客户级别:@CUST_LEVEL_ORA</div>'
					+'</a></li>'
	}
	var condition = {};
	condition.CUST_NAME = $("#searchCustKey").val();
	var config = {
		filter : false,
		pageConfig : {
			limit : 5,
			queryUrl : basePath + 'mobileCustomerQuery.json?condition='+$.toJSON(condition),
			listViewId : 'showCustChooseBar',
			listReader : listReader,
			success : function(response){},
			error : function(){
				mesUtil.alert('数据加载失败');
			}
		}
	};
	var panelContent = '<header>'
	   + '<div> '
	   + '<a href="javascript:$.ui.loadContent(\''+panelId+'\');" class="button backButton" >返回</a> '
	   +'</div></header>'
	   + '<div class="toolsBar">'
	   + '<div class="tbLeft">'
	   + '<input id="searchCustKey"  type="text" class="txtSearch" placeholder="请输入客户名称或证件号码查询…"/>'
	   + '<a href="javacript:customerQuery();" class="btSearch icon-search" >搜索</a>'
	   + '</div></div>'
		+'<div><ul class="list" id="showCustChooseBar"></ul></div>';
	var contentDiv = 
		'<div id="showCustChoosePanel" class="panel" title="客户选择器" data-footer="none">'
			   + panelContent
			    + '</div>';

		var el = $.query("#showCustChoosePanel").get(0);
		if(!el) {
			$.ui.addContentDiv("showCustChoosePanel", contentDiv);
		} else {
			$.ui.updatePanel("showCustChoosePanel", panelContent);
		}
		$.ui.loadContent("showCustChoosePanel");
		var customerQuery = PageBarFactory.get(config);
		//var customerQuery = $('#showCustChooseBar').scrollBar(config);
		customerQuery.queryFun();
		function customerQuery() {
			customerQuery.queryFun(basePath + 'mobileCustomerQuery.json?key='+$("#searchCustKey")[0].value);
		}
}
