/**
 * 图片预览
 * _img_src:图片路径
 * _panel_width:dialog宽
 * _panel_height:dialog高
 * _isDraw：针对图片是否拉伸
 * zb
 */
function dialog_previewPicture(_img_src,_isDraw,_panel_width,_panel_height){
	var _dialog_width="600px";
	var _dialog_height="400px";
	var _dialog_style='style="width:600px;height:400px;"';
	var _hasChange=false;
	
	if(_panel_height==undefined||_panel_height==null||_panel_height==0||_panel_height=="0"){
		if(_panel_width!=undefined&&_panel_width!=null&&_panel_width!=0&&_panel_width!="0"){
			_dialog_width=_panel_width+"px";
			_dialog_height=(_panel_width*0.8)+"px";
			_hasChange=true;
		}
	}else if(_panel_width==undefined||_panel_width==null||_panel_width==0&&_panel_width=="0"){
		if(_panel_height!=undefined&&_panel_height!=null&&_panel_height!=0&&_panel_height!="0"){
			_dialog_width=(_panel_height*1.2)+"px";
			_dialog_height=_panel_height+"px";
			_hasChange=true;
		}
	}else{
		_dialog_width=_panel_width+"px";
		_dialog_height=_panel_height+"px";
		_hasChange=true;
	}
	if(_hasChange){
		_dialog_style='style="width:'+_dialog_width+';height:'+_dialog_height+';"';
	}
	var _dialogContent='<div id="_div_previewPicture" class="popWin" '+_dialog_style+'>'
			+'	<div class="toolsBar noSearch">'
			+'		<div class="tbLeft">'
			+'			<div class="tabsMenu selected">图片预览</div>'
			+'		</div>'
			+'		<div class="tbRight">'
			+'			<a class="txtBt icon-close" onclick="javascript:closePreviewPicture();">关闭</a>'
			+'		</div>'
			+'	</div>'
			+'	<div id="_div_formContent" class="formContent">'
			+'		<img id="_img_temp" src="'+_img_src+'"/>'
			+'	</div>'
			+'</div>';
	$(document.body).append(_dialogContent);
	showPopWin('_div_previewPicture');
	
	if(_isDraw){
		var _div_width=$("#_div_previewPicture").width();
		var _div_height=$("#_div_previewPicture").height();
		var _img_width=$("#_img_temp").width();
		var _img_height=$("#_img_temp").height();
		var _div_ratio=_div_width/_div_height;
		var _img_ratio=_img_width/_img_height;
		if(_div_ratio>_img_ratio){
			var _img_width_temp=_img_width*(_div_height/_img_height);
			$("#_img_temp").css({"width":_img_width_temp,"height":_div_height});
		}else if(_div_ratio<_img_ratio){
			var _img_height_temp=_img_height*(_div_width/_img_width);
			$("#_img_temp").css({"width":_div_width,"height":_img_height_temp});
		}else{
			$("#_img_temp").css({"width":_div_width,"height":_div_height});
		}
	}
	$("#_img_temp").css({"margin":"0 auto","display":"block"});
	//$("#_div_previewPicture").css({"margin":"0 auto","display":"block"});
	$("#_img_temp").click(function(){
		closePreviewPicture();
	});
};
function closePreviewPicture(){
	closePopWin('_div_previewPicture');
	$("#_img_temp").remove();
	$("#_div_previewPicture").remove();
};