Ext
		.onReady(function() {
			Ext.QuickTips.init();

			/** *************用于修复ie下datefield显示不完整的bug,ie9测试ok************** */
			Ext.isIE8 = Ext.isIE && navigator.userAgent.indexOf('MSIE 8') != -1;
			Ext.override(Ext.menu.Menu, {
				autoWidth : function() {
					var el = this.el, ul = this.ul;
					if (!el) {
						return;
					}
					var w = this.width;
					if (w) {
						el.setWidth(w);
					} else if (Ext.isIE && !Ext.isIE8) { // Ext2.2 支持
						// Ext.isIE8 属性
						el.setWidth(this.minWidth);
						var t = el.dom.offsetWidth;
						el.setWidth(ul.getWidth() + el.getFrameWidth("lr"));
					}
				}
			});

			/** ******************方案类型******************** */
			var nlStore = new Ext.data.ArrayStore({
				fields : [ 'key', 'value' ],
				data : [ [ '对私', '1' ], [ '对公', '2' ] ]
			});

			/** ******************是否启用******************** */
			var irStore = new Ext.data.ArrayStore({
				fields : [ 'key', 'value' ],
				data : [ [ '是', '1' ], [ '否', '0' ] ]
			});
			/** ******************方案适用范围**************** */
			var fafwStore = new Ext.data.ArrayStore({
				fields : [ 'key', 'value' ],
				data : [ [ '全行', '0' ], [ '机构', '1' ] ]
			});
			/** ******************评级频率******************** */
			var pjplStore = new Ext.data.ArrayStore({
				fields : [ 'key', 'value' ],
				data : [ [ '天', '0' ], [ '周', '1' ], [ '旬', '2' ],
						[ '月', '3' ], [ '季度', '4' ], [ '半年', '5' ],
						[ '年', '6' ] ]
			});

			/** **********************公告查询FORM*************************** */
			var centerApply = new Ext.form.FormPanel({
				id : "searchCondition",
				labelWidth : 100,
				frame : true,
				autoScroll : true,
				region : 'north',
				title : '客户评级方案查询',
				buttonAlign : "center",
				height : 100,
				width : '100%',
				labelAlign : 'right',
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							fieldLabel : '方案名称',
							name : 'NOTICE_TITLE',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'combo',
							fieldLabel : '方案类型',
							editable : false,
							emptyText : '请选择',
							name : 'NOTICE_LEVEL',
							mode : 'local',
							anchor : '90%',
							triggerAction : 'all',
							store : nlStore,
							valueField : 'value',
							displayField : 'key'
						} ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'combo',
							fieldLabel : '是否启用',
							mode : 'local',
							emptyText : '请选择',
							store : irStore,
							triggerAction : 'all',
							valueField : 'value',
							editable : false,
							displayField : 'key',
							name : 'isRead',
							anchor : '90%'
						} ]
					} ]
				} ],
				buttons : [ {
					text : '查询',
					xtype : 'button',
					handler : function() {
						restfulStore.loadData(memberData);
					}
				}, {
					text : '重置',
					xtype : 'button',
					handler : function() {
						centerApply.getForm().reset();
					}
				} ]
			});

			/**
			 * Create a standard HttpProxy instance.
			 */
			var proxyIndex = new Ext.data.HttpProxy({
				url : basepath + '/noticequery.json?noticeTitle=asas（）'
			});
			/**
			 * Data record, used for read records from the JAVA project to
			 * store.
			 */
			var TopicRecord = Ext.data.Record.create([ {
				name : 'f1'
			}, {
				name : 'f2'
			}, {
				name : 'f3'
			}, {
				name : 'f4'
			}, {
				name : 'f5'
			}, {
				name : 'f6'
			}, {
				name : 'f7'
			}, {
				name : 'f8'
			}, {
				name : 'f9'
			}, {
				name : 'f10'
			}, {
				name : 'f11'
			}, {
				name : 'f12'
			}, {
				name : 'f13'
			}, {
				name : 'f14'
			} ]);
			/**
			 * Typical JsonReader. Notice additional meta-data params for
			 * defining the core attributes of your json-response
			 */
			var reader = new Ext.data.JsonReader({
				totalProperty : 'num',// 记录总数
				root : 'rows'// Json中的列表数据根节点
			}, TopicRecord/** data record */
			);
			/**
			 * store writer, defined for delete records.
			 */
			var writer = new Ext.data.JsonWriter({
				encode : false
			});
			var sm = new Ext.grid.CheckboxSelectionModel();

			var rownum = new Ext.grid.RowNumberer({
				header : 'NO',
				width : 28
			});
			var cm1 = new Ext.grid.ColumnModel([ rownum, sm, {
				hidden : true,
				header : '方案ID',
				dataIndex : 'f1',
				sortable : true,
				width : 120
			}, {
				header : '方案名称',
				dataIndex : 'f1',
				sortable : true,
				width : 300
			}, {
				header : '方案类型',
				dataIndex : 'f2',
				sortable : true,
				width : 80
			}, {
				header : '是否启用',
				sortable : true,
				dataIndex : 'f3',
				width : 80
			}, {
				header : '创建时间',
				width : 120,
				sortable : true,
				dataIndex : 'f4'
			}, {
				header : '创建人',
				width : 120,
				sortable : true,
				dataIndex : 'f5'
			}, {
				header : '创建机构',
				dataIndex : 'f6',
				sortable : true,
				width : 120
			}, {
				header : '最近修改人',
				sortable : true,
				dataIndex : 'f7',
				width : 120
			}, {
				header : '最近修改时间',
				sortable : true,
				dataIndex : 'f8',
				width : '50'
			}, {
				hidden : true,
				header : '方案适用范围',
				dataIndex : 'f9'
			}, {
				hidden : true,
				header : '评级起始日期',
				dataIndex : 'f12'
			}, {
				hidden : true,
				header : '评级结束日期',
				dataIndex : 'f13'
			}, {
				hidden : true,
				header : '评级频率',
				dataIndex : 'f11'
			}, {
				hidden : true,
				header : '方案机构范围',
				dataIndex : 'f14'
			} ]);
			/**
			 * grid store, include proxy、writer、reader
			 */
			var restfulStore = new Ext.data.Store({
				id : 'notice',
				restful : true,
				proxy : proxyIndex,
				reader : reader,
				writer : writer,
				recordType : TopicRecord
			});

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
				value : 20,
				editable : false,
				width : 85
			});

			var bbar = new Ext.PagingToolbar({
				pageSize : parseInt(pagesize_combo.getValue()),
				store : restfulStore,
				displayInfo : true,
				displayMsg : '显示{0}条到{1}条,共{2}条',
				emptyMsg : "没有符合条件的记录",
				items : [ '-', '&nbsp;&nbsp;', pagesize_combo ]
			});
			pagesize_combo.on("select", function(comboBox) {
				bbar.pageSize = parseInt(pagesize_combo.getValue()),
						restfulStore.reload({
							params : {
								start : 0,
								limit : parseInt(pagesize_combo.getValue())
							}
						});
			});
			/**
			 * page size from PagingToolbar combobox.
			 */
			// restfulStore.load({
			// params : {
			// start : 0,
			// limit : parseInt(pagesize_combo.getValue())
			// }
			// });
			var memberData = {
				TOTALCOUNT : 6,
				rows : [ {
					"rownum" : "1",
					"f1" : "成都分行2011年度零售客户评级方案",
					"f2" : "对私",
					"f3" : "是",
					"f4" : "2013-03-23",
					"f5" : "李小明",
					"f6" : "成都分行",
					"f7" : "2013-03-23",
					"f8" : "张强",
					"f9" : "全行",
					"f12" : "2012-01-01",
					"f13" : "2014-01-01",
					"f11" : "天",
					"f14" : "成都分行"
				}, {
					"rownum" : "2",
					"f1" : "深圳分行2012年度零售客户评级方案",
					"f2" : "对私",
					"f3" : "否",
					"f4" : "2012-12-19",
					"f5" : "司马",
					"f6" : "深圳分行",
					"f7" : "2012-12-19",
					"f8" : "又系",
					"f9" : "机构",
					"f12" : "2012-01-01",
					"f13" : "2014-01-01",
					"f11" : "旬",
					"f14" : "深圳分行"
				}, {
					"rownum" : "3",
					"f1" : "上海分行2013年度零售客户评级方案",
					"f2" : "对私",
					"f3" : "是",
					"f4" : "2012-11-06",
					"f5" : "欧阳",
					"f6" : "上海分行",
					"f7" : "2012-11-06",
					"f8" : "林侃",
					"f9" : "全行",
					"f12" : "2012-01-01",
					"f13" : "2014-01-01",
					"f11" : "季度",
					"f14" : "上海分行"
				}, {
					"rownum" : "4",
					"f1" : "北京分行2011年度对公客户评级方案",
					"f2" : "对公",
					"f3" : "是",
					"f4" : "2013-03-03",
					"f5" : "吴东",
					"f6" : "北京分行",
					"f7" : "2013-03-03",
					"f8" : "礼仪",
					"f9" : "机构",
					"f12" : "2012-01-01",
					"f13" : "2014-01-01",
					"f11" : "周",
					"f14" : "北京分行"
				}, {
					"rownum" : "5",
					"f1" : "广州分行2012年度对公客户评级方案",
					"f2" : "对公",
					"f3" : "否",
					"f4" : "2013-03-01",
					"f5" : "三和",
					"f6" : "广州分行",
					"f7" : "2013-03-01",
					"f8" : "威志",
					"f9" : "全行",
					"f12" : "2012-01-01",
					"f13" : "2014-01-01",
					"f11" : "月",
					"f14" : "广州分行"
				}, {
					"rownum" : "6",
					"f1" : "广州分行2013年度对公客户评级方案",
					"f2" : "对公",
					"f3" : "否",
					"f4" : "2013-03-01",
					"f5" : "三和",
					"f6" : "广州分行",
					"f7" : "2013-03-01",
					"f8" : "礼仪",
					"f9" : "全行",
					"f12" : "2012-01-01",
					"f13" : "2014-01-01",
					"f11" : "月",
					"f14" : "广州分行"
				}, {
					"rownum" : "7",
					"f1" : "全行2011年度对公客户评级方案",
					"f2" : "对公",
					"f3" : "否",
					"f4" : "2012-10-26",
					"f5" : "许劭区",
					"f6" : "总行",
					"f7" : "2012-10-26",
					"f8" : "林侃",
					"f9" : "全行",
					"f12" : "2012-01-01",
					"f13" : "2014-01-01",
					"f11" : "年",
					"f14" : "总行"
				}, {
					"rownum" : "8",
					"f1" : "全行2012年度对公客户评级方案",
					"f2" : "对公",
					"f3" : "否",
					"f4" : "2012-10-26",
					"f5" : "吴东",
					"f6" : "总行",
					"f7" : "2012-10-26",
					"f8" : "须有",
					"f9" : "全行",
					"f12" : "2012-01-01",
					"f13" : "2014-01-01",
					"f11" : "年",
					"f14" : "总行"
				}, {
					"rownum" : "9",
					"f1" : "全行2013年度对公客户评级方案",
					"f2" : "对公",
					"f3" : "否",
					"f4" : "2012-10-26",
					"f5" : "许劭区",
					"f6" : "总行",
					"f7" : "2012-10-26",
					"f8" : "林侃",
					"f9" : "全行",
					"f12" : "2012-01-01",
					"f13" : "2014-01-01",
					"f11" : "年",
					"f14" : "总行"
				}, {
					"rownum" : "10",
					"f1" : "全行2011年度对公客户评级方案",
					"f2" : "对私",
					"f3" : "否",
					"f4" : "2012-10-26",
					"f5" : "吴东",
					"f6" : "总行",
					"f7" : "2012-10-26",
					"f8" : "吴东",
					"f9" : "全行",
					"f12" : "2012-01-01",
					"f13" : "2014-01-01",
					"f11" : "年",
					"f14" : "总行"
				}, {
					"rownum" : "11",
					"f1" : "全行2012年度对公客户评级方案",
					"f2" : "对私",
					"f3" : "否",
					"f4" : "2012-10-26",
					"f5" : "许劭区",
					"f6" : "总行",
					"f7" : "2012-10-26",
					"f8" : "须有",
					"f9" : "全行",
					"f12" : "2012-01-01",
					"f13" : "2014-01-01",
					"f11" : "年",
					"f14" : "总行"
				}, {
					"rownum" : "12",
					"f1" : "全行2013年度对公客户评级方案",
					"f2" : "对私",
					"f3" : "否",
					"f4" : "2012-10-26",
					"f5" : "吴东",
					"f6" : "总行",
					"f7" : "2012-10-26",
					"f8" : "林侃",
					"f9" : "全行",
					"f12" : "2012-01-01",
					"f13" : "2014-01-01",
					"f11" : "年",
					"f14" : "总行"
				} ]
			};
			restfulStore.loadData(memberData);

			/**
			 * form panel ,used for create,update,and show the records.
			 */
			var addaffiche = new Ext.FormPanel(
					{
						formId : 'newNotice',
						frame : true,
						border : false,
						labelAlign : 'right',
						standardSubmit : false,
						layout : 'form',
						width : 800,
						items : [
								{
									layout : 'column',
									items : [ {
										columnWidth : .33,
										layout : 'form',
										items : [ {
											xtype : 'textfield',
											fieldLabel : '方案名称',
											name : 'f1',
											anchor : '100%'
										} ]
									}, {
										columnWidth : .33,
										layout : 'form',
										items : [ {
											xtype : 'combo',
											fieldLabel : '方案类型',
											editable : false,
											emptyText : '请选择',
											name : 'f2',
											mode : 'local',
											anchor : '100%',
											triggerAction : 'all',
											store : nlStore,
											valueField : 'value',
											displayField : 'key'
										} ]
									}, {
										columnWidth : .33,
										layout : 'form',
										items : [ {
											xtype : 'combo',
											fieldLabel : '是否启用',
											mode : 'local',
											emptyText : '请选择',
											store : irStore,
											triggerAction : 'all',
											valueField : 'value',
											editable : false,
											displayField : 'key',
											name : 'f3',
											anchor : '100%'
										} ]
									} ]
								},
								{
									layout : 'column',
									items : [
											{
												columnWidth : .33,
												layout : 'form',
												items : [ {
													xtype : 'combo',
													fieldLabel : '方案适用范围',
													mode : 'local',
													emptyText : '请选择',
													store : fafwStore,
													triggerAction : 'all',
													valueField : 'value',
													editable : false,
													displayField : 'key',
													name : 'f9',
													anchor : '100%',
													listeners : {
														"select" : function() {
															var f9_value = addaffiche
																	.getForm()
																	.findField(
																			"f9")
																	.getValue();
															if (f9_value == "1") {
																addaffiche
																		.getForm()
																		.findField(
																				"f14")
																		.show();
															} else {
																addaffiche
																		.getForm()
																		.findField(
																				"f14")
																		.hide();
															}
														}
													}
												} ]
											}, {
												columnWidth : .33,
												layout : 'form',
												items : [ {
													xtype : 'datefield',
													fieldLabel : '评级起始日期',
													format : 'Y-m-d',
													name : 'f12',
													selectOnFocus : true,
													anchor : '100%'
												} ]
											}, {
												columnWidth : .33,
												layout : 'form',
												items : [ {
													xtype : 'datefield',
													fieldLabel : '评级结束日期',
													format : 'Y-m-d',
													name : 'f13',
													selectOnFocus : true,
													anchor : '100%'
												} ]
											} ]
								},
								{
									layout : 'column',
									items : [
											{
												columnWidth : .33,
												layout : 'form',
												items : [ {
													xtype : 'combo',
													fieldLabel : '评级频率',
													mode : 'local',
													emptyText : '请选择',
													store : pjplStore,
													triggerAction : 'all',
													valueField : 'value',
													editable : false,
													displayField : 'key',
													name : 'f11',
													anchor : '100%'
												} ]
											},
											{
												columnWidth : .33,
												layout : 'form',
												items : [ new Com.yucheng.bcrm.common.OrgField(
														{
															searchType : 'SUBTREE',/*
																					 * 指定查询机构范围属性
																					 * SUBTREE（子机构树）SUBORGS（直接子机构）PARENT（父机构）PARPATH
																					 * （所有父、祖机构）ALLORG（所有机构）
																					 */
															fieldLabel : '方案机构范围',
															labelStyle : 'text-align:right;',
															id : 'ORG_NAME2', // 放大镜组件ID，用于在重置清空时获取句柄
															name : 'f14',
															hiddenName : 'instncode', // 后台获取的参数名称
															anchor : '100%',
															checkBox : false,
															hidden : true
														}) ]
											} ]
								} ]
					});

			/**
			 * grid toolbar.
			 */
			var tbar = new Ext.Toolbar(
					{
						items : [
								{
									text : '新增方案',
									iconCls : 'addIconCss',
									handler : function() {
										var win = new Ext.Window(
												{
													autoScroll : true,
													resizable : true,
													collapsible : true,
													maximizable : true,
													draggable : true,
													closeAction : 'hide',
													modal : true, // 模态窗口
													animCollapse : true,
													border : false,
													loadMask : true,
													closable : true,
													constrain : true,
													width : 840,
													height : 470,
													title : '新增方案',
													items : [ addaffiche,
															grid_express,
															grid_express_result ],
													buttonAlign : 'center',
													buttons : [
															{
																text : '保存',
																handler : function() {
																	Ext.MessageBox
																			.alert(
																					'提示',
																					'保存成功！');
																	win.hide();
																}
															},
															{
																text : '关闭',
																handler : function() {
																	win.hide();
																}
															} ],
													listeners : {
														'show' : function() {
															teamstore
																	.loadData(datas);
															teamstore_result
																	.loadData(datas_result);
															addaffiche
																	.getForm()
																	.findField(
																			"f14")
																	.hide();
														}
													}
												});
										win.show();
										addaffiche.getForm().reset();
									}
								},
								'-',
								{
									id : '__upNot',
									text : '修改方案',
									iconCls : 'resetIconCss',
									handler : function() {
										var _record = grid.getSelectionModel()
												.getSelected();
										if (!_record) {
											Ext.MessageBox.alert('修改操作',
													'请选择要操作的记录！');
											return false;
										} else {
											var win = new Ext.Window(
													{
														autoScroll : true,
														resizable : true,
														collapsible : true,
														maximizable : true,
														draggable : true,
														closeAction : 'hide',
														modal : true, // 模态窗口
														animCollapse : true,
														border : false,
														loadMask : true,
														closable : true,
														constrain : true,
														width : 840,
														height : 470,
														title : '修改方案',
														items : [ addaffiche,
																grid_express,
																grid_express_result ],
														buttonAlign : 'center',
														buttons : [
																{
																	text : '保存',
																	handler : function() {
																		Ext.MessageBox
																				.alert(
																						'提示',
																						'保存成功！');
																		win
																				.hide();
																	}
																},
																{
																	text : '关闭',
																	handler : function() {
																		win
																				.hide();
																	}
																} ],
														listeners : {
															'show' : function() {
																var record = grid
																		.getSelectionModel()
																		.getSelected();
																addaffiche
																		.getForm()
																		.loadRecord(
																				record);
																teamstore
																		.loadData(datas_view);
																teamstore_result
																		.loadData(datas_result_view);
																var f9_value = addaffiche
																		.getForm()
																		.findField(
																				"f9")
																		.getValue();
																if (f9_value == "机构") {
																	addaffiche
																			.getForm()
																			.findField(
																					"f14")
																			.show();
																} else {
																	addaffiche
																			.getForm()
																			.findField(
																					"f14")
																			.hide();
																}
															}
														}
													});
											win.show();
										}
									}
								},
								'-',
								{
									id : 'infoNot',
									text : '查看方案',
									iconCls : 'detailIconCss',
									handler : function() {
										var _record = grid.getSelectionModel()
												.getSelected();
										if (!_record) {
											Ext.MessageBox.alert('修改操作',
													'请选择要操作的记录！');
											return false;
										} else {
											var win = new Ext.Window(
													{
														autoScroll : true,
														resizable : true,
														collapsible : true,
														maximizable : true,
														draggable : true,
														closeAction : 'hide',
														modal : true, // 模态窗口
														animCollapse : true,
														border : false,
														loadMask : true,
														closable : true,
														constrain : true,
														width : 840,
														height : 470,
														title : '查看方案',
														items : [ addaffiche,
																grid_express,
																grid_express_result ],
														buttonAlign : 'center',
														buttons : [ {
															text : '关闭',
															handler : function() {
																win.hide();
															}
														} ],
														listeners : {
															'show' : function() {
																var record = grid
																		.getSelectionModel()
																		.getSelected();
																addaffiche
																		.getForm()
																		.loadRecord(
																				record);
																teamstore
																		.loadData(datas_view);
																teamstore_result
																		.loadData(datas_result_view);
																var f9_value = addaffiche
																		.getForm()
																		.findField(
																				"f9")
																		.getValue();
																if (f9_value == "机构") {
																	addaffiche
																			.getForm()
																			.findField(
																					"f14")
																			.show();
																} else {
																	addaffiche
																			.getForm()
																			.findField(
																					"f14")
																			.hide();
																}
															}
														}
													});
											win.show();
										}
									}
								},
								'-',
								{
									id : 'delNot',
									text : '方案删除',
									iconCls : 'deleteIconCss',
									handler : function() {
										var checkedNodes = grid
												.getSelectionModel().selections.items;
										if (checkedNodes.length == 0) {
											Ext.Msg.alert('提示', '未选择任何记录');
											return;
										} else {
											Ext.MessageBox
													.confirm(
															'提示',
															'确定删除吗？',
															function(buttonId) {
																if (buttonId
																		.toLowerCase() == "no") {
																	return;
																}
																Ext.Msg
																		.alert(
																				'提示',
																				'操作成功！');
															})
										}
									}
								} ]
					});
			/** 公告信息表格* */
			var grid = new Ext.grid.GridPanel({
				title : '客户评级方案信息',
				frame : true,
				store : restfulStore,
				region : 'center',
				stripeRows : true,
				tbar : tbar,
				cm : cm1,
				sm : sm,
				bbar : bbar,
				viewConfig : {},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				}
			});
			grid.on('click', function(grid, rowIndex, event) {
				// setGrant();
			});
			function setGrant() {
				var record = grid.getSelectionModel().getSelected();
				if (record == undefined) {
					return;
				}
				var creator = record.get('creator');
				if (creator == __userId) {
					Ext.getCmp('__upNot').setDisabled(false);
					Ext.getCmp('delNot').setDisabled(false);
					Ext.getCmp('pubNot').setDisabled(false);
					Ext.getCmp('__upload').setDisabled(false);
				} else {
					Ext.getCmp('__upNot').setDisabled(true);
					Ext.getCmp('delNot').setDisabled(true);
					Ext.getCmp('pubNot').setDisabled(true);
					Ext.getCmp('__upload').setDisabled(true);
				}
			}

			var viewport = new Ext.Viewport({
				layout : 'fit',
				items : [ {
					layout : 'border',
					items : [ centerApply, grid ]
				} ]
			});
		});