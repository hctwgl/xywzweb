//签约状态
Ext.onReady(function() {
	Ext.QuickTips.init();
	var qForm = new Ext.form.FormPanel( {
		id : "searchCondition",
		title : "标签管理",
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
					name : 'shippingmarks',
					fieldLabel : '唛头',
					anchor : '90%'
				} ]
			} ,
			{
				columnWidth : .25,
				layout : 'form',
				items : [ {
					xtype : 'textfield',
					Width : '100',
					name : 'quality',
					fieldLabel : '材质',
					anchor : '90%'
				} ]
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
	//添加一个Ora
		var sm = new Ext.grid.CheckboxSelectionModel();

		// 定义自动当前页行号
		var rownum = new Ext.grid.RowNumberer( {
			header : 'No.',
			width : 28
		});

		var record = Ext.data.Record.create( [ {
	
			 name : 'labelId',
			   mapping : 'LABEL_ID'
			          },{
			  name : 'shippingmarks',
			   mapping : 'SHIPPINGMARKS'
			          },{
			  name : 'size',
			   mapping : 'SIZE'
			          },{
			  name : 'quality',
			   mapping : 'QUALITY'
			          },{
			  name : 'heatNumber',
			   mapping : 'HEAT_NUMBER'
			          },{
			  name : 'thickness',
			   mapping : 'THICKNESS'
			          },{
			  name : 'millsName',
			   mapping : 'MILLS_NAME'
			          },{
			  name : 'backNote',
			   mapping : 'BACK_NOTE'
			          },{
			  name : 'bundleNumber',
			   mapping : 'BUNDLE_NUMBER'
			          },{
			  name : 'pcsBundle',
			   mapping : 'PCS_BUNDLE'
			          },{
			  name : 'colour',
			   mapping : 'COLOUR'
			          },{
			  name : 'memo',
			   mapping : 'MEMO'
			          },{
			   name : 'contrNum',
			   mapping : 'CONTR_NUM'
			          },{ 
			   name : 'model',
			   mapping : 'MODEL' 
			          },{ 
			   name : 'hsCode',
			   mapping : 'HS_CODE'
			          },{ 
			   name : 'qty',
			   mapping : 'QTY' 
			          },{
			   name : 'sendId',
			   mapping : 'SEND_ID'
			          },{ 
			   name : 'sendSheetAdvsNum',
			   mapping : 'SEND_SHEET_ADVS_NUM' 

		} ]);

		// 定义列模型 //修改成Ora

		var cm = new Ext.grid.ColumnModel( [ rownum, sm, {
			  header : '标签ID',
			   width : 100,
			   dataIndex : 'labelId',
			   sortable : true
        },{
			   header : '合同号',
			   width : 210,
			   dataIndex : 'contrNum',
			   sortable : true
			          },{ 
			   header : '规格型号',
			   width : 210,
			   dataIndex : 'model',
			   sortable : true 
			          },{
        	   header : '发货商品明细ID',
        	   width : 210,
        	   dataIndex : 'sendId',
        	   sortable : true
        	          },{ 
        	   header : '发运通知单编号',
        	   width : 210,
        	   dataIndex : 'sendSheetAdvsNum',
        	   sortable : true 
			          },{
        	   header : '品名',
        	   width : 210,
        	   dataIndex : 'hsCode',
        	   sortable : true
        	          },{ 
        	   header : '吨数',
        	   width : 210,
        	   dataIndex : 'qty',
        	   sortable : true     
			          },{  
			  header : '唛头',
			  width : 100,
			   dataIndex : 'shippingmarks',
			   sortable : true
			          },{
			  header : '尺寸',
			  width : 100,
			   dataIndex : 'size',
			   sortable : true
			          },{
			  header : '材质',
			   width : 100,
			   dataIndex : 'quality',
			   sortable : true
			          },{
			  header : '炉号',
			   width : 100,
			   dataIndex : 'heatNumber',
			   sortable : true
			          },{
			  header : '厚度',
			   width : 100,
			   dataIndex : 'thickness',
			   sortable : true
			          },{
			  header : 'MILLS_NAME',
			   width : 100,
			   dataIndex : 'millsName',
			   sortable : true
			          },{
			  header : '标签反面注释',
			   width : 100,
			   dataIndex : 'backNote',
			   sortable : true
			          },{
			  header : '件数',
			   width : 100,
			   dataIndex : 'bundleNumber',
			   sortable : true
			          },{
			  header : '支/件',
			   width : 100,
			   dataIndex : 'pcsBundle',
			   sortable : true
			          },{
			  header : '颜色',
			   width : 100,
			   dataIndex : 'colour',
			   sortable : true
			          },{
			  header : '备注',
			   width : 100,
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
				url : basepath + '/XywzSaleLabelMgmtQueryAction.json'
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
									addXywzSaleLabelMgmtForm.getForm()
											.reset();
									addXywzSaleLabelMgmtWindow.show();
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
										editXywzSaleLabelMgmtForm.getForm()
												.loadRecord(selectRe);
										editXywzSaleLabelMgmtWindow.show();

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
																tempId = selectRe.data.labelId; 
																idStr += tempId;
																if (i != selectLength - 1)
																	idStr += ',';
															}
//action名称
															Ext.Ajax
																	.request( {
																		url : basepath
																				+ '/XywzSaleLabelMgmtAction!batchDestroy.json?idStr='
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
							},'-',{
								text : '打印',
								iconCls:'exportIconCss',
								handler : function(button) {
									var record = grid.getSelectionModel().getSelected();
									var selectLength = grid.getSelectionModel().getSelections().length;
					      			if(record==null || record == undefined||selectLength>1){
					      				Ext.MessageBox.alert('提示','请选择一条记录.');
					      				return;
					      			}
					      			var sheetId = record.get("labelId");
						  			window.open(basepath+"/contents/pages/xywz/sale/xywzSaleLabelMgmtPrint.jsp?sheetId="+sheetId,"newwindow","");
								}
							},'-',new Com.yucheng.bob.ExpButton({
					            formPanel : 'searchCondition',
					            iconCls:'exportIconCss',
					            url : basepath+'/XywzSaleLabelMgmtQueryAction.json'
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
										detailXywzSaleLabelMgmtForm
												.getForm().loadRecord(
														selectRe);
										detailXywzSaleLabelMgmtWindow.show();
									}
								}
							} ]
				});

// 新增窗口展示的from
		var addXywzSaleLabelMgmtForm = new Ext.form.FormPanel(
				{
					labelWidth : 150,
					height : 250,
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
										            name : 'labelId',
										            maxLength : 200,
										            minLength : 1, 
										            hidden:true,
										            anchor : '90%'
										           } ]
				          					},{ 
		                                         columnWidth : .5,
		                                         layout : 'form',
		                                         items : [ new Com.xywz.common.LogiDelvMerchdQuery(
															{
																fieldLabel : '发货商品明细ID',
																labelStyle : 'text-align:left;',
																//labelWidth : 100,
																name : 'sendId',
																id : 'SEND_ID11',
																singleSelected : false,
																// 单选复选标志
																editable : false,
																//allowBlank : false,
																// 不允许为空
																//blankText : "不能为空，请填写",
																anchor : '90%',
																callback : function(a, b) {
																	var records = Ext.getCmp('SEND_ID11').oLogiDelvMerchdQueryGrid.getSelectionModel().selections.items;
																	Ext.getCmp('SEND_ID11').setValue(records[0].data.ID);
																	addXywzSaleLabelMgmtForm.getForm().findField('sendSheetAdvsNum').setValue(records[0].data.SEND_SHEET_ADVS_NUM);
																	addXywzSaleLabelMgmtForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
																	addXywzSaleLabelMgmtForm.getForm().findField('model').setValue(records[0].data.SPC_MODEL);
																	addXywzSaleLabelMgmtForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
																	addXywzSaleLabelMgmtForm.getForm().findField('qty').setValue(records[0].data.WEIGHT);
																	addXywzSaleLabelMgmtForm.getForm().findField('bundleNumber').setValue(records[0].data.QTY);
																	addXywzSaleLabelMgmtForm.getForm().findField('pcsBundle').setValue(records[0].data.ZHI_CNT);
																	addXywzSaleLabelMgmtForm.getForm().findField('quality').setValue(records[0].data.MATERIALS);
																	addXywzSaleLabelMgmtForm.getForm().findField('size').setValue(records[0].data.LEN);
																}
															}) ]
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
			                                          readOnly : true,
			                                          maxLength : 200,
			                                          minLength : 1,
			                                          anchor : '90%'
			                                         } ]
			                                        }
//		                                       {
//		                                          columnWidth : .5,
//		                                          layout : 'form',
//		                                          items : [ new Com.xywz.common.InvMerchdDtlQuery(
//															{
//																fieldLabel : '<font color=red>*</font>合同号',
//																labelStyle : 'text-align:left;',
//																//labelWidth : 100,
//																name : 'contrNum',
//																id : 'CONTR_NUM11',
//																singleSelected : false,
//																// 单选复选标志
//																editable : false,
//																allowBlank : false,
//																// 不允许为空
//																blankText : "不能为空，请填写",
//																anchor : '90%',
//																callback : function(a, b) {
//																	var records = Ext.getCmp('CONTR_NUM11').oCustomerQueryGrid.getSelectionModel().selections.items;
//																	Ext.getCmp('CONTR_NUM11').setValue(records[0].data.CONTR_NUM);
//																	addXywzSaleLabelMgmtForm.getForm().findField('size').setValue(records[0].data.MODEL);
//																	addXywzSaleLabelMgmtForm.getForm().findField('model').setValue(records[0].data.MODEL);
//																	addXywzSaleLabelMgmtForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
//																	
//																}
//															}) ]
//		                                        }
		                                       ,{ 
		                                          columnWidth : .5,
		                                          layout : 'form',
		                                          items : [ {
		                                          xtype : 'textfield',
		                                          vtype : 'trim',
		                                          Width : '100',
		                                          name : 'model',
		                                          fieldLabel : '<font color=red>*</font>规格型号',
		                                          allowBlank : false,
		                                          blankText : '规格型号不能为空',
		                                          readOnly : true,
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
		                                         name : 'sendSheetAdvsNum',
		                                         fieldLabel : '发运通知单编号',
		                                         maxLength : 20,
		                                         minLength : 1,
		                                         readOnly : true,
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
		                                         readOnly : true,
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
		                                         name : 'qty',
		                                         fieldLabel : '<font color=red>*</font>吨数',
		                                         allowBlank : false,
		                                         readOnly : true,
		                                         blankText : '吨数不能为空',
		                                         anchor : '90%'
		                                        } ] 
													},{
										           columnWidth : .5,
										            layout : 'form',
										            items : [ {
										            xtype : 'textfield',
										            vtype : 'trim',
										            Width : '100',
										            name : 'shippingmarks',
										            fieldLabel : '<font color=red>*</font>唛头',
										            allowBlank : false,
										            blankText : '唛头不能为空',
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
										            name : 'size',
										            fieldLabel : '尺寸',
//										            allowBlank : false,
//										            blankText : '尺寸不能为空',
										            readOnly : true,
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
										            name : 'quality',
										            fieldLabel : '<font color=red>*</font>材质',
										            readOnly : true,
										            allowBlank : false,
										            blankText : '材质不能为空',
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
										            name : 'heatNumber',
										            fieldLabel : '<font color=red>*</font>炉号',
										            allowBlank : false,
										            blankText : '炉号不能为空',
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
										            name : 'thickness',
										            fieldLabel : '厚度',
//										            allowBlank : false,
//										            blankText : '厚度不能为空',
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
										            name : 'millsName',
										            fieldLabel : '<font color=red>*</font>MILLS_NAME',
										            allowBlank : false,
										            blankText : 'MILLS_NAME不能为空',
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
										            name : 'bundleNumber',
										            fieldLabel : '<font color=red>*</font>件数',
										            allowBlank : false,
										            blankText : '件数不能为空',
										            readOnly : true,
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
										            name : 'pcsBundle',
										            fieldLabel : '<font color=red>*</font>支/件',
										            allowBlank : false,
										            blankText : '支/件不能为空',
										            readOnly : true,
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
										            name : 'colour',
										            fieldLabel : '<font color=red>*</font>颜色',
										            allowBlank : false,
										            blankText : '颜色不能为空',
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
										            fieldLabel : '备注',
//										            allowBlank : false,
//										            blankText : '备注不能为空',
										            maxLength : 200,
										            minLength : 1,
										            anchor : '90%'
											   } ]
										          },{
											           columnWidth : 1.06,
											            layout : 'form',
											            items : [ {
											            xtype : 'textarea',
											            vtype : 'trim',
											            Width : '100',
											            name : 'backNote',
											            fieldLabel : '标签反面注释',
											            allowBlank : false,
											            blankText : '标签反面注释不能为空',
											            maxLength : 500,
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
												if (!addXywzSaleLabelMgmtForm.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false; //注掉此行可以正确插入，但不知原因
												}
													
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleLabelMgmtAction.json',
															method : 'POST',
															form : addXywzSaleLabelMgmtForm
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

												addXywzSaleLabelMgmtWindow.hide();
											}
										}, {
											text : '取  消',
											handler : function() {
											addXywzSaleLabelMgmtWindow.hide();
											}
										} ]
							} ]
				});

// 修改窗口展示的from
		var editXywzSaleLabelMgmtForm = new Ext.form.FormPanel(
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
										            name : 'labelId',
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
																fieldLabel : '<font color=red>*</font>合同号',
																labelStyle : 'text-align:left;',
																//labelWidth : 100,
																name : 'contrNum',
																id : 'CONTR_NUM22',
																singleSelected : false,
																// 单选复选标志
																editable : false,
																allowBlank : false,
																// 不允许为空
																blankText : "不能为空，请填写",
																anchor : '90%',
																callback : function(a, b) {
																	var records = Ext.getCmp('CONTR_NUM22').oCustomerQueryGrid.getSelectionModel().selections.items;
																	Ext.getCmp('CONTR_NUM22').setValue(records[0].data.CONTR_NUM);
																	editXywzSaleLabelMgmtForm.getForm().findField('size').setValue(records[0].data.MODEL);
																	editXywzSaleLabelMgmtForm.getForm().findField('model').setValue(records[0].data.MODEL);
																	editXywzSaleLabelMgmtForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
																	
																}
															}) ]
		                                        },{ 
		                                          columnWidth : .5,
		                                          layout : 'form',
		                                          items : [ {
		                                          xtype : 'textfield',
		                                          vtype : 'trim',
		                                          Width : '100',
		                                          name : 'model',
		                                          fieldLabel : '<font color=red>*</font>规格型号',
		                                          allowBlank : false,
		                                          blankText : '规格型号不能为空',
		                                          readOnly : true,
		                                          maxLength : 200,
		                                          minLength : 1,
		                                          anchor : '90%'
		                                         } ]
		                                        },{ 
			                                         columnWidth : .5,
			                                         layout : 'form',
			                                         items : [ new Com.xywz.common.LogiDelvMerchdQuery(
																{
																	fieldLabel : '发货商品明细ID',
																	labelStyle : 'text-align:left;',
																	//labelWidth : 100,
																	name : 'sendId',
																	id : 'SEND_ID22',
																	singleSelected : false,
																	// 单选复选标志
																	editable : false,
																	//allowBlank : false,
																	// 不允许为空
																	//blankText : "不能为空，请填写",
																	anchor : '90%',
																	callback : function(a, b) {
																		var records = Ext.getCmp('SEND_ID22').oLogiDelvMerchdQueryGrid.getSelectionModel().selections.items;
																		Ext.getCmp('SEND_ID22').setValue(records[0].data.ID);
																		editXywzSaleLabelMgmtForm.getForm().findField('sendSheetAdvsNum').setValue(records[0].data.SEND_SHEET_ADVS_NUM);
																		
																	}
																}) ]
			                                       },{ 
			                                         columnWidth : .5,
			                                         layout : 'form',
			                                         items : [ {
			                                         xtype : 'textfield',
			                                         vtype : 'trim',
			                                         Width : '100',
			                                         name : 'sendSheetAdvsNum',
			                                         fieldLabel : '发运通知单编号',
			                                         maxLength : 20,
			                                         minLength : 1,
			                                         readOnly : true,
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
			                                         xtype : 'numberfield',
			                                         vtype : 'trim',
			                                         Width : '100',
			                                         name : 'qty',
			                                         fieldLabel : '<font color=red>*</font>吨数',
			                                         allowBlank : false,
			                                         blankText : '吨数不能为空',
			                                         anchor : '90%'
			                                        } ] 
										          },{
										           columnWidth : .5,
										            layout : 'form',
										            items : [ {
										            xtype : 'textfield',
										            vtype : 'trim',
										            Width : '100',
										            name : 'shippingmarks',
										            fieldLabel : '<font color=red>*</font>唛头',
										            allowBlank : false,
										            blankText : '唛头不能为空',
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
										            name : 'size',
										            fieldLabel : '尺寸',
//										            allowBlank : false,
//										            blankText : '尺寸不能为空',
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
										            name : 'quality',
										            fieldLabel : '<font color=red>*</font>材质',
										            allowBlank : false,
										            blankText : '材质不能为空',
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
										            name : 'heatNumber',
										            fieldLabel : '<font color=red>*</font>炉号',
										            allowBlank : false,
										            blankText : '炉号不能为空',
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
										            name : 'thickness',
										            fieldLabel : '厚度',
//										            allowBlank : false,
//										            blankText : '厚度不能为空',
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
										            name : 'millsName',
										            fieldLabel : '<font color=red>*</font>MILLS_NAME',
										            allowBlank : false,
										            blankText : 'MILLS_NAME不能为空',
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
										            name : 'bundleNumber',
										            fieldLabel : '<font color=red>*</font>件数',
										            allowBlank : false,
										            blankText : '件数不能为空',
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
										            name : 'pcsBundle',
										            fieldLabel : '<font color=red>*</font>支/件',
										            allowBlank : false,
										            blankText : '支/件不能为空',
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
										            name : 'colour',
										            fieldLabel : '<font color=red>*</font>颜色',
										            allowBlank : false,
										            blankText : '颜色不能为空',
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
										            fieldLabel : '备注',
//										            allowBlank : false,
//										            blankText : '备注不能为空',
										            maxLength : 200,
										            minLength : 1,
										            anchor : '90%'
											   } ]
										          },{
											           columnWidth : 1.06,
											            layout : 'form',
											            items : [ {
											            xtype : 'textarea',
											            vtype : 'trim',
											            Width : '100',
											            name : 'backNote',
											            fieldLabel : '标签反面注释',
											            allowBlank : false,
											            blankText : '标签反面注释不能为空',
											            maxLength : 500,
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
												if (!editXywzSaleLabelMgmtForm.getForm().isValid()) {
													Ext.Msg.alert('提示','输入格式有误，请重新输入!');
													return false;
												}
												
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleLabelMgmtAction.json',
															method : 'POST',
															form : editXywzSaleLabelMgmtForm
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

												editXywzSaleLabelMgmtWindow
														.hide();
											}
										},
										{
											text : '取  消',
											handler : function() {
												editXywzSaleLabelMgmtWindow
														.hide();
											}
										} ]
							} ]
				});
		
		// 预览展示的from
		var detailXywzSaleLabelMgmtForm = new Ext.form.FormPanel({
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
						            name : 'labelId',
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
                                name : 'model',
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
                                  xtype : 'numberfield',
                                  vtype : 'trim',
                                  Width : '100',
                                  name : 'sendId',
                                  fieldLabel : '发货商品明细ID',
                                  anchor : '90%'
                                 } ]
                                },{ 
                                  columnWidth : .5,
                                  layout : 'form',
                                  items : [ {
                                  xtype : 'textfield',
                                  vtype : 'trim',
                                  Width : '100',
                                  name : 'sendSheetAdvsNum',
                                  fieldLabel : '发运通知单编号',
                                  maxLength : 20,
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
						            name : 'shippingmarks',
						            fieldLabel : '<font color=red>*</font>唛头',
						            allowBlank : false,
						            blankText : '唛头不能为空',
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
						            name : 'size',
						            fieldLabel : '尺寸',
//						            allowBlank : false,
//						            blankText : '尺寸不能为空',
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
						            name : 'quality',
						            fieldLabel : '<font color=red>*</font>材质',
						            allowBlank : false,
						            blankText : '材质不能为空',
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
						            name : 'heatNumber',
						            fieldLabel : '炉号',
//						            allowBlank : false,
//						            blankText : '炉号不能为空',
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
						            name : 'thickness',
						            fieldLabel : '厚度',
//						            allowBlank : false,
//						            blankText : '厚度不能为空',
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
						            name : 'millsName',
						            fieldLabel : '<font color=red>*</font>MILLS_NAME',
						            allowBlank : false,
						            blankText : 'MILLS_NAME不能为空',
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
						            name : 'bundleNumber',
						            fieldLabel : '<font color=red>*</font>件数',
						            allowBlank : false,
						            blankText : '件数不能为空',
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
						            name : 'pcsBundle',
						            fieldLabel : '<font color=red>*</font>支/件',
						            allowBlank : false,
						            blankText : '支/件不能为空',
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
						            name : 'colour',
						            fieldLabel : '<font color=red>*</font>颜色',
						            allowBlank : false,
						            blankText : '颜色不能为空',
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
						            fieldLabel : '备注',
//						            allowBlank : false,
//						            blankText : '备注不能为空',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%'
							   } ]
						          },{
							           columnWidth : 1.06,
							            layout : 'form',
							            items : [ {
							            xtype : 'textarea',
							            vtype : 'trim',
							            Width : '100',
							            name : 'backNote',
							            fieldLabel : '标签反面注释',
							            allowBlank : false,
							            blankText : '标签反面注释不能为空',
							            maxLength : 500,
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
				    	detailXywzSaleLabelMgmtWindow.hide();
					}
				} ]
			}
			]
		});

		// 定义新增窗口
		var addXywzSaleLabelMgmtWindow = new Ext.Window( {
			title : '标签新增',
			plain : true,
			layout : 'fit',
			width : 800,
			height : 380,
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
			items : [ addXywzSaleLabelMgmtForm ]
		});

		// 定义修改窗口
		var editXywzSaleLabelMgmtWindow = new Ext.Window( {
			title : '标签修改',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 380,
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
			items : [ editXywzSaleLabelMgmtForm ]
		});
		
		// 定义详情窗口
		var detailXywzSaleLabelMgmtWindow = new Ext.Window({
			title : '标签预览',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 380,
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
			items : [ detailXywzSaleLabelMgmtForm ]
		});

		// 表格实例
		var grid = new Ext.grid.GridPanel( {
			title : '标签管理',
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