/**
 *	Name:   分页工厂类
 *	Author: CHANGZH
 *	date  : 2014-11-26
 *	Version: 1.0.0
**/
var PageBarFactory = {
	get : function(options) {
		var pageBar = {};
		var opts = $.extend({}, this.defaults, options.pageConfig); 
		pageBar.pageInfo = opts;
		pageBar.queryFun = function(URL) {
			//loadStart('数据加载中...','b',false);
			var that = this;
			if(!that.pageInfo.queryUrl) {
				mesUtil.alert('查询方法配置错误!');
				return false;
			}
			var cfg = that.pageInfo;
			that.pageInfo.noData = false;
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
				async : false,
				dataType : 'json',
				success : function(response){
					cfg.totleCount = response.json.count;
					cfg.totlePageCount = Math.ceil(cfg.totleCount / cfg.limit); 
					that.refreshListView(response.json.data, that.pageInfo.flag);
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
			
			that.pageInfo = cfg;
			
		};
		/**
		 * refresh方法
		 */
		pageBar.refreshListView = function(results, flag) { 
			var that = this;
			var cfg = that.pageInfo;
			var reader = that.pageInfo.listReader;
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
				if(cfg.beforeRecordShow) {
					record = cfg.beforeRecordShow(record, results[i]);
				}
				for (var j = 0; j < reader.mapping.length; j++) { 
					var re = new RegExp('@'+reader.mapping[j].name, "g");
					if(results[i][reader.mapping[j].name] != undefined ){
						record = record.replace(re, results[i][reader.mapping[j].name]);
					}else{
						record = record.replace(re, '');
					}
				}
				
				$("#"+listViewId).append(record);
				if(cfg.afterRecordShow) {
					cfg.afterRecordShow();
				}
			} 
			that.pageInfo.flag = true;
		}; 
		/**
		 * 下拉方法
		 */
		pageBar.pullDownAction = function() {
			var that = this;
			setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
				that.pageInfo.start = 0; 
				that.pageInfo.currentPage = 1;
				that.pageInfo.flag = true;
				that.queryFun();
			}, 1000);
		};
		/**
		 * 上拉方法
		 */
		pageBar.pullUpAction = function() {
			var that = this;
			if (that.pageInfo.currentPage < that.pageInfo.totlePageCount) {
				that.pageInfo.currentPage ++;
				that.pageInfo.start = that.pageInfo.start + that.pageInfo.limit;
				that.pageInfo.flag = false;
				that.queryFun();
				
			} else {
				that.pageInfo.start = 0; 
				that.pageInfo.currentPage = 1;
				that.pageInfo.noData = true;
				//alert('当前为最后一页');
			}		
		};
		pageBar.disableScroller = function(flag){
			var that = this;
			var panelId = $._APP.getPanelId(that.pageInfo.listViewId);
			var scroller = $("#"+panelId).scroller();
			if(flag) {
				scroller.lock();
			} else {
				scroller.unlock();
			}
		};
		
		this.initialize(pageBar);
		return pageBar;
	},
	/**
	 * 初始化方法
	 */
	initialize : function($obj) { 
		var listViewId = $obj.pageInfo.listViewId;
		
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
            if($obj.pageInfo.noData) {
            	if($(this.el).find('.infinite').size()<1){
            		$(this.el).append("<div id='infinite' class='infinite'>没有更多…</div>");
            	}
            } else {
            	if($(this.el).find('.infinite').size()<1){
            		$(this.el).append("<div id='infinite' class='infinite'>加载更多…</div>");
            	}
            }
            $.bind(scroller, "infinite-scroll-end", function () {
                $.unbind(scroller, "infinite-scroll-end");
                self.scrollToBottom();
                setTimeout(function () {
                    $(self.el).find("#infinite").remove();
                    if(!$obj.pageInfo.noData){
                    	$obj.pullUpAction();
                    }
                    self.clearInfinite();
                    self.scrollToBottom();
                }, 1000);
            });
        });
       // $("#"+panelId).css("overflow", "auto");
	},
	/**
	 * 默认配置
	 */
	defaults : {
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
	}
};