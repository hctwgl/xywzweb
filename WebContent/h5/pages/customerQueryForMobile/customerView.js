/**
 * 客户视图-客户概览信息
 * @author:wangwan1@yuchengtech.com	
 * @since:2014/11/19
 */

function showCustViewT(custId,panelId,custType){
	//mesUtil.alert("in showCustViewT!!");
	//mesUtil.alert("custId>>>"+custId+"<<panelId>>"+panelId+"<<custType>>"+custType);
	var currentCustId=custId;
	if(custId==undefined||panelId==undefined){//||custType==undefined
		_custId_ = _custId_;
		_custType_ = _custType_;
	}else{
		_custId_ = custId;
		_custType_ = custType;
	}
	//mesUtil.alert("_custId_>>>"+_custId_+"<<_custType_>>"+_custType_);
	/**
	 * 根据客户号查询客户基本信息（暂用web端客户视图对私客户查询）
	 */
	$.ajax({
	type : "GET",
	url : basePath + 'custViewBaseInfoQueryAction!getBaseInfo.json?custId='+custId,
	cache: false,
	dataType : "json",
	success : function(response){
		var listData = response.baseInfo.data[0];	//基本信息
		var liCaiDataList = response.liCai;//持有理财
		var jiJinDataList = response.jiJin;//持有基金
		
		var eventContentDiv='';
		
		var productRatioChartDIV ='<iframe src="productRatioChart.html" style="width:350px;height:350px;border:0"></iframe>';	//产品配比图
		var lastRollSixMonthChartDIV ='<iframe src="lastRollSixMonthChart.html" style="width:500px;height:350px;border:0"></iframe><br/>';	//总资产时点趋势图(最近6个月)
		
		var liCaiDetail = '';
		for(var i=0;i < liCaiDataList.data.length;i++){
			var info = liCaiDataList.data[i];
			liCaiDetail = liCaiDetail + '<li  class="icgRow" >'
			+'<a href="#" id="currentEvent'+i+'"'
			+' "><div style="width:30%">'+info.PRO_NM+'</div><div style="width:70%">'+info.TOT_VOL+'</div></a></li>';
		}
		var liCaiDIV = '<div float=left;><div >'
		+'<ul id="currentEvent">'
		+'<li class="icTitle">当前持有理财产品</li>'
		+liCaiDetail
		+'</ul></div></div><br/><br/>';
		
		var jiJinDetail = '';
		for(var i=0;i < jiJinDataList.data.length;i++){
			var info = jiJinDataList.data[i];
			jiJinDetail = jiJinDetail + '<li  class="icgRow" >'
			+'<a href="#" id="AUM'+i+'"'
			+' "><div style="width:30%">'+info.FUND_NM+'</div><div style="width:70%">'+info.HOLD_POR+'</div></a></li>';
		}
		
		var jiJinDiv = '<div float=left;><div >'
		+'<ul id="custCurrentLevel">'
		+'<li class="icTitle">当前持有基金产品</li>'
		+jiJinDetail
		+'</ul></div></div>';
		
		var  showCustBaseInfoDiv = 
			'<input id="custId" type="hidden" name="custId" value="'+listData.CUST_ID+'"/>'
			+'<input id="basePath" type="hidden" name="basePath" value="'+basePath+'"/>'
			+'<div class="custBaseInfo">'
			+'<div class="cbiInfo"><div class="cbiPhotoName"><div id="chart1"></div>'
			+'<div class="cbiName">'+listData.CUST_NM+'</div></div>'
			+'<div class="cbiCell">证件类型:'+listData.CERT_TYPE_ORA+'</div><div class="cbiCell">证件号码:'+listData.CERT_NUM+'</div><div class="cbiCell">手机号:'+listData.CONT_METH
			+'</div><div class="cbiCell">时点总资产:'+listData.ASSET_SUM+'</div><div class="cbiCell">总资产滚动季日均:'+listData.ASSET_ROLL_SEA_AVG+'</div>'
			+'</div>'
			+'</div>';
			var custId=listData.CUST_ID;
			var setFocusDiv= '';
				if(!$.query("#myFocusCust").get(0)){
				 setFocusDiv= '<div class="tbRight"><a class="txtBt icon-star" onclick="javascript:setFocus(\@custId\);">设为关注</a></div>';
				 setFocusDiv = setFocusDiv.replace("@custId", listData.custId);
				}else{
			    setFocusDiv='';	
				}
			var panelContent = 
				'<header>'
				+'<div class="top_header">'
				+'<a href="javascript:$.ui.loadContent(\panelId\);" class="button backButton" >返回</a>'
				+'<h1>客户视图</h1>'
				+'</div>'
				+'</header>'
				+'<div class="toolsBar noSearch">'
				+'<div class="tbLeft">'
				+'<div class="tabsMenu selected" onclick="javascript:showCustViewT();">概览信息</div>'
				+'<div class="tabsLine"></div>'
				+'<div class="tabsMenu " onclick="javascript:showCustView();">基本信息</div>'
				+'<div class="tabsLine"></div>'
				+'<div class="tabsMenu " onclick="javascript:showCustFinanInfo();">业务信息</div>'
				+'<div class="tabsLine"></div>'
				+'<div class="tabsMenu " onclick="javascript:showCustRemindInfo();">提醒信息</div>'
				+'<div class="tabsLine"></div>'
				+'<div class="tabsMenu " onclick="javascript:showCustCollectionInfo();">信息采集</div>'
				+'<div class="tabsLine"></div>'
				+'<div class="tabsMenu " onclick="javascript:showCustMapInfo();" >地图定位</div>'
				+'<div class="tabsLine"></div>'
				+'</div>'
				+setFocusDiv
				+'</div>'
				+showCustBaseInfoDiv
				+liCaiDIV
				+jiJinDiv
				+productRatioChartDIV	
				+lastRollSixMonthChartDIV;	
		
			
		var contentDiv = '<div id="showCustViewBasePanel" title="客户视图" class="panel" data-footer="none">'+ panelContent+ '</div>';
		var el = $.query("#showCustViewBasePanel").get(0);
		if(!el) {
		$.ui.addContentDiv("showCustViewBasePanel", contentDiv);
		} else {
		$.ui.updatePanel("showCustViewBasePanel", panelContent);
		}
		$.ui.loadContent("showCustViewBasePanel");
	}});
}
function setFocus(custId){
	$.ajax({
		type : "GET",
		url : basePath + 'custConcernOper!create.json?condition='+custId,
		cache: false, 
		dataType : "json",
		success : function(response){
			mobileUtils.hideLoading();
			$.ui.updatePanel("showCustViewBasePanel", panelContent);
			mesUtil.alert('保存成功！');
			},
		failure:function(a,b,c){
		}
		});
}
