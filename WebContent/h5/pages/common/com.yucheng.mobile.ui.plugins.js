/**
 * Name:    com.yucheng.mobile.ui.plugins.js
 * Author:  wy
 * Date  :  2014-11-12
 * Version: 1.0.0
 * Remark:临时使用，待解决Jquery冲突后，封装成插件形式
 **/
function setFilter(t){
	var $_fp=$('.filterPanel');
	setFullMask($_fp);
	if(t){
		var _t=$(t).offset().top;
		var _l=$(t).offset().left;
		$_fp.css({'top':(_t+50)+'px','left':(_l-$_fp.width()+$(t).width())+'px'});
		$(window).resize(function() {
			var _t=$(t).offset().top;
			var _l=$(t).offset().left;
			$_fp.css({'top':(_t+50)+'px','left':(_l-$_fp.width()+$(t).width()+20)+'px'});
		});
		if($_fp.is(':hidden')){
			$_fp.show();
		}
		else{
			$_fp.hide();
			$("#fullMask").hide();
		}
	}
	else{
		$_fp.hide();
		$("#fullMask").hide();
	}
};

function setFullMask($t){
	$("#fullMask").size()>0?$("#fullMask").show():$("body").append("<div id='fullMask'></div>");
	if($t){
		$("#fullMask").click(function(){
			$("#fullMask").hide().remove();
			$t.hide();
		});
	}
};


function showPopWin(id){
	var $t=$("#"+id);
	setFullMask($t);
	$t.css("top",($(window).height()-$t.height())/2+"px").show();
	$(window).resize(function() {
		if(!$t.is(":hidden")){
			$t.css("top",($(window).height()-$t.height())/2+"px");
		}
	});
	$t.find(".formContent:eq(0)").height($t.height()-$t.find(".toolsBar:eq(0)").height()-40);
};

function closePopWin(id,flag){
	$("#fullMask").hide();
	$("#"+id).hide();
	if(flag==true){
		$("#"+id).remove();
	}
};


/*进度条组件
 * options：
 * msg:显示的消息，例如：正在同步
 * percent:初始或加载实时百分比，如：0.55，最大1.00；当percent为1.0时，Progress面板会在0.5秒后自动关闭
 * isLoad: boolean，是否为loading状态，默认为：false，实时控制进度条时须设置为true
 */
function ycProgress(options){
	var defaults = {
            msg:'请稍后',
            percent:1,
            isLoad:false
        }
    var options = $.extend(defaults, options);
	var load=function(){
		if(!options.isLoad){
			var _s='<div class="prsBox"><div class="prsBarBox"><div class="prsBar" style="width:'+options.percent*100+'%;"></div></div><div class="prsMsg">'+ options.msg +'… '+ options.percent*100 +'%</div></div>';
			$("body").append(_s);
		}
		else{		
			$(".prsBox .prsBar").width(options.percent*100+'%');
			$(".prsBox .prsMsg").text(options.msg +'… '+ options.percent*100+'%');
			if(parseInt(options.percent,10)==1){
				setTimeout(close,500);
			}
		}
	};	
	var close=function(){
		$(".prsBox").hide().remove();
		$("#fullMask").hide().remove();
	};
	setFullMask();
	load();

};




//popWin插件 未完成
(function ($) {
    $.fn.popWin = function(options){
        var defaults = {
            width:450,
            height:500,
            title:'Window',
            style:''
        }
        var options = $.extend(defaults, options);
        var close=function(s){
        	
        };
        
        var showMask=function(t){
        };
        
        return this.each(function(){
            $(this).append('<div class="testDiv" styel="width:50px;height:50px;">1111</div>');
            $(this).find(".testDiv").click(function(){
            	show($(this).text());
            });
        });
        
    };
})(jQuery);