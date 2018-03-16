/**
 * Name:   com.yucheng.mobile.utils.js
 * Author: CHANGZH
 * date  : 2014-11-01
 * Version: 1.0.0
 **/
(function($){
	
	$.appUtils = function() {
		var opts = $.extend($.appUtils.defaults); 
		$.appUtils.utilsInfo = opts;
		init(this);
		return this.each(function(){
			$this = $(this);
		});
	}
	$.appUtils.defaults = {
		isOnline : true
	};

	$.appUtils.getDataToString = function (data) {
		if(data != "" && data != undefined)
			return data;
		else
			return "";
	};

	$.appUtils.fmoney = function (s, n) { 
		if(s != "" && s != undefined){
			n = n > 0 && n <= 20 ? n : 2; 
			s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
			var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1]; 
			t = ""; 
			for (i = 0; i < l.length; i++) { 
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
			} 
			return t.split("").reverse().join("") + "." + r ; 
		}
		return "";
	};

	/***
	 * 将URL中串?param1=value1&param2=value2
	 * 转换成对象数组
	 */
	$.appUtils.getUrlParam = function(string) {  
		var obj =  new Array();  
		if (string.indexOf("?") != -1) {  
			string = string.substr(string.indexOf("?") + 1); 
		} 
		var strs = string.split("&");  
		for(var i = 0; i < strs.length; i ++) {  
			var tempArr = strs[i].split("=");  
			obj[i] = tempArr[1];
		}
		return obj;  
	};
	/***
	 * 将URL中串?param1=value1&param2=value2
	 * 转换成对象{param1 : 'value1', param2 : 'value2'}
	 */
	$.appUtils.getUrlObj = function(string) {  
		var obj =  new Object();  
		if (string.indexOf("?") != -1) {  
			string = string.substr(string.indexOf("?") + 1); 
		} 
		var strs = string.split("&");  
		for(var i = 0; i < strs.length; i ++) {  
			var tempArr = strs[i].split("=");  
			obj[tempArr[0]] = tempArr[1];
		}
		return obj;  
	};
	/**
	 * 页面跳转
	 * url 目标页面URL
	 */
	$.appUtils.goPage = function(url) {
		
		top.location.href = url;
		//$.ui.loadAjax(url, false, false, "slide",{data-refresh-ajax : true}) 
	};
	/**
	 * 显示loading
	 */
	$.appUtils.showLoading = function(msg) {
		if(null == msg) {
			$.ui.showMask('正在加载...');
		} else {
			$.ui.showMask(msg);
		}
	};
	/**
	 * 串转日期
	 * "2014-11-12" 转换成Date类型日期
	 */
	$.appUtils.parseDate = function(datestr) {  
	    var parts = datestr.split('-');  
	    return new Date(parts[0], parts[1] - 1, parts[2])  
	};
	/**
	 * 隐藏loading
	 */
	$.appUtils.hideLoading = function() {
		$.ui.hideMask();
	};
	/**
	 * 特殊字符判断：
	 * true：表示传入的字符为特殊字符
	 * false：传入字符不为特殊字符
	 */
	$.appUtils.checkSpecChar = function(value){
	 	var reg_flag=false;
	 	var reg=/[【】｛｝，。？！@·《》……（）——‘’“”；：\\、\^\~/\|,.?!@#%><&*\(\)+=\[\]\{\};`\'\"]/;
	 	if(reg.test(value)){
	 		reg_flag=true;
	 	}
	 	return reg_flag;
	};
	/**
	 * 电话号码判断：
	 * true：表示传入的号码为正确号码
	 * false：传入号码为错误号码
	 */
	$.appUtils.checkMobile = function(value){
     	var reg_flag=false;
     	var reg=/(^1\d{10}$)|(^(\d{4}-|\d{3}-)?(\d{8}|\d{7})$)/;
     	if(reg.test(value)){
     		reg_flag=true;
     	}
     	return reg_flag;
    };

	
	//API初始化
	mobileUtils = $.appUtils;
}(jQuery));


