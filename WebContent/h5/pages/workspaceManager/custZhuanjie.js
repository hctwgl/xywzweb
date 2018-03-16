/***
 * 功能描述：存贷款产品
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
                            	    pageSize: 9,
                            	    getCondition : function() {
                            	    	condition = "a="+document.getElementById("searchField").value;
                            	    	return condition;
                            	    },
                            	    url     : basePath+'referral-info.json', //查询URL
                            	    success : function(response){
                            			var aResults = response.json.data;
                            			var el = document.getElementById('list_panel1');
                            			if(aResults.length == 0) {
                            				mesUtil.alert('无查询结果！');
                               				li = '';
                               				$("#list_panel1").append($('<div>'+li+'<div class="cl"></div></div>'));
                               				$("#list_panel1").hide();
                               			} else {
                               				
                               				for (var i = 0; i < response.json.data.length; i++) {
                               					debugger;
                               					var li  = '<div class="bQ" onclick="goTodepLiabDetailPage('+aResults[i].ID+')">'
                               						+'    <div class="bQL2">'
                               						+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].CUST_NAME+'</p>'
                               						+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].REFERRAL_STATE_ORA+'</p>'
                               						+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].START_DATE+'</p>'
                               						+'    </div>'
                               						+'</div>'
                               						;
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ" onclick="goTodepLiabDetailPage('+aResults[i].ID+')">'
                               							+'    <div class="bQL2">'
                               							+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].CUST_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].REFERRAL_STATE_ORA+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].START_DATE+'</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					} 
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ" onclick="goTodepLiabDetailPage('+aResults[i].ID+')">'
                               							+'    <div class="bQL2">'
                               							+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].CUST_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].REFERRAL_STATE_ORA+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].START_DATE+'</p>'
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
                           	    	panelId : 'panel2'//列表panel的ID 
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
var depLiabTabPanel = null;
function load() {
	var depLiabTabPanel = TabPanelFactory.get(pageConfig);//tabs组件初始化
	depLiabTabPanel.loadTabItems();//tabs组件中页签分页组件初始化
	depLiabTabPanel.init();		 //tabs组件切换页签事件初始化
	depLiabTabPanel.activeTab(0);  //tabs组件显示第一个页签
	$("#searchPanelButton").bind("click", function() {
		depLiabTabPanel.refresh();
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
function goTodepLiabDetailPage(id) {
	goPage('custZhuanjieDetail.html?id='+id);
}
