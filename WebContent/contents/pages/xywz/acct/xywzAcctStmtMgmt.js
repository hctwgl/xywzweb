Ext.onReady(function() {
			Ext.QuickTips.init(); 
			//“是否”选择数据集
			var ifstore = new Ext.data.Store({  
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
			//“交易类型”选择数据集
			var txstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_TX_TYP'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "账务对账单查询",
				labelWidth : 90, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'middle', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 100,
				items : [ {
					layout : 'column',
					items : [  {
						columnWidth : .25,
						layout : 'form',
						items : [ new Com.xywz.common.XywzSaleInvInfoQuery(
								{
									fieldLabel : '发票号',
									labelStyle : 'text-align:left;',
									name : 'invNum',
									id : 'INV_NUM11',
									singleSelected : false,
									// 单选复选标志
									//editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('INV_NUM11').oSaleInvInfoQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('INV_NUM11').setValue(records[0].data.INV_NUM);
										qForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
									}
								})]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ new Com.xywz.common.ContractFrgnQuery(
								{
									fieldLabel : '合同号',
									labelStyle : 'text-align:left;',
									name : 'contrNum',
									id : 'CONTR_NUM11',
									singleSelected : false,
									// 单选复选标志
									//editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('CONTR_NUM11').oContractFrgnQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('CONTR_NUM11').setValue(records[0].data.CONTR_NUM);
									}
								})]
					},{
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							Width : '100',
							name : 'invDtFrom',
							fieldLabel : '发票日期   从',
							anchor : '90%',
							editable : false,
						    format : 'Y-m-d'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							Width : '100',
							name : 'invDtTo',
							fieldLabel : '到',
							anchor : '90%',
							editable : false,
							format : 'Y-m-d'
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
				   name : 'invNum',
				   mapping : 'INV_NUM'
				  }, { 
				   name : 'invDt',
				   mapping : 'INV_DT'
				  }, { 
				   name : 'contrNum',
				   mapping : 'CONTR_NUM'
				  }, { 
				   name : 'weight',
				   mapping : 'WEIGHT'
				  }, { 
				   name : 'amt',
				   mapping : 'AMT'
				  }, { 
				   name : 'mrnCostAmt',
				   mapping : 'MRN_COST_AMT'
				  }, { 
				   name : 'mrnCostDt',
				   mapping : 'MRN_COST_DT'
				  }, { 
				   name : 'expDt',
				   mapping : 'EXP_DT'
				  }, { 
				   name : 'recvLoadBill',
				   mapping : 'RECV_LOAD_BILL'
				  }, { 
				  name : 'recvLoadBillOra',
			      mapping : 'RECV_LOAD_BILL_ORA'
				  }, { 
				   name : 'subtDocBank',
				   mapping : 'SUBT_DOC_BANK'
				  }, { 
				   name : 'loan',
				   mapping : 'LOAN'
				  }, { 
				   name : 'loanOra',
				   mapping : 'LOAN_ORA'
				  }, { 
				   name : 'loanInst',
				   mapping : 'LOAN_INST'
				  }, { 
				   name : 'refundOra',
				   mapping : 'REFUND_ORA'
					  }, { 
				   name : 'refund',
				   mapping : 'REFUND'
				  }, { 
				   name : 'refundDt',
				   mapping : 'REFUND_DT'
				  }, { 
				   name : 'refundAmt',
				   mapping : 'REFUND_AMT'
				  }, { 
					   name : 'txTyp',
					   mapping : 'TX_TYP'
				  }, { 
					   name : 'txTypOra',
					   mapping : 'TX_TYP_ORA'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				   header : '对账单ID',
				   width : 80,
				   dataIndex : 'id',
				   hidden : true,
				   sortable : true
				  }, { 
				   header : '发票号',
				   width : 150,
				   dataIndex : 'invNum',
				   sortable : true
				  }, { 
				   header : '发票日期',
				   width : 100,
				   dataIndex : 'invDt',
				   sortable : true,
		           format : 'Y年m月d日'
				  }, { 
				   header : '合同号',
				   width : 150,
				   dataIndex : 'contrNum',
				   sortable : true
				  }, { 
				   header : '重量',
				   width : 150,
				   dataIndex : 'weight',
				   sortable : true,
				   renderer: money('0,000.00' )
				  }, { 
				   header : '金额',
				   width : 150,
				   dataIndex : 'amt',
				   sortable : true,
				   renderer: money('0,000.00' )
				  }, { 
				   header : '海运费金额',
				   width : 150,
				   dataIndex : 'mrnCostAmt',
				   sortable : true,
				   renderer: money('0,000.00' )
				  }, { 
				   header : '付海运费日期',
				   width : 100,
				   dataIndex : 'mrnCostDt',
				   sortable : true
				  }, { 
				   header : '出口日期',
				   width : 100,
				   dataIndex : 'expDt',
				   sortable : true
				  }, { 
				   header : '是否收到提单',
				   width : 150,
				   dataIndex : 'recvLoadBillOra',
				   sortable : true
				  }, { 
				   header : '交单银行',
				   width : 150,
				   dataIndex : 'subtDocBank',
				   sortable : true
				  }, { 
				   header : '是否押汇',
				   width : 150,
				   dataIndex : 'loanOra',
				   sortable : true
				  }, { 
				   header : '押汇利息',
				   width : 100,
				   dataIndex : 'loanInst',
				   sortable : true,
				   renderer: money('0,000.00' )
				  }, { 
				   header : '是否回款',
				   width : 150,
				   dataIndex : 'refundOra',
				   sortable : true
				  }, { 
				   header : '回款日期',
				   width : 100,
				   dataIndex : 'refundDt',
				   sortable : true
				  }, { 
				   header : '回款金额',
				   width : 150,
				   dataIndex : 'refundAmt',
				   sortable : true,
				   renderer: money('0,000.00' )
				  }, { 
				   header : '交易类型',
				   width : 150,
				   dataIndex : 'txTypOra',
				   sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAcctStmtMgmtQueryAction.json'
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
											addXywzAcctStmtMgmtForm.getForm().reset();
											addXywzAcctStmtMgmtForm.getForm().findField('mrnCostAmt').setValue(0);
											addXywzAcctStmtMgmtForm.getForm().findField('refundAmt').setValue(0);
											addXywzAcctStmtMgmtForm.getForm().findField('loanInst').setValue(0);
											addXywzAcctStmtMgmtWindow.show();
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
												editXywzAcctStmtMgmtForm.getForm().loadRecord(selectRe);
												editXywzAcctStmtMgmtWindow.show();

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
														url : basepath+ '/XywzAcctStmtMgmtAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzAcctStmtMgmtQueryAction.json'
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
												detailXywzAcctStmtMgmtForm
														.getForm().loadRecord(
																selectRe);
												detailXywzAcctStmtMgmtWindow.show();
											}
										}
									}]
					});

			// 新增窗口展示的from
			var addXywzAcctStmtMgmtForm = new Ext.form.FormPanel({
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
					             items : [ new Com.xywz.common.XywzSaleInvInfoQuery(
								{
									fieldLabel : '<font color=red>*</font>发票号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'invNum',
									id : 'INV_NUM22',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('INV_NUM22').oSaleInvInfoQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('INV_NUM22').setValue(records[0].data.INV_NUM);	
										addXywzAcctStmtMgmtForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
									}
								}) ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'invDt',
					             fieldLabel : '<font color=red>*</font>发票日期',
					             allowBlank : false,
					             blankText : '发票日期不能为空',
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
					             name : 'contrNum',
					             fieldLabel : '<font color=red>*</font>合同号',
					             allowBlank : false,
					             blankText : '合同号不能为空',
					             maxLength : 200,
					             minLength : 1,
					             readOnly : true,
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
					             fieldLabel : '<font color=red>*</font>重量',
					             allowBlank : false,
					             blankText : '重量不能为空',
					             decimalPrecision : 0,
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
					             fieldLabel : '<font color=red>*</font>金额',
					             allowBlank : false,
					             blankText : '金额不能为空',
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'mrnCostAmt',
					             fieldLabel : '海运费金额',
					             allowBlank : false,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'mrnCostDt',
					             fieldLabel : '付海运费日期',
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'expDt',
					             fieldLabel : '出口日期',
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'recvLoadBill',
										 fieldLabel : '<font color=red>*</font>是否收到提单',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : ifstore,
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
					             items : [ new Com.xywz.common.BankInfoQuery(
								{
									fieldLabel : '<font color=red>*</font>交单银行',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'subtDocBank',
									id : 'BANK_FULL_NM',
									singleSelected : false,
									// 单选复选标志
                                    //editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('BANK_FULL_NM').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('BANK_FULL_NM').setValue(records[0].data.BANK_FULL_NM);									
									}
								}) ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
					            	 hiddenName : 'loan',
									 fieldLabel : '<font color=red>*</font>是否押汇',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : ifstore,
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
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'loanInst',
					             fieldLabel : '押汇利息',
					             allowBlank : false,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
					            	 hiddenName : 'refund',
									 fieldLabel : '<font color=red>*</font>是否回款',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : ifstore,
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
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'refundDt',
					             fieldLabel : '回款日期',
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
					             name : 'refundAmt',
					             fieldLabel : '回款金额',
					             allowBlank : false,
					             anchor : '90%'
					            } ] 
					           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
						            	 hiddenName : 'txTyp',
										 fieldLabel : '<font color=red>*</font>交易类型',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : txstore,
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
							if(!addXywzAcctStmtMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAcctStmtMgmtAction.json',
								method : 'POST',
								form : addXywzAcctStmtMgmtForm.getForm().id,
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
							
							addXywzAcctStmtMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzAcctStmtMgmtWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzAcctStmtMgmtForm = new Ext.form.FormPanel({
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
					             name : 'invNum',
					             fieldLabel : '<font color=red>*</font>发票号',
					             allowBlank : false,
					             blankText : '发票号不能为空',
					             readOnly : true,
					             maxLength : 30,
					             minLength : 1,
					             readOnly : true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'invDt',
					             fieldLabel : '<font color=red>*</font>发票日期',
					             allowBlank : false,
					             blankText : '发票日期不能为空',
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
					             name : 'contrNum',
					             fieldLabel : '<font color=red>*</font>合同号',
					             allowBlank : false,
					             blankText : '合同号不能为空',
					             readOnly : true,
					             maxLength : 30,
					             minLength : 1,
					             readOnly : true,
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
					             fieldLabel : '<font color=red>*</font>重量',
					             allowBlank : false,
					             blankText : '重量不能为空',
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
					             fieldLabel : '<font color=red>*</font>金额',
					             allowBlank : false,
					             blankText : '金额不能为空',
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'mrnCostAmt',
					             fieldLabel : '海运费金额',
					             allowBlank : false,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'mrnCostDt',
					             fieldLabel : '付海运费日期',
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'expDt',
					             fieldLabel : '出口日期',
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'recvLoadBill',
										 fieldLabel : '<font color=red>*</font>是否收到提单',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : ifstore,
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
					             items : [ new Com.xywz.common.BankInfoQuery(
								{
									fieldLabel : '交单银行',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'subtDocBank',
									id : 'BANK_FULL_NM11',
									singleSelected : false,
									// 单选复选标志
                                    //editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('BANK_FULL_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('BANK_FULL_NM11').setValue(records[0].data.BANK_FULL_NM);									
									}
								}) ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
					            	 hiddenName : 'loan',
									 fieldLabel : '<font color=red>*</font>是否押汇',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : ifstore,
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
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'loanInst',
					             fieldLabel : '押汇利息',
					             allowBlank : false,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
					            	 hiddenName : 'refund',
									 fieldLabel : '<font color=red>*</font>是否回款',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : ifstore,
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
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'refundDt',
					             fieldLabel : '回款日期',
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
					             name : 'refundAmt',
					             fieldLabel : '回款金额',
					             allowBlank : false,
					             anchor : '90%'
					            } ] 
					           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
						            	 hiddenName : 'txTyp',
										 fieldLabel : '<font color=red>*</font>交易类型',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : txstore,
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
							if(!editXywzAcctStmtMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAcctStmtMgmtAction.json',
								method : 'POST',
								form : editXywzAcctStmtMgmtForm.getForm().id,
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
							
							editXywzAcctStmtMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzAcctStmtMgmtWindow.hide();
						}
					} ]
				} ]
			});
			
			// 预览展示的from
			var detailXywzAcctStmtMgmtForm = new Ext.form.FormPanel({
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
					             name : 'invNum',
					             fieldLabel : '<font color=red>*</font>发票号',
					             allowBlank : false,
					             blankText : '发票号不能为空',
					             readOnly : true,
					             maxLength : 30,
					             minLength : 1,
					             readOnly : true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'invDt',
					             fieldLabel : '<font color=red>*</font>发票日期',
					             allowBlank : false,
					             blankText : '发票日期不能为空',
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
					             name : 'contrNum',
					             fieldLabel : '<font color=red>*</font>合同号',
					             allowBlank : false,
					             blankText : '合同号不能为空',
					             readOnly : true,
					             maxLength : 30,
					             minLength : 1,
					             readOnly : true,
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
					             fieldLabel : '<font color=red>*</font>重量',
					             allowBlank : false,
					             blankText : '重量不能为空',
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
					             fieldLabel : '<font color=red>*</font>金额',
					             allowBlank : false,
					             blankText : '金额不能为空',
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'mrnCostAmt',
					             fieldLabel : '海运费金额',
					             allowBlank : false,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'mrnCostDt',
					             fieldLabel : '付海运费日期',
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'expDt',
					             fieldLabel : '出口日期',
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'recvLoadBill',
										 fieldLabel : '<font color=red>*</font>是否收到提单',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : ifstore,
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
						             name : 'subtDocBank',
						             fieldLabel : '<font color=red>*</font>交单银行',
						             allowBlank : false,
						             blankText : '交单银行不能为空',
						             readOnly : true,
						             maxLength : 30,
						             minLength : 1,
						             readOnly : true,
						             anchor : '90%'
						            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
					            	 hiddenName : 'loan',
									 fieldLabel : '<font color=red>*</font>是否押汇',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : ifstore,
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
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'loanInst',
					             fieldLabel : '押汇利息',
					             allowBlank : false,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
					            	 hiddenName : 'refund',
									 fieldLabel : '<font color=red>*</font>是否回款',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : ifstore,
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
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'refundDt',
					             fieldLabel : '回款日期',
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
					             name : 'refundAmt',
					             fieldLabel : '回款金额',
					             allowBlank : false,
					             anchor : '90%'
					            } ] 
					           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
						            	 hiddenName : 'txTyp',
										 fieldLabel : '<font color=red>*</font>交易类型',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : txstore,
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
					    	detailXywzAcctStmtMgmtWindow.hide();
						}
					} ]
				}
				]
			});


			// 定义新增窗口
			var addXywzAcctStmtMgmtWindow = new Ext.Window({
				title : '账务对账单新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :300,
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
				items : [ addXywzAcctStmtMgmtForm ]
			});

			// 定义修改窗口
			var editXywzAcctStmtMgmtWindow = new Ext.Window({
				title : '账务对账单修改',
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
				border : false,
				items : [ editXywzAcctStmtMgmtForm ]
			});
			
			// 定义详情窗口
			var detailXywzAcctStmtMgmtWindow = new Ext.Window({
				title : '客户跟进预览',
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
				border : false,
				items : [ detailXywzAcctStmtMgmtForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '账务对账单信息列表',
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