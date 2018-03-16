
var condition, duibiCount=0;
/**
 * 关闭对比项
 * @param obj
 */
function closeDB(obj) {
	obj.parentElement.parentElement.remove();
}
/**
 * 保留num的v位小数
 * @param num
 * @param v
 * @returns
 */
function decimal(num,v){
	if(num == ''){
		return '-';
	}else{
		num = parseFloat(num);
		return num.toFixed(v);
	}	
}

function decimalnull(num,v){
	if(num == ''){
		return '0.00';
	}else{
		num = parseFloat(num);
		return num.toFixed(v);
	}	
}

function fengxianTypeSub(Str){
	Str = Str.replace('产品','');
	return Str;
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
 * 增加对比项
 * @param obj
 */
function addDB(obj,productId) {
	if ($("#dbinfo").get(0).childElementCount < 3) {
		
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
		mesUtil.alert('对比产品最多为3个.');
	}
}
/**
 * 进入对比页面
 * @param o
 */
function goToDBpage() {
	if ($("#dbinfo").get(0).childElementCount >= 2) {
		var id = '';
		$("#dbinfo p").each(function(){
			id = id + $(this).attr("id")+',';
		});
		goPage('fundduibi.html?id='+id);
	}  else {
		mesUtil.alert('对比产品不能少于两个.');
	}
}
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
                            	    url     : basePath+'fundproductQueryAction!getfundTab123.json?fundId=1&belong_org='+belong_org, //查询URL
//                            	    url     : basePath+'mobileDemoAction.json', //查询URL
                            	    success : function(response){
                            			var aResults = response.json.data;
                            			var li;
                            			var el = document.getElementById('list_panel1');
                            			if(aResults.length == 0) {
//                            				mesUtil.alert('无查询结果！');
                               				$("#list_panel1").hide();
                               				li = '';
                               				$("#list_panel1").append($('<div>'+li+'<div class="cl"></div></div>'));
                               			} else {
                               				for (var i = 0; i < response.json.data.length; i++) {
//                               					var ja = '';
//                               					if (aResults[i].JA_RAT == '0') {
//                               						ja = '';
//                               					} else if (aResults[i].JA_RAT == '1') {
//                               						ja = '<span></span> ';
//                               					} else if (aResults[i].JA_RAT == '2') {
//                               						ja = '<span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '3') {
//                               						ja = '<span></span> <span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '4') {
//                               						ja = '<span></span> <span></span> <span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '5') {
//                               						ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
//                               					}
                               					li  = '<div class="bQ">'
                               						+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
                               						+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>         '
//                               						+jaratstar(aResults[i].JA_RAT)
//                               						+'        </p>'
                               						+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               						+'        <p class="bQL2P1" style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               						+'        <p class="bQL2P2" style="text-align:center" >' + aResults[i].PROD_NO+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL4">'
                               						+'	       <p class="bQL2P4">' + decimal((aResults[i].PROPORTION),2)+'%</p>'
                               						+'    </div>'
                               						+'    <div class="bQL3">'
                               						+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               						+'    </div>'
                               						+'</div>'
                               						;
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ">'
                               							+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
//                               							+'        <p class="bQL1_sp">'
//                               							+jaratstar(aResults[i].JA_RAT)
//                               							+'        </p>'
                               							+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>         '
                               							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL4">'
                                   						+'	       <p class="bQL2P4">' + decimal((aResults[i].PROPORTION),2)+'%</p>'
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
                               							+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
//                               							+'        <p class="bQL1_sp">'
//                               							+jaratstar(aResults[i].JA_RAT)
//                               							+'        </p>'
                               							+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>         '
                               							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL4">'
                                   						+'	       <p class="bQL2P4">' + decimal((aResults[i].PROPORTION),2)+'%</p>'
                                   						+'    </div>'
                               							+'    <div class="bQL3">'
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
                           	    id      : 'tab6', //tabPanel的ID
                        	    panelId : 'panel6', //列表panel的ID 
                        	    pageSize: 9,
                        	    getCondition : function() {
                        	    	condition = "a="+document.getElementById("searchField").value;
                        	    	return condition;
                        	    },
                        	    url     : basePath+'fundproductQueryAction!getfundTab123.json?fundId=2&belong_org='+belong_org, //查询URL
                        	    success : function(response){
                        			var aResults = response.json.data;
                        			var el = document.getElementById('list_panel6');
                        			var li;
                        			if(aResults.length == 0) {
//                        				mesUtil.alert('无查询结果！');
                           				li = '';
                           				$("#list_panel6").append($('<div>'+li+'<div class="cl"></div></div>'));
                           				$("#list_panel6").hide();
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
                           					li  = '<div class="bQ">'
                           						+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
//                           						+'        <p class="bQL1_sp">'
//                           						+jaratstar(aResults[i].JA_RAT)
//                           						+'        </p>'
                           						+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>         '
                           						+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                           						+'    </div>'
                           						+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                           						+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                           						+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                           						+'    </div>'
                           						+'    <div class="bQL4">'
                           						+'	       <p class="bQL2P4">' + decimal((aResults[i].PROPORTION),2)+'%</p>'
                           						+'    </div>'
                           						+'    <div class="bQL3">'
                           						+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                           						+'    </div>'
                           						+'</div>'
                           						;
                           					if(i+1 < response.json.data.length) {
                           						i++;
                           						li += '<div class="bQ">'
                           							+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
//                           							+'        <p class="bQL1_sp">'
//                           							+jaratstar(aResults[i].JA_RAT)
//                           							+'        </p>'
                           							+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>         '
                           							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                           							+'    </div>'
                           							+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                           							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                           							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                           							+'    </div>'
                           							+'    <div class="bQL4">'
                               						+'	       <p class="bQL2P4">' + decimal((aResults[i].PROPORTION),2)+'%</p>'
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
                           							+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
//                           							+'        <p class="bQL1_sp">'
//                           							+jaratstar(aResults[i].JA_RAT)
//                           							+'        </p>'
                           							+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>         '
                           							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                           							+'    </div>'
                           							+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                           							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                           							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                           							+'    </div>'
                           							+'    <div class="bQL4">'
                               						+'	       <p class="bQL2P4">' + decimal((aResults[i].PROPORTION),2)+'%</p>'
                               						+'    </div>'
                           							+'    <div class="bQL3">'
                           							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                           							+'    </div>'
                           							+'</div>'
                           							;
                           					}
                           					$("#list_panel6").append($('<div>'+li+'<div class="cl"></div></div>'));
                           					$("#list_panel6").show();
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
                            	    id      : 'tab7', //tabPanel的ID
                            	    panelId : 'panel7', //列表panel的ID 
                            	    pageSize: 9,
                            	    getCondition : function() {
                            	    	condition = "a="+document.getElementById("searchField").value;
                            	    	return condition;
                            	    },
                            	    url     : basePath+'fundproductQueryAction!getfundTab123.json?fundId=3&belong_org='+belong_org, //查询URL
                            	    success : function(response){
                            			var aResults = response.json.data;
                            			var el = document.getElementById('list_panel7');
                            			var li;
                            			if(aResults.length == 0) {
//                            				mesUtil.alert('无查询结果！');
                               				li = '';
                               				$("#list_panel7").append($('<div>'+li+'<div class="cl"></div></div>'));
                               				$("#list_panel7").hide();
                               			} else {
                               				for (var i = 0; i < response.json.data.length; i++) {
//                               					var ja = '';
//                               					if (aResults[i].JA_RAT == '0') {
//                               						ja = '';
//                               					} else if (aResults[i].JA_RAT == '1') {
//                               						ja = '<span></span> ';
//                               					} else if (aResults[i].JA_RAT == '2') {
//                               						ja = '<span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '3') {
//                               						ja = '<span></span> <span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '4') {
//                               						ja = '<span></span> <span></span> <span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '5') {
//                               						ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
//                               					}
                               					li  = '<div class="bQ">'
                               						+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
//                               						+'        <p class="bQL1_sp">'
//                               						+jaratstar(aResults[i].JA_RAT)
//                               						+'        </p>'
                               						+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>         '
                               						+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               						+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               						+'        <p class="bQL2P2" style="text-align:center"> ' + aResults[i].PROD_NO+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL4">'
                               						+'	       <p class="bQL2P4">' + decimal((aResults[i].PROPORTION),2)+'%</p>'
                               						+'    </div>'
                               						+'    <div class="bQL3">'
                               						+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               						+'    </div>'
                               						+'</div>'
                               						;
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ">'
                               							+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
//                               							+'        <p class="bQL1_sp">'
//                               							+jaratstar(aResults[i].JA_RAT)
//                               							+'        </p>'
                               							+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>         '
                               							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL4">'
                                   						+'	       <p class="bQL2P4">' + decimal((aResults[i].PROPORTION),2)+'%</p>'
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
                               							+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
//                               							+'        <p class="bQL1_sp">'
//                               							+jaratstar(aResults[i].JA_RAT)
//                               							+'        </p>'
                               							+'        <p class="bQL1_sp1">'+fengxianTypeSub(aResults[i].RISK_CODE_ORA)+'</p>         '
                               							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL4">'
                                   						+'	       <p class="bQL2P4">' + decimal((aResults[i].PROPORTION),2)+'%</p>'
                                   						+'    </div>'
                               							+'    <div class="bQL3">'
                               							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					}
                               					$("#list_panel7").append($('<div>'+li+'<div class="cl"></div></div>'));
                               					$("#list_panel7").show();
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
									pageSize: 9,
                            	    getCondition : function() {
                            	    	condition = "a="+document.getElementById("searchField").value;
                            	    	return condition;
                            	    },
									url     : basePath+'fundproductQueryAction.json?fundId1=1&belong_org='+belong_org,
									success : function(response){
										var aResults = response.json.data;
										var el = document.getElementById('list_panel2');
										if(aResults.length == 0) {
//											mesUtil.alert('无查询结果！');
                               				li = '';
                               				$("#list_panel2").append($('<div>'+li+'<div class="cl"></div></div>'));
                               				$("#list_panel2").hide();
                               			} else {
                               				for (var i=0; i< response.json.data.length; i++) {
//                               					var ja = '';
//                               					if (aResults[i].JA_RAT == '0') {
//                               						ja = '';
//                               					} else if (aResults[i].JA_RAT == '1') {
//                               						ja = '<span></span> ';
//                               					} else if (aResults[i].JA_RAT == '2') {
//                               						ja = '<span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '3') {
//                               						ja = '<span></span> <span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '4') {
//                               						ja = '<span></span> <span></span> <span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '5') {
//                               						ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
//                               					}
                               					li  = '<div class="bQ">'
                               						+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
                               						+'        <p class="bQL1_sp">'
                               						+jaratstar(aResults[i].JA_RAT)
                               						+'        </p>'
                               						+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               						+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               						+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               						+'    </div>'
                               						+'<div class="bQL4">'
                               						+'	<p class="bQL2P4">'+decimalnull((aResults[i].RISE_DECLINE),2)+'%</p>'
                               						+'</div>'
                               						+'    <div class="bQL3">'
                               						+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               						+'    </div>'
                               						+'</div>'
                               						;
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ">'
                               							+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL1_sp">'
                               							+jaratstar(aResults[i].JA_RAT)
                               							+'        </p>'
                               							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'<div class="bQL4">'
                                   						+'	<p class="bQL2P4">'+decimalnull((aResults[i].RISE_DECLINE),2)+'%</p>'
                                   						+'</div>'
                                   						+'    <div class="bQL3">'
                               							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					} 
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ">'
                               							+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL1_sp">'
                               							+jaratstar(aResults[i].JA_RAT)
                               							+'        </p>'
                               							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'<div class="bQL4">'
                                   						+'	<p class="bQL2P4">'+decimalnull((aResults[i].RISE_DECLINE),2)+'%</p>'
                                   						+'</div>'
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
							  },{
							   		id      : 'tab3', 
									panelId : 'panel3', 
									pageSize: 9,
									getCondition : function() {
										condition = "a="+document.getElementById("searchField").value;
										return condition;
	                            	},
									url     : basePath+'fundproductQueryAction.json?fundId1=2&belong_org='+belong_org,
									success : function(response){
										var aResults = response.json.data;
										var el = document.getElementById('list_panel3');
										var li;
										if(aResults.length == 0) {
//											mesUtil.alert('无查询结果！');
                               				li = '';
                               				$("#list_panel3").append($('<div>'+li+'<div class="cl"></div></div>'));
                               				$("#list_panel3").hide();
                               			} else {
                               				for (var i=0; i< response.json.data.length; i++) {
//                               					var ja = '';
//                               					if (aResults[i].JA_RAT == '0') {
//                               						ja = '';
//                               					} else if (aResults[i].JA_RAT == '1') {
//                               						ja = '<span></span> ';
//                               					} else if (aResults[i].JA_RAT == '2') {
//                               						ja = '<span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '3') {
//                               						ja = '<span></span> <span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '4') {
//                               						ja = '<span></span> <span></span> <span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '5') {
//                               						ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
//                               					}
                               					li  = '<div class="bQ">'
                               						+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
                               						+'        <p class="bQL1_sp">'
                               						+jaratstar(aResults[i].JA_RAT)
                               						+'        </p>'
                               						+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               						+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               						+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               						+'    </div>'
                               						+'<div class="bQL4">'
                               						+'	<p class="bQL2P4">'+decimalnull((aResults[i].RISE_DECLINE),2)+'%</p>'
                               						+'</div>'
                               						+'    <div class="bQL3">'
                               						+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               						+'    </div>'
                               						+'</div>'
                               						;
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ">'
                               							+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL1_sp">'
                               							+jaratstar(aResults[i].JA_RAT)
                               							+'        </p>'
                               							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'<div class="bQL4">'
                                   						+'	<p class="bQL2P4">'+decimalnull((aResults[i].RISE_DECLINE),2)+'%</p>'
                                   						+'</div>'
                                   						+'    <div class="bQL3">'
                               							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					} 
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ">'
                               							+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL1_sp">'
                               							+jaratstar(aResults[i].JA_RAT)
                               							+'        </p>'
                               							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'<div class="bQL4">'
                                   						+'	<p class="bQL2P4">'+decimalnull((aResults[i].RISE_DECLINE),2)+'%</p>'
                                   						+'</div>'
                                   						+'    <div class="bQL3">'
                               							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					}
                               					$("#list_panel3").append($('<div>'+li+'<div class="cl"></div></div>'));
                               					$("#list_panel3").show();
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
							   		id      : 'tab4', 
									panelId : 'panel4', 
									pageSize: 9,
									getCondition : function() {
										condition = "a="+document.getElementById("searchField").value;
										return condition;
									},
									url     : basePath+'fundproductQueryAction.json?fundId1=3&belong_org='+belong_org,
									success : function(response){
										var aResults = response.json.data;
										var el = document.getElementById('list_panel4');
										var li;
										if(aResults.length == 0) {
//											mesUtil.alert('无查询结果！');
                               				li = '';
                               				$("#list_panel4").append($('<div>'+li+'<div class="cl"></div></div>'));
                               				$("#list_panel4").hide();
                               			} else {
                               				
                               				for (var i=0; i< response.json.data.length; i++) {
//                               					var ja = '';
//                               					if (aResults[i].JA_RAT == '0') {
//                               						ja = '';
//                               					} else if (aResults[i].JA_RAT == '1') {
//                               						ja = '<span></span> ';
//                               					} else if (aResults[i].JA_RAT == '2') {
//                               						ja = '<span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '3') {
//                               						ja = '<span></span> <span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '4') {
//                               						ja = '<span></span> <span></span> <span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '5') {
//                               						ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
//                               					}
                               					li  = '<div class="bQ">'
                               						+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
                               						+'        <p class="bQL1_sp">'
                               						+jaratstar(aResults[i].JA_RAT)
                               						+'        </p>'
                               						+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               						+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               						+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               						+'    </div>'
                               						+'<div class="bQL4">'
                               						+'	<p class="bQL2P4">'+decimalnull((aResults[i].RISE_DECLINE),2)+'%</p>'
                               						+'</div>'
                               						+'    <div class="bQL3">'
                               						+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               						+'    </div>'
                               						+'</div>'
                               						;
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ">'
                               							+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL1_sp">'
                               							+jaratstar(aResults[i].JA_RAT)
                               							+'        </p>'
                               							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'<div class="bQL4">'
                                   						+'	<p class="bQL2P4">'+decimalnull((aResults[i].RISE_DECLINE),2)+'%</p>'
                                   						+'</div>'
                                   						+'    <div class="bQL3">'
                               							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					} 
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ">'
                               							+'    <div class="bQL1" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL1_sp">'
                               							+jaratstar(aResults[i].JA_RAT)
                               							+'        </p>'
                               							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2" onclick="goToDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'<div class="bQL4">'
                                   						+'	<p class="bQL2P4">'+decimalnull((aResults[i].RISE_DECLINE),2)+'%</p>'
                                   						+'</div>'
                                   						+'    <div class="bQL3">'
                               							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					}
                               					$("#list_panel4").append($('<div>'+li+'<div class="cl"></div></div>'));
                               					$("#list_panel4").show();
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
							   		id      : 'tab5', 
									panelId : 'panel5', 
									pageSize: 9,
									getCondition : function() {
										condition = "a="+document.getElementById("searchField").value;
										return condition;
									},
									url     : basePath+'fundproductQueryAction.json?fundId1=4&belong_org='+belong_org,
									success : function(response){
										var aResults = response.json.data;
										var el = document.getElementById('list_panel5');
										var li;
										if(aResults.length == 0) {
//											mesUtil.alert('无查询结果！');
                               				li = '';
                               				$("#list_panel5").append($('<div>'+li+'<div class="cl"></div></div>'));
                               				$("#list_panel5").hide();
                               			} else {
                               				
                               				for (var i=0; i< response.json.data.length; i++) {
//                               					var ja = '';
//                               					if (aResults[i].JA_RAT == '0') {
//                               						ja = '';
//                               					} else if (aResults[i].JA_RAT == '1') {
//                               						ja = '<span></span> ';
//                               					} else if (aResults[i].JA_RAT == '2') {
//                               						ja = '<span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '3') {
//                               						ja = '<span></span> <span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '4') {
//                               						ja = '<span></span> <span></span> <span></span> <span></span> ';
//                               					} else if (aResults[i].JA_RAT == '5') {
//                               						ja = '<span></span> <span></span> <span></span> <span></span> <span></span> ';
//                               					}
                               					li  = '<div class="bQ">'
                               						+'    <div class="bQL1" onclick="goToHuoBIDetailPage('+aResults[i].ID+')">'
                               						+'        <p class="bQL1_sp">'
                               						+jaratstar(aResults[i].JA_RAT)
                               						+'        </p>'
                               						+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               						+'    </div>'
                               						+'    <div class="bQL2" onclick="goToHuoBIDetailPage('+aResults[i].ID+')">'
                               						+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               						+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               						+'    </div>'
                               						+'<div class="bQL4">'
                               						+'	<p class="bQL2P4">'+decimalnull((aResults[i].RISE_DECLINE),2)+'%</p>'
                               						+'</div>'
                               						+'    <div class="bQL3">'
                               						+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               						+'    </div>'
                               						+'</div>'
                               						;
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ">'
                               							+'    <div class="bQL1" onclick="goToHuoBIDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL1_sp">'
                               							+jaratstar(aResults[i].JA_RAT)
                               							+'        </p>'
                               							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2" onclick="goToHuoBIDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'<div class="bQL4">'
                                   						+'	<p class="bQL2P4">'+decimalnull((aResults[i].RISE_DECLINE),2)+'%</p>'
                                   						+'</div>'
                                   						+'    <div class="bQL3">'
                               							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					} 
                               					if(i+1 < response.json.data.length) {
                               						i++;
                               						li += '<div class="bQ">'
                               							+'    <div class="bQL1" onclick="goToHuoBIDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL1_sp">'
                               							+jaratstar(aResults[i].JA_RAT)
                               							+'        </p>'
                               							+'        <p class="bQL1Con">' + decimal((aResults[i].FUND_NET_VALUE1),4)+'</p>'
                               							+'    </div>'
                               							+'    <div class="bQL2" onclick="goToHuoBIDetailPage('+aResults[i].ID+')">'
                               							+'        <p class="bQL2P1"  style="text-align:center">' + aResults[i].PROD_CN_NAME+'</p>'
                               							+'        <p class="bQL2P2" style="text-align:center">' + aResults[i].PROD_NO+'</p>'
                               							+'    </div>'
                               							+'<div class="bQL4">'
                                   						+'	<p class="bQL2P4">'+decimalnull((aResults[i].RISE_DECLINE),2)+'%</p>'
                                   						+'</div>'
                                   						+'    <div class="bQL3">'
                               							+'	       <p class="bQL2P3" onclick="addDB(this,'+aResults[i].ID+');">对比＋</p>'
                               							+'    </div>'
                               							+'</div>'
                               							;
                               					}
                               					$("#list_panel5").append($('<div>'+li+'<div class="cl"></div></div>'));
                               					$("#list_panel5").show();
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
var jijinTabPanel = null;
function load() {
	var jijinTabPanel = TabPanelFactory.get(pageConfig);//tabs组件初始化
	jijinTabPanel.loadTabItems();//tabs组件中页签分页组件初始化
	jijinTabPanel.init();		 //tabs组件切换页签事件初始化
	jijinTabPanel.activeTab(0);  //tabs组件显示第一个页签
	$("#searchPanelButton").bind("click", function() {
//		var jijinTabPanel = TabPanelFactory.get(pageConfig);//tabs组件初始化
//		jijinTabPanel.loadTabItems();//tabs组件中页签分页组件初始化
//		jijinTabPanel.init();		 //tabs组件切换页签事件初始化
//		jijinTabPanel.activeTab(0);  //tabs组件显示第一个页签
		jijinTabPanel.refresh();
	});
//	$("#tab1").bind("click", function() {
//		jijinTabPanel.refresh();
//	});
//	$("#tab6").bind("click", function() {
//		jijinTabPanel.refresh();
//	});
//	$("#tab7").bind("click", function() {
//		jijinTabPanel.refresh();
//	});
//	$("#tab2").bind("click", function() {
//		jijinTabPanel.refresh();
//	});
//	$("#tab3").bind("click", function() {
//		jijinTabPanel.refresh();
//	});
//	$("#tab4").bind("click", function() {
//		jijinTabPanel.refresh();
//	});
//	$("#tab5").bind("click", function() {
//		jijinTabPanel.refresh();
//	});
}

function loadMenu(searchUrl) {
	$.ajax({
		type : "GET",
		url : searchUrl,
		cache: false, 
		dataType: 'json',
		async: false, 
		success : function(response){
			var aResults = response.json.data;
//   			for (var i = 0; i < response.json.data.length; i++) {
//   				var menuName = aResults[i].MEAL_NAME;
//   			}
   			$("#tab1").text(aResults[0].MEAL_NAME);
   			$("#tab6").text(aResults[1].MEAL_NAME);
   			$("#tab7").text(aResults[2].MEAL_NAME);
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});
}
/**
 * 页面分页绑定
 */
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', load, false);

function goToDetailPage(id) {
	goPage('funddetail.html?id='+id);
}

function goToHuoBIDetailPage(id) {
	goPage('fundhuobidetail.html?id='+id);
}
