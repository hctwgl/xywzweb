/***
 * 功能描述：资讯信息-行内信息
 *  作者 ：lijz1
 *  时间 ：2015-5-18 19:08:53
 *  版本 ：v1.0.0
 */
var start = 1,limit = 9,
	generatedCount = 0;

function loadData(searchUrl) {
//loadStart('数据正在初始化...','b',false);
	$.ajax({
		type : "GET",
		url : searchUrl,
		cache: false, 
		dataType: 'json',
		async: false, 
		success : function(response){
			var aResults = response.json.data;
			var el = document.getElementById('list_panel1');
			var li = '';
			for (var i = 0; i < aResults.length; i++) {
				li += '<div class="listRow">'
					+ '<a href="" style="font-size:25px" onclick="goToInBankDetailPage('+aResults[i].ID+')">'+aResults[i].MESSAGE_TITLE+'</a>'
					+ '<div class="contentHigh"><p>'+aResults[i].MESSAGE_INTRODUCE+'</p></div>'
					+ '</div>'
				;
			}
			li += '<p class="cl"></p>';
			$("#list_panel1").append($('<div>'+li+'<div class="cl"></div></div>'));
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});

}

/**
 * 详情页面
 * @param id
 */
function goToInBankDetailPage(message_id) {
	goPage('bankInfoDetail.html?id='+message_id);
}

