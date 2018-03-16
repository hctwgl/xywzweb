Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({				
				id : "searchCondition",
				title : "客户银行信息查询",
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'right', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 120,
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'numberfield',
							name : 'custId',
							hidden:true
						},new Com.xywz.common.CustomerInfoQuery(
							{
								fieldLabel : '客户姓名',
								labelStyle : 'text-align:right;',
								//labelWidth : 100,
								//name : 'custShtNm',
								id : 'CUST_SHT_NM11',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('CUST_SHT_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('CUST_SHT_NM11').setValue(records[0].data.CUST_SHT_NM);
									qForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
									
								}
							}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'acctNum',
							fieldLabel : '账号',
							anchor : '95%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'bankFullNm',
							fieldLabel : '银行名称/个人姓名',
							anchor : '95%'
						} ]
					}
//					, {
//						columnWidth : .25,
//						layout : 'form',
//						items : [ {
//							xtype : 'numberfield',
//							name : 'bankId',
//							hidden:true
//						}, new Com.xywz.common.BankInfoQuery(
//								{
//									fieldLabel : '银行全称',
//									labelStyle : 'text-align:right;',
//									//labelWidth : 100,
//									name : 'bankFullNm',
//									id : 'BANK_FULL_NM11',
//									singleSelected : false,
//									// 单选复选标志
//									editable : false,
//									allowBlank : false,
//									anchor : '90%',
//									callback : function(a, b) {
//										var records = Ext.getCmp('BANK_FULL_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
//										Ext.getCmp('BANK_FULL_NM11').setValue(records[0].data.BANK_FULL_NM);
//										qForm.getForm().findField('bankId').setValue(parseInt(records[0].data.BANK_ID));
//									}
//								}) ]
//					}
					, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'swiftCode',
							fieldLabel : 'SWIFT_CODE',
							anchor : '90%',
							hidden : true
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

			var record = Ext.data.Record.create([ {
				name : 'custBankId',
				mapping : 'CUST_BANK_ID'
			}, {
				name : 'custId',
				mapping : 'CUST_ID'
			}, {
				name : 'bankId',
				mapping : 'BANK_ID'
			}, {
				name : 'custShtNm',
				mapping : 'CUST_SHT_NM'
			}, {
				name : 'acctNum',
				mapping : 'ACCT_NUM'
			},{
				name : 'bankFullNm',
				mapping : 'BANK_FULL_NM'
			},{
				name : 'bankAddr',
				mapping : 'BANK_ADDR'
			},{
				name : 'bankTel',
				mapping : 'BANK_TEL'
			},{
				name : 'swiftCode',
				mapping : 'SWIFT_CODE'
			},{
				name : 'fax',
				mapping : 'FAX'
			},{
				name : 'memo',
				mapping : 'MEMO'
			},{
				name : 'custTax',
				mapping : 'CUST_TAX'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '客户银行ID',
				width : 210,
				dataIndex : 'custBankId',
				sortable : true,
				hidden : true
			}, {
				header : '客户ID',
				width : 170,
				dataIndex : 'custId',
				sortable : true,
				hidden : true
			}, {
				header : '客户名称',
				width : 170,
				dataIndex : 'custShtNm',
				sortable : true
			}, {
				header : '账号',
				width : 170,
				dataIndex : 'acctNum',
				sortable : true
			}, {
				header : '银行名称/个人姓名',
				width : 170,
				dataIndex : 'bankFullNm',
				sortable : true
			}, {
				header : '企业税号',
				width : 170,
				dataIndex : 'custTax',
				sortable : true
			}, {
				header : '银行地址',
				width : 170,
				dataIndex : 'bankAddr',
				sortable : true
			}, {
				header : '银行电话',
				width : 170,
				hidden:false,
				dataIndex : 'bankTel',
				sortable : true
			}, {
				header : 'SWIFT_CODE',
				width : 170,
				hidden:false,
				dataIndex : 'swiftCode',
				sortable : true
			}, {
				header : '客户FAX',
				width : 170,
				hidden:false,
				dataIndex : 'fax',
				sortable : true
			}, {
				header : '备注',
				width : 170,
				hidden:false,
				dataIndex : 'memo',
				sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzCustCustBankQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'CUST_BANK_ID',
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
											addXywzCustCustBankForm.getForm().reset();											
											addXywzCustCustBankWindow.show();
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
												editXywzCustCustBankForm.getForm().loadRecord(selectRe);
												editXywzCustCustBankWindow.show();

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
												tempId = selectRe.data.custBankId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzCustCustBankAction!batchDestroy.json?idStr='+ idStr,
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
									},'-',{
										text : '预览',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												detailXywzCustCustBankForm.getForm().loadRecord(selectRe);
												detailXywzCustCustBankWindow.show();
											}
										}
									},'-',new Com.yucheng.bob.ExpButton({
							            formPanel : 'searchCondition',
							            iconCls:'exportIconCss',
							            url : basepath+'/XywzCustCustBankQueryAction.json'
							        })]
					});
			
			var detailXywzCustCustBankForm = new Ext.form.FormPanel({
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
									name : 'custId',
									fieldLabel : '客户姓名',
									maxLength:200,
									minLength:1,
									anchor : '90%',
									readOnly:true
								}]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'acctNum',
									fieldLabel : '账号',
									maxLength:200,
									minLength:1,
									anchor : '90%',
									readOnly:true
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [{
									xtype : 'textarea',
									vtype : 'trim',
									Width : '100',
									name : 'bankFullNm',
									fieldLabel : '银行名称/个人名称',
									maxLength:200,
									minLength:1,
									anchor : '90%',
									readOnly:true
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [{
									xtype : 'textarea',
									vtype : 'trim',
									Width : '100',
									name : 'custTax',
									fieldLabel : '税号',
									maxLength:200,
									minLength:1,
									anchor : '90%',
									readOnly:true
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textarea',
									vtype : 'trim',
									Width : '100',
									name : 'bankAddr',
									fieldLabel : '银行地址',
									maxLength:50,
									minLength:1,
									anchor : '90%',
									readOnly:true
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'bankTel',
									fieldLabel : '银行电话',
									allowBlank : true,
									maxLength:20,
									minLength:1,
									anchor : '90%',
									readOnly:true
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'swiftCode',
									hidden:false,
									fieldLabel : 'SWIFT_CODE',
									maxLength:100,
									minLength:1,
									anchor : '90%',
									readOnly:true
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'fax',
									hidden:false,
									fieldLabel : 'FAX',
									maxLength:100,
									minLength:1,
									anchor : '90%',
									readOnly:true
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'memo',
									hidden:false,
									fieldLabel : '备注',
									maxLength:100,
									minLength:1,
									anchor : '90%',
									readOnly:true
								} ]
							}]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [{
						text : '取  消',
						handler : function() {
							detailXywzCustCustBankWindow.hide();
						}
					} ]
				} ]
			});

			// 新增窗口展示的from
			var addXywzCustCustBankForm = new Ext.form.FormPanel({
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
									xtype : 'numberfield',
									name : 'custId',
									hidden:true
								},new Com.xywz.common.CustomerInfoQuery(
									{
										fieldLabel : '<font color=red>*</font>客户姓名',
										labelStyle : 'text-align:left;',
										//labelWidth : 100,
										name : 'custShtNm',
										id : 'CUST_SHT_NM22',
										singleSelected : false,
										// 单选复选标志
										editable : false,
										allowBlank : false,
										// 不允许为空
										blankText : "不能为空，请填写",
										anchor : '90%',
										callback : function(a, b) {
											var records = Ext.getCmp('CUST_SHT_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
											Ext.getCmp('CUST_SHT_NM22').setValue(records[0].data.CUST_SHT_NM);
											addXywzCustCustBankForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
											
										}
									})]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'acctNum',
									fieldLabel : '账号/卡号',
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'bankFullNm',
									fieldLabel : '<font color=red>*</font>银行名称/个人姓名',
									allowBlank : false,
									blankText : '银行名称/个人姓名',
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},
//							{
//								columnWidth : .5,
//								layout : 'form',
//								items : [{
//									xtype : 'numberfield',
//									name : 'bankId',
//									hidden:true
//								}, new Com.xywz.common.BankInfoQuery(
//										{
//											fieldLabel : '银行全称',
//											labelStyle : 'text-align:left;',
//											//labelWidth : 100,
//											name : 'bankFullNm',
//											id : 'BANK_FULL_NM22',
//											singleSelected : false,
//											// 单选复选标志
//											editable : false,
//											allowBlank : false,
//											// 不允许为空
//											blankText : "不能为空，请填写",
//											anchor : '90%',
//											callback : function(a, b) {
//												var records = Ext.getCmp('BANK_FULL_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
//												Ext.getCmp('BANK_FULL_NM22').setValue(records[0].data.BANK_FULL_NM);
//												addXywzCustCustBankForm.getForm().findField('bankFullNm').setValue(records[0].data.BANK_FULL_NM);
//												addXywzCustCustBankForm.getForm().findField('bankAddr').setValue(records[0].data.BANK_ADDR);
//												addXywzCustCustBankForm.getForm().findField('bankTel').setValue(records[0].data.BANK_TEL);
//												addXywzCustCustBankForm.getForm().findField('swiftCode').setValue(records[0].data.SWIFT_CODE);
//												addXywzCustCustBankForm.getForm().findField('bankId').setValue(parseInt(records[0].data.BANK_ID));
//											}
//										}) ]
//							},
							{
								columnWidth : .5,
								layout : 'form',
								items : [{
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'custTax',
									fieldLabel : '企业税号',
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'bankAddr',
									fieldLabel : '银行地址',
									maxLength:50,
									minLength:1,
									anchor : '90%',
									hidden:false
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'bankTel',
									fieldLabel : '银行电话',
									allowBlank : true,
									maxLength:20,
									minLength:1,
									anchor : '90%',
									hidden:false
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'swiftCode',
									fieldLabel : 'SWIFT_CODE',
									maxLength:100,
									minLength:1,
									anchor : '90%',
									hidden:false
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'fax',
									hidden:false,
									fieldLabel : 'FAX',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '备注',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							}]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzCustCustBankForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzCustCustBankAction.json',
								method : 'POST',
								form : addXywzCustCustBankForm.getForm().id,
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
							
							addXywzCustCustBankWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzCustCustBankWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzCustCustBankForm = new Ext.form.FormPanel({
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
									name : 'custBankId',
									hidden:true,
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},
							{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'numberfield',
									name : 'custId',
									hidden:true
								},new Com.xywz.common.CustomerInfoQuery(
									{
										fieldLabel : '<font color=red>*</font>客户姓名',
										labelStyle : 'text-align:left;',
										//labelWidth : 100,
										name : 'custShtNm',
										id : 'CUST_SHT_NM33',
										singleSelected : false,
										// 单选复选标志
										editable : false,
										allowBlank : false,
										// 不允许为空
										blankText : "不能为空，请填写",
										anchor : '90%',
										callback : function(a, b) {
											var records = Ext.getCmp('CUST_SHT_NM33').oCustomerQueryGrid.getSelectionModel().selections.items;
											Ext.getCmp('CUST_SHT_NM33').setValue(records[0].data.CUST_SHT_NM);
											editXywzCustCustBankForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));											
										}
									})]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'acctNum',
									fieldLabel : '账号/卡号',
									allowBlank : false,
									blankText : '账号不能为空',
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'bankFullNm',
									fieldLabel : '银行名称/个人姓名',
									allowBlank : false,
									blankText : '账号不能为空',
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							}							
//							{
//								columnWidth : .5,
//								layout : 'form',
//								items : [ {
//									xtype : 'numberfield',
//									name : 'bankId',
//									hidden:true
//								}, new Com.xywz.common.BankInfoQuery(
//										{
//											fieldLabel : '银行全称',
//											labelStyle : 'text-align:left;',
//											//labelWidth : 100,
//											name : 'bankFullNm',
//											id : 'BANK_FULL_NM33',
//											singleSelected : false,
//											// 单选复选标志
//											editable : false,
//											allowBlank : false,
//											// 不允许为空
//											blankText : "不能为空，请填写",
//											anchor : '90%',
//											callback : function(a, b) {
//												var records = Ext.getCmp('BANK_FULL_NM33').oCustomerQueryGrid.getSelectionModel().selections.items;
//												Ext.getCmp('BANK_FULL_NM33').setValue(records[0].data.BANK_FULL_NM);
//												addXywzCustCustBankForm.getForm().findField('bankFullNm').setValue(records[0].data.BANK_FULL_NM);
//												addXywzCustCustBankForm.getForm().findField('bankAddr').setValue(records[0].data.BANK_ADDR);
//												addXywzCustCustBankForm.getForm().findField('bankTel').setValue(records[0].data.BANK_TEL);
//												addXywzCustCustBankForm.getForm().findField('swiftCode').setValue(records[0].data.SWIFT_CODE);
//												editXywzCustCustBankForm.getForm().findField('bankId').setValue(parseInt(records[0].data.BANK_ID));
//											}
//										})]
//							}
							
							,{
								columnWidth : .5,
								layout : 'form',
								items : [{
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'custTax',
									fieldLabel : '企业税号',
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'bankAddr',
									fieldLabel : '银行地址',
									maxLength:50,
									minLength:1,
									anchor : '90%',
									hidden : false
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'bankTel',
									fieldLabel : '银行电话',
									allowBlank : true,
									maxLength:20,
									minLength:1,
									anchor : '90%',
									hidden : false
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'swiftCode',
									fieldLabel : 'SWIFT_CODE',
									maxLength:100,
									minLength:1,
									anchor : '90%',
									hidden : false
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'fax',
									hidden:false,
									fieldLabel : 'FAX',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '备注',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzCustCustBankForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzCustCustBankAction.json',
								method : 'POST',
								form : editXywzCustCustBankForm.getForm().id,
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
							
							editXywzCustCustBankWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzCustCustBankWindow.hide();
						}
					} ]
				} ]
			});

			var detailXywzCustCustBankWindow = new Ext.Window({
				title : '客户银行信息详情',
				plain : true,
				layout : 'fit',
				width : 880,
				height : 400,
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
				items : [ detailXywzCustCustBankForm ]
			});

			// 定义新增窗口
			var addXywzCustCustBankWindow = new Ext.Window({
				title : '客户银行信息新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :400,
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
				items : [ addXywzCustCustBankForm ]
			});

			// 定义修改窗口
			var editXywzCustCustBankWindow = new Ext.Window({
				title : '客户银行信息修改',
				plain : true,
				layout : 'fit',
				width : 880,
				height : 400,
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
				items : [ editXywzCustCustBankForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '客户银行信息列表',
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