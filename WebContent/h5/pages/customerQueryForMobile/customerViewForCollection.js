/**
 * 客户视图-信息采集
 * @author:wangyin@yuchengtech.com	
 * @since:2014/11/20
 */
//定义该界面得到的文件序号（包括：拍照和录音等）
var _fileXH_ = 0;
var __xhId = 0;//用于被点击的序号值
var __isPho = "";//是否为照片，1：是；0：录音
var __localId = "0";//记录缓存数据主键ID
function showCustCollectionInfo(){
	//每次初始化为0
	_fileXH_ = 0;
	var panelContent = 
				'<header>'
				+'<div class="top_header">'
				+'<a href="javascript:$.ui.loadContent(\panelId\);" class="button backButton" >返回</a>'
				+'<h1>客户视图</h1>'
				+'</div>'
				+'</header>'
			      + '<div class="toolsBar noSearch">'
				  + '<div class="tbLeft">'
				  +'<div class="tabsMenu" onclick="javascript:showCustViewT();">概览信息</div>'
	  			  + '<div class="tabsLine"></div>'
	  			  +'<div class="tabsMenu " onclick="javascript:showCustView();">基本信息</div>'
	  			  + '<div class="tabsLine"></div>'
	  			  +'<div class="tabsMenu " onclick="javascript:showCustFinanInfo();">业务信息</div>'
	  			  + '<div class="tabsLine"></div>'
	  			  +'<div class="tabsMenu " onclick="javascript:showCustRemindInfo();">提醒信息</div>'
	  			  + '<div class="tabsLine"></div>'
				  +'<div class="tabsMenu selected" onclick="javascript:showCustCollectionInfo();">信息采集</div>'
				  +'<div class="tabsLine"></div>'
	  			  +'<div class="tabsMenu " onclick="javascript:showCustMapInfo();">地图定位</div>'
	  			  +'<div class="tabsLine"></div></div>'
	  			+ '<div class="tbRight">'
	  			+'<a class="txtBt icon-camera" onclick="javascript:getPhoto();">拍照</a>'
				+'<a class="txtBt icon-camera" onclick="javascript:getPhotoFile();">照片</a>'
	  			+'<a class="txtBt icon-feed" onclick="javascript:getCaptureAudio();">录音</a>'
	  			+'<a class="txtBt icon-pencil" onclick="javascript:void(0);">编辑</a>'
	  			+ '</div></div>'
				+ '<form id="infoCollectionForm" name="infoCollectionForm" action="">'
	  			+'<div class="formContent viewContent" id="showMesDivId">'
	  			//下面为显示信息
				/*
	  			+'<div class="fcBox"><div class="fcSound"><!--在这里书写音频标签或音频操作事件--></div><div class="fcInfo">客户拜访录音<div class="fcProgress" style="width:75%;"><!--上传或下载进度，控制该div宽度--></div></div><div class="fcTools"><div class="rdBt icon-upload" onclick="javascript:void(0);"></div></div></div>'
	  			+'<div class="fcBox"><div class="fcPhoto"><img id="" src="'+filePath+'themes/blue/images/main/temp_pic_01.gif" alt=""/></div><div class="fcInfo">身份证</div><div class="fcTools"><div class="rdBt icon-upload" onclick="javascript:void(0);"></div></div></div>'
	  			+'<div class="fcBox"><div class="fcSound fcsPlay"><!--在这里书写音频标签或音频操作事件--></div><div class="fcInfo">客户拜访录音</div><div class="fcTools"><div class="rdBt icon-download" onclick="javascript:void(0);"></div></div></div>'
	  			+'<div class="fcBox"><div class="fcPhoto"><img id="" src="'+filePath+'themes/blue/images/main/temp_pic_01.gif" alt=""/></div><div class="fcInfo">身份证</div><div class="fcTools"><div class="rdBt icon-upload" onclick="javascript:void(0);"></div></div></div>'
	  			
	  			+'<div class="fcBox"><div class="fcSound"><!--在这里书写音频标签或音频操作事件--></div><div class="fcInfo">客户拜访录音<div class="fcProgress" style="width:75%;"><!--上传或下载进度，控制该div宽度--></div></div><div class="fcTools"><div class="rdBt icon-upload" onclick="javascript:void(0);"></div></div></div>'
	  			+'<div class="fcBox"><div class="fcPhoto"><img id="" src="'+filePath+'themes/blue/images/main/temp_pic_01.gif" alt=""/></div><div class="fcInfo">身份证</div><div class="fcTools"><div class="rdBt icon-upload" onclick="javascript:void(0);"></div></div></div>'
	  			+'<div class="fcBox"><div class="fcSound fcsPlay"><!--在这里书写音频标签或音频操作事件--></div><div class="fcInfo">客户拜访录音</div><div class="fcTools"><div class="rdBt icon-download" onclick="javascript:void(0);"></div></div></div>'
	  			+'<div class="fcBox"><div class="fcPhoto"><img id="" src="'+filePath+'themes/blue/images/main/temp_pic_01.gif" alt=""/></div><div class="fcInfo">身份证</div><div class="fcTools"><div class="rdBt icon-upload" onclick="javascript:void(0);"></div></div></div>'
	  			+'<div class="fcBox"><div class="fcSound"><!--在这里书写音频标签或音频操作事件--></div><div class="fcInfo">客户拜访录音<div class="fcProgress" style="width:75%;"><!--上传或下载进度，控制该div宽度--></div></div><div class="fcTools"><div class="rdBt icon-upload" onclick="javascript:void(0);"></div></div></div>'
	  			+'<div class="fcBox"><div class="fcPhoto"><img id="" src="'+filePath+'themes/blue/images/main/temp_pic_01.gif" alt=""/></div><div class="fcInfo">身份证</div><div class="fcTools"><div class="rdBt icon-upload" onclick="javascript:void(0);"></div></div></div>'
	  			*/
				+'</div></form>';
								
				
				var contentDiv = '<div id="CustCollectionPanel" title="客户视图" class="panel" data-footer="none">'+ panelContent+ '</div>';
				var el = $.query("#CustCollectionPanel").get(0);
				if(!el) {
					$.ui.addContentDiv("CustCollectionPanel", contentDiv);
				} else {
					$.ui.updatePanel("CustCollectionPanel", panelContent);
				}
				$.ui.loadContent("CustCollectionPanel");
	/*
	* 加载数据（先查缓存）
	*/
	getInfoCollData();
}
/**
* 获取相册照片
*/
var getPhotoFile = function(){
	cameraUtils.getPicPhotoLib(onPicSuccess);
};
/**
 * 拍照，只有身份证
 */
var getPhoto = function(){
	cameraUtils.getCamera(onPicSuccess);
};
var onPicSuccess = function(imageData){
	_fileXH_ += 1;//序号加1
	/*
	var fileName = imageData.substr(imageData.lastIndexOf('/')+1);
	var dirPath = cordova.file.dataDirectory;
	//dirPath = dirPath.replace("/files/","/");
	mesUtil.alert("dirPath>>>"+dirPath);
	*/
	var sfz_ = "<div id=\"fcBoxDivId_"+_fileXH_+"\" class=\"fcBox\"><div id=\"fcPhotoDivId_"+_fileXH_+"\" class=\"fcPhoto\" onclick=\"showImg("+_fileXH_+")\"><img id=\"fcIMGDivId_"+_fileXH_+"\" src=\""+imageData+"\" alt=\"\"/></div><div class=\"fcInfo\">身份证<div id=\"fcProDivId_"+_fileXH_+"\" class=\"\" style=\"\"></div></div><div class=\"fcTools\"><div class=\"rdBt icon-upload\" id=\"rdBtDivId_"+_fileXH_+"\" onclick=\"goUpload("+_fileXH_+",1,0)\"></div></div></div>";
	$('#showMesDivId').append(sfz_);
	//保存到缓存
	saveLocalData(imageData,1);
	
};
var getCaptureAudio = function(){
	cameraUtils.getAudio(captureAudioSuccess);
};
var captureAudioSuccess = function(mediaFiles){
	var i, len;  
	for (i = 0, len = mediaFiles.length; i < len; i += 1) {//已确定只有一个  
		_fileXH_ += 1;//序号加1
	    //业务逻辑    
		//mesUtil.alert(mediaFiles[i].fullPath + " " +mediaFiles[i].name);  
		var ly_ = "<div id=\"fcBoxDivId_"+_fileXH_+"\" class=\"fcBox\"><div id=\"fcPhotoDivId_"+_fileXH_+"\" class=\"fcSound\"><input id=\"audioInputId_"+_fileXH_+"\" type=\"hidden\" value=\""+mediaFiles[i].fullPath+"\" ><audio src=\""+mediaFiles[i].fullPath+"\" id=\"fcAUDIODivId_"+_fileXH_+"\" controls=\"controls\" style=\"width:100px;\"></audio></div><div class=\"fcInfo\">"+mediaFiles[i].name+"<div id=\"fcProDivId_"+_fileXH_+"\" class=\"\" style=\"\"></div></div><div class=\"fcTools\"><div class=\"rdBt icon-upload\" id=\"rdBtDivId_"+_fileXH_+"\" onclick=\"goUpload("+_fileXH_+",0,0)\"></div></div></div>";
		$('#showMesDivId').append(ly_);
		//保存到缓存
		saveLocalData(mediaFiles[i].fullPath,0);
	}     
};
/**/
var goUpload = function(xhId,isPho,id){
	var upUrl = "";
	__isPho = isPho;
	if(1*__localId == 0)//有值不处理
		__localId = id;
	if(1*isPho == 1)
		upUrl = $("#fcIMGDivId_"+xhId)[0].src;
	else
		upUrl = $("#audioInputId_"+xhId).val();
	__xhId = xhId;
	
	cameraUtils.uploadFiles("infoCollectionForm",upUrl,win,showUploadingProgress);
	
};
/**
* 上传成功回调
*/
var win = function(r){
	var res = ""+r.response;
	var json_ = eval("("+res+")");
	//保存数据
	var fileType = "";
	if(1*__isPho == 1)
		fileType = "照片";
	else
		fileType = "录音";
	var fileName = json_.realFileName;
	var user = mobileApp.getUserInfo();
	if(_custType_ == undefined)
		_custType_ = "";
	var data_ = {
		"custId":_custId_,
		"custType":_custType_,
		"fileType":fileType,
		"fileName":fileName,
		"userId":user.userId
		};
	
	saveInfoData(data_);
	//下面考虑断点续传用
	//deferred.resolve( imgUrl );
	//navigator.notification.progressStop();
};
/**
* 下载
*/
var goDown = function(xhId,isPho,id,fileName){//
	//mesUtil.alert("in goDown!!");
	__localId = id;
	__xhId = xhId;
	__isPho = isPho;
	/**/
	var saveUrl = "";
	if(crmApp.device.platform == 'IOS' || crmApp.device.platform == 'iOS'){//IOS系统
		var temp_ = ""+cordova.file.dataDirectory;
		saveUrl = temp_.split("/Library/")[0]+"/Documents/";
	}else{
		var temp_ = ""+cordova.file.dataDirectory;
		var t = temp_.split("/data/");
		var s_ = t[1];
		/*
		for(var i = 0; i < t.length; i++){
			mesUtil.alert("t["+i+"]=="+t[i]);
		}
		*/
		s_ = s_.replace("data/","");
		saveUrl = ""+cordova.file.externalRootDirectory+"Android/data/"+s_;
		
		//"file:///storage/emulated/0/Android/data/com.example.apps/cache/";
	}
	//mesUtil.alert("saveUrl>>>"+saveUrl);
	/*
	mesUtil.alert("cordova.file.applicationDirectory=="+cordova.file.applicationDirectory);
	mesUtil.alert("cordova.file.applicationStorageDirectory=="+cordova.file.applicationStorageDirectory);
	mesUtil.alert("cordova.file.dataDirectory=="+cordova.file.dataDirectory);
	mesUtil.alert("cordova.file.cacheDirectory=="+cordova.file.cacheDirectory);
	mesUtil.alert("cordova.file.externalDataDirectory=="+cordova.file.cacheDirectory);
	
	mesUtil.alert("cordova.file.externalRootDirectory=="+cordova.file.externalRootDirectory);//
	*/
	cameraUtils.downFiles(fileName,saveUrl,winDown);
	
};
/**
* 下载成功回调
*/
var winDown = function(entry){
	console.log("download complete: " + entry.toURL());
	//mesUtil.alert("download complete: " + entry.toURL());
	//展示下载值，并把文件路径更新到缓存
	updateFileDataTL(entry.toURL());
};
var updateFileDataTL = function(url){
	var fileName = url.substr(url.lastIndexOf('/')+1);
	var usql = "update SUST_INFO_COLLECTION set DOCU_ADDR='"+url+"',FILE_NAME='"+fileName+"' where id="+__localId;
	//mesUtil.alert("usql>>>"+usql);
	execute(crmApp,usql,function(){
		//显示照片
		if(1*__isPho == 1)
			$("#fcIMGDivId_"+__xhId).attr("src",url);
		else
			$("#fcAUDIODivId_"+__xhId).attr("src",url);
		//加载删除图标
		$("#rdBtDivId_"+__xhId).removeClass("icon-download");
		$("#rdBtDivId_"+__xhId).addClass("icon-remove");
		$("#rdBtDivId_"+__xhId).attr("onclick","delInfoColl("+__localId+")");
	});
};
var saveInfoData = function(data_){
	/**/
	$.ajax({
		type : "POST",
		url : basePath+'infoCollectionAction!saveData.json',
		cache: false, 
		data: data_,
		dataType : "text",
		success : function(response) {
			//隐藏上传按钮
			$("#rdBtDivId_"+__xhId).removeClass("icon-upload");
			$("#rdBtDivId_"+__xhId).addClass("icon-remove");
			//添加删除方法，只删除缓存数据
			$("#rdBtDivId_"+__xhId).attr("onclick","delInfoColl("+__localId+")");
			//显示上传完成的精度条式样
			$("#fcProDivId_"+__xhId).addClass("fcProgress");
			//更新缓存上传字段
			uploadLocal();
		},
		error:function(response) {
			mesUtil.alert('上传数据失败!\r\n请重试。');
		}
	});
};
var uploadLocal = function(){
	var usql = "update SUST_INFO_COLLECTION set ISUPLOAD=1 where id="+__localId;
	//mesUtil.alert("usql>>>>"+usql);
	execute(crmApp,usql,function(){
		mesUtil.alert("上传成功！");
	});
};
/*
* 只删除缓存数据
*/
var delId_ = "0";
var delInfoColl = function(id){
	delId_ = id;
	mesUtil.confirm("确定删除？",bakConFirmFun);
};
var delInfoCollData = function(){
	var dsql = "delete from SUST_INFO_COLLECTION where id="+delId_;
	mesUtil.alert("dsql>>>>"+dsql);
	execute(crmApp,dsql,function(){
		mesUtil.alert("删除成功！");
		//需重新刷新界面
		showCustCollectionInfo();
	});
};
var bakConFirmFun = function(button){
	if(button==1) {//确定
		delInfoCollData();
	}
};
var saveLocalData = function(upUrl,isPho){
	var fileType = "";
	var fileName = "";
	if(1*isPho == 1){
		fileType = "照片";
		fileName = upUrl.substr(upUrl.lastIndexOf('/')+1);
	}else{
		fileType = "录音";
		fileName = "音频";
	}
	var user = mobileApp.getUserInfo();
	var isql = "";
	isql += "insert into SUST_INFO_COLLECTION(CUST_ID,CUST_TYPE,FILE_TYPE,FILE_NAME,DOCU_ADDR,";
	isql += " CREATE_DATE,ARCHIVE_DATE,CREATE_USER,ISUPLOAD)";
	isql += " values('"+_custId_+"','"+_custType_+"','"+fileType+"','"+fileName+"','"+upUrl+"',";
	isql += " datetime('now', 'localtime'),datetime('now', 'localtime'),'"+user.userId+"','0')";
	//根据upUrl获取主键ID
	console.log("isql>>>"+isql);
	execute(crmApp,isql,function(res){
		//需要获取当前新增的ID
		var sql = "select ID from SUST_INFO_COLLECTION where DOCU_ADDR='"+upUrl+"'";
		query(crmApp,sql,function(res){
			var data = res.rows;
			if(data != null && data.length > 0){
				__localId = data.item(0).ID;
			}
			//mesUtil.alert("新增后返回的主键ID>>>"+__localId);
		});
	});
};
/**/
var showUploadingProgress = function(progressEvt){
	if (progressEvt.lengthComputable) { 
		//先增加式样
		$("#fcProDivId_"+__xhId).addClass("fcProgress");
		//已经上传 
		var loaded = progressEvt.loaded; 
		//文件总长度 
		var total = progressEvt.total; 
		//计算百分比，用于显示进度条 
		var percent = parseInt((loaded/total)*100);
		
		//显示对应进度条进度
		$("#fcProDivId_"+__xhId).css("width",percent+"%");
	}
	
};

var getInfoCollData = function(){
	//mesUtil.alert("_custId_==="+_custId_);
	//mesUtil.alert("_custType_==="+_custType_);
	var dataList_ = [];
	//先从缓存获取
	var sql = "select c.* from SUST_INFO_COLLECTION c where c.CUST_ID='"+_custId_+"'";
	console.log("sql>>>"+sql);
	query(crmApp,sql,function(res){
		var data = res.rows;
		if(data != null && data.length > 0){
			for(var i = 0; i < data.length; i++){
				var m = {};
				m["ID"] = data.item(i).ID;
				m["CUST_ID"] = (data.item(i).CUST_ID==undefined)?"":data.item(i).CUST_ID;
				m["CUST_TYPE"] = (data.item(i).CUST_TYPE==undefined)?"":data.item(i).CUST_TYPE;
				m["FILE_TYPE"] = (data.item(i).FILE_TYPE==undefined)?"":data.item(i).FILE_TYPE;
				m["FILE_NAME"] = (data.item(i).FILE_NAME==undefined)?"":data.item(i).FILE_NAME;
				m["DOCU_ADDR"] = (data.item(i).DOCU_ADDR==undefined)?"":data.item(i).DOCU_ADDR;
				m["CREATE_DATE"] = (data.item(i).CREATE_DATE==undefined)?"":data.item(i).CREATE_DATE;
				m["ARCHIVE_DATE"] = (data.item(i).ARCHIVE_DATE==undefined)?"":data.item(i).ARCHIVE_DATE;
				m["CREATE_USER"] = (data.item(i).CREATE_USER==undefined)?"":data.item(i).CREATE_USER;
				m["ISUPLOAD"] = (data.item(i).ISUPLOAD==undefined)?"0":data.item(i).ISUPLOAD;
				m["SER_ID"] = (data.item(i).SER_ID==undefined)?"":data.item(i).SER_ID;
				dataList_.push(m);
			}
			//展示数据
			showDataList(dataList_);
		} else {
			var user = mobileApp.getUserInfo();
			//从服务器获取数据
			$.ajax({
				type : "GET",
				url : basePath+'infoCollectionAction.json',
				cache: false, 
				data: {"userId":user.userId},
				dataType : "json",
				success : function(response) {
					//直接保存到缓存
					dataList_ = response.json.data;
					saveLocalFSer(dataList_);
				},
				error:function(response) {
					mesUtil.alert('获取数据失败!\r\n请重试。');
				}
			});
		}
	});
};
var saveLocalFSer = function(dataList_){
	//var data_ = [];
	//先删除
	var dsql = "delete from SUST_INFO_COLLECTION";
	execute(crmApp,dsql,function(){
		for(var i = 0; i < dataList_.length; i++){
			var d = dataList_[i];
			var isql = "insert into SUST_INFO_COLLECTION(CUST_ID,CUST_TYPE,FILE_TYPE,FILE_NAME,DOCU_ADDR,";
			isql += " CREATE_DATE,ARCHIVE_DATE,CREATE_USER,ISUPLOAD,SER_ID)";
			isql += " values('"+d.CUST_ID+"','"+d.CUST_TYPE+"','"+d.FILE_TYPE+"','"+d.FILE_NAME+"','"+d.DOCU_ADDR+"',";
			isql += " '"+d.CREATE_DATE+"','"+d.ARCHIVE_DATE+"','"+d.CREATE_USER+"','"+d.ISUPLOAD+"','"+d.SER_ID+"')";
			if(i == dataList_.length -1){//最后一条
				execute(crmApp,isql,function(res){
				
					turnDataId(dataList_);
				});
			}else{
				execute(crmApp,isql,function(res){
				
				});
			}
			
		}
	});
};
var turnDataId = function(dataList){
	var data_ = [];
	for(var i = 0; i < dataList.length; i++){
		var d = dataList[i];
		var sql = "select * from SUST_INFO_COLLECTION where SER_ID='"+d.SER_ID+"'";
		if(i == dataList.length -1){//最后一条
			query(crmApp,sql,function(res){
				var data = res.rows;
				var m = {};
				if(data != null && data.length > 0){
					var lid = data.item(0).ID;
					m["ID"] = lid;
					m["CUST_ID"] = (data.item(0).CUST_ID==undefined)?"":data.item(0).CUST_ID;
					m["CUST_TYPE"] = (data.item(0).CUST_TYPE==undefined)?"":data.item(0).CUST_TYPE;
					m["FILE_TYPE"] = (data.item(0).FILE_TYPE==undefined)?"":data.item(0).FILE_TYPE;
					m["FILE_NAME"] = (data.item(0).FILE_NAME==undefined)?"":data.item(0).FILE_NAME;
					m["DOCU_ADDR"] = (data.item(0).DOCU_ADDR==undefined)?"":data.item(0).DOCU_ADDR;
					m["CREATE_DATE"] = (data.item(0).CREATE_DATE==undefined)?"":data.item(0).CREATE_DATE;
					m["ARCHIVE_DATE"] = (data.item(0).ARCHIVE_DATE==undefined)?"":data.item(0).ARCHIVE_DATE;
					m["CREATE_USER"] = (data.item(0).CREATE_USER==undefined)?"":data.item(0).CREATE_USER;
					m["ISUPLOAD"] = (data.item(0).ISUPLOAD==undefined)?"0":data.item(0).ISUPLOAD;
					m["SER_ID"] = (data.item(0).SER_ID==undefined)?"":data.item(0).SER_ID;
					data_.push(m);
					//mesUtil.alert("最后一条>>>"+m["ID"]);
				}
				
				//调用展示
				showDataList(data_);
			});
		}else{
			query(crmApp,sql,function(res){
				var data = res.rows;
				var m = {};
				if(data != null && data.length > 0){
					var lid = data.item(0).ID;
					m["ID"] = lid;
					m["CUST_ID"] = (data.item(0).CUST_ID==undefined)?"":data.item(0).CUST_ID;
					m["CUST_TYPE"] = (data.item(0).CUST_TYPE==undefined)?"":data.item(0).CUST_TYPE;
					m["FILE_TYPE"] = (data.item(0).FILE_TYPE==undefined)?"":data.item(0).FILE_TYPE;
					m["FILE_NAME"] = (data.item(0).FILE_NAME==undefined)?"":data.item(0).FILE_NAME;
					m["DOCU_ADDR"] = (data.item(0).DOCU_ADDR==undefined)?"":data.item(0).DOCU_ADDR;
					m["CREATE_DATE"] = (data.item(0).CREATE_DATE==undefined)?"":data.item(0).CREATE_DATE;
					m["ARCHIVE_DATE"] = (data.item(0).ARCHIVE_DATE==undefined)?"":data.item(0).ARCHIVE_DATE;
					m["CREATE_USER"] = (data.item(0).CREATE_USER==undefined)?"":data.item(0).CREATE_USER;
					m["ISUPLOAD"] = (data.item(0).ISUPLOAD==undefined)?"0":data.item(0).ISUPLOAD;
					m["SER_ID"] = (data.item(0).SER_ID==undefined)?"":data.item(0).SER_ID;
					data_.push(m);
					//mesUtil.alert("m[ID]==="+m["ID"]);
				}
			});
		}
	}
};
var showDataList = function(dataList){
	_fileXH_ = 0;
	for(var i = 0; i < dataList.length; i++){
		var m = dataList[i];
		_fileXH_ += 1;
		var css_ = "";
		var procss_ = "";
		var isUp = m["ISUPLOAD"];
		var path_ = m["DOCU_ADDR"];
		var serId_ = m["SER_ID"];
		var onclick_ = '';
		if(1*isUp == 0){
			css_ = "icon-upload";
		}else{//已上传
			procss_ = "fcProgress";
			css_ = "icon-remove";
			
		}
		var id_ = m["ID"];
		if(id_ == undefined || id_ == null || id_ == "" || id_ == "null"){
			id_ = "0";
		}
		
		if(1*serId_ != undefined  && 1*serId_ > 0){//从服务器下载的数据，显示下载图标
			if(path_ == undefined || path_ == ""){//如果还没有下载文件，显示下载图标
				css_ = "icon-download";//下载图标
				procss_ = "";//隐藏进度条
				//下载事件
				if(m["FILE_TYPE"] == "照片")
					onclick_ = "goDown("+_fileXH_+",1,"+id_+",'"+m["FILE_NAME"]+"')";
				if(m["FILE_TYPE"] == "录音")
					onclick_ = "goDown("+_fileXH_+",0,"+id_+",'"+m["FILE_NAME"]+"')";
				//mesUtil.alert("onclick_>>>>>>>>>>"+onclick_);
			}else{//显示删除图标
				css_ = "icon-remove";//下载图标
				procss_ = "fcProgress";
				onclick_ = "delInfoColl("+id_+")";
			}
			
		}else if(1*isUp == 0){//没有上传才显示上传方法
			if(m["FILE_TYPE"] == "照片"){
				onclick_ = "goUpload("+_fileXH_+",1,"+id_+")";
			}
			if(m["FILE_TYPE"] == "录音"){
				onclick_ = "goUpload("+_fileXH_+",0,"+id_+")";
			}
		}else{//已经上传，显示删除
			onclick_ = "delInfoColl("+id_+")";
		}
		if(m["FILE_TYPE"] == "照片"){
			var sfz_ = "<div id=\"fcBoxDivId_"+_fileXH_+"\" class=\"fcBox\" onclick=\"showImg("+_fileXH_+")\"><div id=\"fcPhotoDivId_"+_fileXH_+"\" class=\"fcPhoto\"><img id=\"fcIMGDivId_"+_fileXH_+"\" src=\""+path_+"\" alt=\"\"/></div><div class=\"fcInfo\">身份证<div id=\"fcProDivId_"+_fileXH_+"\" class=\""+procss_+"\" style=\"\"></div></div><div class=\"fcTools\"><div class=\"rdBt "+css_+"\" id=\"rdBtDivId_"+_fileXH_+"\" onclick=\""+onclick_+"\"></div></div></div>";
			$('#showMesDivId').append(sfz_);
		}
		if(m["FILE_TYPE"] == "录音"){
			var name = m["FILE_NAME"];
			var ly_ = "<div id=\"fcBoxDivId_"+_fileXH_+"\" class=\"fcBox\"><div id=\"fcPhotoDivId_"+_fileXH_+"\" class=\"fcSound\"><input id=\"audioInputId_"+_fileXH_+"\" type=\"hidden\" value=\""+path_+"\" ><audio src=\""+path_+"\" id=\"fcAUDIODivId_"+_fileXH_+"\" controls=\"controls\" style=\"width:100px;\"></audio></div><div class=\"fcInfo\">"+name+"<div id=\"fcProDivId_"+_fileXH_+"\" class=\""+procss_+"\" style=\"\"></div></div><div class=\"fcTools\"><div class=\"rdBt "+css_+"\" id=\"rdBtDivId_"+_fileXH_+"\" onclick=\""+onclick_+"\"></div></div></div>";
			$('#showMesDivId').append(ly_);
		}
	}
};

var showImg = function(xhId){
	var imgUrl = $("#fcIMGDivId_"+xhId)[0].src;
	if(imgUrl != undefined && imgUrl != "" && imgUrl.indexOf("html") == -1){
		dialog_previewPicture(imgUrl,false);
	}
};