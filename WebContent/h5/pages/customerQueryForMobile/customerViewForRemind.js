/**
 * 客户视图-客户提醒信息
 * @author:wangwan1@yuchengtech.com	
 * @since:2014/11/19
 */
function showCustRemindInfo(custId,panelId){
	
	var panelContent = 
				'<header>'
				+'<div class="top_header">'
				+'<a href="javascript:$.ui.loadContent(\panelId\);" class="button backButton" >返回</a>'
				+'<h1>客户视图</h1>'
				+'</div>'
				+'</header>'
				+'<div class="toolsBar noSearch">'
				+'<div class="tbLeft">'
				+'<div class="tabsMenu" onclick="javascript:showCustViewT();">概览信息</div>'
				+'<div class="tabsLine"></div>'
				+'<div class="tabsMenu " onclick="javascript:showCustView();">基本信息</div>'
				+'<div class="tabsLine"></div>'
				+'<div class="tabsMenu " onclick="javascript:showCustFinanInfo();">业务信息</div>'
				+'<div class="tabsLine"></div>'
				+'<div class="tabsMenu selected" onclick="javascript:showCustRemindInfo();">提醒信息</div>'
				+'<div class="tabsLine"></div>'
				+'<div class="tabsMenu " onclick="javascript:showCustCollectionInfo();">信息采集</div>'
				+'<div class="tabsLine"></div>'
				+'<div class="tabsMenu "  onclick="javascript:showCustMapInfo();">地图定位</div>'
				+'<div class="tabsLine"></div></div></div>'	  
				+'<ul id="custRemindInfo" class="list">'
				+'</ul>';
				
				var contentDiv = '<div id="showCustRemindPanel" title="客户视图" class="panel" data-footer="none">'+ panelContent+ '</div>';
				var el = $.query("#showCustRemindPanel").get(0);
				if(!el) {
				$.ui.addContentDiv("showCustRemindPanel", contentDiv);
				} else {
				$.ui.updatePanel("showCustRemindPanel", panelContent);
				}
				$.ui.loadContent("showCustRemindPanel");	
				
				initCustRemindInfo();
	/**
	 * 客户提醒信息查询
	 * 
	 */
	function initCustRemindInfo() {
		var data = {};
		data.userId = mobileApp.getUserInfo().userId;
		data.start  = 0;
		data.limit  = 5;
		$.ajax({
			type : "GET",
			url : basePath + 'remindListQueryAction.json',
			data : data,
			contentType: "application/json",  
			cache: false, 
			success : function(response){
				initCustRemindPanelInfo(response.json.data);
			},
			error:function(a,b,c){
				mesUtil.alert('提醒信息数据加载失败...','提示');
				
			}
		});
	}
	/**
	 * 提醒信息数据加载
	 * @param listData data
	 */
	function initCustRemindPanelInfo(listData){
		var len  = listData.length;  
		var listView = '';
		for (var i = 0; i < len; i++) { 
			listView += '<li  class="red">'
				+'<a href="#"   id="financeInfo'+ i
				+' "><div class="listCell lcBig" style="width:40%;">提醒类别:'+listData[i].RULE_CODE_ORA+'<br/>'+listData[i].REMIND_REMARK
				+'   </div><div class="listCell lcBig" style="width:30%;">到期日:'+listData[i].MSG_END_DATE
				+'   </div><div class="listCell lcBig" style="width:30%;">提醒日期:'+listData[i].MSG_CRT_DATE
				+'   </div>'
				+'</a> '
				+'</li>';
		} 
		$("#custRemindInfo").append(listView);
	}

}