			$(function() {
				function fixHeight() {
					if ($(window).width() < 640) {
						$("html").removeClass("fixed-layout")
					} else {
						$("html").addClass("fixed-layout")
					}
					if ($(window).width() > 640) {
						$("#iframe").attr("width", $(window).width() - 200 + "px");
					}
					$("#iframe").attr("height", $(window).height() - 130 + "px");
				}
				$(window).resize(function() {
					fixHeight();
				}).resize();
				//iframe加载
				$(".Hrefli").click(function() {

					$(".Hrefli").removeClass("menuactive")
					$(this).addClass("menuactive")
					var Hreflink = $(this).children("a").attr("value")+"?date="+new Date().getTime();
					$(this).attr("_href",Hreflink)
					$("#iframe").attr("src", Hreflink)			
				})

				function TabChange(){
					$(".breadcrumb li").unbind("click").click(function(){
						var Tabindex=$(this).children('a').attr("value")
						//alert(Tabindex)
						//alert("ceshi")
						$("iframe").hide();
						var iframewidth=$(window).width() - 250 + "px";
						var iframeheight=$(window).height() - 164 + "px"
						
						$("iframe[value="+Tabindex+"]").css("display","inline-block")
						$("iframe[value="+Tabindex+"]").attr("width",iframewidth)
						$("iframe[value="+Tabindex+"]").attr("height",iframeheight)
					})		
					return false;
				}				
				function TabX(){
					$(".breadcrumb li").hover(function(){
						$(this).children(".close--circle").show()
					},function(){
						$(this).children(".close--circle").hide()
					})					
				}
				$(".headermenu li").click(function(){
					$(".headermenu li").removeClass("current")
					$(this).addClass("current")
					var menuli=$(this).index()
					$(".menu").hide()
					$('.menu:eq('+menuli+')').show()
				})
				
				
								
			});