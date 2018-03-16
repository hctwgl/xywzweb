Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "供应商银行信息查询",
				labelWidth : 150, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'middle', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 120,
				items : [ {
					layout : 'column',
					items : [  {
					columnWidth : .33,
					layout : 'form',
					items : [ new Com.xywz.common.PurcProvrMgmtCustQuery(
						{
							fieldLabel : '供应商编号',
							labelStyle : 'text-align:left;',
							//labelWidth : 100,
							name : 'provrNum',
							id : 'PROVR_NUM11',
							singleSelected : false,
							// 单选复选标志
//							editable : false,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('PROVR_NUM11').oPurcProvrMgmtCustQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('PROVR_NUM11').setValue(records[0].data.PROVR_NUM);									
							}
						}) ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ new Com.xywz.common.BankInfoQuery(
							{
								fieldLabel : '银行全称',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'bankFullNm',
								id : 'BANK_FULL_NM11',
								singleSelected : false,
								// 单选复选标志
//								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('BANK_FULL_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('BANK_FULL_NM11').setValue(records[0].data.BANK_FULL_NM);									
								}
							}) ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'enFstNm',
							fieldLabel : '英文名',
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
				   name : 'id',
				   mapping : 'ID'
				  }, { 
					   name : 'bankId',
					   mapping : 'BANK_ID'
					  }, { 
				   name : 'provrNum',
				   mapping : 'PROVR_NUM'
				  }, { 
				   name : 'acctNum',
				   mapping : 'ACCT_NUM'
				  }, { 
				   name : 'bankFullNm',
				   mapping : 'BANK_FULL_NM'
				  }, { 
				   name : 'enFstNm',
				   mapping : 'EN_FST_NM'
				  }, { 
				   name : 'bankAddr',
				   mapping : 'BANK_ADDR'
				  }, { 
				   name : 'bankTel',
				   mapping : 'BANK_TEL'
				  }, { 
				   name : 'openAcctFstNm',
				   mapping : 'OPEN_ACCT_FST_NM'
				  }, { 
				   name : 'bfcy',
				   mapping : 'BFCY'
				  }, { 
				   name : 'memo',
				   mapping : 'MEMO'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				   header : 'ID',
				   width : 210,
				   dataIndex : 'id',
				   hidden : true,
				   sortable : true
				  }, { 
				   header : '供应商编号',
				   width : 210,
				   dataIndex : 'provrNum',
				   sortable : true
				  }, { 
				   header : '账号',
				   width : 210,
				   dataIndex : 'acctNum',
				   sortable : true
				  }, { 
				   header : '银行全名',
				   width : 210,
				   dataIndex : 'bankFullNm',
				   sortable : true
				  }, { 
				   header : '英文名',
				   width : 210,
				   dataIndex : 'enFstNm',
				   sortable : true
				  }, { 
				   header : '银行地址',
				   width : 210,
				   dataIndex : 'bankAddr',
				   sortable : true
				  }, { 
				   header : '银行电话',
				   width : 210,
				   dataIndex : 'bankTel',
				   sortable : true
				  }, { 
				   header : '开户名',
				   width : 210,
				   dataIndex : 'openAcctFstNm',
				   sortable : true
				  }, { 
				   header : '受益人',
				   width : 210,
				   dataIndex : 'bfcy',
				   sortable : true
				  }, { 
				   header : '备注',
				   width : 210,
				   dataIndex : 'memo',
				   sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPurcProvrMgmtBankQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'ID',
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
											addXywzPurcProvrMgmtBankForm.getForm().reset();
											addXywzPurcProvrMgmtBankWindow.show();
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
												editXywzPurcProvrMgmtBankForm.getForm().loadRecord(selectRe);
												editXywzPurcProvrMgmtBankWindow.show();

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
												tempId = selectRe.data.id;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzPurcProvrMgmtBankAction!batchDestroy.json?idStr='+ idStr,
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
									},'-',new Com.yucheng.bob.ExpButton({
							            formPanel : 'searchCondition',
							            iconCls:'exportIconCss',
							            url : basepath+'/XywzPurcProvrMgmtBankQueryAction.json'
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
												detailXywzPurcProvrMgmtBankForm
														.getForm().loadRecord(
																selectRe);
												detailXywzPurcProvrMgmtBankWindow.show();
											}
										}
									}]
					});

			// 新增窗口展示的from
			var addXywzPurcProvrMgmtBankForm = new Ext.form.FormPanel({
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
								 items : [ new Com.xywz.common.PurcProvrMgmtCustQuery(
									{
										fieldLabel : '<font color=red>*</font>供应商编号',
										labelStyle : 'text-align:left;',
										//labelWidth : 100,
										name : 'provrNum',
										id : 'PROVR_NUM22',
										singleSelected : false,
										// 单选复选标志
										editable : false,
										allowBlank : false,
										// 不允许为空
										blankText : "不能为空，请填写",
										anchor : '90%',
										callback : function(a, b) {
											var records = Ext.getCmp('PROVR_NUM22').oPurcProvrMgmtCustQueryGrid.getSelectionModel().selections.items;
											Ext.getCmp('PROVR_NUM22').setValue(records[0].data.PROVR_NUM);									
										}
									}) ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'acctNum',
					             fieldLabel : '<font color=red>*</font>账号',
					             allowBlank : false,
					             blankText : '账号不能为空',
					             maxLength : 50,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
								 columnWidth : .5,
								 layout : 'form',
								 items : [ new Com.xywz.common.BankInfoQuery(
									{
										fieldLabel : '<font color=red>*</font>银行全名',
										labelStyle : 'text-align:left;',
										//labelWidth : 100,
										name : 'bankFullNm',
										id : 'BANK_FULL_NM22',
										singleSelected : false,
										// 单选复选标志
										editable : false,
										allowBlank : false,
										// 不允许为空
										blankText : "不能为空，请填写",
										anchor : '90%',
										callback : function(a, b) {
											var records = Ext.getCmp('BANK_FULL_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
											Ext.getCmp('BANK_FULL_NM22').setValue(records[0].data.BANK_FULL_NM);
											addXywzPurcProvrMgmtBankForm.getForm().findField('bankAddr').setValue(records[0].data.BANK_ADDR);
											addXywzPurcProvrMgmtBankForm.getForm().findField('bankTel').setValue(records[0].data.BANK_TEL);
										}
									}) ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textarea',
					             vtype : 'trim',
					             Width : '100',
					             name : 'bankAddr',
					             fieldLabel : '银行地址',
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
					             name : 'enFstNm',
					             fieldLabel : '英文名',
					             maxLength : 100,
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
					             name : 'bankTel',
					             fieldLabel : '银行电话',
					             readOnly : true,
					             maxLength : 50,
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
					             name : 'openAcctFstNm',
					             fieldLabel : '<font color=red>*</font>开户名',
					             allowBlank : false,
					             blankText : '开户名不能为空',
					             maxLength : 100,
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
					             name : 'bfcy',
					             fieldLabel : '<font color=red>*</font>受益人',
					             allowBlank : false,
					             blankText : '受益人不能为空',
					             maxLength : 100,
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
					             name : 'memo',
					             fieldLabel : '备注',
					             maxLength : 500,
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
					             name : 'id',
					             maxLength : 200,
					             minLength : 1, 
					             hidden:true,
					             anchor : '90%'
					            } ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzPurcProvrMgmtBankForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPurcProvrMgmtBankAction.json',
								method : 'POST',
								form : addXywzPurcProvrMgmtBankForm.getForm().id,
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
							
							addXywzPurcProvrMgmtBankWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzPurcProvrMgmtBankWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzPurcProvrMgmtBankForm = new Ext.form.FormPanel({
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
					             name : 'provrNum',
					             fieldLabel : '<font color=red>*</font>供应商编号',
					             allowBlank : false,
					             blankText : '供应商编号不能为空',
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
						             name : 'acctNum',
						             fieldLabel : '<font color=red>*</font>账号',
						             allowBlank : false,
						             blankText : '账号不能为空',
						             maxLength : 50,
						             minLength : 1,
						             anchor : '90%'
						            } ]
						           },{ 
									 columnWidth : .5,
									 layout : 'form',
									 items : [ new Com.xywz.common.BankInfoQuery(
										{
											fieldLabel : '<font color=red>*</font>银行全名',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'bankFullNm',
											id : 'BANK_FULL_NM33',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('BANK_FULL_NM33').oCustomerQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('BANK_FULL_NM33').setValue(records[0].data.BANK_FULL_NM);
												editXywzPurcProvrMgmtBankForm.getForm().findField('bankAddr').setValue(records[0].data.BANK_ADDR);
												editXywzPurcProvrMgmtBankForm.getForm().findField('bankTel').setValue(records[0].data.BANK_TEL);
											}
										}) ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textarea',
						             vtype : 'trim',
						             Width : '100',
						             name : 'bankAddr',
						             fieldLabel : '银行地址',
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
						             name : 'enFstNm',
						             fieldLabel : '英文名',
						             maxLength : 100,
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
						             name : 'bankTel',
						             fieldLabel : '银行电话',
						             readOnly : true,
						             maxLength : 50,
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
						             name : 'openAcctFstNm',
						             fieldLabel : '<font color=red>*</font>开户名',
						             allowBlank : false,
						             blankText : '开户名不能为空',
						             maxLength : 100,
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
						             name : 'bfcy',
						             fieldLabel : '<font color=red>*</font>受益人',
						             allowBlank : false,
						             blankText : '受益人不能为空',
						             maxLength : 100,
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
						             name : 'memo',
						             fieldLabel : '备注',
						             maxLength : 500,
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
						             name : 'id',
						             maxLength : 200,
						             minLength : 1, 
						             hidden:true,
						             anchor : '90%'
						            } ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzPurcProvrMgmtBankForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPurcProvrMgmtBankAction.json',
								method : 'POST',
								form : editXywzPurcProvrMgmtBankForm.getForm().id,
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
							
							editXywzPurcProvrMgmtBankWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzPurcProvrMgmtBankWindow.hide();
						}
					} ]
				} ]
			});
			
			// 预览展示的from
			var detailXywzPurcProvrMgmtBankForm = new Ext.form.FormPanel({
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
					             name : 'provrNum',
					             fieldLabel : '<font color=red>*</font>供应商编号',
					             allowBlank : false,
					             blankText : '供应商编号不能为空',
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
						             name : 'acctNum',
						             fieldLabel : '<font color=red>*</font>账号',
						             allowBlank : false,
						             blankText : '账号不能为空',
						             maxLength : 50,
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
							             name : 'bankFullNm',
							             fieldLabel : '<font color=red>*</font>银行全名',
							             allowBlank : false,
							             blankText : '银行全名不能为空',
							             maxLength : 50,
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
						             name : 'bankAddr',
						             fieldLabel : '银行地址',
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
						             name : 'enFstNm',
						             fieldLabel : '英文名',
						             maxLength : 100,
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
						             name : 'bankTel',
						             fieldLabel : '银行电话',
						             readOnly : true,
						             maxLength : 50,
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
						             name : 'openAcctFstNm',
						             fieldLabel : '<font color=red>*</font>开户名',
						             allowBlank : false,
						             blankText : '开户名不能为空',
						             maxLength : 100,
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
						             name : 'bfcy',
						             fieldLabel : '<font color=red>*</font>受益人',
						             allowBlank : false,
						             blankText : '受益人不能为空',
						             maxLength : 100,
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
						             name : 'memo',
						             fieldLabel : '备注',
						             maxLength : 500,
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
						             name : 'id',
						             maxLength : 200,
						             minLength : 1, 
						             hidden:true,
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
					    	detailXywzPurcProvrMgmtBankWindow.hide();
						}
					} ]
				}
				]
			});


			// 定义新增窗口
			var addXywzPurcProvrMgmtBankWindow = new Ext.Window({
				title : '供应商银行信息新增',
				plain : true,
				layout : 'fit',
				width : 800,
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
				items : [ addXywzPurcProvrMgmtBankForm ]
			});

			// 定义修改窗口
			var editXywzPurcProvrMgmtBankWindow = new Ext.Window({
				title : '供应商银行信息修改',
				plain : true,
				layout : 'fit',
				width : 800,
				height : 350,
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
				items : [ editXywzPurcProvrMgmtBankForm ]
			});
			
			// 定义详情窗口
			var detailXywzPurcProvrMgmtBankWindow = new Ext.Window({
				title : '供应商银行信息预览',
				plain : true,
				layout : 'fit',
				width : 800,
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
				items : [ detailXywzPurcProvrMgmtBankForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '供应商银行信息列表',
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