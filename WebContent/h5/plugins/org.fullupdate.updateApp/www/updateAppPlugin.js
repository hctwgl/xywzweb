cordova.define("org.fullupdate.updateApp.updateapp", function(require, exports, module) { /**
 * 检查并更新APP
 * version.js
 * [{'verCode':2,'verName':'1.2.1','apkPath':'http://****.com/your.apk'}]
 * verCode 版本号
 * verName 版本名称
 * apkPath APK下载路径
 * @author wuxl2
 */
var exec = require('cordova/exec');
var updateapp = {
	checkAndUpdate:function(checkPath){
		exec(null, null, "UpdateApp", "checkAndUpdate", [checkPath]);
	},
	getCurrentVerInfo:function(successCallback){
		exec(successCallback, null, "UpdateApp", "getCurrentVersion", []);
	},
	getServerVerInfo:function(successCallback,failureCallback,checkPath){
		exec(successCallback, failureCallback, "UpdateApp", "getServerVersion", [checkPath]);
	}
};
module.exports = updateapp;

});
