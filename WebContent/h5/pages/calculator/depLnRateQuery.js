/***
 * 功能描述：贵金属产品
 *  作者 ：lan
 *  时间 ：2015-03-03
 *  版本 ：v1.0.0
 */
var start = 1,limit = 9,
	generatedCount = 0;

function decimal(num,v){
	if(num == ''){
		return '-';
	}else{
		num = parseFloat(num);
		return num.toFixed(v);
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
		success : function(response){
			var aResults = response.json.data;
			var a = '';//活期
			//整存整取
			var b1 = '';//三个月
			var b2 = '';//半年
			var b3 = '';//一年
			var b4 = '';//两年
			var b5 = '';//三年
			var b6 = '';//五年
			//零存整取、整存零取、存本取息
			var c1 = '';//一年
			var c2 = '';//三年
			var c3 = '';//五年
			var d1 = '';//一年
			var d2 = '';//三年
			var d3 = '';//五年
			var e1 = '';//一年
			var e2 = '';//三年
			var e3 = '';//五年
			//通知存款
			var f1 = '';//一天
			var f2 = '';//七天
			//商业贷款
			var g1 = '';//半年
			var g2 = '';//一年
			var g3 = '';//三年
			var g4 = '';//五年
			var g5 = '';//五年以上
			//公积金贷款
			var h1 = '';//半年
			var h2 = '';//一年
			var h3 = '';//三年
			var h4 = '';//五年
			var h5 = '';//五年以上
			for (var i = 0; i < response.json.data.length; i++) {
				if (aResults[i].PROD_TYPE == '1010100000') {
					a = decimal(aResults[i].BASE_RATE,2);
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030101000') {
					b1 = decimal(aResults[i].BASE_RATE,2);
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030102000') {
					b2 = decimal(aResults[i].BASE_RATE,2);
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030103000') {
					b3 = decimal(aResults[i].BASE_RATE,2);
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030104000') {
					b4 = decimal(aResults[i].BASE_RATE,2);
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030105000') {
					b5 = decimal(aResults[i].BASE_RATE,2);
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030106000') {
					b6 = decimal(aResults[i].BASE_RATE,2); 
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030601000') {
					c1 = decimal(aResults[i].BASE_RATE,2); 
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030602000') {
					c2 = decimal(aResults[i].BASE_RATE,2); 
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030603000') {
					c3 = decimal(aResults[i].BASE_RATE,2); 
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030701000') {
					d1 = decimal(aResults[i].BASE_RATE,2); 
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030702000') {
					d2 = decimal(aResults[i].BASE_RATE,2); 
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030703000') {
					d3 = decimal(aResults[i].BASE_RATE,2); 
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030801000') {
					e1 = decimal(aResults[i].BASE_RATE,2); 
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030802000') {
					e2 = decimal(aResults[i].BASE_RATE,2); 
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1030803000') {
					e3 = decimal(aResults[i].BASE_RATE,2); 
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1020101000') {
					f1 = decimal(aResults[i].BASE_RATE,2); 
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].PROD_TYPE == '1020102000') {
					f2 = decimal(aResults[i].BASE_RATE,2); 
//						aResults[i].BASE_RATE;
				}
				if (aResults[i].LN_TYPE == 'D01') {
					if ( aResults[i].PROD_TYPE.indexOf('半年') > -1) {
						g1 = decimal(aResults[i].BASE_RATE,2); 
//							aResults[i].BASE_RATE;
					}
					if (aResults[i].PROD_TYPE.indexOf('一年') > -1) {
						g2 = decimal(aResults[i].BASE_RATE,2); 
//							aResults[i].BASE_RATE;
					}
					if (aResults[i].PROD_TYPE.indexOf('三年') > -1) {
						g3 = decimal(aResults[i].BASE_RATE,2); 
//							aResults[i].BASE_RATE;
					}
					if (aResults[i].PROD_TYPE.indexOf('五年') > -1) {
						g4 = decimal(aResults[i].BASE_RATE,2); 
//							aResults[i].BASE_RATE;
					}
					if (aResults[i].PROD_TYPE.indexOf('五年以上') > -1) {
						g5 = decimal(aResults[i].BASE_RATE,2); 
//							aResults[i].BASE_RATE;
					}
				}
				if (aResults[i].LN_TYPE == 'D04') {
					if ( aResults[i].PROD_TYPE.indexOf('半年') > -1) {
						h1 = decimal(aResults[i].BASE_RATE,2); 
//							aResults[i].BASE_RATE;
					}
					if (aResults[i].PROD_TYPE.indexOf('一年') > -1) {
						h2 = decimal(aResults[i].BASE_RATE,2); 
//							aResults[i].BASE_RATE;
					}
					if (aResults[i].PROD_TYPE.indexOf('三年') > -1) {
						h3 = decimal(aResults[i].BASE_RATE,2);
//							aResults[i].BASE_RATE;
					}
					if (aResults[i].PROD_TYPE.indexOf('五年') > -1) {
						h4 = decimal(aResults[i].BASE_RATE,2);
//							aResults[i].BASE_RATE;
					}
					if (aResults[i].PROD_TYPE.indexOf('五年以上') > -1) {
						h5 = decimal(aResults[i].BASE_RATE,2);
//							aResults[i].BASE_RATE;
					}
				}
			}
			var li  = '<tr>'
				+'<th></th><th>项目</th><th>基准利率(%)</th>'
				+'</tr>'
				+'<tr>'
				+'<td rowspan="1" class="tbrB">活期</td>'
				+'<td></td>'
				+'<td>'+a+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td rowspan="22" class="tbrB">定期</td>'
				+'<td colspan="2">整存整取</td>'
				+'</tr>'
				+'<tr>'
				+'<td>三个月</td>'
				+'<td>'+b1+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>半年</td>'
				+'<td>'+b2+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>一年</td>'
				+'<td>'+b3+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>两年</td>'
				+'<td>'+b4+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>三年</td>'
				+'<td>'+b5+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>五年</td>'
				+'<td>'+b6+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td colspan="2">零存整取</td>'
				+'</tr>'
				+'<tr>'
				+'<td>一年</td>'
				+'<td>'+c1+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>三年</td>'
				+'<td>'+c2+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>五年</td>'
				+'<td>'+c3+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td colspan="2">整存零取</td>'
				+'</tr>'
				+'<tr>'
				+'<td>一年</td>'
				+'<td>'+d1+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>三年</td>'
				+'<td>'+d2+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>五年</td>'
				+'<td>'+d3+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td colspan="2">存本取息</td>'
				+'</tr>'
				+'<tr>'
				+'<td>一年</td>'
				+'<td>'+e1+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>三年</td>'
				+'<td>'+e2+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>五年</td>'
				+'<td>'+e3+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td colspan="2">通知存款</td>'
				+'</tr>'
				+'<tr>'
				+'<td>一天</td>'
				+'<td>'+f1+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>七天</td>'
				+'<td>'+f2+'</td>'
				+'</tr>'
				;
			$("#tab1").append($(li));
			var lv = '<tr>'
				+'<th>项目</th><th>贷款利率(%)</th>'
				+'</tr>'
				+'<tr>'
				+'<td colspan="2">商业贷款</td>'
				+'</tr>'
				+'<tr>'
				+'<td>半年</td>'
				+'<td>'+g1+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>一年</td>'
				+'<td>'+g2+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>三年</td>'
				+'<td>'+g3+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>五年</td>'
				+'<td>'+g4+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>五年以上</td>'
				+'<td>'+g5+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td colspan="2">公积金贷款</td>'
				+'</tr>'
				+'<tr>'
				+'<td>半年</td>'
				+'<td>'+h1+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>一年</td>'
				+'<td>'+h2+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>三年</td>'
				+'<td>'+h3+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>五年</td>'
				+'<td>'+h4+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>五年以上</td>'
				+'<td>'+h5+'</td>'
				+'</tr>'
				;
			$("#tab2").append($(lv));
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});

}

