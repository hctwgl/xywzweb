/***
 * 客户查询
 * 作者 ：wangwan1@yuchengtech.com
 * 时间 ：2014-11-06
 * 版本 ：v1.0.0
 */
var panelId="customerQueryPanel";
var listReader = {
		mapping : [{name : 'CUST_ID'},
		           {name : 'CUST_NM'},
		           {name : 'CERT_TYPE_ORA'},
	          	   {name : 'CERT_NUM'},
	          	   {name : 'CONT_METH'},
	          	   {name : 'ASSET_SUM'},
	          	   {name : 'ASSET_ROLL_SEA_AVG'},
	          	   {name : 'MGR_NAME'}],
	     record:'<li><a href="javascript:showCustViewT(\'@CUST_ID\',\panelId\);" >'
				+ '<div class="listCell lcBig" style="width:20%;">@CUST_NM </div>'
				+ '<div class="listCell" style="width:20%;">证件类型:@CERT_TYPE_ORA<br/>证件号码:@CERT_NUM</div>'
				+ '<div class="listCell" style="width:20%;">手机号:@CONT_METH<br/>时点总资产:@ASSET_SUM</div>'
				+ '<div class="listCell" style="width:20%;">总资产滚动季日均:@ASSET_ROLL_SEA_AVG<br/>理财经理:@MGR_NAME</div>'
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
		limit : 10,
		queryUrl : basePath + 'mobileCustomerQuery.json?condition='+$.toJSON(condition),
		listViewId : 'customerQuery_list',
		listReader : listReader,
		success : function(response){
			var num = response.number;
			if(num > 1){
				mesUtil.alert('该查询结果有多条记录，请精确查询条件');
			}
		},
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
					 +'<a class="txtBt icon-loop" onclick="javascript:resetForm();">重置</a>'
					 +'<a class="txtBt icon-checkmark" onclick="javascript:saveCustomerInfo();">保存</a>'
					 +'</div>'
					 +'</div>'
//					+'<table><tr><td>'
  			//	   +'<video id="video" width="50px" height="50px" autoplay></video>'
  			//	   +'<img id="photoUrl"/>'
  			//	   +'<canvas id="canvas" width="50px" height="50px"></canvas>'
					 + '<div class="formContent row2">'
					 + '<div class="formCell"><label for="temp"></label><div class="fcContent"><input name="temp" id="temp" type="hidden" ></div></div>'
					 + '<div class="formCell"><label for="custName">客户姓名:</label><div class="fcContent"><input name="custName" id="custName" type="text" ></div></div>'
					 + '<div class="formCell rightFloat"><label for="custName">客户照片:</label><div class="fcContent"><div class="custPhoto"><img id="custPhotoImg_id" src="" alt="" class="custPhotoImg"/><a class="txtBt icon-spinner" href="javascript:getPhotoM();">拍照</a></div></div></div>'
					 + '<div class="formCell"><label for="custName">证件类型:</label><div class="fcContent">'+selectContent3+'</div></div>'
					 + '<div class="formCell"><label for="identNo">证件号码:</label><div class="fcContent"><input  name="identNo" id="identNo" type="text" ></div></div>'
					 + '<div class="formCell"><label for="custName">所属行业:</label><div class="fcContent">'+selectContent2+'</div></div>'
					 + '<div class="formCell"><label for="linkmanName">联系人姓名:</label><div class="fcContent"><input id="linkmanName" name="linkmanName"  type="text" ></div></div>'
					 + '<div class="formCell"><label for="linkmanTel">联系人电话:</label><div class="fcContent"><input id="linkmanTel" name="linkmanTel"  type="text" ></div></div>'
					 + '<div class="formCell"><label>客户来源渠道:</label><div class="fcContent">'+selectContent1+'</div></div>'
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
var getPhotoM = function(){
	cameraUtils.getCamera(onPicMSuccess,'','',100);
};
function onPicMSuccess(imageData){
	//alert("in onPicSuccess!!"+imageData);
	$('#custPhotoImg_id').attr("src",imageData).show();
}
/***
 *添加客户信息
 */
function saveCustomerInfo() {
	var condition = $("#addCustomerInfoForm").serialize();//获取form表单的值
	if($("#custName").get(0).value==""){
		 $("#afui").popup({
             title: "筛选",
             message: "请输入客户姓名!",
             cancelText: "确认",
             cancelCallback: function () {},
             cancelOnly: false
         });
	    return false;
	}else{
		mobileUtils.showLoading('正在保存...');
		//判断是离线还是在线
		var user_ = mobileApp.getUserInfo();
		var isOffline = user_.isOffline;
		if(1*isOffline == 0){
			$.ajax({
				type : "POST",
				url : basePath+'mobileCustomerQuery!save.json?condition'+$.toJSON(condition),
				cache: false, 
				contentType: "application/json", 
				success : function(response){
					mobileUtils.hideLoading();
					$.ui.loadContent("customerQueryPanel");
					$('#customerQueryPanel').queryFun();
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
			var sql = " insert into ACRM_F_CI_CUSTOMER(CUST_NAME,IDENT_TYPE,INDUST_TYPE,IDENT_NO,CUST_ID,";
			sql += " LINKMAN_NAME,LINKMAN_TEL,SOURCE_CHANNEL,PHOTO_URL)";
			sql += " values('"+custName+"','"+identType+"','"+industType+"','"+identNo+"','"+_custId_+"'";
			sql += " '"+linkmanName+"','"+linkmanTel+"','"+sourceChannel+"','"+photoUrl+"')";
			execute(db,sql,function(){
				
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