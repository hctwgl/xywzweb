Ext.onReady(function() {
			Ext.QuickTips.init();
			
			var statusStore = new Ext.data.Store({
				restful : true,
				autoLoad : true,
				sortInfo:{
					field:'key',
					direction:'ASC'
				},
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/lookup.json?name=XYWZ_WARE_STATUS'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			
			var qForm = new Ext.form.FormPanel({
				title : "手动入库查询",
				labelWidth : 90, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'right', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 100,
				items : [ {
					layout : 'column',
					items : [  {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'prdName',
							fieldLabel : '品名',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'combo',
							fieldLabel : '仓库标志',
							editable : false,
							hiddenName : 'storeStatus',
							triggerAction : 'all',
							mode : 'local',
							emptyText : '请选择',
							store : statusStore,
							valueField : 'key',
							displayField : 'value',
							name : 'storeStatus',
							anchor : '90%'
						} ]
					}]
				} ],
				buttons : [ {
					text : '查询',
					handler : function() {
						var conditionStr = qForm.getForm().getValues(false);
						store.baseParams = {
							"condition" : Ext.encode(conditionStr)
						};
						store.load({
							params : {
								start : 0,
								limit : parseInt(pagesize_combo.getValue())
							}
						});

					}

				},{
					text : '重置',
					handler : function() {
	                	qForm.getForm().reset();
					}

				} ]
			});
			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
				header : 'No.',
				width : 28
			});

			var record = Ext.data.Record.create([{name : 'storeId',
				   mapping : 'STORE_ID'
			  }, {
			  name : 'storeStatus',
			   mapping : 'STORE_STATUS'
			  }, {
				  name : 'storeStatusOra',
				   mapping : 'STORE_STATUS_ORA'
			  }, { 
			  name : 'prdName',
			   mapping : 'PRD_NAME'
			  }, {
			  name : 'spcModel',
			   mapping : 'SPC_MODEL'
			  }, {
			  name : 'ngtvPoor',
			   mapping : 'NGTV_POOR'
			  }, {
			  name : 'denst',
			   mapping : 'DENST'
			  }, {
			  name : 'len',
			   mapping : 'LEN'
			  }, {
			  name : 'zhiCnt',
			   mapping : 'ZHI_CNT'
			  }, {
			  name : 'jianCnt',
			   mapping : 'JIAN_CNT'
			  }, {
			  name : 'remZhiCnt',
			   mapping : 'REM_ZHI_CNT'
			  }, {
			  name : 'weight',
			   mapping : 'WEIGHT'
			  }, {
			  name : 'memo',
			   mapping : 'MEMO'
			  }, {
			  name : 'workshop',
			   mapping : 'WORKSHOP'
			  }, {
			  name : 'intoWhsDt',
			   mapping : 'INTO_WHS_DT'
			  }, {
			  name : 'intoWhsExecPers',
			   mapping : 'INTO_WHS_EXEC_PERS'
			  }, {
			  name : 'lastOprPers',
			   mapping : 'LAST_OPR_PERS'
			  }, {
			  name : 'finalOprDt',
			   mapping : 'FINAL_OPR_DT'
			  }
			  ]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm,  {header : '仓库ID',
				   width : 120,
				   hidden:true,
				   dataIndex : 'storeId',
				   sortable : true
				  }, {
				  header : '仓库标志',
				   width : 120,
				   dataIndex : 'storeStatusOra',
				   sortable : true
				  }, {
					  header : '仓库标志',
					   width : 120,
					   dataIndex : 'storeStatus',
					   hidden:true,
					   sortable : true
				}, {
				  header : '品名',
				   width : 180,
				   dataIndex : 'prdName',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 180,
				   dataIndex : 'spcModel',
				   sortable : true
				  }, {
				  header : '负差',
				   width : 120,
				   dataIndex : 'ngtvPoor',
				   sortable : true
				  }, {
					  header : '重量（吨）',
					   width : 100,
					   dataIndex : 'weight',
					   sortable : true
				  }, {
				  header : '密度',
				   width : 100,
				   dataIndex : 'denst',
				   sortable : true
				  }, {
				  header : '长度（米）',
				   width : 100,
				   dataIndex : 'len',
				   sortable : true
				  }, {
				  header : '支/件',
				   width : 100,
				   dataIndex : 'zhiCnt',
				   sortable : true
				  }, {
				  header : '件数',
				   width : 100,
				   dataIndex : 'jianCnt',
				   sortable : true
				  }, {
				  header : '零支',
				   width : 100,
				   dataIndex : 'remZhiCnt',
				   sortable : true
				  },{
				  header : '入库日期',
				   width : 120,
				   dataIndex : 'intoWhsDt',
				   hidden:true,
				   sortable : true
				  }, {
				  header : '入库执行人',
				   width : 120,
				   dataIndex : 'intoWhsExecPers',
				   hidden:true,
				   sortable : true
				  }, {
				  header : '最后一次操作人',
				   width : 120,
				   dataIndex : 'lastOprPers',
				   sortable : true
				  }, {
				  header : '最后操作日期',
				   width : 120,
				   dataIndex : 'finalOprDt',
				   sortable : true
				  }, {
					  header : '备注',
					   width : 120,
					   dataIndex : 'memo',
					   sortable : true
					  }
				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzWareManualStorageQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'ORDR_ID',
					messageProperty : 'message',
					root : 'json.data',
					totalProperty : 'json.count'
				}, record)
			});

			// 每页显示条数下拉选择框
			var pagesize_combo = new Ext.form.ComboBox({
				name : 'pagesize',
				triggerAction : 'all',
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'value', 'text' ],
					data : [ [ 10, '10条/页' ], [ 20, '20条/页' ], [ 50, '50条/页' ],
								[ 100, '100条/页' ], [ 250, '250条/页' ],
								[ 500, '500条/页' ] ]
				}),
				valueField : 'value',
				displayField : 'text',
				value : '20',
				editable : false,
				width : 85
			});

			// 默认加载数据
			store.load({
				params : {
					start : 0,
					limit : parseInt(pagesize_combo.getValue())
				}
			});

			// 改变每页显示条数reload数据
			pagesize_combo.on("select", function(comboBox) {
				bbar.pageSize = parseInt(pagesize_combo.getValue()),
				store.reload({
					params : {
						start : 0,
						limit : parseInt(pagesize_combo.getValue())
					}
				});
			});
			// 分页工具栏
			var bbar = new Ext.PagingToolbar({
				pageSize : parseInt(pagesize_combo.getValue()),
				store : store,
				displayInfo : true,
				displayMsg : '显示{0}条到{1}条,共{2}条',
				emptyMsg : "没有符合条件的记录",
				items : [ '-', '&nbsp;&nbsp;', pagesize_combo ]
			});
			// 表格工具栏
			var tbar = new Ext.Toolbar(
					{
						items : [
									{
										text : '新增',
										iconCls : 'addIconCss',
										handler : function() {
											addXywzWareManualStorageForm.getForm().reset();
											addXywzWareManualStorageWindow.show();
										}
									},{
										text : '修改',
										iconCls : 'editIconCss',
										handler : function() {

										var selectLength = grid.getSelectionModel().getSelections().length;
										var selectRe = grid.getSelectionModel().getSelections()[0];
										if (selectLength != 1) {
											Ext.Msg.alert('提示','请选择一条记录!');
										} else {
											if(selectRe.data.storeStatus!='01'&&selectRe.data.storeStatus!='04'){
												Ext.Msg.alert('提示','只有待提交状态的才能修改!');
												return;
											}
											editXywzWareManualStorageForm.getForm().loadRecord(selectRe);
											editXywzWareManualStorageWindow.show();

										}
									
											
										}
									},{
										text : '删除',
										iconCls : 'deleteIconCss',
										handler : function() {
										var selectLength = grid.getSelectionModel().getSelections().length;
										var selectRe = grid.getSelectionModel().getSelections()[0];
										if (selectLength != 1) {
											Ext.Msg.alert('提示','请选择一条记录!');
										}else {
											if(selectRe.data.storeStatus!='01'){
												Ext.Msg.alert('提示','只有待提交状态的才能删除!');
												return;
											}
											Ext.MessageBox.confirm('提示','确定删除吗?',function(buttonId){
											if(buttonId.toLowerCase() == "no"){
												return;
											}  
										var selectRe;
										var tempId;
										var tempCount;
										var idStr = '';
										for ( var i = 0; i < selectLength; i++) {
											selectRe = grid.getSelectionModel().getSelections()[i];
											tempId = selectRe.data.storeId;
											idStr += tempId;
											if (i != selectLength - 1)
												idStr += ',';
											}
											Ext.Ajax.request({
													url : basepath+ '/XywzWareManualStorageAction!batchDestroy.json?idStr='+ idStr,
													waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
													success : function() {
													Ext.Msg.alert('提示', '操作成功!' );
														store.reload();
													},
													failure : function() {
													
														Ext.Msg.alert('提示', '操作失败!' );
													}
												});

									})
									;
								}
							}
									},{
										text : '提交质检',
										iconCls : 'publishIconCss',
										handler : function() {
										var selectLength = grid.getSelectionModel().getSelections().length;
										var selectRe = grid.getSelectionModel().getSelections()[0];
										if (selectLength != 1) {
											Ext.Msg.alert('提示','请选择一条记录!');
										}else {
											if(selectRe.data.storeStatus!='01'){
												Ext.Msg.alert('提示','只有待提交状态的才能提交!');
												return;
											}
											Ext.MessageBox.confirm('提示','确定提交吗?',function(buttonId){
											if(buttonId.toLowerCase() == "no"){
												return;
											}  
										var selectRe;
										var tempId;
										var tempCount;
										var idStr = '';
										for ( var i = 0; i < selectLength; i++) {
											selectRe = grid.getSelectionModel().getSelections()[i];
											tempId = selectRe.data.storeId;
											idStr += tempId;
											if (i != selectLength - 1)
												idStr += ',';
											}
											Ext.Ajax.request({
													url : basepath+ '/XywzWareManualStorageAction!submitCheck.json?idStr='+ idStr,
													waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
													success : function() {
													Ext.Msg.alert('提示', '操作成功!' );
														store.reload();
													},
													failure : function() {													
														Ext.Msg.alert('提示', '操作失败!' );
													}
												});

									})
									;
								}
							}
									}]
					});			
			
			// 新增窗口展示的from
			var addXywzWareManualStorageForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 300,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [{
			            columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'storeId',
			            hidden:true,
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            hidden:true,
			            name : 'storeStatus',
			            fieldLabel : '仓库标志',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '<font color=red>*</font>规格型号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'spcModel',
									id : 'SIZE33',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SIZE33').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										addXywzWareManualStorageForm.getForm().findField('spcModel').setValue(records[0].data.SIZE_CONCAT);
										addXywzWareManualStorageForm.getForm().findField('prdName').setValue(records[0].data.HS_CODE);
									}
								})]
			          },{
				           columnWidth : .5,
				            layout : 'form',
				            items : [ {
				            xtype : 'textfield',
				            vtype : 'trim',
				            Width : '100',
				            readOnly:true,
				            name : 'prdName',
				            fieldLabel : '品名',
				            anchor : '90%'
				           } ]
				      },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'ngtvPoor',
			            fieldLabel : '负差',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'denst',
			            fieldLabel : '密度',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'len',
			            fieldLabel : '长度（米）',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'zhiCnt',
			            fieldLabel : '支/件',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'jianCnt',
			            fieldLabel : '件数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'remZhiCnt',
			            fieldLabel : '零支',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'weight',
			            fieldLabel : '重量（吨）',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'memo',
			            fieldLabel : '备注',
			            anchor : '90%'
			           } ]
			          }
			        ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzWareManualStorageForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzWareManualStorageAction.json',
								method : 'POST',
								form : addXywzWareManualStorageForm.getForm().id,
								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
								success : function(response) {

									Ext.Msg.alert('提示', '操作成功!');
									store.reload();
								},
								failure : function(response) {
									Ext.Msg.alert("sdf",response.responseText);
									Ext.Msg.alert('提示', '操作失败!' );
								}
							});
							
							addXywzWareManualStorageWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzWareManualStorageWindow.hide();
						}
					} ]
				} ]
			});
			// 定义新增窗口
			var addXywzWareManualStorageWindow = new Ext.Window({
				title : '手动入库',
				plain : true,
				layout : 'fit',
				width : 750,
				height :250,
				resizable : true,
				draggable : true,
				closable : true,
				closeAction : 'hide',
				modal : true, // 模态窗口
				loadMask : true,
				maximizable : true,
				collapsible : true,
				titleCollapse : true,
				buttonAlign : 'right',
				border : false,
				items : [ addXywzWareManualStorageForm ]
			});
			
			// 新增窗口展示的from
			var editXywzWareManualStorageForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 300,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [{
			            columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'storeId',
			            hidden:true,
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            hidden:true,
			            name : 'storeStatus',
			            fieldLabel : '仓库标志',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'prdName',
			            fieldLabel : '品名',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '<font color=red>*</font>规格型号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'spcModel',
									id : 'SIZE34',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SIZE34').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										editXywzWareManualStorageForm.getForm().findField('spcModel').setValue(records[0].data.SIZE_CONCAT);
										editXywzWareManualStorageForm.getForm().findField('prdName').setValue(records[0].data.HS_CODE);
									}
								}) ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'ngtvPoor',
			            fieldLabel : '负差',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'denst',
			            fieldLabel : '密度',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'len',
			            fieldLabel : '长度（米）',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'zhiCnt',
			            fieldLabel : '支/件',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'jianCnt',
			            fieldLabel : '件数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'remZhiCnt',
			            fieldLabel : '零支',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'weight',
			            fieldLabel : '重量（吨）',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'memo',
			            fieldLabel : '备注',
			            anchor : '90%'
			           } ]
			          }
			        ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzWareManualStorageForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzWareManualStorageAction.json',
								method : 'POST',
								form : editXywzWareManualStorageForm.getForm().id,
								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
								success : function(response) {

									Ext.Msg.alert('提示', '操作成功!');
									store.reload();
								},
								failure : function(response) {
									Ext.Msg.alert("sdf",response.responseText);
									Ext.Msg.alert('提示', '操作失败!' );
								}
							});
							
							editXywzWareManualStorageWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzWareManualStorageWindow.hide();
						}
					} ]
				} ]
			});
			// 定义新增窗口
			var editXywzWareManualStorageWindow = new Ext.Window({
				title : '手动入库',
				plain : true,
				layout : 'fit',
				width : 750,
				height :250,
				resizable : true,
				draggable : true,
				closable : true,
				closeAction : 'hide',
				modal : true, // 模态窗口
				loadMask : true,
				maximizable : true,
				collapsible : true,
				titleCollapse : true,
				buttonAlign : 'right',
				border : false,
				items : [ editXywzWareManualStorageForm ]
			});
			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '手动入库列表',
				frame : true,
				autoScroll : true,
				region : 'center',
				store : store,
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
				sm : sm, // 复选框
				tbar : tbar, // 表格工具栏
				bbar : bbar,// 分页工具栏
				viewConfig : {},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				}
			});

			// 布局模型
			var viewport = new Ext.Viewport({
				layout : 'fit',
				items : [ {
					layout:'border',
					items : [ qForm ,grid]
				}]
			});

		});