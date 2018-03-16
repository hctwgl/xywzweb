Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var boxstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_TRAN_FEE_TYPE'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			
			var boxstore1 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_EXAM_STATE'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			
			var boxstore2 = new Ext.data.Store({  
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
			
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "出运确认单查询",
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
							xtype : 'textfield',
							Width : '100',
							name : 'outTranNum',
							labelWidth : 150,
							fieldLabel : '出运编号 ',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [new Com.xywz.common.ContractFrgnQuery(
								{
									fieldLabel : '销售合同号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'sellContrNum',
									id : 'SELL_CONTR_NUM',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SELL_CONTR_NUM').oContractFrgnQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('SELL_CONTR_NUM').setValue(records[0].data.CONTR_NUM);
										//qForm.getForm().findField('shipCorp').setValue(parseInt(records[0].data.SHIP_CORP_ID));
										
									}
								})  ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'gdsSendCorp',
							fieldLabel : '货贷公司',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'numberfield',
							name : 'shipCorp',
							hidden:true
						},new Com.xywz.common.LogiShipCorpQuery(
							{
								fieldLabel : '船公司名称',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'corpNm',
								id : 'CORP_NM11',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('CORP_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('CORP_NM11').setValue(records[0].data.CORP_NM);
									qForm.getForm().findField('shipCorp').setValue(parseInt(records[0].data.SHIP_CORP_ID));
									
								}
							}) ]
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
				  name : 'outTranId',
				   mapping : 'OUT_TRAN_ID'
				  }, {
				  name : 'reachSnglId',
				   mapping : 'REACH_SNGL_ID'
				  }, {
				  name : 'outTranNum',
				   mapping : 'OUT_TRAN_NUM'
				  }, {
				  name : 'sellContrNum',
				   mapping : 'SELL_CONTR_NUM'
				  }, {
				  name : 'cur',
				   mapping : 'CUR'
				  }, {
				  name : 'curOra',
				   mapping : 'CUR_ORA'
				  }, {
				  name : 'gdsSendCorp',
				   mapping : 'GDS_SEND_CORP'
				  }, {
				  name : 'agentNamr',
				   mapping : 'AGENT_NAMR'
				  }, {
				  name : 'gdsAgentContcr',
				   mapping : 'GDS_AGENT_CONTCR'
				  }, {
				  name : 'gdsAgentContTel',
				   mapping : 'GDS_AGENT_CONT_TEL'
				  }, {
				  name : 'beginDt',
				   mapping : 'BEGIN_DT'
				  }, {
				  name : 'beginTm',
				   mapping : 'BEGIN_TM'
				  }, {
				  name : 'enddt',
				   mapping : 'END_DT'
				  }, {
				  name : 'endTm',
				   mapping : 'END_TM'
				  }, {
				  name : 'stopSnglDt',
				   mapping : 'STOP_SNGL_DT'
				  }, {
				  name : 'shipCorp',
				   mapping : 'SHIP_CORP'
				  }, {
				  name : 'shipCorpTel',
				   mapping : 'SHIP_CORP_TEL'
				  }, {
				  name : 'shipCorpFax',
				   mapping : 'SHIP_CORP_FAX'
				  }, {
				  name : 'shipCorpContcr',
				   mapping : 'SHIP_CORP_CONTCR'
				  }, {
				  name : 'shipName',
				   mapping : 'SHIP_NAME'
				  }, {
				  name : 'shipOrder',
				   mapping : 'SHIP_ORDER'
				  }, {
				  name : 'loadShipDt',
				   mapping : 'LOAD_SHIP_DT'
				  }, {
				  name : 'etd',
				   mapping : 'ETD'
				  }, {
				  name : 'eta',
				   mapping : 'ETA'
				  }, {
				  name : 'chargeCostPayMode',
				   mapping : 'CHARGE_COST_PAY_MODE'
				  }, {
				  name : 'chargeCostPayModeOra',
				   mapping : 'CHARGE_COST_PAY_MODE_ORA'
				  }, {
				  name : 'collGdsSite',
				   mapping : 'COLL_GDS_SITE'
				  }, {
				  name : 'loadTraffPort',
				   mapping : 'LOAD_TRAFF_PORT'
				  }, {
				  name : 'loadTraffPortName',
				   mapping : 'LOAD_TRAFF_PORT_NAME'
				  }, {
				  name : 'aimPort',
				   mapping : 'AIM_PORT'
				  }, {
				  name : 'aimPortName',
				   mapping : 'AIM_PORT_NAME'
				  }, {
				  name : 'unloadGdsPort',
				   mapping : 'UNLOAD_GDS_PORT'
				  }, {
				  name : 'unloadGdsPortName',
				   mapping : 'UNLOAD_GDS_PORT_NAME'
				  }, {
				  name : 'sheetSnglNum',
				   mapping : 'SHEET_SNGL_NUM'
				  }, {
				  name : 'prdDt',
				   mapping : 'PRD_DT'
				  }, {
				  name : 'dlvyForm',
				   mapping : 'DLVY_FORM'
				  }, {
				  name : 'loadBillNumShr',
				   mapping : 'LOAD_BILL_NUM_SHR'
				  }, {
				  name : 'loadBillIssuDay',
				   mapping : 'LOAD_BILL_ISSU_DAY'
				  }, {
				  name : 'loadBillRecvDay',
				   mapping : 'LOAD_BILL_RECV_DAY'
				  }, {
				  name : 'lastReachDt',
				   mapping : 'LAST_REACH_DT'
				  }, {
				  name : 'lcId',
				   mapping : 'LC_ID'
				  }, {
				  name : 'mkBoxMode',
				   mapping : 'MK_BOX_MODE'
				  }, {
				  name : 'gdsDesc',
				   mapping : 'GDS_DESC'
				  }, {
				  name : 'memo',
				   mapping : 'MEMO'
				  }, {
				  name : 'chkStat',
				   mapping : 'CHK_STAT'
				  }, {
				  name : 'chkStatOra',
				   mapping : 'CHK_STAT_ORA'
				  },{
				  name : 'corpNm',
				   mapping : 'CORP_NM'
				  }
				  ]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '出运ID',
				   width : 210,
				   dataIndex : 'outTranId',
				   sortable : true,
				   hidden:true
				  }, {
				  header : '交单编号',
				   width : 210,
				   dataIndex : 'reachSnglId',
				   sortable : true
				  }, {
				  header : '出运编号',
				   width : 210,
				   dataIndex : 'outTranNum',
				   sortable : true
				  }, {
				  header : '销售合同号',
				   width : 210,
				   dataIndex : 'sellContrNum',
				   sortable : true
				  }, {
				  header : '币种',
				   width : 210,
				   dataIndex : 'curOra',
				   sortable : true
				  }, {
				  header : '货贷公司', 
				   width : 210,
				   dataIndex : 'gdsSendCorp',
				   sortable : true,
				   hidden:true
				  }, {
				  header : '货贷公司', 
				   width : 210,
				   dataIndex : 'agentNamr',
				   sortable : true
				  }, {
				  header : '货代联系人',
				   width : 210,
				   dataIndex : 'gdsAgentContcr',
				   sortable : true
				  }, {
				  header : '货代联系电话',
				   width : 210,
				   dataIndex : 'gdsAgentContTel',
				   sortable : true
				  }, {
				  header : '始柜日期',
				   width : 210,
				   dataIndex : 'beginDt',
				   sortable : true
				  }, {
				  header : '始柜时间',
				   width : 210,
				   dataIndex : 'beginTm',
				   sortable : true
				  }, {
				  header : '截柜日期',
				   width : 210,
				   dataIndex : 'enddt',
				   sortable : true
				  }, {
				  header : '截柜时间',
				   width : 210,
				   dataIndex : 'endTm',
				   sortable : true
				  }, {
				  header : '截单日期',
				   width : 210,
				   dataIndex : 'stopSnglDt',
				   sortable : true
				  }, {
				  header : '船公司',
				   width : 210,
				   dataIndex : 'corpNm',
				   sortable : true
				  }, {
				  header : '船公司电话',
				   width : 210,
				   dataIndex : 'shipCorpTel',
				   sortable : true
				  }, {
				  header : '船公司传真',
				   width : 210,
				   dataIndex : 'shipCorpFax',
				   sortable : true
				  }, {
				  header : '船公司联系人',
				   width : 210,
				   dataIndex : 'shipCorpContcr',
				   sortable : true
				  }, {
				  header : '船名',
				   width : 210,
				   dataIndex : 'shipName',
				   sortable : true
				  }, {
				  header : '船次',
				   width : 210,
				   dataIndex : 'shipOrder',
				   sortable : true
				  }, {
				  header : '装船日期',
				   width : 210,
				   dataIndex : 'loadShipDt',
				   sortable : true
				  }, {
				  header : 'ETD',
				   width : 210,
				   dataIndex : 'etd',
				   sortable : true
				  }, {
				  header : 'ETA',
				   width : 210,
				   dataIndex : 'eta',
				   sortable : true
				  }, {
				  header : '运费支付方式',
				   width : 210,
				   dataIndex : 'chargeCostPayModeOra',
				   sortable : true
				  }, {
				  header : '收货地',
				   width : 210,
				   dataIndex : 'collGdsSite',
				   sortable : true
				  }, {
				  header : '装运港',
				   width : 210,
				   dataIndex : 'loadTraffPortName',
				   sortable : true
				  }, {
				  header : '抵运港',
				   width : 210,
				   dataIndex : 'aimPortName',
				   sortable : true
				  }, {
				  header : '卸货港',
				   width : 210,
				   dataIndex : 'unloadGdsPortName',
				   sortable : true
				  }, {
				  header : '关单号',
				   width : 210,
				   dataIndex : 'sheetSnglNum',
				   sortable : true
				  }, {
				  header : '免箱期',
				   width : 210,
				   dataIndex : 'prdDt',
				   sortable : true
				  }, {
				  header : '交付单据',
				   width : 210,
				   dataIndex : 'dlvyForm',
				   sortable : true
				  }, {
				  header : '提单份数',
				   width : 210,
				   dataIndex : 'loadBillNumShr',
				   sortable : true
				  }, {
				  header : '提单签发日',
				   width : 210,
				   dataIndex : 'loadBillIssuDay',
				   sortable : true
				  }, {
				  header : '提单收到日',
				   width : 210,
				   dataIndex : 'loadBillRecvDay',
				   sortable : true
				  }, {
				  header : '最晚交单日',
				   width : 210,
				   dataIndex : 'lastReachDt',
				   sortable : true
				  }, {
				  header : '信用证编号',
				   width : 210,
				   dataIndex : 'lcId',
				   sortable : true
				  }, {
				  header : '做箱方式',
				   width : 210,
				   dataIndex : 'mkBoxMode',
				   sortable : true
				  }, {
				  header : '货物描述',
				   width : 210,
				   dataIndex : 'gdsDesc',
				   sortable : true
				  }, {
				  header : '备注',
				   width : 210,
				   dataIndex : 'memo',
				   sortable : true
				  }, {
				  header : '审核状态',
				   width : 210,
				   dataIndex : 'chkStatOra',
				   sortable : true
				  }]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzLogiCfmSnglQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'OUT_TRAN_ID',
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
											addXywzLogiCfmSnglForm.getForm().reset();											
											addXywzLogiCfmSnglWindow.show();
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
												editXywzLogiCfmSnglForm.getForm().loadRecord(selectRe);
												editXywzLogiCfmSnglWindow.show();

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
												tempId = selectRe.data.outTranId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzLogiCfmSnglAction!batchDestroy.json?idStr='+ idStr,
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
												detailXywzLogiCfmSnglForm.getForm().loadRecord(selectRe);
												detailXywzLogiCfmSnglWindow.show();
											}
										}
									},'-',new Com.yucheng.bob.ExpButton({
							            formPanel : 'searchCondition',
							            iconCls:'exportIconCss',
							            url : basepath+'/XywzLogiCfmSnglQueryAction.json'
							        })]
					});
			var detailXywzLogiCfmSnglForm = new Ext.form.FormPanel({
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
			            name : 'reachSnglId',
			            fieldLabel : '交单编号',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'outTranNum',
			            fieldLabel : '出运编号',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
				            xtype : 'textfield',
				            vtype : 'trim',
				            Width : '100',
				            name : 'sellContrNum',
				            fieldLabel : '销售合同号',
				            maxLength : 200,
				            minLength : 1,
				            anchor : '90%',
				            readOnly:true
				           } ]
			          },
			           {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
				            xtype : 'textfield',
				            vtype : 'trim',
				            Width : '100',
				            name : 'curOra',
				            fieldLabel : '币种',
				            maxLength : 200,
				            minLength : 1,
				            anchor : '90%',
				            readOnly:true
				           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsSendCorp',
			            fieldLabel : '货贷公司',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsAgentContcr',
			            fieldLabel : '货代联系人',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsAgentContTel',
			            fieldLabel : '货代联系电话',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'beginDt',
			            fieldLabel : '始柜日期',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'beginTm',
			            fieldLabel : '始柜时间',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'enddt',
			            fieldLabel : '截柜日期',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'endTm',
			            fieldLabel : '截柜时间',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'stopSnglDt',
			            fieldLabel : '截单日期',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
				            xtype : 'textfield',
				            vtype : 'trim',
				            Width : '100',
				            name : 'corpNm',
				            fieldLabel : '船公司名称',
				            allowBlank : true,
				            maxLength : 200,
				            minLength : 1,
				            anchor : '90%',
				            readOnly:true
						}]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipCorpTel',
			            fieldLabel : '船公司电话',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            hidden:true,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			            {
			            columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipCorpFax',
			            fieldLabel : '船公司传真',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            hidden:true,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipCorpContcr',
			            fieldLabel : '船公司联系人',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
		              	{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipName',
			            fieldLabel : '船名',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipOrder',
			            fieldLabel : '船次',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadShipDt',
			            fieldLabel : '装船日期',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'etd',
			            fieldLabel : 'ETD',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'eta',
			            fieldLabel : 'ETA',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [{
				            xtype : 'textfield',
				            vtype : 'trim',
				            Width : '100',
				            name : 'chargeCostPayModeOra',
				            fieldLabel : '运费支付方式',
				            allowBlank : true,
				            maxLength : 200,
				            minLength : 1,
				            anchor : '90%',
				            readOnly:true
				           }]
			          },
			           {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'collGdsSite',
			            fieldLabel : '收货地',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadTraffPortName',
			            fieldLabel : '装运港名称',
			            allowBlank : false,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           }]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'aimPortName',
			            fieldLabel : '抵运港名称',
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'unloadGdsPortName',
			            fieldLabel : '卸货港名称',
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'sheetSnglNum',
			            fieldLabel : '关单号',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'prdDt',
			            fieldLabel : '免箱期',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'dlvyForm',
			            fieldLabel : '交付单据',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadBillNumShr',
			            fieldLabel : '提单份数',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadBillIssuDay',
			            fieldLabel : '提单签发日',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d',
			            readOnly:true
			           } ]
			          },
			         {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadBillRecvDay',
			            fieldLabel : '提单收到日',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'lastReachDt',
			            fieldLabel : '最晚交单日',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d',
			            readOnly:true
			           } ]
			          },
		              	{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'lcId',
			            fieldLabel : 'true信用证编号',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			         {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'mkBoxMode',
			            fieldLabel : '做箱方式',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsDesc',
			            fieldLabel : '货物描述',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'memo',
			            fieldLabel : '备注',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [{
				            xtype : 'textfield',
				            vtype : 'trim',
				            Width : '100',
				            name : 'chkStatOra',
				            fieldLabel : '审核状态',
				            allowBlank : true,
				            maxLength : 200,
				            minLength : 1,
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
							detailXywzLogiCfmSnglWindow.hide();
						}
					} ]
				} ]
			});

			// 新增窗口展示的from
			var addXywzLogiCfmSnglForm = new Ext.form.FormPanel({
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
			            name : 'reachSnglId',
			            fieldLabel : '交单编号',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'outTranNum',
			            fieldLabel : '<font color=red>*</font>出运编号',
			            allowBlank : false,
			            blankText : '出运编号不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [new Com.xywz.common.ContractFrgnQuery(
								{
									fieldLabel : '<font color=red>*</font>销售合同号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'sellContrNum',
									id : 'SELL_CONTR_NUM1',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SELL_CONTR_NUM1').oContractFrgnQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('SELL_CONTR_NUM1').setValue(records[0].data.CONTR_NUM);
										//qForm.getForm().findField('shipCorp').setValue(parseInt(records[0].data.SHIP_CORP_ID));
										
									}
								})  ]
			          },
			           {
			           columnWidth : .5,
			           layout : 'form',
			           items : [new Ext.form.ComboBox({
		      	             hiddenName : 'cur',
							 fieldLabel : '币种',
							 labelStyle: 'text-align:left;',
							 triggerAction : 'all',
							 store : boxstore2,
							 //  allowBlank : false,
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
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            name : 'gdsSendCorp',
                        hidden:true
			           },new Com.xywz.common.LogiGoodsAgentCorp(
								{
									fieldLabel : '货贷公司',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									//name : 'portNameCn',
									id : 'GDS_AGENT_33',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('GDS_AGENT_33').ologiGoodsAgentCorpGrid.getSelectionModel().selections.items;
										Ext.getCmp('GDS_AGENT_33').setValue(records[0].data.AGENT_NAMR);
										addXywzLogiCfmSnglForm.getForm().findField('gdsSendCorp').setValue(parseInt(records[0].data.AGENT_ID));
										addXywzLogiCfmSnglForm.getForm().findField('gdsAgentContcr').setValue((records[0].data.CONTACT_PER));
										addXywzLogiCfmSnglForm.getForm().findField('gdsAgentContTel').setValue((records[0].data.CONTACT_PHONE));
									}
								})  ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsAgentContcr',
			            fieldLabel : '货代联系人',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            hidden:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsAgentContTel',
			            fieldLabel : '货代联系电话',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            hidden:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'beginDt',
			            fieldLabel : '始柜日期',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'beginTm',
			            fieldLabel : '始柜时间',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'enddt',
			            fieldLabel : '截柜日期',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'endTm',
			            fieldLabel : '截柜时间',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'stopSnglDt',
			            fieldLabel : '截单日期',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
							xtype : 'numberfield',
							name : 'shipCorp',
							hidden:true
						},new Com.xywz.common.LogiShipCorpQuery(
							{
								fieldLabel : '船公司名称',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'corpNm',
								id : 'CORP_NM22',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('CORP_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('CORP_NM22').setValue(records[0].data.CORP_NM);
									addXywzLogiCfmSnglForm.getForm().findField('shipCorp').setValue(parseInt(records[0].data.SHIP_CORP_ID));
									addXywzLogiCfmSnglForm.getForm().findField('shipCorpTel').setValue(records[0].data.CONT_TEL1);
									addXywzLogiCfmSnglForm.getForm().findField('shipCorpContcr').setValue(records[0].data.CONTCR);
									addXywzLogiCfmSnglForm.getForm().findField('shipCorpFax').setValue(records[0].data.CONT_TEL1);
									
								}
							}) ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipCorpTel',
			            fieldLabel : '船公司电话',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            hidden:true,
			            anchor : '90%'
			           } ]
			          },
			            {
			            columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipCorpFax',
			            fieldLabel : '船公司传真',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            hidden:true,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipCorpContcr',
			            fieldLabel : '船公司联系人',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
		              	{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipName',
			            fieldLabel : '船名',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipOrder',
			            fieldLabel : '船次',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadShipDt',
			            fieldLabel : '装船日期',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'etd',
			            fieldLabel : 'ETD',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'eta',
			            fieldLabel : 'ETA',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [new Ext.form.ComboBox({
							hiddenName : 'chargeCostPayMode',
							fieldLabel : '运费支付方式',
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
							anchor : '90%'
						}) ]
			          },
			           {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'collGdsSite',
			            fieldLabel : '<font color=red>*</font>收货地',
			            allowBlank : false,
			            blankText : '收货地不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadTraffPort',
			            fieldLabel : '装运港',
			            allowBlank : false,
			            maxLength : 200,
			            minLength : 1,
			            hidden:true,
			            anchor : '90%'
			           },new Com.xywz.common.PortMgmtInfoQuery(
						{
							fieldLabel : '<font color=red>*</font>装运港名称',
							labelStyle : 'text-align:left;',
							//labelWidth : 100,
							name : 'loadTraffPortName',
							id : 'LOAD_TRAFF_PORT_NAME1',
							singleSelected : false,
							// 单选复选标志
							editable : false,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('LOAD_TRAFF_PORT_NAME1').oCustomerQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('LOAD_TRAFF_PORT_NAME1').setValue(records[0].data.PORT_NAME_CN);
								addXywzLogiCfmSnglForm.getForm().findField('loadTraffPort').setValue(parseInt(records[0].data.PORT_ID));
																		
							}
						}) ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'aimPort',
			            fieldLabel : '<font color=red>*</font>抵运港',
			            allowBlank : false,
			            blankText : '抵运港不能为空',
			            maxLength : 200,
			            minLength : 1,
			            hidden:true,
			            anchor : '90%'
			           },new Com.xywz.common.PortMgmtInfoQuery(
						{
							fieldLabel : '<font color=red>*</font>抵运港名称',
							labelStyle : 'text-align:left;',
							//labelWidth : 100,
							name : 'aimPortName',
							id : 'AIM_PORT_NAME1',
							singleSelected : false,
							// 单选复选标志
							editable : false,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('AIM_PORT_NAME1').oCustomerQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('AIM_PORT_NAME1').setValue(records[0].data.PORT_NAME_CN);
								addXywzLogiCfmSnglForm.getForm().findField('aimPort').setValue(parseInt(records[0].data.PORT_ID));
																		
							}
						})  ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'unloadGdsPort',
			            fieldLabel : '<font color=red>*</font>卸货港',
			            allowBlank : false,
			            blankText : '卸货港不能为空',
			            maxLength : 200,
			            minLength : 1,
			            hidden:true,
			            anchor : '90%'
			           },new Com.xywz.common.PortMgmtInfoQuery(
								{
									fieldLabel : '<font color=red>*</font>卸货港名称',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'unloadGdsPortName',
									id : 'UNLOADGDS_PORT_NAME1',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('UNLOADGDS_PORT_NAME1').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('UNLOADGDS_PORT_NAME1').setValue(records[0].data.PORT_NAME_CN);
										addXywzLogiCfmSnglForm.getForm().findField('unloadGdsPort').setValue(parseInt(records[0].data.PORT_ID));
																				
									}
								}) ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'sheetSnglNum',
			            fieldLabel : '关单号',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'prdDt',
			            fieldLabel : '免箱期',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'dlvyForm',
			            fieldLabel : '交付单据',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadBillNumShr',
			            fieldLabel : '提单份数',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadBillIssuDay',
			            fieldLabel : '提单签发日',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
			         {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadBillRecvDay',
			            fieldLabel : '提单收到日',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'lastReachDt',
			            fieldLabel : '最晚交单日',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
		              	{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'lcId',
			            fieldLabel : 'true信用证编号',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			         {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'mkBoxMode',
			            fieldLabel : '做箱方式',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsDesc',
			            fieldLabel : '货物描述',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'memo',
			            fieldLabel : '备注',
			            allowBlank : true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [new Ext.form.ComboBox({
							hiddenName : 'chkStat',
							fieldLabel : '审核状态',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : boxstore1,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
						}) ]
			          }]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzLogiCfmSnglForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiCfmSnglAction.json',
								method : 'POST',
								form : addXywzLogiCfmSnglForm.getForm().id,
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
							
							addXywzLogiCfmSnglWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzLogiCfmSnglWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzLogiCfmSnglForm = new Ext.form.FormPanel({
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
			            name : 'outTranId',
			            hidden:true,
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'reachSnglId',
			            fieldLabel : '交单编号',
			            allowBlank : true,
			            //blankText : '交单编号不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'outTranNum',
			            fieldLabel : '出运编号',
			            allowBlank : true,
			            //blankText : '出运编号不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [new Com.xywz.common.ContractFrgnQuery(
								{
									fieldLabel : '销售合同号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'sellContrNum',
									id : 'SELL_CONTR_NUM2',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : true,
									// 不允许为空
									//blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SELL_CONTR_NUM2').oContractFrgnQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('SELL_CONTR_NUM2').setValue(records[0].data.CONTR_NUM);
										//qForm.getForm().findField('shipCorp').setValue(parseInt(records[0].data.SHIP_CORP_ID));
										
									}
								})  ]
			          },
			           {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ new Ext.form.ComboBox({
		      	             hiddenName : 'cur',
							 fieldLabel : '币种',
							 labelStyle: 'text-align:left;',
							 triggerAction : 'all',
							 store : boxstore2,
							 //  allowBlank : false,
							 displayField : 'value',
							 valueField : 'key',
							 mode : 'local',
							 forceSelection : true,
							 typeAhead : true,
							 emptyText:'请选择',
							 resizable : true,
							 editable : false,
							 anchor : '90%'
		            })  ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            name : 'gdsSendCorp',
			            hidden:true
			           } ,new Com.xywz.common.LogiGoodsAgentCorp(
								{
									fieldLabel : '货贷公司',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									//name : 'portNameCn',
									id : 'GDS_AGENT_44',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('GDS_AGENT_44').ologiGoodsAgentCorpGrid.getSelectionModel().selections.items;
										Ext.getCmp('GDS_AGENT_44').setValue(records[0].data.AGENT_NAMR);
										editXywzLogiCfmSnglForm.getForm().findField('gdsSendCorp').setValue(parseInt(records[0].data.AGENT_ID));
										editXywzLogiCfmSnglForm.getForm().findField('gdsAgentContcr').setValue((records[0].data.CONTACT_PER));
										editXywzLogiCfmSnglForm.getForm().findField('gdsAgentContTel').setValue((records[0].data.CONTACT_PHONE));
									}
								}) ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsAgentContcr',
			            fieldLabel : '货代联系人',
			            allowBlank : true,
			            //blankText : '货代联系人不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            hidden:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsAgentContTel',
			            fieldLabel : '货代联系电话',
			            allowBlank : true,
			            //blankText : '货代联系电话不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            hidden:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'beginDt',
			            fieldLabel : '始柜日期',
			            allowBlank : true,
			            //blankText : '始柜日期不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'beginTm',
			            fieldLabel : '始柜时间',
			            allowBlank : true,
			            //blankText : '始柜时间不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'enddt',
			            fieldLabel : '截柜日期',
			            allowBlank : true,
			            //blankText : '截柜日期不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'endTm',
			            fieldLabel : '截柜时间',
			            allowBlank : true,
			            //blankText : '截柜时间不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'stopSnglDt',
			            fieldLabel : '截单日期',
			            allowBlank : true,
			            //blankText : '截单日期不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
							xtype : 'numberfield',
							name : 'shipCorp',
							hidden:true
						},new Com.xywz.common.LogiShipCorpQuery(
							{
								fieldLabel : '船公司名称',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'corpNm',
								id : 'CORP_NM33',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : true,
								// 不允许为空
								//blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('CORP_NM33').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('CORP_NM33').setValue(records[0].data.CORP_NM);
									editXywzLogiCfmSnglForm.getForm().findField('shipCorp').setValue(parseInt(records[0].data.SHIP_CORP_ID));
									editXywzLogiCfmSnglForm.getForm().findField('shipCorpTel').setValue(records[0].data.CONT_TEL1);
									editXywzLogiCfmSnglForm.getForm().findField('shipCorpContcr').setValue(records[0].data.CONTCR);
									editXywzLogiCfmSnglForm.getForm().findField('shipCorpFax').setValue(records[0].data.CONT_TEL1);
								}
							}) ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipCorpTel',
			            fieldLabel : '船公司电话',
			            allowBlank : true,
			            //blankText : '船公司电话不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			            {
			            columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipCorpFax',
			            fieldLabel : '船公司传真',
			            allowBlank : true,
			            //blankText : '船公司传真不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipCorpContcr',
			            fieldLabel : '船公司联系人',
			            allowBlank : true,
			            //blankText : '船公司联系人不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
		              	{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipName',
			            fieldLabel : '船名',
			            allowBlank : true,
			            //blankText : '船名不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipOrder',
			            fieldLabel : '船次',
			            allowBlank : true,
			            //blankText : '船次不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadShipDt',
			            fieldLabel : '装船日期',
			            allowBlank : true,
			            //blankText : '装船日期不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'etd',
			            fieldLabel : 'ETD',
			            allowBlank : true,
			            //blankText : 'ETD不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'eta',
			            fieldLabel : 'ETA',
			            allowBlank : true,
			            //blankText : 'ETA不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ new Ext.form.ComboBox({
							hiddenName : 'chargeCostPayMode',
							fieldLabel : '运费支付方式',
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
							anchor : '90%'
						}) ]
			          },
			           {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'collGdsSite',
			            fieldLabel : '收货地',
			            allowBlank : true,
			            //blankText : '收货地不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadTraffPort',
			            fieldLabel : '装运港',
			            allowBlank : true,
			            //blankText : '装运港不能为空',
			            maxLength : 200,
			            minLength : 1,
			            hidden:true,
			            anchor : '90%'
			           } ,new Com.xywz.common.PortMgmtInfoQuery(
								{
									fieldLabel : '装运港名称',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'loadTraffPortName',
									id : 'LOAD_TRAFF_PORT_NAME2',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : true,
									// 不允许为空
									//blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('LOAD_TRAFF_PORT_NAME2').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('LOAD_TRAFF_PORT_NAME2').setValue(records[0].data.PORT_NAME_CN);
										editXywzLogiCfmSnglForm.getForm().findField('loadTraffPort').setValue(parseInt(records[0].data.PORT_ID));
																				
									}
								})]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'aimPort',
			            fieldLabel : '抵运港',
			            allowBlank : true,
			            //blankText : '抵运港不能为空',
			            maxLength : 200,
			            minLength : 1,
			            hidden:true,
			            anchor : '90%'
			           },new Com.xywz.common.PortMgmtInfoQuery(
						{
							fieldLabel : '抵运港名称',
							labelStyle : 'text-align:left;',
							//labelWidth : 100,
							name : 'aimPortName',
							id : 'AIM_PORT_NAME2',
							singleSelected : false,
							// 单选复选标志
							editable : false,
							allowBlank : true,
							// 不允许为空
							//blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('AIM_PORT_NAME2').oCustomerQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('AIM_PORT_NAME2').setValue(records[0].data.PORT_NAME_CN);
								editXywzLogiCfmSnglForm.getForm().findField('aimPort').setValue(parseInt(records[0].data.PORT_ID));
																		
							}
						}) ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'unloadGdsPort',
			            fieldLabel : '卸货港',
			            allowBlank : true,
			            //blankText : '卸货港不能为空',
			            maxLength : 200,
			            minLength : 1,
			            hidden:true,
			            anchor : '90%'
			           },new Com.xywz.common.PortMgmtInfoQuery(
								{
									fieldLabel : '卸货港名称',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'unloadGdsPortName',
									id : 'UNLOADGDS_PORT_NAME2',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : true,
									// 不允许为空
									//blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('UNLOADGDS_PORT_NAME2').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('UNLOADGDS_PORT_NAME2').setValue(records[0].data.PORT_NAME_CN);
										editXywzLogiCfmSnglForm.getForm().findField('unloadGdsPort').setValue(parseInt(records[0].data.PORT_ID));
																				
									}
								}) ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'sheetSnglNum',
			            fieldLabel : '关单号',
			            allowBlank : true,
			            //blankText : '关单号不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'prdDt',
			            fieldLabel : '免箱期',
			            allowBlank : true,
			            //blankText : '免箱期不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'dlvyForm',
			            fieldLabel : '交付单据',
			            allowBlank : true,
			            //blankText : '交付单据不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadBillNumShr',
			            fieldLabel : '提单份数',
			            allowBlank : true,
			            //blankText : '提单份数不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadBillIssuDay',
			            fieldLabel : '提单签发日',
			            allowBlank : true,
			            //blankText : '提单签发日不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
			         {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'loadBillRecvDay',
			            fieldLabel : '提单收到日',
			            allowBlank : true,
			            //blankText : '提单收到日不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'lastReachDt',
			            fieldLabel : '最晚交单日',
			            allowBlank : true,
			            //blankText : '最晚交单日不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },
		              	{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'lcId',
			            fieldLabel : '信用证编号',
			            allowBlank : true,
			            //blankText : '信用证编号不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			         {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'mkBoxMode',
			            fieldLabel : '做箱方式',
			            allowBlank : true,
			            //blankText : '做箱方式不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsDesc',
			            fieldLabel : '货物描述',
			            allowBlank : true,
			            //blankText : '货物描述不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'memo',
			            fieldLabel : '备注',
			            allowBlank : true,
			            //blankText : '备注不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [new Ext.form.ComboBox({
							hiddenName : 'chkStat',
							fieldLabel : '审核状态',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : boxstore1,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
						})  ]
			          } ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzLogiCfmSnglForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiCfmSnglAction.json',
								method : 'POST',
								form : editXywzLogiCfmSnglForm.getForm().id,
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
							
							editXywzLogiCfmSnglWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzLogiCfmSnglWindow.hide();
						}
					} ]
				} ]
			});

			var detailXywzLogiCfmSnglWindow = new Ext.Window({
				title : '运确认单信息详情',
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
				items : [ detailXywzLogiCfmSnglForm ]
			});

			// 定义新增窗口
			var addXywzLogiCfmSnglWindow = new Ext.Window({
				title : '出运确认单新增',
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
				items : [ addXywzLogiCfmSnglForm ]
			});

			// 定义修改窗口
			var editXywzLogiCfmSnglWindow = new Ext.Window({
				title : '出运确认单修改',
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
				items : [ editXywzLogiCfmSnglForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '出运确认单信息列表',
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