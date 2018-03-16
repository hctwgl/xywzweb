


	document.addEventListener('deviceready', setRightMenu, false);
	function setRightMenu() {
		$("#rmMask").remove();
		$("#rmBox").remove();
		var li = '';
		var username = '';
		var aResults1 = '';
		var aResults2 = '';
		var msgcount = '';
		$.ajax({
			type : "GET",
			url : basePath + 'checkOnlineAction!getAuthUser.json',
			cache: false, 
			dataType: 'json',
			async: false, 
			success : function(response){
			
				username = response.authUser.username;
				
			},
			error:function(){
			}
		});
		
		$.ajax({
			type : "GET",
			url : basePath + 'rightPushMessageAction!msgnumQuery.json',
			cache: false, 
			dataType: 'json',
			async: false, 
			success : function(response){
				aResults2 = response.json.data;
				msgcount = aResults2[0].COUNT;
			},
			error:function(){
			}
		});
		
		//右侧菜单 sta
		li = li +'<div id="rmMask" class="lgMask"></div>        											 '
		+'<div id="rmBox" class="rmBox">                                                                     '
		+'	<div class="rmUser">                                                                              '
		+'		<div><!----> <img src="../../themes/hbbank/images/gerenzhongxin.png" alt="" /></div>              '
		+'		<span>欢迎您，'+username+'</span>                                                                 '
		+'	</div>                                                                                            '
		+'	<div id="rmMenu" class="rmMenu">                                                                  ';
		if(msgcount == 0){
			li = li +'		<a href="javascript:void(0);" id="btrmMsg"><b class="cmIco281"></b><span class="rmMenuinfo">消息中心</span></a>    ';
		}else{
			li = li +'		<a href="javascript:void(0);" id="btrmMsg"><b class="cmIco281"></b><span class="rmMenuinfo">消息中心</span><span class="rmMenumsg">'+msgcount+'</span></a>    ';
		}
//		+'		<a href="javascript:void(0);" id="btrmMsg"><b class="cmIco281"></b><span class="rmMenuinfo">消息中心</span><span class="rmMenumsg">'+msgcount+'</span></a>    '
		// (<font color="#DC2421">'+msgcount+'</font>)
		li = li +'		<a href="javascript:void(0);" id="btrmSet"><b class="cmIco80"></b><span class="rmMenuinfo">在线时间设置</span></a>     '
		+'		<a href="javascript:void(0);" id="lbsj"><b class="cmIco80"></b><span class="rmMenuinfo">轮播时间设置</span></a>     '
//		+'		<a href="javascript:void(0);" id="belongOrg"><b class="cmIco80"></b><span class="rmMenuinfo">归属分行设置</span></a>     '
		+'		<a href="javascript:void(0);" id="btrmExit"><b class="cmIco407"></b><span class="rmMenuinfo">安全退出</span></a>   '
		+'	</div>                                                                                            ';
		
		//未登陆时，查询消息信息结束流程
		if(username == undefined || username ==""){
			return;
		}else{
			$.ajax({
				type : "GET",
				url : basePath + 'rightPushMessageAction!msgQuery.json',
				cache: false, 
				dataType: 'json',
				async: false, 
				success : function(response){
				    aResults1 = response.queue.data;				
				},
				error:function(){
				}
			});
			
			li = li +'	<div class="rmCon" id="rmcMsg">                                                                   '
					+'		<h1><b class="cmIco17"></b><span>消息中心</span></h1>                                           ';
			
			for(var i=0; i<aResults1.length; i++){
				if(aResults1[i].MSG_TYPE == "1"){
					if(aResults1[i].MSG_ID == "" || aResults1[i].MSG_ID == undefined){
						li = li + '';
					}else{
						li = li + '	<div class="rmList" id="rmListinfo">                                     '
							+'     <b><input type="hidden" value ="'+aResults1[i].MSG_ID+'"></input>                '
							+'  '+aResults1[i].MSG_TITLE+'</b>                                                          '
							+'     <b1>'+aResults1[i].MSG_TIME+'</b1>                                           '
							+'			<span class="conHigh"><p>'+aResults1[i].MSG_BODY+'</p></span>                   							'
							+'			</div>	                                                                       ';
					}
				}else{
					li = li + '	<div class="rmList" id="rmListpop">                                       '
						+'    <b><input type="hidden" value ="'+aResults1[i].ID+'"></input>                '
						+'  '+aResults1[i].MSG_TITLE+'</b>                                                          '
						+'     <b1>'+aResults1[i].MSG_TIME+'</b1>                                           '
						+'			<span class="conHigh"><p>'+aResults1[i].MSG_BODY+'</p></span>                        							'
						+'			</div>	                                                                                ';
				}
			}
		}
//		+'		<div class="rmList">                                                                            '
//		+'			<b>河北银行荣获“全国文明单位”称号</b>                                                       '
//		+'			<span>2月28日，河北银行（本部）荣获第四届全国文明单位荣誉称号。</span>                        '
//		+'		</div>                                                                                          '
//		+'		<div class="rmList">                                                                            '
//		+'			<b>关于调整2015年凭证式（二期）国债发行利率的公告</b>                                         '
//		+'			<span>2月28日，河北银行（本部）荣获第四届全国文明单位荣誉称号。</span>                        '
//		+'		</div>                                                                                          '
//		+'		<div class="rmList">                                                                            '
//		+'			<b>我行正在发售河北银行2015年114号对公保本理财产品</b>                                        '
//		+'			<span>河北银行2015年114号对公理财”（代码153046）正式发行，发行期为2015年05月</span>          '
//		+'		</div>                                                                                          '
//		+'		<div class="rmList">                                                                            '
//		+'			<b>河北银行荣获“全国文明单位”称号</b>                                                       '
//		+'			<span>2月28日，河北银行（本部）荣获第四届全国文明单位荣誉称号。</span>                        '
//		+'		</div>                                                                                          '
//		+'		<div class="rmList">                                                                            '
//		+'			<b>关于调整2015年凭证式（二期）国债发行利率的公告</b>                                         '
//		+'			<span>2月28日，河北银行（本部）荣获第四届全国文明单位荣誉称号。</span>                        '
//		+'		</div>                                                                                          '
//		+'	</div>                                                                                            ';
		
		li = li + '	</div>                                                                                    '
		+'	<div class="rmCon" id="rmcSet">                                                                   '
		+'		<h1><b class="cmIco17"></b><span>系统设置</span></h1>                                           '
		+'		<div class="rmGroup" id="online_time">                                                                           '
		+'			<b>设置后台在线时间</b>                                                                       '
		+'			<div id="5fenz" class="rmlCk">5分钟<input type="hidden" value="300"/><b class="cmIco64"></b></div>                                         '
		+'			<div id="10fenz" class="rmlCk">10分钟<input type="hidden" value="600"/><b class="cmIco64"></b></div>                          '
		+'			<div id="15fenz" class="rmlCk">15分钟<input type="hidden" value="900"/><b class="cmIco64"></b></div>                                        '
		+'			<span>如果程序在后台超过指定的时间，再次打开会自动注销登录状态。修改后立即生效。</span>                         '
		+'		</div>			                                                                                    '
		+'	</div>                                                                                            '
		
		+'	<div class="rmCon" id="lbsj_set">                                                                   '
		+'		<h1><b class="cmIco17"></b><span>系统设置</span></h1>                                           '
		+'		<div class="rmGroup" id="lbsj_time">                                                                           '
		+'			<b>设置轮播时间</b>                                                                       '
		+'			<div id="3fz" class="rmlCk">3分钟<input type="hidden" value="180000"/><b class="cmIco64"></b></div>                                         '
		+'			<div id="5fz" class="rmlCk">5分钟<input type="hidden" value="300000"/><b class="cmIco64"></b></div>                          '
		+'			<div id="10fz" class="rmlCk">10分钟<input type="hidden" value="600000"/><b class="cmIco64"></b></div>                                        '
		+'			<span>修改后立即生效。</span>                         '
		+'		</div>			                                                                                    '
		+'	</div>                                                                                      '
		
		+'	<div class="rmCon" id="belongOrg_set">                                                                   '
		+'		<h1><b class="cmIco17"></b><span>系统设置</span></h1>                                           '
		+'		<div class="rmGroup" id="q_org" >                                                                           '
		+'		</div>			                                                                                    '
		+'	</div>                                                                                            '
		
		+'</div>                                                                                             ';
		
		//右侧菜单 end
		$("body").append($(li));
		
		if(msgcount>0){
			var ss="<span class='zDhRightmsg'>"+msgcount+"</span>";
//			var ss="<span class='zDhRightmsg'>12</span>";
			$("#btRm").append($(ss));
			$("#btRm1").append($(ss));
			$("#btRm2").append($(ss));
			$("#btRm3").append($(ss));
			$("#btRm4").append($(ss));
			$("#btRm5").append($(ss));
			$("#btRm6").append($(ss));
			$("#btRm7").append($(ss));
			$("#btRm8").append($(ss));
			$("#btRm9").append($(ss));
			$("#btRm10").append($(ss));
		}else{
			$("#btRm span").remove();
			$("#btRm1 span").remove();
			$("#btRm2 span").remove();
			$("#btRm3 span").remove();
			$("#btRm4 span").remove();
			$("#btRm5 span").remove();
			$("#btRm6 span").remove();
			$("#btRm7 span").remove();
			$("#btRm8 span").remove();
			$("#btRm9 span").remove();
			$("#btRm10 span").remove();
		}
		
		//打开、关闭右侧菜单
		$("#btRm").click(function(){
			_show();
		});
		$("#btRm1").click(function(){
			_show();
		});
		$("#btRm2").click(function(){
			_show();
		});
		$("#btRm3").click(function(){
			_show();
		});
		$("#btRm4").click(function(){
			_show();
		});
		$("#btRm5").click(function(){
			_show();
		});
		$("#btRm6").click(function(){
			_show();
		});
		$("#btRm7").click(function(){
			_show();
		});
		$("#btRm8").click(function(){
			_show();
		});
		$("#btRm9").click(function(){
			_show();
		});
		$("#btRm10").click(function(){
			_show();
		});
		$("#rmMask").click(function(){
			_hide();
			setUI();
		});
		var _show=function(){
			$("#rmMask").fadeIn();
			$("#rmBox").fadeIn();
		};
		var _hide=function(){
			$("#rmMask").fadeOut();
			$("#rmBox").fadeOut();
		};
		
		//右侧菜单切换
		$("#btrmMsg").click(function(){
			$("#rmcMsg").fadeIn();
			$("#rmMenu").hide();
		});
		
		$("#rmcMsg>h1").click(function(){
			$("#rmcMsg").hide();
			$("#rmMenu").fadeIn();
		});
		

		$("#btrmSet").click(function(){
			$("#rmcSet").fadeIn();
			$("#rmMenu").hide();
		});
		
		$("#btrmSet").click(function(){
			
			if(back_time==300)
				{
				$("#5fenz").attr("class","rmlCk rmlCkSelected");
				$("#10fenz").attr("class","rmlCk");
				$("#15fenz").attr("class","rmlCk");
				
				}
			else if(back_time==600)
			{
				$("#5fenz").attr("class","rmlCk");
				$("#10fenz").attr("class","rmlCk rmlCkSelected");
				$("#15fenz").attr("class","rmlCk");
			
			}
			else if(back_time==900)
			{
				$("#5fenz").attr("class","rmlCk");
				$("#10fenz").attr("class","rmlCk");
				$("#15fenz").attr("class","rmlCk rmlCkSelected");
			
			}
				
				
				$("#rmcSet").fadeIn();
				$("#rmMenu").hide();
				
			});
		
		//设置后台在线时间
		$("#online_time>div").bind("click",function(){
			
			$("#online_time div").each(function(){
				$(this).attr("class","rmlCk");
			});
			
			$(this).attr("class","rmlCk rmlCkSelected");
			var value_time = $(this).find("input").val();
			 
			var usql = "update PARAMETER set QUIT_TIME='"+value_time+"' ";
			execute(crmApp,usql,function(){
				back_time=value_time;
				mobileApp.setBackTime(value_time);
			});	
			
		});
		
		$("#rmcSet>h1").click(function(){
			$("#rmcSet").hide();
			$("#rmMenu").fadeIn();
		});
		
		
		
		$("#lbsj").click(function(){

		if(turns_time==180000)
			{
			$("#3fz").attr("class","rmlCk rmlCkSelected");
			$("#5fz").attr("class","rmlCk");
			$("#10fz").attr("class","rmlCk");
			
			}
		else if(turns_time==300000)
		{
		$("#3fz").attr("class","rmlCk");
		$("#5fz").attr("class","rmlCk rmlCkSelected");
		$("#10fz").attr("class","rmlCk");
		
		}
		else if(turns_time==600000)
		{
		$("#3fz").attr("class","rmlCk");
		$("#5fz").attr("class","rmlCk");
		$("#10fz").attr("class","rmlCk rmlCkSelected");
		
		}
			
			
			$("#lbsj_set").fadeIn();
			$("#rmMenu").hide();
			
		});
		//设置轮播时间
		$("#lbsj_time>div").bind("click",function(){
			
			$("#lbsj_time div").each(function(){
				$(this).attr("class","rmlCk");
			});
			
			$(this).attr("class","rmlCk rmlCkSelected");
			var value_time = $(this).find("input").val();
			 
			 
			var usql = "update PARAMETER set TIME='"+value_time+"' ";
			execute(crmApp,usql,function(){
				turns_time=value_time;
				mobileApp.setTurnsTime(value_time);
			});	
			
		});
		
		$("#lbsj_set>h1").click(function(){
			$("#lbsj_set").hide();
			$("#rmMenu").fadeIn();
		});
		$("#belongOrg").click(function(){
		
		
			$.ajax({
				type : "GET",
				url : basePath + 'OrgQueryAction.json',
				cache : false,
				data: {"belong_org":belong_org},
				// async: false,
				dataType : "json",
				success : function(response) {
					var aResults = response.json.data;
					$("#q_org").text('');
					var li1='';
					var li2='';
					debugger;
					if(belong_org==aResults[0].B_ORG_ID){
							
							li2='	<b>设置归属分行</b> 		  '
							+ ' <div class="rmlCk rmlCkSelected">'+aResults[0].B_ORG_NAME+'<input type="hidden" value="'+aResults[0].B_ORG_ID+'"/><b class="cmIco64"></b></div>';
						}
					for (var i = 0; i < aResults.length; i++) {
			
	
						li1 = li1+'			<div class="rmlCk">'+aResults[i].ORG_NAME+'<input type="hidden" value="'+aResults[i].ORG_ID+'"/><b class="cmIco64"></b></div>  ';
					}		
					li1 = li2 + li1 +'			<span id="goHome">返回主页后生效。</span>                         ';	
					  $("#q_org").append($(li1));
					$("#belongOrg_set").fadeIn();
					$("#rmMenu").hide();
					
					$("#q_org>div").bind("click",function(){
				
						$("#q_org div").each(function(){
							$(this).attr("class","rmlCk");
						});
						
						$(this).attr("class","rmlCk rmlCkSelected");
						var org = $(this).find("input").val();
						 
	
						var usql = "update PARAMETER set ORG='"+org+"' ";
						execute(crmApp,usql,function(){
							belong_org=org;
							mobileApp.setBelongOrg(org);
						});	
						
					});
					$("#goHome").click(function(){
						
						goPage(filePath+'/index.html');
					});
				},
				error : function() {
					mesUtil.alert("机构初始化错误");
				}
			});
			
		
		});
		

		$("#belongOrg_set>h1").click(function(){
			$("#belongOrg_set").hide();
			$("#rmMenu").fadeIn();
		});
		//安全退出
		$("#btrmExit").click(function(){
			var _index=layer.confirm('您确定要退出系统吗？', {
			    btn: ['确定','取消'],
			    shadeClose: true
			}, function(){
				$._APP.doLogout();
				layer.close(_index);
			}, function(){
				_hide();
				//……
			});
		});
		
		//跳转公告详情界面
		$("#rmListinfo>b").bind("click",function(){
			debugger;
			var id = $(this).find("input").val();
			
			if(id=="" || id==undefined){
				alert("查询公告信息失败！");
				return;
			}
			
			$.ajax({
				type : "GET",
				url : basePath + 'rightPushMessageAction!msgreadQuery.json?msgid='+id,
				cache: false, 
				dataType: 'json',
				async: false, 
				success : function(response){
					
				},
				error:function(){
				}
			});
			
			goPage(filePath+'/pages/workspaceManager/noticeQueryDetail.html?id='+id);
		});

		//推送、重客弹窗
		$("#rmListpop>b").bind("click",function(){
			var id = $(this).find("input").val();
			
			if(id=="" || id==undefined){
				alert("查询推送消息失败！");
				return;
			}
			
			$.ajax({
				type : "GET",
				url : basePath + 'rightPushMessageAction.json?id='+id,
				cache: false, 
				dataType: 'json',
				async: false, 
				success : function(response){
				    aResults = response.json.data;				
				},
				error:function(){
				}
			});
	   		
			var title1 = aResults[0].MSG_TITLE;
			var body1 = aResults[0].MSG_BODY;
			debugger;
			//弹出框，提示消息信息
//			layer.confirm('<input style="width:320px; height:50px; border:none; font-size:18px;"  id="crm_push_msg" type="text" readonly="true" value='+bodymsg+'/>',
			layer.confirm('<textarea style="width:315px; height:70px;border:none; font-size:16px;" readonly="true">'+body1+'</textarea>',
			{
			title:title1		    
			},
			function(index){
			    //do something
			    layer.close(index);
			});
			$.ajax({
				type : "GET",
				url : basePath + 'rightPushMessageAction!msgreadQuery.json?id='+id,
				cache: false, 
				dataType: 'json',
				async: false, 
				success : function(response){
					setRightMenu();
				},
				error:function(){
				}
			});
		});
	}
