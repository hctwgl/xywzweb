/***
 * 客户经理签到
 * 作者 ：lyd
 * 时间 ：
 * 版本 ：v1.0.0
 */
var user = parent.mobileApp.getUserInfo();//当前登陆用户的基本信息保存对象
var userId		= user.userId;//从当前登陆用户对象中获取用户编号

var listReader = {
		mapping : [{name : 'SIGN_ID'},
		           {name : 'USER_ID'},
	          	   {name : 'CUST_NAME'},
	          	   {name : 'MM_SIGN_TIME'},
	          	   {name : 'SIGN_ADDRESS'},
	          	   {name : 'SIGN_MEMO'}],
	    record:''
			+ '<li id="li_@SIGN_ID">'
			+ '<a href="javascript:signInQueryShowDetail(\'@SIGN_ID\')">'
			+ '<div class="listCell lcBig"style="width:35%;">签到人：@USER_ID<br/>签到日期：@MM_SIGN_TIME</div>'
			+ '<div class="listCell" style="width:35%;">客户名称：@CUST_NAME<br/>签到地址：@SIGN_ADDRESS</div>'
			+ '<div class="listCell" >签到备注：@SIGN_MEMO</div>'
			+'</a></li>'
};
var config = {
	filter : false,
	pageConfig : {
		limit : 10,
		queryUrl : basePath + 'signManagerAction.json?createrId='+userId,
		listViewId : 'signInQuery_list',
		listReader : listReader,
		success : function(response){},
		error : function(){
			mesUtil.alert('数据加载失败');
		}
	}
};
 
function addSignInQuery() {
	createSignInQueryPanel({},0);
}
/**
 * 创建详情panel
 * @param data panel信息 ,type 0:新增 1：查看详情
 */
function createSignInQueryPanel (data,type) {

	var custId   = mobileUtils.getDataToString(data.CUST_ID);
	var custName   = mobileUtils.getDataToString(data.CUST_NAME);
	var userIdResp = mobileUtils.getDataToString(data.USER_ID);
	var signDate = mobileUtils.getDataToString(data.MM_SIGN_TIME);
	var longitude = mobileUtils.getDataToString(data.SIGN_LONGITUDE);
	var latitude = mobileUtils.getDataToString(data.SIGN_LATITUDE);
	var memo = mobileUtils.getDataToString(data.SIGN_MEMO);
	
	var panelContent = '';
	var contentDiv = '';
	if(0 == type){
		
		panelContent = '<header>'
			 + '<div class="top_header"> '
			 + '<a id="backButton" href="javascript:$.ui.loadContent(\'signInQueryPanel\');" class="button" >返回</a> '
			 + ' <h1>签到查询</h1></div></header>'
			 + '<form id="SignInQueryInfoForm" action="" method="get">'
			 + '<div class="toolsBar noSearch">'
			 + '<div class="tbLeft">'
			 + '<div class="tabsMenu selected">新增签到</div>'
			 + '</div>'
			 + '<div class="tbRight">'
			 + '<a class="txtBt icon-loop" onclick="javascript:resetForm();">重置</a>'
			 + '<a class="txtBt icon-checkmark" id="addSignInQuery" onclick="javascript:saveSignInQueryInfo();">保存</a>'
			 + '</div>'
			 + '</div>'
			 + '<input name="userId" value="'+userId+'" type="hidden" />'
			 + '<input id="custId" name="custId" value="" type="hidden" />'
			 + '<div class="formContent /*row2*/">'
			
			 + '<div class="formCell"><label>客户名称：</label><div class="fcContent"> '
			 + '<input  id="input_custName" readonly="true" name="custName" type="text"  placeholder="请选择..." '
			 + 'onclick="javascript:custChoose(\'input_custName\',\'custId\',\'createSignInQueryPanel\');" ></div></div>'
			
			 + '<div class="formCell"><label>签到备注：</label><div class="fcContent"><input name="signMemo" value="" type="text" placeholder="签到备注"></div></div>'
			 + '<div class="formCell"><label>签到地址：</label><div id="mapId" class="mapMapDrawClass"/></div>'
			 + '</div>'
			 + '<input id="signAddress" name="signAddress" value="" type="hidden">'
			 + '<input id="signLongitude"  name="signLongitude" value="" type="hidden">'
			 + '<input id="signLatitude"  name="signLatitude" value="" type="hidden">'
			 + '</form>';
		contentDiv = '<div id="createSignInQueryPanel" title="新增签到" class="panel" data-footer="none">'
		   	+ panelContent
		    + '</div>';
		
	}else if(1 == type){
		
		panelContent = '<header>'
			 + '<div class="top_header"> '
			 + '<a id="backButton" href="javascript:$.ui.loadContent(\'signInQueryPanel\');" class="button" >返回</a> '
			 + ' <h1>签到查询</h1></div></header>'
			 + '<form id="SignInQueryInfoForm" action="" method="get">'
			 + '<div class="toolsBar noSearch">'
			 + '<div class="tbLeft">'
			 + '<div class="tabsMenu selected">签到查询详情</div>'
			 + '</div>'
			 + '<div class="tbRight">'
			 + '</div>'
			 + '</div>'
			 + '<div class="formContent /*row2*/">'
			 + '<div class="formCell"><label>客户经理ID：</label><div class="fcContent"><input readonly="true" name="userId" value="'+ userIdResp+'" type="text"></div></div>'
			 + '<div class="formCell"><label>客户ID：</label><div class="fcContent"><input readonly="true" name="custId" value="'+custId+'" type="text" placeholder="客户Id"></div></div>'
			 + '<div class="formCell"><label>客户名称：</label><div class="fcContent"><input readonly="true" name="custId" value="'+custName+'" type="text"/></div></div>'
			 + '<div class="formCell"><label>签到日期：</label><div class="fcContent"><input readonly="true" name="custId" value="'+signDate+'" type="text"/></div></div>'
			 + '<div class="formCell"><label>签到备注：</label><div class="fcContent"><input readonly="true" name="signMemo" value="'+memo+'" type="text" placeholder="签到备注"></div></div>'
			 + '<div class="formCell"><label>签到地址：</label><div id="mapId" class="mapMapDrawClass"/></div>'
			 
			 + '</div>'
			 + '</form>';
		contentDiv = '<div id="createSignInQueryPanel" title="签到查询详情" class="panel" data-footer="none">'
			   	+ panelContent
			    + '</div>';
	}else{
		
	}
	
	var el = $.query("#createSignInQueryPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("createSignInQueryPanel", contentDiv);
	} else {
		$.ui.updatePanel("createSignInQueryPanel", panelContent);
	}
	$.ui.loadContent("createSignInQueryPanel");
	var mapConfig = {};
	if(0 == type){
		//百度地图调用
		mapUtils.getPosition(crmApp,function(position){
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;

			if(crmApp.device.platform != 'IOS' && crmApp.device.platform != 'iOS'){
				baidulocation.stop();
			}
			
			mapConfig = {
			   point :{
					lng : longitude,//104.06,//东经
					lat : latitude//30.67 //北纬
				},
				
				zoomSize : 13,
				isAnimaPoint : true,
				fieldIds :{
					addrFieldId : "#signAddress",
					lgnFieldId : "#signLongitude",
					latFieldId : "#signLatitude"
				}
			};
			baiduMapPointDraw(mapConfig);
		},function(err){
			console.log("获取当前地图信息失败" + err.code +"\n" + err.message);
			mesUtil.alert("获取当前地图信息失败" + err.code +"\n" + err.message);
			if(crmApp.device.platform != 'IOS'){
				baidulocation.stop();
			}
		});
	}else if(1 == type){

		 mapConfig = {
			   point :{
					lng : longitude,//东经
					lat : latitude //北纬
				},
				zoomSize : 13,
				isAnimaPoint : true
		 }
		 baiduMapPointDraw(mapConfig);
	}else{
		
	}
}
/***
 * 重置
 */
function resetForm() {
	$('#SignInQueryInfoForm')[0].reset();
}
/***
 * 保存客户接触信息
 */
function saveSignInQueryInfo() {
	var condition = $("#SignInQueryInfoForm").serialize();//获取form表单的值

	mobileUtils.showLoading('正在保存...');
	$.ajax({
		type : "POST",
		url : basePath+'signManagerAction!saveData.json?'+condition,
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			mobileUtils.hideLoading();
			
			$.ui.loadContent('signInQueryPanel');
			var signInQuery = PageBarFactory.get(config);
			var url = queryConfigUrl();
		    signInQuery.queryFun(url);
		    
			//alert('保存成功！');
		},
		error:function(){
			mobileUtils.hideLoading();
			mesUtil.alert('保存失败！');
		}
	});	
	
}
/***
 * 显示详情页面
 * @param signId 签到ID
 */
function signInQueryShowDetail(objId) {
	var condition = {};
	condition.SIGN_ID = objId;
	$.ajax({
		type : "GET",
		url : basePath + 'signManagerAction.json?condition='+$.toJSON(condition),
		cache : false,
		// async: false,
		dataType : "json",
			success : function(response) {
				createSignInQueryPanel(response.json.data[0],1);
			},
			error : function() {
				
			}
	});
}

/***
 * 地图配置参数
 */
   var mapDefaultConfig = {
	    mapId : "mapId",	//地图div的id			
	    point :{
			lng : '',//东经
			lat :  ''//北纬
		},
		isAnimaPoint : false,
		zoomSize : 12,//缩放比例
		fieldIds :{
			addrFieldId : "",//填充地址
			lgnFieldId : "",//填充经度
			latFieldId : ""//填充唯独
		}
	}

	function baiduMapPointDraw(options){
	    var opts = $.extend(true,{},mapDefaultConfig, options);
        
		var mapId = opts.mapId;	//地图div的id			
	    var lng = opts.point.lng;//东经
		var lat = opts.point.lat;//北纬
		var isAnimaPoint = opts.isAnimaPoint;
		var zoomSize = opts.zoomSize;
		
		var map = new BMap.Map(mapId);
        var point = new BMap.Point(lng,lat);
		map.centerAndZoom( point,zoomSize);
		
		map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
		map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

		map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
		map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
		map.addControl(new BMap.OverviewMapControl({
					  isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));  //右下角，打开

		//根据经纬度查询具体地址,异步请求
		var gc = new BMap.Geocoder();
	    gc.getLocation(point, function(rs){  
	    	
			var addrStr = getLocationInfo(point, rs); 
			var content = "地址："+addrStr+ "<br/><br/>经度：" + 
						   lng + "<br/>纬度：" +
						   lat;		
			
			map.clearOverlays();//清空原来的标注
			var marker = new BMap.Marker(point);  // 创建标注，为要查询的地址对应的经纬度
			map.addOverlay(marker);
			
			if(isAnimaPoint){
			   marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画;
			}
			
			var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
			marker.openInfoWindow(infoWindow);
			//marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); }); 	
			
			//向dom中写入数据
			var addrFieldId = opts.fieldIds.addrFieldId;
			var lgnFieldId  = opts.fieldIds.lgnFieldId;
			var latFieldId  = opts.fieldIds.latFieldId;
			if(addrFieldId != null && addrFieldId != undefined && addrFieldId != ''){
			   $(addrFieldId).val(addrStr);
			}
			if(lgnFieldId != null && lgnFieldId != undefined && lgnFieldId != ''){
				 $(lgnFieldId).val(lng);
			}
			if(latFieldId != null && latFieldId != undefined && latFieldId != ''){
				$(latFieldId).val(lat);
			}
			
		});  
		
   }
   
   //组装查询返回地址
   function getLocationInfo(pt, rs){  
	   
		var addComp = rs.addressComponents;  
		var addr = addComp.province + "" 
		         + addComp.city + ""
		         + addComp.district + ""
		         + addComp.street + ""
		         + addComp.streetNumber;
		
		return addr;
  } 

