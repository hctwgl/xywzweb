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
			var li  = '<div class="Titltop">'
					 +'	<h1>'+aResult.PROD_CN_NAME+'</h1>'
					 +'		<p>'+ja+'</p>'
					 +'</div>'
					 +'<div class="btmLeftCon">'
					 +'	<p> 基金代码：'+aResult.PROD_NO+'</p>'
					 +'	<p> 风险等级：'+aResult.RISK_CODE_ORA+'</p>'
					 +'	<p> 净值日期：'+aResult.VAL_DATE+'</p>'
					 +'	<p> 单位净值：<span>'+aResult.FUND_NET_VALUE+'</span></p>'
					 +'	<p> 涨跌幅：<span>'+aResult.RISE_DECLINE+'</span></p>'
					 +'	<p> 累计单位净值：<span>'+aResult.FUND_ACCUMULATED_VALUE+'</span></p>'
					 +'	<p> 基金公司：'+aResult.MGR_COMP_NAME+'</p>'
					 +'	<p></p>'
					 +'	<p> 成立日期：'+aResult.CREATE_DT+'</p>'
					 +'	<p> 基金规模：'+aResult.FUND_SCALE+'</p>'
					 +'	<p> 募集起始日期：'+aResult.IPO_START_DATE+'</p>'
					 +'	<p> 募集结束日期：'+aResult.IPO_END_DATE+'</p>'
					 +'	<p> 个人首次最低投资金额：'+aResult.MININV_AMT+'</p>'
					 +'	<p> 个人追加最低投资金额：'+aResult.MINADD_INV_AMT+'</p>'
					 +'	<p> 申购费率(万元)0(含)-100：'+aResult.DEBIT_RATE_1+'%</p>'
					 +'	<p> 申购费率(万元)100(含)-500：'+aResult.DEBIT_RATE_2+'%</p>'
					 +'	<p></p>'
					 +'	<p> 申购费率(万元)500.00(含)-1000.00：'+aResult.DEBIT_RATE_3+'%</p>'
					 +'	<p></p>'
					 +'	<p> 申购费率(万元)1000.00(含)-99999999、999999：'+aResult.DEBIT_RATE_4+'%</p>'
					 +'	<p></p>'
					 +'	<p></p>'
					 +'	<p> 赎回费率(天)0(含)-9999999999：'+aResult.DEBIT_RATE_5+'%</p>'
					 +'	<p></p>'
					 +'</div>'
					 ;
		   $("#jxlistdetail").append($(li));
		   var lv = '<div class="huibaolv">'
			   		 +'		<ul class="hblTitle bg1">'
			   		 +'			<li class="hblTitlewth1">时间</li>'
			   		 +'			<li class="hblTitlewth2">回报率</li>'
			   		 +'			<li class="hblTitlewth3"></li>'
			   		 +'		</ul>'
			   		 +'		<ul class="hblTitle bg3">'
			   		 +'			<li class="hblTitlewth1">最近一个月</li>'
			   		 +'			<li class="hblTitlewth2">'+aResult.RISE_RATE_ONE_MONTH+'%</li>'
			   		 +'			<li class="hblTitlewth3"></li>'
			   		 +'		</ul>'
			   		 +'		<ul class="hblTitle bg2">'
			   		 +'			<li class="hblTitlewth1">最近三个月</li>'
			   		 +'			<li class="hblTitlewth2">'+aResult.RISE_RATE_QUARTER+'%</li>'
			   		 +'			<li class="hblTitlewth3"></li>'
			   		 +'		</ul>'
			   		 +'		<ul class="hblTitle bg3">'
			   		 +'			<li class="hblTitlewth1">最近半年</li>'
			   		 +'			<li class="hblTitlewth2">'+aResult.RISE_RATE_HALF_YEAR+'%</li>'
			   		 +'			<li class="hblTitlewth3"></li>'
			   		 +'		</ul>'
			   		 +'		<ul class="hblTitle bg2">'
			   		 +'			<li class="hblTitlewth1">最近一年</li>'
			   		 +'			<li class="hblTitlewth2">'+aResult.RISE_RATE_ONE_YEAR+'%</li>'
			   		 +'			<li class="hblTitlewth3"></li>'
			   		 +'		</ul>'
			   		 +'		<ul class="hblTitle bg3">'
			   		 +'			<li class="hblTitlewth1">最近两年</li>'
			   		 +'			<li class="hblTitlewth2">'+aResult.RISE_RATE_TWO_YEAR+'%</li>'
			   		 +'			<li class="hblTitlewth3"></li>'
			   		 +'		</ul>'
			   		 +'		<ul class="hblTitle bg2">'
			   		 +'			<li class="hblTitlewth1">成立以来</li>'
			   		 +'			<li class="hblTitlewth2">'+aResult.RISE_RATE_SINCE+'%</li>'
			   		 +'			<li class="hblTitlewth3"></li>'
			   		 +'		</ul>'
			   		 +'	</div>'
			   		 ;
		   $("#huibaodetail").append($(lv));
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
	var fundData;
	var fundData1;
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
	debugger;
	var xmin = fundData[0][0];
	var xmax = fundData[5][0];
	$.jqplot('fundRateInfo',[fundData, fundData1],{
		title: '基金净值趋势图(最近六个月)',
		gridPadding:{right:35},
		seriesColors : ["#8cbe1f", "#1585bd"],
		series: [{label:'基金净值'},{label:'累计基金净值'},{
              lineWidth: 1 //指定折线的宽度
              //markerOptions: { style: "dimaond" } //指定折线的样式
          },
          {
              showLine: true, //指定是否显示线条
              markerOptions: { size: 1.5, style: "x" } //size设置每个节点的大小
          },
          {
              markerOptions: { style: "circle" }
         },{
             lineWidth: 5,
              markerOptions: { style: "filledSquare", size: 10 }
          }],
		legend: {
		  show: true,
		  location: 'e',
		  placement: 'outside'
		},
		axes: {
		    xaxis: {
		        renderer: $.jqplot.DateAxisRenderer,
		        tickOptions: {
		            formatString: '%Y/%m'
		        },
		        min: xmin,
		        max: xmax,
		        label: "日期", //指定X轴的说明文字
		        tickInterval:'1 month'
		        //numberTicks: 6
		    },
		    yaxis: {
		        tickOptions: {
		            formatString: '%.0f'
		        },
		        label: "基金净值(元)" //指定Y轴的说明文字
		    }
		},
		highlighter: {
		    sizeAdjust: 10,
		    tooltipLocation: 'n',
		    useAxesFormatters: false,
		    formatString: 'Hello %s dayglow %d'
		},
		cursor: {
		    show: true,
		    zoom: false
		}
	   });
}

