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
				title : "办结任务列表",
				stUrl : basepath + '/queryworkflowend.json',
//				addUrl:basepath+'/restapply.json',
//				updateUrl:basepath+'/restapply.json',
//				deUrl:basepath+'/restapply!batchDestroy.json',
				primary:'INSTANCEID',
				checkbox : true,
				dbclick:false,
				winHeight : 450,
				winWidth : 800,
//				gridHeight:360,
				gclms : [{
					name : 'INSTANCEID'
				}, {
					name : 'WFJOBNAME',
					header : '工作名称'
				}, {
					name : 'WFNAME',
					header : '流程名称'
				}, {
					name : 'WFSTARTTIME',
					header : '流程开始时间'
				}, {
					name : 'WFENDTIME',
					header : '流程结束时间'
				}, {
					name : 'AUTHOR',
					header : '发起人id',
					hidden:true
				}, {
					name : 'AUTHOR_NAME',
					header : '发起人'
				}, {
					name : 'SPSTATUS',
					header :'审批状态',
					renderer : function(value){
					if(value==0)return '正常办理';
					else return '未知状态';
					}
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
						items : [new Com.yucheng.crm.common.OrgUserManage({ 
							xtype:'userchoose',
							fieldLabel : '发起人', 
							labelStyle: 'text-align:right;',
							name : 'AUTHOR_NAME',
							hiddenName:'AUTHOR',
							//searchRoleType:('127,47'),  //指定查询角色属性
							searchType:'SUBTREE',/*指定查询机构范围属性  SUBTREE（子机构树）SUBORGS（直接子机构）PARENT（父机构）PARPATH （所有父、祖机构）ALLORG（所有机构）*/
							singleSelect:false,
							anchor : '90%'
							})]
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
							var nodeid = 0;
							var wfjobname = record.get('WFJOBNAME');
							var EchainPanelHistory1 = new Mis.Echain.EchainPanel({
								instanceID:instanceid,
								fOpinionFlag:false,
								width : document.body.scrollWidth,
								height : document.body.scrollHeight-40,
								approvalHistoryFlag:true,
								WindowIdclode:'viewWindow4'
							});
							var viewWindow4 = new Ext.Window(
									{
										layout : 'fit',
										id:'viewWindow4',
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
										items : [EchainPanelHistory1]});
							viewWindow4.title = '正在查看的流程：'+wfjobname;
							viewWindow4.show();
							}
						}
					}
				}/*,
				{
					text:'流程意见信息',
					iconCls:'dailyIconCss',
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
							var nodeid = 0;
							var wfjobname = record.get('WFJOBNAME');
							var viewWindow3 = new Ext.Window(
									{
										layout : 'fit',
										id:'viewWindow3',
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
										//collapsible : true,// 是否可收缩
										titleCollapse : true,
										buttonAlign : 'center',
										border : false,
										animCollapse : true,
										animateTarget : Ext.getBody(),
										constrain : true,
										items : [ { 
										         html:' <div style="width:100%;height:100%;"><div style="position:absolute; left:0px; top:0px;height:100%; " id=\'viewport_center2\'><iframe id="content2" name="content2" style="width:100%;height:100%;" frameborder="no"" src=\"../../../echaincommonservlet?method=echainflowdemo&actionType=openform&tab=lcsp&instanceid='+instanceid+'&userid='+__userId+'&orgid='+__units+'\" "/> scrolling="auto"> </iframe></div></div>'}
										         
										    ]});
							viewWindow3.title = '正在查看的流程：'+wfjobname;
							viewWindow3.show();
//							Ext.Msg.alert("INSTANCEID", instanceid);
//							window.location.href = basepath+'/echaincommonservlet?method=echainflowdemo&actionType=openform&tab=lcgz&instanceid='+instanceid+'&nodeid='+nodeid+'&userid='+__userId+'&orgid='+__units;
							}
						}
					}
				}*/
				       ]
			});
			
			// 布局模型
			var viewport = new Ext.Viewport( {
				layout : 'fit',
				items : [ listPanel ]
			});
			
		
		});