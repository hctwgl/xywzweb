
$(function(){
	/*屏幕比例值*/
	function sizeHtml(){
	    var size = $(window).width()/16;
	    size = size>40?40:size;
	    $("html").css("font-size",size+"px");
	}
	sizeHtml();
	$(window).resize(function(){
	    sizeHtml();
	})

	/*图片左右滑动*/
	function e() {
        a.find(".dialogImgs").css({
            width: a.find(".dialogImg").length * a.find(".dialogImg").width()
        })
    }
    var a = $(".dialogPics");
    e();
    window.onresize = e;
    var movecount=0;
    a.swipe({
        swipeStatus: function(f, c, b, d, e, g) { 
            f = parseInt(a.find(".dialogImgs").css("left"));
            d = a.find(".dialogImg");
            d.last().position();
            d.last().width();
            a.width();
            b = "left" == b ? -1 : 1;
            if("start"==c){
                movecount=0;
            }else if("move"==c){
                movecount++;
            };
            if("end" == c && movecount>0){
                if(-1 == b){
                	c = f + b * d.width(), 
                	b = -a.find(".dialogImgs").width() + a.innerWidth(),
                	a.find(".dialogImgs").animate({"left": Math.max(c, b)},100);
                }else if(1 == b){
                	c = f + b * d.width(),
                	a.find(".dialogImgs").animate({"left": Math.min(0, c)},100);
                }
            }else if("end" == c && movecount==0){
                $(".dialog").hide();
            }
        },
        threshold: 0,
        maxTimeThreshold: 5E3,
        fingers: "all"
    })
    $(".dialog a").click(function(){
		$(".dialog").hide();
	})
	$(".header .jhbb_return").click(function(){
		history.go(-1);
	})

})
/*事件*/
function allClick(len,maxhei,name){
	showTime(len,maxhei);
	$(".jhbb_all_show").click(function(){
		var _this=$(this);
		showAll(_this);
	})
	$(".jhbb_follow").click(function(){
		var _this=$(this);
		follow(_this);
	})
	$(".jhbb_repay").click(function(){
		var $this=$(this);
		repayBtn($this);
	})
	$(".jhbb_detail_input a").click(function(){
		form($(this),name);
	})
	$(".jhbb_pic_list span").click(function(){
		showPic($(this));
	})
	$('.jhbb_detail_input #jhbb_key_pic').diyUpload({
		success:function( data ) {
			console.info( data );
		},
		error:function( err ) {
			console.info( err );	
		}
	});
}
/*获取宽度*/
function gainWid(){
	var list=parseInt($(".topic-list").width());
	var dt=$(".topic-list dt").outerWidth(true);
	$(".topic-list dd").width(list-dt);
	var wid=$(".jhbb_like").outerWidth()-($(".jhbb_repay").outerWidth()+10+$(".jhbb_follow").outerWidth());
	$(".jhbb_like .jhbb_label_text").width(wid);
	var pdle=parseInt($(".jhbb_reply_list").css("paddingLeft"));
	$(".jhbb_reply_list .topic-list dd").width(list-dt-pdle-1);
}
/*是否登录*/
function isLogin(){
    return $.cookie("nickname") != undefined && $.cookie("email") != undefined ;
}
/*提示框*/
function Hide(txt){
	$(".dialogImg").hide();
	$(".dialog").show();
	$(".dialogTxt").show();
	$(".dialog .dialogTxt span").text(txt);
	setTimeout(function(){
		$(".dialog").hide();
	},2000)
}
/*显示缩略图*/
function showPic($this){
	$(".dialogImgs .dialogImg").remove();
	$(".dialog .dialogImgs").css("marginLeft",0)
	var ind=$this.index();
	$(".dialog").show();
	$(".dialogImg").show();
	$(".dialogTxt").hide();
	var $thisSpan=$this.parent().find("span");
	var len=$thisSpan.length;
	var arrs=[];
	var str="";
	var wids=$(".dialog .dialogPics").width();
	$(".dialog .dialogImgs").width(wids*len);
	for(var i=0;i<len;i++){
		var picurl=$($thisSpan[i]).css("background");
		var lnum=picurl.indexOf("url");
		var rnum=picurl.indexOf("no");
		str+='<div class="dialogImg"><span style="height:100%;display:inline-block;vertical-align: middle;"></span><img src="'+picurl.substring(lnum+4,rnum-2)+'"></div>';
	}
	$(str).appendTo($(".dialogImgs"));
	$(".dialog .dialogImg").width(wids);
	$(".dialog .dialogImgs").css("left",-(wids*ind));
}
/*时间显示*/
function showTime(len,maxhei){
	for(var i=0;i<len;i++){
		var thenTime=parseInt($(".content .topic-list").eq(i).find(".jhbb_name span").attr("data"));
		if($(".content .topic-list").eq(i).find(".jhbb_text").height()>=maxhei){
			$(".content .topic-list").eq(i).find($(".jhbb_all_show")).show();
		}
		var now = new Date();
		var nowTime = now.getTime();
		var diffTime=nowTime-thenTime;
		var dates=new Date(thenTime);
		var year=dates.getFullYear();
		var month=dates.getMonth()+1;
		var date=dates.getDate();
		var hours = parseInt(diffTime / (3600 * 1000));
		var minutes = parseInt(diffTime / (60 * 1000));
		var seconds = parseInt(diffTime / 1000);
		var day= Math.round(diffTime / 86400000);
		if(seconds<=1){
			$(".content .topic-list").eq(i).find(".jhbb_name span").html("刚刚");
		}else if(minutes<60){
			$(".content .topic-list").eq(i).find(".jhbb_name span").html(minutes+"分钟前");
		}else if(hours<24){
			$(".content .topic-list").eq(i).find(".jhbb_name span").html(hours+"小时前");
		}else if(day<30){
			$(".content .topic-list").eq(i).find(".jhbb_name span").html(day+"天前");
		}else if(day>=30){
			$(".content .topic-list").eq(i).find(".jhbb_name span").html(year+"年"+month+"月"+date+"日");
		}
	}
}
/*发布回复提交*/
function form(_this,names){
	var id=_this.attr("dataId");
	var text=_this.attr("dataTxt");
	var val=$(".jhbb_detail_input>input").val();
	var str=$(".jhbb_detail_input>input").attr("placeholder");
	var num=str.indexOf(":")+1;
	var name=str.substring(num);
	var len=$(".fileBoxUl li").length;
	if(val!=""||len>0){
		$.ajax({
			/*"url":url,
			"type":"POST",
			"data":JSON.stringify(data),
			"contentType":"application/json; charset=utf-8",
			"dataType":"json",*/
			success: function(){
				if(val==""){
					val="[图片]";
				}
				$(".jhbb_detail_input").hide();
				$(".jhbb_detail_pic").hide();
				var txt="<p><a href='javascript:;'>"+names+"</a>回复<a href='javascript:;'>"+name+"</a>"+val+"</p>";
				$(txt).appendTo(_this.parents("body").find(".topic-list[dataId="+id+"] .jhbb_reply"));
				$(".jhbb_detail_input>input").val("");
				$(".parentFileBox").remove();
				$(".jhbb_detail_input").css("bottom",0);

				if(text!="回复"){
					$(".jhbb_repay[dataId="+id+"]").text(parseInt(text)+1);
				}else{
					$(".topic-list .jhbb_repay[dataId="+id+"]").text(1);
				}
			}
		});
	}
}
/*回复按钮*/
function repayBtn($this){
	var $id=$this.attr("dataId");
	var $txt=$.trim($this.text());
	$(".jhbb_detail_input input").focus();
	$(".jhbb_detail_input").show();
	var txt=$this.attr("datarepay");
	$(".jhbb_detail_input input").attr("placeholder","回复: "+txt);
	$(".jhbb_detail_input a").attr("dataId",$id);
	$(".jhbb_detail_input a").attr("dataTxt",$txt);
}
/*喜欢*/
function follow(_this){
	var thid=_this.attr("dataId");
	var str="";
	if(_this.hasClass("active")){
		str="N";
	}else{
		str="Y";
	}
	$.ajax({
		//url:"",
		//data:"topicId="+thid+"state="+str,
		//type:"GET",
		success:function(){
			if(_this.hasClass("active")){
				_this.removeClass("active");
			}else{
				_this.addClass("active");
			}
		}
	})
}
/*展示全部*/
function showAll(_this){
	var txt=_this.text();
	if(txt=="全文"){
		_this.html("收起");
		_this.parent().find(".jhbb_text").css("maxHeight","none");
	}else{
		_this.html("全文");
		_this.parent().find(".jhbb_text").css("maxHeight",maxhei);
	}
}
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r!=null){ 
		return unescape(r[2]);
	}else{ 
		return null;
	} //返回参数值
} 