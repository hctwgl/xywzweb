//外贸报价单信息表
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
			url :basepath+'/lookup.json?name=XYWZ_IF_FLAG'
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
	var qForm = new Ext.form.FormPanel( {
		id : "searchCondition",
		title : "外贸报价单信息",
		labelWidth : 90, // 标签宽度
		frame : true, // 是否渲染表单面板背景色
		labelAlign : 'middle', // 标签对齐方式
		buttonAlign : 'center',
		region : 'north',
		split : true,
		height : 100,
		items : [ {
			layout : 'column',
			items : [
			{
				columnWidth : .25,
				layout : 'form',
				items : [ 
                        new Ext.form.ComboBox({
							hiddenName : 'chkStat',
							fieldLabel : '审核状态',
							labelStyle: 'text-align:right;',
							triggerAction : 'all',
							store : boxstore1,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							editable:false,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
           					}) ]
               }, {
				columnWidth : .25,
				layout : 'form',
				items : [ {
					xtype : 'textfield',
					Width : '100',
					name : 'quotnSnglNum',
					fieldLabel : '报价单编号',
					anchor : '90%'
				} ]
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
	// 复选框 //添加一个Ora
		var sm = new Ext.grid.CheckboxSelectionModel();

		// 定义自动当前页行号
		var rownum = new Ext.grid.RowNumberer( {
			header : 'No.',
			width : 28
		});

		var record = Ext.data.Record.create( [ {
	
			   name : 'quotnSnglId',
			   mapping : 'QUOTN_SNGL_ID'
			  },{ 
			   name : 'chkStat',
			   mapping : 'CHK_STAT'
			  }, { 
			   name : 'chkStatOra',
			   mapping : 'CHK_STAT_ORA'
			  }, { 
			   name : 'quotnSnglNum',
			   mapping : 'QUOTN_SNGL_NUM'
			  }, { 
			   name : 'quotnDt',
			   mapping : 'QUOTN_DT'
			  }, { 
			   name : 'prcCond',
			   mapping : 'PRC_COND'
			  }, { 
			   name : 'paySpfy',
			   mapping : 'PAY_SPFY'
			  }, { 
			   name : 'pkg',
			   mapping : 'PKG'
			  }, { 
			   name : 'tolerance',
			   mapping : 'TOLERANCE'
			  }, { 
			   name : 'deliveryWeight',
			   mapping : 'DELIVERY_WEIGHT'
			  }, { 
			   name : 'quotnValidPrd',
			   mapping : 'QUOTN_VALID_PRD'
			  }, { 
			   name : 'portofLoading',
			   mapping : 'PORTOF_LOADING'
			  }, { 
			   name : 'portofDischarge',
			   mapping : 'PORTOF_DISCHARGE'
			  }, { 
			   name : 'deliveryTime',
			   mapping : 'DELIVERY_TIME'
			  }, { 
			   name : 'deliveryTerm',
			   mapping : 'DELIVERY_TERM'
			  }, { 
			   name : 'issuDt',
			   mapping : 'ISSU_DT'
			  }, { 
			   name : 'inputPersId',
			   mapping : 'INPUT_PERS_ID'
			  }, { 
			   name : 'inputPersNm',
			   mapping : 'INPUT_PERS_NM'
			  }, { 
			   name : 'inputDt',
			   mapping : 'INPUT_DT'
			  }, { 
			   name : 'lastMdfrId',
			   mapping : 'LAST_MDFR_ID'
			  }, { 
			   name : 'lastMdfr',
			   mapping : 'LAST_MDFR'
			  }, { 
			   name : 'lastModiDt',
			   mapping : 'LAST_MODI_DT'
		      } ,{
			  name : 'portNameCn',
			   mapping : 'PORT_NAME_CN'
			  }, {
			  name : 'unPortNameCn',
			   mapping : 'UN_PORT_NAME_CN'
			  }]);

		// 定义列模型 //修改成Ora

		var cm = new Ext.grid.ColumnModel( [ rownum, sm,{
//			   header : '报价单ID',
//			   width : 100,
//			   dataIndex : 'quotnSnglId',
//			   sortable : true
//			  }, { 
			   header : '审核状态',
			   width : 100,
			   dataIndex : 'chkStatOra',
			   sortable : true
			  }, { 
			   header : '报价单编号',
			   width : 100,
			   dataIndex : 'quotnSnglNum',
			   sortable : true
			  }, { 
			   header : '报价日期',
			   width : 100,
			   dataIndex : 'quotnDt',
			   sortable : true
			  }, { 
			   header : '价格条件',
			   width : 100,
			   dataIndex : 'prcCond',
			   sortable : true
			  }, { 
			   header : '付款指示',
			   width : 100,
			   dataIndex : 'paySpfy',
			   sortable : true
			  }, { 
			   header : '包装',
			   width : 100,
			   dataIndex : 'pkg',
			   sortable : true
			  }, { 
			   header : '公差',
			   width : 100,
			   dataIndex : 'tolerance',
			   sortable : true
			  }, { 
			   header : '交货重量',
			   width : 100,
			   dataIndex : 'deliveryWeight',
			   sortable : true
			  }, { 
			   header : '报价有效期',
			   width : 100,
			   dataIndex : 'quotnValidPrd',
			   sortable : true
			  }, { 
			   header : '启运港',
			   width : 100,
			   dataIndex : 'portNameCn',
			   sortable : true
			  }, { 
			   header : '目的港',
			   width : 100,
			   dataIndex : 'unPortNameCn',
			   sortable : true
			  }, { 
			   header : '交货时间',
			   width : 100,
			   dataIndex : 'deliveryTime',
			   sortable : true
			  }, { 
			   header : '交货期',
			   width : 100,
			   dataIndex : 'deliveryTerm',
			   sortable : true
			  }, { 
			   header : '发行日期',
			   width : 100,
			   dataIndex : 'issuDt',
			   sortable : true
			  }, { 
			   header : '录入人编号',
			   width : 100,
			   dataIndex : 'inputPersId',
			   sortable : true
			  }, { 
			   header : '录入人名称',
			   width : 100,
			   dataIndex : 'inputPersNm',
			   sortable : true
			  }, { 
			   header : '录入日期',
			   width : 100,
			   dataIndex : 'inputDt',
			   sortable : true
			  }, { 
			   header : '最后一次修改人编号',
			   width : 100,
			   dataIndex : 'lastMdfrId',
			   sortable : true
			  }, { 
			   header : '最后一次修改人',
			   width : 100,
			   dataIndex : 'lastMdfr',
			   sortable : true
			  }, { 
			   header : '最后一次修改日期',
			   width : 100,
			   dataIndex : 'lastModiDt',
			   sortable : true
		} ]);

		/**
		 * 数据存储
		 */
		var store = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
//json修改
				url : basepath + '/XywzSaleFrgnQuotnSnglQueryAction.json'
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
									addXywzSaleFrgnQuotnSnglForm.getForm().reset();
									addXywzSaleFrgnQuotnSnglForm.getForm().findField('chkStat').setValue('0');
									addXywzSaleFrgnQuotnSnglWindow.show();
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
										editXywzSaleFrgnQuotnSnglForm.getForm()
												.loadRecord(selectRe);
										editXywzSaleFrgnQuotnSnglWindow.show();

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
																tempId = selectRe.data.quotnSnglId; 
																idStr += tempId;
																if (i != selectLength - 1)
																	idStr += ',';
															}
//action名称
															Ext.Ajax
																	.request( {
																		url : basepath
																				+ '/XywzSaleFrgnQuotnSnglAction!batchDestroy.json?idStr='
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
					            url : basepath+'/XywzSaleFrgnQuotnSnglQueryAction.json'
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
										detailXywzSaleFrgnQuotnSnglForm
												.getForm().loadRecord(
														selectRe);
										detailXywzSaleFrgnQuotnSnglWindow.show();
									}
								}
							} ]
				});

		// 新增窗口展示的from
		var addXywzSaleFrgnQuotnSnglForm = new Ext.form.FormPanel(
				{
					labelWidth : 150,
					height : 180,
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
								              name : 'quotnSnglId',
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
								              name : 'quotnSnglNum',
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
							    				items : [ 
							                            new Ext.form.ComboBox({
							    							hiddenName : 'chkStat',
							    							fieldLabel : '<font color=red>*</font>审核状态',
							    							labelStyle: 'text-align:left;',
							    							triggerAction : 'all',
							    							store : boxstore1,
							    							displayField : 'value',
							    							valueField : 'key',
							    							mode : 'local',
							    							forceSelection : true,
							    							editable:false,
							    							typeAhead : true,
							    							emptyText:'请选择',
							    							resizable : true,
							    							anchor : '90%'
							               					}) ]
							            },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								              xtype : 'datefield',
								              vtype : 'trim',
								              Width : '100',
								              name : 'quotnDt',
								              fieldLabel : '<font color=red>*</font>报价日期',
								              allowBlank : false,
								              blankText : '报价日期不能为空',
								              maxLength : 200,
								              minLength : 1,
								              anchor : '90%',
								              format:'Y-m-d'
								             } ]
								            },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								              xtype : 'textfield',
								              vtype : 'trim',
								              Width : '100',
								              name : 'prcCond',
								              fieldLabel : '价格条件',
								            // fieldLabel : '<font color=red>*</font>价格条件',
								            //  allowBlank : false,
								            //  blankText : '价格条件不能为空',
								              maxLength : 200,
								              minLength : 1,
								              anchor : '90%'
								             } ]
								            },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								              xtype : 'textarea',
								              vtype : 'trim',
								              Width : '100',
								              name : 'paySpfy',
								              fieldLabel : '付款指示',
								              //allowBlank : false,
								              //blankText : '付款指示不能为空',
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
								              name : 'pkg',
								              fieldLabel : '包装',
//								              allowBlank : false,
//								              blankText : '包装不能为空',
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
								              name : 'tolerance',
								              fieldLabel : '公差',
//								              allowBlank : false,
//								              blankText : '公差不能为空',
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
								              name : 'deliveryWeight',
								              fieldLabel : '交货重量',
//								              allowBlank : false,
//								              blankText : '交货重量不能为空',
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
								              name : 'quotnValidPrd',
								              fieldLabel : '<font color=red>*</font>报价有效期',
								              allowBlank : false,
								              blankText : '报价有效期不能为空',
								              maxLength : 200,
								              minLength : 1,
								              anchor : '90%'
								             } ]
								            },{
												columnWidth : .5,
												layout : 'form',
												items : [ {
													xtype : 'numberfield',
													name : 'portofLoading',
													hidden:true
												},new Com.xywz.common.PortMgmtInfoQuery(
													{
														fieldLabel : '起运港',
														labelStyle : 'text-align:left;',
														//labelWidth : 100,
														name : 'portNameCn',
														id : 'PORT_NAME11',
														singleSelected : false,
														// 单选复选标志
														editable : false,
//														allowBlank : false,
//														// 不允许为空
//														blankText : "不能为空，请填写",
														anchor : '90%',
														callback : function(a, b) {
															var records = Ext.getCmp('PORT_NAME11').oCustomerQueryGrid.getSelectionModel().selections.items;
															Ext.getCmp('PORT_NAME11').setValue(records[0].data.PORT_NAME_CN);
															addXywzSaleFrgnQuotnSnglForm.getForm().findField('portofLoading').setValue(parseInt(records[0].data.PORT_ID));
															
														}
													}) ]
											},{
												columnWidth : .5,
												layout : 'form',
												items : [ {
													xtype : 'numberfield',
													name : 'portofDischarge',
													hidden:true
												},new Com.xywz.common.PortMgmtInfoQuery(
													{
														fieldLabel : '目的港',
														labelStyle : 'text-align:left;',
														//labelWidth : 100,
														name : 'unPortNameCn',
														id : 'PORT_NAME22',
														singleSelected : false,
														// 单选复选标志
														editable : false,
//														allowBlank : false,
//														// 不允许为空
//														blankText : "不能为空，请填写",
														anchor : '90%',
														callback : function(a, b) {
															var records = Ext.getCmp('PORT_NAME22').oCustomerQueryGrid.getSelectionModel().selections.items;
															Ext.getCmp('PORT_NAME22').setValue(records[0].data.PORT_NAME_CN);
															addXywzSaleFrgnQuotnSnglForm.getForm().findField('portofDischarge').setValue(parseInt(records[0].data.PORT_ID));
	
														}
													}) ]
											},{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								              xtype : 'datefield',
								              vtype : 'trim',
								              Width : '100',
								              name : 'deliveryTime',
								              fieldLabel : '交货时间',
//								              allowBlank : false,
//								              blankText : '交货时间不能为空',
								              maxLength : 200,
								              minLength : 1,
								              anchor : '90%',
								              format:'Y-m-d'
								             } ]
								            },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								              xtype : 'textfield',
								              vtype : 'trim',
								              Width : '100',
								              name : 'deliveryTerm',
								              fieldLabel : '交货期',
//								              allowBlank : false,
//								              blankText : '交货期不能为空',
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
								              name : 'issuDt',
								              fieldLabel : '发行日期',
//								              allowBlank : false,
//								              blankText : '发行日期不能为空',
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
												if (!addXywzSaleFrgnQuotnSnglForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false; //注掉此行可以正确插入，但不知原因
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleFrgnQuotnSnglAction.json',
															method : 'POST',
															form : addXywzSaleFrgnQuotnSnglForm
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

												addXywzSaleFrgnQuotnSnglWindow.hide();
											}
										}, {
											text : '取  消',
											handler : function() {
											addXywzSaleFrgnQuotnSnglWindow.hide();
											}
										} ]
							} ]
				});

		// 修改窗口展示的from
		var editXywzSaleFrgnQuotnSnglForm = new Ext.form.FormPanel(
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
								              name : 'quotnSnglId',
								              maxLength : 200,
								              minLength : 1, 
								              hidden:true,
								              anchor : '90%'
								             } ]
								            },{ 
								            	columnWidth : .5,
							    				layout : 'form',
							    				items : [ 
							                            new Ext.form.ComboBox({
							    							hiddenName : 'chkStat',
							    							fieldLabel : '<font color=red>*</font>审核状态',
							    							labelStyle: 'text-align:left;',
							    							triggerAction : 'all',
							    							store : boxstore1,
							    							displayField : 'value',
							    							valueField : 'key',
							    							mode : 'local',
							    							forceSelection : true,
							    							editable:false,
							    							typeAhead : true,
							    							emptyText:'请选择',
							    							resizable : true,
							    							anchor : '90%'
							               					}) ]
								            },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								              xtype : 'textfield',
								              vtype : 'trim',
								              Width : '100',
								              name : 'quotnSnglNum',
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
								              xtype : 'datefield',
								              vtype : 'trim',
								              Width : '100',
								              name : 'quotnDt',
								              fieldLabel : '<font color=red>*</font>报价日期',
								              allowBlank : false,
								              blankText : '报价日期不能为空',
								              maxLength : 200,
								              minLength : 1,
								              anchor : '90%',
								              format:'Y-m-d'
								             } ]
								            },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ {
									              xtype : 'textfield',
									              vtype : 'trim',
									              Width : '100',
									              name : 'prcCond',
									              fieldLabel : '价格条件',
									            // fieldLabel : '<font color=red>*</font>价格条件',
									            //  allowBlank : false,
									            //  blankText : '价格条件不能为空',
									              maxLength : 200,
									              minLength : 1,
									              anchor : '90%'
									             } ]
									            },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ {
									              xtype : 'textarea',
									              vtype : 'trim',
									              Width : '100',
									              name : 'paySpfy',
									              fieldLabel : '付款指示',
									              //allowBlank : false,
									              //blankText : '付款指示不能为空',
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
									              name : 'pkg',
									              fieldLabel : '包装',
//									              allowBlank : false,
//									              blankText : '包装不能为空',
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
									              name : 'tolerance',
									              fieldLabel : '公差',
//									              allowBlank : false,
//									              blankText : '公差不能为空',
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
									              name : 'deliveryWeight',
									              fieldLabel : '交货重量',
//									              allowBlank : false,
//									              blankText : '交货重量不能为空',
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
									              name : 'quotnValidPrd',
									              fieldLabel : '<font color=red>*</font>报价有效期',
									              allowBlank : false,
									              blankText : '报价有效期不能为空',
									              maxLength : 200,
									              minLength : 1,
									              anchor : '90%'
									             } ]
									            },{
													columnWidth : .5,
													layout : 'form',
													items : [ {
														xtype : 'numberfield',
														name : 'portofLoading',
														hidden:true
													},new Com.xywz.common.PortMgmtInfoQuery(
														{
															fieldLabel : '起运港',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'portNameCn',
															id : 'PORT_NAME33',
															singleSelected : false,
															// 单选复选标志
															editable : false,
//															allowBlank : false,
															// 不允许为空
//															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('PORT_NAME33').oCustomerQueryGrid.getSelectionModel().selections.items;
																Ext.getCmp('PORT_NAME33').setValue(records[0].data.PORT_NAME_CN);

																editXywzSaleFrgnQuotnSnglForm.getForm().findField('portofLoading').setValue(parseInt(records[0].data.PORT_ID));
																
															}
														}) ]
												},{
													columnWidth : .5,
													layout : 'form',
													items : [ {
														xtype : 'numberfield',
														name : 'portofDischarge',
														hidden:true
													},new Com.xywz.common.PortMgmtInfoQuery(
														{
															fieldLabel : '目的港',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'unPortNameCn',
															id : 'PORT_NAME55',
															singleSelected : false,
															// 单选复选标志
															editable : false,
//															allowBlank : false,
//															// 不允许为空
//															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('PORT_NAME55').oCustomerQueryGrid.getSelectionModel().selections.items;
																Ext.getCmp('PORT_NAME55').setValue(records[0].data.PORT_NAME_CN);
																editXywzSaleFrgnQuotnSnglForm.getForm().findField('portofDischarge').setValue(parseInt(records[0].data.PORT_ID));
																
															}
														}) ]
												},{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ {
									              xtype : 'datefield',
									              vtype : 'trim',
									              Width : '100',
									              name : 'deliveryTime',
									              fieldLabel : '交货时间',
//									              allowBlank : false,
//									              blankText : '交货时间不能为空',
									              maxLength : 200,
									              minLength : 1,
									              anchor : '90%',
									              format:'Y-m-d'
									             } ]
									            },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ {
									              xtype : 'textfield',
									              vtype : 'trim',
									              Width : '100',
									              name : 'deliveryTerm',
									              fieldLabel : '交货期',
//									              allowBlank : false,
//									              blankText : '交货期不能为空',
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
									              name : 'issuDt',
									              fieldLabel : '发行日期',
//									              allowBlank : false,
//									              blankText : '发行日期不能为空',
									              maxLength : 200,
									              minLength : 1,
									              anchor : '90%',
									              format:'Y-m-d'

									             } ]
								            },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								              xtype : 'textfield',
								              vtype : 'trim',
								              Width : '100',
								              name : 'inputPersId',
								              fieldLabel : '录入人编号',
								              readOnly:true,
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
								              name : 'inputPersNm',
								              fieldLabel : '录入人名称',
								              readOnly:true,
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
								              name : 'inputDt',
								              fieldLabel : '录入日期',
								              readOnly:true,
								              maxLength : 200,
								              minLength : 1,
								              anchor : '90%',
								              format:'Y-m-d'
								             } ]
								            },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								              xtype : 'textfield',
								              vtype : 'trim',
								              Width : '100',
								              name : 'lastMdfrId',
								              fieldLabel : '最后一次修改人编号',
								              readOnly:true,
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
								              name : 'lastMdfr',
								              fieldLabel : '最后一次修改人',
								              readOnly:true,
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
								              name : 'lastModiDt',
								              fieldLabel : '最后一次修改日期',
								              readOnly:true,
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
												if (!editXywzSaleFrgnQuotnSnglForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false;
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleFrgnQuotnSnglAction.json',
															method : 'POST',
															form : editXywzSaleFrgnQuotnSnglForm
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

												editXywzSaleFrgnQuotnSnglWindow
														.hide();
											}
										},
										{
											text : '取  消',
											handler : function() {
												editXywzSaleFrgnQuotnSnglWindow
														.hide();
											}
										} ]
							} ]
				});
		
		// 预览展示的from
		var detailXywzSaleFrgnQuotnSnglForm = new Ext.form.FormPanel({
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
				              name : 'quotnSnglId',
				              maxLength : 200,
				              minLength : 1, 
				              hidden:true,
				              anchor : '90%'
				             } ]
				            },{ 
				            	columnWidth : .5,
			    				layout : 'form',
			    				items : [ 
			                            new Ext.form.ComboBox({
			    							hiddenName : 'chkStat',
			    							fieldLabel : '<font color=red>*</font>审核状态',
			    							labelStyle: 'text-align:left;',
			    							triggerAction : 'all',
			    							store : boxstore1,
			    							displayField : 'value',
			    							valueField : 'key',
			    							mode : 'local',
			    							forceSelection : true,
			    							editable:false,
			    							typeAhead : true,
			    							emptyText:'请选择',
			    							resizable : true,
			    							anchor : '90%'
			               					}) ]
				            },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [ {
				              xtype : 'textfield',
				              vtype : 'trim',
				              Width : '100',
				              name : 'quotnSnglNum',
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
				              xtype : 'datefield',
				              vtype : 'trim',
				              Width : '100',
				              name : 'quotnDt',
				              fieldLabel : '<font color=red>*</font>报价日期',
				              allowBlank : false,
				              blankText : '报价日期不能为空',
				              maxLength : 200,
				              minLength : 1,
				              anchor : '90%',
				              format:'Y-m-d'
				             } ]
				            },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					              xtype : 'textfield',
					              vtype : 'trim',
					              Width : '100',
					              name : 'prcCond',
					              fieldLabel : '价格条件',
					            // fieldLabel : '<font color=red>*</font>价格条件',
					            //  allowBlank : false,
					            //  blankText : '价格条件不能为空',
					              maxLength : 200,
					              minLength : 1,
					              anchor : '90%'
					             } ]
					            },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					              xtype : 'textarea',
					              vtype : 'trim',
					              Width : '100',
					              name : 'paySpfy',
					              fieldLabel : '付款指示',
					              //allowBlank : false,
					              //blankText : '付款指示不能为空',
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
					              name : 'pkg',
					              fieldLabel : '包装',
//					              allowBlank : false,
//					              blankText : '包装不能为空',
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
					              name : 'tolerance',
					              fieldLabel : '公差',
//					              allowBlank : false,
//					              blankText : '公差不能为空',
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
					              name : 'deliveryWeight',
					              fieldLabel : '交货重量',
//					              allowBlank : false,
//					              blankText : '交货重量不能为空',
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
					              name : 'quotnValidPrd',
					              fieldLabel : '<font color=red>*</font>报价有效期',
					              allowBlank : false,
					              blankText : '报价有效期不能为空',
					              maxLength : 200,
					              minLength : 1,
					              anchor : '90%'
					             } ]
					            },{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'numberfield',
										name : 'portofLoading',
										hidden:true
									}, {
							              xtype : 'textfield',
							              vtype : 'trim',
							              Width : '100',
							              name : 'portNameCn',
							              fieldLabel : '<font color=red>*</font>起运港',
							              allowBlank : false,
							              blankText : '起运港不能为空',
							              maxLength : 200,
							              minLength : 1,
							              anchor : '90%'
							             } ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'numberfield',
										name : 'portofDischarge',
										hidden:true
									},{
							              xtype : 'textfield',
							              vtype : 'trim',
							              Width : '100',
							              name : 'unPortNameCn',
							              fieldLabel : '<font color=red>*</font>目的港',
							              allowBlank : false,
							              blankText : '目的港不能为空',
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
					              name : 'deliveryTime',
					              fieldLabel : '交货时间',
//					              allowBlank : false,
//					              blankText : '交货时间不能为空',
					              maxLength : 200,
					              minLength : 1,
					              anchor : '90%',
					              format:'Y-m-d'
					             } ]
					            },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					              xtype : 'textfield',
					              vtype : 'trim',
					              Width : '100',
					              name : 'deliveryTerm',
					              fieldLabel : '交货期',
//					              allowBlank : false,
//					              blankText : '交货期不能为空',
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
					              name : 'issuDt',
					              fieldLabel : '发行日期',
//					              allowBlank : false,
//					              blankText : '发行日期不能为空',
					              maxLength : 200,
					              minLength : 1,
					              anchor : '90%',
					              format:'Y-m-d'

					             } ]
				            },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [ {
				              xtype : 'textfield',
				              vtype : 'trim',
				              Width : '100',
				              name : 'inputPersId',
				              fieldLabel : '录入人编号',
				              readOnly:true,
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
				              name : 'inputPersNm',
				              fieldLabel : '录入人名称',
				              readOnly:true,
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
				              name : 'inputDt',
				              fieldLabel : '录入日期',
				              readOnly:true,
				              maxLength : 200,
				              minLength : 1,
				              anchor : '90%',
				              format:'Y-m-d'
				             } ]
				            },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [ {
				              xtype : 'textfield',
				              vtype : 'trim',
				              Width : '100',
				              name : 'lastMdfrId',
				              fieldLabel : '最后一次修改人编号',
				              readOnly:true,
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
				              name : 'lastMdfr',
				              fieldLabel : '最后一次修改人',
				              readOnly:true,
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
				              name : 'lastModiDt',
				              fieldLabel : '最后一次修改日期',
				              readOnly:true,
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
				    	detailXywzSaleFrgnQuotnSnglWindow.hide();
					}
				} ]
			}
			]
		});

		// 定义新增窗口
		var addXywzSaleFrgnQuotnSnglWindow = new Ext.Window( {
			title : '外贸报价单新增',
			plain : true,
			layout : 'fit',
			width : 800,
			height : 300,
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
			items : [ addXywzSaleFrgnQuotnSnglForm ]
		});

		// 定义修改窗口
		var editXywzSaleFrgnQuotnSnglWindow = new Ext.Window( {
			title : '外贸报价单修改',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 360,
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
			items : [ editXywzSaleFrgnQuotnSnglForm ]
		});
		
		// 定义详情窗口
		var detailXywzSaleFrgnQuotnSnglWindow = new Ext.Window({
			title : '外贸报价单预览',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 360,
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
			items : [ detailXywzSaleFrgnQuotnSnglForm ]
		});

		// 表格实例
		var grid = new Ext.grid.GridPanel( {
			title : '外贸报价单列表',
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