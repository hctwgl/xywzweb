/**
	Name:   com.yucheng.mobile.cameraUtil.js 拍照/取设备相册功能公共类
	Author: wuxl2@yuchengtech.com
	date  : 2014-11-06
	Version: 1.0.0
*/

(function($){
	$._CAMERAU = function(){
		var opts = $.extend({},{},$._CAMERAU.defaults); 
		init(this);
		return this.each(function(){
			$._CAMERAU.appInfo = opts;
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
	$._CAMERAU.defaults = {
	};
	/**
	*拍照
	*/
	$._CAMERAU.getCamera = function(success,height,width,quality,isAllowEdit){
		//alert("in getCamera!!!");
		if(success == undefined){
			console.log("cameraUtil.js 中getCamera方法成功返回方法不能为空！");
			return;
		}
		if(height == undefined || height == "")
			height = 320;
		if(width == undefined || width == "")
			width = 320;
		if(quality == undefined || quality == "")
			quality = 100;
		if(isAllowEdit == undefined || isAllowEdit == "")
			isAllowEdit = false;
		
		navigator.camera.getPicture(
			success, 
			$._CAMERAU.onPicFail, 
			{ 
				quality: quality,
				destinationType: Camera.DestinationType.FILE_URL,
				sourceType : Camera.PictureSourceType.CAMERA,
				allowEdit : isAllowEdit,
				encodingType: Camera.EncodingType.JPEG,
				targetHeight:height,
				targetWidth:width 
			}
		); 
	};
	$._CAMERAU.onPicFail = function(message){
		console.log("照片失败原因:"+ message);
		//mesUtil.alert('照片失败原因: ' + message);
	};
	/**
	* 录音
	*/
	$._CAMERAU.getAudio = function(success,limitNum){
		//mesUtil.alert("in getAudio!!!");
		if(success == undefined){
			console.log("cameraUtil.js 中getAudio方法成功返回方法不能为空！");
			return;
		}
		if(limitNum == undefined || limitNum == "")
			limitNum = 1;
		navigator.device.capture.captureAudio(success, $._CAMERAU.onAudioFail, {limit: limitNum}); 
	};
	$._CAMERAU.onAudioFail = function(){
		var msg = 'capture 发生错误: ' + error.code;  
		console.log("录音失败原因:"+ msg);
		//navigator.notification.alert(msg, null, 'Uh oh!'); 
		mesUtil.alert("录音失败原因:"+ msg);
	};

	$._CAMERAU.upPicfail = function(error) {
		console.log("upload error source " + error.source);
		console.log("upload error target " + error.target);
		//mesUtil.alert("An error has occurred: Code = " + error.code);
	};
	/**
	* 文件上传
	* formName form表单名
	* imgUrl 照片路径（取终端路径）
	* success 成功上传回调
	* showUploadingProgress 上传进度回调函数
	*/
	$._CAMERAU.uploadFiles = function(formName,imgUrl,success,showUploadingProgress){
		//alert("in uploadPic!!");
		if(imgUrl == undefined || imgUrl == "" || imgUrl == null || imgUrl == "null" 
		|| formName == undefined || success == undefined){
			console.log("cameraUtil.js 中uploadPic方法参数错！");
			return;
		}
		/**/
		//var deferred  = when.defer();//考虑断点续传用
		var options = new FileUploadOptions();
		options.fileKey = formName;
		options.fileName = imgUrl.substr(imgUrl.lastIndexOf('/')+1);
		if(options.fileName.indexOf("wav") != -1 || options.fileName.indexOf("mp3") != -1)
			options.mimeType="audio/mpeg";
		else
			options.mimeType="image/jpeg";
		//options.mimeType="multipart/form-data";
		options.chunkedMode = false;
		
		var params = new Object();
		params.fileAddPic = imgUrl;//imgUrl 是图片手机客户端保存路径
		options.params = params;

		var ft = new FileTransfer();
		if(showUploadingProgress != undefined){
			ft.onprogress = showUploadingProgress;
		}
		var upUrl = basePath + "FileUpload?isImage=isImage";
		ft.upload(imgUrl, upUrl, success, $._CAMERAU.upPicfail, options);
		//return deferred.promise;//考虑断点续传用
		
	};
	/**
	* 文件下载
	* fileName 需下载的文件名称
	* fileURL 文件保存路径
	* success 成功回调
	*/
	$._CAMERAU.downFiles = function(fileName,fileURL,success){
		//mesUtil.alert("in downFiles!!!==="+fileURL);
		if(fileName == "" || fileName == undefined || fileURL == "" || fileURL == undefined || success == undefined){
			console.log("cameraUtil.js 中downFiles方法参数错！");
			return;
		}
		var serUrl = basePath + "imgshow.json?path="+fileName;
		fileURL += fileName;
		var fileTransfer = new FileTransfer();
		fileTransfer.download(
			serUrl,
			fileURL,
			success,
			$._CAMERAU.downFail,
			true
		);
	};
	$._CAMERAU.downFail = function(error){
		console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("upload error code" + error.code);
		//mesUtil.alert("upload error code" + error.code);
	};
	/**
	* 获取照片附件
	*/
	$._CAMERAU.getPicPhotoLib = function(success,height,width,quality,isAllowEdit){ 
		if(success == undefined){
			console.log("cameraUtil.js 中getCamera方法成功返回方法不能为空！");
			return;
		}
		if(height == undefined || height == "")
			height = 320;
		if(width == undefined || width == "")
			width = 320;
		if(quality == undefined || quality == "")
			quality = 100;
		if(isAllowEdit == undefined || isAllowEdit == "")
			isAllowEdit = false;
		navigator.camera.getPicture(
			success, 
			$._CAMERAU.onPicFail, 
			{ 
				allowEdit:isAllowEdit,
				quality: quality,
				destinationType:Camera.DestinationType.FILE_URI,
				sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY,
				targetHeight:height,
				targetWidth:width 
			}
		); 	
	};
	cameraUtils = $._CAMERAU;
}(jQuery));