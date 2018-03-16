/***
 * 功能描述：公告管理
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
					+ '<a href="" style="font-size:25px" onclick="goToNoticeDetailPage('+aResults[i].NOTICE_ID+')">' + aResults[i].NOTICE_TITLE+'</a>'
					+ '<div class="contentHigh"><p>'+aResults[i].NOTICE_CONTENT+'</p></div>'
					+ '</div>'
					;
			}
			li += '<p class="cl"></p>';
		   $("#list_panel1").append($(li));
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
function goToNoticeDetailPage(id) {
	goPage('noticeQueryDetail.html?id='+id);
}

