Ext.onReady(function() {
	Ext.QuickTips.init();
	var qForm = new Ext.form.FormPanel( {
		id : "searchCondition",
		title : "内贸报价单商品清单信息",
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
				items : [ {
					xtype : 'textfield',
					Width : '100',
					name : 'merchdId',
					fieldLabel : '商品编号',
					anchor : '90%'
				} ]
			}, {
				columnWidth : .25,
				layout : 'form',
				items : [ new Com.xywz.common.SaleInlandQuotnSnglQuery(
						{
							fieldLabel : '报价单编号',
							labelStyle : 'text-align:left;',
							//labelWidth : 100,
							name : 'quotnSnglId',
							id : 'QUOTN_SNGL_ID11',
							singleSelected : false,
							// 单选复选标志
							//editable : false,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('QUOTN_SNGL_ID11').oSaleInlandQuotnSnglQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('QUOTN_SNGL_ID11').setValue(records[0].data.QUOTN_SNGL_ID);	
							}
						}) ]
			} ]
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
	
			   name : 'merchdIdId',
			   mapping : 'MERCHD_ID_ID'
			  }, { 
			   name : 'quotnSnglId',
			   mapping : 'QUOTN_SNGL_ID'
			  },{ 
				   name : 'merchdId',
				   mapping : 'MERCHD_ID'
				  }, { 
			   name : 'hsCode',
			   mapping : 'HS_CODE'
			  }, { 
			   name : 'spcModel',
			   mapping : 'SPC_MODEL'
			  }, { 
			   name : 'waistDepth',
			   mapping : 'WAIST_DEPTH'
			  }, { 
			   name : 'phyWeight',
			   mapping : 'PHY_WEIGHT'
			  }, { 
			   name : 'prc',
			   mapping : 'PRC'
			  }, { 
			   name : 'memo',
			   mapping : 'MEMO'
		} ]);

		// 定义列模型

		var cm = new Ext.grid.ColumnModel( [ rownum, sm, {
			   header : '商品编号ID',
			   width : 210,
			   dataIndex : 'merchdIdId',
			   sortable : true
			  }, { 
			   header : '报价单编号',
			   width : 210,
			   dataIndex : 'quotnSnglId',
			   sortable : true
			  },{ 
				   header : '商品编号',
				   width : 210,
				   dataIndex : 'merchdId',
				   sortable : true
				  },  { 
			   header : '品名',
			   width : 210,
			   dataIndex : 'hsCode',
			   sortable : true
			  }, { 
			   header : '规格型号',
			   width : 210,
			   dataIndex : 'spcModel',
			   sortable : true
			  }, { 
			   header : '腰厚',
			   width : 210,
			   dataIndex : 'waistDepth',
			   sortable : true
			  }, { 
			   header : '理重',
			   width : 210,
			   dataIndex : 'phyWeight',
			   sortable : true
			  }, { 
			   header : '价格',
			   width : 210,
			   dataIndex : 'prc',
			   sortable : true
			  }, { 
			   header : '备注',
			   width : 210,
			   dataIndex : 'memo',
			   sortable : true

		} ]);

		/**
		 * 数据存储
		 */
		var store = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
//json修改
				url : basepath + '/XywzSaleInlandMerchdListQueryAction.json'
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
									addXywzSaleInlandMerchdListForm.getForm()
											.reset();
									addXywzSaleInlandMerchdListWindow.show();
								}
							},
							'-',
							{
								text : '修改',
								iconCls : 'editIconCss',
								handler : function() {

									var selectLength = grid.getSelectionModel()
											.getSelections().length;

									var selectRe = grid.getSelectionModel()
											.getSelections()[0];

									if (selectLength != 1) {
										Ext.Msg.alert('提示', '请选择一条记录!');
									} else {
//编辑修改
										editXywzSaleInlandMerchdListForm.getForm()
												.loadRecord(selectRe);
										editXywzSaleInlandMerchdListWindow.show();

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
																tempId = selectRe.data.merchdIdId; 
																idStr += tempId;
																if (i != selectLength - 1)
																	idStr += ',';
															}
//action名称
															Ext.Ajax
																	.request( {
																		url : basepath
																				+ '/XywzSaleInlandMerchdListAction!batchDestroy.json?idStr='
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
					            url : basepath+'/XywzSaleInlandMerchdListQueryAction.json'
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
										detailXywzSaleInlandMerchdListForm
												.getForm().loadRecord(
														selectRe);
										detailXywzSaleInlandMerchdListWindow.show();
									}
								}
							} ]
				});

		// 新增窗口展示的from
		var addXywzSaleInlandMerchdListForm = new Ext.form.FormPanel(
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
								             name : 'merchdIdId',
								             maxLength : 200,
								             minLength : 1, 
								             hidden:true,
								             anchor : '90%'
								            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ new Com.xywz.common.SaleInlandQuotnSnglQuery(
														{
															fieldLabel : '<font color=red>*</font>报价单编号',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'quotnSnglId',
															id : 'QUOTN_SNGL_ID22',
															singleSelected : false,
															// 单选复选标志
															editable : false,
															allowBlank : false,
															// 不允许为空
															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('QUOTN_SNGL_ID22').oSaleInlandQuotnSnglQueryGrid.getSelectionModel().selections.items;
																Ext.getCmp('QUOTN_SNGL_ID22').setValue(records[0].data.QUOTN_SNGL_ID);	
															}
														}) ]
								           },{ 
											    columnWidth : .5,
											    layout : 'form',
											    items : [ {
											    xtype : 'textfield',
											    vtype : 'trim',
											    Width : '100',
											    name : 'merchdId',
											    fieldLabel : '<font color=red>*</font>商品编号',
											    allowBlank : false,
											    blankText : '商品编号不能为空',
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
								             name : 'hsCode',
								             fieldLabel : '<font color=red>*</font>品名',
								             allowBlank : false,
								             blankText : '品名不能为空',
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
								             name : 'spcModel',
								             fieldLabel : '<font color=red>*</font>规格型号',
								             allowBlank : false,
								             blankText : '规格型号不能为空',
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
								             name : 'waistDepth',
								             fieldLabel : '<font color=red>*</font>腰厚',
								             allowBlank : false,
								             blankText : '腰厚不能为空',
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
								             name : 'phyWeight',
								             fieldLabel : '<font color=red>*</font>理重',
								             allowBlank : false,
								             blankText : '理重不能为空',
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
								             name : 'prc',
								             fieldLabel : '<font color=red>*</font>价格',
								             allowBlank : false,
								             blankText : '价格不能为空',
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
								             name : 'memo',
								             fieldLabel : '<font color=red>*</font>备注',
								             allowBlank : false,
								             blankText : '备注不能为空',
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
												if (!addXywzSaleInlandMerchdListForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false; //注掉此行可以正确插入，但不知原因
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInlandMerchdListAction.json',
															method : 'POST',
															form : addXywzSaleInlandMerchdListForm
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

												addXywzSaleInlandMerchdListWindow.hide();
											}
										}, {
											text : '取  消',
											handler : function() {
											addXywzSaleInlandMerchdListWindow.hide();
											}
										} ]
							} ]
				});

		// 修改窗口展示的from
		var editXywzSaleInlandMerchdListForm = new Ext.form.FormPanel(
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
								             name : 'merchdIdId',
								             maxLength : 200,
								             minLength : 1, 
								             hidden:true,
								             anchor : '90%'
								            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ new Com.xywz.common.SaleInlandQuotnSnglQuery(
														{
															fieldLabel : '<font color=red>*</font>报价单编号',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'quotnSnglId',
															id : 'QUOTN_SNGL_ID33',
															singleSelected : false,
															// 单选复选标志
															editable : false,
															allowBlank : false,
															// 不允许为空
															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('QUOTN_SNGL_ID33').oSaleInlandQuotnSnglQueryGrid.getSelectionModel().selections.items;
																Ext.getCmp('QUOTN_SNGL_ID33').setValue(records[0].data.QUOTN_SNGL_ID);	
															}
														}) ]
								           },{ 
											    columnWidth : .5,
											    layout : 'form',
											    items : [ {
											    xtype : 'textfield',
											    vtype : 'trim',
											    Width : '100',
											    name : 'merchdId',
											    fieldLabel : '<font color=red>*</font>商品编号',
											    allowBlank : false,
											    blankText : '商品编号不能为空',
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
								             name : 'hsCode',
								             fieldLabel : '<font color=red>*</font>品名',
								             allowBlank : false,
								             blankText : '品名不能为空',
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
								             name : 'spcModel',
								             fieldLabel : '<font color=red>*</font>规格型号',
								             allowBlank : false,
								             blankText : '规格型号不能为空',
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
								             name : 'waistDepth',
								             fieldLabel : '<font color=red>*</font>腰厚',
								             allowBlank : false,
								             blankText : '腰厚不能为空',
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
								             name : 'phyWeight',
								             fieldLabel : '<font color=red>*</font>理重',
								             allowBlank : false,
								             blankText : '理重不能为空',
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
								             name : 'prc',
								             fieldLabel : '<font color=red>*</font>价格',
								             allowBlank : false,
								             blankText : '价格不能为空',
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
								             name : 'memo',
								             fieldLabel : '<font color=red>*</font>备注',
								             allowBlank : false,
								             blankText : '备注不能为空',
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
												if (!editXywzSaleInlandMerchdListForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false;
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInlandMerchdListAction.json',
															method : 'POST',
															form : editXywzSaleInlandMerchdListForm
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

												editXywzSaleInlandMerchdListWindow
														.hide();
											}
										},
										{
											text : '取  消',
											handler : function() {
												editXywzSaleInlandMerchdListWindow
														.hide();
											}
										} ]
							} ]
				});
		
		// 预览展示的from
		var detailXywzSaleInlandMerchdListForm = new Ext.form.FormPanel({
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
				             name : 'merchdIdId',
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
				             name : 'quotnSnglId',
				             fieldLabel : '<font color=red>*</font>报价单编号',
				             allowBlank : false,
				             blankText : '报价单编号不能为空',
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
							    name : 'merchdId',
							    fieldLabel : '<font color=red>*</font>商品编号',
							    allowBlank : false,
							    blankText : '商品编号不能为空',
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
				             name : 'hsCode',
				             fieldLabel : '<font color=red>*</font>品名',
				             allowBlank : false,
				             blankText : '品名不能为空',
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
				             name : 'spcModel',
				             fieldLabel : '<font color=red>*</font>规格型号',
				             allowBlank : false,
				             blankText : '规格型号不能为空',
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
				             name : 'waistDepth',
				             fieldLabel : '<font color=red>*</font>腰厚',
				             allowBlank : false,
				             blankText : '腰厚不能为空',
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
				             name : 'phyWeight',
				             fieldLabel : '<font color=red>*</font>理重',
				             allowBlank : false,
				             blankText : '理重不能为空',
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
				             name : 'prc',
				             fieldLabel : '<font color=red>*</font>价格',
				             allowBlank : false,
				             blankText : '价格不能为空',
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
				             name : 'memo',
				             fieldLabel : '<font color=red>*</font>备注',
				             allowBlank : false,
				             blankText : '备注不能为空',
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
				    	detailXywzSaleInlandMerchdListWindow.hide();
					}
				} ]
			}
			]
		});

		// 定义新增窗口
		var addXywzSaleInlandMerchdListWindow = new Ext.Window( {
			title : '内贸报价单商品清单信息新增',
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
			items : [ addXywzSaleInlandMerchdListForm ]
		});

		// 定义修改窗口
		var editXywzSaleInlandMerchdListWindow = new Ext.Window( {
			title : '内贸报价单商品清单信息修改',
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
			items : [ editXywzSaleInlandMerchdListForm ]
		});
		
		// 定义详情窗口
		var detailXywzSaleInlandMerchdListWindow = new Ext.Window({
			title : '内贸报价单商品清单信息预览',
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
			items : [ detailXywzSaleInlandMerchdListForm ]
		});

		// 表格实例
		var grid = new Ext.grid.GridPanel( {
			title : '内贸报价单商品清单信息列表',
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