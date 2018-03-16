var start = 1,limit = 9,prodId,
	generatedCount = 0;

function delId(flag) {
	if (flag == '1'){
		$("#fundProd1").remove();
	} else if (flag == '2'){
		$("#fundProd2").remove();
	} else if (flag == '3'){
		$("#fundProd3").remove();
	}
}

function loadData(searchUrl) {
//loadStart('数据正在初始化...','b',false);
	$.ajax({
		type : "GET",
		url : searchUrl,
		cache: false, 
		dataType: 'json',
		async: false, 
		success : function(response){debugger;
			var num = response.json.data.length;
			var aResult1 = response.json.data[0];
			var aResult2 = response.json.data[1];
			var aResult3 = '';
			if(num == 3){
				aResult3 = response.json.data[2];
			}
			
			var el = document.getElementById('fundDuibi');
			var li  = '<div id="fundProd1">'
				+'<input id="prodId1" type="hidden" value="'+aResult1.ID+'"></input>'
				+'<span>'+aResult1.PROD_CN_NAME+'<br/><b>'+aResult1.PROD_NO+'</b></span><b onclick="return delId(1);"></b>'
				+'</div>'
				+'<div id="fundProd2">'
				+'<input id="prodId1" type="hidden" value="'+aResult2.ID+'"></input>'
				+'<span>'+aResult2.PROD_CN_NAME+'<br/><b>'+aResult2.PROD_NO+'</b></span><b onclick="return delId(2);"></b>'
				+'</div>'
				 ;
			$("#fundDuibi").append($(li));
			var lv = '<div id="fundProd3">'
				+'<input id="prodId1" type="hidden" value="'+aResult3.ID+'"></input>'
				+'<span>'+aResult3.PROD_CN_NAME+'<br/><b>'+aResult3.PROD_NO+'</b></span><b onclick="return delId(3);"></b>'
				+'</div>'
				;
			if (num == 3){
				$("#fundDuibi").append($(lv));
			}
		   
		   $(".hidden").hide();
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});

}
