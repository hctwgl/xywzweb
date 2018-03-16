function callPeople() {
	var token = crmToken;
	//点击呼叫按钮
	$("#callBtn").click(function(){
		var disable = $("#callBtn").attr("disabled");
		
		if(disable != undefined && (disable == 'disabled' || disabled == true)){
			mesUtil.alert('已呼叫,请稍后');
			return;
		}
		
		$("#callBtn").attr("disabled",true);
		
		jiaoHao(token);
	});
	
	$("#callBtn1").click(function(){
		var disable = $("#callBtn1").attr("disabled");
		
		if(disable != undefined && (disable == 'disabled' || disabled == true)){
			mesUtil.alert('已呼叫,请稍后');
			return;
		}
		
		$("#callBtn1").attr("disabled",true);
		
		jiaoHao(token);
	});
	$("#callBtn2").click(function(){
		var disable = $("#callBtn2").attr("disabled");
		
		if(disable != undefined && (disable == 'disabled' || disabled == true)){
			mesUtil.alert('已呼叫,请稍后');
			return;
		}
		
		$("#callBtn2").attr("disabled",true);
		
		jiaoHao(token);
	});
	$("#callBtn3").click(function(){
		var disable = $("#callBtn3").attr("disabled");
		
		if(disable != undefined && (disable == 'disabled' || disabled == true)){
			mesUtil.alert('已呼叫,请稍后');
			return;
		}
		
		$("#callBtn3").attr("disabled",true);
		
		jiaoHao(token);
	});
	$("#callBtn4").click(function(){
		var disable = $("#callBtn4").attr("disabled");
		
		if(disable != undefined && (disable == 'disabled' || disabled == true)){
			mesUtil.alert('已呼叫,请稍后');
			return;
		}
		
		$("#callBtn4").attr("disabled",true);
		
		jiaoHao(token);
	});
	$("#callBtn5").click(function(){
		var disable = $("#callBtn5").attr("disabled");
		
		if(disable != undefined && (disable == 'disabled' || disabled == true)){
			mesUtil.alert('已呼叫,请稍后');
			return;
		}
		
		$("#callBtn5").attr("disabled",true);
		
		jiaoHao(token);
	});
	$("#callBtn6").click(function(){
		var disable = $("#callBtn6").attr("disabled");
		
		if(disable != undefined && (disable == 'disabled' || disabled == true)){
			mesUtil.alert('已呼叫,请稍后');
			return;
		}
		
		$("#callBtn6").attr("disabled",true);
		
		jiaoHao(token);
	});
	$("#callBtn7").click(function(){
		var disable = $("#callBtn7").attr("disabled");
		
		if(disable != undefined && (disable == 'disabled' || disabled == true)){
			mesUtil.alert('已呼叫,请稍后');
			return;
		}
		
		$("#callBtn7").attr("disabled",true);
		
		jiaoHao(token);
	});
	$("#callBtn8").click(function(){
		var disable = $("#callBtn8").attr("disabled");
		
		if(disable != undefined && (disable == 'disabled' || disabled == true)){
			mesUtil.alert('已呼叫,请稍后');
			return;
		}
		
		$("#callBtn8").attr("disabled",true);
		
		jiaoHao(token);
	});
	$("#callBtn9").click(function(){
		var disable = $("#callBtn9").attr("disabled");
		
		if(disable != undefined && (disable == 'disabled' || disabled == true)){
			mesUtil.alert('已呼叫,请稍后');
			return;
		}
		
		$("#callBtn9").attr("disabled",true);
		
		jiaoHao(token);
	});
	$("#callBtn10").click(function(){
		var disable = $("#callBtn10").attr("disabled");
		
		if(disable != undefined && (disable == 'disabled' || disabled == true)){
			mesUtil.alert('已呼叫,请稍后');
			return;
		}
		
		$("#callBtn10").attr("disabled",true);
		
		jiaoHao(token);
	});
}

function jiaoHao(token){
	$.ajax({
		type : "GET",
		url : basePath + 'callPeopleAction!callPeople.json',
		cache: false, 
		async: false,
		data: {"token":token},
		dataType: 'json',
		success : function(response){
			var msg = response.msg;
			mesUtil.alert(msg);
		},
		error:function(){
			mesUtil.alert('呼叫失败!');
		}
	});
} 
