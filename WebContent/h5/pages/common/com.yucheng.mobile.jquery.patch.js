/** 
  * com.yucheng.mobile.jquery.patch
  * @author  CHANGZH@YUCHENGTECH.COM
  * @date    20141101
  * @version 
  **/
(function( $, undefined ) {	
	var statusCode = '';
	$.ajaxSetup({ 
		beforeSend: function(){ 
			if(!devModel && parseInt(mobileApp.getUserInfo().isOffline) == 1) {
				mobileUtils.hideLoading();
				return false;
			} else {
				return true;
			}
		},
	    complete: function(XMLHttpRequest, textStatus) { 
	        try { 
	            //var json = $.parseJSON(XMLHttpRequest.responseText); 
	           
	        } catch(e) {}; 
	    }, 
	    statusCode: {
	    	200 : function() { 
	    		//alert('ajax success!');
	    	},
	        404 : function() { 
	    		alert('文件或资源未找到.'); 
	        }, 
	        504 : function() { 
	        	alert('数据获取/输入失败，服务器没有响应.'); 
	        }, 
	        500 : function() { 
	        	console.log('服务器错误.'); 
	        	//alert('服务器错误.'); 
	        },
	        600 : function() { 
	        	//alert('服务连接超时,请重新登录.');
	        	mobileUtils.goPage(filePath+'index.html');
	        	mobileApp.removeUserInfo();
	        } 
	    } 
	});

})( jQuery );