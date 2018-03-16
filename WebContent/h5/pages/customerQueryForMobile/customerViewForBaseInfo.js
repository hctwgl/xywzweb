/**
 * 客户视图-客户基本信息
 * @author:wangwan1@yuchengtech.com	
 * @since:2014/11/19
 */
var careerContent="";
var identTypeContent="";
var riskLevelContent="";
function initBaseData(){

	$.ajax({//风险等级
		type : "GET",
		url : basePath+'/lookup.json?name=XD000083',
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			for(var i=0;i<response.JSON.length;i++){
				if(i==0){
					 riskLevelContent=riskLevelContent+'<select id="riskLevelContent" name="riskLevel">'
						 + ' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option>';
				}else if(i==response.JSON.length-1){
					riskLevelContent=riskLevelContent+' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option></select>'
				}else{
					riskLevelContent=riskLevelContent+' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option>'
				}
			}
		}
	});
	$.ajax({//职业
		type : "GET",
		url : basePath+'/lookup.json?name=XD000005',
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			for(var i=0;i<response.JSON.length;i++){
				if(i==0){
					 careerContent=careerContent+'<select id="careerContent" name="career">'
						 + ' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option>';
				}else if(i==response.JSON.length-1){
					careerContent=careerContent+' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option></select>'
				}else{
					careerContent=careerContent+' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option>'
				}
			}
		}
	});
	$.ajax({//证件类型
		type : "GET",
		url : basePath+'/lookup.json?name=XD000040',
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			for(var i=0;i<response.JSON.length;i++){
				if(i==0){
					 identTypeContent=identTypeContent+'<select id="identTypeContent" name="identType">'
						 + ' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option>';
				}else if(i==response.JSON.length-1){
					identTypeContent=identTypeContent+' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option></select>'
				}else{
					identTypeContent=identTypeContent+' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option>'
				}
			}
		}
	});

}
var getBasePhoto = function(){
	cameraUtils.getCamera(onPicBaseSuccess,'','',100);
};
function onPicBaseSuccess(imageData){
	//alert("in onPicSuccess!!"+imageData);
	$('#custPhotoBaseImg_id').attr("src",imageData).show();
}
function showCustView(custId,panelId){
	if(careerContent==""||identTypeContent==""||riskLevelContent==""){
		careerContent="";
		identTypeContent="";
		riskLevelContent="";
		initBaseData();
	}
	/**
	 * 根据客户号查询客户基本信息（暂用web端客户视图对私客户查询）
	 */
	function  update(){
			$(":input","#customerBaseInfo").removeAttr("readOnly");  
		};
	function  save(){
		var condition = $("#customerBaseInfo").serialize();
		$.ajax({
			type : "POST",
			url : basePath+'MobilePrivateBaseInfoAction.json?'+condition,
			cache: false, 
			contentType: "application/json", 
			success : function(response){
				mobileUtils.hideLoading();
				$.ui.updatePanel("showCustViewPanel", panelContent);
				$("#save").toggle();
				mesUtil.alert('保存成功！');
			},
			error:function(){
				mobileUtils.hideLoading();
				mesUtil.alert('保存失败！');
			}
		});	
		};
		
	$.ajax({
	type : "GET",
	url : basePath + 'privateCustInfo!searchInfo.json?custId='+custId,
	cache: false, 
	dataType : "json",
	success : function(response){
		var listData = response.data[0];
		var showCustBaseInfoDiv = '<form id="customerBaseInfo" action="" method="get">'
			+ '<div class="toolsBar noSearch" >'
			+ '<div class="tbLeft">'
			+'<div class="tabsMenu " onclick="javascript:showCustViewT();">概览信息</div>'
			+ '<div class="tabsLine"></div>'
			+'<div class="tabsMenu selected" onclick="javascript:showCustView();">基本信息</div>'
			+ '<div class="tabsLine"></div>'
			+'<div class="tabsMenu " onclick="javascript:showCustFinanInfo();">业务信息</div>'
			+ '<div class="tabsLine"></div>'
			+'<div class="tabsMenu " onclick="javascript:showCustRemindInfo();">提醒信息</div>'
			+ '<div class="tabsLine"></div>'
			+'<div class="tabsMenu " onclick="javascript:showCustCollectionInfo();">信息采集</div>'
			+'<div class="tabsLine"></div>'
			+'<div class="tabsMenu " onclick="javascript:showCustMapInfo();">地图定位</div>'
			+ '<div class="tabsLine"></div>'	  
			+ '</div>'
			+'<div class="tbRight">'
			 +'<a id="update" class="txtBt icon-loop" >编辑</a>'
			 +'<a id="save"  class="txtBt icon-checkmark" style="display:none">保存</a>'
			 +'</div>'
			 +'</div>'
			 + '<div class="formContent row2">'
			 + '<div class="formCell"><label for="custName">客户姓名:</label><div class="fcContent"><input name="custName" id="custName" type="text" value="李思思" ></div></div>'
			 + '<div class="formCell rightFloat"><label for="custName">客户照片:</label><div class="fcContent"><div class="custPhoto"><img id="custPhotoBaseImg_id" src="" alt="" class="custPhotoImg"/><a class="txtBt icon-spinner" href="javascript:getBasePhoto();">拍照</a></div></div></div>'
			 + '<div class="formCell"><label for="custName">证件类型:</label><div class="fcContent">'+selectContent3+'</div></div>'
			 + '<div class="formCell"><label for="identNo">证件号码:</label><div class="fcContent"><input  name="identNo" id="identNo" type="text" value="120109198609090190"></div></div>'
			 + '<div class="formCell"><label for="custName">职业:</label><div class="fcContent">'+careerContent+'</div></div>'
			 + '<div class="formCell"><label for="linkmanName">联系人姓名:</label><div class="fcContent"><input id="linkmanName" name="linkmanName"  type="text" value="张辉"></div></div>'
			 + '<div class="formCell"><label for="linkmanTel">联系人电话:</label><div class="fcContent"><input id="linkmanTel" name="linkmanTel"  type="text" value="18909829891"></div></div>'
			 + '<div class="formCell"><label>客户来源渠道:</label><div class="fcContent">'+selectContent1+'</div></div>'
			 + '</div>'
			 + ' </form>';

		var panelContent = 
			'<header>'
			+'<div class="top_header">'
			+'<a href="javascript:$.ui.loadContent(\panelId\);" class="button backButton" >返回</a>'
			+'<h1>客户视图</h1>'
			+'</div>'
			+'</header>'
			+ showCustBaseInfoDiv;
		
		var contentDiv = '<div id="showCustViewPanel" title="客户视图" class="panel" data-footer="none">'+ panelContent+ '</div>';
		var el = $.query("#showCustViewPanel").get(0);
		if(!el) {
		$.ui.addContentDiv("showCustViewPanel", contentDiv);
		} else {
		$.ui.updatePanel("showCustViewPanel", panelContent);
		}
		$.ui.loadContent("showCustViewPanel");	
		
		
		$("#update").click(function(){
            $("#save").show();
            $("#update").hide();
		});
		$("#save").click(function(){
//			save();
			 $("#update").show();
	         $("#save").hide();
		});
	}});
}