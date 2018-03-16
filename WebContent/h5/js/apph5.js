/*屏幕比例值*/
function sizeHtml(){
	var size = window.innerWidth/16;
	size = size>40?40:size;
	document.getElementsByTagName("html")[0].style.fontSize=size+"px";
}
sizeHtml();
window.onresize=function(){
	sizeHtml();
}

function showdl(url,dataid,types,area,siteid){
	$.ajax({
		url:url,
		dataType : "json",
		data:"limit="+window.limit+"&skip="+window.skip+"&code="+dataid+"&types="+types,
		type:"GET",
		success:function(data){
			var dl="";
			$.each(data,function(index,data){ 
				if(types==2){
					var tip=data.tip;
					if(tip == undefined){
						tip='';
					}
					dl+="<a href='http://fake.jiahao.me?siteid="+data.id+"&type=2&name="+encodeURIComponent(data.name)+"' onclick=\"if(app == 'undefined'){return true;}else{app.book('"+data.id+"','"+data.icon+"','"+data.name+"');return false;}\"><dl class='bespeak_list'><dt style='background: url("+data.icon+") no-repeat center;background-size: cover;'></dt><dd><h4>"+data.name+"</h4><p>"+tip+"</p></dd></dl></a>";		
				}else if(types==1){
					dl+="<a href='http://fake.jiahao.me?type=1&siteid="+data.id+"' onclick=\"if(app=='undefined'){return true;}else{app.queryCase('"+data.id+"');return false;}\"><div class='enquiry_content_list'><div class='enquiry_content_img' style='background: url("+data.icon+") no-repeat center;background-size: cover;'></div><p>"+data.name+"</p></div></a>";
				}else if(types==4){
					dl+="<a href='"+data.articleUrl+"' ><div class='enquiry_content_list'><div class='enquiry_content_img' style='background: url("+data.icon+") no-repeat center;background-size: cover;'></div><p>"+data.name+"</p></div></a>";
				}else if(types==0){
					dl+="<a href='http://fake.jiahao.me?siteid="+data.id+"&type=0&name="+encodeURIComponent(data.name)+"' onclick=\"if(app == 'undefined'){return true;}else{app.consultative('"+data.id+"','"+data.icon+"','"+data.name+"');return false;}\"><dl class='bespeak_list'><dt style='background: url("+data.icon+") no-repeat center;background-size: cover;'></dt><dd><h4>"+data.name+"</h4><p>"+data.tip+"</p></dd></dl></a>";
				}else if(types==-1){
					dl+="<a href='http://fake.jiahao.me?type=9&doctorid="+data.id+"' onclick=\"if(app=='undefined'){return true;}else{app.expert('"+data.icon+"','"+data.name+"','"+encodeURIComponent(data.techtitle)+"','"+encodeURIComponent(data.skillfield)+"','"+encodeURIComponent(data.introduction)+"');return false;}\" ><dl class='bespeak_list'><dt style='background: url("+data.icon+") no-repeat center;background-size: cover;'></dt><dd><h4>"+data.name+"<em>"+data.techtitle+"</em></h4><p>"+data.skillfield+"</p></dd></dl></a>";
				}
			})
			$('.enquiry_content').empty();
			$('.enquiry_content').append(dl);
			if(types==-1){
				var dlwid=$(".enquiry").width();
				var dtwid=$(".bespeak_list dt").outerWidth(true);
				$(".bespeak_list dd").width(dlwid-dtwid-1);
			}else if(types==4||types==1){
				for(var i=0;i<$('.enquiry_content a').length;i++){
					if(i%3==2){
						$('.enquiry_content a').eq(i).find(".enquiry_content_list").addClass("marrig");
					}
				}
				var num=($(".enquiry_content").width()-$(".enquiry_content_list").width()*3)/2;
				$(".enquiry_content_list").css("marginRight",num-1);
				$(".enquiry_content_list.marrig").css("marginRight",0);
			}
		}
	})
}

function choosemenu(_this){
	var id=_this.find("i").attr("dataid");
	if(_this.hasClass("active")){
		_this.removeClass("active");
		_this.parent().find(".option").hide();
		$(".wrap_bg").hide();
	}else{
		_this.addClass("active");
		_this.parent().siblings().find(".select_a").removeClass("active");
		$(".wrap_bg").show();
		_this.parent().find('.option li[dataid='+id+']').addClass("active").siblings().removeClass("active");
		_this.parent().find(".option").show();
		_this.parent().siblings().find(".option").hide();
	}
}
$(function(){
	$(".option").width($(".selection").width());
	$.ajax({
		url:"/search/getprovince",
		dataType : "json",
		type:"GET",
		success:function(data){
			var li="";
			$.each(data,function(dataidindex,data){ 
				li+='<li dataid="'+data.code+'">'+data.name+'</li>';
			})
			$('.select').eq(0).find('.option').append(li);
		}
	});
	/*选择下拉菜单*/
	$(".select").eq(0).find(".select_a").click(function(){
		choosemenu($(this));
	})
	$(".select").eq(1).find(".select_a").click(function(){
		if($(".select").eq(0).find(".option li").hasClass("active")){
			choosemenu($(this));
		}else{
			$(".select").eq(0).find(".select_a").removeClass("active");
			$(".select").eq(0).find(".option").hide();
			$(".wrap_bg").hide();
			alert("请选择地区");
		}
	})
	$(".wrap_bg").click(function(){
		$(".select .option").hide();
		$(".wrap_bg").hide();
	})
	$(".select").eq(0).find(".option").on("click","li",function(){
		var str=$(this).html();
		var area=$(this).attr("dataid");
		var types=$(this).parents(".select").attr("types");
		$(this).addClass("active");
		$('.enquiry_content').empty();
		$(this).parents(".select").find(".select_a i").html(str);
		$(this).parents(".select").find(".select_a i").attr("dataid",area);
		$(this).parents(".select").find(".select_a").removeClass("active");
		$(this).parents(".select").find(".option").hide();
		$(".select").eq(1).find(".select_a").html("<i dataid='ssss'>选择医院</i></div>");		
		$('.select').eq(1).find('.option').empty();
		$(".wrap_bg").hide();
		window.skip=0;
		$.ajax({
			url:"/search/gethospital",
			dataType : "json",
			data:"code="+area,
			type:"GET",
			success:function(datas){
				var li="";
				$.each(datas,function(index,data){ 
					li+='<li dataid="'+data.id+'">'+data.name+'</li>'
				})
				$('.select').eq(1).find('.option').append(li);
			}
		});
		if(types=="-1"){
			showdl("/search/getdoctor",area,types,"","");
		}else{
			showdl("/search/gethospital",area,types,"","");
		}
	})
	$(".select").eq(1).find(".option").on("click","li",function(){
		var str=$(this).html();
		var siteid=$(this).attr("dataid");
		var area=$(".select").eq(0).find(".select_a i").attr("dataid");
		window.skip=0;
		$('.enquiry_content').empty();
		$(this).addClass("active");
		$(this).parents(".select").find(".select_a i").html(str);
		$(this).parents(".select").find(".select_a i").attr("dataid",area);
		$(this).parents(".select").find(".select_a").removeClass("active");
		$(this).parents(".select").find(".option").hide();
		$(".wrap_bg").hide();
		showdl("/search/getdoctor",siteid,"-1",area,siteid);
	});
})