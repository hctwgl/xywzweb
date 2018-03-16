/**
 * 移动CRM API
 * APP中全局JS方法
 * @author  CHANGZH@YUCHENGTECH.COM
 * @date    20141101
 * @version 
 */
(function($){
	/***
	 * 公共方法库api
	 * 使用方法：
	 * 将URL中串?param1=value1&param2=value2
	 * 转换成对象{param1 : 'value1', param2 : 'value2'}
	 * var obj = mobileUtils.getUrlParam(url);
	 */
	
	/***
	 * 移动CRM工具类 api
	 * 详见com.yucheng.crm.utils
	 */
	var mobileUtils = false;
	/***
	 * 移动CRM主体类
	 */
	var mobileApp   = false;
	/***
	 * 移动CRM 地图工具类
	 * 详见com.yucheng.crm.mapUtils
	 */
	var mapUtils    = false;
	/***
	 * 移动CRM 拍照工具类
	 * 详见com.yucheng.crm.cameraUtil
	 */
	var cameraUtils  = false;
	/***
	 * 移动CRM 数据同步
	 * 详见com.yucheng.mobile.dataSync.js
	 */
	var dataSync = false;
	/***
	 * 移动CRM 信息提示
	 * 详见com.yucheng.mobile.mesUtil.js
	 */
	var mesUtil = false;
	/***
	 * 移动CRM 时间选择器
	 * 详见com.yucheng.mobile.datePickerUtil.js
	 */
	var dateUtils = false;
	
}(jQuery));
