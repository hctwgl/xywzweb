Ext.onReady(function() {
	Ext.QuickTips.init();
	var boxstore1 = new Ext.data.Store({  
		sortInfo: {
	    	field: 'key',
	    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
		},
		restful:true,   
		autoLoad :true,
		proxy : new Ext.data.HttpProxy({
			url :basepath+'/lookup.json?name=XYWZ_PCS_OR_BUNDLE'  //客户等级
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
	var qForm = new Ext.form.FormPanel( {
		id : "searchCondition",
		title : "报关箱单信息",
		labelWidth : 90, // 标签宽度
		frame : true, // 是否渲染表单面板背景色
		labelAlign : 'middle', // 标签对齐方式
		buttonAlign : 'center',
		region : 'north',
		split : true,
		height : 100,
		items : [ {
			layout : 'column',
			items : [ {
				columnWidth : .25,
				layout : 'form',
				items : [ new Com.xywz.common.XywzSaleInvInfoQuery(
						{
							fieldLabel : '发票号',
							labelStyle : 'text-align:left;',
							//labelWidth : 100,
							name : 'invNum',
							id : 'INV_NUM222',
							singleSelected : false,
							// 单选复选标志
							//editable : false,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('INV_NUM222').oSaleInvInfoQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('INV_NUM222').setValue(records[0].data.INV_NUM);
								//qForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
								
							}
						})]
			}]
		} ],
		buttons : [ {
			text : '查询',
			handler : function() {
				var conditionStr = qForm.getForm().getValues(false);
				store.baseParams = {
					"condition" : Ext.encode(conditionStr)
				};
				store.load( {
					params : {
						start : 0,
						limit : parseInt(pagesize_combo.getValue())
					}
				});

			}

		}, {
			text : '重置',
			handler : function() {
				qForm.getForm().reset();
			}

		} ]
	});
	// 复选框
		var sm = new Ext.grid.CheckboxSelectionModel();

		// 定义自动当前页行号
		var rownum = new Ext.grid.RowNumberer( {
			header : 'No.',
			width : 28
		});

		var record = Ext.data.Record.create( [ {
	

			   name : 'cstmPacklistId',
			   mapping : 'CSTM_PACKLIST_ID'
			  }, { 
			   name : 'invNum',
			   mapping : 'INV_NUM'
			  }, { 
				   name : 'hsCode',
				   mapping : 'HS_CODE'
				  }, { 
			   name : 'size',
			   mapping : 'SIZE'
			  }, { 
			   name : 'pcsBundle',
			   mapping : 'PCS_BUNDLE'
			  }, { 
			   name : 'bundles',
			   mapping : 'BUNDLES'
			  }, { 
			   name : 'pcs',
			   mapping : 'PCS'
			  }, { 
			   name : 'suttleGrossWeight',
			   mapping : 'SUTTLE_GROSS_WEIGHT'

		} ]);

		// 定义列模型

		var cm = new Ext.grid.ColumnModel( [ rownum, sm, {

			   header : '报关箱单ID',
			   width : 210,
			   dataIndex : 'cstmPacklistId',
			   sortable : true,
			   hidden : true
			  }, { 
			   header : '发票号',
			   width : 210,
			   dataIndex : 'invNum',
			   sortable : true
			  }, { 
				   header : 'HS_CODE',
				   width : 210,
				   dataIndex : 'hsCode',
				   sortable : true
				  }, { 
			   header : 'SIZE',
			   width : 210,
			   dataIndex : 'size',
			   sortable : true
			  }, { 
			   header : 'PCS/BUNDLE',
			   width : 210,
			   dataIndex : 'pcsBundle',
			   sortable : true
			  }, { 
			   header : 'BUNDLES',
			   width : 210,
			   dataIndex : 'bundles',
			   sortable : true
			  }, { 
			   header : 'PCS',
			   width : 210,
			   dataIndex : 'pcs',
			   sortable : true
			  }, { 
			   header : '净重和毛重',
			   width : 210,
			   dataIndex : 'suttleGrossWeight',
			   sortable : true

		} ]);

		/**
		 * 数据存储
		 */
		var store = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
//json修改
				url : basepath + '/XywzSaleCstmDeclPacklistQueryAction.json'
			}),
			reader : new Ext.data.JsonReader( {
				successProperty : 'success',
				idProperty : 'ID',
				messageProperty : 'message',
				root : 'json.data',
				totalProperty : 'json.count'
			}, record)
		});

		// 每页显示条数下拉选择框
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

		// 默认加载数据
		store.load( {
			params : {
				start : 0,
				limit : parseInt(pagesize_combo.getValue())
			}
		});

		// 改变每页显示条数reload数据
		pagesize_combo.on("select", function(comboBox) {
			bbar.pageSize = parseInt(pagesize_combo.getValue()), store.reload( {
				params : {
					start : 0,
					limit : parseInt(pagesize_combo.getValue())
				}
			});
		});
		// 分页工具栏
		var bbar = new Ext.PagingToolbar( {
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
//form修改
									addXywzSaleCstmDeclPacklistForm.getForm().reset();
//									addXywzSaleCstmDeclPacklistForm.getForm().findField('pcs').setDisabled(true);
//									addXywzSaleCstmDeclPacklistForm.getForm().findField('bundles').setDisabled(true);
									addXywzSaleCstmDeclPacklistWindow.show();
								}
							},
							'-',
							{
								text : '修改',
								iconCls : 'editIconCss',
								handler : function() {

									var selectLength = grid.getSelectionModel()
											.getSelections().length;

									var selectRe = grid.getSelectionModel().getSelections()[0];

									if (selectLength != 1) {
										Ext.Msg.alert('提示', '请选择一条记录!');
									} else {
										var pcsBundle=selectRe.data.pcsBundle;
//										if(pcsBundle=='0'){
//											editXywzSaleCstmDeclPacklistForm.getForm().findField('pcs').setDisabled(false);
//											editXywzSaleCstmDeclPacklistForm.getForm().findField('bundles').setDisabled(true);
//										}else if(pcsBundle=='1'){
//											editXywzSaleCstmDeclPacklistForm.getForm().findField('pcs').setDisabled(true);
//											editXywzSaleCstmDeclPacklistForm.getForm().findField('bundles').setDisabled(false);
//										}
										editXywzSaleCstmDeclPacklistForm.getForm().loadRecord(selectRe);
										editXywzSaleCstmDeclPacklistWindow.show();

									}
								}

							},
							'-',
							{
								text : '删除',
								iconCls : 'deleteIconCss',
								handler : function() {
									var selectLength = grid.getSelectionModel()
											.getSelections().length;
									if (selectLength < 1) {
										Ext.Msg.alert('提示', '请选择需要删除的记录!');
									}

									else {
										Ext.MessageBox
												.confirm(
														'提示',
														'确定删除吗?',
														function(buttonId) {
															if (buttonId
																	.toLowerCase() == "no") {
																return;
															}
															var selectRe;
															var tempId;
															var tempCount;
															var idStr = '';
															for ( var i = 0; i < selectLength; i++) {
																selectRe = grid
																		.getSelectionModel()
																		.getSelections()[i];
//删除的ID需要修改
																tempId = selectRe.data.cstmPacklistId; 
																idStr += tempId;
																if (i != selectLength - 1)
																	idStr += ',';
															}
//action名称
															Ext.Ajax
																	.request( {
																		url : basepath
																				+ '/XywzSaleCstmDeclPacklistAction!batchDestroy.json?idStr='
																				+ idStr,
																		waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
																		success : function() {
																			Ext.Msg
																					.alert(
																							'提示',
																							'操作成功!');
																			store
																					.reload();
																		},
																		failure : function() {

																			Ext.Msg
																					.alert(
																							'提示',
																							'操作失败!');
																		}
																	});

														});
									}
								}
							},'-',new Com.yucheng.bob.ExpButton({
					            formPanel : 'searchCondition',
					            iconCls:'exportIconCss',
					            url : basepath+'/XywzSaleCstmDeclPacklistQueryAction.json'
					        }),'-',
							{
								text : '预览',
								iconCls : 'detailIconCss',
								handler : function() {
									var selectLength = grid
									.getSelectionModel()
									.getSelections().length;

									var selectRe = grid.getSelectionModel()
									.getSelections()[0];

									if (selectLength != 1) {
										Ext.Msg.alert('提示','请选择一条记录!');
									} else {
										detailXywzSaleCstmDeclPacklistForm
												.getForm().loadRecord(
														selectRe);
										detailXywzSaleCstmDeclPacklistWindow.show();
									}
								}
							} ]
				});

// 新增窗口展示的from
		var addXywzSaleCstmDeclPacklistForm = new Ext.form.FormPanel(
				{
					labelWidth : 150,
					height : 150,
					frame : true,
					region : 'center',
					autoScroll : true,
					buttonAlign : "center",
					items : [
							{
								layout : 'column',
								items : [
								         {
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'textfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'cstmPacklistId',
								             maxLength : 200,
								             minLength : 1, 
								             hidden:true,
								             anchor : '90%'
								            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ new Com.xywz.common.InvMerchdDtlQuery(
													{
														fieldLabel : '<font color=red>*</font>发票号',
														labelStyle : 'text-align:left;',
														//labelWidth : 100,
														name : 'invNum',
														id : 'INV_NUM333',
														singleSelected : false,
														// 单选复选标志
														editable : false,
														allowBlank : false,
														// 不允许为空
														blankText : "不能为空，请填写",
														anchor : '90%',
														callback : function(a, b) {
															var records = Ext.getCmp('INV_NUM333').oCustomerQueryGrid.getSelectionModel().selections.items;
															Ext.getCmp('INV_NUM333').setValue(records[0].data.INV_NUM);
															addXywzSaleCstmDeclPacklistForm.getForm().findField('size').setValue(records[0].data.MODEL);
															
														}
													}) ]
								           },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ {
									             xtype : 'textfield',
									             vtype : 'trim',
									             Width : '100',
									             name : 'hsCode',
									             fieldLabel : '<font color=red>*</font>HS CODE',
									             //readOnly:true,
									             allowBlank : false,
									             blankText : 'HS CODE不能为空',
									             anchor : '90%'
									            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'textfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'size',
								             fieldLabel : '<font color=red>*</font>SIZE',
								             //readOnly:true,
								             allowBlank : false,
								             blankText : 'SIZE不能为空',
								             anchor : '90%'
								            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
									             xtype : 'numberfield',
									             vtype : 'trim',
									             Width : '100',
									             name : 'pcsBundle',
									             fieldLabel : '<font color=red>*</font>PCS/BUNDLE',
									             //readOnly:true,
									             allowBlank : false,
									             blankText : 'PCS/BUNDLE不能为空',
									             anchor : '90%'
									            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'numberfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'bundles',
								             fieldLabel : '<font color=red>*</font>BUNDLES',
								             allowBlank : false,
								             blankText : 'BUNDLES不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%'
								            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'textfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'suttleGrossWeight',
								             fieldLabel : '<font color=red>*</font>净重和毛重',
								             allowBlank : false,
								             blankText : '净重和毛重不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%'
								            } ] 

													} ]
							},

							{
								layout : 'form',
								buttonAlign : 'center',

								buttons : [
										{
											text : '保  存',
											handler : function() {
//ADDform
												if (!addXywzSaleCstmDeclPacklistForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false; //注掉此行可以正确插入，但不知原因
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleCstmDeclPacklistAction.json',
															method : 'POST',
															form : addXywzSaleCstmDeclPacklistForm
																	.getForm().id,
															waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
															success : function(
																	response) {

																Ext.Msg
																		.alert(
																				'提示',
																				'操作成功!');
																store.reload();
															},
															failure : function(
																	response) {
																Ext.Msg
																		.alert(
																				"sdf",
																				response.responseText);
																Ext.Msg
																		.alert(
																				'提示',
																				'操作失败!');
															}
														});

												addXywzSaleCstmDeclPacklistWindow.hide();
											}
										}, {
											text : '取  消',
											handler : function() {
											addXywzSaleCstmDeclPacklistWindow.hide();
											}
										} ]
							} ]
				});

		// 修改窗口展示的from
		var editXywzSaleCstmDeclPacklistForm = new Ext.form.FormPanel(
				{
					labelWidth : 150,
					height : 300,
					frame : true,
					region : 'center',
					autoScroll : true,
					buttonAlign : "center",
					items : [
							{
								layout : 'column',
								items : [
								          {
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'textfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'cstmPacklistId',
								             maxLength : 200,
								             minLength : 1, 
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
								             name : 'invNum',
								             fieldLabel : '<font color=red>*</font>发票号',
								             allowBlank : false,
								             blankText : '发票号不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%',
								             readOnky : true
								            } ]
								           },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ {
									             xtype : 'textfield',
									             vtype : 'trim',
									             Width : '100',
									             name : 'hsCode',
									             fieldLabel : '<font color=red>*</font>HS CODE',
									             //readOnly:true,
									             allowBlank : false,
									             blankText : 'HS CODE不能为空',
									             anchor : '90%'
									            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'textfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'size',
								             labelStyle: 'text-align:left;',
								             fieldLabel : '<font color=red>*</font>SIZE',
								             allowBlank : false,
								             blankText : 'SIZE不能为空',
								             maxLength : 200,
								             //disabled : true,
								             minLength : 1,
								             anchor : '90%'
								            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [  {
									             xtype : 'numberfield',
									             vtype : 'trim',
									             Width : '100',
									             name : 'pcsBundle',
									             fieldLabel : '<font color=red>*</font>PCS/BUNDLE',
									            // readOnly:true,
									             allowBlank : false,
									             blankText : 'PCS/BUNDLE不能为空',
									             anchor : '90%'
									            }]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'numberfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'bundles',
								             fieldLabel : '<font color=red>*</font>BUNDLES',
								             allowBlank : false,
								             blankText : 'BUNDLES不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%'
								            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'textfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'suttleGrossWeight',
								             fieldLabel : '<font color=red>*</font>净重和毛重',
								             allowBlank : false,
								             blankText : '净重和毛重不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%'
								            } ] 
										} ]
							},
							{
								layout : 'form',
								buttonAlign : 'center',

								buttons : [
										{
											text : '保  存',
											handler : function() {
												if (!editXywzSaleCstmDeclPacklistForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false;
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleCstmDeclPacklistAction.json',
															method : 'POST',
															form : editXywzSaleCstmDeclPacklistForm
																	.getForm().id,
															waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
															success : function(
																	response) {

																Ext.Msg
																		.alert(
																				'提示',
																				'操作成功!');
																store.reload();
															},
															failure : function(
																	response) {
																Ext.Msg
																		.alert(
																				"sdf",
																				response.responseText);
																Ext.Msg
																		.alert(
																				'提示',
																				'操作失败!');
															}
														});

												editXywzSaleCstmDeclPacklistWindow
														.hide();
											}
										},
										{
											text : '取  消',
											handler : function() {
												editXywzSaleCstmDeclPacklistWindow
														.hide();
											}
										} ]
							} ]
				});
		
		// 预览展示的from
		var detailXywzSaleCstmDeclPacklistForm = new Ext.form.FormPanel({
			labelWidth : 150,
			height : 150,
			frame : true,
			region : 'center',
			autoScroll : true,
			buttonAlign : "center",
			items : [ {
				layout : 'column',
				items : [
				          {
				             columnWidth : .5,
				             layout : 'form',
				             items : [ {
				             xtype : 'textfield',
				             vtype : 'trim',
				             Width : '100',
				             name : 'cstmPacklistId',
				             maxLength : 200,
				             minLength : 1, 
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
				             name : 'invNum',
				             fieldLabel : '<font color=red>*</font>发票号',
				             allowBlank : false,
				             blankText : '发票号不能为空',
				             maxLength : 200,
				             minLength : 1,
				             readOnky : true,
				             anchor : '90%'
				            } ]
				           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'hsCode',
					             fieldLabel : '<font color=red>*</font>HS CODE',
					             //readOnly:true,
					             allowBlank : false,
					             blankText : 'HS CODE不能为空',
					             anchor : '90%'
					            } ]
				           },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [ {
				             xtype : 'textfield',
				             vtype : 'trim',
				             Width : '100',
				             name : 'size',
				             labelStyle: 'text-align:left;',
				             fieldLabel : '<font color=red>*</font>SIZE',
				             allowBlank : false,
				             blankText : 'SIZE不能为空',
				             maxLength : 200,
				             //disabled : true,
				             minLength : 1,
				             anchor : '90%'
				            } ]
				           },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [  {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'pcsBundle',
					             fieldLabel : 'PCS/BUNDLE',
					            // readOnly:true,
					             anchor : '90%'
					            }]
				           },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [ {
				             xtype : 'numberfield',
				             vtype : 'trim',
				             Width : '100',
				             name : 'bundles',
				             fieldLabel : '</font>BUNDLES',
				             allowBlank : true,
				             maxLength : 200,
				             minLength : 1,
				             anchor : '90%'
				            } ]
				           },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [ {
				             xtype : 'numberfield',
				             vtype : 'trim',
				             Width : '100',
				             name : 'suttleGrossWeight',
				             fieldLabel : '<font color=red>*</font>净重和毛重',
				             allowBlank : false,
				             blankText : '净重和毛重不能为空',
				             maxLength : 200,
				             minLength : 1,
				             anchor : '90%'
				            } ] 
					 } ]
			}, {
				layout : 'form',
				buttonAlign : 'center',

				buttons : [
				    {
					text : '返  回',
					handler : function() {
				    	detailXywzSaleCstmDeclPacklistWindow.hide();
					}
				} ]
			}
			]
		});

		// 定义新增窗口
		var addXywzSaleCstmDeclPacklistWindow = new Ext.Window( {
			title : '报关箱单新增',
			plain : true,
			layout : 'fit',
			width : 800,
			height : 250,
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
			items : [ addXywzSaleCstmDeclPacklistForm ]
		});

		// 定义修改窗口
		var editXywzSaleCstmDeclPacklistWindow = new Ext.Window( {
			title : '报关箱单修改',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 250,
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
			items : [ editXywzSaleCstmDeclPacklistForm ]
		});
		
		// 定义详情窗口
		var detailXywzSaleCstmDeclPacklistWindow = new Ext.Window({
			title : '报关箱单预览',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 250,
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
			items : [ detailXywzSaleCstmDeclPacklistForm ]
		});

		// 表格实例
		var grid = new Ext.grid.GridPanel( {
			title : '报关箱单列表',
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
		var viewport = new Ext.Viewport( {
			layout : 'fit',
			items : [ {
				layout : 'border',
				items : [ qForm, grid ]
			} ]
		});

	});