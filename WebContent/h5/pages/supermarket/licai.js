var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,start = 1,limit = 9,
	generatedCount = 0;

function loadData(searchUrl) {;
//loadStart('数据正在初始化...','b',false);
	$.ajax({
		type : "GET",
		url : searchUrl,
		cache: false, 
		dataType: 'json',
		async: false, 
		success : function(response){
			var aResults = response.json.data;
			var el = document.getElementById('jxlist');
			for (var i=0; i<response.json.data.length; i++) {
				var li  = '<div class="bQ">'
						 +'    <div class="bQL1">'
						 +'        <p class="bQL1_sp">'
						 +'             <span></span> <span></span> <span></span> <span></span>'
						 +'        </p>'
						 +'        <p class="bQL1Con">1,1674元</p>'
						 +'    </div>'
						 +'    <div class="bQL2">'
						 +'        <p class="bQL2P1"> 客户名称：' + aResults[i].CUST_NAME+'</p>'
						 +'        <p class="bQL2P2">000001</p>'
						 +'    </div>'
						 +'    <div class="bQL3">'
						 +'	       <p class="bQL2P3" onclick="addDB(this);">对比＋</p>'
						 +'    </div>'
						 +'</div>';
			   if(i+1 < response.json.data.length) {
					i++;
					li += '<div class="bQ">'
						 +'    <div class="bQL1">'
						 +'        <p class="bQL1_sp">'
						 +'             <span></span> <span></span> <span></span> <span></span>'
						 +'        </p>'
						 +'        <p class="bQL1Con">1,1674元</p>'
						 +'    </div>'
						 +'    <div class="bQL2">'
						 +'        <p class="bQL2P1">客户名称：' + aResults[i].CUST_NAME+'</p>'
						 +'        <p class="bQL2P2">000001</p>'
						 +'    </div>'
						 +'    <div class="bQL3">'
						 +'	       <p class="bQL2P3" onclick="addDB(this);">对比＋</p>'
						 +'    </div>'
						 +'</div>';
				} 
			   if(i+1 < response.json.data.length) {
					i++;
					li += '<div class="bQ">'
						 +'    <div class="bQL1">'
						 +'        <p class="bQL1_sp">'
						 +'             <span></span> <span></span> <span></span> <span></span>'
						 +'        </p>'
						 +'        <p class="bQL1Con">1,1674元</p>'
						 +'    </div>'
						 +'    <div class="bQL2">'
						 +'        <p class="bQL2P1">客户名称：' + aResults[i].CUST_NAME+'</p>'
						 +'        <p class="bQL2P2">000001</p>'
						 +'    </div>'
						 +'    <div class="bQL3">'
						 +'	       <p class="bQL2P3" onclick="addDB(this);">对比＋</p>'
						 +'    </div>'
						 +'</div>';
				} 
			   $("#jxlist").append($('<div>'+li+'<div class="cl"></div></div>'));
			}
			$(".hidden").hide();
			start = start + limit;
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});

}
/**
 * 下拉刷新 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullDownAction () {
	 setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			
		start = 1;
		limit = 9;
		//el = document.getElementById('thelist');
		var noticeTitle = $("#jxlist").val();
		var searchUrl = basePath+'mobileDemoAction.json?&start='+start+'&limit='+limit+'';
		if(noticeTitle != ""){
			searchUrl = basePath+'mobileDemoAction.json?&noticeTitle='+noticeTitle+'&start=1&limit=5'
		}
		$("#jxlist")[0].innerHTML = "";
		loadData(searchUrl);
		myScroll.refresh();		//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
		//document.body.scrollHeight = document.body.scrollHeight/2;
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullUpAction () {
	 setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			var el, li, i;
			el = document.getElementById('jxlist');
			//start = start + limit;
			var tjTitle = $("#jxlist").val();
			var searchUrl = basePath+'mobileDemoAction.json?&start='+start+'&limit='+limit+'';
			if(tjTitle != ""){
				searchUrl = basePath+'mobileDemoAction.json?&noticeTitle='+noticeTitle+'&start='+start+'&limit='+limit+''
			}
			
			loadData(searchUrl);
			myScroll.refresh();		// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
		}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 初始化iScroll控件
 */
function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		scrollbarClass: 'myScrollbar', /* 重要样式 */
		useTransition: false, 
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

//初始化绑定iScroll控件 
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false); 

function closeDB(obj) {
	obj.parentElement.parentElement.remove();
}
function addDB(obj) {
	if ($("#dbinfo").get(0).childElementCount < 3) {
		var text = obj.parentElement.parentElement.children[1].children[1].textContent;
		var product ='<li><p>'+text+'</p><a href="#"><img src="../../themes/hbbank/images/close.png" width="16" height="16" onclick="closeDB(this);"/></a></li>';
		$("#dbinfo").append(product);
	} else {
		alert('对比产品最多为3个.');
	}
}
function goToDBpage() {
	if ($("#dbinfo").get(0).childElementCount >= 2) {
		goPage('jijinduibi.html');
	}  else {
		alert('对比产品不能少于两个.');
	}
}