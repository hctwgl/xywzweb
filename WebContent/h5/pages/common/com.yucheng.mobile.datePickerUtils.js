/**
 * Name:   com.yucheng.mobile.datePickerUtils.js
 * Author: luoyd
 * date  : 2014-12-10
 * Version: 1.0.0
 **/
(function($){
	$._DATE = function(){
		var opts = $.extend({},{},$._DATE.defaults); 
		init(this);
		return this.each(function(){
			$._DATE.appInfo = opts;
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
	$._DATE.defaults = {
	};
	/**
	* 调用时间选择器，选择时间
	* inputId 页面元素ID
	* dateType 选择器类型 "date":支持日期选择,"datetime":支持日期+时分选择
	* 调用方式： 不含iframe的调用 dateUtils.datePicker('divId','datetime');
	*            iframe中调用 parent.dateUtils.datePicker('divId','datetime','iframeId');
	*/
	$._DATE.datePicker = function(inputId,dateType,iframeId){
		if(inputId == undefined || inputId == '' || inputId == null){
			console.log("datePickerUtils.js 中datePicker方法inputId参数错！");
			return;
		}
		if(dateType == undefined || dateType == '' || dateType == null){
			console.log("datePickerUtils.js 中datePicker方法dateType参数错！");
			return;
		}

        datePickerPlugin.createEvent(inputId,dateType,iframeId);
		
	};
	
	dateUtils = $._DATE;
}(jQuery));	
	
	

 
 
 


