Ext.onReady(function() {
	Ext.QuickTips.init();
	var boxstore2 = new Ext.data.Store({  
		sortInfo: {
	    	field: 'key',
	    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
		},
		restful:true,   
		autoLoad :true,
		proxy : new Ext.data.HttpProxy({
			url :basepath+'/lookup.json?name=XYWZ_CUR'   //币种
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
	var qForm = new Ext.form.FormPanel( {
		id : "searchCondition",
		title : "外贸佣金管理",
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
					name : 'contrNum',
					fieldLabel : '合同号',
					anchor : '90%'
				} ]
			},{
				columnWidth : .25,
				layout : 'form',
				items : [
							 new Com.xywz.common.XywzSaleInvInfoQuery(
						{
							fieldLabel : '发票号',
							labelStyle : 'text-align:right;',
							//labelWidth : 100,
							name : 'invNum',
							id : 'invNum1',
							singleSelected : true,
							// 单选复选标志
							editable : true,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('invNum1').oSaleInvInfoQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('invNum1').setValue(records[0].data.INV_NUM);
								
							}
						})]
			}
			
			]
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
	
			   name : 'commsnId',
			   mapping : 'COMMSN_ID'
			  }, { 
			   name : 'contrNum',
			   mapping : 'CONTR_NUM'
			  }, { 
			   name : 'invNum',
			   mapping : 'INV_NUM'
			  }, { 
			   name : 'model',
			   mapping : 'MODEL'
			  }, { 
			   name : 'weight',
			   mapping : 'WEIGHT'
			  }, { 
			   name : 'amt',
			   mapping : 'AMT'
			  }, { 
			   name : 'cur',
			   mapping : 'CUR'
			  },{ 
			   name : 'curOra',
			   mapping : 'CUR_ORA'
			  },{ 
			   name : 'commsnUprc',
			   mapping : 'COMMSN_UPRC'
			  }, { 
			   name : 'ratio',
			   mapping : 'RATIO'
			  }, { 
			   name : 'refundDt',
			   mapping : 'REFUND_DT'
			  }, { 
			   name : 'commsnAmt',
			   mapping : 'COMMSN_AMT'
			  }, { 
			   name : 'payDt',
			   mapping : 'PAY_DT'

		} ]);

		// 定义列模型

		var cm = new Ext.grid.ColumnModel( [ rownum, sm, {
			   header : '佣金ID',
			   width : 210,
			   dataIndex : 'commsnId',
			   sortable : true
			  }, { 
			   header : '合同号',
			   width : 210,
			   dataIndex : 'contrNum',
			   sortable : true
			  }, { 
			   header : '发票号',
			   width : 210,
			   dataIndex : 'invNum',
			   sortable : true
			  }, { 
			   header : '型号',
			   width : 210,
			   dataIndex : 'model',
			   sortable : true
			  }, { 
			   header : '重量',
			   width : 210,
			   dataIndex : 'weight',
			   sortable : true
			  }, { 
			   header : '金额',
			   width : 210,
			   dataIndex : 'amt',
			   sortable : true
			  }, { 
			   header : '币种',
			   width : 210,
			   dataIndex : 'curOra',
			   sortable : true
			  }, { 
			   header : '佣金单价',
			   width : 210,
			   dataIndex : 'commsnUprc',
			   sortable : true
			  }, { 
			   header : '比例',
			   width : 210,
			   dataIndex : 'ratio',
			   sortable : true
			  }, { 
			   header : '回款日期',
			   width : 210,
			   dataIndex : 'refundDt',
			   sortable : true
			  }, { 
			   header : '佣金金额',
			   width : 210,
			   dataIndex : 'commsnAmt',
			   sortable : true
			  }, { 
			   header : '付款日期',
			   width : 210,
			   dataIndex : 'payDt',
			   sortable : true

		} ]);

		/**
		 * 数据存储
		 */
		var store = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
//json修改
				url : basepath + '/XywzSaleCommsnMgmtQueryAction.json'
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
									addXywzSaleCommsnMgmtForm.getForm()
											.reset();
									addXywzSaleCommsnMgmtWindow.show();
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
										editXywzSaleCommsnMgmtForm.getForm()
												.loadRecord(selectRe);
										editXywzSaleCommsnMgmtWindow.show();

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
																tempId = selectRe.data.commsnId; 
																idStr += tempId;
																if (i != selectLength - 1)
																	idStr += ',';
															}
//action名称
															Ext.Ajax
																	.request( {
																		url : basepath
																				+ '/XywzSaleCommsnMgmtAction!batchDestroy.json?idStr='
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
					            url : basepath+'/XywzSaleCommsnMgmtQueryAction.json'
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
										detailXywzSaleCommsnMgmtForm
												.getForm().loadRecord(
														selectRe);
										detailXywzSaleCommsnMgmtWindow.show();
									}
								}
							} ]
				});

		// 新增窗口展示的from
		var addXywzSaleCommsnMgmtForm = new Ext.form.FormPanel(
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
									            name : 'commsnId',
									            maxLength : 200,
									            minLength : 1, 
									            hidden:true,
									            anchor : '90%'
									           } ]
									          },{
													columnWidth : .5,
													layout : 'form',
													items : [
															new Com.xywz.common.XywzSaleInvInfoQuery(
															{
																fieldLabel : '<font color=red>*</font>发票号',
																labelStyle : 'text-align:left;',
																//labelWidth : 100,
																name : 'invNum',
																id : 'INV_NUM1',
																singleSelected : true,
																// 单选复选标志
																editable : true,
																allowBlank : false,
																// 不允许为空
																blankText : "发票号不能为空，请填写",
																anchor : '90%',
																callback : function(a, b) {
																	var records = Ext.getCmp('INV_NUM1').oSaleInvInfoQueryGrid.getSelectionModel().selections.items;
																	Ext.getCmp('INV_NUM1').setValue(records[0].data.INV_NUM);
																	addXywzSaleCommsnMgmtForm.getForm().findField('invNum').setValue(records[0].data.INV_NUM);
																	addXywzSaleCommsnMgmtForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
																}
															})]
												},{ 
											           columnWidth : .5,
											            layout : 'form',
											            items : [ new Com.xywz.common.SysmProductDetailQuery(
																{
																	fieldLabel : '<font color=red>*</font>规格型号',
																	labelStyle : 'text-align:left;',
																	//labelWidth : 100,
																	name : 'model',
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
																		//Ext.getCmp('SIZE22').setValue(records[0].data.CORP_NM);
																		addXywzSaleCommsnMgmtForm.getForm().findField('model').setValue(records[0].data.SIZE_CONCAT);
//																		addXywzSaleInvMerchdDtlForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
//																		addXywzSaleInvMerchdDtlForm.getForm().findField('materials').setValue(records[0].data.MATERIALS);
																	}
																}) ]
											          
										           },{ 
									            columnWidth : .5,
									            layout : 'form',
									            items : [ {
									            xtype : 'textfield',
									            vtype : 'trim',
									            Width : '100',
									            name : 'weight',
									            fieldLabel : '重量',
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
									            name : 'amt',
									            fieldLabel : '金额',
									            maxLength : 200,
									            minLength : 1,
									            anchor : '90%'
									           } ]
									          },{ 

										             columnWidth : .5,
										             layout : 'form',
										             items : [ new Ext.form.ComboBox({
									      	             hiddenName : 'cur',
														 fieldLabel : '币种',
														 labelStyle: 'text-align:left;',
														 triggerAction : 'all',
														 store : boxstore2,
														 allowBlank : false,
														 displayField : 'value',
														 valueField : 'key',
														 mode : 'local',
														 forceSelection : true,
														 typeAhead : true,
														 emptyText:'请选择',
														 resizable : true,
														 editable : false,
														 anchor : '90%'
									            }) ]
										           
									          },{ 
									            columnWidth : .5,
									            layout : 'form',
									            items : [ {
									            xtype : 'textfield',
									            vtype : 'trim',
									            Width : '100',
									            name : 'commsnUprc',
									            fieldLabel : '佣金单价',
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
									            name : 'ratio',
									            fieldLabel : '比例',
									            maxLength : 200,
									            minLength : 1,
									            anchor : '90%'
									           } ]
									          },{ 
									            columnWidth : .5,
									            layout : 'form',
									            items : [ {
									            xtype : 'datefield',
									            vtype : 'trim',
									            Width : '100',
									            name : 'refundDt',
									            fieldLabel : '回款日期',
									            maxLength : 200,
									            minLength : 1,
									            anchor : '90%',
									            format:'Y-m-d'
									           } ]
									          },{ 
									            columnWidth : .5,
									            layout : 'form',
									            items : [ {
									            xtype : 'numberfield',
									            vtype : 'trim',
									            Width : '100',
									            name : 'commsnAmt',
									            fieldLabel : '佣金金额',
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
										            name : 'contrNum',
													readOnly: true,
										            fieldLabel : '<font color=red>*</font>合同号',
										            allowBlank : false,
										            blankText : '合同号不能为空',
										            maxLength : 200,
										            minLength : 1,
										            anchor : '90%'
										           } ]
										          },{ 
									            columnWidth : .5,
									            layout : 'form',
									            items : [ {
									            xtype : 'datefield',
									            vtype : 'trim',
									            Width : '100',
									            name : 'payDt',
									            fieldLabel : '付款日期',
									            maxLength : 200,
									            minLength : 1,
									            anchor : '90%',
									            format:'Y-m-d'
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
												if (!addXywzSaleCommsnMgmtForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false; //注掉此行可以正确插入，但不知原因
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleCommsnMgmtAction.json',
															method : 'POST',
															form : addXywzSaleCommsnMgmtForm
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

												addXywzSaleCommsnMgmtWindow.hide();
											}
										}, {
											text : '取  消',
											handler : function() {
											addXywzSaleCommsnMgmtWindow.hide();
											}
										} ]
							} ]
				});

		// 修改窗口展示的from
		var editXywzSaleCommsnMgmtForm = new Ext.form.FormPanel(
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
									            name : 'commsnId',
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
									            name : 'contrNum',
									            fieldLabel : '<font color=red>*</font>合同号',
									            allowBlank : false,
									            blankText : '合同号不能为空',
									            maxLength : 200,
									            minLength : 1,
									            anchor : '90%'
									           } ]
									          },{
													columnWidth : .5,
													layout : 'form',
													items : [
																new Com.xywz.common.XywzSaleInvInfoQuery(
															{
																fieldLabel : '<font color=red>*</font>发票号',
																labelStyle : 'text-align:left;',
																//labelWidth : 100,
																id : 'invNum',
																singleSelected : true,
																// 单选复选标志
																editable : true,
																allowBlank : false,
																// 不允许为空
																blankText : "发票号不能为空，请填写",
																anchor : '90%',
																callback : function(a, b) {
																	var records = Ext.getCmp('invNum').oSaleInvInfoQueryGrid.getSelectionModel().selections.items;
																	Ext.getCmp('invNum').setValue(records[0].data.INV_NUM);
																	
																}
															})]
												},{ 
											           columnWidth : .5,
											            layout : 'form',
											            items : [ new Com.xywz.common.SysmProductDetailQuery(
																{
																	fieldLabel : '<font color=red>*</font>规格型号',
																	labelStyle : 'text-align:left;',
																	//labelWidth : 100,
																	name : 'model',
																	id : 'SIZE22',
																	singleSelected : false,
																	// 单选复选标志
																	editable : false,
																	allowBlank : false,
																	// 不允许为空
																	blankText : "不能为空，请填写",
																	anchor : '90%',
																	callback : function(a, b) {
																		var records = Ext.getCmp('SIZE22').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
																		//Ext.getCmp('SIZE22').setValue(records[0].data.CORP_NM);
																		editXywzSaleCommsnMgmtForm.getForm().findField('model').setValue(records[0].data.SIZE_CONCAT);

																	}
																}) ]
											          
										           },{ 
										            columnWidth : .5,
										            layout : 'form',
										            items : [ {
										            xtype : 'textfield',
										            vtype : 'trim',
										            Width : '100',
										            name : 'weight',
										            fieldLabel : '重量',
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
										            name : 'amt',
										            fieldLabel : '金额',
										            maxLength : 200,
										            minLength : 1,
										            anchor : '90%'
										           } ]
										          },{ 

											             columnWidth : .5,
											             layout : 'form',
											             items : [ new Ext.form.ComboBox({
										      	             hiddenName : 'cur',
															 fieldLabel : '币种',
															 labelStyle: 'text-align:left;',
															 triggerAction : 'all',
															 store : boxstore2,
															 allowBlank : false,
															 displayField : 'value',
															 valueField : 'key',
															 mode : 'local',
															 forceSelection : true,
															 typeAhead : true,
															 emptyText:'请选择',
															 resizable : true,
															 editable : false,
															 anchor : '90%'
										            }) ]
											           
										          },{ 
										            columnWidth : .5,
										            layout : 'form',
										            items : [ {
										            xtype : 'textfield',
										            vtype : 'trim',
										            Width : '100',
										            name : 'commsnUprc',
										            fieldLabel : '佣金单价',
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
										            name : 'ratio',
										            fieldLabel : '比例',
										            maxLength : 200,
										            minLength : 1,
										            anchor : '90%'
										           } ]
										          },{ 
										            columnWidth : .5,
										            layout : 'form',
										            items : [ {
										            xtype : 'datefield',
										            vtype : 'trim',
										            Width : '100',
										            name : 'refundDt',
										            fieldLabel : '回款日期',
										            maxLength : 200,
										            minLength : 1,
										            anchor : '90%',
										            format:'Y-m-d'
										           } ]
										          },{ 
										            columnWidth : .5,
										            layout : 'form',
										            items : [ {
										            xtype : 'numberfield',
										            vtype : 'trim',
										            Width : '100',
										            name : 'commsnAmt',
										            fieldLabel : '佣金金额',
										            maxLength : 200,
										            minLength : 1,
										            anchor : '90%'
										           } ]
										          },{ 
										            columnWidth : .5,
										            layout : 'form',
										            items : [ {
										            xtype : 'datefield',
										            vtype : 'trim',
										            Width : '100',
										            name : 'payDt',
										            fieldLabel : '付款日期',
										            maxLength : 200,
										            minLength : 1,
										            anchor : '90%',
										            format:'Y-m-d'
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
												if (!editXywzSaleCommsnMgmtForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false;
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleCommsnMgmtAction.json',
															method : 'POST',
															form : editXywzSaleCommsnMgmtForm
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

												editXywzSaleCommsnMgmtWindow
														.hide();
											}
										},
										{
											text : '取  消',
											handler : function() {
												editXywzSaleCommsnMgmtWindow
														.hide();
											}
										} ]
							} ]
				});
		
		
		// 预览展示的from
		var detailXywzSaleCommsnMgmtForm = new Ext.form.FormPanel({
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
					            name : 'commsnId',
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
					            name : 'contrNum',
					            fieldLabel : '<font color=red>*</font>合同号',
					            allowBlank : false,
					            blankText : '合同号不能为空',
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
							            name : 'invNum',
							            fieldLabel : '发票号',
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
						            name : 'model',
						            fieldLabel : '型号',
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
						            name : 'weight',
						            fieldLabel : '重量',
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
						            name : 'amt',
						            fieldLabel : '金额',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%'
						           } ]
						          },{ 

							             columnWidth : .5,
							             layout : 'form',
							             items : [ new Ext.form.ComboBox({
						      	             hiddenName : 'cur',
											 fieldLabel : '币种',
											 labelStyle: 'text-align:left;',
											 triggerAction : 'all',
											 store : boxstore2,
											 allowBlank : false,
											 displayField : 'value',
											 valueField : 'key',
											 mode : 'local',
											 forceSelection : true,
											 typeAhead : true,
											 emptyText:'请选择',
											 resizable : true,
											 editable : false,
											 anchor : '90%'
						            }) ]
							           
						          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'textfield',
						            vtype : 'trim',
						            Width : '100',
						            name : 'commsnUprc',
						            fieldLabel : '佣金单价',
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
						            name : 'ratio',
						            fieldLabel : '比例',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%'
						           } ]
						          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'datefield',
						            vtype : 'trim',
						            Width : '100',
						            name : 'refundDt',
						            fieldLabel : '回款日期',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%',
						            format:'Y-m-d'
						           } ]
						          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'numberfield',
						            vtype : 'trim',
						            Width : '100',
						            name : 'commsnAmt',
						            fieldLabel : '佣金金额',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%'
						           } ]
						          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'datefield',
						            vtype : 'trim',
						            Width : '100',
						            name : 'payDt',
						            fieldLabel : '付款日期',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%',
						            format:'Y-m-d'
						           } ] 
							} ]
			}, {
				layout : 'form',
				buttonAlign : 'center',

				buttons : [
				    {
					text : '返  回',
					handler : function() {
				    	detailXywzSaleCommsnMgmtWindow.hide();
					}
				} ]
			}
			]
		});

		// 定义新增窗口
		var addXywzSaleCommsnMgmtWindow = new Ext.Window( {
			title : '外贸佣金新增',
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
			items : [ addXywzSaleCommsnMgmtForm ]
		});

		// 定义修改窗口
		var editXywzSaleCommsnMgmtWindow = new Ext.Window( {
			title : '外贸佣金修改',
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
			items : [ editXywzSaleCommsnMgmtForm ]
		});
		
		// 定义详情窗口
		var detailXywzSaleCommsnMgmtWindow = new Ext.Window({
			title : '外贸佣金预览',
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
			items : [ detailXywzSaleCommsnMgmtForm ]
		});

		// 表格实例
		var grid = new Ext.grid.GridPanel( {
			title : '外贸佣金列表',
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