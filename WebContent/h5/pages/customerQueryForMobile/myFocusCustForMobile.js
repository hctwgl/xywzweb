/***
 * 我的关注客户
 * 作者 ：wangwan1@yuchengtech.com
 * 时间 ：2014-11-14
 * 版本 ：v1.0.0
 */
var panelId="myFocusCust";
var listReader = {
		mapping : [{name : 'CUST_ID'},
		           {name : 'CUST_NAME'},
	          	   {name : 'IDENT_NO'},
//	          	   {name:'LINKMAN_TEL'},
				   {name : 'CUST_TYPE'},
	          	   {name : 'TEMP_CUST_TYPE_ORA'},
	          	   {name : 'IDENT_TYPE_ORA'},
//	          	   {name : 'CUST_LEVEL_ORA'},
	          	   {name : 'CUST_STAT_ORA'}],
	     record:'<li><a href="javascript:showCustViewT(\'@CUST_ID\',\panelId\,\'@CUST_TYPE\');">'
				+ '<div class="listCell lcBig" style="width:25%;">@CUST_NAME</div>'
//				+ '<div class="listCell" style="width:20%;">联系电话:@LINKMAN_TEL</div>'
//				+ '<div class="listCell" style="width:25%;">客户类型编码:@CUST_TYPE</div>'//display:none;
				+ '<div class="listCell" style="width:25%;">客户类型:@TEMP_CUST_TYPE_ORA<br/>客户号:@CUST_ID</div>'
				+ '<div class="listCell" style="width:25%;">证件类型:@IDENT_TYPE_ORA<br/>证件号码:@IDENT_NO</div>'
				+ '<div class="listCell" style="width:25%;">客户状态:@CUST_STAT_ORA<br/></div>'
				+'</a></li>'
}
var selectContent1="";//下拉框
var selectContent2="";//下拉框
var selectContent3="";//下拉框
var condition = {};
condition.CUST_ID = '';
condition.CUST_NAME = $("#searchCustKey").val();
var config = {
	filter : false,
	pageConfig : {
		limit : 5,
		queryUrl : basePath + 'custConcernDel.json?condition='+$.toJSON(condition),
		listViewId : 'customerQuery_list',
		listReader : listReader,
		success : function(response){},
		error : function(){
			mesUtil.alert('数据加载失败');
		}
	}
}
 
function addCustomer() {
	createCustomerPanel({});
}
function initData(){
	$.ajax({//客户来源渠道
		type : "GET",
		url : basePath+'/lookup.json?name=XD000353',
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			for(var i=0;i<response.JSON.length;i++){
				if(i==0){
					 selectContent1=selectContent1+'<select id="selectContent1" name="sourceChannel">'
						 + ' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option>';
				}else if(i==response.JSON.length-1){
					selectContent1=selectContent1+' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option></select>'
				}else{
					selectContent1=selectContent1+' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option>'
				}
			}
		}
	});
	$.ajax({//所属行业
		type : "GET",
		url : basePath+'/lookup.json?name=XD000002',
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			for(var i=0;i<response.JSON.length;i++){
				if(i==0){
					 selectContent2=selectContent2+'<select id="selectContent2" name="industType">'
						 + ' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option>';
				}else if(i==response.JSON.length-1){
					selectContent2=selectContent2+' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option></select>'
				}else{
					selectContent2=selectContent2+' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option>'
				}
			}
		}
	});
	$.ajax({//证件类型
		type : "GET",
		url : basePath+'/lookup.json?name=XD000040',
		cache: false, 
		contentType: "application/json", 
		success : function(response){
			for(var i=0;i<response.JSON.length;i++){
				if(i==0){
					 selectContent3=selectContent3+'<select id="selectContent3" name="identType">'
						 + ' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option>';
				}else if(i==response.JSON.length-1){
					selectContent3=selectContent3+' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option></select>'
				}else{
					selectContent3=selectContent3+' <option value="'+response.JSON[i].key+'">'+response.JSON[i].value+'</option>'
				}
			}
		}
	});
}
/**
 * 创建详情panel
 * @param data panel信息
 */
function createCustomerPanel (data) {
	
	var panelContent = '<form id="addCustomerInfoForm" action="" method="get">'
					 +'<div class="toolsBar noSearch">'
					 +'<div class="tbLeft">'
					 +'<div class="tabsMenu selected" click="">添加客户</div>'
					 +'</div>'
					 +'<div class="tbRight">'
					 +'<a class="txtBt icon-loop" onclick="javascript:saveCustomerInfo();">保存</a>'
					 +'<a class="txtBt icon-loop" onclick="javascript:resetForm();">重置</a>'
					 +'<a class="txtBt icon-checkmark" id="addCustomerVisit" onclick="javascript:getPhoto();">拍照</a>'
					 +'</div>'
					 +'</div>'
//					+'<table><tr><td>'
  			//	   +'<video id="video" width="50px" height="50px" autoplay></video>'
  				   +'<img id="photoUrl"/>'
  			//	   +'<canvas id="canvas" width="50px" height="50px"></canvas>'
					 + '<div class="formContent">'
					 + '<div class="formCell" style="width: 50%;"><label style="text-align: left;" for="custName">客户姓名:</label><div class="fcContent"><input name="custName" id="custName" type="text" ></div></div>'
					 + '<div class="formCell" style="width: 50%;"><label style="text-align: left;" for="custName">证件类型:</label><div class="fcContent">'+selectContent3+'</div></div>'
					 + '<div class="formCell" style="width: 50%;"><label style="text-align: left;" for="custName">所属行业:</label><div class="fcContent">'+selectContent2+'</div></div>'
					 + '<div class="formCell" style="width: 50%;"><label style="text-align: left;" for="identNo">证件号码:</label><div class="fcContent"><input  name="identNo" id="identNo" type="text" ></div></div>'
					 + '<div class="formCell" style="width: 50%;"><label style="text-align: left;" for="linkmanName">联系人姓名:</label><div class="fcContent"><input id="linkmanName" name="linkmanName"  type="text" ></div></div>'
					 + '<div class="formCell" style="width: 50%;"><label style="text-align: left;" for="linkmanTel">联系人电话:</label><div class="fcContent"><input id="linkmanTel" name="linkmanTel"  type="text" ></div></div>'
					 + '<div class="formCell" style="width: 50%;"><label style="text-align: left;" >客户来源渠道:</label><div class="fcContent">'+selectContent1+'</div></div>'
					 + '</div>'
					 + ' </form>';
	var contentDiv = '<div id="createCustomerPanel" title="添加客户" class="panel" data-footer="none">'
  				   + '<header>'
  				   + '<div class="top_header"> '
  				   + '<a id="backButton" href="javascript:$.ui.loadContent(\'homePage_panel\');" class="button" >后退</a> '
  				   + ' <h1>添加客户</h1></div>'
  				   +'</header>'
  				   + panelContent
 				   + '</div>';
	var el = $.query("#createCustomerPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("createCustomerPanel", contentDiv);
	} else {
		$.ui.updatePanel("createCustomerPanel", panelContent);
	}
	$.ui.loadContent("createCustomerPanel");
	resetForm();

}
var getPhoto = function(){
	getCamera(onPicSuccess);
}
function onPicSuccess(imageData){
   	var image = document.getElementById('photoUrl');
   //	alert("123>>>"+imageData);
   	//data:image/jpeg;base64,
   	image.src = "" + imageData;
}
/***
 *添加客户信息
 */
function saveCustomerInfo() {
	var condition = $("#addCustomerInfoForm").serialize();//获取form表单的值
	if($("#addCustomerInfoForm").get(0)[3].value==""){
		 $("#afui").popup({
             title: "筛选",
             message: "请输入客户姓名!",
//             message: "Username: <input type='text' class='af-ui-forms'><br>Password: <input type='text' class='af-ui-forms' style='webkit-text-security:disc'>",
             cancelText: "确认",
             cancelCallback: function () {},
             doneText: "Login",
             doneCallback: function () {
            	 mesUtil.alert("Logging in")
             },
             cancelOnly: false
         });
	    return false;
	}else{
		mobileUtils.showLoading('正在保存...');
		//判断是离线还是在线
		var isOffline = 0;//mobileApp.getUserInfo.isOffline;
		if(1*isOffline == 0){
			$.ajax({
				type : "POST",
				url : basePath+'customerqueryAction.json?'+condition,
				cache: false, 
				contentType: "application/json", 
				success : function(response){
					mobileUtils.hideLoading();
					mesUtil.alert('保存成功！');
				},
				error:function(){
					mobileUtils.hideLoading();
					mesUtil.alert('保存失败！');
				}
			});	
		}else{//离线
			var custName = $("#custName").val();
			var identType = $("#selectContent3").val();//证件类型
			//alert("identType>>>>"+identType);
			var industType = $("#selectContent2").val();//所属行业
			//alert("industType>>>>"+industType);
			var identNo = $("#identNo").val();
			var linkmanName = $("#linkmanName").val();
			var linkmanTel = $("#linkmanTel").val();
			var sourceChannel = $("#selectContent1").val();
			//alert("sourceChannel>>>>"+sourceChannel);
			var photoUrl = $("#photoUrl")[0].src;
			//alert("photoUrl>>>"+photoUrl);
			var sql = " insert into ACRM_F_CI_CUSTOMER(CUST_NAME,IDENT_TYPE,INDUST_TYPE,IDENT_NO,";//CUST_ID,暂时取消掉
			sql += " LINKMAN_NAME,LINKMAN_TEL,SOURCE_CHANNEL,PHOTO_URL)";
			sql += " values('"+custName+"','"+identType+"','"+industType+"','"+identNo+"',";
			sql += " '"+linkmanName+"','"+linkmanTel+"','"+sourceChannel+"','"+photoUrl+"')";
			execute(db,sql,function(){
				mesUtil.alert("可执行成功回调！");
			});
			mobileUtils.hideLoading();
		}
	}
}
function resetForm(){
	$(':input','#addCustomerInfoForm')  
	 .not(':button, :submit, :reset, :hidden')  
	 .val('')  
	 .removeAttr('checked')  
	 .removeAttr('selected');
}
function  resetSearchCustPanel(){
	$(':input','#CustomerCheckForm')  
	 .not(':button, :submit, :reset, :hidden')  
	 .val('')  
	 .removeAttr('checked')  
	 .removeAttr('selected');
}
function searchCustForDetail(){
	var condition = $("#CustomerCheckForm").serialize();//获取form表单的值
	customerQuery.queryFun(basePath + 'customerQuery.json?condition='+$.toJSON(condition));
}