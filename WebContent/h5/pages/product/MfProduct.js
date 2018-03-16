/***
 * 功能描述：理财产品
 *  作者 ：lan
 *  时间 ：2015-03-03
 *  版本 ：v1.0.0
 */
var condition, duibiCount=0;
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
function addDB(obj,productId) {
	if ($("#dbinfo").get(0).childElementCount < 2) {
		
		if($("#dbinfo").text().indexOf(obj.parentElement.parentElement.children[1].children[1].textContent) >= 0){
			mesUtil.alert('请选择不同的产品进行对比.');
			return false;
		}
		
		duibiCount = duibiCount +1;
		$("#duibi").text(duibiCount);//每点一次对比数量加1
		var text = obj.parentElement.parentElement.children[1].children[1].textContent;
		var product ='<li><p id='+productId+'>'+text+'</p><a href="#"><img src="../../themes/hbbank/images/close.png" width="16" height="16" onclick="closeDB(this);"/></a></li>';
		$("#dbinfo").append(product);
	} else {
		mesUtil.alert('对比产品只能为两个.');
	}
}

function jaratstar(str){
	var ja = '';
	if (str == '0') {
		ja = '';
	} else if (str == '1') {
		ja = '<span></span> ';
	} else if (str == '2') {
		ja = '<span></span> <span></span> ';
	} else if (str == '3') {
		ja = '<span></span> <span></span> <span></span> ';
	} else if (str == '4') {
		ja = '<span></span> <span></span> <span></span> <span></span> ';
	} else if (str == '5') {
		ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
	}
	return ja;
}

/**
 * 进入对比页面
 * @param o
 */
function goToDBpage() {
	if ($("#dbinfo").get(0).childElementCount == 2) {
		var id = '';
		$("#dbinfo p").each(function(){
			id = id + $(this).attr("id")+',';
		});
		goPage('Mfduibi.html?id='+id);
	}  else {
		mesUtil.alert('对比产品只能为两个.');
	}
}

function shouyiTypeSub(Str){
	Str = Str.replace('类','');
	return Str;
}

function fengxianTypeSub(Str){
	Str = Str.replace('产品','');
	return Str;
}

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
                        	    url     : basePath+'productQueryAction.json?licaiId=1&belong_org='+belong_org, //查询URL
                        	    success : function(response){
                        			var aResults = response.json.data;
                        			var el = document.getElementById('list_panel1');
                        			if(aResults.length == 0) {
//                        				mesUtil.alert('无查询结果！');
                           				$("#list_panel1").hide();
                           				li = '';
                           				$("#list_panel1").append($('<div>'+li+'<div class="cl"></div></div>'));
                           			} else {
                           				for (var i = 0; i < response.json.data.length; i++) {
//                           					var ja = '';
//                           					if (aResults[i].JA_RAT == '0') {
//                           						ja = '';
//                           					} else if (aResults[i].JA_RAT == '1') {
//                           						ja = '<span></span> ';
//                           					} else if (aResults[i].JA_RAT == '2') {
//                           						ja = '<span></span> <span></span> ';
//                           					} else if (aResults[i].JA_RAT == '3') {
//                           						ja = '<span></span> <span></span> <span></span> ';
//                           					} else if (aResults[i].JA_RAT == '4') {
//                           						ja = '<span></span> <span></span> <span></span> <span></span> ';
//                           					} else if (aResults[i].JA_RAT == '5') {
//                           						ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
//                           					}
                           					var li  = '<div class="bQ" onclick="goTolicaiDetailPage('+aResults[i].ID+')">'
                           						+'    <div class="bQL1">'
//                           						+'        <p class="bQL1_sp">'
//                           						+jaratstar(aResults[i].RISK_CODE)
//                           						+'        </p>'
                           						+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>'
                           						+'        <p class="bQL1Con">'+shouyiTypeSub(aResults[i].PRO_SY_TYPE_ORA)+'</p>'
                           						+'    </div>'
                           						+'    <div class="bQL2">'
//                           						+'		  <p></br></p>'
                           						+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                           						+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                           						+'    </div>'
                           						+'    <div class="bQL4">'
                           						+'	       <p class="bQL2P4">'+aResults[i].EXP_YIELD_RATE+'</p>'
                           						+'    </div>'
                           						+'    <div class="bQL3" hidden="true">'
                           						+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                           						+'    </div>'
                           						+'</div>'
                           						;
                           					if(i+1 < response.json.data.length) {
                           						i++;
                           						li += '<div class="bQ" onclick="goTolicaiDetailPage('+aResults[i].ID+')">'
                           							+'    <div class="bQL1">'
//                           							+'        <p class="bQL1_sp">'
//                           							+jaratstar(aResults[i].RISK_CODE)
//                           							+'        </p>'
                           							+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>'
                           							+'        <p class="bQL1Con">'+shouyiTypeSub(aResults[i].PRO_SY_TYPE_ORA)+'</p>'
                           							+'    </div>'
                           							+'    <div class="bQL2">'
//                           							+'		  <p></br></p>'
                           							+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                           							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                           							+'    </div>'
                           							+'    <div class="bQL4">'
                               						+'	       <p class="bQL2P4">'+aResults[i].EXP_YIELD_RATE+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL3" hidden="true">'
                           							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                           							+'    </div>'
                           							+'</div>'
                           							;
                           					} 
                           					if(i+1 < response.json.data.length) {
                           						i++;
                           						li += '<div class="bQ" onclick="goTolicaiDetailPage('+aResults[i].ID+')">'
                           							+'    <div class="bQL1">'
//                           							+'        <p class="bQL1_sp">'
//                           							+jaratstar(aResults[i].RISK_CODE)
//                           							+'        </p>'
                           							+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>'
                           							+'        <p class="bQL1Con">'+shouyiTypeSub(aResults[i].PRO_SY_TYPE_ORA)+'</p>'
                           							+'    </div>'
                           							+'    <div class="bQL2">'
//                           							+'		  <p></br></p>'
                           							+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                           							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                           							+'    </div>'
                           							+'    <div class="bQL4">'
                               						+'	       <p class="bQL2P4">'+aResults[i].EXP_YIELD_RATE+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL3" hidden="true">'
                           							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
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
                           },{
						   		id      : 'tab2', 
								panelId : 'panel2', 
								pageSize: 21,
                        	    getCondition : function() {
                        	    	condition = "a="+document.getElementById("searchField").value;
                        	    	return condition;
                        	    },
								url     : basePath+'productQueryAction.json?licaiId=2&belong_org='+belong_org,
								success : function(response){
									var aResults = response.json.data;
									var el = document.getElementById('list_panel2');
									if(aResults.length == 0) {
//										mesUtil.alert('无查询结果！');
                           				li = '';
                           				$("#list_panel2").append($('<div>'+li+'<div class="cl"></div></div>'));
                           				$("#list_panel2").hide();
                           			} else {
                           				
                           				for (var i=0; i< response.json.data.length; i++) {
//                           					var ja = '';
//                           					if (aResults[i].JA_RAT == '0') {
//                           						ja = '';
//                           					} else if (aResults[i].JA_RAT == '1') {
//                           						ja = '<span></span> ';
//                           					} else if (aResults[i].JA_RAT == '2') {
//                           						ja = '<span></span> <span></span> ';
//                           					} else if (aResults[i].JA_RAT == '3') {
//                           						ja = '<span></span> <span></span> <span></span> ';
//                           					} else if (aResults[i].JA_RAT == '4') {
//                           						ja = '<span></span> <span></span> <span></span> <span></span> ';
//                           					} else if (aResults[i].JA_RAT == '5') {
//                           						ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
//                           					}
                           					var li  = '<div class="bQ">'
                           						+'    <div class="bQL1">'
//                           						+'        <p class="bQL1_sp">'
//                           						+jaratstar(aResults[i].RISK_CODE)
//                           						+'        </p>'
                           						+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>'
                           						+'        <p class="bQL1Con">'+shouyiTypeSub(aResults[i].PRO_SY_TYPE_ORA)+'</p>'
                           						+'    </div>'
                           						+'    <div class="bQL2" onclick="goTolicai2DetailPage('+aResults[i].ID+')">'
//                           						+'		  <p></br></p>'
                           						+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                           						+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                           						+'    </div>'
                           						+'    <div class="bQL4">'
                           						+'	       <p class="bQL2P4">'+aResults[i].EXP_YIELD_RATE+'</p>'
                           						+'    </div>'
                           						+'    <div class="bQL3">'
                           						+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                           						+'    </div>'
                           						+'</div>'
                           						;
                           					if(i+1 < response.json.data.length) {
                           						i++;
                           						li += '<div class="bQ">'
                           							+'    <div class="bQL1">'
//                           							+'        <p class="bQL1_sp">'
//                           							+jaratstar(aResults[i].RISK_CODE)
//                           							+'        </p>'
                           							+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>'
                           							+'        <p class="bQL1Con">'+shouyiTypeSub(aResults[i].PRO_SY_TYPE_ORA)+'</p>'
                           							+'    </div>'
                           							+'    <div class="bQL2" onclick="goTolicai2DetailPage('+aResults[i].ID+')">'
//                           							+'		  <p></br></p>'
                           							+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                           							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                           							+'    </div>'
                           							+'    <div class="bQL4">'
                               						+'	       <p class="bQL2P4">'+aResults[i].EXP_YIELD_RATE+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL3">'
                           							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                           							+'    </div>'
                           							+'</div>'
                           							;
                           					} 
                           					if(i+1 < response.json.data.length) {
                           						i++;
                           						li += '<div class="bQ">'
                           							+'    <div class="bQL1">'
//                           							+'        <p class="bQL1_sp">'
//                           							+jaratstar(aResults[i].RISK_CODE)
//                           							+'        </p>'
                           							+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>'
                           							+'        <p class="bQL1Con">'+shouyiTypeSub(aResults[i].PRO_SY_TYPE_ORA)+'</p>'
                           							+'    </div>'
                           							+'    <div class="bQL2" onclick="goTolicai2DetailPage('+aResults[i].ID+')">'
//                           							+'		  <p></br></p>'
                           							+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                           							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                           							+'    </div>'
                           							+'    <div class="bQL4">'
                               						+'	       <p class="bQL2P4">'+aResults[i].EXP_YIELD_RATE+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL3">'
                           							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
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
var licaiTabPanel = null;
function load() {
	var licaiTabPanel = TabPanelFactory.get(pageConfig);//tabs组件初始化
	licaiTabPanel.loadTabItems();//tabs组件中页签分页组件初始化
	licaiTabPanel.init();		 //tabs组件切换页签事件初始化
	licaiTabPanel.activeTab(0);  //tabs组件显示第一个页签
	$("#searchPanelButton").bind("click", function() {
		licaiTabPanel.refresh();
	});
}
/**
 * 页面分页绑定
 */
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', load, false);

/**
 * 详情页面 开放式
 * @param id
 */
function goTolicaiDetailPage(id) {
	goPage('MfProductDetail.html?id='+id);
}

/**
 * 详情页面 封闭式
 * @param id
 */
function goTolicai2DetailPage(id) {
	goPage('MfProduct2Detail.html?id='+id);
}
