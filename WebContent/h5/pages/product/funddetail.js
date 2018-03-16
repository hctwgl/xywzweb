var start = 1,limit = 9,prodId,
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

function decimal1(num,v){
	if(num == ''){
		return '-';
	}else{
		num = parseFloat(num);
		return num.toFixed(v)+'%';
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

function rateStrSub(Str){
	Str = Str.replace('-','(含)至');
	return Str;
}

function rateStrAppend(Str){
	if(Str != 0){
		Str = Str + '%';
	}
	return Str;
}

function magorPrdInfo(Str){
//	debugger;
	var li = '';
	var i=0;
	var j=1;
	var rs = {};
	if(Str == ''){
		li = li + '<tr>'
	        + '<td style="width:337px">-</td>            '
	        + '<td style="width:337px">-</td>            '
	        + '</tr>';
	}else{
	rs = Str.split('|',10);
	var num = rs.length;
	if(num%2 == 1){
		while(j < num/2){
			li = li + '<tr>'
		   	        + '<td style="width:337px">'+rs[i]+'</td>            '
		   	        + '<td style="width:337px">'+rs[i+1]+'</td>            '
		   	        + '</tr>';
			i = i + 2;
			j = j + 1;
		}
		li = li + '<tr>'
	        	+ '<td style="width:337px">'+rs[i]+'</td>            '
	        	+ '<td style="width:337px"></td>            '
	        	+ '</tr>';
	}else{
		while(j <= num/2){
			li = li + '<tr>'
		   	        + '<td style="width:337px">'+rs[i]+'</td>            '
		   	        + '<td style="width:337px">'+rs[i+1]+'</td>            '
		   	        + '</tr>';
			i = i + 2;
			j = j + 1;
		}
	}
	}
	return li;
}

function mangerInfo(Str){
	if(Str == ''){
		Str = '-';
	}
	var result = '';
	for(var i=0;i<Str.length;i++){
		var tmp = Str.charAt(i);
		tmp = tmp.replace('|','</p><p>');
		result+=tmp;
	}
	return result;
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
			var el = document.getElementById('jxlistdetail');
			var ja = '';
			if (aResult.JA_RAT == '0') {
				ja = '';
			} else if (aResult.JA_RAT == '1') {
				ja = '<span></span> ';
			} else if (aResult.JA_RAT == '2') {
				ja = '<span></span> <span></span> ';
			} else if (aResult.JA_RAT == '3') {
				ja = '<span></span> <span></span> <span></span> ';
			} else if (aResult.JA_RAT == '4') {
				ja = '<span></span> <span></span> <span></span> <span></span> ';
			} else if (aResult.JA_RAT == '5') {
				ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
			}
			prodId = aResult.PROD_NO;
			var fund_net_value = decimal((aResult.FUND_NET_VALUE),4);
			var fund_accumulated_value = decimal((aResult.FUND_ACCUMULATED_VALUE),4);
			var li  = '<div class="Titltop">'
					 +'	<h1>'+aResult.PROD_CN_NAME+'</h1>'
					 +'		<p>'+ja+'</p>'
					 +'</div>'
					 +'<div class="btmLeftCon">'
					 +'	<p> 基金代码：'+aResult.PROD_NO+'</p>'
					 +'	<p> 风险等级：'+aResult.RISK_CODE_ORA+'</p>'
					 +'	<p> 济安评级：'+decimalspall(aResult.JA_RAT)+'</p>'
					 +'	<p> 净值日期：'+aResult.VAL_DATE+'</p>'
					 +'	<p> 单位净值：<span>'+fund_net_value+'</span></p>'
					 +'	<p> 涨跌幅(%)：<span>'+decimal((aResult.RISE_DECLINE),2)+'</span></p>'
					 +'	<p> 累计单位净值：<span>'+fund_accumulated_value+'</span></p>'
					 +'	<p> 基金公司：'+companySub(aResult.MGR_COMP_NAME)+'</p>'
//					 +'	<p></p>'
					 +'	<p> 成立日期：'+aResult.CREATE_DT+'</p>'
					 +'	<p> 基金规模(¥)：'+decimal((aResult.FUND_SCALE),2)+'</p>'
					 +'	<p> 募集起始日期：'+aResult.IPO_START_DATE+'</p>'
					 +'	<p> 募集结束日期：'+aResult.IPO_END_DATE+'</p>'
					 +'	<p> 首次最低投资(¥)：'+decimal((aResult.MININV_AMT),2)+'</p>'
					 +'	<p> 追加最低投资(¥)：'+decimal((aResult.MINADD_INV_AMT),2)+'</p>'
					 +'</div>'
					 ;
		   $("#jxlistdetail").append($(li));
		   
		   var lp = '<div class="huibaolv">'
			      + '<p>'+mangerInfo(aResult.FUND_MANGER_INTRO)+'</p>'
			      + '</div>';
		   $("#mangerinfo").append($(lp));
		   
		   var lv = '<div class="huibaolv">                                       '
				+'	 <table class="tab01">                              '
				+'		<tr>                                             '
				+'			<th>时间</th>                                  '
				+'			<th class="hasbod">回报率</th>                 '
				+'			<th>时间</th>                                  '
				+'			<th>回报率</th>                                '
				+'		</tr>                                            '
				+'		<tr>                                             '
				+'			<td>最近一个月</td>                            '
				+'			<td class="hasbod">'+decimal1((aResult.RISE_RATE_ONE_MONTH),2)+'</td>                  '
				+'			<td>最近一年</td>                              '
				+'			<td>'+decimal1((aResult.RISE_RATE_ONE_YEAR),2)+'</td>                                 '
				+'		</tr>                                            '
				+'		<tr>                                             '
				+'			<td>最近三个月</td>                            '
				+'			<td class="hasbod">'+decimal1((aResult.RISE_RATE_QUARTER),2)+'</td>                  '
				+'			<td>最近两年</td>                              '
				+'			<td>'+decimal1((aResult.RISE_RATE_TWO_YEAR),2)+'</td>                                 '
				+'		</tr>                                            '
				+'		<tr>                                             '
				+'			<td>最近半年</td>                              '
				+'			<td class="hasbod">'+decimal1((aResult.RISE_RATE_HALF_YEAR),2)+'</td>                  '
				+'			<td>成立以来</td>                              '
				+'			<td>'+decimal1((aResult.RISE_RATE_SINCE),2)+'</td>                                 '
				+'		</tr>                                            '
				+'	</table>                                           '
				+'	</div>                                               ';
		   $("#huibaodetail").append($(lv));
		   
		   $.ajax({
				type : "GET",
				url : basePath +'fundproductQueryAction!getRate.json?id='+aResult.PROD_NO,
				cache: false, 
				dataType: 'json',
				async: false, 
				success : function(response){
			   		debugger;
					var aResult2 = response.json.data;
					
					var j = 0;
					var k = 0;
					var a1 = {};
					var a2 = {};
					var b1 = {};
					var b2 = {};
					var c1 = '元';
					var c2 = '元';
					
					for(var i=0;i<6;i++){
						a1[i] = '-';
						a2[i] = '-';
						b1[i] = '-';
						b2[i] = '-';
					}
					
					for(var i=0;i<aResult2.length;i++){
						if(aResult2[i].BUSIN_CODE == '01' || aResult2[i].BUSIN_CODE == '02'){
							if(aResult2[i].FLAG != '0'){
								c1 = '天';
							}
							a1[j] = rateStrSub(aResult2[i].AMT_DAY);
							a2[j] = rateStrAppend(aResult2[i].FEE_RATE);
							j = j + 1;
						}else{
							if(aResult2[i].FLAG != '0'){
								c2 = '天';
							}
							b1[k] = rateStrSub(aResult2[i].AMT_DAY);
							b2[k] = rateStrAppend(aResult2[i].FEE_RATE);
							k = k + 1;
						}
					}
					
					var lu = '<div class="huibaolv">                           '
					   	   +'<table class="tab01">                    ';
				   var ln = magorPrdInfo(aResult.STOCK_PRD);	
				   lu = lu + ln + '</table>                                 '
					   	   +'</div>                                     ';
				   $("#magorPrd").append($(lu));
				   
				   var le = '<div class="huibaolv">                           '
					   	   +'<table class="tab01">                    '
					   	   +'	<tr>                                   '
					   	   +'		<th>(认)申购费率（'+c1+'）</th>          '
					   	   +'		<th class="hasbod">费率(%)</th>         '
					   	   +'		<th>赎回费率（'+c2+'）</th>          '
					   	   +'		<th>费率(%)</th>                        '
					   	   +'	</tr>                                  ';
				   for(var i=0;i<6;i++){
					   le = le 
					   			+'	<tr>                                   		 '
					   			+'		<td>'+a1[i]+'</td>              		 '
					   			+'		<td class="hasbod">'+a2[i]+'</td>        '
					   			+'		<td>'+b1[i]+'</td>              		 '
					   			+'		<td>'+b2[i]+'</td>                       '
					   			+'	</tr>                                  		 ';
				   }
					   
//					   	   +'	<tr>                                   '
//					   	   +'		<td>0(含)至100</td>              '
//					   	   +'		<td class="hasbod">7.65%</td>        '
//					   	   +'		<td>0(含)至100</td>              '
//					   	   +'		<td>9.03%</td>                       '
//					   	   +'	</tr>                                  '
//					   	   +'	<tr>                                   '
//					   	   +'		<td>100(含)至500</td>              '
//					   	   +'		<td class="hasbod">7.65%</td>        '
//					   	   +'		<td>100(含)至500</td>              '
//					   	   +'		<td>9.03%</td>                       '
//					   	   +'	</tr>                                  '
//					   	   +'	<tr>                                   '
//					   	   +'		<td>500(含)至1000</td>              '
//					   	   +'		<td class="hasbod">7.65%</td>        '
//					   	   +'		<td>500(含)至1000</td>              '
//					   	   +'		<td>9.03%</td>                       '
//					   	   +'	</tr>                                  '
//					   	   +'	<tr>                                   '
//					   	   +'		<td>1000(含)至5000</td>              '
//					   	   +'		<td class="hasbod">7.65%</td>        '
//					   	   +'		<td>1000(含)至5000</td>              '
//					   	   +'		<td>9.03%</td>                       '
//					   	   +'	</tr>                                  '
//					   	   +'	<tr>                                   '
//					   	   +'		<td>5000(含)至10000</td>              '
//					   	   +'		<td class="hasbod">7.65%</td>        '
//					   	   +'		<td>5000(含)至10000</td>              '
//					   	   +'		<td>9.03%</td>                       '
//					   	   +'	</tr>                                  '
//					   	   +'	<tr>                                   '
//					   	   +'		<td>10000(含)至9999999999</td>              '
//					   	   +'		<td class="hasbod">7.65%</td>        '
//					   	   +'		<td>10000(含)至9999999999</td>              '
//					   	   +'		<td>9.03%</td>                       '
//					   	   +'	</tr>                                  '
				   le = le + '</table>                                 '
					   	   +'</div>                                     ';
				   $("#transRate").append($(le));
		   },
		   error:function(){
				}
		   });
		   $(".hidden").hide();
		   start = start + limit;
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});

}

function drawChart(basePath, prodNo){
	var fundData='';
	var fundData1='';
	$.ajax({
		url : basePath + 'fundproductQueryAction!getFundRateInfo.json?prodNo='+prodNo,
		type : "GET",
		async : false,
		cache: false, 
		dataType : "json",
		success : function(response){
			fundData = response.jingzhi;
			fundData1 = response.cntJingzhi;
		},
		error:function(a,b,c){
			//alert('信息提醒数据加载失败...','提示');
			
		}
	});
	if(fundData.length == 0 || fundData1.length == 0){
		return;
	}
	var xmin = fundData[0][0].substr(0,4)+"/"+fundData[0][0].substr(5,2)+"/"+"01";
//	var xmin = fundData[0][0];
	//var xmax = fundData[5][0];
	$.jqplot('fundRateInfo',[fundData, fundData1],{
		title: '基金净值趋势图(最近六个月)',
//		gridPadding:{right:35},
		seriesColors : ["#8cbe1f", "#1585bd"],
		series: [{
	        label: '基金净值',
	        neighborThreshold: 0,
	        xaxis: 'xaxis', 
	        yaxis: 'yaxis',
	        showMarker: false // 是否强调显示图中的数据节点
	    },{
	    	label: '累计基金净值',
	        neighborThreshold: 0,
	        xaxis: 'xaxis', 
	        yaxis: 'yaxis',
	        showMarker: false // 是否强调显示图中的数据节点
	    }],
//		series: [{label:'基金净值'},{label:'累计基金净值'},{
//              lineWidth: 1 //指定折线的宽度
//              //markerOptions: { style: "dimaond" } //指定折线的样式
//          },
//          {
//              showLine: true, //指定是否显示线条
//              markerOptions: { size: 1.5, style: "x" } //size设置每个节点的大小
//          },
//          {
//              markerOptions: { style: "circle" }
//         },{
//             lineWidth: 5,
//              markerOptions: { style: "filledSquare", size: 10 }
//          }],
//		legend: {
//		  show: true,
//		  location: 'e',
//		  placement: 'outside'
//		},
	    axes: {
	        xaxis: {
	          renderer:$.jqplot.DateAxisRenderer,
	          min:xmin,
	          label: "日期", //指定X轴的说明文字
	          tickInterval: "1 months",
	          tickOptions:{formatString:"%Y/%#m/%#d"}
	        },
	        yaxis: {
	            renderer: $.jqplot.LogAxisRenderer,
	            tickOptions:{formatString:'%.2f'},
	        	label: "基金净值(元)" //指定Y轴的说明文字
	        }
	    },
	    legend: {
	    	show: true,//设置是否出现分类名称框(即所有分类的名称出现在图的某个位置)
	    	xoffset: 0,
	    	location: 'ne' //分类名称框出现位置, nw, n, ne, e, se, s, sw, w.
	    },
	    cursor:{zoom:true},
	    highlighter:{show:true}
//		axes: {
//		    xaxis: {
//		        renderer: $.jqplot.DateAxisRenderer,
//		        tickOptions: {
//		            formatString: '%Y/%m'
//		        },
//		        min: xmin,
//		        max: xmax,
//		        label: "日期", //指定X轴的说明文字
//		        tickInterval:'1 month'
//		        //numberTicks: 6
//		    },
//		    yaxis: {
//		        tickOptions: {
//		            formatString: '%.0f'
//		        },
//		        label: "基金净值(元)" //指定Y轴的说明文字
//		    }
//		},
//		highlighter: {
//		    sizeAdjust: 10,
//		    tooltipLocation: 'n',
//		    useAxesFormatters: false,
//		    formatString: 'Hello %s dayglow %d'
//		},
//		cursor: {
//		    show: true,
//		    zoom: false
//		}
	   });
}

