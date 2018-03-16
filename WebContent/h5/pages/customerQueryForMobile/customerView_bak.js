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
		var listData = response.json.data[0];
		var eventContentDiv='';
		var  showCustBaseInfoDiv = 
			'<div class="custBaseInfo">'
			+'<div class="cbiInfo"><div class="cbiPhotoName"><div class="cbiPhoto"><img src="'+basePath+listData.imgSrc+'"></img></div>'
			+'<div class="cbiName">'+listData.custName+'</div></div>'
			+'<div class="cbiCell">客户类型:'+listData.custType+'</div><div class="cbiCell">证件类型:'+listData.identType+'</div><div class="cbiCell">证件号码:'+listData.identNo
			+'</div><div class="cbiCell">客户编号:'+listData.custId+'</div><div class="cbiCell">最高学历:'+listData.degree+'</div><div class="cbiCell">毕业学校:'+listData.university
			+'</div><div class="cbiCell">所属行业:'+listData.industry+'</div><div class="cbiCell">所属职业:'+listData.career+'</div><div class="cbiCell">所属职务:'+listData.zhiwu
			+'</div></div></div>'
			+'<div class="custContainer">'
			+'<div class="indexContainer"><div class="icContent">'
		 	+'<ul id="currentEvent">'
		 	+'<li class="icTitle">最新事件</li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="currentEvent1"'
			+' "><div style="width:30%">'+listData.currentEvent51+'</div><div style="width:70%">'+listData.currentEvent5+'</div></a></li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="currentEvent2"'
			+' "><div style="width:30%">'+listData.currentEvent21+'</div><div style="width:70%">'+listData.currentEvent2+'</div></a></li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="currentEvent3"'
			+' "><div style="width:30%">'+listData.currentEvent31+'</div><div style="width:70%">'+listData.currentEvent3+'</div></a></li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="currentEvent4"'
			+' "><div style="width:30%">'+listData.currentEvent41+'</div><div style="width:70%">'+listData.currentEvent4+'</div></a></li></ul></div></div>'
			
			+ '<div class="indexContainer"><div class="icContent">'
		 	+'<ul id="custCurrentLevel">'
		 	+'<li class="icTitle">本期评级</li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="saveAUM"'
			+' "><div style="width:50%">存款AUM总额:</div><div style="text-align:right;">'+listData.saveAUM+'</div></a></li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="finanAUM"'
			+' "><div style="width:50%">理财AUM总额:</div><div style="text-align:right;">'+listData.finanAUM+'</div></a></li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="totalAUM"'
			+' "><div style="width:50%">本期AUM总额:</div><div style="text-align:right;">'+listData.totalAUM+'</div></a></li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="AUM"'
			+' "><div style="width:50%">总贡献总额:</div><div style="text-align:right;">'+listData.AUM+'</div></a></li></ul></div></div>'
			
			+ '<div class="indexContainer"><div class="icContent">'
		 	+'<ul id="saveInfo">'
		 	+'<li class="icTitle">存款信息</li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="saveDate"'
			+' "><div style="width:50%">统计日期:</div><div style="text-align:center;">'+listData.saveDate+'</div></a></li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="totalSave"'
			+' "><div style="width:50%">存款总额: </div><div style="text-align:right;">'+listData.totalSave+'</div></a></li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="lastSave"'
			+' "><div style="width:50%">上期余额:  </div><div style="text-align:right;"> '+listData.lastSave+'</div></a></li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="lastSave"'
			+' "><div style="width:50%">上年余额:  </div><div style="text-align:right;">  '+listData.lastSave+'</div></a></li></ul></div></div>'
			
			+ '<div class="indexContainer"><div class="icContent">'
			+'<ul id="loanInfo">'
			+'<li class="icTitle">贷款信息</li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="loanDate"'
			+' "><div style="width:50%">统计日期: </div><div style="text-align:center;"> '+listData.loanDate+'</div></a></li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="totalLoan"'
			+' "><div style="width:50%">贷款总额: </div><div style="text-align:right;">'+listData.totalLoan+'</div></a></li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="lastLoan"'
			+' "><div style="width:50%">上期余额: </div><div style="text-align:right;">'+listData.lastLoan+'</div></a></li>'
			+'<li  class="icgRow" >'
			+'<a href="#" id="saveInfo"'
			+' "><div style="width:50%">上年余额: </div><div style="text-align:right;">'+listData.lastYearLoan+'</div></a></li></ul></div></div>'
			+'</div>';
			var custId=listData.custId;
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
				+showCustBaseInfoDiv;	
		
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
		})

}