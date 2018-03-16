var start = 1,limit = 9,custId,roleCode,zhuanJieRenID,zhuanJieRenName,
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
			var li = '<h1>厅堂队列'
				+'<div class="hTools">'
//				+'<input id="queneNum1" type="text" placeholder="输入排队号" />'
//				+'<a href="#" id="search1" class="bt01">查询</a>'
//				+'<a href="#" id="refresh1" disabled="true" class="bt01">刷新</a>'
				+'<input id="search1" class="bt01" value="查询" type="button"/>'
				+'<input id="refresh1" class="bt01" value="刷新" type="button"/>'
				+'</div>'
				+'</h1>';
			roleCode = response.roleCode;
			zhuanJieRenID = response.zhuanJieRenID;
			zhuanJieRenName = response.zhuanJieRenName;
			for(var i=0;i<response.queue.data.length;i++){
				var aResult = response.queue.data[i];
				var cust_id = "\'"+aResult.CUST_ID+"\'";
				var core_id = "\'"+aResult.CORE_ID+"\'";
				var queuenum = "\'"+aResult.QUEUENUM1+"\'";
				if(aResult.GUISHU == '1'){	//归属于当前客户经理
					li = li + '<div class="khdlBox khdlCk">';
				}else{
					li = li + '<div class="khdlBox">';
				}
				li = li +'<div class="khdlCon">'
			  			+'<div class="khdlcLeft"></div><div class="khdlcRight"></div>'
			  			
			  			+'<div class="khdlcCenter" onclick="goToCustDetailPage('+cust_id+','+core_id+','+queuenum+')">'
			  			+'<div class="khdlInfo">';
				if(aResult.SEX == '02'){
					li = li +'<div class="khdlPic khWom">'+aResult.CUST_NAME+'</div>';
				}else{
					li = li +'<div class="khdlPic khMan">'+aResult.CUST_NAME+'</div>';
				}
				li = li + '<div class="khInfo">'
				+'<span>';
				if(aResult.BIRTHDAY == '1'){//生日提醒
					li = li +'<img class="markIco" src="../../themes/hbbank/images/mark_01.png" />';
				}
				if(aResult.VIP=='1'){//要客提醒
					li = li +'<img class="markIco" src="../../themes/hbbank/images/mark_04.png" />';
				}
				if(aResult.FIXED=='1'){//客户到期类提醒
					li = li +'<img class="markIco" src="../../themes/hbbank/images/mark_02.png" />';
				}
				if(aResult.MARKE=='1'){	//营销活动提醒--旗子
					li = li +'<img class="markIco" src="../../themes/hbbank/images/mark_03.png" />';
				}
				
				
				li = li + '</span>'
				+'<span class="dlDark">等待：<b>'+aResult.WAITMINUTES+'</b>min</span>'
				+'<span class="dlDark">排队号：<b>'+aResult.QUEUENUM1+'</b></span>'
				+'<span>办理业务：'+aResult.BUSINESSTYPE_ORA+'</span>'
				+'</div>'
				+'</div>'
				+'<div class="khdlDj">'+aResult.VAS_LEVEL_ORA
				+'<div class="dldjIco1"></div>'
				+'<div class="dldjIco2"></div>'
				+'</div>'
				+'</div>'
				
				+'</div>'
				+'</div>';
			}
		   $("#btmLeft2").append($(li));
		   
		   
		   
		   $(".hidden").hide();
		   start = start + limit;
		   
		   $("#search1").bind("click",function() {
			   layer.confirm('<input style="width:190px;  font-size:20px; "  id="quene_num" type="text" />',
						{
						title:'请输入排队号:'		    
						},
						function(index){
							var str = $("#quene_num").val();
							if(str == ''){
								mesUtil.alert('请输入排队号');
							}else{
								var url1 = basePath+'tingTangGaiLanAction!getQuene.json?queneNum='+str;
								$("#btmLeft2").text('');
								loadData(url1);
								layer.close(index);
								//回显查询条件
//								$("#queneNum1").val(str);
							}
							
						});
		   });
		   
		   
		   $("#refresh1").attr("disabled",false);
		   
		   $("#refresh1").bind("click",function() { 
			   
			   var url2 = basePath+'tingTangGaiLanAction!getQuene.json';
			   $("#btmLeft2").text('');
			   loadData(url2);

			   time(document.getElementById("refresh1"),document.getElementById("search1"));
			   
		   });
		   
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});
}

//刷新按钮30秒允许点一次
var secnum = 10;
var wait = secnum;
var timeout;
function time(o,p) {
    if (wait == 0) {
    	clearTimeout(timeout);
        o.removeAttribute("disabled");
        p.removeAttribute("disabled");     
        o.value="刷新";
        wait = secnum;
    } else {
        o.setAttribute("disabled", true);
        p.setAttribute("disabled", true);
        o.value="刷新(" + wait + ")";
        wait--;
        timeout = setTimeout(function() {
            time(o,p);
        }, 1000);
    }
}


//队列分布
function drawChart1(){
	var data1;
	$.ajax({
		url : basePath + 'tingTangGaiLanAction!getQueueGroup.json',
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
	
	
	$.jqplot('chart1', [data1], {
		grid: {
            drawBorder: false, 
            background: '#F1F1E8', //设置整个图标区域的背景色
            drawGridlines: false,
            shadow:false
        },
        seriesColors:["#3BAB57","#6C76CD","#F0C052","#EE6EC3","#DD3131","#9A3EAD"],
		seriesDefaults: {
			renderer: jQuery.jqplot.PieRenderer, 
			rendererOptions: { 
				diameter: 135, //设置饼的直径
				showDataLabels: true,
				shadow:false
			} 
		}, 
		legend: {
			location: 'e', //分类名称框出现位置, nw, n, ne, e, se, s, sw, w.
			show:true,
			xoffset:80
		}
    }); 
}

//业务分布
function drawChart2(){
	var data2;
	$.ajax({
		url : basePath + 'tingTangGaiLanAction!getBusinessType.json',
		type : "GET",
		async : false,
		cache: false, 
		dataType : "json",
		success : function(response){
			data2 = response.data;
		},
		error:function(a,b,c){
			//alert('信息提醒数据加载失败...','提示');
		}
	});
	
	
	$.jqplot('chart2', [data2], {
		grid: {
            drawBorder: false, 
            background: '#F1F1E8', //设置整个图标区域的背景色
            drawGridlines: false,
            shadow:false
        },
        seriesColors:["#3BAB57","#6C76CD","#F0C052","#EE6EC3","#DD3131","#9A3EAD"],
		seriesDefaults: {
			renderer: jQuery.jqplot.PieRenderer, 
			rendererOptions: { 
	        	diameter: 135, //设置饼的直径
				showDataLabels: true,
				shadow:false
			} 
		}, 
		legend: {
			location: 'e', //分类名称框出现位置, nw, n, ne, e, se, s, sw, w.
			show:true,
			xoffset:80
		}
    }); 
}


//等待时间
function drawChart3(){
	var data3;
	$.ajax({
		url : basePath + 'tingTangGaiLanAction!getWaitTime.json',
		type : "GET",
		async : false,
		cache: false, 
		dataType : "json",
		success : function(response){
			data3 = response.data;
		},
		error:function(a,b,c){
			//alert('信息提醒数据加载失败...','提示');
		}
	});
	
	$.jqplot('chart3', [data3], {
		grid: {
            drawBorder: false, 
            drawGridlines: false,
            background: '#F1F1E8', //设置整个图标区域的背景色
            shadow:false
        },
        seriesColors:["#3BAB57","#6C76CD","#F0C052","#EE6EC3","#DD3131","#9A3EAD"],
		seriesDefaults: {
			renderer: jQuery.jqplot.PieRenderer, 
			rendererOptions: { 
        	diameter: 135, //设置饼的直径
			showDataLabels: true,
			shadow:false
			} 
		}, 
		legend: {
			location: 'e', //分类名称框出现位置, nw, n, ne, e, se, s, sw, w.
			show:true,
			xoffset:90
		}
    }); 
}


function goToCustDetailPage(cust_id,core_id,queuenum) {
	//除了大堂经理全按理财经理算
	if(roleCode == 'zhdtkhjl'){
		goPage(encodeURI('keHuXinXiDaTang.html?id='+cust_id+'&zhuanJieRenID='+zhuanJieRenID+'&zhuanJieRenName='+zhuanJieRenName+'&queuenum='+queuenum));
	}else{
		goPage('keHuXinXi.html?id='+cust_id+'&coreId='+core_id+'&queuenum='+queuenum);
	}
}