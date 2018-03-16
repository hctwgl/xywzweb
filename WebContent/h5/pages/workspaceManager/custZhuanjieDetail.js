/***
 * 功能描述：理财产品
 *  作者 ：lan
 *  时间 ：2015-03-03
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
			var aResult = response.json.data[0];
			var el = document.getElementById('mfPrdDtlList1');
			var referralType = '';//客户意向产品类型
			var val1 = aResult.REFERRAL_TYPE;
			if(val1.indexOf('01')>-1)referralType=referralType+'理财,';
	    	if(val1.indexOf('02')>-1)referralType=referralType+'基金,';
	    	if(val1.indexOf('03')>-1)referralType=referralType+'保险,';
	    	if(val1.indexOf('04')>-1)referralType=referralType+'贵金属,';
	    	if(val1.indexOf('05')>-1)referralType=referralType+'特色存款,';
	    	if(val1.indexOf('06')>-1)referralType=referralType+'贷款,';
	    	if(val1.indexOf('07')>-1)referralType=referralType+'国债,';
	    	if(val1.indexOf('08')>-1)referralType=referralType+'电子银行,';
	    	if(val1.indexOf('09')>-1)referralType=referralType+'手机银行,';
	    	referralType=referralType.substring(0, referralType.length-1);
	    	var buyType = '';//客户购买产品
	    	var val2 = aResult.BUY_TYPE;
	    	if(val2.indexOf('01')>-1)buyType=buyType+'理财,';
	    	if(val2.indexOf('02')>-1)buyType=buyType+'基金,';
	    	if(val2.indexOf('03')>-1)buyType=buyType+'保险,';
	    	if(val2.indexOf('04')>-1)buyType=buyType+'贵金属,';
	    	if(val2.indexOf('05')>-1)buyType=buyType+'特色存款,';
	    	if(val2.indexOf('06')>-1)buyType=buyType+'贷款,';
	    	if(val2.indexOf('07')>-1)buyType=buyType+'国债,';
	    	if(val2.indexOf('08')>-1)buyType=buyType+'电子银行,';
	    	if(val2.indexOf('09')>-1)buyType=buyType+'手机银行,';
	    	buyType=buyType.substring(0, buyType.length-1);
	    	var li = '';
	    	var lv = '';
	    	if (aResult.REFERRAL_STATE == '2') {
	    		li  = '		<div class="fmList"><span>转介人：</span>'+aResult.REFERRAL_NAME+'</div>'
		    		+'		<div class="fmList"><span>营销人：</span>'+aResult.MGR_NAME+'</div>'
		    		+'		<div class="fmList"><span>转介状态：</span>'+aResult.REFERRAL_STATE_ORA+'</div>'
	//	    		+'		<div class="fmList"><span>客户意向产品类型：</span>'+referralType+'</div>'
		    		+'	<div class="cl"></div>'
		    		;
		    		lv = '<div class="fmList"><span>客户购买产品：</span>'+buyType+'</div>'
		    		+'<div class="fmList"><span>客户名称：</span>'+aResult.CUST_NAME+'</div>'
		    		;
	    	} else if (aResult.REFERRAL_STATE == '1' || aResult.REFERRAL_STATE == '3') {
	    		li  = '		<div class="fmList"><span>转介人：</span>'+aResult.REFERRAL_NAME+'</div>'
		    		+'		<div class="fmList"><span>营销人：</span>'+aResult.MGR_NAME+'</div>'
		    		+'		<div class="fmList"><span>转介状态：</span>'+aResult.REFERRAL_STATE_ORA+'</div>'
		    		+'		<div class="fmList"><span>客户意向产品类型：</span>'+referralType+'</div>'
		    		+'	<div class="cl"></div>'
		    		;
	//	    		lv = '<div class="fmList"><span>客户购买产品：</span>'+buyType+'</div>'
	    			lv = '<div class="fmList"><span>客户名称：</span>'+aResult.CUST_NAME+'</div>'
		    		;
	    	}
		   $("#mfPrdDtlList1").append($(li+lv));
		   var phoneNo = '';
		   debugger;
		   if (aResult.TELEPHONE_NUM != undefined && aResult.TELEPHONE_NUM != null && aResult.TELEPHONE_NUM != '') {
			   phoneNo = parseFloat(aResult.TELEPHONE_NUM);
		   } else {
			   
		   }
		   var ln = '';
		   if (aResult.REFERRAL_STATE == '2') {
			   ln = '<div class="fmList"><span>联系电话：</span>'+phoneNo+'</div>'
				   +'<div class="fmList"><span>转介开始日期：</span>'+aResult.START_DATE+'</div>'
				   +'<div class="fmList"><span>转介结束日期：</span>'+aResult.END_DATE+'</div>'
				   +'<div class="fmList"><span>客户购买产品金额：</span>'+aResult.MONEY+'</div>'
				   +'<div class="fmList"><span>客户购买产品日期：</span>'+aResult.BUY_DATE+'</div>'
				   ;
		   } else if (aResult.REFERRAL_STATE == '1' || aResult.REFERRAL_STATE == '3') {
			   ln = '<div class="fmList"><span>联系电话：</span>'+phoneNo+'</div>'
			   +'<div class="fmList"><span>转介开始日期：</span>'+aResult.START_DATE+'</div>'
			   +'<div class="fmList"><span>转介结束日期：</span>'+aResult.END_DATE+'</div>'
			   +'<div class="fmList"><span>备注：</span>'+aResult.REMARK+'</div>'
//			   +'<div class="fmList"><span>客户购买产品金额：</span>'+aResult.MONEY+'</div>'
//			   +'<div class="fmList"><span>客户购买产品日期：</span>'+aResult.BUY_DATE+'</div>'
			   ;
		   }
		   $("#mfPrdDtlList2").append($(ln));
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});

}

