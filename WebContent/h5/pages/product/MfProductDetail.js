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
//		num = parseFloat(num);
//		return num.toFixed(v);
		return num;
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
					+'		<div class="fmList"><span>产品代码：</span>'+aResult.PROD_NO+'</div>'
					+'		<div class="fmList"><span>风险等级：</span>'+aResult.RISK_CODE_ORA+'</div>'
					+'		<div class="fmList"><span>收益类型：</span>'+aResult.PRO_SY_TYPE_ORA+'</div>'
					+'	<div class="cl"></div>'
					;
		   var lv = '<div class="fmList"><span>产品期限(天)：</span>'+aResult.PROD_TERM+'</div>'
			   	  +'<div class="fmList"><span>产品剩余额度(¥)：</span>'+decimal((aResult.SURP_LIMIT),2)+'</div>'
		   		  +'<div class="fmList"><span>币种：</span>'+aResult.CUR_CODE_ORA+'</div>'
		   		  +'<div class="fmList"><span>销售起始日期：</span>'+aResult.STD_DT+'</div>'
		   		  +'<div class="fmList"><span>销售结束日期：</span>'+aResult.END_DT+'</div>'
		   		  +'<div class="fmList"><span>起息日：</span>'+aResult.INT_STD_DT+'</div>'
		   		  +'<div class="fmList"><span>到期日：</span>'+aResult.EXPIRE_DT+'</div>'
		   		  +'<div class="fmList"><span>产品成立日：</span>'+aResult.ASSET_STD_DT+'</div>'
		   		  +'<div class="fmList"><span>产品终止日：</span>'+aResult.ASSET_END_DT+'</div>'
//		   		  +'<div class="fmList"><span>销售机构：</span>'+aResult.MGR_COMP_NAME+'</div>'
		   		  +'<div class="fmList"><span>首次购买起点(¥)：</span>'+decimal((aResult.FIRST_BUY_AMT),2)+'</div>'
			   	  ;
		   $("#mfPrdDtlList1").append($(li+lv));
		   var ln = '<div class="fmList"><span>单位净值：</span>'+decimal((aResult.PRD_NAV),4)+'</div>'
   		  		  +'<div class="fmList"><span>申购单位：</span>'+decimal((aResult.DEBIT_BASE),2)+'</div>'
			   	  +'<div class="fmList"><span>申购单笔上限(¥)：</span>'+decimal((aResult.DEBIT_MAX_AMT),2)+'</div>'
		   		  +'<div class="fmList"><span>申购单笔下限(¥)：</span>'+decimal((aResult.DEBIT_MIN_AMT),2)+'</div>'
		   		  +'<div class="fmList"><span>赎回单位：</span>'+decimal((aResult.RED_BASE),2)+'</div>'
		   		  +'<div class="fmList"><span>单笔赎回上限(¥)：</span>'+decimal((aResult.RED_MAX_AMT),2)+'</div>'
		   		  +'<div class="fmList"><span>单笔赎回下限(¥)：</span>'+decimal((aResult.RED_MIN_AMT),2)+'</div>'
		   		  +'<div class="fmList"><span>最低持有份额：</span>'+aResult.MIN_HOLD_BAL+'</div>'
		   		  +'<div class="fmList"><span>是否允许赎回：</span>'+aResult.IS_RED_ORA+'</div>'
		   		  +'<div class="fmList"><span>周期开始日：</span>'+aResult.TERM_START_DATE+'</div>'
		   		  +'<div class="fmList"><span>周期终止日：</span>'+aResult.TERM_END_DATE+'</div>'
		   		  +'<div class="fmList"><span>是否允许预约赎回：</span>'+aResult.IS_OFF_RED_ORA+'</div>'
//		   		  +'<div class="fmList"><span>客户组别：</span>'+aResult.CLIENT_GROUPS+'</div>'
			   	  ;
		   $("#mfPrdDtlList2").append($(ln));
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});

}

