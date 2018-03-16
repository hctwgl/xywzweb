/***
 * 功能描述：修改密码
 *作者 ：CHANGZH@YUCHENGTECH.COM
 * 时间 ：20141105
 * 版本 ：v1.0.0
 */

	
function resetPsw() {
	$('#changePsw')[0].reset();
}
	
function updatePsw() {
	function lang(key){
		mylang = {
			'is_required'  :'',
			'is_contactWay':''
		};
		return mylang[key];
	};
	
	$("#changePsw").validate({
		rules:{
			oldPsw:{required:true},
			newPsw:{required:true},
			repeatPsw:{required:true}
		},
		messages :{
			oldPsw     :{required:lang('is_required')},
			newPsw     :{required:lang('is_required')},
			repeatPsw  :{required:lang('is_required')}
		}
	});	
	if(!$("#changePsw").valid()) {
		mesUtil.alert('请输入必填项.');
		return;
	}
	var condition = $("#changePsw").serialize();//获取form表单的值
	/* @param userId 用户名
	 * @param password 输入的新密码
	 * @param updateUser 更新人
	 * @param authEnableFlag 与历史密码重复校验策略启动标志
	 * @param historyPw 与历史密码重复次数
	 * @param oldPassword 修改人输入密码验证
	 * @param oldPassword2 当前用户密码
	 */
	
	var postData = mobileUtils.getUrlObj(condition);
	if(postData.repeatPsw != postData.newPsw) {
		mesUtil.alert('新密码两次输入不一致.');
		return;
	}
	var data = {};
	data.userId     	= mobileApp.getUserInfo().userId;
	data.updateUser 	= mobileApp.getUserInfo().userName;
	data.password   	= postData.newPsw;
	data.authEnableFlag = "0";
	data.historyPw	    = "0";
	data.oldPassword    = postData.oldPsw;
	data.oldPassword2   = "1";
	
	mobileUtils.showLoading('正在提交...');
	$.ajax({
		type : "GET",
		url : basePath + 'passwordChangeAction!authPassword.json',
		cache: false, 
		data : data,
		contentType: "json", 
		success : function(response){
			mobileUtils.hideLoading();
			mesUtil.alert('修改密码成功！');
		},
		error:function(response){
			mobileUtils.hideLoading();
			var json = $.parseJSON(response.responseText)
			mesUtil.alert(json.msg);
		}
	});	
}
	


