cordova.define("org.apache.cordova.datepicker.datePickerPlugin", function(require, exports, module) { 
  var datePickerPlugin =  {
    config:{
	   inputId:'',
	   dateType:'',
	   iframeId:''
	},
    successCallback :function(echoValue) {
            var iframeId = datePickerPlugin.config.iframeId;
            var year = echoValue.year;
            var month = echoValue.month;
            var day = echoValue.day;
			var dateStr = '';
			
			if('datetime' == datePickerPlugin.config.dateType){
			  var hour = echoValue.hour;
			  var minute = echoValue.minute; 
			  dateStr = year+"-"+month+"-"+day+" "+hour+":"+minute;
			}else{
			  dateStr = year+"-"+month+"-"+day;
			}
			var iframeId = datePickerPlugin.config.iframeId;
		    var obj;
		    if(undefined == iframeId || null == iframeId || iframeId == ""){
			  obj = document.getElementById(datePickerPlugin.config.inputId);
		    }else{
			  obj = document.getElementById(iframeId).contentWindow.document.getElementById(datePickerPlugin.config.inputId);
		    } 
			
            obj.value = dateStr;

        },
	errorCallback : function(message) { alert("提示 " + message); }	,
    createEvent: function(inputId,dateType,iframeId) {
       datePickerPlugin.config.inputId = inputId;
       datePickerPlugin.config.dateType = dateType;
	   datePickerPlugin.config.iframeId = iframeId;
               
       var confContent = datePickerPlugin.platformExec();
       cordova.exec(
            datePickerPlugin.successCallback, // success 回调s
            datePickerPlugin.errorCallback, // error 回调
            'DatePickerPlugin', // 插件 java类名
            dateType, // 组件类型 date、datetime两种类型
            [confContent]
       );

    },
   clearDateVal:function()
   {
       var iframeId = datePickerPlugin.config.iframeId;
       var obj;
       if(undefined == iframeId || null == iframeId || iframeId == ""){
       obj = document.getElementById(datePickerPlugin.config.inputId);
       }else{
       obj = document.getElementById(iframeId).contentWindow.document.getElementById(datePickerPlugin.config.inputId);
       }
       
       obj.value = "";
   },
   platformExec:function()//构造参数
   {
       var padDate = function(date) {
           if (date.length == 1) {
           return ("0" + date);
           }
           return date;
       };
       
       var formatDate = function(date){
           date = date.getFullYear()
           + "-"
           + padDate(date.getMonth()+1)
           + "-"
           + padDate(date.getDate())
           + " "
           //+ "T"
           + padDate(date.getHours())
           + ":"
           + padDate(date.getMinutes()) 
           //+ ":00Z";
           
           return date
       }
	    var getAbsPointX = function()
	   {
		   var iframeId = datePickerPlugin.config.iframeId;
		   var obj;
		   if(undefined == iframeId || null == iframeId || iframeId == ""){
			  obj = document.getElementById(datePickerPlugin.config.inputId);
		   }else{
			  obj = document.getElementById(iframeId).contentWindow.document.getElementById(datePickerPlugin.config.inputId);
		   } 
		   oRect   =   obj.getBoundingClientRect();
		   var x=oRect.left;
		   return x;
	   }
	   var getAbsPointY = function()
	   {
		   var iframeId = datePickerPlugin.config.iframeId;
		   var obj;
		   if(undefined == iframeId || null == iframeId || iframeId == ""){
			  obj = document.getElementById(datePickerPlugin.config.inputId);
		   }else{
			  obj = document.getElementById(iframeId).contentWindow.document.getElementById(datePickerPlugin.config.inputId);
		   } 
		   
		   oRect   =   obj.getBoundingClientRect();
		   var y=oRect.top;
           if(undefined != iframeId && null != iframeId && iframeId != ""){
              y = y + 72;
           }
		   return y;
	   }

       var defaults = {
           mode: datePickerPlugin.config.dateType,
           date: formatDate(new Date()),
           allowOldDates: true,
           allowFutureDates: true,
           minDate: '',
           maxDate: '',
           doneButtonLabel: '确定',
           doneButtonColor: '#0000FF',
           cancelButtonLabel: '取消',
           cancelButtonColor: '#000000',
           clearButtonLabel: '清除',
           x: getAbsPointX(),
           y: getAbsPointY()
       };
	   return defaults;
   }

}
               
module.exports = datePickerPlugin;


});
