/**
 * 推荐产品配置
 */
var panelConfig1 = {
	panelId : 'wrapper1', //列表panel的ID 
	pageSize: 7,		//分页大小
	//url     : basePath + 'hotSellAction.json?flag=jingxuan', //查询URL
	url     : basePath + 'hotSellAction.json?flag=jingxuan&belong_org='+belong_org,
	getCondition : function () {
		return "";//查询条件
	},
	success : function(response){//成功回调方法
		var aResults = response.json.data;
		var el = document.getElementById('tjlist');
		for (var i=0; i<response.json.data.length; i++) {
			var ja = '';
			if (aResults[i].JA_RAT == '0') {
				ja = '';
			} else if (aResults[i].JA_RAT == '1') {
				ja = '<span></span> ';
			} else if (aResults[i].JA_RAT == '2') {
				ja = '<span></span> <span></span> ';
			} else if (aResults[i].JA_RAT == '3') {
				ja = '<span></span> <span></span> <span></span> ';
			} else if (aResults[i].JA_RAT == '4') {
				ja = '<span></span> <span></span> <span></span> <span></span> ';
			} else if (aResults[i].JA_RAT == '5') {
				ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
			}
//			var li = '<div class="bQ"  onclick="goToDetailPage('+aResults[i].ID+','+aResults[i].PROD_TYPE+')">'
//				   +'	<div class="bQL1">'
//				   +'		<p class="bQL1_sp">'
//				   +			ja
//				   +'		</p>'
//				   +'	</div>'
//				   +'	<div class="bQL2">'
//				   +'		<p class="bQL2P1" style="text-align:center">'+aResults[i].PROD_CN_NAME+'</p>'
//				   +'		<p class="bQL2P2" style="text-align:center">'+aResults[i].PROD_NO+'</p>'
//				   +'		<p class="bQL2P4" style="text-align:center">'+aResults[i].PROD_TYPE_ORA+'</p>'
//				   +'	</div>'
//				   +'</div>'
//				   ;
			var li = '';
			if (aResults[i].TOP_FLAG == 1) {
				li = '<div class="bQ"  onclick="goToDetailPage('+aResults[i].ID+','+aResults[i].PROD_TYPE+')">'
				   +			ja
//				   +'		<h1><img alt="hot" src="../../themes/hbbank/images/pic_43.png">'+aResults[i].PROD_CN_NAME+'</h1>'
				   +'<p><br/></p>'
				   +'		<p class="bQL2P1" style="text-align:center"><img alt="hot" src="../../themes/hbbank/images/pic_43.png">'+aResults[i].PROD_CN_NAME+'</p>'
				   +'		<b class="bQL2P2" style="text-align:center">'+aResults[i].PROD_NO+'</b>'
				   +'		<b class="bQL2P4" style="text-align:center">'+aResults[i].PROD_TYPE_ORA+'</b>'
				   +'</div>'
				   ;
			} else {
				li = '<div class="bQ"  onclick="goToDetailPage('+aResults[i].ID+','+aResults[i].PROD_TYPE+')">'
				   +			ja
				   +'<p><br/></p>'
//				   +'		<b class="bQL2P1" style="text-align:center">'+aResults[i].PROD_CN_NAME+'</b>'
//				   +'		<h1>'+aResults[i].PROD_CN_NAME+'</h1>'
				   +'		<p class="bQL2P1" style="text-align:center">'+aResults[i].PROD_CN_NAME+'</p>'
				   +'		<b class="bQL2P2" style="text-align:center">'+aResults[i].PROD_NO+'</b>'
				   +'		<b class="bQL2P4" style="text-align:center">'+aResults[i].PROD_TYPE_ORA+'</b>'
				   +'</div>'
				   ;
			}
			$("#tjlist").append($('<div>'+li+'</div>'));
		}
	},
	error:function(){
		//alert('数据初始化失败!!!!');
	}
};
/**
 * 热销产品配置
 */
var panelConfig2 = {
	panelId : 'wrapper2', //列表panel的ID 
	pageSize: 14,		//分页大小
	//url     : basePath + 'hotSellAction.json?flag=rexiao', //查询URL
	url     : basePath + 'hotSellAction.json?flag=rexiao&belong_org='+belong_org,
	getCondition : function () {
		return "";//查询条件
	},
	success : function(response){
		var aResults = response.json.data;
		var el = document.getElementById('rxlist');
		for (var i=0; i<response.json.data.length; i++) {
			var ja = '';
			if (aResults[i].JA_RAT == '0') {
				ja = '';
			} else if (aResults[i].JA_RAT == '1') {
				ja = '<span></span> ';
			} else if (aResults[i].JA_RAT == '2') {
				ja = '<span></span> <span></span> ';
			} else if (aResults[i].JA_RAT == '3') {
				ja = '<span></span> <span></span> <span></span> ';
			} else if (aResults[i].JA_RAT == '4') {
				ja = '<span></span> <span></span> <span></span> <span></span> ';
			} else if (aResults[i].JA_RAT == '5') {
				ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
			}
			var li = '';
			if (aResults[i].TOP_FLAG == 1) {
				li = '<div><div class="bQ" onclick="goToDetailPage('+aResults[i].ID+','+aResults[i].PROD_TYPE+')">'
				   +			ja
				   +'<p><br/></p>'
				   +'		<p class="bQL2P1" style="text-align:center"><img alt="hot" src="../../themes/hbbank/images/pic_43.png">'+aResults[i].PROD_CN_NAME+'</p>'
//				   +'		<h1><img alt="hot" src="../../themes/hbbank/images/pic_43.png">'+aResults[i].PROD_CN_NAME+'</h1>'
				   +'		<b class="bQL2P2" style="text-align:center">'+aResults[i].PROD_NO+'</b>'
				   +'		<b class="bQL2P4" style="text-align:center">'+aResults[i].PROD_TYPE_ORA+'</b>'
				   +'</div></div>'
				   ;
				if(i+1 < response.json.data.length) {
					i++;
					li += '<div class="bQ"  onclick="goToDetailPage('+aResults[i].ID+','+aResults[i].PROD_TYPE+')">'
					   +			ja;
//					   +'		<p class="bQL2P1" style="text-align:center">'+aResults[i].PROD_CN_NAME+'</p>'
					if(aResults[i].TOP_FLAG == 1){
//						li += '		<h1><img alt="hot" src="../../themes/hbbank/images/pic_43.png">'+aResults[i].PROD_CN_NAME+'</h1>';
						li +=  '<p><br/></p>'
						   +'		<p class="bQL2P1" style="text-align:center"><img alt="hot" src="../../themes/hbbank/images/pic_43.png">'+aResults[i].PROD_CN_NAME+'</p>';
					}else{
//						li += '     <h1>'+aResults[i].PROD_CN_NAME+'</h1>';
						li += '<p><br/></p>'
						   +'		<p class="bQL2P1" style="text-align:center">'+aResults[i].PROD_CN_NAME+'</p>';
					}
					   li += '		<b class="bQL2P2" style="text-align:center">'+aResults[i].PROD_NO+'</b>'
					   +'		<b class="bQL2P4" style="text-align:center">'+aResults[i].PROD_TYPE_ORA+'</b>'
					   +'</div>'
					   ;
				}
			} else {
				li = '<div><div class="bQ" onclick="goToDetailPage('+aResults[i].ID+','+aResults[i].PROD_TYPE+')">'
				+			ja
				+ '<p><br/></p>'
				+'		<p class="bQL2P1" style="text-align:center">'+aResults[i].PROD_CN_NAME+'</p>'
//				+'		<h1>'+aResults[i].PROD_CN_NAME+'</h1>'
				+'		<b class="bQL2P2" style="text-align:center">'+aResults[i].PROD_NO+'</b>'
				+'		<b class="bQL2P4" style="text-align:center">'+aResults[i].PROD_TYPE_ORA+'</b>'
				+'</div></div>'
				;
				if(i+1 < response.json.data.length) {
					i++;
					li += '<div class="bQ"  onclick="goToDetailPage('+aResults[i].ID+','+aResults[i].PROD_TYPE+')">'
					+			ja;
//					+'		<b class="bQL2P1" style="text-align:center">'+aResults[i].PROD_CN_NAME+'</b>'
					if(aResults[i].TOP_FLAG == 1){
//						li += '		<h1><img alt="hot" src="../../themes/hbbank/images/pic_43.png">'+aResults[i].PROD_CN_NAME+'</h1>';
						li +=  '<p><br/></p>'
							   +'		<p class="bQL2P1" style="text-align:center"><img alt="hot" src="../../themes/hbbank/images/pic_43.png">'+aResults[i].PROD_CN_NAME+'</p>';
					}else{
//						li += '     <h1>'+aResults[i].PROD_CN_NAME+'</h1>';
						li += '<p><br/></p>'
							   +'		<p class="bQL2P1" style="text-align:center">'+aResults[i].PROD_CN_NAME+'</p>';
					}
					li += '		<b class="bQL2P2" style="text-align:center">'+aResults[i].PROD_NO+'</b>'
					+'		<b class="bQL2P4" style="text-align:center">'+aResults[i].PROD_TYPE_ORA+'</b>'
					+'</div>'
					;
				}
			}
			$("#rxlist").append($('<div>'+li+'<div class="cl"></div></div>'));
		}
		if(response.json.data.length > 0) {
			setUI();
		}
	},
	error:function(){
		//alert('数据初始化失败!!!!');
	}
};
/**
 * 页面功能配置
 */
var pageConfig1 = {
	panelCfg : panelConfig1 //Panel1配置
};
var pageConfig2 = {
	panelCfg : panelConfig2 //Panel2配置
};
/**
 * 页面初始化方法
 */
var panel1 = null;
var panel2 = null;
function load() {
	panel1 = PanelFactory.get(pageConfig1);
	panel2 = PanelFactory.get(pageConfig2);
	panel1.loadPanel();
	panel2.loadPanel();
	panel1.loadRecorder(true);
	panel2.loadRecorder(true);
}
/**
 * 页面分页绑定
 */
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', load, false);

function goToDetailPage(id, type) {
	//type 1存款 2理财 3储蓄国债 4基金 5保险 6贵金属 7贷款
	if (type == '1') {
		goPage('depsLiab2ProductDetail.html?id='+id+'&flag=1');
	} else if (type == '2') {
		goPage('MfProductDetail.html?id='+id+'&flag=1');
	} else if (type == '4') {
		goPage('funddetail.html?id='+id+'&flag=1');
	} else if (type == '5' ) {
		goPage('lnsuProductDetail.html?id='+id+'&flag=1');
	} else if (type == '6') {
		goPage('goldProductDetail.html?id='+id+'&flag=1');
	} else if (type == '7') {
		goPage('depsLiab1ProductDetail.html?id='+id+'&flag=1');
	}
}
