
/**
 * 关闭对比项
 * @param obj
 */
function closeDB(obj) {
	obj.parentElement.parentElement.remove();
}
/**
 * 增加对比项
 * @param obj
 */
function addDB(obj) {
	if ($("#dbinfo").get(0).childElementCount < 3) {
		var text = obj.parentElement.parentElement.children[1].children[1].textContent;
		var product ='<li><p>'+text+'</p><a href="#"><img src="../../themes/hbbank/images/close.png" width="16" height="16" onclick="closeDB(this);"/></a></li>';
		$("#dbinfo").append(product);
	} else {
		alert('对比产品最多为3个.');
	}
}
/**
 * 进入详情页面
 * @param o
 */
function detail(o) {
	goPage('jijindetail.html');
}
/**
 * 进入对比页面
 */
function goToDBpage() {
	if ($("#dbinfo").get(0).childElementCount >= 2) {
		goPage('jijinduibi.html');
	}  else {
		alert('对比产品不能少于两个.');
	}
}
/***
 * tabPanel页签配置
 */
var tabPanelCfg = { tabItems :[{
                            	    id      : 'tab1', //tabPanel的ID
                            	    panelId : 'panel1', //列表panel的ID 
                            	    pageSize: 9,
                            	    url     : basePath+'mobileDemoAction.json', //查询URL
                            	    getCondition : function() {
                            	    	var condition = "a=a";
                            	    	return condition;
                            	    },
                            	    success : function(response){
                            			var aResults = response.json.data;
                            			var el = document.getElementById('list_panel1');
                            			for (var i = 0; i < response.json.data.length; i++) {
                            				var li  = '<div class="bQ">'
                            						 +'    <div class="bQL1">'
                            						 +'        <p class="bQL1_sp">'
                            						 +'             <span></span> <span></span> <span></span> <span></span>'
                            						 +'        </p>'
                            						 +'        <p class="bQL1Con">1,1674元</p>'
                            						 +'    </div>'
                            						 +'    <div class="bQL2" onclick="detail(this);">'
                            						 +'        <p class="bQL2P1"> 客户名称：' + aResults[i].CUST_NAME+'</p>'
                            						 +'        <p class="bQL2P2">000001</p>'
                            						 +'    </div>'
                            						 +'    <div class="bQL3">'
                            						 +'	       <p class="bQL2P3" onclick="addDB(this);">对比＋</p>'
                            						 +'    </div>'
                            						 +'</div>';
                            			   if(i+1 < response.json.data.length) {
                            					i++;
                            					li += '<div class="bQ">'
                            						 +'    <div class="bQL1">'
                            						 +'        <p class="bQL1_sp">'
                            						 +'             <span></span> <span></span> <span></span> <span></span>'
                            						 +'        </p>'
                            						 +'        <p class="bQL1Con">1,1674元</p>'
                            						 +'    </div>'
                            						 +'    <div class="bQL2">'
                            						 +'        <p class="bQL2P1">客户名称：' + aResults[i].CUST_NAME+'</p>'
                            						 +'        <p class="bQL2P2">000001</p>'
                            						 +'    </div>'
                            						 +'    <div class="bQL3">'
                            						 +'	       <p class="bQL2P3" onclick="addDB(this);">对比＋</p>'
                            						 +'    </div>'
                            						 +'</div>';
                            				} 
                            			   if(i+1 < response.json.data.length) {
                            					i++;
                            					li += '<div class="bQ">'
                            						 +'    <div class="bQL1">'
                            						 +'        <p class="bQL1_sp">'
                            						 +'             <span></span> <span></span> <span></span> <span></span>'
                            						 +'        </p>'
                            						 +'        <p class="bQL1Con">1,1674元</p>'
                            						 +'    </div>'
                            						 +'    <div class="bQL2">'
                            						 +'        <p class="bQL2P1">客户名称：' + aResults[i].CUST_NAME+'</p>'
                            						 +'        <p class="bQL2P2">000001</p>'
                            						 +'    </div>'
                            						 +'    <div class="bQL3">'
                            						 +'	       <p class="bQL2P3" onclick="addDB(this);">对比＋</p>'
                            						 +'    </div>'
                            						 +'</div>';
                            				} 
                            			   $("#list_panel1").append($('<div>'+li+'<div class="cl"></div></div>'));
                            			}
                            			if(response.json.data.length > 0) {
											setUI();
										}
                            		},
                            		error:function(){
                            			//loadStop();
                            			//alert('数据初始化失败!!!!');
                            		}
                               },{
							   		id      : 'tab2', 
									panelId : 'panel2', 
									pageSize: 9,
                            	    getCondition : function() {
                            	    	var condition = "a=a";
                            	    	return condition;
                            	    },
									url     : basePath+'mobileDemoAction!getTab2.json',
									success : function(response){
										var aResults = response.json.data;
										var el = document.getElementById('list_panel2');
										for (var i=0; i< response.json.data.length; i++) {
											var li  = '<div class="bQ">'
													 +'    <div class="bQL1">'
													 +'        <p class="bQL1_sp">'
													 +'             <span></span> <span></span> <span></span> <span></span>'
													 +'        </p>'
													 +'        <p class="bQL1Con">1,1674元</p>'
													 +'    </div>'
													 +'    <div class="bQL2">'
													 +'        <p class="bQL2P1"> 客户名称：' + aResults[i].CUST_NAME+'</p>'
													 +'        <p class="bQL2P2">000001</p>'
													 +'    </div>'
													 +'    <div class="bQL3">'
													 +'	       <p class="bQL2P3" onclick="addDB(this);">对比＋</p>'
													 +'    </div>'
													 +'</div>';
										   if(i+1 < response.json.data.length) {
												i++;
												li += '<div class="bQ">'
													 +'    <div class="bQL1">'
													 +'        <p class="bQL1_sp">'
													 +'             <span></span> <span></span> <span></span> <span></span>'
													 +'        </p>'
													 +'        <p class="bQL1Con">1,1674元</p>'
													 +'    </div>'
													 +'    <div class="bQL2">'
													 +'        <p class="bQL2P1">客户名称：' + aResults[i].CUST_NAME+'</p>'
													 +'        <p class="bQL2P2">000001</p>'
													 +'    </div>'
													 +'    <div class="bQL3">'
													 +'	       <p class="bQL2P3" onclick="addDB(this);">对比＋</p>'
													 +'    </div>'
													 +'</div>';
											} 
										   if(i+1 < response.json.data.length) {
												i++;
												li += '<div class="bQ">'
													 +'    <div class="bQL1">'
													 +'        <p class="bQL1_sp">'
													 +'             <span></span> <span></span> <span></span> <span></span>'
													 +'        </p>'
													 +'        <p class="bQL1Con">1,1674元</p>'
													 +'    </div>'
													 +'    <div class="bQL2">'
													 +'        <p class="bQL2P1">客户名称：' + aResults[i].CUST_NAME+'</p>'
													 +'        <p class="bQL2P2">000001</p>'
													 +'    </div>'
													 +'    <div class="bQL3">'
													 +'	       <p class="bQL2P3" onclick="addDB(this);">对比＋</p>'
													 +'    </div>'
													 +'</div>';
											} 
										   $("#list_panel2").append($('<div>'+li+'<div class="cl"></div></div>'));
										}
										if(response.json.data.length > 0) {
											setUI();
										}
									},
                            		error:function(){
                            			//loadStop();
                            			//alert('数据初始化失败!!!!');
                            		}
							  },{
                          	    id      : 'tab3', //tabPanel的ID
                        	    panelId : 'panel3', //列表panel的ID 
                        	    pageSize: 9,
                        	    url     : basePath+'mobileDemoAction.json', //查询URL
                        	    getCondition : function() {
                        	    	var condition = "a=a";
                        	    	return condition;
                        	    },
                        	    success : function(response){
                        			var aResults = response.json.data;
                        			for (var i = 0; i < response.json.data.length; i++) {
                        				var li  = '<div class="bQ">'
                        						 +'    <div class="bQL1">'
                        						 +'        <p class="bQL1_sp">'
                        						 +'             <span></span> <span></span> <span></span> <span></span>'
                        						 +'        </p>'
                        						 +'        <p class="bQL1Con">1,1674元</p>'
                        						 +'    </div>'
                        						 +'    <div class="bQL2" onclick="detail(this);">'
                        						 +'        <p class="bQL2P1"> tab3_客户名称：' + aResults[i].CUST_NAME+'</p>'
                        						 +'        <p class="bQL2P2">000001</p>'
                        						 +'    </div>'
                        						 +'    <div class="bQL3">'
                        						 +'	       <p class="bQL2P3" onclick="addDB(this);">对比＋</p>'
                        						 +'    </div>'
                        						 +'</div>';
                        			   if(i+1 < response.json.data.length) {
                        					i++;
                        					li += '<div class="bQ">'
                        						 +'    <div class="bQL1">'
                        						 +'        <p class="bQL1_sp">'
                        						 +'             <span></span> <span></span> <span></span> <span></span>'
                        						 +'        </p>'
                        						 +'        <p class="bQL1Con">1,1674元</p>'
                        						 +'    </div>'
                        						 +'    <div class="bQL2">'
                        						 +'        <p class="bQL2P1">客户名称：' + aResults[i].CUST_NAME+'</p>'
                        						 +'        <p class="bQL2P2">000001</p>'
                        						 +'    </div>'
                        						 +'    <div class="bQL3">'
                        						 +'	       <p class="bQL2P3" onclick="addDB(this);">对比＋</p>'
                        						 +'    </div>'
                        						 +'</div>';
                        				} 
                        			   if(i+1 < response.json.data.length) {
                        					i++;
                        					li += '<div class="bQ">'
                        						 +'    <div class="bQL1">'
                        						 +'        <p class="bQL1_sp">'
                        						 +'             <span></span> <span></span> <span></span> <span></span>'
                        						 +'        </p>'
                        						 +'        <p class="bQL1Con">1,1674元</p>'
                        						 +'    </div>'
                        						 +'    <div class="bQL2">'
                        						 +'        <p class="bQL2P1">客户名称：' + aResults[i].CUST_NAME+'</p>'
                        						 +'        <p class="bQL2P2">000001</p>'
                        						 +'    </div>'
                        						 +'    <div class="bQL3">'
                        						 +'	       <p class="bQL2P3" onclick="addDB(this);">对比＋</p>'
                        						 +'    </div>'
                        						 +'</div>';
                        				} 
                        			   $("#list_panel3").append($('<div>'+li+'<div class="cl"></div></div>'));
                        			}
                        			if(response.json.data.length > 0) {
										setUI();
									}
                        		},
                        		error:function(){
                        			//loadStop();
                        			//alert('数据初始化失败!!!!');
                        		}
                           },{
							   		id      : 'tab4', 
									panelId : 'panel4', 
									pageSize: 9,
									getCondition : function() {
										var condition = "a=a";
                            	    	return condition;
									},
									url     : basePath+'mobileDemoAction!getTab2.json'
							  },{
							   		id      : 'tab5', 
									panelId : 'panel5', 
									pageSize: 9,
									getCondition : function() {
										var condition = "a=a";
                            	    	return condition;
									},
									url     : basePath+'mobileDemoAction!getTab2.json'
							  }]
				  };
/**
 * 页面功能配置
 */
var pageConfig = {
					tabPanelCfg : tabPanelCfg //tabPanel配置
};
/**
 * 页面初始化方法
 */
var jijinTabPanel = null;
function load() {
	var jijinTabPanel = TabPanelFactory.get(pageConfig);//tabs组件初始化
	jijinTabPanel.loadTabItems();//tabs组件中页签分页组件初始化
	jijinTabPanel.init();		 //tabs组件切换页签事件初始化
	jijinTabPanel.activeTab(0);  //tabs组件显示第一个页签
	$("#queryBtn").bind("click",function() { 
		jijinTabPanel.refresh();
	});
}
/**
 * 页面分页绑定
 */
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', load, false);




