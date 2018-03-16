var d = new Date();     // 当前日期 
var globalEvts = [];	// 当页events的全局变量；
var globalEvtChilds = [];	// 当页events的全局变量；
var basePath = "";

function loadData(searchUrl) {
	$.ajax({
		type : "GET",
		url : searchUrl,
		cache: false, 
		dataType: 'json',
		async: false, 
		success : function(response){
			var aResults = response.json.data;
			var el = document.getElementById('eventsPerDay');
			var li = '';
			if (aResults.length > 0) {
				for (var i = 0; i < aResults.length; i++) {
					$.ajax({
						type : "GET",
						url : basePath+'scheduleMngChildAction.json?ssid='+aResults[i].SCHEDULE_ID,
						cache: false, 
						dataType: 'json',
						async: false, 
						success : function(response){
							var aResults1 = response.json.data;
							var relationCustName = '';
							if (aResults[i].RELATION_CUST_NAME != '' && aResults[i].RELATION_CUST_NAME != null) {
								relationCustName = '('+aResults[i].RELATION_CUST_NAME+')';
							}
							li = '<li>'+aResults[i].SCHEDULE_TITLE+relationCustName+'<br/>';
							if ((aResults[i].START_DATE != '' && aResults[i].START_DATE != null)
									&& (aResults[i].END_DATE != '' && aResults[i].END_DATE != null)) {
								li += '<span class="schDate">'+aResults[i].START_DATE+' - '+aResults[i].END_DATE+'</span>'
								;
							} else {
								li += '<span class="schDate"></span>'
								;
							}
							if (aResults1.length > 0) {
								li += '<div class="childCad">'
									;
								for (var j = 0; j < aResults1.length; j++) {
									li += '<div>'+aResults1[j].SCHEDULE_CONTENT
									+'<br/><span>'+aResults1[j].CREATE_DATE+'</span></div>'
									;
								}
								li += '</div>';
							} else {
								li += '<div class="childCad"><div><br/><span></span></div>'
									+ '</div>'
									;
							}
							li += '</li>';
							$("#eventsPerDay").append($(li));
						},
						error:function(){
							//loadStop();
							//alert('数据初始化失败!!!!');
						}
					});
					
				}
			} else {
				li = '<li>'
				+'<br/><span class="schDate"></span>'
				+'</li>'
				;
				$("#eventsPerDay").append($(li));
			}
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});
}
	
	/**
	 * 功能：展示右侧的事件列表；
	 * date -- JavaScript Date Object，日期。
	 */
function renderDayEvents(date) {
	// 这里画右侧的那个列表； 
	$("#eventsPerDay").html('');
	var eventsPerDayTitle = '' 
		+ '<li class="nowDay">'
		+ date.toString("yyyy-MM-dd") + ' 日程安排</p>'
//		+ ' <div class="scheduleTools"><a id="addSchedule" class="icoBt icon-plus" href="javascript:addSchedule()"></a><div>'//<a id="editSchedule" class="icoBt icon-pencil" href="javascript:void(0);"></a>
		+ '</li>'
		;
	$("#eventsPerDay").append(eventsPerDayTitle); 
	var url = basePath+'scheduleManageAction.json?date='+date.toString("yyyy-MM-dd");
	loadData(url);
	var count = 0;
	var _max = 6;
	if( globalEvts && globalEvts.length>0 ) {
		for (var _i in globalEvts) {
			var str = globalEvts[_i].Date;
			//var d = new Date(Date.parse(str.replace(/-/g, "/")));
			var d = str2date(str);
			if ( d.getTime() == date.getTime() ) {
				count ++ ;
//				var timestr = '<li style="display:block;" onclick="javascript:showEditEventPage(\'' + _i + '\')">'
				var timestr = '<li style="display:block;">'
				+ globalEvts[_i].Title+'<br/><span class="schDate">'
				+ globalEvts[_i].StartDateTime.toString("yyyy-MM-dd HH:mm");
				if (globalEvts[_i].EndDateTime) {
					timestr += '-' + globalEvts[_i].EndDateTime.toString("yyyy-MM-dd HH:mm");
				}
				timestr += '</span></li>';
//				$("#eventsPerDay").append( timestr );
			}
		}
	}
//	if( globalEvts && globalEvts.length>0 ) {
//		for (var _i in globalEvts) {
//			var str = globalEvts[_i].Date;
//			//var d = new Date(Date.parse(str.replace(/-/g, "/")));
//			var d = str2date(str);
//			if ( d.getTime() == date.getTime() ) {debugger;
//				$.ajax({
//					type : "GET",
//					url : basePath+'scheduleMngChildAction.json?ssid='+globalEvts[_i].EventID+'',
//					cache: false, 
//					contentType: "application/json", 
//					success : function(response) {
//						var eventChild = response.json.data;
//						for (var k = 0; k < eventChild.lenth; k++) {
//							var _temEvtChild = {};
//							_temEvtChild["scheduleTitle"] = eventChild[k].SCHEDULE_TITLE;//日程名称
//							_temEvtChild["sdTypeOra"] = eventChild[k].SD_TYPE_ORA;//日程类型
//							_temEvtChild["relationCustName"] = eventChild[k].RELATION_CUST_NAME;//关联客户
//							_temEvtChild["contactChannelOra"] = eventChild[k].CONTACT_CHANNEL_ORA;//接触渠道
//							_temEvtChild["scheduleContent"] = eventChild[k].SCHEDULE_CONTENT;//内容
//							_temEvtChild["createDate"] = eventChild[k].CREATE_DATE;//创建时间
//							
//							globalEvtChilds[globalEvtChilds.length+k] = globalEvtChilds;
//						}
//						
//					},
//					error:function() {
//						//parent.mesUtil.alert('日程管理信息初始化失败!\r\n请重试。');
//					}
//				});
//				for (var _k = 0; _k < globalEvtChilds.length; _k++) {debugger;
//					count ++ ;
////				var timestr = '<li style="display:block;" onclick="javascript:showEditEventPage(\'' + _i + '\')">'
//					var timestr = '<li style="display:block;">'
//					+ globalEvts[_i].Title+'<br/><span class="schDate">'
//					+ globalEvts[_i].StartDateTime.toString("yyyy-MM-dd HH:mm");
//					if (globalEvts[_i].EndDateTime) {
//						timestr += '-' + globalEvts[_i].EndDateTime.toString("yyyy-MM-dd HH:mm");
//					}
//					timestr += '</span></li>';
//					$("#eventsPerDay").append( timestr );							
//				}
//			}
//		}
//	} 
	if (count <= 0 || count < _max) {
		// 补齐空行。
		for (var _i=0; _i<(_max-count); _i++) {
			$("#eventsPerDay").append('<li style="display:none;"></li>');
		}
	}
	//$("#eventsPerDay_list").listview("refresh");
}
function showEditEventPage(_idx) {
	$("#showScheTitleDivId").text("修改日程");
	showPopWin("showdiv");
	$("#delBut").css('display','block');//显示删除
	var ev = globalEvts[_idx];
	var scheduleId =ev.EventID.split("_EX")[0];
	$("#scheduleId").val(scheduleId);
	/**/
	$("#evDate").val(ev.Date);
	$("#scheduleTitle").val(ev.Title);
	var sdtime = ev.StartDateTime.toString("yyyy-MM-dd HH:mm:ss");
	var sdtime1 = sdtime.substring(0,16);
	$("#evStart").val(sdtime1);//sdtime.split(" ")[0]
	//$("#evStartTime").val(sdtime.split(" ")[1]);
	$("#startDate").val(sdtime);
	var edtime = ev.EndDateTime.toString("yyyy-MM-dd HH:mm:ss");
	var edtime1 = edtime.substring(0,16);
	$("#evEnd").val(edtime1);//edtime.split(" ")[0]
	//$("#evEndTime").val(edtime.split(" ")[1]);
	$("#endDate").val(edtime);
	$("#scheduleContent").val(ev.Description);
	$("#remindBelong").val(ev.eventType);
	
}
function openDayEvents(date) {
	renderDayEvents(date);
}
function str2date(str) {
	// 要求str格式：yyyy-MM-dd
	return new Date(Date.parse(str.replace(/-/g, "/")));
}
	
function addSchedule(){
	//修改标题
	$("#showScheTitleDivId").text("新增日程");
	showPopWin("showdiv");
	//把所有项制空
	$("#delBut").css('display','none');
	$("#scheduleId").val("");
	$("#evDate").val("");
	$("#scheduleTitle").val("");
	$("#evStart").val("");
	//$("#evStartTime").val("");
	$("#startDate").val("");
	$("#evEnd").val("");
	//$("#evEndTime").val("");
	$("#endDate").val("");
	$("#scheduleContent").val("");
	$("#remindBelong").val("");
}
function save(){
	//调用保存
	if(valid()){
		var user = parent.mobileApp.getUserInfo();
		//set值
		$("#creator").val(user.userId);
		$("#createOrg").val(user.unitId);
		var startDate = $("#evStart").val();
		if(startDate.split(":").length == 2)
			startDate = startDate+":00";
		//parent.mesUtil.alert("startDate>>>"+startDate);
		/*
		var sdTime = $("#evStartTime").val();
		if(sdTime.split(":").length == 2)
			sdTime = sdTime+":00";
		else if(sdTime.split(":").length == 4)
			sdTime = sdTime.substring(0,8);
		*/
		var endDate = $("#evEnd").val();
		if(endDate.split(":").length == 2)
			endDate = endDate+":00";
		//parent.mesUtil.alert("endDate>>>"+endDate);
		/*
		var edTime = $("#evEndTime").val();
		if(edTime.split(":").length == 2)
			edTime = edTime+":00";
		else if(edTime.split(":").length == 4)
			edTime = edTime.substring(0,8);
		
		//新增时，如果未选择开始和结束的时分秒，默认为00:00:00
		if(sdTime==""){
			sdTime='00:00:00';
		}
		if(edTime==""){
			edTime='00:00:00';
		}
		*/
		$("#startDate").val(startDate);//+" "+sdTime
		$("#endDate").val(endDate);//+" "+edTime
		savaOrUpdateSchedule();
	}
}

function closeDiv(id){
	$("#"+id).css("display","none");
}

function valid(){
	var evTitle = $("#scheduleTitle").val();
	if(evTitle == ""){
		parent.mesUtil.alert("日程标题不能为空！");
		return false;
	}else{ 
	/**/
		if(parent.mobileUtils.checkSpecChar(evTitle)){
			parent.mesUtil.alert("日程标题不能输入特殊字符！");
			return  false;
		}
	
	}
	var evType = $("#remindBelong").val();
	if(evType == ""){
		parent.mesUtil.alert("日程类型不能为空！");
		return false;
	}
	var evStart = $("#evStart").val();
	if(evStart == ""){
		parent.mesUtil.alert("开始时间不能为空！");
		return false;
	}
	var evEnd = $("#evEnd").val();
	if(evEnd == ""){
		parent.mesUtil.alert("结束时间不能为空！");
		return false;
	}
	if(evStart>evEnd){
		parent.mesUtil.alert("结束日期不能小于开始日期！");
		return false;
	}
	var evStartTime = $("#evStartTime").val();
	var evEndTime = $("#evEndTime").val();
	if(evStartTime>evEndTime){
		parent.mesUtil.alert("结束时间不能小于开始时间！");
		return false;
	}
	var evContent = $("#remindBelong").val();
	if(evContent == ""){
		parent.mesUtil.alert("日程类型不能为空！");
		return false;
	}
	var scheduleContent = $("#scheduleContent").val();
	if(scheduleContent != ""){
	/**/
		if(parent.mobileUtils.checkSpecChar(scheduleContent)){
			parent.mesUtil.alert("日程内容不能输入特殊字符！");
			return  false;
		}
	
	}
	return true;
}

function savaOrUpdateSchedule(){
	var condition = $("#scheduleForm").serialize();//获取form表单的值
	parent.mobileUtils.showLoading('正在保存...');
	$.ajax({
		type : "POST",
		url : basePath+'scheduleManageAction!saveData.json?'+condition,
		cache: false, 
		dataType : "json",
		success : function(response) {
			parent.mobileUtils.hideLoading();
			closePopWin('showdiv');
			//保存成功后，重刷数据
			renderEvents();
		},
		error:function(response) {
			parent.mobileUtils.hideLoading();
			parent.mesUtil.alert('日程安排数据新增失败!\r\n请重试。');
		}
	});
}
	
function renderEvents(){
	//alert($("#CalendarBody>tr:eq(0)").find("td:eq(0)").attr('date'));
	var a = $("#CalendarBody").find("tr:first").find("td:first").attr('date');
	var b = $("#CalendarBody").find("tr:last").find("td:last").attr('date');
	var start = (""+a).split("/")[2] + '-' + ((""+a).split("/")[0]) + '-' + (""+a).split("/")[1];
	var end = (""+b).split("/")[2] + '-' + ((""+b).split("/")[0]) + '-' + (""+b).split("/")[1];
	$.ajax({
		type : "GET",
		url : basePath+'scheduleManageAction.json?startDate='+start+'&endDate='+end+'',
		cache: false, 
		dataType: 'json',
		async: false, 
		success : function(response){
			showCurrPageEvents(response.json.data);
			var day = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
			openDayEvents(day); //加载今天的日程安排信息
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});
}
function showCurrPageEvents(eventData) {
	globalEvts = []; // 在这里进行重置。
	for(var i=0; i<eventData.length; i++) {
		var sdate = eventData[i].START_DATE.toString("yyyy-MM-dd HH:mm:ss");
		var edate = eventData[i].END_DATE.toString("yyyy-MM-dd HH:mm:ss");
		var diffDays = DateDiff(edate.split(" ")[0],sdate.split(" ")[0]);
		if(1*diffDays > 0){
			for(var j = 0; j < 1*diffDays+1; j++){
				var _tmpEvt = {};
				_tmpEvt["Title"] = eventData[i].SCHEDULE_TITLE;
				_tmpEvt["StartDateTime"] = startFullDay(eventData[i].START_DATE);
				_tmpEvt["EndDateTime"] = endFullDay(eventData[i].END_DATE);
				_tmpEvt["eventType"] = eventData[i].REMIND_BELONG;
				_tmpEvt["Description"] = eventData[i].SCHEDULE_CONTENT;
				_tmpEvt["URL"] = "#";
				var EventID_ = "";
				var Date_ = "";
				if(j == 0){
					EventID_ = eventData[i].SCHEDULE_ID;
					Date_ = eventData[i].START_DATE.split(" ")[0];
				}else{
//					EventID_ = eventData[i].SCHEDULE_ID + "_EX" +j;//为构造ID
					EventID_ = null;//为构造ID
					//日期+j
					Date_ = addDate(eventData[i].START_DATE.split(" ")[0],j);;
				}
				_tmpEvt["EventID"] = EventID_;
				_tmpEvt["Date"] = Date_;
				globalEvts[globalEvts.length+j] = _tmpEvt;
			}
		}else{
			var _tmpEvt = { 
				"EventID": eventData[i].SCHEDULE_ID, 
				"Title":  eventData[i].SCHEDULE_TITLE, 
				"Date": eventData[i].START_DATE.split(" ")[0], 
				"StartDateTime" : startFullDay(eventData[i].START_DATE,eventData[i].IS_PROCESS),  // new Date(Date.parse(eventData[i].STAR_DT.replace(/-/g,   "/"))),
				"EndDateTime"   : endFullDay(eventData[i].END_DATE ,eventData[i].IS_PROCESS),  // new Date(Date.parse(eventData[i].END_DT.replace(/-/g,   "/"))),
				"eventType": eventData[i].REMIND_BELONG ,
				//"customerName": eventData[i].RELATION_CUST_NAME,
				"Description": eventData[i].SCHEDULE_CONTENT,
				"URL": "#"
			};
			globalEvts[i] = _tmpEvt;
		}
	}
//	$.jMonthCalendar.ShowEvents(globalEvts);
	$.jMonthCalendar.ShowEvents(globalEvtChilds);
}

function DateDiff(sDate1, sDate2){   
    var aDate, oDate1, oDate2, iDays;  
    aDate = sDate1.split("-");  
    oDate1 = new Date(aDate[0],aDate[1],aDate[2],"00","00","00");    //转换为12-18-2006格式  
    aDate =  sDate2.split("-");  
    oDate2 = new Date(aDate[0],aDate[1],aDate[2],"00","00","00");  
    iDays = parseInt(Math.abs(oDate1 - oDate2) /1000/60/60/24);    //把相差的毫秒数转换为天数  
    return iDays;  
}   
function addDate(date,days){ 
    var d=new Date(date); 
    d.setDate(d.getDate()+days); 
    var m=d.getMonth()+1; 
    var mh = m;
    if(1*m < 10)
    	mh = "0"+mh;
    var de = d.getDate();
    if(1*de < 10)
    	de = "0"+de;
    return d.getFullYear()+'-'+mh+'-'+de; 
} 
function startFullDay(str){
	return new Date(Date.parse(str.replace(/-/g, "/")));

}
function endFullDay(str){
	return new Date(Date.parse(str.replace(/-/g, "/")));
}

function renderCalendar() {
	var options = {
			height : '100%',//var getPageHeight(), // 450
			width : '70%', // 910
			navHeight : 45,
			labelHeight : 45,
			calendarStartDate : d, //指定到传入的字符串日期位置
			//startDate : "2014-10-26",
			//endDate : "2014-12-06", 
			onMonthChanging : function(dateIn) {
				jQuery.J.DrawCalendar(dateIn);
				renderEvents();
				return true;
			},
			onEventLinkClick : function(event) {
				var _date = str2date(event.Date);
				openDayEvents(_date);
				return false;
			},
			onEventBlockClick : function(event) {
				var _date = str2date(event.Date);
				openDayEvents(_date);
				return false;
			},
			onEventBlockOver : function(event) {
				$("#Event_"+event.EventID).addClass("highlightevent");
				return true;
			},
			onEventBlockOut : function(event) {
				$("#Event_"+event.EventID).removeClass("highlightevent");
				return true;
			},
			onDayLinkClick : function(date) {
				openDayEvents(date);
				return true;
			},
			onDayCellClick : function(date) {
				openDayEvents(date);
				return true;
			}
		};
	
	var _evts = []; 
	/*****************************************
	 ** 注意：这里是 先展示控件，后填充数据。 
	 ****************************************/
	$.jMonthCalendar.Initialize(options, _evts);
}
//function del_sch(){
//	var scheduleId = $("#scheduleId").val();
//	parent.mobileUtils.showLoading('正在删除...');
//	var condition = $("#scheduleForm").serialize();//获取form表单的值
//	$.ajax({
//		type : "POST",
//		url : basePath+'scheduleManageAction!destroy.json?scheduleId='+scheduleId,
//		//data : {"scheduleId":scheduleId},
//		cache: false, 
//		dataType : "json",
//		success : function(response) {
//			parent.mobileUtils.hideLoading();
//			closePopWin('showdiv');
//			//保存成功后，重刷数据
//			renderEvents();
//		},
//		error:function(response) {
//			parent.mobileUtils.hideLoading();
//			parent.mesUtil.alert('日程安排数据删除失败!\r\n请重试。');
//		}
//	});
//}

//function addToCal(inputId,dateType){
//	parent.dateUtils.datePicker(inputId,dateType,"scheduleIframe");
//}
$(function() {
	
	basePath = parent.basePath;
	globalEvts = [];
	//调用日历控件
	renderCalendar();
	//事件
	renderEvents();
});

