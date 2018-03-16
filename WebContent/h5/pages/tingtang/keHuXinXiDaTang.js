var start = 1,limit = 9,custId,
	generatedCount = 0;

function loadData(searchUrl,queuenum,id,zhuanJieRenID,zhuanJieRenName) {
//loadStart('数据正在初始化...','b',false);
	$.ajax({
		type : "GET",
		url : searchUrl,
		cache: false, 
		dataType: 'json',
		async: false, 
		success : function(response){
			var aResutlt = response.baseInfo.data[0];	//客户基本信息
			var liCaiDataList = response.liCai;//持有理财
			var jiJinDataList = response.jiJin;//持有基金
			var li = '<h1>基本信息<a href="#" class="bt01" id="kehuzhuanjie">客户转介</a>';
			if(queuenum){
				debugger;
				li = li + '<a href="#" class="bt01" id="duilietiaozheng">队列调整</a></h1>';
			}
			if(response.baseInfo.data.length == 0){
				$("#jiBenXinXi").append($(li));
			}else{
				li = li+'<div class="khxCon1">'
				+'<div  class="khxCoP1">'
				+'<p>'+aResutlt.CUST_NAME;
				if(aResutlt.SEX == '01'){
					li = li + '<img src="../../themes/hbbank/images/man.png" width="16" height="20" />';
				}else if(aResutlt.SEX == '02'){
					li = li + '<img src="../../themes/hbbank/images/women.png" width="16" height="20" />';
				}
				li = li + '</p>';
				for(var i=0;i<aResutlt.CUST_LEVEL;i++){
					li = li + '<span></span>';
				}
				li = li +'</div>'
				+'<ul class="khxCoP2">'
				+'<li><p>证件类型：</p><span>身份证</span></li>'
				+'<li><p>证件号码：</p><span>'+jieMi(response.ZJHM)+'</span></li>'
				+'<li><p>手机号：</p><span>'+jieMi(response.SJHM)+'</span></li>'
				+'<li><p>理财经理：</p><span>'+aResutlt.USER_NAME+'</span></li>'
				+'<li><p>签约信息：</p><span>'+response.sighInfo+'</span></li>'
				+'<li><p>总资产</p></li>'
				+'<li><p style="text-align:right">时点：</p><span>'+aResutlt.ASSET_SUM+'</span></li>'
				+'<li><p style="text-align:right">滚动季日均：</p><span>'+aResutlt.ASSET_ROLL_SEA_AVG+'</span></li>'
				+'</ul>'
				+'</div>';
				$("#jiBenXinXi").append($(li));
			}
		   
		   $("#kehuzhuanjie").bind("click",function() {
				goPage('./zhuanJie.html?zhuanJieRenID='+zhuanJieRenID+'&zhuanJieRenName='+zhuanJieRenName+'&id='+id+'&queuenum='+queuenum);
			});
		  
		   $("#duilietiaozheng").bind("click",function() {
			   var disable = $("#callBtn").attr("disabled");
				
				if(disable != undefined && (disable == 'disabled' || disabled == true)){
					mesUtil.alert("已调整");
					return;
				}
				
				$("#callBtn").attr("disabled",true);
			   $.ajax({
					type : "GET",
					url : basePath+'custViewBaseInfoQueryAction!changeQueue.json?queuenum='+queuenum,
					cache: false, 
					async: false, 
					success : function(response){
						mesUtil.alert(response.msg);
					},
					error:function(){
						mesUtil.alert('队列调整失败!');
					}
			   });
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

//产品配比图
function drawChart1(custId){
	var data1;
	$.ajax({
		url : basePath + 'custViewBaseInfoQueryAction!getProductRatio.json?custId='+custId,
		type : "GET",
		async : false,
		cache: false, 
		dataType : "json",
		success : function(response){
			data1 = response.data;
		},
		error:function(a,b,c){
			//alert('信息提醒数据加载失败...','提示');
		}
	});
	
	
	$.jqplot('ziChanGuanLi', [data1], {
		grid: {
            drawBorder: false, 
            background: '#F2F2E9', //设置整个图标区域的背景色
            drawGridlines: false,
            shadow:false
        },
		seriesDefaults: {
			renderer: jQuery.jqplot.PieRenderer, 
			rendererOptions: { 
	        	diameter: 165, //设置饼的直径
				showDataLabels: true,
				shadow:false
			} 
		}, 
		legend: {
			location: 'e', //分类名称框出现位置, nw, n, ne, e, se, s, sw, w.
			show:true
		}
    }); 
}

//总资产时点趋势图(最近6个月)
function drawChart2(custId){ 
	$.jqplot.config.enablePlugins = true;
	var s1={};

	$.ajax({
		url : basePath + 'custViewBaseInfoQueryAction!getLastRollSixMonth.json?custId='+custId,
		type : "GET",
		async : false,
		cache: false, 
		dataType : "json",
		success : function(response){
			s1 = response.data;
		
			var minval = s1[0][0];
			var maxval = s1[5][0];
			
			plot1 = $.jqplot('ziChanQuShi',[s1],{
//			       title: '总资产时点趋势图(最近6个月)',
				axes: {
					xaxis: {
						renderer: $.jqplot.DateAxisRenderer,
						min:minval,
						max:maxval,
//						tickOptions: {
//							tickOptions:{formatString:'%Y/%#m'}
//						},
						tickInterval:'1 months',
						numberTicks: 4
					},
					yaxis: {
						 tickOptions: {
			                   formatString: '%.0f'
			               }
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
					zoom: true
				}
			});
			
		},
		error:function(a,b,c){
			//alert('信息提醒数据加载失败...','提示');
			
		}
	});}



