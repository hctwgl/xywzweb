/**
 * 客户视图-客户业务信息
 * @author:wangwan1@yuchengtech.com	
 * @since:2014/11/19
 */
function showCustFinanInfo(custId,panelId){
	var panelContent =
			'<header>'
			+'<div class="top_header">'
			+'<a href="javascript:$.ui.loadContent(\panelId\);" class="button backButton" >返回</a>'
			+'<h1>客户视图</h1>'
			+'</div>'
			+'</header>'
			+ '<div class="toolsBar noSearch" >'
			+ '<div class="tbLeft" >'
			+'<div class="tabsMenu" onclick="javascript:showCustViewT();">概览信息</div>'
			+ '<div class="tabsLine"></div>'
			+'<div class="tabsMenu " onclick="javascript:showCustView();">基本信息</div>'
			+ '<div class="tabsLine"></div>'
			+'<div class="tabsMenu selected" onclick="javascript:showCustFinanInfo();">业务信息</div>'
			+ '<div class="tabsLine"></div>'
			+'<div class="tabsMenu " onclick="javascript:showCustRemindInfo();">提醒信息</div>'
			+ '<div class="tabsLine"></div>'
			+'<div class="tabsMenu " onclick="javascript:showCustCollectionInfo();">信息采集</div>'
			+'<div class="tabsLine"></div>'
			+'<div class="tabsMenu "  onclick="javascript:showCustMapInfo();">地图定位</div>'
			+ '</div></div>'
			+'<div class="custContainer">'
			+ '<div class="indexContainer"><div class="icContent">'
			+'<ul id="custFinanceInfo1"></ul></div></div>'
			+ '<div class="indexContainer"><div class="icContent">'
			+'<ul id="custFinanceInfo2"></ul></div></div>'
			+ '<div class="indexContainer"><div class="icContent">'
			+'<ul id="custFinanceInfo3"></ul></div></div>'
			+ '<div class="indexContainer"><div class="icContent">'
			+'<ul id="custFinanceInfo4"></ul></div></div>'
			+ '</div>';
			
			var contentDiv = '<div id="showCustFinanPanel" title="客户视图" class="panel" data-footer="none">'+ panelContent+ '</div>';
			var el = $.query("#showCustFinanPanel").get(0);
			if(!el) {
			$.ui.addContentDiv("showCustFinanPanel", contentDiv);
			} else {
			$.ui.updatePanel("showCustFinanPanel", panelContent);
			}
			$.ui.loadContent("showCustFinanPanel");		
			initCustFinanInfo();
			
	function initCustFinanInfo() {
		var data = {};
		data.userId = mobileApp.getUserInfo().userId;
		data.start  = 0;
		data.limit  = 5;
		//渠道签约信息数据加载
		$.ajax({
			type : "GET",
			url : basePath + 'custFinanInfoQueryAction!getChannelInfo.json',
			data : data,
			contentType: "application/json",  
			cache: false, 
			success : function(response){
				initChannelInfo(response.json.data);
			},
			error:function(a,b,c){
				mesUtil.alert('渠道签约信息数据加载失败...','提示');
				
			}
		});
		//理财产品数据加载
		$.ajax({
			type : "GET",
			url : basePath + 'custFinanInfoQueryAction!getFinanProductInfo.json',
			data : data,
			contentType: "application/json",  
			cache: false, 
			success : function(response){
				initFinanProductInfo(response.json.data);
			},
			error:function(a,b,c){
				mesUtil.alert('理财产品数据加载失败...','提示');
				
			}
		});
		//存款数据加载
		$.ajax({
			type : "GET",
			url : basePath + 'custFinanInfoQueryAction!getSaveInfo.json',
			data : data,
			contentType: "application/json",  
			cache: false, 
			success : function(response){
				initSaveInfo(response.json.data);
			},
			error:function(a,b,c){
				mesUtil.alert('最新公告数据加载失败...','提示');
				
			}
		});
		//贷款数据加载
		$.ajax({
			type : "GET",
			url : basePath + 'custFinanInfoQueryAction!getLoanInfo.json',
			data : data,
			contentType: "application/json",  
			cache: false, 
			success : function(response){
				initLoanInfo(response.json.data);
			},
			error:function(a,b,c){
				mesUtil.alert('贷款信息数据加载失败...','提示');
				
			}
		});
		
	}
	/**
	 * 渠道签约信息数据加载
	 * @param listData data
	 */
	function initChannelInfo(listData){
		var len  = listData.length;  
		var listView = '<li class="icTitle" >渠道签约信息</li>';
		for (var i = 0; i < len; i++) {  
			listView += '<li   class="icgRow" >'
					   +'<div style="width:50%;">'+listData[i].title+'</div>'
					   +'<div>'+listData[i].ebankChannel+'</div>'
					   +'</li>';
		}
		$("#custFinanceInfo1").append(listView);
	}
	/**
	 * 理财产品数据加载
	 * @param listData data
	 */
	function initFinanProductInfo(listData){
		var len  = listData.length;  
		var listView = '<li class="icTitle">理财产品信息</li>'
			  +'<li class="icgHeader"><div style="width:23%">理财产品</div><div  style="width:25%;text-align:center;">购买金额</div><div   style="width:25%">购买日期</div><div   style="width:25%">到期日</div></li>';
		for (var i = 0; i < len; i++) {  
			listView += '<li  class="icgRow" >'
				+'<div  style="width:23%">'+listData[i].product
				+'</div>   <div  style="width:20%;text-align:right;">'+listData[i].money
				+'</div>   <div  style="width:25%;text-align:center;">'+listData[i].salesDate
				+'</div>   <div  style="width:25%;text-align:center;">'+listData[i].deadLine
				+'</div>'
				+'</li>';
		} 
		$("#custFinanceInfo2").append(listView);
	}
	/**
	 * 存款信息数据加载
	 * @param listData 公告data
	 */
	function initSaveInfo(listData){
		var len  = listData.length;  
		var listView = '<li class="icTitle">存款信息</li>'
			  +'<li class="icgHeader"><div style="width:32%">存款账号</div><div   style="width:20%">开户日期</div><div   style="width:8%">币种</div><div style="width:16%;text-align:right;">本金</div><div style="width:20%;text-align:right;">余额</div></li>';
		for (var i = 0; i < len; i++) {  
			listView += '<li  class="icgRow">'
				+'<div  style="width:30%">'
				+listData[i].saveAccount
//				+'</div>   <div  style="width:20%">   '+listData[i].openOrgId
				+'</div>   <div  style="width:20%">   '+listData[i].openDate
				+'</div>   <div  style="width:10%">   '+listData[i].bZ
				+'</div>   <div  style="width:20%;text-align:right;">   '+listData[i].bJ
				+'</div>   <div  style="width:20%;text-align:right;">   '+listData[i].yE
				+'</div>'
				+'</li>';
		} 
		$("#custFinanceInfo3").append(listView);
	}
	/**
	 * 贷款数据加载
	 * @param listData 贷款data
	 */
	function initLoanInfo(listData){
		var len  = listData.length;  
		var listView = '<li class="icTitle">贷款信息</li>'
			  +'<li class="icgHeader"><div style="width:32%">贷款账号</div><div   style="width:20%">开户日期</div><div   style="width:8%">币种</div><div  style="width:16%;text-align:right;">本金</div><div  style="width:20%;text-align:right;">余额</div></li>';
		for (var i = 0; i < len; i++) { 
			listView += '<li   class="icgRow" >'
					   +'<div  style="width:30%">'+listData[i].loanAccount
//					   +'  </div>   <div  style="width:20%"> '+listData[i].openOrgId
					   +'  </div>   <div  style="width:20%"> '+listData[i].openDate
					   +'  </div>   <div  style="width:10%"> '+listData[i].bZ
					   +'  </div>   <div  style="width:20%;text-align:right;"> '+listData[i].bJ
					   +'  </div>   <div  style="width:20%;text-align:right;"> '+listData[i].yE
					   +'</li>';
		} 
		$("#custFinanceInfo4").append(listView);
	}
	
}