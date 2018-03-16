/***
 * 功能描述：货币型基金产品
 *  作者 ：lan
 *  时间 ：2015-03-03
 *  版本 ：v1.0.0
 */
var start = 1,limit = 9,
	generatedCount = 0;

/**
 * 保留num的v位小数
 * @param num
 * @param v
 * @returns
 */
function decimal(num,v){
	if(num == ''){
		return '-';
	}else{
		num = parseFloat(num);
		return num.toFixed(v);
	}	
}

function decimalspall(num){
	if(num == ''){
		return '-';
	}else{
		num = num + '星';
		return num;
	}	
}

function companySub(Str){
	Str = Str.replace('管理有限公司','');
	return Str;
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
			var aResult = response.json.data[0];
			var fund_net_income = decimal((aResult.FUND_NET_INCOME),4); 
			var YIELD_ON_7_DAY = decimal((aResult.YIELD_ON_7_DAY),2); 
//			var MININV_AMT = decimal((aResult.MININV_AMT),2);
//			var MINADD_INV_AMT = decimal((aResult.MINADD_INV_AMT),2);
			var el = document.getElementById('"fundPrdDtlList1"');
			var li  = '<div class="fmList fmlTitle">'+aResult.PROD_CN_NAME+'</div>'
			+'		<div class="fmList"><span>基金代码：</span>'+aResult.PROD_NO+'</div>'
			+'		<div class="fmList"><span>风险等级：</span>'+aResult.RISK_CODE_ORA+'</div>'
			+'	<div class="cl"></div>'
			;
			var lv = '<div class="fmList"><span>济安评级：</span>'+decimalspall(aResult.JA_RAT)+'</div>'
	   	  			+'<div class="fmList"><span>每万份收益(¥)：</span>'+fund_net_income+'</div>'
	   	  			+'<div class="fmList"><span>7日年化收益率(%)：</span>'+YIELD_ON_7_DAY+'</div>'
	   	  			+'<div class="fmList"><span>基金公司：</span>'+companySub(aResult.MGR_COMP_NAME)+'</div>'
	   	  			;
		   $("#fundPrdDtlList1").append($(li+lv));
		   var ln = '<div class="fmList"><span>成立日期：</span>'+aResult.CREATE_DT+'</div>'
		   			+'<div class="fmList"><span>基金规模(¥)：</span>'+decimal((aResult.FUND_SCALE),2)+'</div>'
		   			+'<div class="fmList"><span>募集开始日期：</span>'+aResult.IPO_START_DATE+'</div>'
		   			+'<div class="fmList"><span>募集结束日期：</span>'+aResult.IPO_END_DATE+'</div>'
		   			+'<div class="fmList"><span>首次投资最低金额：</span>'+decimal((aResult.MININV_AMT),2)+'元</div>'
		   			+'<div class="fmList"><span>个人追加最低金额：</span>'+decimal((aResult.MINADD_INV_AMT),2)+'元</div>'
		   			;
		   $("#fundPrdDtlList2").append($(ln));
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});

}