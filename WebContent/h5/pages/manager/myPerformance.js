/***
 * 客户接触
 * 作者 ：
 * 时间 ：
 * 版本 ：v1.0.0
 */
var basePath = parent.basePath;
/**
 * 绘制PWA柱状图配置参数
 * @param none
 */
var drawDefaultConfig = {
		xticks : ['新增客户数'],
		chartId : 'barChart0',
		seriesColors : ["blue", "green","red", "orange"],
		series : [{label:'目标值'},{label:'完成值'},{label:'完成值'}],
		isLegendShow : false,
		drawData : [[1],[2]],
		formateString : '%s'
}
/***
 * 根据当前登录用户（客户经理）显示业绩绘图页面
 * @param userId 客户经理ID
 */
function myPMAShow(userId) {
	var condition = {};
	condition.USER_ID = userId;

	$.ajax({
		type : "GET",
		url : basePath + 'signManagerAction!fetchPMAData.json?condition='+$.toJSON(condition),
		cache : false,
		async: false,
		dataType : "json",
			success : function(response) {
				drawRespData(response.json.data[0]);//根据返回值，绘图
			},
			error : function() {
				
			}
	});
}

/***
 * 组装返回值
 * @param data 服务端返回的json数据
 */
function drawRespData(data){
	
	if(data == null || data == '' || data == undefined){
		return ;
	}
	
	var graphCount = data.gCount;//指标数量
	
	var newCustNum = [parseInt(data.newCustNum)];//新增客户数目标值
	var newCustNumComp = [parseInt(data.newCustNumComp)];//新增客户数实际完成值
	
	var updateCustNum = [parseInt(data.updateCustNum)];//客户升级数目标值
	var updateCustNumComp = [parseInt(data.updateCustNumComp)];//客户升级数实际完成值

	var leftMoneyNum = [parseInt(data.leftMoneyNum)];//存款余额增加目标值
	var leftMoneyNumComp = [parseInt(data.leftMoneyNumComp)];//存款余额增加实际完成值
	
	var dailyMoneyAdd = [parseInt(data.dailyMoneyAdd)];//存款日均增加目标值
	var dailyMoneyAddComp = [parseInt(data.dailyMoneyAddComp)];//存款日均增加实际完成值

	var  loanCount = [parseInt(data.loanCount)];//贷款发放金额目标值
	var loanCountComp = [parseInt(data.loanCountComp)];//贷款发放金额实际完成值
	
	var finProdSale = [parseInt(data.finProdSale)]//理财产品销售目标值
	var finProdSaleComp = [parseInt(data.finProdSaleComp)];//理财产品销售实际完成值
	
	 //各指标百分比
	var newCustNumPercent = data.newCustNumPercent;
	var updateCustNumPercent = data.updateCustNumPercent;
	var leftMoneyNumPercent = data.leftMoneyNumPercent;
	var dailyMoneyAddPercent = data.dailyMoneyAddPercent;
	var loanCountPercent = data.loanCountPercent;
	var finProdSalePercent = data.finProdSalePercent;
	
	var flagArray = [newCustNumPercent,updateCustNumPercent,
	                 leftMoneyNumPercent,dailyMoneyAddPercent,
	                 loanCountPercent,finProdSalePercent];
	
	var drawRespData = [[newCustNum,newCustNumComp],
	                    [updateCustNum,updateCustNumComp],
	                    [leftMoneyNum,leftMoneyNumComp],
	                    [dailyMoneyAdd,dailyMoneyAddComp],
	                    [loanCount,loanCountComp],
	                    [finProdSale,finProdSaleComp]];

	var drawTmpConfig = {}	
	for(var i = 0;i < graphCount;i++){
	    
	    drawTmpConfig.chartId = "barChart"+i;
	    drawTmpConfig.drawData = drawRespData[i];
	    var seriesColors = ['blue'];
        var blueValue = drawRespData[i][0][0];
        var compValue = drawRespData[i][1][0];
        
        var flagColor = flagArray[i];
        
        if(flagColor <0.5){ //全部完成显示为绿色、完成少于50%为红色，大于50% 小于100%则为黄色
        	seriesColors.push('red');
        }else if(flagColor<1){
        	seriesColors.push('orange');
        }else{
        	seriesColors.push('green');
        }
        
	    if(i == 0){
	    	drawTmpConfig.xticks = ['新增客户数'];
	    }else if(i == 1){
	    	drawTmpConfig.xticks = ['客户升级数'];
	    }else if(i == 2){
	    	drawTmpConfig.xticks = ['存款余额增加'];
	    	drawTmpConfig.formateString = '%s';
	    }else if(i == 3){
	    	drawTmpConfig.xticks = ['存款日均增加'];
	    	drawTmpConfig.formateString = '%s';
	    }else if(i == 4){
	    	drawTmpConfig.xticks = ['贷款发放金额'];
	    	drawTmpConfig.formateString = '%s';
	    }else if(i == 5){ //最后一个图，需要显示颜色说明场景
	    	drawTmpConfig.formateString = '%s';
	    	var serviesArray = [{label:'目标值'}];
	    	if(seriesColors.indexOf('green') != -1){
	    		seriesColors.push('red');
		    	seriesColors.push('orange');
		    	
		    	serviesArray.push({label:'超额完成'});
		    	serviesArray.push({label:'未完成'});
		    	serviesArray.push({label:'完成值'});
		    	
	    	}else if(seriesColors.indexOf('red') != -1){
	    		seriesColors.push('green');
		    	seriesColors.push('orange');
		    	
		    	serviesArray.push({label:'未完成'});
		    	serviesArray.push({label:'超额完成'});
		    	serviesArray.push({label:'完成值'});
		    	
	    	}else{
	    		seriesColors.push('green');
		    	seriesColors.push('red');
		    	
		    	serviesArray.push({label:'完成值'});
		    	serviesArray.push({label:'超额完成'});
		    	serviesArray.push({label:'未完成'});
	    	}
	    	
	    	drawTmpConfig.drawData = [[blueValue],[compValue],[],[]]
	    	drawTmpConfig.xticks = ['理财产品销售'];
	    	drawTmpConfig.isLegendShow = true;
	    	drawTmpConfig.series =  serviesArray;
	    }
	    
	    drawTmpConfig.seriesColors = seriesColors;
	    drawBarData(drawTmpConfig);
	}
	
	createPMAListDiv(drawRespData,flagArray);//将指标数组，及完成百分比数组传入

}

/***
 * 绘制PMA柱状图
 * @param option 绘图配置参数
 */
  function drawBarData(options){
	   var opts = $.extend(true,{},drawDefaultConfig, options); 
	   var xticks = opts.xticks;
		$.jqplot(opts.chartId, opts.drawData, {
			seriesDefaults:{
				renderer:$.jqplot.BarRenderer,
				shadowAngle: 135,
				rendererOptions: {
					barDirection: 'vertical',
					fillToZero: true,
					barWidth:40
				},

				pointLabels: {show: true,location:'n',formatString: opts.formateString,ypadding:1}
			},
			axes: {
			 xaxis: {
				renderer: $.jqplot.CategoryAxisRenderer,
				ticks: xticks
			 },
				yaxis: {
				    pad: 1.05,
				    tickOptions: {formatString: opts.formateString},
				}
			},
			title: {
				text: '',
				show: true,
			},
			seriesColors: opts.seriesColors,
			series:opts.series,

			legend: {
			  show: opts.isLegendShow,
			  location: 'e',
			  placement: 'outside'
			}
			
		}).replot({clear: true, resetAxes:true});

}
  
  /***
   * 构建指标列表
   * @param
   */
function createPMAListDiv(respData,percnetArray){
	var pmaListContent = '<li class="icTitle">业绩汇总</li>'
		               + '<li class="icgHeader"><div>业绩分类</div><div>目标值</div><div>完成值</div><div>完成百分比</div></li>';
	
	var recordNum = respData.length;
	for(var i = 0;i < recordNum;i++){
		var targetVal = formatMoney(respData[i][0][0],','); 
        var compVal = formatMoney(respData[i][1][0],',');
        var percentVal = accMul(100,percnetArray[i])  + '%';

        var targetName = '新增客户数';
        if(i == 1){
        	targetName ='客户升级书';
        }
        if(i == 2){
        	targetName ='存款余额增加';
        }
        if(i == 3){
        	targetName ='存款日均增加';
        }
        if(i == 4){
        	targetName ='带宽发放金额';
        }
        if(i == 5){
        	targetName ='理财产品销售';
        }
        pmaListContent += '<li class="icgRow"><div>'+targetName+'</div><div>'+targetVal+'</div><div>'+compVal+'</div><div>'+percentVal+'</div></li>';
	}
	
	$("#pmaListDivId").append(pmaListContent);
}
 
/***
 * 精确获得两书相乘值
 * @param
 */
function accMul(arg1,arg2)
{
	var m=0,s1=arg1.toString(),s2=arg2.toString();
	try{m+=s1.split(".")[1].length}catch(e){}
	try{m+=s2.split(".")[1].length}catch(e){}
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

/***
 * 格式化金额
 * @param
 */
function formatMoney(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
    num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100);
    cents = num;
    num = Math.floor(num/100).toString();
    if(cents<10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++){
	    num = num.substring(0,num.length-(4*i+3))+','+
	    num.substring(num.length-(4*i+3));
    }
    //return (((sign)?'':'-') + '$' + num + '.' + cents); //小数点
    //return (((sign)?'':'-') + '$' + num);//可以根据需要更改
    return (((sign)?'':'-') + num);
}
 
	
 

