Ext.onReady(function() {
	
	var searchFunction = function(){	
		var parameters = simple.getForm().getValues(false);
		papermanageStore.removeAll();
		papermanageStore.baseParams = {
				'condition':Ext.util.JSON.encode(parameters)
			};
		papermanageStore.load({
				params:{
					start:0,
					limit: parseInt(pagesize_combo.getValue())
			}
			});
				};
	//遮挡
	var lm = new Ext.LoadMask(document.body, {// 定义遮屏到body节点上
		msg : '正在加载表格数据,请稍等...',
		removeMask : true
	});
	// 题目类型
		var optionTypeStore = new Ext.data.Store( {
			restful : true,
			autoLoad : true,
			proxy : new Ext.data.HttpProxy( {
				url : basepath + '/lookup.json?name=OPTION_TYPE'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'JSON'
			}, [ 'key', 'value' ])
		});
		optionTypeStore.load();
		
		var typeStore = new Ext.data.Store( {
			restful : true,
			autoLoad : true,
			proxy : new Ext.data.HttpProxy( {
				url : basepath + '/lookup.json?name=IF_FLAG'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'JSON'
			}, [ 'key', 'value' ])
		});
		typeStore.load();
		
		var paperId='';
		// 客户风险信息查询条件
		var simple = new Ext.FormPanel( {
			frame : true,
			id : 'queryGroup',
			bodyStyle : 'padding:5px 5px 0',
			width : '100%',
			labelAlign : 'center',
			items : [ {
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							fieldLabel : '问卷名称',
							labelStyle : 'text-align:right;',
							name : 'paperName2',
							anchor : '90%',
							labelSeparator:''
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							store : optionTypeStore,
							xtype : 'combo',
							labelStyle : 'text-align:right;',
							resizable : true,
							fieldLabel : '答卷人类型',
							name : 'optionType2',
							valueField : 'key',
							displayField : 'value',
							mode : 'local',
							typeAhead : true,
							forceSelection : true,
							triggerAction : 'all',
//							emptyText : '请选择',
							selectOnFocus : true,
							width : '100',
							anchor : '90%',
							labelSeparator:''
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'combo',
							labelStyle : 'text-align:right;',
							resizable : true,
							fieldLabel : '是否启用',
							name : 'available2',
							valueField : 'key',
							displayField : 'value',
							mode : 'local',
							typeAhead : true,
							forceSelection : true,
							triggerAction : 'all',
//							emptyText : '请选择',
							selectOnFocus : true,
							width : '100',
							anchor : '90%',
							store :typeStore,
							labelSeparator:''
						} ]
					}  ]
				} ]
			} ],
			buttonAlign : 'center',
			keys : [ {
				key : 13,
				fn : function() {
					Ext.getCmp('quession_serch').focus(true);
				},
				scope : this
			} ],
			buttons : [ {
				text : '查询',
				id:'quession_serch',
				handler : function() {
				searchFunction();

				}
			}, {
				text : '重置',
				handler : function() {
					simple.getForm().reset();
				}

			} ]
		});


		
		

//		// 列选择模型
		var sm = new Ext.grid.CheckboxSelectionModel();
//		// 定义自动当前页行号
		var rownum = new Ext.grid.RowNumberer({
			header : 'No.',
			width : 28
		});
		
		var papermanageColumns = new Ext.grid.ColumnModel([//gridtable中的列定义
		                                                sm,
		                                               rownum,
		                                               {header :'问卷ID',dataIndex:'id',id:"id",width:100,sortable : true,hidden:true},
		                                               {header :'问卷名称',dataIndex:'paperName',id:"paperName",width:100,sortable : true},
		                                               {header:'答卷人类型',dataIndex:'optionType',id:'optionType',width:100,sortable : true,
		                                            		renderer : function(value) {
		                                       				if (value != '') {
		                                       					var index = optionTypeStore.find('key', value);
		                                       					return optionTypeStore.getAt(index).get('value');
		                                       				}
		                                       			}},
		                                               {header:'创建人',dataIndex:'creator',id:'creator',width:100,sortable : true,hidden:false},	
		                                               {header:'创建机构',dataIndex:'createOrg',id:'createOrg',width:130,sortable : true},
		                                               {header:'创建时间',dataIndex:'createDate',id:'createDate',width:100,sortable : true,hidden:false},	
		                                               {header:'是否启用',dataIndex:'available',id:'available',width:100,sortable : true,
		                                       			renderer : function(value) {
		                                       				if (value != '') {
		                                       					var index = typeStore.find('key', value);
		                                       					return typeStore.getAt(index).get('value');
		                                       				}
		                                       			}},
		                                               {header:'备注',dataIndex:'remark',id:'remark',width:400,sortable : true}
		                                               
		                                               ]);
		var papermanageRecord = new Ext.data.Record.create([
		                                                 {name:'id',mapping:'ID'},
		                                                {name:'paperName',mapping:'PAPER_NAME'},
		                                                {name:'optionType',mapping:'OPTION_TYPE'},
		                                                {name:'creator',mapping:'CREATOR'},
		                                                {name:'createOrg',mapping:'CREATE_ORG'},
		                                                {name:'createDate',mapping:'CREATE_DATE'},
		                                                {name:'available',mapping:'AVAILABLE'},
		                                                {name:'remark',mapping:'REMARK'},
		                                                {name:'choose',mapping:'IS_CHECKED'}
		                                                ]);
		var papermanageReader = new Ext.data.JsonReader({//读取json数据的panel
			totalProperty:'json.count',
			root:'json.data'
		},papermanageRecord);
		
		var papermanageProxy = new Ext.data.HttpProxy({
			url:basepath+'/paperManage.json'
		});
		var papermanageStore = new Ext.data.Store({
			id: 'papermanageStore',
			restful : true,     
	        proxy : papermanageProxy,
	        reader : papermanageReader,
	        recordType:papermanageRecord
		});
		var pagesize_combo = new Ext.form.ComboBox( {
			name : 'pagesize',
			triggerAction : 'all',
			mode : 'local',
			store : new Ext.data.ArrayStore(
					{
						fields : [ 'value', 'text' ],
						data : [ [ 10, '10条/页' ], [ 20, '20条/页' ],
								[ 50, '50条/页' ], [ 100, '100条/页' ],
								[ 250, '250条/页' ], [ 500, '500条/页' ] ]
					}),
			valueField : 'value',
			displayField : 'text',
			value : '20',
			editable : false,
			width : 85
		});
		papermanageStore.load({
			params:{
			start:0,
			limit: parseInt(pagesize_combo.getValue())
		}
		});
		debugger;
		var number = parseInt(pagesize_combo.getValue());
		// 改变每页显示条数reload数据
		pagesize_combo.on("select", function(comboBox) {
			bbar.pageSize = parseInt(pagesize_combo.getValue()), papermanageStore.reload( {
				params : {
					start : 0,
					limit : parseInt(pagesize_combo.getValue())
				}
			});
		});
		var bbar = new Ext.PagingToolbar( {
			pageSize : number,
			store : papermanageStore,
			displayInfo : true,
			displayMsg : '显示{0}条到{1}条,共{2}条',
			// plugins : new Ext.ux.ProgressBarPager(), // 分页进度条
			emptyMsg : "没有符合条件的记录",
			items : [ '-', '&nbsp;&nbsp;', pagesize_combo ]
		});
		
		
		/**
		 * 试卷选题列表
		 * 
		 */
		// 客户风险信息表格面板
		var sm2 = new Ext.grid.CheckboxSelectionModel();
		var rownum = new Ext.grid.RowNumberer( {
			header : 'No.',
			width : 28
		});

		// 定义列模型
		var questionCm = new Ext.grid.ColumnModel( [ rownum,{
			header : '试题标题',
			dataIndex : 'titleName',
			sortable : true,
			menuDisabled : true,
			width : document.body.scrollWidth / 8,
			renderer : function(value, meta, record) {
				meta.attr = 'style="white-space:normaddl;"';
		        		return value;
			}
		}, {
			header : '试题分类',
			dataIndex : 'titleType',
			sortable : true,
			menuDisabled : true,
			width : document.body.scrollWidth / 16,
			renderer : function(value) {
//				if (value != '') {
//					var index = titleTypeStore.find('key', value);
//					return titleTypeStore.getAt(index).get('value');
//				}

			}
		}, {
			header : '选项顺序',
			dataIndex : 'titlesort',
			renderer:function(value,record,e){
			var sortValue =e.json.QUESTION_ORDER;
       		var sort = '<input id='+e.id+'sort type="textfield" value='+sortValue+' />';
       		return  sort;
       		hidden:true
       	},
			width : 165,
			sortable : true
		}, {
			header : '有效标志',
			dataIndex : 'available',
			sortable : true,
			menuDisabled : true,
			width : document.body.scrollWidth / 16,
			renderer : function(value) {
				if (value != '') {
					if (value == '1')
						return '是';
					else if (value == '2')
						return '否';
					else
						return '';
				}
			}

		}, {
			header : '更新人',
			dataIndex : 'updator',
			sortable : true,
			menuDisabled : true,
			width : document.body.scrollWidth / 12
		}, {
			header : '更新时间',
			dataIndex : 'updateDate',
			sortable : true,
			menuDisabled : true,
			width : document.body.scrollWidth / 12
		}, {
			header : 'title_id',
			dataIndex : 'titleId',
			menuDisabled : true,
			hidden : true
		}, {
			header : '选题',
			dataIndex : 'IS_CHECKED',
			width : document.body.scrollWidth / 12,
			renderer:function(value,record,e){
       		var checked =(e.json.IS_CHECKED=='1')?'checked':'';
       		var checkBox = '<input id='+e.id+'_check type="checkbox" '+checked+' />';
       		return  checkBox;
       	},
			menuDisabled : true,
			hidden : false
		} ]);

		var store = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
				url : basepath + '/questionQuery.json'
			}),listeners :{
				'load':function(){lm.hide();}
			},
			reader : new Ext.data.JsonReader( {
				totalProperty : 'json.count',
				root : 'json.data'
			}, [ {
				name : 'titleName',
				mapping : 'TITLE_NAME'
			}, {
				name : 'titleType',
				mapping : 'TITLE_TYPE'
			}, {
				name : 'titleSort',
				type:'number',
				mapping : 'QUESTION_ORDER'
			}, {
				name : 'available',
				mapping : 'AVAILABLE'
			}, {
				name : 'updator',
				mapping : 'USER_NAME'
			}, {
				name : 'updateDate',
				mapping : 'UPDATE_DATE'
			}, {
				name : 'titleId',
				mapping : 'TITLE_ID'
			}, {
				name : 'is_checked',
				mapping : 'IS_CHECKED'
			} ])
		});
		store.load( {
			params : {
				start : 0,
				limit : 20
			}
		});
//		store.on('beforeload', function() {
//			lm.show();
//			var conditionStr = simple.getForm().getValues(false);
//			this.baseParams = {
//				"condition" : Ext.encode(conditionStr)
//			};
//		});
	
		
		// create the Grid
		var questionGrid =  new Ext.grid.EditorGridPanel( {
			id:'questionGrid',
			height : 350,
			width : 790,
			frame : true,
			autoScroll : true,
			region : 'center', // 返回给页面的div
			store : store,
			stripeRows : true, // 斑马线
			cm : questionCm,
			sm : sm2,
//			tbar : tbar,
			bbar : bbar,
			viewConfig : {}
		});		
		
			
		var pagesize_combo = new Ext.form.ComboBox( {
			name : 'pagesize',
			triggerAction : 'all',
			mode : 'local',
			store : new Ext.data.ArrayStore(
					{
						fields : [ 'value', 'text' ],
						data : [ [ 10, '10条/页' ], [ 20, '20条/页' ],
								[ 50, '50条/页' ], [ 100, '100条/页' ],
								[ 250, '250条/页' ], [ 500, '500条/页' ] ]
					}),
			valueField : 'value',
			displayField : 'text',
			value : '20',
			editable : false,
			width : 85
		});
//		questionChooseStore.load({
//			params:{
//			start:0,
//			limit: parseInt(pagesize_combo.getValue())
//		}
//		});
		var number = parseInt(pagesize_combo.getValue());
		// 改变每页显示条数reload数据
		pagesize_combo.on("select", function(comboBox) {
			bbar.pageSize = parseInt(pagesize_combo.getValue()), questionChooseStore.reload( {
				params : {
					start : 0,
					limit : parseInt(pagesize_combo.getValue())
				}
			});
		});
		var bbar = new Ext.PagingToolbar( {
			pageSize : number,
			store :store,
			displayInfo : true,
			displayMsg : '显示{0}条到{1}条,共{2}条',
			// plugins : new Ext.ux.ProgressBarPager(), // 分页进度条
			emptyMsg : "没有符合条件的记录",
			items : [ '-', '&nbsp;&nbsp;', pagesize_combo ]
		});
		
/**
 * 试题选择window
 */
		var questionChooseWin = new Ext.Window(
				{
					id : 'questionChooseWin',
					resizable : false,
					collapsible : false,
					draggable : true,
					closeAction : 'hide',
					modal : true, // 模态窗口
					animCollapse : false,
//					autoScroll : true,
					border : false,
					loadMask : true,
					closable : true,
					constrain : true,
					width :800,
					height : 400,
					title : '试题选择',
					items : [ questionGrid ],

					buttons : [
							{
								text : '保存',
								id : 'save',
								handler : function() {
					        	 var addArray=[] ;
					        	 var deleteArray =[];
					 			for(var j=0;j<questionGrid.store.data.items.length;j++){
									var firstArray = {};
									var secondArray ={};
									var k =questionGrid.store.data.keys;
									var one =document.getElementById(k[j]+"_check");
									var two =document.getElementById(k[j]+"sort");
									var children = questionGrid.store.data.items[j].json;
									if(one.checked==true){
										if (children.IS_CHECKED=='0'){
											firstArray.paper_id=paperId;
											firstArray.question_id=children.TITLE_ID;
											firstArray.sort_id=two.value;
			    							addArray.push(firstArray);
										}
									}else{
										if(children.IS_CHECKED=='1'){
											secondArray.paper_id=paperId;
											secondArray.question_id=children.TITLE_ID;
											secondArray.id=children.ID;
											deleteArray.push(secondArray);
										}
									}
								}
							
					        	 Ext.Ajax.request({
					        		 url:basepath+'/paperManage!saveQuestion.json',
					        		 mothed: 'POST',
					        		 params : {
					        		 'addArray':Ext.encode(addArray),
					        		 'deleteArray':Ext.encode(deleteArray)
					        	 },
					        	 success : function(response) {
//					        		 questionGrid.store.reload();
					        		 Ext.Msg.alert('提示', '保存成功');

					        	 },
					        	 failure : function(response) {
					        		 Ext.Msg.alert('提示', '保存失败'/*response.responseText*/);

					        	 }
						});
					
							}
							}, {
								text : '关闭',
								id : 'close1',
								handler : function() {
								questionChooseWin.hide();
								}
							} ]
				});
		var tbar = new Ext.Toolbar(
				{
					items : [
							{
								text : '新增',
								iconCls : 'addIconCss',
								handler : function() {
									opWin.setTitle('新增问卷');
									
									opWin.show();
									createForm.getForm().getEl().dom.reset();
									Ext.getCmp('creator').setValue(JsContext._userId);
									Ext.getCmp('create_org').setValue(JsContext._unitname);

								}
							},
							{
								text : '查看',
								iconCls : 'detailIconCss',
								handler : function() {
								if(paperManageGrid.getSelectionModel().selections.length>0){
									var _record = paperManageGrid.getSelectionModel().getSelected();
									opWin.setTitle('查看问卷');
//		                   				if (value != '') {
//		                   					var index = typeStore.find('key', value);
//		                   					return typeStore.getAt(index).get('value');
//		                   				}
									Ext.getCmp('paper_name').setDisabled(true);
									Ext.getCmp('option_type').setDisabled(true);
									Ext.getCmp('remark').setDisabled(true);
									Ext.getCmp('available').setDisabled(true);
									Ext.getCmp('save').hide();
									Ext.getCmp('reset').hide();
									createForm.getForm().loadRecord(_record);
									
									opWin.show();
								}else{
									Ext.Msg.alert("系统提示信息",
									"请选择其中一条记录进行查看！");
								}
						
								
							}
							},
							{
								text : '开启',
								iconCls : 'completeIconCss',
								handler : function() {

									var records = paperManageGrid.getSelectionModel().getSelections();
									var recordsLen = records.length;
									var record = paperManageGrid.getSelectionModel().getSelected();
									if (recordsLen != 1) {
										Ext.Msg.alert("系统提示信息",
												"请选择其中一条记录进行开启！");
										return;
									} else if (record.get('available') == '1') {
										Ext.MessageBox.alert('问卷维护', '问卷已经启用！');
										return;
									} else {
										Ext.Ajax.request( {
													url : basepath + '/paperManage!updateState.json',
													mothed : 'POST',
													params : {
														id : record.get('id'),
														available : '1'
													},
													failure : function(form,action) {
														Ext.MessageBox.alert('问卷维护',
																		'启用失败！');
													},
													success : function(response) {
														papermanageStore.load( {
																	params : {
																		start : 0,
																		limit : bbar.pageSize
																	}
																});
														Ext.MessageBox.alert('问卷维护',
																		'启用成功！');
													}
												});
									}
								}
							},
							{
								text : '关闭',
								iconCls : 'closeIconCss',
								handler : function() {
									var records = paperManageGrid.getSelectionModel().getSelections();
									var recordsLen = records.length;
									var record = paperManageGrid.getSelectionModel().getSelected();
									if (recordsLen != 1) {
										Ext.Msg.alert("系统提示信息","请选择其中一条记录进行关闭！");
										return;
									} else if (record.get('available') == '0') {
										Ext.MessageBox.alert('试题维护', '试题已经关闭！');
										return;
									} else {

										Ext.Ajax.request( {
													url : basepath + '/paperManage!updateState.json',
													mothed : 'POST',
													params : {
														id : record.get('id'),
														available : '0'
													},
													failure : function(form,action) {
														Ext.MessageBox.alert('试题维护','关闭失败！');
													},
													success : function(response) {
														papermanageStore.load( {
																	params : {
																		start : 0,
																		limit : bbar.pageSize
																	}
																});
														Ext.MessageBox.alert('试题维护','关闭成功！');
													}
												});
									}

								}
							} ,
							{
								text : '选题',
								iconCls : 'closeIconCss',
								handler : function() {
								if(paperManageGrid.getSelectionModel().selections.length>0){
									var record=paperManageGrid.getSelectionModel().getSelections();
									paperId=paperManageGrid.getSelectionModel().getSelections()[0].json.ID;
									store.load({
								    	
						    			 params : {
						    				'paperId':paperId
						       	 }
									});
									questionChooseWin.show();
								}else{
									Ext.Msg.alert("系统提示信息","请选择其中一条记录进行选题！");
								}
							
							}
							}]
				});
		
		

		// 列表
		var paperManageGrid = new Ext.grid.GridPanel( {
			height : 382,
			width : document.body.scrollWidth,
			frame:true,
			width:'100%',
			id:'paperManageGrid',
			autoScroll : true,
			tbar:tbar,
			bbar:bbar,
			stripeRows : true, // 斑马线
			store:papermanageStore,
			loadMask:true,
			cm :papermanageColumns,
			sm :sm,
			viewConfig:{
				forceFit:false,
				autoScroll:true
			},
		        loadMask : {
			msg : '正在加载表格数据,请稍等...'
		}
//			height : document.body.scrollHeight - 97,
//			width : document.body.scrollWidth,
//			frame : true,
//			autoScroll : true,
//			region : 'center', // 返回给页面的div
//			store : papermanageStore,
//			stripeRows : true, // 斑马线
//			cm : papermanageColumns,
//			sm : sm,
//			tbar : tbar,
//			bbar : bbar,
//			viewConfig : {}
		});
		papermanageStore.load({
			params:{
			start:0,
			limit: parseInt(pagesize_combo.getValue())
		}
		});
	 
		var createForm = new Ext.FormPanel({
			frame : true,
			id : 'createForm',
			bodyStyle : 'padding:5px 5px 0',
			buttonAlign : "center",
			width : '100%',
			labelAlign : 'center',
			items : [ {
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							id : 'paper_name',
							xtype : 'textfield',
							fieldLabel : '问卷名称',
							labelStyle : 'text-align:right;',
							name : 'paperName',
							anchor : '90%',
							allowBlank : false,
							validator : trim,
							labelSeparator:''
						} ]
					}, {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							id : 'option_type',
							store : optionTypeStore,
							xtype : 'combo',
							labelStyle : 'text-align:right;',
							resizable : true,
							fieldLabel : '答卷人类型',
							name : 'optionType',
							hiddenName : 'optionType',
							valueField : 'key',
							displayField : 'value',
							mode : 'local',
							typeAhead : true,
							forceSelection : true,
							triggerAction : 'all',
							emptyText : '请选择',
							selectOnFocus : true,
							width : '100',
							anchor : '90%',
							allowBlank : false,
							validator : trim,
							labelSeparator:''
						} ]
					}, {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							id : 'remark',
							xtype : 'textarea',
							fieldLabel : '备注',
							labelStyle : 'text-align:right;',
							name : 'remark',
							anchor : '90%',
							decimalPrecision : 0,
							maxValue : 100,
							allowNegative : false,
							maxLength : 3,
							allowBlank : false,
							validator : trim,
							labelSeparator:''
						} ]
					}, {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							store :typeStore,
							id : 'available',
							xtype : 'combo',
							labelStyle : 'text-align:right;',
							resizable : true,
							fieldLabel : '是否启用',
							name : 'available',
							mode : 'local',
							emptyText : '请选择',
							selectOnFocus : true,
							valueField : 'key',
							displayField : 'value',
							width : '100',
							anchor : '90%',
							allowBlank : true,
							validator : trim,
							labelSeparator:''
						} ]
					}, {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							id : 'creator',
							xtype : 'textfield',
							labelStyle : 'text-align:right;',
							resizable : true,
							fieldLabel : '创建人',
							name : 'creator',
							mode : 'local',
							value:JsContext._userId,
							hidden:true
						} ]
					} , {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							id : 'create_org',
							xtype : 'textfield',
							labelStyle : 'text-align:right;',
							resizable : true,
							fieldLabel : '创建机构',
							name : 'creator_org',
							value:JsContext._unitname,
							hidden:true
						} ]
					} ]
				} ]
			} ]
		});
		// 客户非本行资产信息行号
		var teamrownum = new Ext.grid.RowNumberer( {
			header : 'No.',
			width : 28
		});

		var teamsm = new Ext.grid.CheckboxSelectionModel();
		// 客户非本行资产信息定义列模型
		var teamcm = new Ext.grid.ColumnModel( [ teamrownum, {

			header : '选项内容',
			dataIndex : 'result',
			width : 300,
			editor : new Ext.form.TextField( {
				id : 'CREATE_RESULT'
			}),
			sortable : true,
			renderer : function(value, meta, record) {
				meta.attr = 'style="white-space:normal;"';
				return value;
			}
		}, {
			header : '选项分值',
			hidden:true,
			dataIndex : 'resultScoring',
			//可以输入负数 修改 2012-07-22 兰超
			editor : new Ext.form.TextField( {
				id : 'CREATE_RESULT_SCORING',
				regex :/^[-]?\d*[.]?(\d{0})?$/,

			//	decimalPrecision : 0,
				
			//	allowNegative : true,  
//				minLength : 1,
				//可以输入负数 修改 2012-07-22 兰超	
				maxLength : 3,			
				minLengthText : '该字段不可为空'
			}),
			width : 165,
			sortable : true
		}, {
			header : '选项顺序',
			dataIndex : 'resultSort',
			editor : new Ext.form.NumberField( {
				id : 'CREATE_RESULT_SORT',
				decimalPrecision : 0,
				allowNegative : false,
				maxLength : 3,
				minLength : 1,
				minLengthText : '该字段不可为空'
			}),
			width : 165,
			sortable : true
		} ]);

		// 客户非本行资产信息数据存储
		var teamstore = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
				url : basepath + '/RiskQuession!findResult.json'
			}),
			reader : new Ext.data.JsonReader( {
				totalProperty : 'json.count',
				root : 'json.data'
			}, [ {
				name : 'result',
				mapping : 'RESULT'
			}, {
				name : 'resultScoring',
				mapping : 'RESULT_SCORING'
			}, {
				name : 'resultSort',
				mapping : 'RESULT_SORT'
			} ])
		});
		var tbar2 = new Ext.Toolbar( {
			items : [ {
				id : 'createResult',
				text : '新增',
				handler : function() {
					teamstore.add(new Ext.data.Record);
				}
			}, {
				id : 'deleteResult',
				text : '删除',
				handler : function() {
					var records = teamgrid.getSelectionModel().getSelections();
					var recordsLen = records.length;
					if (recordsLen < 1) {
						Ext.Msg.alert("系统提示信息", "请选择记录后进行删除！");
						return;
					} else {
						teamstore.remove(records);
					}
				}
			} ]
		});
		// 答案
		var teamgrid = new Ext.grid.EditorGridPanel( {
			// title : '资产信息',
			height : 300,
			frame : true,
			overflow : 'auto',
			autoScroll : true,
			store : teamstore, // 数据存储
			stripeRows : true, // 斑马线
			cm : teamcm, // 列模型
			sm : teamsm,
			// bbar : bbar,
			tbar : tbar2,
			loadMask : {
				msg : '正在加载表格数据,请稍等...'
			}
		});

		var opWin = new Ext.Window(
				{
					id : 'opWin',
					resizable : false,
					collapsible : false,
					draggable : true,
					closeAction : 'hide',
					modal : true, // 模态窗口
					animCollapse : false,
					border : false,
					loadMask : true,
					closable : true,
					constrain : true,
					width : 700,
					height : 175,
					title : '新增问卷',
					items : [ createForm ],

					buttons : [
							{
								text : '保存',
								id : 'score_count2',
								handler : function() {
								
								debugger;
								
								if(!createForm.getForm().isValid())
								{ 
									Ext.Msg.alert('提示','输入信息有误');
									return false;
								}else if(
									
    									Ext.Ajax.request({
    									    url:basepath+'/paperManage!save.json',
    									    mothed: 'POST',
    										params : createForm.getForm().getFieldValues(),
    										success : function(response) {
    										papermanageStore.reload();
    										Ext.Msg.alert('提示','新建成功!');
    										opWin.hide();
    										
    									},
    									failure : function(response) {
    										Ext.Msg.alert('提示','新建失败');
    									}
    									})
										);
							}
							}, {
								text : '重置',
								id : 'reset',
								handler : function() {
									teamstore.removeAll();
									createForm.getForm().reset();
								}
							}, {
								text : '关闭',
								id : 'close',
								handler : function() {
									opWin.hide();
								}
							} ]
				});

		opWin.on('hide',function(){
			Ext.getCmp('paper_name').setDisabled(false);
			Ext.getCmp('option_type').setDisabled(false);
			Ext.getCmp('remark').setDisabled(false);
			Ext.getCmp('available').setDisabled(false);
			Ext.getCmp('score_count2').hide();
			Ext.getCmp('reset').hide();
			
		});

		/**
	      * 输入项校验空格
	      */
	     function trim(_v) {         
	        if( _v != _v.trim()) {
	        	return  false;
	    	}
	        	return true;
	     };
	     //'trimText' : '输入项项首项尾有空格'
		
		/*******************整体显示布局******************/
		var viewport = new Ext.Viewport({
			layout : 'fit',
			frame : true,
			items : [{
				layout:'border',
				items:[{
					region : 'north',
					id : 'north-panel',
					title : "题库管理->问卷管理",
					height : 100,
					hidden : false,
					margins : '0 0 0 0',
					items : [ simple ]
				},{
					region : 'center',
					id : 'center-panel',
					margins : '0 0 0 0',
					items : [ paperManageGrid ]
				}]
			}]
		});

	});