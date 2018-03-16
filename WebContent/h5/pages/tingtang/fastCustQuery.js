/***
 * 功能描述：贵金属产品
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
                            	    url     : basePath+'mobileCustomerQuery.json', //查询URL
                            	    success : function(response){
                            			var aResults = response.json.data;
                            			var el = document.getElementById('list_panel1');
                            			for (var i = 0; i < response.json.data.length; i++) {

                            				var li  = '<div class="bQ">'
                            						 +'    <div class="bQL1">'
                            						 +'        <p class="bQL1_sp">'
                            						 +'        </p>'
                            						 +'    </div>'
                            						 +'    <div class="bQL2"  onclick="goToCustDetailPage('+aResults[i].CUST_ID+')">'
                            						 +'        <p class="bQL2P1" style="text-align:center">证件类型:' + aResults[i].CERT_TYPE_ORA+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">证件号码:' + aResults[i].CERT_NUM+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">手机号:' + aResults[i].CONT_METH+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">时点总资产:' + aResults[i].ASSET_SUM+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">总资产滚动季日均:' + aResults[i].ASSET_ROLL_SEA_AVG+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">理财经理:' + aResults[i].MGR_NAME+'</p>'
                            						 +'    </div>'
                            						 +'</div>'
                            						 ;
                            			   if(i+1 < response.json.data.length) {
                            					i++;
                            					li += '<div class="bQ">'
                            						 +'    <div class="bQL1">'
                            						 +'        <p class="bQL1_sp">'
                            						 +'        </p>'
                            						 +'    </div>'
                            						 +'    <div class="bQL2"  onclick="goToCustDetailPage('+aResults[i].CUST_ID+')">'
                            						 +'        <p class="bQL2P1" style="text-align:center">证件类型:' + aResults[i].CERT_TYPE_ORA+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">证件号码:' + aResults[i].CERT_NUM+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">手机号:' + aResults[i].CONT_METH+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">时点总资产:' + aResults[i].ASSET_SUM+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">总资产滚动季日均:' + aResults[i].ASSET_ROLL_SEA_AVG+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">理财经理:' + aResults[i].MGR_NAME+'</p>'
                            						 +'    </div>'
                            						 +'</div>'
                            						 ;
                            				} 
                            			   if(i+1 < response.json.data.length) {
                            					i++;
                            					li += '<div class="bQ">'
                            						 +'    <div class="bQL1">'
                            						 +'        <p class="bQL1_sp">'
                            						 +'        </p>'
                            						 +'    </div>'
                            						 +'    <div class="bQL2"  onclick="goToCustDetailPage('+aResults[i].CUST_ID+')">'
                            						 +'        <p class="bQL2P1" style="text-align:center">证件类型:' + aResults[i].CERT_TYPE_ORA+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">证件号码:' + aResults[i].CERT_NUM+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">手机号:' + aResults[i].CONT_METH+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">时点总资产:' + aResults[i].ASSET_SUM+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">总资产滚动季日均:' + aResults[i].ASSET_ROLL_SEA_AVG+'</p>'
                            						 +'        <p class="bQL2P1" style="text-align:center">理财经理:' + aResults[i].MGR_NAME+'</p>'
                            						 +'    </div>'
                            						 +'</div>'
                            						 ;
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
var bankInfo = null;
function load() {
	var bankInfo = TabPanelFactory.get(pageConfig);//tabs组件初始化
	bankInfo.loadTabItems();//tabs组件中页签分页组件初始化
	bankInfo.init();		 //tabs组件切换页签事件初始化
	bankInfo.activeTab(0);  //tabs组件显示第一个页签
	$("#searchPanelButton").bind("click", function() {
		bankInfo.refresh();
	});
}
/**
 * 页面分页绑定
 */
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', load, false);

/**
 * 详情页面
 * @param id
 */
function goToCustDetailPage(cust_id) {
	goPage('keHuXinXi.html?id='+cust_id);
}


