var start = 1,limit = 9,prodId,prodName1,proName2,proName3,
	generatedCount = 0;

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
			var el = document.getElementById('liebiao');
			var num = response.json.data.length;
			var result1 = response.json.data[0];
			var result2 = response.json.data[1];
			var result3 = '';
			
			var riskCodeGao = response.RISK_CODE_GAO.data[0].RISK_CODE_GAO;
			if(num == 3){
				result3 = response.json.data[2];
			}
			
			prodName1 = result1.PROD_CN_NAME;//产品1名称
			prodName2 = result2.PROD_CN_NAME;//产品2名称
			if(num == 3){
				prodName3 = result3.PROD_CN_NAME;//产品3名称
			}
			prodId = result1.PROD_NO +','+ result2.PROD_NO;
			if(num == 3){
				prodId = prodId+','+ result3.PROD_NO;
			}
			var li  = '<ul class="LBCon">'
					+'<li class="LBConLI"><span>基金名称</span>'
					+'<p>'+result1.PROD_CN_NAME+'</p>'
					+'<p>'+result2.PROD_CN_NAME+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.PROD_CN_NAME+'</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI2"><span>基金代码</span>'
					+'<p>'+result1.PROD_NO+'</p>'
					+'<p>'+result2.PROD_NO+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.PROD_NO+'</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI"><span>风险等级</span>'
					+'<p>'+result1.RISK_CODE_ORA;
			
					if(result1.RISK_CODE ==  riskCodeGao){
						li = li + '<b class="bhl">高</b>';
					}
			
					li = li+'</p>'
			
					+'<p>'+result2.RISK_CODE_ORA;
					
					if(result2.RISK_CODE ==  riskCodeGao){
						li = li + '<b class="bhl">高</b>';
					}
			
					li = li+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.RISK_CODE_ORA;
						if(result3.RISK_CODE ==  riskCodeGao){
							li = li + '<b class="bhl">高</b>';
						}
					
						li = li+'</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI2"><span>成立日期</span>'
					+'<p>'+result1.CREATE_DT+'</p>'
					+'<p>'+result2.CREATE_DT+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.CREATE_DT+'</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI"><span>基金规模</span>'
					+'<p>'+result1.FUND_SCALE+'</p>'
					+'<p>'+result2.FUND_SCALE+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.FUND_SCALE+'</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI2"><span>基金公司</span>'
					+'<p>'+companySub(result1.MGR_COMP_NAME)+'</p>'
					+'<p>'+companySub(result2.MGR_COMP_NAME)+'</p>';
					if(num == 3){
						li  = li +'<p>'+companySub(result3.MGR_COMP_NAME)+'</p>';
					}
//			li  = li +'</li>'
//					+'<li class="LBConLI"><span>基金经理</span>'
//					+'<p>'+result1.FUND_MANGER_INTRO+'</p>'
//					+'<p>'+result2.FUND_MANGER_INTRO+'</p>';
//					if(num == 3){
//						li  = li +'<p>'+result3.FUND_MANGER_INTRO+'</p>';
//					}
			li  = li +'</li>'
					+'<li class="LBConLI"><span>净值日期</span>'
					+'<p>'+result1.VAL_DATE+'</p>'
					+'<p>'+result2.VAL_DATE+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.VAL_DATE+'</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI2"><span>单位净值</span>'
					+'<p>'+result1.FUND_NET_VALUE+'</p>'
					+'<p>'+result2.FUND_NET_VALUE+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.FUND_NET_VALUE+'</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI"><span>累计单位净值</span>'
					+'<p>'+result1.FUND_ACCUMULATED_VALUE+'</p>'
					+'<p>'+result2.FUND_ACCUMULATED_VALUE+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.FUND_ACCUMULATED_VALUE+'</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI2"><span>济安评级</span>'
					+'<p>'+result1.JA_RAT+'</p>'
					+'<p>'+result2.JA_RAT+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.JA_RAT+'</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI"><span>募集开始日期</span>'
					+'<p>'+result1.IPO_START_DATE+'</p>'
					+'<p>'+result2.IPO_START_DATE+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.IPO_START_DATE+'</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI2"><span>募集结束日期</span>'
					+'<p>'+result1.IPO_END_DATE+'</p>'
					+'<p>'+result2.IPO_END_DATE+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.IPO_END_DATE+'</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI"><span>涨跌幅</span>'
					+'<p>'+result1.RISE_DECLINE+'%</p>'
					+'<p>'+result2.RISE_DECLINE+'%</p>';
					if(num == 3){
						li  = li +'<p>'+result3.RISE_DECLINE+'%</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI2"><span>近一个月增长率</span>'
					+'<p>'+result1.RISE_RATE_ONE_MONTH+'%</p>'
					+'<p>'+result2.RISE_RATE_ONE_MONTH+'%</p>';
					if(num == 3){
						li  = li +'<p>'+result3.RISE_RATE_ONE_MONTH+'%</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI"><span>近三个月增长率</span>'
					+'<p>'+result1.RISE_RATE_QUARTER+'%</p>'
					+'<p>'+result2.RISE_RATE_QUARTER+'%</p>';
					if(num == 3){
						li  = li +'<p>'+result3.RISE_RATE_QUARTER+'%</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI2"><span>近半年增长率</span>'
					+'<p>'+result1.RISE_RATE_HALF_YEAR+'%</p>'
					+'<p>'+result2.RISE_RATE_HALF_YEAR+'%</p>';
					if(num == 3){
						li  = li +'<p>'+result3.RISE_RATE_HALF_YEAR+'%</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI"><span>近一年增长率</span>'
					+'<p>'+result1.RISE_RATE_ONE_YEAR+'%</p>'
					+'<p>'+result2.RISE_RATE_ONE_YEAR+'%</p>';
					if(num == 3){
						li  = li +'<p>'+result3.RISE_RATE_ONE_YEAR+'%</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI2"><span>近两年增长率</span>'
					+'<p>'+result1.RISE_RATE_TWO_YEAR+'%</p>'
					+'<p>'+result2.RISE_RATE_TWO_YEAR+'%</p>';
					if(num == 3){
						li  = li +'<p>'+result3.RISE_RATE_TWO_YEAR+'%</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI"><span>成立以来增长率</span>'
					+'<p>'+result1.RISE_RATE_SINCE+'%</p>'
					+'<p>'+result2.RISE_RATE_SINCE+'%</p>';
					if(num == 3){
						li  = li +'<p>'+result3.RISE_RATE_SINCE+'%</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI2"><span>个人首次投资最低金额(¥)</span>'
					+'<p>'+result1.MININV_AMT+'</p>'
					+'<p>'+result2.MININV_AMT+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.MININV_AMT+'</p>';
					}
			li  = li +'</li>'
					+'<li class="LBConLI"><span>个人追加最低金额(¥)</span>'
					+'<p>'+result1.MINADD_INV_AMT+'</p>'
					+'<p>'+result2.MINADD_INV_AMT+'</p>';
					if(num == 3){
						li  = li +'<p>'+result3.MINADD_INV_AMT+'</p>';
					}
			li  = li +'</li>'
					+'</ul>'
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

//基金净值
function drawChart(basePath, prodNo){
	$.jqplot.config.enablePlugins = true;
	var fundData1='';
	var fundData2='';
	var fundData3;
	var prodNo1;
	var prodNo2;
	var prodNo3;
	var count;
	$.ajax({
		url : basePath + 'fundJiJinDuiBiAction!getFundRateInfo.json?prodNo='+prodNo,
		type : "GET",
		async : false,
		cache: false, 
		dataType : "json",
		success : function(response){
			fundData1 = response.jingzhi1;
			prodNo1 =  response.prodNo1;
			fundData2 = response.jingzhi2;
			prodNo2 =  response.prodNo2;
			if(response.jingzhi3){
				fundData3 = response.jingzhi3;
				prodNo3 =  response.prodNo3;
			}
			
		},
		error:function(a,b,c){
			//alert('信息提醒数据加载失败...','提示');
			
		}
	});
	debugger;
	if(fundData2.length == 0 || fundData1.length == 0){
		return;
	}
	var xmin = fundData1[0][0].substr(0,4)+"/"+fundData1[0][0].substr(5,2)+"/"+"01";
	
	if(fundData3){
		$.jqplot('fundRateInfo', [fundData1, fundData2, fundData3], {
		    title: '基金净值趋势图(最近六个月)',
		    series: [{
		        label: prodName1,
		        neighborThreshold: 0,
		        xaxis: 'xaxis', 
		        yaxis: 'yaxis',
		        showMarker: false // 是否强调显示图中的数据节点
		    },{
		    	label: prodName2,
		        neighborThreshold: 0,
		        xaxis: 'xaxis', 
		        yaxis: 'yaxis',
		        showMarker: false // 是否强调显示图中的数据节点
		    },{
		    	label: prodName3,
		        neighborThreshold: 0,
		        xaxis: 'xaxis', 
		        yaxis: 'yaxis',
		        showMarker: false // 是否强调显示图中的数据节点
		    }],
		    axes: {
		        xaxis: {
		          renderer:$.jqplot.DateAxisRenderer,
		          min:xmin,
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
		    	location: 'ne' //分类名称框出现位置, nw, n, ne, e, se, s, sw, w.
		    },
		    cursor:{zoom:true},
		    highlighter:{show:true}
		});
	}else{
		$.jqplot('fundRateInfo', [fundData1, fundData2], {
		    title: '基金净值趋势图(最近六个月)',
		    series: [{
		        label: prodName1,
		        neighborThreshold: 0,
		        xaxis: 'xaxis', 
		        yaxis: 'yaxis',
		        showMarker: false // 是否强调显示图中的数据节点
		    },{
		    	label: prodName2,
		        neighborThreshold: 0,
		        xaxis: 'xaxis', 
		        yaxis: 'yaxis',
		        showMarker: false // 是否强调显示图中的数据节点
		    }],
		    axes: {
		        xaxis: {
		          renderer:$.jqplot.DateAxisRenderer,
		          min:xmin,
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
		    	location: 'ne' //分类名称框出现位置, nw, n, ne, e, se, s, sw, w.
		    },
		    cursor:{zoom:true},
		    highlighter:{show:true}
		});
	}
}



//累计基金净值
function drawChart1(basePath, prodNo){
	$.jqplot.config.enablePlugins = true;
	var fundData1='';
	var fundData2='';
	var fundData3;
	var prodNo1;
	var prodNo2;
	var prodNo3;
	var count;
	$.ajax({
		url : basePath + 'fundJiJinDuiBiAction!getFundRateInfo1.json?prodNo='+prodNo,
		type : "GET",
		async : false,
		cache: false, 
		dataType : "json",
		success : function(response){
			
			fundData1 = response.jingzhi1;
			prodNo1 =  response.prodNo1;
			fundData2 = response.jingzhi2;
			prodNo2 =  response.prodNo2;
			if(response.jingzhi3){
				fundData3 = response.jingzhi3;
				prodNo3 =  response.prodNo3;
			}
			
		},
		error:function(a,b,c){
			//alert('信息提醒数据加载失败...','提示');
			
		}
	});

	if(fundData2.length == 0 || fundData1.length == 0){
		return;
	}
	var xmin = fundData1[0][0].substr(0,4)+"/"+fundData1[0][0].substr(5,2)+"/"+"01";
	if(fundData3){
		$.jqplot('fundRateInfo1', [fundData1, fundData2, fundData3], {
			title: '累计基金净值趋势图(最近六个月)',
			series: [{
		        label: prodName1,
		        neighborThreshold: 0,
		        xaxis: 'xaxis', 
		        yaxis: 'yaxis',
		        showMarker: false // 是否强调显示图中的数据节点
		    },{
		    	label: prodName2,
		        neighborThreshold: 0,
		        xaxis: 'xaxis', 
		        yaxis: 'yaxis',
		        showMarker: false // 是否强调显示图中的数据节点
		    },{
		    	label: prodName3,
		        neighborThreshold: 0,
		        xaxis: 'xaxis', 
		        yaxis: 'yaxis',
		        showMarker: false // 是否强调显示图中的数据节点
		    }],
		    axes: {
		        xaxis: {
		          renderer:$.jqplot.DateAxisRenderer,
		          min:xmin,
		          tickInterval: "1 months",
		          tickOptions:{formatString:"%Y/%#m/%#d"}
		        },
		        yaxis: {
		            renderer: $.jqplot.LogAxisRenderer,
		            tickOptions:{formatString:'%.2f'},
		        	label: "累计基金净值(元)" //指定Y轴的说明文字
		        }
		    },
		    legend: {
		    	show: true,//设置是否出现分类名称框(即所有分类的名称出现在图的某个位置)
		    	location: 'ne' //分类名称框出现位置, nw, n, ne, e, se, s, sw, w.
		    },
		    cursor:{zoom:true},
		    highlighter:{show:true}
		});
		
	}else{
		$.jqplot('fundRateInfo1', [fundData1, fundData2], {
			title: '累计基金净值趋势图(最近六个月)',
			series: [{
		        label: prodName1,
		        neighborThreshold: 0,
		        xaxis: 'xaxis', 
		        yaxis: 'yaxis',
		        showMarker: false // 是否强调显示图中的数据节点
		    },{
		    	label: prodName2,
		        neighborThreshold: 0,
		        xaxis: 'xaxis', 
		        yaxis: 'yaxis',
		        showMarker: false // 是否强调显示图中的数据节点
		    }],
		    axes: {
		        xaxis: {
		          renderer:$.jqplot.DateAxisRenderer,
		          min:xmin,
		          tickInterval: "1 months",
		          tickOptions:{formatString:"%Y/%#m/%#d"}
		        },
		        yaxis: {
		            renderer: $.jqplot.LogAxisRenderer,
		            tickOptions:{formatString:'%.2f'},
		        	label: "累计基金净值(元)" //指定Y轴的说明文字
		        }
		    },
		    legend: {
		    	show: true,//设置是否出现分类名称框(即所有分类的名称出现在图的某个位置)
		    	location: 'ne' //分类名称框出现位置, nw, n, ne, e, se, s, sw, w.
		    },
		    cursor:{zoom:true},
		    highlighter:{show:true}
		});
	}
}

