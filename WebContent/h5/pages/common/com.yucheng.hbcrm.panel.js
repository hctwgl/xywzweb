/**
 *	Name:   panel工厂类
 *	Author: CHANGZH
 *	date  : 2015-04-07
 *	Version: 1.0.0
**/
var PanelFactory = {
	get : function(options) {
		var Panel = {};
		var opts = $.extend({}, this.defaults, options.panelCfg); 
		Panel.config = opts;
		Panel.pullDownEl       = null;
		Panel.pullDownOffset   = null;
		Panel.pullUpEl         = null;
		Panel.pullUpOffset     = null;
		Panel.iscroller        = false;
		/**
		 * 刷新方法
		 */
		Panel.refresh = function() {
			if(Panel.iscroller) {
				Panel.iscroller.refresh();
			}
		}
		/**
		 * 上拉刷新，下拉加载更多方法
		 * @param panelId 面签id  flag :true 下拉;false 下拉
		 */
		Panel.pullAction = function(flag) {
			setTimeout(function () {
				Panel.loadRecorder(flag);
			}, Panel.config.relayTime);	 
		};
		/**
		 * 上拉刷新，下拉加载更多方法
		 * @param panelId 面签id  flag :true 下拉;false 下拉
		 */
		Panel.loadRecorder = function(flag) {
			var panel = Panel.config;
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
			Panel.refresh();
		};
		/**
		 * 初始化iScroll控件
		 */
		Panel.loadPanel = function() {
			var config = Panel.config;
			Panel.pullDownEl     = $("#"+config.panelId).get(0).children[0].children[0];
			Panel.pullDownOffset = Panel.pullDownEl.offsetHeight;
			Panel.pullUpEl       = $("#"+config.panelId).get(0).children[0].children[2];	
			Panel.pullUpOffset   = Panel.pullUpEl.offsetHeight;
			Panel.iscroller = new iScroll(config.panelId, {
				scrollbarClass : 'myScrollbar', // 重要样式
				useTransition : false, 
				topOffset : Panel.pullDownOffset,
				pullDownEl: Panel.pullDownEl,
				pullDownOffset: Panel.pullDownOffset,
				pullUpEl: Panel.pullUpEl,	
				pullUpOffset: Panel.pullUpOffset,
				onBeforeScrollStart : function(e) {  
                    var target = e.target;  
                    while (target.nodeType != 1)  
                            target = target.parentNode;  
                    if (target.tagName != 'SELECT' && target.tagName != 'INPUT'&& target.tagName != 'TEXTAREA')  
                            e.preventDefault();
                },
				onRefresh: function () {
					//var that  = this.options;
					if (Panel.pullDownEl.className.match('loading')) {
						Panel.pullDownEl.className = '';
						Panel.pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
					} else if (Panel.pullUpEl.className.match('loading')) {
						Panel.pullUpEl.className = '';
						Panel.pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
					}
				},
				onScrollMove : function () {
					//var that  = this.options;
					if (this.y > 5 && !Panel.pullDownEl.className.match('flip')) {
						Panel.pullDownEl.className = 'flip';
						Panel.pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
						this.minScrollY = 0;
					} else if (this.y < 5 && Panel.pullDownEl.className.match('flip')) {
						Panel.pullDownEl.className = '';
						Panel.pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
						this.minScrollY = -Panel.pullDownOffset;
					} else if (this.y < (this.maxScrollY - 5) && !Panel.pullUpEl.className.match('flip')) {
						Panel.pullUpEl.className = 'flip';
						Panel.pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
						this.maxScrollY = this.maxScrollY;
					} else if (this.y > (this.maxScrollY + 5) && Panel.pullUpEl.className.match('flip')) {
						Panel.pullUpEl.className = '';
						Panel.pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
						this.maxScrollY = Panel.pullUpOffset;
					}
				},
				onScrollEnd : function () {
					//var that  = this.options;
					if (Panel.pullDownEl.className.match('flip')) {
						Panel.pullDownEl.className = 'loading';
						Panel.pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
						Panel.pullAction(true);
					} else if (Panel.pullUpEl.className.match('flip')) {
						if (Panel.config.currentPage >= Panel.config.totlePageCount) {
							Panel.pullUpEl.className = '';
							Panel.pullUpEl.querySelector('.pullUpLabel').innerHTML = '无更多数据';
							Panel.refresh();
						} else {
							Panel.pullUpEl.className = 'loading';
							Panel.pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
							Panel.pullAction(false);
						}
						
					}
				}
			});
			
			
			setTimeout(function () { 
				document.getElementById(config.panelId).style.left = '0'; 
			}, 800);
		};
		
		Panel.init = function() {
			Panel.initTabChange();
		};
		
		this.initialize(Panel);
		return Panel;
	},
	
	/**
	 * 初始化方法
	 */
	initialize : function($obj) {
		var panel = $obj.config;
		panel.totleCount = -1;  	//记录总数
		panel.start = 0;  	        //记录开始
		panel.totlePageCount = -1;	//总页数
		panel.currentPage = 1; 	    //当前页数
		
	},
	/**
	 * 页签默认配置
	 */
	defaults : {
			relayTime : 1000,		//延时时间：单位毫秒
			pageSize : 4,			//分页大小
			param1 : false,			//待扩展参数1
			param2 : false			//待扩展参数2
	}
};
