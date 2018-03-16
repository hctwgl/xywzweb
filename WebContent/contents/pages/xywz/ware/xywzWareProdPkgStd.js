Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				title : "国阳产品预警设置查询",
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
					},{
						columnWidth : .25,
						layout : 'form',
						items : [new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '规格型号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'spc',
									id : 'SIZE32',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SIZE32').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										qForm.getForm().findField('spc').setValue(records[0].data.SIZE_CONCAT);

									}
								})]
					} ]
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

			var record = Ext.data.Record.create([
			  {    name : 'pkgStdId',
				   mapping : 'PKG_STD_ID'
			  }, {
				  name : 'prdName',
				  mapping : 'PRD_NAME'
			  }, {
				  name : 'spc',
				  mapping : 'SPC'
			  }, {
				  name : 'theoryWeight',
				  mapping : 'THEORY_WEIGHT'
			  }, {
				  name : 'sizing',
				  mapping : 'SIZING'
			  }, {
				  name : 'zhiPerJian',
				  mapping : 'ZHI_PER_JIAN'
			  }, {
				  name : 'warnLoCnt',
				  mapping : 'WARN_LO_CNT'
			  }, {
				  name : 'warnHiCnt',
				  mapping : 'WARN_HI_CNT'
			  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {header : '包装标准ID',
				   width : 120,
				   dataIndex : 'pkgStdId',
				   hidden:true,
				   sortable : true
				  }, {
				  header : '品名',
				   width : 180,
				   dataIndex : 'prdName',
				   sortable : true
				  }, {
				  header : '规格',
				   width : 180,
				   dataIndex : 'spc',
				   sortable : true
				  }, {
				  header : '理论重量KG/M',
				   width : 120,
				   dataIndex : 'theoryWeight',
				   sortable : true
				  }, {
				  header : '定尺长度M',
				   width : 120,
				   dataIndex : 'sizing',
				   sortable : true
				  }, {
				  header : '每件支数',
				   width : 120,
				   dataIndex : 'zhiPerJian',
				   sortable : true
				  }, {
				  header : '预警最低吨数',
				   width : 120,
				   dataIndex : 'warnLoCnt',
				   sortable : true
				  }, {
				  header : '预警最高吨数',
				   width : 120,
				   dataIndex : 'warnHiCnt',
				   sortable : true
				  }
				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzWareProdPkgStdQueryAction.json'
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
											addXywzWareProdPkgStdForm.getForm().reset();
											addXywzWareProdPkgStdWindow.show();
										}
									},
									'-',
									{
										text : '修改',
										iconCls : 'editIconCss',
										handler : function() {

											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												editXywzWareProdPkgStdForm.getForm().loadRecord(selectRe);
												editXywzWareProdPkgStdWindow.show();

											}
										}

									},
									'-',
									{
										text : '删除',
										iconCls : 'deleteIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;
											if (selectLength < 1) {
												Ext.Msg.alert('提示','请选择需要删除的记录!');
											}

											else {
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
												tempId = selectRe.data.pkgStdId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzWareProdPkgStdAction!batchDestroy.json?idStr='+ idStr,
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
			var addXywzWareProdPkgStdForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 350,
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
			            name : 'pkgStdId', 
			            hidden:true,
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
									name : 'spc',
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
										addXywzWareProdPkgStdForm.getForm().findField('spc').setValue(records[0].data.SIZE_CONCAT);
										addXywzWareProdPkgStdForm.getForm().findField('prdName').setValue(records[0].data.HS_CODE);
									}
								})]
			          },{
				           columnWidth : .5,
				            layout : 'form',
				            items : [ {
				            xtype : 'textfield',
				            vtype : 'trim',
				            Width : '100',
				            name : 'prdName',
				            readOnly:true,
				            fieldLabel : '品名',
				            anchor : '90%'
				           } ]
				          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [{
				        xtype : 'numberfield',
				        decimalPrecision: 2,
			            Width : '100',
			            name : 'theoryWeight',
			            fieldLabel : '理论重量KG/M',
			            anchor : '90%'
			           }]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
				        xtype : 'numberfield',
				        decimalPrecision: 2, 
			            Width : '100',
			            name : 'sizing',
			            fieldLabel : '定尺长度M',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
				        xtype : 'numberfield',
				        decimalPrecision: 0, 
			            Width : '100',
			            name : 'zhiPerJian',
			            fieldLabel : '每件支数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
					    xtype : 'numberfield',
					    decimalPrecision: 2, 
			            Width : '100',
			            name : 'warnLoCnt',
			            fieldLabel : '预警最低吨数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
					    xtype : 'numberfield',
					    decimalPrecision: 2, 
			            Width : '100',
			            name : 'warnHiCnt',
			            fieldLabel : '预警最高吨数',
			            anchor : '90%'
			           } ]
								}]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzWareProdPkgStdForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzWareProdPkgStdAction.json',
								method : 'POST',
								form : addXywzWareProdPkgStdForm.getForm().id,
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
							
							addXywzWareProdPkgStdWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzWareProdPkgStdWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzWareProdPkgStdForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 150,
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
			            name : 'pkgStdId', 
			            hidden:true,
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [{
				            xtype : 'textfield',
				            vtype : 'trim',
				            Width : '100',
				            name : 'spc',
				            readOnly:true,
				            fieldLabel : '规格型号',
				            anchor : '90%'
				           }]
			          },{
				           columnWidth : .5,
				            layout : 'form',
				            items : [ {
				            xtype : 'textfield',
				            vtype : 'trim',
				            Width : '100',
				            name : 'prdName',
				            readOnly:true,
				            fieldLabel : '品名',
				            anchor : '90%'
				           } ]
				      },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [{
				        xtype : 'numberfield',
				        decimalPrecision: 2,
			            Width : '100',
			            name : 'theoryWeight',
			            fieldLabel : '理论重量KG/M',
			            anchor : '90%'
			           }]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
				        xtype : 'numberfield',
				        decimalPrecision: 2, 
			            Width : '100',
			            name : 'sizing',
			            fieldLabel : '定尺长度M',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
				        xtype : 'numberfield',
				        decimalPrecision: 0, 
			            Width : '100',
			            name : 'zhiPerJian',
			            fieldLabel : '每件支数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
					    xtype : 'numberfield',
					    decimalPrecision: 2, 
			            Width : '100',
			            name : 'warnLoCnt',
			            fieldLabel : '预警最低吨数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
					    xtype : 'numberfield',
					    decimalPrecision: 2, 
			            Width : '100',
			            name : 'warnHiCnt',
			            fieldLabel : '预警最高吨数',
			            anchor : '90%'
			           } ]
								}]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzWareProdPkgStdForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzWareProdPkgStdAction.json',
								method : 'POST',
								form : editXywzWareProdPkgStdForm.getForm().id,
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
							
							editXywzWareProdPkgStdWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzWareProdPkgStdWindow.hide();
						}
					} ]
				} ]
			});			
			
			// 定义新增窗口
			var addXywzWareProdPkgStdWindow = new Ext.Window({
				title : '国阳产品预警设置新增',
				plain : true,
				layout : 'fit',
				width : 750,
				height :350,
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
				items : [ addXywzWareProdPkgStdForm ]
			});

			// 定义修改窗口
			var editXywzWareProdPkgStdWindow = new Ext.Window({
				title : '国阳产品预警设置修改',
				plain : true,
				layout : 'fit',
				width : 750,
				height :350,
				resizable : true,
				draggable : true,
				closable : true,
				closeAction : 'hide',
				modal : true, // 模态窗口
				loadMask : true,
				maximizable : true,
				collapsible : true,
				titleCollapse : true,
				border : false,
				items : [ editXywzWareProdPkgStdForm ]
			});			
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '国阳产品预警设置列表',
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