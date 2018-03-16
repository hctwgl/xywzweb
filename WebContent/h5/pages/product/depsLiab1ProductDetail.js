/***
 * 功能描述：理财产品
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
			var el = document.getElementById('mfPrdDtlList1');
			var li  = '		<div class="fmList fmlTitle">'+aResult.PROD_CN_NAME+'</div>'
					+ '		<div class="fmList"><span>最长贷款期限(天)：</span>'+aResult.MAX_LONG_TERM+'</div>'
					+ '		<div class="fmList"><span>最低贷款额度(¥)：</span>'+decimal(aResult.MIN_AMT,2)+'</div>'
					+ '	    <div class="cl"></div>'
					;
		   var lv = '<div class="fmList"><span>最高贷款额度(¥)：</span>'+decimal(aResult.MAX_AMT,2)+'</div>'
			   	  + '<div class="fmList"><span>还款方式：</span>'+aResult.REPAY_TYPE+'</div>'
			   	  + '<div class="fmList"><span>最低首付比例：</span>'+decimal(aResult.MINSF_RATIO,2)+'%</div>'
	   		  	  + '<div class="fmList"><span>利率浮动比例：</span>'+decimal(aResult.INTER_FLOAT_RATE,2)+'%</div>'
	   		  	  + '<div class="fmList"><span>贷款最低执行利率：</span>'+decimal(aResult.MIN_RATE,2)+'%</div>'
			   	  + '<div class="fmList"><span>产品简介：</span>'+aResult.PROD_COMM+'</div>'
			   	  ;
		   $("#mfPrdDtlList1").append($(li+lv));
		   var ln = '<div class="fmList"><span>申请材料：</span>'+aResult.APPLY_MATERIAL+'</div>'
	   		       +'<div class="fmList"><span>办理流程：</span>'+aResult.HANDLE_FLOW+'</div>'
		   	       ;
		   $("#mfPrdDtlList2").append($(ln));
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});

}

