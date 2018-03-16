		var curNodeObj={
			instanceid:'',
			nodeid :'',
			windowid:''
		};	

Ext.onReady(function() {
		Ext.QuickTips.init();
		// 渠道类型下拉框的数据查询
			var typeStore = new Ext.data.Store({
					restful : true,
					autoLoad : true,
					proxy : new Ext.data.HttpProxy({
						url : basepath + '/lookup.json?name=IS_READ_FLAG'
					}),
					reader : new Ext.data.JsonReader({
						root : 'JSON'
					}, [ 'key', 'value' ])
				});
			
				
			// 最终展现的panel
			var listPanel = new Mis.Ext.CrudPanel( {
				id : "listPanel",
				title : "待办任务列表",
				stUrl : basepath + '/queryrestapplywait.json',
//				addUrl:basepath+'/restapply.json',
//				updateUrl:basepath+'/restapply.json',
//				deUrl:basepath+'/restapply!batchDestroy.json',
				primary:'INSTANCEID',
				checkbox : true,
				dbclick:false,
				winHeight : 450,
				winWidth : 800,
//				gridHeight : 360,
				gclms : [{
					name : 'INSTANCEID'
				}, {
					name : 'WFJOBNAME',
					header : '工作名称'
				}, {
					name : 'WFNAME',
					header : '流程名称'
				}, {
					name : 'AUTHOR',
					header : '发起人id',
					hidden:true
				}, {
					name : 'AUTHOR_NAME',
					header : '发起人'
				}, {
					name : 'PRENODENAME',
					header : '上一办理人'
				}, {
					name : 'NODENAME',
					header : '当前环节'
				}, {
					name : 'NODESTATUS',
					header :'节点状态',
					renderer : function(value){
					if(value==0)return '正常办理';
					else if(value==1)return '催办';
					else if(value==2)return '办理结束';
//					else if(value==3)return '';
					else if(value==4)return '重办';
					else if(value==5)return '退回';
					else if(value==6)return '挂起';
					else if(value==7)return '打回';
					else return '未知状态';
					}
				},{
					name : 'NODEPLANENDTIME',
					header : '办理时限'
				},
				{
					name : 'NODEID'
				},
				{
					name : 'WFSIGN'
				}],
				pagesize : 20,
				// 查询字段
				selectItems : {
					layout : 'column',
					items : [ {
						columnWidth : .25,
						layout : 'form',
						defaultType : 'textfield',
						border : false,
						items : [ {
							name : 'WFNAME',
							xtype : 'textfield',
							fieldLabel : '流程名称',
							labelStyle : 'text-align:right;',
							width : '100',
							anchor : '90%'
						} ]
					} ,{
						columnWidth : .25,
						layout : 'form',
						defaultType : 'textfield',
						border : false,
						items : [ new Com.yucheng.crm.common.OrgUserManage({ 
							xtype:'userchoose',
							fieldLabel : '发起人', 
							labelStyle: 'text-align:right;',
							name : 'AUTHOR_NAME',
							hiddenName:'AUTHOR',
							//searchRoleType:('127,47'),  //指定查询角色属性
							searchType:'SUBTREE',/*指定查询机构范围属性  SUBTREE（子机构树）SUBORGS（直接子机构）PARENT（父机构）PARPATH （所有父、祖机构）ALLORG（所有机构）*/
							singleSelect:false,
							anchor : '90%'
							}) ]
					},{
						columnWidth : .25,
						layout : 'form',
						items : [{
							name : 'WFJOBNAME',
							xtype : 'textfield',
							fieldLabel : '工作名称',
							labelStyle : 'text-align:right;',
							width : '100',
							anchor : '90%'
						}  ]
					},{
						columnWidth : .25,
						layout : 'form',
						items : [ ]
					} ]
				},
					
				buts :[{
					text:'流程办理',
					iconCls:'dailyDetailIconCss',
					handler:function(){
					if (listPanel.grid.selModel.hasSelection()) {
						var records = listPanel.grid.selModel.getSelections();// 得到被选择的行的数组
						var recordsLen = records.length;// 得到行数组的长度
						if (recordsLen > 1||recordsLen <1) {
							Ext.Msg.alert("系统提示信息", "请选择其中一条记录！");
						} else {
							var record = listPanel.grid.getSelectionModel()
							.getSelected();
							var wfsigntype = record.get('WFSIGN');
							var wfjobname = record.get('WFJOBNAME');
							curNodeObj.instanceid = record.get('INSTANCEID');
							curNodeObj.nodeid = record.get('NODEID');
							curNodeObj.windowid='viewWindow';
							setTimeout(function(){
								Ext.ScriptLoader.loadScript({        
									scripts: [basepath+'/contents/pages/worklistinfo/worklistinfo_'+wfsigntype+'.js'],   
//									scripts: [basepath+'/contents/pages/worklistinfo/worklistinfo_yjyy_sp.js'],   
									callback: function() {  
								}
								});
							},800);
							var viewWindow = new Ext.Window({
										layout : 'fit',
										id:'viewWindow',
										//width : 1000,
										//height : 400,
										//resizable : false,//是否允许缩放
										draggable : true,//是否可以拖动
										closable : true,// 是否可关闭
										modal : true,
										closeAction : 'close',
										// iconCls : 'page_addIcon',
										//maximizable: true,
										maximized:true,
										listeners:{
										'close':function(){
										listPanel.loadCurrData();
									}
									},
										//collapsible : true,// 是否可收缩
										titleCollapse : true,
										buttonAlign : 'center',
										border : false,
										animCollapse : true,
										animateTarget : Ext.getBody(),
										constrain : true,
										items : [ { 
											html:' <div style="width:100%;height:100%;"><div style="position:absolute; left:0px; top:0px; " id=\'viewEChian\'></div></div>'
												}]
							});
							viewWindow.title = '您查看的业务信息：'+wfjobname;
							viewWindow.show();
//							window.location.href = basepath + '/contents/pages/worklistinfo/worklistinfo_'+wfsigntype+'.jsp?instanceid='+instanceid;
						}
					}
					}
				},{
					text:'审批历史',
					iconCls:'shenpiIconCss',
					handler:function(){
					if (listPanel.grid.selModel.hasSelection()) {
						var records = listPanel.grid.selModel.getSelections();// 得到被选择的行的数组
						var recordsLen = records.length;// 得到行数组的长度
						if (recordsLen > 1) {
							Ext.Msg.alert("系统提示信息", "请选择其中一条记录！");
						} else {
							var record = listPanel.grid.getSelectionModel()
									.getSelected();
							var instanceid = record.get('INSTANCEID');
							var nodeid = record.get('NODEID');
							var wfjobname = record.get('WFJOBNAME');
							var EchainPanelHistory = new Mis.Echain.EchainPanel({
								instanceID:instanceid,
								fOpinionFlag:false,
								width : document.body.scrollWidth,
								height : document.body.scrollHeight-40,
								approvalHistoryFlag:true,
								flowloadFalg:false,
								WindowIdclode:'viewWindow2'
							});
							var viewWindow2 = new Ext.Window(
									{
										layout : 'fit',
										id:'viewWindow2',
										draggable : true,//是否可以拖动
										closable : true,// 是否可关闭
										modal : true,
										closeAction : 'close',
										maximized:true,
										titleCollapse : true,
										buttonAlign : 'center',
										border : false,
										animCollapse : true,
										animateTarget : Ext.getBody(),
										constrain : true,
										items : [EchainPanelHistory]});
							viewWindow2.title = '正在查看的流程：'+wfjobname;
							viewWindow2.show();
							}
						}
					}
				}
				       ]
			});
			
			// 布局模型
			var viewport = new Ext.Viewport( {
				layout : 'fit',
				items : [ listPanel ]
			});
			
		
		});