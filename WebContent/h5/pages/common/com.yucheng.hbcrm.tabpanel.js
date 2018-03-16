/**
 *	Name:   tabPanel工厂类
 *	Author: CHANGZH
 *	date  : 2015-04-07
 *	Version: 1.0.0
**/
var TabPanelFactory = {
	get : function(options) {
		var tabPanel = {};
		var opts = $.extend({}, this.defaults, options.tabPanelCfg); 
		tabPanel.config = opts;
		/**
		 * 上拉刷新，下拉加载更多方法
		 * @param panelId 面签id  flag :true 下拉;false 下拉
		 */
		tabPanel.pullAction = function(panelId, flag) {
			setTimeout(function () {	 
				for (var i = 0; i < tabPanel.config.tabItems.length; i++) {
					var panel  = tabPanel.config.tabItems[i];
					if(panel.panelId == panelId) {
						tabPanel.loadRecorder(panel, flag);
						break;
					}
				}
			}, tabPanel.config.relayTime);	 
		};
		/**
		 * 激活页签
		 * @param index 页签索引
		 */
		tabPanel.activeTab = function(index) {
			var configs = tabPanel.config.tabItems;
			if (index < configs.length - 1) {
				var panel = configs[index];
				tabPanel.tabChange($("#"+panel.id).get(0));
			}
		}
		/**
		 * 上拉刷新，下拉加载更多方法
		 * @param panelId 面签id  flag :true 下拉;false 下拉
		 */
		tabPanel.loadRecorder = function(panel, flag) {
			if(flag) {
				panel.start = 0;
				panel.currentPage = 1;
			} else {
				panel.start = panel.start + panel.pageSize;
				panel.currentPage ++;
			}
			var url = panel.url;
			var condition = '';
			var pageInfo  = "start="+panel.start+"&limit="+panel.pageSize;
			if(panel.getCondition) {
				condition = panel.getCondition();
			}
			if (condition != null && condition != 'undefined' && condition != '') {
				condition += "&"+pageInfo;
			} else {
				condition = pageInfo;
			}
			url = url.indexOf('?')>0 ? url + '&' + condition: url + '?' + condition;
			var noData = false;
			if (panel.currentPage > panel.totlePageCount && !flag) {
				noData = true;
			}
			if(!noData) {
				$.ajax({
					type : "GET",
					url :  url,
					cache : false, 
					async : false,
					dataType : 'json',
					success : function(response){
						var aResults = response.json.data;
						panel.totleCount = response.json.count;
						panel.totlePageCount = Math.ceil(panel.totleCount / panel.pageSize); 
						var el = $("#"+panel.panelId).get(0).children[0].children[1];
						if (response.json.data.length > 0  && flag) {
							el.innerHTML ="";
						}
						if(panel.success) {
							panel.success(response);
						} else {
							alert('查询配置错误!');
						}
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						if(panel.error) {
							panel.error(XMLHttpRequest, textStatus, errorThrown);
						}
					}
				});
			} 
			if(panel.iscroller) {
				panel.iscroller.refresh();
			}
		};
		/**
		 * 取得当前显示页签Id
		 * @param o
		 */
		tabPanel.getSeletedTab = function() {
			var tabItems = tabPanel.config.tabItems;
			for (var i = 0; i < tabItems.length; i++) {
				var tab = document.getElementById(tabItems[i].id);
				if($(tab).hasClass("qhSelected")) {
					return tabItems[i].panelId;
				}
			}
		};
		/**
		 * tab页签切换
		 * @param o
		 */
		tabPanel.tabChange = function(o) {
			for (var i = 0; i < o.parentElement.childElementCount; i++) {
				var tab = o.parentElement.children[i];
				if($(tab).hasClass("qhSelected")) {
					$(tab).removeClass("qhSelected")
					break;
				}
			}
			$(o).addClass("qhSelected");
			$("#searchField").val('');
			tabPanel.tabPanelDisplay(o.id);
		};
		/**
		 * refresh当前显示的页签
		 */
		tabPanel.refresh = function() {
			var tabItems = tabPanel.config.tabItems;
			for (var i = 0; i < tabItems.length; i++) {
				var tab = document.getElementById(tabItems[i].id);
				if($(tab).hasClass("qhSelected")) {
					tabPanel.loadRecorder(tabItems[i], true);
					break;
				}
			}
			
		};
		/**
		 * tab页签显示
		 * @param tabId 页签ID
		 */
		tabPanel.tabPanelDisplay = function(tabId) {
			var configs = tabPanel.config.tabItems;
			for (var i = 0; i < configs.length; i++) {
				var panel = configs[i];
				if(panel.id == tabId) {
					$("#"+panel.panelId).show();
					if($("#"+panel.panelId).get(0).children[0].children[1].childElementCount == 0) {
						tabPanel.loadRecorder(panel, true);
					}
				} else {
					$("#"+panel.panelId).hide();
				}
			}
		};
		
		/**
		 * 初始化tabChange方法
		 */
		tabPanel.initTabChange = function() {
			var configArray = tabPanel.config.tabItems;
			for (var i = 0; i < configArray.length; i++) {
				var panel = configArray[i];
				$("#"+panel.id).click(function() { 
					var that = this;
					tabPanel.tabChange(that);
				});
			}
		};
		
		/**
		 * 初始化iScroll控件
		 */
		tabPanel.loadTabItems = function() {
			var config = tabPanel.config.tabItems;
			for (var i = 0; i < config.length; i++) {
				var pullDownEl     = $("#"+config[i].panelId).get(0).children[0].children[0];
				var pullDownOffset = pullDownEl.offsetHeight;
				var pullUpEl       = $("#"+config[i].panelId).get(0).children[0].children[2];	
				var pullUpOffset   = pullUpEl.offsetHeight;
				var iscroll = new iScroll(config[i].panelId, {
					scrollbarClass : 'myScrollbar', // 重要样式
					useTransition : false, 
					topOffset : pullDownOffset,
					pullDownEl: pullDownEl,
					pullDownOffset: pullDownOffset,
					pullUpEl: pullUpEl,	
					pullUpOffset: pullUpOffset,
					onBeforeScrollStart : function(e) {  
                        var target = e.target;  
                        while (target.nodeType != 1)  
                                target = target.parentNode;  
                        if (target.tagName != 'SELECT' && target.tagName != 'INPUT'&& target.tagName != 'TEXTAREA')  
                                e.preventDefault();
                    },
					onRefresh: function () {
						var that  = this.options;
						if (that.pullDownEl.className.match('loading')) {
							that.pullDownEl.className = '';
							that.pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
						} else if (that.pullUpEl.className.match('loading')) {
							that.pullUpEl.className = '';
							that.pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
						}
					},
					onScrollMove : function () {
						var that  = this.options;
						if (this.y > 5 && !that.pullDownEl.className.match('flip')) {
							that.pullDownEl.className = 'flip';
							that.pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
							this.minScrollY = 0;
						} else if (this.y < 5 && that.pullDownEl.className.match('flip')) {
							that.pullDownEl.className = '';
							that.pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
							this.minScrollY = -that.pullDownOffset;
						} else if (this.y < (this.maxScrollY - 5) && !that.pullUpEl.className.match('flip')) {
							that.pullUpEl.className = 'flip';
							that.pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
							this.maxScrollY = this.maxScrollY;
						} else if (this.y > (this.maxScrollY + 5) && that.pullUpEl.className.match('flip')) {
							that.pullUpEl.className = '';
							that.pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
							this.maxScrollY = that.pullUpOffset;
						}
					},
					onScrollEnd : function () {
						var that  = this.options;
						if (that.pullDownEl.className.match('flip')) {
							that.pullDownEl.className = 'loading';
							that.pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
							tabPanel.pullAction(that.pullDownEl.parentElement.parentElement.id, true);
						} else if (that.pullUpEl.className.match('flip')) {
							var _noDataflag = false;
							for (var i = 0; i < tabPanel.config.tabItems.length; i++) {
								var panel  = tabPanel.config.tabItems[i];
								if(panel.panelId == that.pullUpEl.parentElement.parentElement.id) {
									if (panel.currentPage >= panel.totlePageCount) {
										_noDataflag = true;
										that.pullUpEl.className = '';
										that.pullUpEl.querySelector('.pullUpLabel').innerHTML = '无更多数据';
										that.refresh();
									}
									break;
								}
							}
							if(!_noDataflag) {
								that.pullUpEl.className = 'loading';
								that.pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
								tabPanel.pullAction(that.pullUpEl.parentElement.parentElement.id, false);
							}
						}
					}
				});
				config[i].iscroller = iscroll;
			}
			setTimeout(function () { 
				for (var i = 0; config.length < 1; i++) {
					document.getElementById(config[i].panelId).style.left = '0'; 
				}
			}, 800);
		};
		
		tabPanel.init = function() {
			tabPanel.initTabChange();
		};
		
		this.initialize(tabPanel);
		return tabPanel;
	},
	
	/**
	 * 初始化方法
	 */
	initialize : function($obj) {
		var configArray = $obj.config.tabItems;
		for (var i = 0; i < configArray.length; i++) {
			var panel = configArray[i];
			panel.totleCount = -1;  	//记录总数
			panel.start = 0;  	        //记录开始
			panel.totlePageCount = -1;	//总页数
			panel.currentPage = 1; 	    //当前页数
		}
		
	},
	/**
	 * 页签默认配置
	 */
	defaults : {
			relayTime : 1000,		//延时时间：单位毫秒
			param1 : false,			//待扩展参数1
			param2 : false			//待扩展参数2
	}
};
