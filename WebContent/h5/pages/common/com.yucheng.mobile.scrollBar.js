/*
	Name:   com.yucheng.mobile.scrollBar.js
	Author: CHANGZH
	date  : 2013-12-26
	Version: 1.0.0
*/
(function($){
	/**
	 * 分页控件
	 */
	$.fn.scrollBar = function(options){
		
		var opts = $.extend(true, $.fn.scrollBar.defaults, options.pageConfig); 
		this.scrollBar.pageInfo = opts;
		init(this);
		
		return this.each(function(){
			 $this = $(this); 
		});
		
	};
	/**
	 * 分页查询历史信息
	 */
	$.fn.scrollBar.pageInfo = {};
	/**
	 * 查询方法
	 */
	$.fn.scrollBar.queryFun = function(URL) {
		//loadStart('数据加载中...','b',false);
		if(!$.fn.scrollBar.pageInfo.queryUrl) {
			alert('查询方法配置错误!');
			return false;
		}
		var cfg = $.fn.scrollBar.pageInfo;
		$.fn.scrollBar.pageInfo.noData = false;
		if (URL != null && URL != 'undefined') {
			cfg.queryUrl = URL;
		}
		var url = cfg.queryUrl;
		url = url.indexOf('?')>0 ? url+'&start='+cfg.start+'&limit='+cfg.limit: url+'?start='+cfg.start+'&limit='+cfg.limit;
		mobileUtils.showLoading('正在加载...');
		$.ajax({
			type : "GET",
			url :  url,
			cache : false, 
			dataType : 'json',
			success : function(response){
				cfg.totleCount = response.json.count;
				cfg.totlePageCount = Math.ceil(cfg.totleCount / cfg.limit); 
				refreshListView(response.json.data, $.fn.scrollBar.pageInfo.flag);
				cfg.success(response);
				mobileUtils.hideLoading();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				mobileUtils.hideLoading();
				if(cfg.error) {
					cfg.error();
				}
			}
		});
		$.fn.scrollBar.pageInfo = cfg;
		
	}; 
	/**
	 * refresh方法
	 */
	function refreshListView(results, flag) { 
		var cfg = $.fn.scrollBar.pageInfo;
		var reader = $.fn.scrollBar.pageInfo.listReader;
		var listViewId = cfg.listViewId; 
		if (flag) {
			if($("#"+listViewId)[0] != undefined){
				$("#"+listViewId)[0].innerHTML="";
			}
		}
		//拼装新数据
		var len = results.length;  
		for (var i = 0; i < len; i++) {  
			var record = reader.record;
			for (var j = 0; j < reader.mapping.length; j++) { 
				var re = new RegExp('@'+reader.mapping[j].name, "g");
				if(results[i][reader.mapping[j].name] != undefined ){
					record = record.replace(re, results[i][reader.mapping[j].name]);
				}else{
					record = record.replace(re, '');
				}
			}
			if(cfg.beforeRecordShow) {
				record = cfg.beforeRecordShow(record);
			}
			$("#"+listViewId).append(record);
			if(cfg.afterRecordShow) {
				cfg.afterRecordShow();
			}
		} 
		$.fn.scrollBar.pageInfo.flag = true;
	}; 
	/**
	 * 下拉方法
	 */
	function pullDownAction() {
		setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			$.fn.scrollBar.pageInfo.start = 0; 
			$.fn.scrollBar.pageInfo.currentPage = 1;
			$.fn.scrollBar.pageInfo.flag = true;
			$.fn.scrollBar.queryFun();
		}, 1000);
	};
	/**
	 * 上拉方法
	 */
	function pullUpAction() {
		//setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			if ($.fn.scrollBar.pageInfo.currentPage < $.fn.scrollBar.pageInfo.totlePageCount) {
				$.fn.scrollBar.pageInfo.currentPage ++;
				$.fn.scrollBar.pageInfo.start = $.fn.scrollBar.pageInfo.start + $.fn.scrollBar.pageInfo.limit;
				$.fn.scrollBar.pageInfo.flag = false;
				$.fn.scrollBar.queryFun();
				
			} else {
				$.fn.scrollBar.pageInfo.start = 0; 
				$.fn.scrollBar.pageInfo.currentPage = 1;
				$.fn.scrollBar.pageInfo.noData = true;
				//alert('当前为最后一页');
			}		
//		}, 1000);
	};
	$.fn.scrollBar.disableScroller = function(flag){
		var panelId = $._APP.getPanelId($.fn.scrollBar.pageInfo.listViewId);
		var scroller = $("#"+panelId).scroller();
		if(flag) {
			scroller.lock();
		} else {
			scroller.unlock();
		}
	};
	/**
	 * 初始化方法
	 */
	function init($obj) { 
		$.fn.scrollBar.pageInfo = $obj.scrollBar.defaults;
		var listViewId = $.fn.scrollBar.pageInfo.listViewId;
		
		var panelId = $._APP.getPanelId(listViewId);
		var scroller=$("#"+panelId).scroller({
		    refresh : true,
		    scrollBars : true,
		    verticalScroll : true,
		    horizontalScroll : false,
		    vScrollCSS : "jqmScrollbar",
		    hScrollCSS : "jqmScrollbar"
		});
		scroller.addInfinite();
		//scroller.addPullToRefresh();
		scroller.runCB=true;
		function fetchPullDownContent(scroller){
			pullDownAction();
		}
        var hideClose;
        $.bind(scroller, "refresh-release", function () {
            var that = this;
            console.log("Refresh release");
            clearTimeout(hideClose);
            hideClose = setTimeout(function () {
                console.log("hiding manually refresh");
                fetchPullDownContent(that);
                that.hideRefresh();
            }, 1000);
            return false;
        });
        
        $.bind(scroller, "refresh-cancel", function () {
            clearTimeout(hideClose);
        });

        scroller.enable();
        $.bind(scroller, "infinite-scroll", function () {
            var self = this;
            console.log("infinite triggered");
            if($.fn.scrollBar.pageInfo.noData) {
            	$(this.el).append("<div id='infinite'>加载完成...</div>");
            } else {
            	$(this.el).append("<div id='infinite'>加载更多...</div>");
            }
            $.bind(scroller, "infinite-scroll-end", function () {
                $.unbind(scroller, "infinite-scroll-end");
                self.scrollToBottom();
                setTimeout(function () {
                    $(self.el).find("#infinite").remove();
                    if(!$.fn.scrollBar.pageInfo.noData){
                    	pullUpAction();
                    }
                    self.clearInfinite();
                    self.scrollToBottom();
                }, 1000);
            });
        });
        $("#"+panelId).css("overflow", "auto");
	};
	$.fn.scrollBar.defaults = {
			flag  : true, 			//查询是否清空历史
			start : 0,				//开始记录行数
			limit : 5,				//分页大小
			totleCount : -1,		//记录总数
			totlePageCount : -1, 	//总页数
			currentPage : 1, 		//当前页数
			beforeRenderLi : false, //li加载前数据处理
			afterRenderLi : false,  //li加载后数据处理
			queryUrl : false,       //查询URL
			listViewId : false,     //列表ID
			listReader : false,		//列表reader
			/*listReader : {mapping : [{name : 'CUST_ID'},
			             			   {name : 'CUST_NAME'}],
						    record: '<li><a href="'
								+ 'javascript: fun(\'@CUST_ID\')"'
								+ ' ><h3>客户名称：@CUST_NAME'
								+ '</h3></p></a></li>'
			*/
			success : false,		//成功回调方法
			beforeRecordShow : false,		//beforeRecordShow方法
			afterRecordShow : false,		//afterRecordShow方法
			error : false			//失败回调方法
		};
	
}(jQuery));
