/**
 * 推荐产品配置
 */
var panelConfig1 = {
	panelId : 'panel1', //列表panel的ID 
	pageSize: 3,		//分页大小
	url     : basePath + 'mobileDemoAction.json', //查询URL
	getCondition : function () {
		return "";//查询条件
	},
	success : function(response){//成功回调方法
		var aResults = response.json.data;
		var el = document.getElementById('tjlist');
		for (var i=0; i<response.json.data.length; i++) {
			var li  =  '<div class="Chanp Chanpmag">'
			               +'<div class="topjiage"><p class="Chanp1">客户名称：' + aResults[i].CUST_NAME + '</p>'
			               +'<p class="Chanp2"><span></span><span></span><span></span><span></span><span></span></p>'
			               +'</div>'
			               +'<p class="Chanp3">1,1674元</p>'
			               +'</div>';
			$("#tjlist").append($(li));
		}
	},
	error:function(){
		//alert('数据初始化失败!!!!');
	}
};
/**
 * 热销产品配置
 */
var panelConfig2 = {
	panelId : 'panel2', //列表panel的ID 
	pageSize: 8,		//分页大小
	url     : basePath + 'mobileDemoAction.json', //查询URL
	getCondition : function () {
		return "";//查询条件
	},
	success : function(response){
		var aResults = response.json.data;
		for (var i=0; i<response.json.data.length; i++) {
			var li  =  '<div class="Chanp Chanpmag Chanpmag2">'
			               +'<div class="topjiage"><p class="Chanp1">客户名称：' + aResults[i].CUST_NAME + '</p>'
			               +'<p class="Chanp2"><span></span><span></span><span></span><span></span><span></span></p>'
			               +'</div>'
			               +'<p class="Chanp3">1,1674元</p>'
			               +'</div>';
			if(i+1 < response.json.data.length) {
				i++;
				li +=  '<div class="Chanp Chanpmag Chanpmag2">'
		               +'<div class="topjiage"><p class="Chanp1">客户名称：' + aResults[i].CUST_NAME + '</p>'
		               +'<p class="Chanp2"><span></span><span></span><span></span><span></span><span></span></p>'
		               +'</div>'
		               +'<p class="Chanp3">1,1674元</p>'
		               +'</div>';
			} 
			$("#rxlist").append($('<div>'+li+'<div class="cl"></div></div>'));
		}
		if(response.json.data.length > 0) {
			setUI();
		}
	},
	error:function(){
		//alert('数据初始化失败!!!!');
	}
};
/**
 * 页面功能配置
 */
var pageConfig1 = {
	panelCfg : panelConfig1 //Panel1配置
};
var pageConfig2 = {
	panelCfg : panelConfig2 //Panel2配置
};
/**
 * 页面初始化方法
 */
var panel1 = null;
var panel2 = null;
function load() {
	panel1 = PanelFactory.get(pageConfig1);
	panel2 = PanelFactory.get(pageConfig2);
	panel1.loadPanel();
	panel2.loadPanel();
	panel1.loadRecorder(true);
	panel2.loadRecorder(true);
}
/**
 * 页面分页绑定
 */
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', load, false);


