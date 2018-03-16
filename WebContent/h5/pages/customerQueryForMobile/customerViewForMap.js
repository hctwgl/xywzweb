/**
 * 客户视图-地图定位
 * @author:wangwan1@yuchengtech.com	
 * @since:2014/11/19
 */
function showCustMapInfo(custId,panelId){
	function initCustMapInfo(){
		var map = new BMap.Map("allmap");  
		setMapSize();
		var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL}   
		map.addControl(new BMap.NavigationControl(opts)); 
		map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);   // 创建地址解析器实例
		var myGeo = new BMap.Geocoder();    // 将地址解析结果显示在地图上，并调整地图视野    
		myGeo.getPoint("成都市世纪城天鹅湖花园22栋2501", function(point){   
		if (point) {      
			map.centerAndZoom(point, 16);       
			map.addOverlay(new BMap.Marker(point));    
		}}, "成都市"); 
		
		function theLocation(){
			var city = document.getElementById("cityName").value;
			if(city != ""){
				map.centerAndZoom(city,11);      // 用城市名设置地图中心点
			}
		}
	}
	
	//地图容器尺寸自适应
	function setMapSize(){
		$("#allmap").width('100%').height($("#custMapPanel").height()-120);
		$(window).resize(function(){
			$("#allmap").width('100%').height($("#custMapPanel").height()-120);
		});
	}
	
	
	var panelContent = 
				'<header>'
				+'<div class="top_header">'
				+'<a href="javascript:$.ui.loadContent(\panelId\);" class="button backButton" >返回</a>'
				+'<h1>客户视图</h1>'
				+'</div>'
				+'</header>'
			      + '<div class="toolsBar noSearch">'
				  + '<div class="tbLeft">'
				  +'<div class="tabsMenu" onclick="javascript:showCustViewT();">概览信息</div>'
	  			  + '<div class="tabsLine"></div>'
	  			  +'<div class="tabsMenu " onclick="javascript:showCustView();">基本信息</div>'
	  			  + '<div class="tabsLine"></div>'
	  			  +'<div class="tabsMenu " onclick="javascript:showCustFinanInfo();">业务信息</div>'
	  			  + '<div class="tabsLine"></div>'
	  			  +'<div class="tabsMenu " onclick="javascript:showCustRemindInfo();">提醒信息</div>'
	  			  + '<div class="tabsLine"></div>'
				  +'<div class="tabsMenu " onclick="javascript:showCustCollectionInfo();">信息采集</div>'
				  +'<div class="tabsLine"></div>'
	  			  +'<div class="tabsMenu selected" onclick="javascript:showCustMapInfo();">地图定位</div>'
	  			  + '<div class="tabsLine"></div></div></div>'
	  			+'<div class="formContent viewContent">'
	  			+'<div class="formCell"><label>客户地址：</label><div class="fcContent">成都市世纪城天鹅湖花园22栋2501</div></div>'
	  			+'<div id="allmap"></div></div>';
								
				
				var contentDiv = '<div id="custMapPanel" title="客户视图" class="panel" data-footer="none">'+ panelContent+ '</div>';
				var el = $.query("#custMapPanel").get(0);
				if(!el) {
				$.ui.addContentDiv("custMapPanel", contentDiv);
				} else {
				$.ui.updatePanel("custMapPanel", panelContent);
				}
				$.ui.loadContent("custMapPanel");
				initCustMapInfo();

}