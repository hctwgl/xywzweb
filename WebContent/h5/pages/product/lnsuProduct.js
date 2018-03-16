/***
 * 功能描述：保险产品
 *  作者 ：lan
 *  时间 ：2015-03-03
 *  版本 ：v1.0.0
 */

var condition;
/***
 * tabPanel页签配置
 */
var tabPanelCfg = { tabItems :[{
                            	    id      : 'tab1', //tabPanel的ID
                            	    panelId : 'panel1', //列表panel的ID 
                            	    pageSize: 21,
                            	    getCondition : function() {
                            	    	condition = "a="+document.getElementById("searchField").value;
                            	    	return condition;
                            	    },
                            	    url     : basePath+'lnsuProductQueryAction.json?&insuId=1', //查询URL
                            	    success : function(response){
                            			var aResults = response.json.data;
                            			var el = document.getElementById('list_panel1');
                            			if(aResults.length == 0) {
//                            				mesUtil.alert('无查询结果！');
                               				$("#list_panel1").hide();
                               				li = '';
                               				$("#list_panel1").append($('<div>'+li+'<div class="cl"></div></div>'));
                               			} else {
                               				
                               				for (var i = 0; i < response.json.data.length; i++) {
                               					var ja = '';
                               					if (aResults[i].JA_RAT == '0') {
                               						ja = '';
                               					} else if (aResults[i].JA_RAT == '1') {
                               						ja = '<span></span> ';
                               					} else if (aResults[i].JA_RAT == '2') {
                               						ja = '<span></span> <span></span> ';
                               					} else if (aResults[i].JA_RAT == '3') {
                               						ja = '<span></span> <span></span> <span></span> ';
                               					} else if (aResults[i].JA_RAT == '4') {
                               						ja = '<span></span> <span></span> <span></span> <span></span> ';
                               					} else if (aResults[i].JA_RAT == '5') {
                               						ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
                               					}
                               					var li  = '<div class="bQ" onclick="goTolnsuDetailPage('+aResults[i].PROD_NO+')">'
                               						+'    <div class="bQL1">'
                               						+'        <p class="bQL1_sp">'
//                               						+ja
                               						+'        </p>'
                               						+'        <p class="bQL1Con">'+ aResults[i].COM_NAME+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL2">'
//                               						+'		  <p></br></p>'
                               						+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
//                               						+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               						+'    </div>'
                               						+'</div>'
                               						;
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ" onclick="goTolnsuDetailPage('+aResults[i].PROD_NO+')">'
                               							+'    <div class="bQL1">'
                               							+'        <p class="bQL1_sp">'
//                               							+ja
                               							+'        </p>'
                               							+'        <p class="bQL1Con">'+ aResults[i].COM_NAME+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2">'
//                               							+'		  <p></br></p>'
                               							+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
//                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					} 
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ" onclick="goTolnsuDetailPage('+aResults[i].PROD_NO+')">'
                               							+'    <div class="bQL1">'
                               							+'        <p class="bQL1_sp">'
//                               							+ja
                               							+'        </p>'
                               							+'        <p class="bQL1Con">'+ aResults[i].COM_NAME+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2">'
//                               							+'		  <p></br></p>'
                               							+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
//                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					}
                               					$("#list_panel1").append($('<div>'+li+'<div class="cl"></div></div>'));
                               					$("#list_panel1").show();
                               				}
                               			}
                            			if(response.json.data.length > 0) {
											setUI();
										}
                            		},
                            		error:function(){
                            			//loadStop();
                            			//alert('数据初始化失败!!!!');
                            		}
                               }, {
                            	    id      : 'tab2', //tabPanel的ID
                            	    panelId : 'panel2', //列表panel的ID 
                            	    pageSize: 21,
                            	    getCondition : function() {
                            	    	condition = "a="+document.getElementById("searchField").value;
                            	    	return condition;
                            	    },
                            	    url     : basePath+'lnsuProductQueryAction.json?&insuId=2', //查询URL
                            	    success : function(response){
                            			var aResults = response.json.data;
                            			var el = document.getElementById('list_panel2');
                            			if(aResults.length == 0) {
//                            				mesUtil.alert('无查询结果！');
                               				li = '';
                               				$("#list_panel2").append($('<div>'+li+'<div class="cl"></div></div>'));
                               				$("#list_panel2").hide();
                               			} else {
                               				
                               				for (var i = 0; i < response.json.data.length; i++) {
                               					var ja = '';
                               					if (aResults[i].JA_RAT == '0') {
                               						ja = '';
                               					} else if (aResults[i].JA_RAT == '1') {
                               						ja = '<span></span> ';
                               					} else if (aResults[i].JA_RAT == '2') {
                               						ja = '<span></span> <span></span> ';
                               					} else if (aResults[i].JA_RAT == '3') {
                               						ja = '<span></span> <span></span> <span></span> ';
                               					} else if (aResults[i].JA_RAT == '4') {
                               						ja = '<span></span> <span></span> <span></span> <span></span> ';
                               					} else if (aResults[i].JA_RAT == '5') {
                               						ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
                               					}
                               					var li  = '<div class="bQ" onclick="goTolnsuDetailPage('+aResults[i].ID+')">'
                               						+'    <div class="bQL1">'
                               						+'        <p class="bQL1_sp">'
//                               						+ja
                               						+'        </p>'
                               						+'        <p class="bQL1Con">'+ aResults[i].COM_NAME+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL2">'
//                               						+'		  <p></br></p>'
                               						+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
//                               						+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               						+'    </div>'
                               						+'</div>'
                               						;
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ" onclick="goTolnsuDetailPage('+aResults[i].ID+')">'
                               							+'    <div class="bQL1">'
                               							+'        <p class="bQL1_sp">'
//                               							+ja
                               							+'        </p>'
                               							+'        <p class="bQL1Con">'+ aResults[i].COM_NAME+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2">'
//                               							+'		  <p></br></p>'
                               							+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
//                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					} 
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ" onclick="goTolnsuDetailPage('+aResults[i].ID+')">'
                               							+'    <div class="bQL1">'
                               							+'        <p class="bQL1_sp">'
//                               							+ja
                               							+'        </p>'
                               							+'        <p class="bQL1Con">'+ aResults[i].COM_NAME+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2">'
//                               							+'		  <p></br></p>'
                               							+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
//                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					}
                               					$("#list_panel2").append($('<div>'+li+'<div class="cl"></div></div>'));
                               					$("#list_panel2").show();
                               				}
                               			}
                            			if(response.json.data.length > 0) {
											setUI();
										}
                            		},
                            		error:function(){
                            			//loadStop();
                            			//alert('数据初始化失败!!!!');
                            		}
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
var lnsuTabPanel = null;
function load() {
	var lnsuTabPanel = TabPanelFactory.get(pageConfig);//tabs组件初始化
	lnsuTabPanel.loadTabItems();//tabs组件中页签分页组件初始化
	lnsuTabPanel.init();		 //tabs组件切换页签事件初始化
	lnsuTabPanel.activeTab(0);  //tabs组件显示第一个页签
	$("#searchPanelButton").bind("click", function() {
		lnsuTabPanel.refresh();
	});
}
/**
 * 页面分页绑定
 */
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', load, false);

/**
 * 详情页面
 * @param id
 */
function goTolnsuDetailPage(id) {
	goPage('lnsuProductDetail.html?id='+id);
}
