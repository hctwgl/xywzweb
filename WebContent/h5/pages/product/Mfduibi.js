var start = 1,limit = 9,prodId,
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
			var el = document.getElementById('liebiao');
			var num = response.json.count;
			var result1 = response.json.data[0];
			var result2 = response.json.data[1];
			var riskCodeGao = response.RISK_CODE_GAO.data[0].RISK_CODE_GAO;
			var li  = '<ul class="LBCon">'
					+'<li class="LBConLI"><span>产品名称</span>'
					+'<p>'+result1.PROD_CN_NAME+'</p>'
					+'<p>'+result2.PROD_CN_NAME+'</p>'
					+'</li>'
					+'<li class="LBConLI2"><span>产品代码</span>'
					+'<p>'+result1.PROD_NO+'</p>'
					+'<p>'+result2.PROD_NO+'</p>'
					+'</li>'
					+'<li class="LBConLI"><span>风险等级</span>'
					+'<p>'+result1.RISK_CODE_ORA;
					
					if(result1.RISK_CODE != result2.RISK_CODE && result1.RISK_CODE ==  riskCodeGao){
						li = li + '<b class="bhl">高</b>';
					}
					
					li = li+'</p>'
					
					+'<p>'+result2.RISK_CODE_ORA;
					if(result1.RISK_CODE != result2.RISK_CODE && result2.RISK_CODE ==  riskCodeGao){
						li = li + '<b class="bhl">高</b>';
					}
					li = li+'</p>'
					+'</li>'
					+'<li class="LBConLI2"><span>产品期限(天)</span>'
					+'<p>'+result1.PROD_TERM+'</p>'
					+'<p>'+result2.PROD_TERM+'</p>'
					+'</li>'
					+'<li class="LBConLI"><span>预期年化收益率(%)</span>'
					+'<p>'+result1.EXP_YIELD_RATE+'</p>'
					+'<p>'+result2.EXP_YIELD_RATE+'</p>'
					+'</li>'
					+'<li class="LBConLI2"><span>起息日</span>'
					+'<p>'+result1.INT_STD_DT+'</p>'
					+'<p>'+result2.INT_STD_DT+'</p>'
					+'</li>'
					+'<li class="LBConLI"><span>到期日</span>'
					+'<p>'+result1.EXPIRE_DT+'</p>'
					+'<p>'+result2.EXPIRE_DT+'</p>'
					+'</li>'
					+'<li class="LBConLI2"><span>产品剩余额度(¥)</span>'
					+'<p>'+result1.SURP_LIMIT+'</p>'
					+'<p>'+result2.SURP_LIMIT+'</p>'
					+'</li>'
					+'<li class="LBConLI"><span>币种</span>'
					+'<p>'+result1.CUR_CODE_ORA+'</p>'
					+'<p>'+result2.CUR_CODE_ORA+'</p>'
					+'</li>'
//					+'<li class="LBConLI2"><span>销售机构</span>'
//					+'<p>'+result1.MGR_COMP_NAME+'</p>'
//					+'<p>'+result2.MGR_COMP_NAME+'</p>'
//					+'</li>'
					+'<li class="LBConLI"><span>首次购买起点(¥)</span>'
					+'<p>'+result1.FIRST_BUY_AMT+'</p>'
					+'<p>'+result2.FIRST_BUY_AMT+'</p>'
					+'</li>'
					+'<li class="LBConLI2"><span>认购单笔上限(¥)</span>'
					+'<p>'+result1.SUBSCR_BUY_MAX+'</p>'
					+'<p>'+result2.SUBSCR_BUY_MAX+'</p>'
					;
		   $("#liebiao").append($(li));
		   $(".hidden").hide();
		   start = start + limit;
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});
}
