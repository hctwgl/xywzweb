Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "发运通知单查询",
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
							name : 'shipName',
							labelWidth : 150,
							fieldLabel : '船名',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'numberfield',
							name : 'loadPort',
							hidden:true
						},new Com.xywz.common.PortMgmtInfoQuery(
							{
								fieldLabel : '装港',
								labelStyle : 'text-align:right;',
								//labelWidth : 100,
								name : 'portNameCn',
								id : 'PORT_NAME11',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('PORT_NAME11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('PORT_NAME11').setValue(records[0].data.PORT_NAME_CN);
									qForm.getForm().findField('loadPort').setValue(parseInt(records[0].data.PORT_ID));
									
								}
							}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'numberfield',
							name : 'unloadPort',
							hidden:true
						},new Com.xywz.common.PortMgmtInfoQuery(
							{
								fieldLabel : '卸港',
								labelStyle : 'text-align:right;',
								//labelWidth : 100,
								name : 'unPortNameCn',
								id : 'PORT_NAME_CN11',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('PORT_NAME_CN11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('PORT_NAME_CN11').setValue(records[0].data.PORT_NAME_CN);
									qForm.getForm().findField('unloadPort').setValue(parseInt(records[0].data.PORT_ID));
									
								}
							})]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							labelWidth : 90,
							Width : '100',
							name : 'expctToPortDay',
							fieldLabel : '预计到港日',
							anchor : '90%',
							format:'Y-m-d'
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
				name : 'sendSheetAdvsId',
				   mapping : 'SEND_SHEET_ADVS_ID'
				  }, {
				  name : 'ordrNum',
				   mapping : 'ORDR_NUM'
				  }, {
				  name : 'shipName',
				   mapping : 'SHIP_NAME'
				  }, {
				  name : 'loadPort',
				   mapping : 'LOAD_PORT'
				  }, {
				  name : 'unloadPort',
				   mapping : 'UNLOAD_PORT'
				  }, {
				  name : 'expctToPortDay',
				   mapping : 'EXPCT_TO_PORT_DAY'
				  }, {
				  name : 'shipAgent',
				   mapping : 'SHIP_AGENT'
				  }, {
				  name : 'corpNm',
				   mapping : 'CORP_NM'
				  }, {
				  name : 'shipAgentContcr',
				   mapping : 'SHIP_AGENT_CONTCR'
				  }, {
				  name : 'gdsAgent',
				   mapping : 'GDS_AGENT'
				  }, {
				  name : 'gdsAgentContcr',
				   mapping : 'GDS_AGENT_CONTCR'
				  }, {
				  name : 'makDocPersId',
				   mapping : 'MAK_DOC_PERS_ID'
				  }, {
				  name : 'makDocPersNm',
				   mapping : 'MAK_DOC_PERS_NM'
				  }, {
				  name : 'lastGdsSitu',
				   mapping : 'LAST_GDS_SITU'
				  }, {
				  name : 'qtyPoor',
				   mapping : 'QTY_POOR'
				  }, {
				  name : 'weightNgtvPoor',
				   mapping : 'WEIGHT_NGTV_POOR'
				  }, {
				  name : 'ipeDesc',
				   mapping : 'IPE_DESC'
				  }, {
				  name : 'upnDesc',
				   mapping : 'UPN_DESC'
				  }, {
				  name : 'delvAddr',
				   mapping : 'DELV_ADDR'
				  }, {
				  name : 'delvPers',
				   mapping : 'DELV_PERS'
				  }, {
				  name : 'delvPersTel',
				   mapping : 'DELV_PERS_TEL'
				  }, {
				  name : 'mkTabPersId',
				   mapping : 'MK_TAB_PERS_ID'
				  }, {
				  name : 'mkTabPersNm',
				   mapping : 'MK_TAB_PERS_NM'
				  }, {
				  name : 'mkTabDt',
				   mapping : 'MK_TAB_DT'
				  }, {
				  name : 'portNameCn',
				   mapping : 'PORT_NAME_CN'
				  }, {
				  name : 'unPortNameCn',
				   mapping : 'UN_PORT_NAME_CN'
				  }, {
				  name : 'sendGoodsNotice',
				   mapping : 'SEND_GOODS_NOTICE'
				  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '发运通知ID',
				   width : 210,
				   dataIndex : 'sendSheetAdvsId',
				   sortable : true,
				   hidden : false
				  }, {
				  header : '序号',
				   width : 210,
				   dataIndex : 'ordrNum',
				   sortable : true,
				   hidden : true
				  }, {
				  header : '船名',
				   width : 210,
				   dataIndex : 'shipName',
				   sortable : true
				  }, {
				  header : '装港',
				   width : 210,
				   dataIndex : 'portNameCn',
				   sortable : true
				  }, {
				  header : '卸港',
				   width : 210,
				   dataIndex : 'unPortNameCn',
				   sortable : true
				  }, {
				  header : '预计到港日',
				   width : 210,
				   dataIndex : 'expctToPortDay',
				   sortable : true
				  }, {
				  header : '船代',
				   width : 210,
				   dataIndex : 'shipAgent',
				   sortable : true,
				   hidden : true
				  }, {
				  header : '船代名称',
				   width : 210,
				   dataIndex : 'corpNm',
				   sortable : true
				  }, {
				  header : '船代联系人',
				   width : 210,
				   dataIndex : 'shipAgentContcr',
				   sortable : true
				  }, {
				  header : '货代',
				   width : 210,
				   dataIndex : 'gdsAgent',
				   sortable : true
				  }, {
				  header : '货代联系人',
				   width : 210,
				   dataIndex : 'gdsAgentContcr',
				   sortable : true
				  }, {
				  header : '国阳制单人编号',
				   width : 210,
				   dataIndex : 'makDocPersId',
				   sortable : true,
				   hidden : true
				  }, {
				  header : '国阳制单人名称',
				   width : 210,
				   dataIndex : 'makDocPersNm',
				   sortable : true
				  }, {
				  header : '上货情况',
				   width : 210,
				   dataIndex : 'lastGdsSitu',
				   sortable : true
				  }, {
				  header : '量差',
				   width : 210,
				   dataIndex : 'qtyPoor',
				   sortable : true
				  }, {
				  header : '重量负差',
				   width : 210,
				   dataIndex : 'weightNgtvPoor',
				   sortable : true
				  }, {
				  header : 'IPE描述',
				   width : 210,
				   dataIndex : 'ipeDesc',
				   sortable : true
				  }, {
				  header : 'UPN描述',
				   width : 210,
				   dataIndex : 'upnDesc',
				   sortable : true
				  }, {
				  header : '发货地址',
				   width : 210,
				   dataIndex : 'delvAddr',
				   sortable : true
				  }, {
				  header : '发货人',
				   width : 210,
				   dataIndex : 'delvPers',
				   sortable : true
				  }, {
				  header : '发货人电话',
				   width : 210,
				   dataIndex : 'delvPersTel',
				   sortable : true
				  }, {
				  header : '制表人编号',
				   width : 210,
				   dataIndex : 'mkTabPersId',
				   sortable : true,
				   hidden : true
				  }, {
				  header : '制表人姓名',
				   width : 210,
				   dataIndex : 'mkTabPersNm',
				   sortable : true
				  }, {
				  header : '制表日期',
				   width : 210,
				   dataIndex : 'mkTabDt',
				   sortable : true
				  }, {
				  header : '发货注意事项描述',
				   width : 210,
				   dataIndex : 'sendGoodsNotice',
				   sortable : true
				  }]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzLogiSendNoticeQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'SEND_SHEET_ADVS_ID',
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
											addXywzLogiSendNoticeForm.getForm().reset();											
											addXywzLogiSendNoticeWindow.show();
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
												editXywzLogiSendNoticeForm.getForm().loadRecord(selectRe);
												editXywzLogiSendNoticeWindow.show();

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
												tempId = selectRe.data.sendSheetAdvsId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzLogiSendNoticeAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzLogiSendNoticeQueryAction.json'
							        }),'-',{
										text : '详情',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												var _record = grid.getSelectionModel().getSelected();
												var viewUrl = basepath
												+ '/contents/pages/xywz/logi/xywzLogiSendNoticeDetail.jsp?'
												+ '&sendSheetAdvsId='+_record.data.sendSheetAdvsId; 
												operateWin.show();
												document.getElementById('mainFrame').src=viewUrl;
												//detailXywzCustCustInfoWindow.show();
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
							      			var sheetId = record.get("sendSheetAdvsId");
								  			window.open(basepath+"/contents/pages/xywz/logi/xywzLogiSendNoticePrint.jsp?sheetId="+sheetId,"newwindow","");
										}
									}]
					});
			
			operateWin= new Ext.Window({
				title : '',
				id:'operateWinId',
				plain : true,
				layout : 'fit',
				resizable : true,
				draggable : true,
				closable : true,
				closeAction : 'hide',
				modal : true, // 模态窗口
				maximizable : false, // 最大化最小化
				collapsible : false,
				border : false,
				maximized : true, // 默认最大化
				animCollapse : true,
				constrain : true,
				html:"<iframe id='mainFrame' name='mainFrame' style='border:0 solid #000;height:100%;width:100%;' src='' ></iframe>"
			});

			// 新增窗口展示的from
			var addXywzLogiShipCorpMgmtForm = new Ext.form.FormPanel({
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
					     name : 'ordrNum',
					     fieldLabel : '<font color=red>*</font>序号',
					     allowBlank : false,
					     blankText : '序号不能为空',
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
						     name : 'shipName',
						     fieldLabel : '<font color=red>*</font>船名',
						     allowBlank : false,
						     blankText : '船名不能为空',
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
								name : 'loadPort',
								hidden:true
							},new Com.xywz.common.PortMgmtInfoQuery(
								{
									fieldLabel : '装港',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'portNameCn',
									id : 'PORT_NAME22',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('PORT_NAME22').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('PORT_NAME22').setValue(records[0].data.PORT_NAME_CN);
										addXywzLogiSendNoticeForm.getForm().findField('loadPort').setValue(parseInt(records[0].data.PORT_ID));
										
									}
								}) ]
						   },{
							    columnWidth : .5,
							    layout : 'form',
							    items : [ {
									xtype : 'numberfield',
									name : 'unloadPort',
									hidden:true
								},new Com.xywz.common.PortMgmtInfoQuery(
									{
										fieldLabel : '卸港',
										labelStyle : 'text-align:left;',
										//labelWidth : 100,
										name : 'unPortNameCn',
										id : 'PORT_NAME_CN22',
										singleSelected : false,
										// 单选复选标志
										editable : false,
										allowBlank : false,
										// 不允许为空
										blankText : "不能为空，请填写",
										anchor : '90%',
										callback : function(a, b) {
											var records = Ext.getCmp('PORT_NAME_CN22').oCustomerQueryGrid.getSelectionModel().selections.items;
											Ext.getCmp('PORT_NAME_CN22').setValue(records[0].data.PORT_NAME_CN);
											addXywzLogiSendNoticeForm.getForm().findField('unloadPort').setValue(parseInt(records[0].data.PORT_ID));									
										}
									}) ]
							   },
							{
							    columnWidth : .5,
							    layout : 'form',
							    items : [ {
							     xtype : 'datefield',
							     vtype : 'trim',
							     Width : '100',
							     name : 'expctToPortDay',
							     fieldLabel : '<font color=red>*</font>预计到港日',
							     allowBlank : false,
							     blankText : '预计到港日不能为空',
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
										name : 'shipAgent',
										hidden:true
									},new Com.xywz.common.LogiShipCorpQuery(
										{
											fieldLabel : '船代',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'corpNm',
											id : 'SHIP_AGENT11',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('SHIP_AGENT11').oCustomerQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('SHIP_AGENT11').setValue(records[0].data.CORP_NM);
												addXywzLogiSendNoticeForm.getForm().findField('shipAgent').setValue(parseInt(records[0].data.SHIP_CORP_ID));
												addXywzLogiSendNoticeForm.getForm().findField('shipAgentContcr').setValue(records[0].data.CONTCR);
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
								     name : 'shipAgentContcr',
								     fieldLabel : '<font color=red>*</font>船代联系人',
								     allowBlank : false,
								     blankText : '船代联系人不能为空',
								     maxLength : 200,
								     minLength : 1,
								     anchor : '90%',
								     hidden : true
								    } ]
								   },
								{
								    columnWidth : .5,
								    layout : 'form',
								    items : [ {
								     xtype : 'textfield',
								     vtype : 'trim',
								     Width : '100',
								     name : 'gdsAgent',
								     fieldLabel : '<font color=red>*</font>货代',
								     allowBlank : false,
								     blankText : '货代不能为空',
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
								     name : 'gdsAgentContcr',
								     fieldLabel : '<font color=red>*</font>货代联系人',
								     allowBlank : false,
								     blankText : '货代联系人不能为空',
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
								     name : 'makDocPersId',
								     fieldLabel : '国阳制单人编号',
								     allowBlank : true,
								     maxLength : 200,
								     minLength : 1,
								     anchor : '90%',
								     hidden : true
								    } ]
								   },
								{
								    columnWidth : .5,
								    layout : 'form',
								    items : [new Com.xywz.common.UserManagerIdQuery(
											{
												fieldLabel : '国阳制单人名称',
												labelStyle : 'text-align:left;',
												//labelWidth : 100,
												name : 'makDocPersNm',
												id : 'USER_NAME22',
												singleSelected : false,
												// 单选复选标志
												editable : false,
												allowBlank : false,
												// 不允许为空
												blankText : "不能为空，请填写",
												anchor : '90%',
												callback : function(a, b) {
													var records = Ext.getCmp('USER_NAME22').oCustomerQueryGrid.getSelectionModel().selections.items;
													Ext.getCmp('USER_NAME22').setValue(records[0].data.USER_NAME);
													addXywzLogiSendNoticeForm.getForm().findField('makDocPersId').setValue(records[0].data.ACCOUNT_NAME);
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
								     name : 'lastGdsSitu',
								     fieldLabel : '<font color=red>*</font>上货情况',
								     allowBlank : false,
								     blankText : '上货情况不能为空',
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
								     name : 'qtyPoor',
								     fieldLabel : '<font color=red>*</font>量差',
								     allowBlank : false,
								     blankText : '量差不能为空',
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
								     name : 'weightNgtvPoor',
								     fieldLabel : '<font color=red>*</font>重量负差',
								     allowBlank : false,
								     blankText : '重量负差不能为空',
								     maxLength : 200,
								     minLength : 1,
								     anchor : '90%'
								    } ]
								   },
								{
								    columnWidth : .5,
								    layout : 'form',
								    items : [ {
								     xtype : 'textarea',
								     vtype : 'trim',
								     Width : '100',
								     name : 'ipeDesc',
								     fieldLabel : '<font color=red>*</font>IPE描述',
								     allowBlank : false,
								     blankText : 'IPE描述不能为空',
								     maxLength : 200,
								     minLength : 1,
								     anchor : '90%'
								    } ]
								   },
								{
								    columnWidth : .5,
								    layout : 'form',
								    items : [ {
								     xtype : 'textarea',
								     vtype : 'trim',
								     Width : '100',
								     name : 'upnDesc',
								     fieldLabel : '<font color=red>*</font>UPN描述',
								     allowBlank : false,
								     blankText : 'UPN描述不能为空',
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
								     name : 'delvAddr',
								     fieldLabel : '<font color=red>*</font>发货地址',
								     allowBlank : false,
								     blankText : '发货地址不能为空',
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
								     name : 'delvPers',
								     fieldLabel : '<font color=red>*</font>发货人',
								     allowBlank : false,
								     blankText : '发货人不能为空',
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
								     name : 'delvPersTel',
								     fieldLabel : '<font color=red>*</font>发货人电话',
								     allowBlank : false,
								     blankText : '发货人电话不能为空',
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
								     name : 'mkTabPersId',
								     fieldLabel : '制表人编号',
								     allowBlank : true,
								     maxLength : 200,
								     minLength : 1,
								     anchor : '90%',
								     hidden : true
								    } ]
								   },
								{
								    columnWidth : .5,
								    layout : 'form',
								    items : [ new Com.xywz.common.UserManagerIdQuery(
											{
												fieldLabel : '制表人姓名',
												labelStyle : 'text-align:left;',
												//labelWidth : 100,
												name : 'mkTabPersNm',
												id : 'USER_NAME33',
												singleSelected : false,
												// 单选复选标志
												editable : false,
												allowBlank : false,
												// 不允许为空
												blankText : "不能为空，请填写",
												anchor : '90%',
												callback : function(a, b) {
													var records = Ext.getCmp('USER_NAME33').oCustomerQueryGrid.getSelectionModel().selections.items;
													Ext.getCmp('USER_NAME33').setValue(records[0].data.USER_NAME);
													addXywzLogiSendNoticeForm.getForm().findField('mkTabPersId').setValue(records[0].data.ACCOUNT_NAME);
												}
											}) ]
								   },
								{
								    columnWidth : .5,
								    layout : 'form',
								    items : [ {
								     xtype : 'datefield',
								     vtype : 'trim',
								     Width : '100',
								     name : 'mkTabDt',
								     fieldLabel : '制表日期',
								     allowBlank : true,
								     maxLength : 200,
								     minLength : 1,
								     anchor : '90%',
								     format:'Y-m-d'
								    } ]
								   },{
									    columnWidth : .5,
									    layout : 'form',
									    items : [ {
									     xtype : 'textarea',
									     vtype : 'trim',
									     Width : '100',
									     name : 'sendGoodsNotice',
									     fieldLabel : '发货注意事项描述',
									     allowBlank : true,
									     maxLength : 200,
									     minLength : 1,
									     anchor : '90%',
									     hidden : false
									    } ]
									   }
								]
							}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzLogiShipCorpMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiShipCorpMgmtAction.json',
								method : 'POST',
								form : addXywzLogiShipCorpMgmtForm.getForm().id,
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
							
							addXywzLogiShipCorpMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzLogiShipCorpMgmtWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzLogiShipCorpMgmtForm = new Ext.form.FormPanel({
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
			            name : 'shipCorpId',
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
			            name : 'corpNm',
			            fieldLabel : '<font color=red>*</font>公司名称',
			            allowBlank : false,
			            blankText : '公司名称不能为空',
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
			            name : 'addr',
			            fieldLabel : '<font color=red>*</font>地址',
			            allowBlank : false,
			            blankText : '地址不能为空',
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
			            name : 'contcr',
			            fieldLabel : '<font color=red>*</font>联系人',
			            allowBlank : false,
			            blankText : '联系人不能为空',
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
			            name : 'contTel1',
			            fieldLabel : '<font color=red>*</font>联系电话1',
			            allowBlank : false,
			            blankText : '联系电话1不能为空',
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
			            name : 'contTel2',
			            fieldLabel : '<font color=red>*</font>联系电话2',
			            allowBlank : false,
			            blankText : '联系电话2不能为空',
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
			            name : 'moblNum1',
			            fieldLabel : '<font color=red>*</font>手机号码1',
			            allowBlank : false,
			            blankText : '手机号码1不能为空',
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
			            name : 'moblNum2',
			            fieldLabel : '<font color=red>*</font>手机号码2',
			            allowBlank : false,
			            blankText : '手机号码2不能为空',
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
			            name : 'setupCoRelDt',
			            fieldLabel : '<font color=red>*</font>建立合作关系日期',
			            allowBlank : false,
			            blankText : '建立合作关系日期不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format : 'Y-m-d'
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

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzLogiShipCorpMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiShipCorpMgmtAction.json',
								method : 'POST',
								form : editXywzLogiShipCorpMgmtForm.getForm().id,
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
							
							editXywzLogiShipCorpMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzLogiShipCorpMgmtWindow.hide();
						}
					} ]
				} ]
			});


			// 定义新增窗口
			var addXywzLogiShipCorpMgmtWindow = new Ext.Window({
				title : '船务公司信息新增',
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
				items : [ addXywzLogiShipCorpMgmtForm ]
			});

			// 定义修改窗口
			var editXywzLogiShipCorpMgmtWindow = new Ext.Window({
				title : '船务公司信息修改',
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
				items : [ editXywzLogiShipCorpMgmtForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '船务公司信息列表',
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