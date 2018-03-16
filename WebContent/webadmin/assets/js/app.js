(function($) {
	'use strict';

	$(function() {
		
		//验证
		  var $form = $('#form-with-tooltip');
		  var $tooltip = $('<div id="vld-tooltip">提示信息！</div>');
		  $tooltip.appendTo(document.body);

		  $form.validator();

		  var validator = $form.data('amui.validator');

		  $form.on('focusin focusout', '.am-form-error input', function(e) {
		    if (e.type === 'focusin') {
		      var $this = $(this);
		      var offset = $this.offset();
		      var msg = $this.data('foolishMsg') || validator.getValidationMessage($this.data('validity'));

		      $tooltip.text(msg).show().css({
		        left: offset.left + 10,
		        top: offset.top + $(this).outerHeight() + 10
		      });
		    } else {
		      $tooltip.hide();
		    }
		  });
		  
		  
		  
		$(".am-list .am-cf").click(function() {
			var app = $(this).children(".am-icon-angle-right").hasClass("iconactive");
			
			switch (app) {
				case false:
					$(this).children(".am-icon-angle-right").addClass("iconactive");
					//alert("Ceshi")
					break
				case true:
					$(this).children(".am-icon-angle-right").removeClass("iconactive");
					//alert("ceshi")
					break
			}
		})

		var emtion = $(this).next(".emotion-wrapper").css("display");
		switch (emtion) {
			case "none":
				$(this).next(".emotion-wrapper").css("display", "block");
				break
			case "block":
				$(this).next(".emotion-wrapper").css("display", "none");
				break
		}




		var $fullText = $('.admin-fullText');
		$('#admin-fullscreen').on('click', function() {
			$.AMUI.fullscreen.toggle();
		});

		$(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
			$fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
		});
	});
})(jQuery);