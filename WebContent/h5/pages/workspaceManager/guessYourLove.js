/***
 * 功能描述：行内资讯
 *  作者 ：lan
 *  时间 ：2015-03-03
 *  版本 ：v1.0.0
 */
var start = 1,limit = 9,opt={},
	generatedCount = 0;

function nextJiaoyan(idType) {
	var titleNum = idType.substr(6);//得到题号
	opt[titleNum] = '';
	var i = 0;
	var obj = document.getElementsByName(idType);
	for (i = 0; i < obj.length; i++) {
		if (obj[i].checked) {
			opt[titleNum] = obj[i].id.substr(obj[i].id.length-1);//得到选项值
			break;
		}
	}
	if (i == obj.length) {
		mesUtil.alert('请选择本题再进行下一步操作');
		return false;
	}
	if (titleNum == '10') {
		var optStr = '';
		for (var k = 1; k <= 10; k++) {
			optStr += ',' + opt[k];
		}
		$.ajax({
			type : "GET",
			url : basePath+'guessYourLoveAction!getProduct.json?optStr='+optStr,
			cache: false, 
			dataType: 'json',
			async: false,
			success : function(response){
				var aResult = response.data[0];
				goPage('guessYourLove1Prd.html?prodId='+aResult.PROD_NO);
			},
			error:function(){
				//loadStop();
				//alert('数据初始化失败!!!!');
			}
		});
	}
	return true;
}

function loadData(searchUrl) {
//loadStart('数据正在初始化...','b',false);
	$.ajax({//查询题目查询
		type : "GET",
		url : searchUrl,
		cache: false, 
		dataType: 'json',
		async: false, 
		success : function(response){
			var aResults = response.json.data;
			var el = document.getElementById('botm');
			var titleIdStr = '';
			var li = {};
			for (var i = 0; i < aResults.length; i++) {
				titleIdStr = titleIdStr +','+ aResults[i].TITLE_ID;
			}
			$.ajax({//选项查询
				type : "GET",
				url : basePath+'guessYourLoveAction!getOption.json?titleIdStr='+titleIdStr,
				cache: false, 
				dataType: 'json',
				async: false,
				success : function(response1){
					var aResults1 = response1.data;
					var li = {};
					var lv = {};
					for (var i = 0; i < aResults.length; i++) {debugger;
						var a = i*1+1;
						li[a] = '';
						li[a] += '<a name="'+a+'"></a>'
								+ '<div class="top">'
								+ '	<p class="logo"><img src="../../themes/hbbank/images/logo_top.png" /></p>'
								
								+ '	<div class="zDh">'
								+ '		<p class="zDhLeft">'
								+ '			<a href="#" name="backBtn"><img src="../../themes/hbbank/images/fanhui.png" /></a><span>猜你喜欢</span>'
								+ '		</p>'
								+ '		<div class="zDhRight">'
								+ '			<a href="#" name="goHomeBtn"><img src="../../themes/hbbank/images/zhuye.png" /></a>'
								+ '			<a href="#" id="btRm'+a+'"><img src="../../themes/hbbank/images/gerenzhongxin.png" /></a>'
								+ '			<a href="#" id="callBtn'+a+'"><img src="../../themes/hbbank/images/hujiao.png"/></a>'
								+ '		</div>'
								+ '	</div>'
								+ '</div>'
								+ '<div class="topLine">'
								+ '<img src="../../themes/hbbank/images/zhanwei.png" width="100%" height="2" />'
								+ '</div>'
								+ '<div class="botm bxBox" id="botm'+a+'">'
								+ '<div class="qutBox" id="qutBox'+a+'">'
								+ '<h1>问卷调查</h1>'
								+ '<div class="qutTitle">'+a+'.'+aResults[i].TITLE_NAME+'</div>'
								+ '<div class="qutContent">'
								;
						for (var j = 0; j < aResults1.length; j++) {
							if (aResults1[j].TITLE_ID == a) {
								li[a] += '	<div class="qutList">'
									+ '			<input type="radio" name="option'+a+'" id="option'+a+aResults1[j].RESULT_SORT+'" /><label for="option'+a+aResults1[j].RESULT_SORT+'">'+aResults1[j].RESULT+'</label>'
									+ '		</div>'
									;
							}
						}
						li[a] += '</div>';
						if (a == '1'){
							li[a] += '<div class="btBox">'
								+ '<a href="#'+(a*1+1)+'" onclick="return nextJiaoyan(\'option'+a+'\')"><input value="下一题" type="button" /></a>'
								+ '</div>'
								+ '<div class="pageNub">'+a+'/'+aResults.length+'</div>'
								;
						} else if (a == aResults.length) {
							li[a] += '<div class="btBox">'
								+ '<a href="#'+(aResults.length-1)+'"><input value="上一题" type="button"></input></a>'
								+ '<a href="#" onclick="return nextJiaoyan(\'option'+a+'\')"><input value="提交" type="button"></input></a>'
								+ '</div>'
								+ '<div class="pageNub">'+a+'/'+aResults.length+'</div>'
								;
						} else {
							li[a] += '<div class="btBox">'
								+ '<a href="#'+(a*1-1)+'"><input value="上一题" type="button"></input></a>'
								+ '<a href="#'+(a*1+1)+'" onclick="return nextJiaoyan(\'option'+a+'\')"><input value="下一题" type="button"></input></a>'
								+ '</div>'
								+ '<div class="pageNub">'+a+'/'+aResults.length+'</div>'
								;
						}
						li[a] += '</div>'
							+ '</div>'
							;
						$("#content").append($(li[a]));
					
					}
				},
				error:function(){
					//loadStop();
					//alert('数据初始化失败!!!!');
				}
			});
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});
	
	$("a[name='backBtn']").each(function (){
		$(this).bind('click', function(){
			goPage('../../index.html');
		});
	});
	$("a[name='goHomeBtn']").each(function (){
		$(this).bind('click', function(){
			goPage('../../index.html');
		});
	});

	
	var authUser = $._APP.getUserInfo();
	if(authUser.userId){
		$("#btRm1").show();
		$("#btRm2").show();
		$("#btRm3").show();
		$("#btRm4").show();
		$("#btRm5").show();
		$("#btRm6").show();
		$("#btRm7").show();
		$("#btRm8").show();
		$("#btRm9").show();
		$("#btRm10").show();
	}else{
		$("#btRm1").hide();
		$("#btRm2").hide();
		$("#btRm3").hide();
		$("#btRm4").hide();
		$("#btRm5").hide();
		$("#btRm6").hide();
		$("#btRm7").hide();
		$("#btRm8").hide();
		$("#btRm9").hide();
		$("#btRm10").hide();
	} 
	
	setRightMenu();
	callPeople();
}

