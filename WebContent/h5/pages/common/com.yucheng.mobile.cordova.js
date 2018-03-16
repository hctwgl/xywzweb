 /** 
  * @author  CHANGZH@YUCHENGTECH.COM
  * @date    20141101
  * @version 
  **/
var crmApp = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        crmApp.receivedEvent('deviceready');
    },
    device : false,
    navigator : false,
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        crmApp.device = device;
        crmApp.navigator = navigator;
        crmApp.crmDB = crmApp.getDB();
        //alert(id+"receivedEvent : "+device.platfrom);
    },
    /**
    * 获取数据库连接
    * dbName 数据库名（*.db）：可以不传（默认）
    */
    crmDB : false,
    getDB : function (){
    	var dbName = "crm.db";
    	return sqlitePlugin.openDatabase({name:dbName});
    }
	
};

crmApp.initialize();



