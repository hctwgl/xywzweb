Ext.onReady(function() {
	Ext.QuickTips.init();
		// 审批状态下拉框的数据查询
		var appStatusStore = new Ext.data.Store( {
			restful : true,
			autoLoad : true,
			proxy : new Ext.data.HttpProxy( {
				url : basepath + '/lookup.json?name=APPROVEL_STATUS'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'JSON'
			}, [ 'key', 'value' ])
		});
		appStatusStore.load();
		//证件类型
		var certTypStore = new Ext.data.Store( {
			restful : true,
			autoLoad : true,
			proxy : new Ext.data.HttpProxy( {
				url : basepath + '/lookup.json?name=PAR0100006'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'JSON'
			},['key','value'])
		});
		certTypStore.load();
		//客户类型
		var custTypStore = new Ext.data.Store( {
			restful : true,
			autoLoad : true,
			proxy : new Ext.data.HttpProxy( {
				url : basepath + '/lookup.json?name=CDE0100018'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'JSON'
			},['key','value'])
		});
		custTypStore.load();
		//客户状态
		var custStatStore = new Ext.data.Store( {
			restful : true,
			autoLoad : true,
			proxy : new Ext.data.HttpProxy( {
				url : basepath + '/lookup.json?name=ABC0100020'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'JSON'
			},['key','value'])
		});
		custStatStore.load();
		//客户级别
		var custLevStore = new Ext.data.Store( {
			restful : true,
			autoLoad : true,
			proxy : new Ext.data.HttpProxy( {
				url : basepath + '/lookup.json?name=CDE0100016'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'JSON'
			},['key','value'])
		});
		custLevStore.load();
		
		//合并字段嵌入form
		var mergeAppPanel = new Ext.FormPanel( {
			frame : true,
			autoScroll : true,
			items : [ {
				layout : 'column',
				items : [{
					layout : 'form',columnWidth : .5,labelWidth:100,
					items : [ {id : 'createDate',name : 'createDate',allowBlank:false,xtype : 'datefield',fieldLabel : '申请日期',labelStyle : 'text-align:right;',anchor : '95%'}]
				},{
					layout : 'form',columnWidth : .5,labelWidth:100,
					items : [ {id : 'applyReason',name : 'applyReason',allowBlank:false,xtype : 'textarea',fieldLabel : '合并理由',labelStyle : 'text-align:right;',anchor : '95%'}]
				}]
			}]
		});
		//行选择
		var sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect : true
		});
		var rownum = new Ext.grid.RowNumberer({ header : 'No.',width : 28 });  	//行号
		//已选择 合并的客户信息展现,待合并列模型
		var mergeCm = new Ext.grid.ColumnModel([rownum,sm,
		       {
				 	header : '客户编号',
				 	dataIndex : 'custId',
				 	sortable : true,
				 	width : 100
		       },{
				 	header : '客户中文名称',
				 	dataIndex : 'custZhName',
				 	width : 120
		       }
		]);
		//记录
		var mergeRecord = Ext.data.Record.create([
	        {name: 'custId'},
	        {name: 'custZhName'}
	    ]);
	     var mergeStore = new Ext.data.Store({
	    	 reader: new Ext.data.JsonReader({
	        	 root : 'mergeData'
	         },mergeRecord )
	     });
		
		//已选择合并的客户,待合并客户信息展现
		var mergeGrid = new Ext.grid.EditorGridPanel({
			id : 'mergeGrid',
			title : '<span style="font-weight:normal">待合并的客户列表</span>',
			height : 250,
			
			autoScroll : true,
			store : mergeStore, 			// 数据存储
			stripeRows : true, 				// 斑马线
			cm : mergeCm, 				    // 列模型
			sm : sm,						//行选择
			loadMask : { msg : '正在加载表格数据,请稍等...' }
		});
		
		//客户合并 模态窗口
		var custMergeWin = new Ext.Window({
			plain : true,
			//layout : 'fit',
			resizable : true,
			draggable : true,
			closable : true,
			autoScroll : true,
			closeAction : 'hide',
			modal : true, // 模态窗口
			shadow : true,
			loadMask : true,
			maximizable : true,
			collapsible : true,
			titleCollapse : true,
			border : false,
			width : 600,
			height : 400,
			buttonAlign : "center",
			title : '合并客户申请',
			items : [mergeAppPanel,mergeGrid],
			buttons : [{
		    	text:'合并申请',
		    	
		    	handler:function(){
					var grid = Ext.getCmp('mergeGrid').getSelectionModel().getSelected();;
					if (!grid){
						Ext.Msg.alert('提示', '请选择一个客户为目标合并客户!');
						return false;
					}
					if (!mergeAppPanel.form.isValid()){
						return false;
					}
					//目标合并客户信息
					var targetCustInfo = '';
					targetCustInfo += grid.data["custId"] + ',';
					targetCustInfo += grid.data["custZhName"] + ',';
					//加入申请相关信息
					var createDate = Ext.getCmp('createDate').getValue();//申请日期
					var applyReason = Ext.getCmp('applyReason').getValue();//申请理由
					targetCustInfo += createDate + ',';//加入申请日期
					targetCustInfo += applyReason;//加入申请理由
					
					//记录申请合并的所有客户信息
					var hbSelectRecords = '';
					var hbSet = mergeGrid.store.data.items;
					for (var i=0; i<hbSet.length; i++){
						var record = hbSet[i].data;
						hbSelectRecords += record["custId"] + ',';//合并客户编号
						hbSelectRecords += record["custZhName"];//合并客户中文名
						if (i != hbSet.length - 1) {
							hbSelectRecords += "&";
						}
					}
					
					
					Ext.Ajax.request({
						url : basepath + '/custDescHhbInfo-info!hbCustInfoApply.json',
						params : {
							data : hbSelectRecords,
							selectRecord : targetCustInfo
						},
						waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
						method : 'POST',
						scope : custMergeWin,
						success : function(a,b) {
							Ext.Msg.alert('提示', '操作成功');							
							hhbListPanel.loadCurrData();
						},
						failure : function(a,b) {
						 	Ext.Msg.alert('提示', '操作失败');							
							hhbListPanel.loadCurrData();
						}
					});
					custMergeWin.hide();
					
				}
			},{
		    	text:'取消',handler:function(){custMergeWin.hide();}
		    }]
		    
		});
		
		// 合并客户信息的展现panel
		var hhbListPanel = new Mis.Ext.CrudPanel( {
			id : "hhbListPanel",
			title : "客户合并->待合并客户查询",
			closable:false,	//在选项卡上，不显示关闭按钮
			stUrl : basepath + '/custDescHhbInfo-info!indexPage.json',
			//applyUrl : basepath + '/lat_apply_info!apply.json',
			primary : "custId",
			dbclick : false,	
			checkbox : true,
			// 定义查询条件Form的高度
//			seFormHeight : 100,
			// 定义增删详情页面弹出窗口高度
			winHeight : 250,
			//宽度
			winWidth : 600,
			// 设置分页每页显示条数，若不设置则不出现分页栏
			pagesize : 20,
			
			buts : [
			{
				id : 'mergeInfo',
				xtype : 'button',
				tooltip : '合并申请',
				text : '合并申请',
				iconCls:'completeIconCss',
				listeners : {
					click : function(n) {
								if (hhbListPanel.grid.selModel.hasSelection()) {
									var record = hhbListPanel.grid.getSelectionModel().getSelections();
									//var records = [];
									var json={'mergeData':[]};
									for (var i = 0; i < record.length; i++) {
										//records[i] = record[i].json;
										json.mergeData.push(record[i].json);
									}
									mergeStore.loadData(json);
									custMergeWin.show();
								} else {
									Ext.Msg.alert("提示", "请先选择要申请合并的客户!");
								}
					}
				}
			}],
		
			// 查询字段定义，若不定义则不出现查询条件From
			selectItems :{items:[
				util.layout._tr([util.form._td({name : 'custZhName',columnWidth: .25,xtype : 'textfield',fieldLabel : '客户中文名称'})],
								[util.form._td({name : 'certType',columnWidth: .25,xtype : 'combo',fieldLabel : '证件类型',store : certTypStore,valueField : 'key',displayField : 'value'})],
								[util.form._td({name : 'certNum',columnWidth: .25,xtype : 'textfield',fieldLabel : '证件号码'})]
								
								)
			]},
			// 查询列表字段定义，有header属性则在页面显示
			// 如果需要做映射需要定义store , mappingkey ,mappingvalue 三个属性
			gclms : [ {name : 'custId',header : '客户编号'},
			          {name : 'custStat',header : '客户状态',type : 'mapping',store : custStatStore,mappingkey : 'key',mappingvalue : 'value'}, 
			          {name : 'custZhName',header : '客户中文名称'}, 
			          {name : 'certType',header : '证件类型',type : 'mapping',store : certTypStore,mappingkey : 'key',mappingvalue : 'value'}, 
			          {name : 'certNum',sortable : true,header : '证件号码'},
			          {name : 'custTyp',header : '客户类型',type : 'mapping',store : custTypStore,mappingkey : 'key',mappingvalue : 'value'},
			          {name : 'custLev',sortable : true,header : '客户级别',type : 'mapping',store : custLevStore,mappingkey : 'key',mappingvalue : 'value'}
			        ]
	
		});
		
		//合并审批panel
		var hhbAppListPanel = new Mis.Ext.CrudPanel( {
			id : "hhbAppListPanel",
			title : "合并客户->合并审批",
			closable:false,	//在选项卡上，不显示关闭按钮
			stUrl : basepath + '/ocrmFCiHhbApplyInfo-info!indexPage.json',
			detailUrl : basepath + '/ocrmFCiHhbApplyInfo-info!indexPage.json',
			approvelURl : basepath + '/ocrmFCiHhbApplyInfo-info!approvelBack.json',
			
			primary : "id",
			// 采用单选框
			singleSelect : true,
			// 定义查询条件Form的高度
			seFormHeight : 100,
			// 定义增删详情页面弹出窗口高度
			winHeight : 300,
			//宽度
			winWidth : 600,
		
			spIdStr : '',
			hbCustId : '',
			//自定义按钮
			buts : [
			{
				id : 'shenpi',
				xtype : 'button',
				tooltip : '审批',
				iconCls:'shenpiIconCss',
				text : '审批',
				listeners : {
					click : function(n) {
						if (hhbAppListPanel.grid.selModel.hasSelection()) {
							var records = hhbAppListPanel.grid.selModel.getSelections();// 得到被选择的行的数组
							var recordsLen = records.length;// 得到行数组的长度
							if (recordsLen > 1) {
								Ext.Msg.alert("系统提示信息", "请选择其中一条记录进行审批！");
							} else {
								var record = hhbAppListPanel.grid.getSelectionModel()
										.getSelected();
								var id = record.get(hhbAppListPanel.primary);
								hhbAppListPanel.opUrl = hhbAppListPanel.approvelURl;
								
								hhbAppListPanel.spIdStr = records[0].get(hhbAppListPanel.primary);
								hhbAppListPanel.hbCustId = records[0].get('hbCustId');
								var approvelStatus = records[0].get('approvelStatus');
								var winButsArray = [];
								//审批状态中2为已审批
								if (approvelStatus == '1') {
									winButsArray.push({text : "通过",handler : hhbAppListPanel.approvel , scope : hhbAppListPanel});
									winButsArray.push({text : "不通过",handler : hhbAppListPanel.approvelBack, scope : hhbAppListPanel});
								}
								winButsArray.push({text : "关闭",handler : hhbAppListPanel.closeWin,scope : hhbAppListPanel});
								hhbAppListPanel.winButs = winButsArray;
								hhbAppListPanel.showWin();
					    		if(hhbAppListPanel.editFun)
					    			hhbAppListPanel.editFun();
					    		if(hhbAppListPanel.stUrl)
					    			hhbAppListPanel.seOneRecord(id);
					    		else if(hhbAppListPanel.demoData)
					    			hhbAppListPanel.fp.getForm().loadRecord(record);
							}
						} else {
							Ext.Msg.alert("提示", "请先选择要审批的记录!");
						}
					}
			}
			}],
			
			//审批通过
			approvel : function() {
				Ext.Ajax.request({
					url : basepath + '/ocrmFCiHhbApplyInfo-info!approvel.json',
					params : {
						idStr : hhbAppListPanel.spIdStr,	
						hbCustId : hhbAppListPanel.hbCustId
					},
					waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
					method : 'POST',
					scope : hhbAppListPanel,
					success : function() {
						Ext.Msg.alert('提示', '操作成功');
						hhbAppListPanel.loadCurrData();
					},
					failure : function() {
						Ext.Msg.alert('提示', '操作失败');
						hhbAppListPanel.loadCurrData();
					}
				});
				hhbAppListPanel.closeWin();
			},
				
			//审批不通过
			approvelBack : function() {
					Ext.Ajax.request({
						url : hhbAppListPanel.approvelURl,
						params : {
							idStr : hhbAppListPanel.spIdStr
						},
						waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
						method : 'POST',
						scope : hhbAppListPanel,
						success : function() {
							Ext.Msg.alert('提示', '操作成功');
							hhbAppListPanel.loadCurrData();
						},
						failure : function() {
							Ext.Msg.alert('提示', '操作失败');
							hhbAppListPanel.loadCurrData();
						}
					});
					hhbAppListPanel.closeWin();
			},	
		
			// 设置分页每页显示条数，若不设置则不出现分页栏
			pagesize : 20,
			//重载afterSeOneFun方法，加载一条数据后做的特殊处理
			afterSeOneFun : function(b) {
				//debugger;
				Ext.getCmp('sub_createDate').setValue(new Date(b.createDate.time));
			},
			// 查询字段定义，若不定义则不出现查询条件From
			selectItems :{items:[
				util.layout._tr([util.form._td({name : 'approvelStatus',columnWidth: .25,xtype : 'combo',fieldLabel : '审批状态',store : appStatusStore,valueField : 'key',displayField : 'value'})],
								[util.form._td({name : 'tarCustId',columnWidth: .25,xtype : 'textfield',fieldLabel : '目标客户编号'})],
								[util.form._td({name : 'hbCustId',columnWidth: .25,xtype : 'textfield',fieldLabel : '合并客户编号'})]
								)
			]},
			// 查询列表字段定义，有header属性则在页面显示
			// 如果需要做映射需要定义store , mappingkey ,mappingvalue 三个属性
			gclms : [ {name : 'id'},
			          {name : 'approvelStatus',header : '审批状态',type : 'mapping',store : appStatusStore,mappingkey : 'key',mappingvalue : 'value'}, 
			          {name : 'tarCustId',header : '目标客户编号'}, 
			          {name : 'tarCustName',header : '目标客户名称'}, 
			          {name : 'hbCustId',header : '合并客户编号'}, 
			          {name : 'hbCustName',header : '合并客户名称'}, 
			          {name : 'applyUser',header : '申请人'}, 
			          {name : 'applyInit',header : '申请人机构'}, 
			          {name : 'createDate',header : '申请日期',type : 'date'}, 
			          {name : 'applyReason',header : '合并理由'}
			        ],
			
			// 新增、修改、详情的form的字段
			formColums :function(){
				return new Ext.form.FieldSet({items:[
					util.layout._tr([util.form._td({name : 'approvelStatus',xtype : 'combo',fieldLabel : '审批状态',disabled : true,store : appStatusStore,valueField : 'key',displayField : 'value'})],
									[util.form._td({id : 'sub_createDate',name : 'createDate',fieldLabel : '申请日期',disabled : true,xtype : 'datefield',readOnly : true})]
									),
					util.layout._tr([util.form._td({name : 'tarCustId',fieldLabel : '目标客户编号',disabled : true,xtype : 'textfield'})],
									[util.form._td({name : 'tarCustName',fieldLabel : '目标客户名称',disabled : true,xtype : 'textfield'})]
									),
					util.layout._tr([util.form._td({name : 'hbCustId',fieldLabel : '合并客户编号',disabled : true,xtype : 'textfield'})],
									[util.form._td({name : 'hbCustName',fieldLabel : '合并客户名称',disabled : true,xtype : 'textfield'})]
					),
					util.layout._tr([util.form._td({name : 'applyUser',fieldLabel : '申请人',disabled : true,xtype : 'textfield'})],
									[util.form._td({name : 'applyInit',fieldLabel : '申请人机构',disabled : true,xtype : 'textfield'})]
					),
					util.layout._tr([util.form._td({name : 'applyReason',fieldLabel : '合并理由',disabled : true,xtype : 'textarea',maxLength : 600})]
					),
					util.layout._tr([util.form._td({name : 'id',xtype : 'hidden'})]
					)
			]});}
		});
		
		
		//合并历史记录panel
		var mergeHisPanel = new Mis.Ext.CrudPanel( {
			id : "mergeHisPanel",
			title : "客户合并历史信息",
			closable:false,	//在选项卡上，不显示关闭按钮
			stUrl : basepath + '/ocrmFCiHhbMapping-info!indexPage.json',
			primary : "id",
			dbclick : false,
			checkbox : false,
			// 定义查询条件Form的高度
			seFormHeight : 100,
			// 定义增删详情页面弹出窗口高度
			winHeight : 300,
			//宽度
			winWidth : 600,
			// 设置分页每页显示条数，若不设置则不出现分页栏
			pagesize : 20,
			//重载afterSeOneFun方法，加载一条数据后做的特殊处理
			afterSeOneFun : function(b) {
				//debugger;
				Ext.getCmp('hhbDt').setValue(new Date(b.hhbDt.time));
			},
			// 查询字段定义，若不定义则不出现查询条件From
			selectItems :{items:[
				util.layout._tr([util.form._td({name : 'sourceCustId',xtype : 'textfield',fieldLabel : '源客户号',columnWidth: .25})],
								[util.form._td({name : 'targetCustId',xtype : 'textfield',fieldLabel : '目标客户号',columnWidth: .25})],
								[util.form._td({name : 'hhbDt',xtype : 'datefield',fieldLabel : '合并日期',columnWidth: .25})]
								)
			]},
			// 查询列表字段定义，有header属性则在页面显示
			// 如果需要做映射需要定义store , mappingkey ,mappingvalue 三个属性
			gclms : [{name : 'id'},
			         {name : 'sourceCustId',header : '源客户号'},
			         {name : 'targetCustId',header : '目标客户号'},
			         {name : 'hhbDt',header : '合并日期',type : 'date'}
			]
			
		});
		
		// 布局模型
		var tabs = new Ext.TabPanel({
			xtype:"tabpanel",			   			   
			region:"center",
			activeTab: 0,
		    items: [hhbListPanel,hhbAppListPanel,mergeHisPanel]
		});
		var viewport = new Ext.Viewport( {
			layout : 'fit',
			items : [ tabs ]
		});
		
	
});			