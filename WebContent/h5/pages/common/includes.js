/** * 
 * 公用JS
 * 初始化APP
 * Author: CHANGZH
 * date  : 2014-11-01
 * Version: 1.0.0
 **/
var devModel = true;//true开发模式 ,false 真机模式
//开发路径
var fileName = 'mobile';
if(document.URL.indexOf('www') > 0) {
	//APP路径
	fileName = 'www';
	devModel = false;
}
var basePath  = document.URL;    
var filePath   = basePath.substring(basePath.indexOf('/'+fileName+'/')+fileName.length+2,basePath.length-1);

var n=(filePath.split('/')).length-1;
filePath = '';
if(n > 1){
	for (var i = 0; i < n; i ++) {
		filePath += '../';
	}
}
basePath = "http://127.0.0.1:8080/mcrm/";
//if(localStorage.getItem("__serverPath") != undefined && localStorage.getItem("__serverPath") != "")
//	basePath = "" + localStorage.getItem("__serverPath");
//basePath = "http://172.16.40.30:8080/crmweb/";
//if(deviceType == 'Android'){//android
	//Android CSS 
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'themes/common/icons.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'themes/common/main.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'themes/common/appframework.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'themes/common/lists.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'themes/common/forms.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'themes/common/buttons.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'themes/common/grid.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'resource/plugins/css/af.actionsheet.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'resource/plugins/css/af.popup.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'resource/plugins/css/af.scroller.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'resource/plugins/css/af.selectBox.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'themes/common/frame.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + filePath + 'themes/blue/main.css"/>');
//}else {
	//IOS CSS
//}


	document.write('<script src="' + filePath + 'resource/jquery.min.js"></script>');
	document.write('<script src="' + filePath + 'resource/jq.appframework.js"></script>');
	document.write('<script src="' + filePath + 'resource/ui/appframework.ui.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.init.js"></script>');

document.write('<script src="' + filePath + 'resource/jquery.json-2.4.min.js"></script>');

document.write('<script src="' + filePath + 'cordova.js"></script>'); 
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.cordova.js"></script>'); 

document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.loadPanel.js"></script>');

document.write('<script src="' + filePath + 'resource/plugins/af.actionsheet.js"></script>');
document.write('<script src="' + filePath + 'resource/plugins/af.css3animate.js"></script>');
document.write('<script src="' + filePath + 'resource/plugins/af.passwordBox.js"></script>');
document.write('<script src="' + filePath + 'resource/plugins/af.scroller.js"></script>');
document.write('<script src="' + filePath + 'resource/plugins/af.selectBox.js"></script>');
document.write('<script src="' + filePath + 'resource/plugins/af.touchEvents.js"></script>');
document.write('<script src="' + filePath + 'resource/plugins/af.touchLayer.js"></script>');
document.write('<script src="' + filePath + 'resource/plugins/af.popup.js"></script>');

document.write('<script src="' + filePath + 'resource/ui/transitions/fade.js"></script>');
document.write('<script src="' + filePath + 'resource/ui/transitions/flip.js"></script>');
document.write('<script src="' + filePath + 'resource/ui/transitions/pop.js"></script>');	
document.write('<script src="' + filePath + 'resource/ui/transitions/slide.js"></script>');
document.write('<script src="' + filePath + 'resource/ui/transitions/slideRight.js"></script>');
document.write('<script src="' + filePath + 'resource/ui/transitions/slideDown.js"></script>');
document.write('<script src="' + filePath + 'resource/ui/transitions/slideUp.js"></script>');
document.write('<script src="' + filePath + 'resource/plugins/af.slidemenu.js"></script>');

document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.dbUtils.js"></script>'); 
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.api.js"></script>');    
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.utils.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.ui.plugins.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.mapUtils.js"></script>');  
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.cameraUtil.js"></script>'); 
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.pageBar.js"></script>');
//document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.scrollBar.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.app.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.jquery.patch.js"></script>');

document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.dataSync.js"></script>'); 
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.mesUtil.js"></script>'); 
//document.write('<script src="http://api.map.baidu.com/api?v=1.5&ak=tgiByWlOyQtP2xn3qEeQFmHX"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.datePickerUtils.js"></script>');


document.write('<script src="' + filePath + 'resource/jquery.validate.min.js"></script>');

