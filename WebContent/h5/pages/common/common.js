/** *
 * 公用JS
 * 初始化APP
 * Author: CHANGZH
 * date  : 2014-11-01
 * Version: 1.0.0
 **/
var devModel = true;//true开发模式 ,false 真机模式
var turns_time=300000;
var belong_org='0099';
var back_time=300;
var crmToken="";
var isOnline = false;

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
//basePath = "http://139.9.0.27:8088/mcrm/";
if(localStorage.getItem("__serverPath") != undefined && localStorage.getItem("__serverPath") != "")
basePath = "" + localStorage.getItem("__serverPath");
if(localStorage.getItem("__turnsTime") != undefined && localStorage.getItem("__turnsTime") != "")
turns_time = "" + localStorage.getItem("__turnsTime");
if(localStorage.getItem("__backTime") != undefined && localStorage.getItem("__backTime") != "")
back_time = "" + localStorage.getItem("__backTime");
if(localStorage.getItem("__belongOrg") != undefined && localStorage.getItem("__belongOrg") != "")
belong_org = "" + localStorage.getItem("__belongOrg");
if(localStorage.getItem("__crmToken") != undefined && localStorage.getItem("__crmToken") != "")
crmToken = "" + localStorage.getItem("__crmToken");
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.dbUtils.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.api.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.utils.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.app.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.mesUtil.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.rightMenu.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.call.js"></script>'); 
document.write('<script src="' + filePath + 'resource/jquery.validate.min.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.jquery.ajax.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.desUtil.js"></script>');

document.write('<script src="' + filePath + 'cordova.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.cordova.js"></script>');
document.write('<script src="' + filePath + 'resource/fastclick/fastclick.js"></script>');
document.write('<script src="' + filePath + 'resource/layer/layer.js"></script>');
document.write('<script src="' + filePath + 'pages/common/com.yucheng.mobile.screen.js"></script>');


var durl_ = document.URL;
durl_ = durl_.substring(durl_.indexOf('/'+fileName+'/')+5);
var getEnterPushMobileVal = function() {
    var enterPushMobileVal = localStorage.getItem("__enterPushMobileVal");
    return enterPushMobileVal;
};
var removeEnterPushMobileVal = function() {
    localStorage.removeItem("__enterPushMobileVal");
};

/*
 * IOS推送端，调用了该方法set值
 */
var enterForeground = function(res){
    localStorage.removeItem("__enterPushMobileVal");
    localStorage.setItem("__enterPushMobileVal", res);
    console.log('enterForeground>>>>> ' + res);//控制台输入语句
    
    goPage(filePath+durl_);
};

/*
 * 业务逻辑判断请用方法
 */
var getEnterForeground = function(){
    var enterPushMobileVal = getEnterPushMobileVal();
    removeEnterPushMobileVal();   
    return enterPushMobileVal;
};



function goPage(url) {
//    var index = layer.load(2);
    top.location.href = url;
}

$(function() {
  FastClick.attach(document.body);
  
  document.documentElement.style.webkitTouchCallout = "none"; //禁止弹出菜单
  
  document.documentElement.style.webkitUserSelect = "none";//禁止选中
  
  document.documentElement.style.webkitUserDrag = 'none';
  
  checkOnline();
  
  //    document.body.ontouchmove = function(e){
  //        if (document.body.scrollHeight == document.body.clientHeight){
  //            event.preventDefault();
  //        } ;
  //    };
  //
  //
  //    $(".allowMove").each(function(){
  //    	this.ontouchmove = function(e){
  //    		e.stopPropagation();
  //    	};
  //    });
  //    $("body").on("touchmove", function(e) {
  //    	e.stopPropagation();
  //    });
  //
//  window.onerror = function(msg, url, line) {
//  var idx = url.lastIndexOf("/");
//  if(idx > -1) {
//  url = url.substring(idx+1);
//  }
//  alert("ERROR in " + url + " (line #" + line + "): " + msg);
//  return false;
//  };
  
 // online_time = getEnterForeground();//此处获取了OC传过来的值，后续逻辑自行写方法实现
 // alert(mes);
  });

//退出APP时OC回调
function quitApp(online_time) {
    
	if(online_time>back_time){
	$._APP.doLogout();
}
    
};
//得到url路径中的到的参数值
function getParamFromUrl(sHerf,value) {
    var retval = "";
    var args = sHerf.split("?");
    if (args[0] == sHerf) {
        return retval;
    }
    var str = args[1];
    args = str.split("&");
    for (var i = 0; i < args.length; i++) {
        str = args[i];
        var arg = str.split("=");
        if (arg.length <= 1) continue;
        if (arg[0] == value) retval = arg[1];
    }
    return retval;
}

function yearCheck(valueId) {//年龄校验，大小不能超过200
    var a = document.getElementById(valueId).value;
    var b = a.replace(/\D/g,'');
    $("#"+valueId+"").val(b);
    if ($("#"+valueId+"").val()*1 > 200) {
        mesUtil.alert("请输入合法年龄");
        $("#"+valueId+"").val('');
    }
}
function monthCheck(valueId) {//月份校验，大小不能超过1000
    var a = document.getElementById(valueId).value;
    var b = a.replace(/\D/g,'');
    $("#"+valueId+"").val(b);
    if ($("#"+valueId+"").val()*1 > 1000) {
        mesUtil.alert("请输入合法数据");
        $("#"+valueId+"").val('');
    }
}
function lengthCheck(valueId) {//校验输入字符长度，不能超过8位
    var a = document.getElementById(valueId).value;
    var b = a.replace(/\\.\D/g,'');
    $("#"+valueId+"").val(b);
    if ($("#"+valueId+"").val()*1 > 99999999) {
        mesUtil.alert("输入数字太长");
        $("#"+valueId+"").val('');
    }
    if ($("#"+valueId+"").val().indexOf('.') > -1) {
        var value = $("#"+valueId+"").val().split('.');
        if (value[1] != '' && value[1] != null && value[1] != undefined && value[0] != '' && value[0] != null
            && value[0] != undefined) {
            var v = value[0]+'.'+value[1].substr(0, 2);
            if (v == '0.00') {
                mesUtil.alert("输入数据不合法");
                $("#"+valueId+"").val('');
            }else {
                $("#"+valueId+"").val(v);
            }
        }
    }
}
function ratioCheck(valueId) {//校验输入百分比长度，不能超过3位
    var a = document.getElementById(valueId).value;
    var b = a.replace(/\\.\D/g,'');
    $("#"+valueId+"").val(b);
    if ($("#"+valueId+"").val()*1 > 999) {
        mesUtil.alert("输入百分比太大");
        $("#"+valueId+"").val('');
    }
    if ($("#"+valueId+"").val().indexOf('.') > -1) {
        var value = $("#"+valueId+"").val().split('.');
        if (value[1] != '' && value[1] != null && value[1] != undefined && value[0] != '' && value[0] != null
            && value[0] != undefined) {
            var v = value[0]+'.'+value[1].substr(0, 2);
            if (v == '0.00') {
                mesUtil.alert("输入数据不合法");
                $("#"+valueId+"").val('');
            }else {
                $("#"+valueId+"").val(v);
            }
        }
    }
}

function checkOnline(){
	$.ajax({
		type : "GET",
		url : basePath + 'checkOnlineAction!getAuthUser.json',
		cache: false, 
		dataType: 'json',
		async: false, 
		success : function(response){
			authUser = response.authUser;
			if(authUser != ''){
				isOnline = true;
			}else{
				isOnline = false;
			}
			
		},
		error:function(){
		}
	});
}

