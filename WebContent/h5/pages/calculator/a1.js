var vjAcc="";var wrUrl="http://c.wrating.com/";var wrSv=0;function vjTrack(c){var b=vjValidateTrack();if(b===false){return}var a=wrUrl+"a.gif"+vjGetTrackImgUrl(c);document.write('<div style="display:none"><img src="'+a+'" id="wrTagImage" width="1" height="1"/></div>');vjSurveyCheck()}function vjEventTrack(d){var c=vjValidateTrack();if(c===false){return}var b=wrUrl+"a.gif"+vjGetTrackImgUrl(d);var a=new Image();a.src=b;a.onload=function(){}}function vjValidateTrack(){if(document.location.protocol=="file:"){return false}if(vjAcc==""){return false}else{if(wrUrl.substr(wrUrl.length-1,1)!="/"){wrUrl+="/"}}return true}function vjGetTrackImgUrl(v){var o=0;var p="expires=Fri, 1 Jan 2038 00:00:00 GMT;";var w=document.location;var r=document.referrer.toString();var d;var j=vjGetDomainFromUrl(w);var m;var y;var B="";var n=vjFlash();var h="";var C="";var l="";var q=navigator.appName+" "+navigator.appVersion;var g=new Date();var A=g.getTimezoneOffset()/-60;var a=0;var x="";var u="";if(typeof(j[1])!="undefined"){y=j[1]}else{if(typeof(j[0])!="undefined"){y=j[0]}}if(r!=""){B=vjGetKeyword(r)}else{if((q.indexOf("MSIE")>=0)&&(parseInt(q.substr(q.indexOf("MSIE")+5))>=5)&&(q.indexOf("Mac")==-1)&&(navigator.userAgent.indexOf("Opera")==-1)){try{document.documentElement.addBehavior("#default#homePage");if(document.documentElement.isHomePage(location.href)){r="ishomepage"}}catch(z){}}}if(navigator.cookieEnabled){o=1}if(self.screen){h=screen.width+"x"+screen.height+"x"+screen.colorDepth}else{if(self.java){var t=java.awt.Toolkit.getDefaultToolkit().getScreenSize();h=t.width+"x"+t.height+"x0"}}if(navigator.language){C=navigator.language.toLowerCase()}else{if(navigator.browserLanguage){C=navigator.browserLanguage.toLowerCase()}else{C="-"}}if(navigator.javaEnabled()){a=1}if(o==1){d=document.cookie;if(d.indexOf("vjuids=")<0){m=vjVisitorID();document.cookie="vjuids="+escape(m)+";"+p+";domain="+y+";path=/;"}else{m=vjGetCookie("vjuids")}if(d.indexOf("vjlast=")<0){x="30";var f=vjGetTimestamp(g.getTime()).toString();u=f+"."+f+".30"}else{var D=vjGetCookie("vjlast");var c=D.split(".");var b="";if(typeof(c[0])!="undefined"){u=c[0].toString()}else{u=vjGetTimestamp(g.getTime()).toString()}if(typeof(c[1])!="undefined"){var k=new Date(parseInt(c[1])*1000);if(k.toDateString()!=g.toDateString()){u+="."+vjGetTimestamp(g.getTime()).toString();if(parseInt(vjGetTimestamp(g.getTime())-parseInt(c[1]))/86400>30){x="2"}else{x="1"}if(typeof(c[2])!="undefined"){x+=c[2].substr(0,1)}else{x+="0"}}else{u+="."+c[1].toString();if(typeof(c[2])!="undefined"){x+=c[2]}else{x="10"}}}else{u+="."+vjGetTimestamp(g.getTime()).toString();if(typeof(c[2])!="undefined"){x+=c[2]}else{x="10"}}u+="."+x}document.cookie="vjlast="+u+";"+p+";domain="+y+";path=/;"}l="?a="+g.getTime().toString(16)+"&t=&i="+escape(m);l+="&b="+escape(w)+"&c="+vjAcc;l+="&s="+h+"&l="+C;l+="&z="+A+"&j="+a+"&f="+escape(n);if(r!=""){l+="&r="+escape(r)+"&kw="+B}l+="&ut="+x+"&n=";if(typeof(v)=="undefined"){l+="&js="}else{l+="&js="+escape(v)}l+="&ck="+o;return l}function vjGetTimestamp(a){return Math.round(a/1000)}function vjGetKeyword(c){var a=[["baidu","wd"],["baidu","q1"],["google","q"],["google","as_q"],["yahoo","p"],["msn","q"],["live","q"],["sogou","query"],["youdao","q"],["soso","w"],["zhongsou","w"],["zhongsou","w1"]];var b=vjGetDomainFromUrl(c.toString().toLowerCase());var d=-1;var e="";if(typeof(b[0])=="undefined"){return""}for(i=0;i<a.length;i++){if(b[0].indexOf("."+a[i][0]+".")>=0){d=-1;d=c.indexOf("&"+a[i][1]+"=");if(d<0){d=c.indexOf("?"+a[i][1]+"=")}if(d>=0){e=c.substr(d+a[i][1].length+2,c.length);d=e.indexOf("&");if(d>=0){e=e.substr(0,d)}if(e==""){return""}else{return a[i][0]+"|"+e}}}}return""}function vjGetDomainFromUrl(e){if(e==""){return false}e=e.toString().toLowerCase();var f=[];var c=e.indexOf("//")+2;var b=e.substr(c,e.length);var a=b.indexOf("/");if(a>=0){f[0]=b.substr(0,a)}else{f[0]=b}var d=f[0].match(/[^.]+\.(com.cn|net.cn|gov.cn|cn|com|net|org|gov|cc|biz|info)+$/);if(d){if(typeof(d[0])!="undefined"){f[1]=d[0]}}return f}function vjVisitorID(){var a=vjHash(document.location+document.cookie+document.referrer).toString(16);var b=new Date();return a+"."+b.getTime().toString(16)+"."+Math.random().toString(16)}function vjHash(d){if(!d||d==""){return 0}var b=0;for(var a=d.length-1;a>=0;a--){var e=parseInt(d.charCodeAt(a));b=(b<<5)+b+e}return b}function vjGetCookie(d){var b=d+"=";var f=b.length;var a=document.cookie.length;var e=0;while(e<a){var c=e+f;if(document.cookie.substring(e,c)==b){return vjGetCookieVal(c)}e=document.cookie.indexOf(" ",e)+1;if(e==1){break}}return null}function vjGetCookieVal(b){var a=document.cookie.indexOf(";",b);if(a==-1){a=document.cookie.length}return unescape(document.cookie.substring(b,a))}function vjFlash(){var _flashVer="-";var _navigator=navigator;if(_navigator.plugins&&_navigator.plugins.length){for(var ii=0;ii<_navigator.plugins.length;ii++){if(_navigator.plugins[ii].name.indexOf("Shockwave Flash")!=-1){_flashVer=_navigator.plugins[ii].description.split("Shockwave Flash ")[1];break}}}else{if(window.ActiveXObject){for(var ii=10;ii>=2;ii--){try{var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');");if(fl){_flashVer=ii+".0";break}}catch(e){}}}}return _flashVer}function vjSurveyCheck(){if(wrSv<=0){return}var c=new Date();var a=c.getTime();var d=Math.random(a);if(d<=parseFloat(1/wrSv)){var b=document.createElement("script");b.type="text/javascript";b.id="wratingSuevey";b.src="http://tongji.wrating.com/survey/check.php?c="+vjAcc;document.getElementsByTagName("head")[0].appendChild(b)}};