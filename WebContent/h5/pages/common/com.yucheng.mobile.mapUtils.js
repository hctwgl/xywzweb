/**
 * Name:   com.yucheng.mobile.mapUtils.js
 * Author: wuxl2
 * date  : 2014-11-03
 * Version: 1.0.0
 **/
(function($){
	$._MAP = function(){
		var opts = $.extend({},{},$._MAP.defaults); 
		init(this);
		return this.each(function(){
			$._MAP.appInfo = opts;
			$this = $(this);
		});
	};
	/**
	 * 初始化方法
	 * return
	 */
	function init($obj) { 
	};
	/**
	 * 默认配置
	 */  
	$._MAP.defaults = {
	};
	/**
	* 获取地图经纬度
	* crmApp CRM获取设备对象
	* success 成功回调方法
	* error 错误回调方法
	*/
	$._MAP.getPosition = function(crmApp,success,error){
		if(crmApp == undefined || success == undefined || error == undefined){
			console.log("mapUtils.js 中getPosition方法参数错！");
			return;
		}
		if(crmApp.device.platform == 'IOS' || crmApp.device.platform == 'iOS'){
			navigator.geolocation.getCurrentPosition(
				success,
				error,
				{ maximumAge: 3000, timeout: 10000, enableHighAccuracy: true }
			); 
		}else{
			baidulocation.getCurrentPosition(
				success,
				error
			);
		}
	};
	
	mapUtils = $._MAP;
}(jQuery));	
	
	

 
 
 


