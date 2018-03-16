 /** 
  * 
  * @author  CHANGZH@YUCHENGTECH.COM
  * @date    20140522
  * @version 
  **/

	document.addEventListener('deviceready', onDeviceready, false);
	function onDeviceready() {
		var sql = "select ORG from PARAMETER  ";
		query(crmApp,sql,function(res){
			var data = res.rows;
			belong_org =data.item(0).ORG;	
			mobileApp.setBelongOrg(belong_org);
		
		});
	}
var appScreen = {
		
	time: turns_time,
    // Application Constructor
    initialize: function(url) {
        this.url = url + '?pageFlag=timer';
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDomReady, false);
    },
    onDomReady: function() {
    	appScreen.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
//        console.log('Received Event: ' + id);
        appScreen.setTimer();
    },
    timer: false,
    url: false,
    setTimer: function() {
    	if(appScreen.timer) {
    		clearTimeout(appScreen.timer);
    	}
    	appScreen.timer = setTimeout(appScreen.timeAction, appScreen.time);
    },
    timeAction: function() {
    	goPage(appScreen.url);
    }
	
};


appScreen.initialize(filePath+'pages/product/productShow.html');



window.addEventListener('load',function(){
 
//    document.addEventListener('touchstart',touch, false);
//    document.addEventListener('touchmove',touch, false);
    document.addEventListener('touchend',touch, false);
    function touch (event){
        var event = event || window.event;
        var oInp = document.getElementById("inp");
        switch(event.type){
//            case "touchstart":
//             	appScreen.time=5000;
//                break;
//            case "touchmove":
//             	appScreen.time=5000;
//                break;
        case "touchend":
        	appScreen.time=turns_time;
        	if(appScreen.timer) {
        		clearTimeout(appScreen.timer);
        	}
        	appScreen.timer = setTimeout(appScreen.timeAction, appScreen.time);
            break;
        }
         
    }
}, false);
