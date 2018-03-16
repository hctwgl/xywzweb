Ext.onReady(function() {
	Ext.QuickTips.init();
	//“币种”选择数据集
	var boxstore = new Ext.data.Store({  
		sortInfo: {
	    	field: 'key',
	    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
		},
		restful:true,   
		autoLoad :true,
		proxy : new Ext.data.HttpProxy({
			url :basepath+'/lookup.json?name=XYWZ_CUR'
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
	var qForm = new Ext.form.FormPanel( {
		id : "searchCondition",
		title : "内贸商品明细",
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
				items : [ new Com.xywz.common.SaleInlandOrdrContrQuery(
	   					{
	  						fieldLabel : '<font color=red>*</font>内贸合同号',
	  						labelStyle : 'text-align:left;',
	  						//labelWidth : 100,
	  						name : 'inlandOrdrNum',
	  						id : 'INLAND_ORDR_NUM',
	  						singleSelected : false,
	  						// 单选复选标志
	  						//editable : false,
	  						allowBlank : false,
	  						// 不允许为空
	  						blankText : "不能为空，请填写",
	  						anchor : '90%',
	  						callback : function(a, b) {
	  							var records = Ext.getCmp('INLAND_ORDR_NUM').oSaleInlandOrdrContrQueryGrid.getSelectionModel().selections.items;
	  							Ext.getCmp('INLAND_ORDR_NUM').setValue(records[0].data.CONTR_NUM);
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
			   name : 'inlandMerchandiseId',
			   mapping : 'INLAND_MERCHANDISE_ID'
			  }, { 
			   name : 'inlandOrdrNum',
			   mapping : 'INLAND_ORDR_NUM'
			  }, { 
			   name : 'spcModel',
			   mapping : 'SPC_MODEL'
			  }, { 
			   name : 'qty',
			   mapping : 'QTY'
			  }, { 
			   name : 'uprc',
			   mapping : 'UPRC'
			  }, { 
			   name : 'amt',
			   mapping : 'AMT'
			  }, { 
			   name : 'costPlusFreight',
			   mapping : 'COST_PLUS_FREIGHT'
			  }, { 
			   name : 'cur',
			   mapping : 'CUR'
			  }, { 
				   name : 'curOra',
				   mapping : 'CUR_ORA'
			  }, { 
			   name : 'hsCode',
			   mapping : 'HS_CODE'
			  }, { 
			   name : 'materials',
			   mapping : 'MATERIALS'
			  }, { 
			   name : 'ngtvPoor',
			   mapping : 'NGTV_POOR'
			  }, { 
			   name : 'pkg',
			   mapping : 'PKG'
			  }, { 
			   name : 'memo',
			   mapping : 'MEMO'
			  }, { 
			   name : 'tolerance',
			   mapping : 'TOLERANCE'
			  }, { 
			   name : 'len',
			   mapping : 'LEN'
			  },{    
				   name : 'chkStat',
				   mapping : 'CHK_STAT' 
			  },{    
				   name : 'chkStatOra',
				   mapping : 'CHK_STAT_ORA'

		} ]);

		// 定义列模型

		var cm = new Ext.grid.ColumnModel( [ rownum, sm, {
			   header : '内贸商品ID',
			   width : 100,
			   dataIndex : 'inlandMerchandiseId',
			   sortable : true
			  }, { 
			   header : '内贸合同号',
			   width : 100,
			   dataIndex : 'inlandOrdrNum',
			   sortable : true
			  }, { 
			   header : '规格型号',
			   width : 100,
			   dataIndex : 'spcModel',
			   sortable : true
			  }, { 
			   header : '吨数',
			   width : 100,
			   dataIndex : 'qty',
			   sortable : true
			  }, { 
			   header : '单价',
			   width : 100,
			   dataIndex : 'uprc',
			   sortable : true
			  }, { 
			   header : '金额',
			   width : 100,
			   dataIndex : 'amt',
			   sortable : true
			  }, { 
			   header : '成本加运费',
			   width : 100,
			   dataIndex : 'costPlusFreight',
			   sortable : true
			  }, { 
			   header : '币种',
			   width : 100,
			   dataIndex : 'curOra',
			   sortable : true
			  }, { 
			   header : '品名',
			   width : 100,
			   dataIndex : 'hsCode',
			   sortable : true
			  }, { 
			   header : '材质',
			   width : 100,
			   dataIndex : 'materials',
			   sortable : true
			  }, { 
			   header : '负差',
			   width : 100,
			   dataIndex : 'ngtvPoor',
			   sortable : true
			  }, { 
			   header : '包装',
			   width : 100,
			   dataIndex : 'pkg',
			   sortable : true
			  }, { 
			   header : '备注',
			   width : 100,
			   dataIndex : 'memo',
			   sortable : true
			  }, { 
			   header : '公差',
			   width : 100,
			   dataIndex : 'tolerance',
			   sortable : true
			  }, { 
			   header : '长度',
			   width : 100,
			   dataIndex : 'len',
			   sortable : true
			  }, { 
				   header : '下达状态',
				   width : 100,
				   dataIndex : 'chkStatOra',
				   sortable : true
		} ]);

		/**
		 * 数据存储
		 */
		var store = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
//json修改
				url : basepath + '/XywzSaleInlandMerchdDtlQueryAction.json'
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
							
									addXywzSaleInlandMerchdDtlForm.getForm()
											.reset();
									addXywzSaleInlandMerchdDtlWindow.show();
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
									var idStr='';
									
									idStr = selectRe.data.chkStat;
							
									if (idStr == '1'){
										Ext.Msg.alert('提示','此商品对应的订单已下达，不能修改');
										return;
									}

									if (selectLength != 1) {
										Ext.Msg.alert('提示', '请选择一条记录!');
									} else {
//编辑修改
										editXywzSaleInlandMerchdDtlForm.getForm()
												.loadRecord(selectRe);
										editXywzSaleInlandMerchdDtlWindow.show();

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
									var selectRe = grid.getSelectionModel().getSelections()[0];
									var idStr='';
									
									idStr = selectRe.data.chkStat;
									//Ext.Msg.alert(idStr);
									if (idStr == '1'){
										Ext.Msg.alert('提示','此商品对应的订单已下达，不能删除');
										return;
									}
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
																tempId = selectRe.data.inlandMerchandiseId; 
																idStr += tempId;
																if (i != selectLength - 1)
																	idStr += ',';
															}
//action名称
															Ext.Ajax
																	.request( {
																		url : basepath
																				+ '/XywzSaleInlandMerchdDtlAction!batchDestroy.json?idStr='
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
					            url : basepath+'/XywzSaleInlandMerchdDtlQueryAction.json'
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
										detailXywzSaleInlandMerchdDtlForm
												.getForm().loadRecord(
														selectRe);
										detailXywzSaleInlandMerchdDtlWindow.show();
									}
								}
							} ]
				});

		// 新增窗口展示的from
		var addXywzSaleInlandMerchdDtlForm = new Ext.form.FormPanel(
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
								             name : 'inlandMerchandiseId',
								             maxLength : 200,
								             minLength : 1, 
								             hidden:true,
								             anchor : '90%'
								            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ new Com.xywz.common.SaleInlandOrdrContrQuery(
									   					{
									  						fieldLabel : '<font color=red>*</font>内贸合同号',
									  						labelStyle : 'text-align:left;',
									  						//labelWidth : 100,
									  						name : 'inlandOrdrNum',
									  						id : 'INLAND_ORDR_NUM11',
									  						singleSelected : false,
									  						// 单选复选标志
									  						editable : false,
									  						allowBlank : false,
									  						// 不允许为空
									  						blankText : "不能为空，请填写",
									  						anchor : '90%',
									  						callback : function(a, b) {
									  							var records = Ext.getCmp('INLAND_ORDR_NUM11').oSaleInlandOrdrContrQueryGrid.getSelectionModel().selections.items;
									  							Ext.getCmp('INLAND_ORDR_NUM11').setValue(records[0].data.CONTR_NUM);
//									  							Ext.Msg.alert('提示',records[0].data.CHK_STAT);
									   							if (records[0].data.CHK_STAT==1){
																	Ext.Msg.alert('提示','此合同已经下达，不能新增商品!');
//																	addXywzSaleInlandMerchdDtlForm.getForm().findField('contrNum').setValue(null);
//																	addXywzSaleInlandMerchdDtlForm.getForm().findField('cur').setValue(null);
															        return false;
																	
																}
									  						}
									  					}) ]
								           },{ 
								        	   columnWidth : .5,
									            layout : 'form',
									            items : [ new Com.xywz.common.SysmProductDetailQuery(
														{
															fieldLabel : '<font color=red>*</font>规格型号',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'spcModel',
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
																addXywzSaleInlandMerchdDtlForm.getForm().findField('spcModel').setValue(records[0].data.SIZE_CONCAT);
																addXywzSaleInlandMerchdDtlForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
																addXywzSaleInlandMerchdDtlForm.getForm().findField('materials').setValue(records[0].data.MATERIALS);
															}
														}) ]
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
								             name : 'uprc',
								             fieldLabel : '单价',
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
								             name : 'amt',
								             fieldLabel : '金额',
								             hidden:true,
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
								             name : 'costPlusFreight',
								             fieldLabel : '成本加运费',
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
												 store : boxstore,
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
								             name : 'hsCode',
								             fieldLabel : '<font color=red>*</font>品名',
								             allowBlank : false,
								             readOnly:true,
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
								             name : 'materials',
								             fieldLabel : '<font color=red>*</font>材质',
								             allowBlank : false,
								             readOnly:true,
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
								             name : 'ngtvPoor',
								             fieldLabel : '<font color=red>*</font>负差',
								             allowBlank : false,
								             blankText : '负差不能为空',
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
//								             allowBlank : false,
//								             blankText : '包装不能为空',
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
//								             allowBlank : false,
//								             blankText : '备注不能为空',
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
//								             allowBlank : false,
//								             blankText : '公差不能为空',
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
								             name : 'len',
								             fieldLabel : '<font color=red>*</font>长度',
								             allowBlank : false,
								             blankText : '长度不能为空',
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
												if (!addXywzSaleInlandMerchdDtlForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false; //注掉此行可以正确插入，但不知原因
												}
												//计算价格
												addXywzSaleInlandMerchdDtlForm.getForm().findField('amt').setValue(addXywzSaleInlandMerchdDtlForm.getForm().findField('uprc').getValue()*addXywzSaleInlandMerchdDtlForm.getForm().findField('qty').getValue());
											
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInlandMerchdDtlAction.json',
															method : 'POST',
															form : addXywzSaleInlandMerchdDtlForm
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

												addXywzSaleInlandMerchdDtlWindow.hide();
											}
										}, {
											text : '取  消',
											handler : function() {
											addXywzSaleInlandMerchdDtlWindow.hide();
											}
										} ]
							} ]
				});

		// 修改窗口展示的from
		var editXywzSaleInlandMerchdDtlForm = new Ext.form.FormPanel(
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
								             name : 'inlandMerchandiseId',
								             maxLength : 200,
								             minLength : 1, 
								             hidden:true,
								             anchor : '90%'
								            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ new Com.xywz.common.SaleInlandOrdrContrQuery(
									   					{
									  						fieldLabel : '<font color=red>*</font>内贸合同号',
									  						labelStyle : 'text-align:left;',
									  						//labelWidth : 100,
									  						name : 'inlandOrdrNum',
									  						id : 'INLAND_ORDR_NUM22',
									  						singleSelected : false,
									  						// 单选复选标志
									  						editable : false,
									  						allowBlank : false,
									  						// 不允许为空
									  						blankText : "不能为空，请填写",
									  						anchor : '90%',
									  						callback : function(a, b) {
									  							var records = Ext.getCmp('INLAND_ORDR_NUM22').oSaleInlandOrdrContrQueryGrid.getSelectionModel().selections.items;
									  							Ext.getCmp('INLAND_ORDR_NUM22').setValue(records[0].data.CONTR_NUM);
									  						}
									  					}) ]
								           },{ 
								        	   columnWidth : .5,
									            layout : 'form',
									            items : [ new Com.xywz.common.SysmProductDetailQuery(
														{
															fieldLabel : '<font color=red>*</font>规格型号',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'spcModel',
															id : 'SIZE11',
															singleSelected : false,
															// 单选复选标志
															editable : false,
															allowBlank : false,
															// 不允许为空
															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('SIZE11').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
																//Ext.getCmp('SIZE22').setValue(records[0].data.CORP_NM);
																editXywzSaleInlandMerchdDtlForm.getForm().findField('spcModel').setValue(records[0].data.SIZE_CONCAT);
																editXywzSaleInlandMerchdDtlForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
																editXywzSaleInlandMerchdDtlForm.getForm().findField('materials').setValue(records[0].data.MATERIALS);
															}
														}) ]
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
								             name : 'uprc',
								             fieldLabel : '单价',
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
								             name : 'amt',
								             fieldLabel : '<font color=red>*</font>金额',
								             hidden:true,
//								             allowBlank : false,
//								             blankText : '金额不能为空',
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
								             name : 'costPlusFreight',
								             fieldLabel : '成本加运费',
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
												 store : boxstore,
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
								             name : 'materials',
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
								             name : 'ngtvPoor',
								             fieldLabel : '<font color=red>*</font>负差',
								             allowBlank : false,
								             blankText : '负差不能为空',
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
//								             allowBlank : false,
//								             blankText : '包装不能为空',
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
//								             allowBlank : false,
//								             blankText : '备注不能为空',
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
//								             allowBlank : false,
//								             blankText : '公差不能为空',
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
								             name : 'len',
								             fieldLabel : '<font color=red>*</font>长度',
								             allowBlank : false,
								             blankText : '长度不能为空',
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
												if (!editXywzSaleInlandMerchdDtlForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false;
												}
												//计算价格
												editXywzSaleInlandMerchdDtlForm.getForm().findField('amt').setValue(editXywzSaleInlandMerchdDtlForm.getForm().findField('uprc').getValue()*editXywzSaleInlandMerchdDtlForm.getForm().findField('qty').getValue());
											
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInlandMerchdDtlAction.json',
															method : 'POST',
															form : editXywzSaleInlandMerchdDtlForm
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

												editXywzSaleInlandMerchdDtlWindow
														.hide();
											}
										},
										{
											text : '取  消',
											handler : function() {
												editXywzSaleInlandMerchdDtlWindow
														.hide();
											}
										} ]
							} ]
				});
		
		// 预览展示的from
		var detailXywzSaleInlandMerchdDtlForm = new Ext.form.FormPanel({
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
				             name : 'inlandMerchandiseId',
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
				             name : 'inlandOrdrNum',
				             fieldLabel : '<font color=red>*</font>内贸合同号',
				             allowBlank : false,
				             blankText : '内贸合同号不能为空',
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
				             name : 'qty',
				             fieldLabel : '<font color=red>*</font>吨数',
				             allowBlank : false,
				             blankText : '吨数不能为空',
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
				             name : 'uprc',
				             fieldLabel : '单价',
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
				             name : 'amt',
				             fieldLabel : '金额',
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
				             name : 'costPlusFreight',
				             fieldLabel : '成本加运费',
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
				             name : 'cur',
				             fieldLabel : '币种',
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
				             name : 'materials',
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
				             name : 'ngtvPoor',
				             fieldLabel : '<font color=red>*</font>负差',
				             allowBlank : false,
				             blankText : '负差不能为空',
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
				             fieldLabel : '<font color=red>*</font>包装',
				             allowBlank : false,
				             blankText : '包装不能为空',
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
				           },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [ {
				             xtype : 'textfield',
				             vtype : 'trim',
				             Width : '100',
				             name : 'tolerance',
				             fieldLabel : '<font color=red>*</font>公差',
				             allowBlank : false,
				             blankText : '公差不能为空',
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
				             name : 'len',
				             fieldLabel : '<font color=red>*</font>长度',
				             allowBlank : false,
				             blankText : '长度不能为空',
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
				    	detailXywzSaleInlandMerchdDtlWindow.hide();
					}
				} ]
			}
			]
		});

		// 定义新增窗口
		var addXywzSaleInlandMerchdDtlWindow = new Ext.Window( {
			title : '内贸商品明细新增',
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
			items : [ addXywzSaleInlandMerchdDtlForm ]
		});

		// 定义修改窗口
		var editXywzSaleInlandMerchdDtlWindow = new Ext.Window( {
			title : '内贸商品明细修改',
			plain : true,
			layout : 'fit',
			width : 880,
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
			border : false,
			items : [ editXywzSaleInlandMerchdDtlForm ]
		});
		
		// 定义详情窗口
		var detailXywzSaleInlandMerchdDtlWindow = new Ext.Window({
			title : '内贸商品明细预览',
			plain : true,
			layout : 'fit',
			width : 880,
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
			border : false,
			items : [ detailXywzSaleInlandMerchdDtlForm ]
		});

		// 表格实例
		var grid = new Ext.grid.GridPanel( {
			title : '内贸商品明细列表',
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