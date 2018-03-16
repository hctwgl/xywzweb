 /** 
  * com.yucheng.mobile.mesUtil
  * @author  wuxl2@YUCHENGTECH.COM
  * @date    20141115
  * @version 
  **/
(function($){
	$._MESUTIL = function(){
		var opts = $.extend({},{},$._MESUTIL.defaults); 
		init(this);
		return this.each(function(){
			$._MESUTIL.appInfo = opts;
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
	$._MESUTIL.defaults = {
	};
	/**
	 * 信息提示框
	 * 自动确认真机模式和开发模式
	 * showMes：提示信息 （必须）
	 * title：提示框标题（默认为“信息提示”）
	 * butName：操作按钮（默认为“确定”）
	 */
	$._MESUTIL.alert = function(showMes,title,butName){
		if(title == undefined || title == ""){
			title = "信息提示";
		}
		if(butName == undefined || butName == ""){
			butName = "确定";
		}
		if(fileName == "www"){
			navigator.notification.alert( 
				showMes,  // 显示信息 
		        $._MESUTIL.alertDismissed(),// 警告被忽视的回调函数 
		        title,            // 标题 
		        butName                  // 按钮名称 
			); 
		}else{
			alert(showMes);
		}
	};
	/**
	 * 信息确认框
	 * 自动确认真机模式和开发模式
	 * showMes：提示信息 （必须）
	 * bakConFirmFun：按下按钮后触发的回调函数，返回按下按钮的索引(从1开始) （必须）
	 * title：提示框标题（默认为“信息确认”）
	 * butNames：操作按钮（默认为“确定,取消”）
	 */
	$._MESUTIL.confirm = function(showMes,bakConFirmFun,title,butNames){
		if(title == undefined || title == ""){
			title = "信息确认";
		}
		if(butNames == undefined || butNames == ""){
			butNames = "确定,取消";
		}
		if(fileName == "www"){
			navigator.notification.confirm( 
				showMes,  // 显示信息 
				bakConFirmFun,// 按下按钮后触发的回调函数，返回按下按钮的索引 
		        title,            // 标题 
		        butNames                 // 按钮名称 
			); 
		}else{
			confirm(showMes);
		}
	};
	// 警告对话框被忽视 
	$._MESUTIL.alertDismissed = function() { 
        //进行处理：提示信息不处理
    };
    
	mesUtil = $._MESUTIL;
}(jQuery));