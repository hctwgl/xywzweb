Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				title : "库存分配查询",
				labelWidth : 90, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'right', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 100,
				items : [ {
					layout : 'column',
					items : [  {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'contrNum',
							fieldLabel : '合同号',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'merchdId',
							fieldLabel : '商品',
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

			var record = Ext.data.Record.create([ 
			  { name : 'invtyId',
				   mapping : 'INVTY_ID'
			  }, {
			  name : 'contrNum',
			   mapping : 'CONTR_NUM'
			  }, {
			  name : 'merchdId',
			   mapping : 'MERCHD_ID'
			  }, {
			  name : 'outIntoWhsInd',
			   mapping : 'OUT_INTO_WHS_IND'
			  }, {
			  name : 'prdName',
			   mapping : 'PRD_NAME'
			  }, {
			  name : 'spcModel',
			   mapping : 'SPC_MODEL'
			  }, {
			  name : 'ngtvPoor',
			   mapping : 'NGTV_POOR'
			  }, {
			  name : 'denst',
			   mapping : 'DENST'
			  }, {
			  name : 'len',
			   mapping : 'LEN'
			  }, {
			  name : 'zhiCnt',
			   mapping : 'ZHI_CNT'
			  }, {
			  name : 'jianCnt',
			   mapping : 'JIAN_CNT'
			  }, {
			  name : 'remZhiCnt',
			   mapping : 'REM_ZHI_CNT'
			  }, {
			  name : 'weight',
			   mapping : 'WEIGHT'
			  }
			  , {
				  name : 'beforeWeight',
				   mapping : 'WEIGHT'
				  }
			  , {
				  name : 'beforWeight',
				   mapping : 'WEIGHT'
			  }, {
			  name : 'memo',
			   mapping : 'MEMO'
			  }, {
			  name : 'workshop',
			   mapping : 'WORKSHOP'
			  }, {
			  name : 'intoWhsDt',
			   mapping : 'INTO_WHS_DT'
			  }, {
			  name : 'intoWhsExecPers',
			   mapping : 'INTO_WHS_EXEC_PERS'
			  }, {
			  name : 'outWhsDt',
			   mapping : 'OUT_WHS_DT'
			  }, {
			  name : 'outWhsExecPers',
			   mapping : 'OUT_WHS_EXEC_PERS'
			  }, {
			  name : 'lastOprPers',
			   mapping : 'LAST_OPR_PERS'
			  }, {
			  name : 'finalOprDt',
			   mapping : 'FINAL_OPR_DT'
			  }
			  ]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm,	{  header : '库存ID',
				   width : 120,
				   hidden:true,
				   dataIndex : 'invtyId',
				   sortable : true
				  }, {
				  header : '合同号',
				   width : 120,
				   dataIndex : 'contrNum',
				   hidden:true,
				   sortable : true
				  }, {
				  header : '商品ID',
				   width : 120,
				   hidden:true,
				   dataIndex : 'merchdId',
				   sortable : true
				  }, {
				  header : '品名',
				   width : 180,
				   dataIndex : 'prdName',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 180,
				   dataIndex : 'spcModel',
				   sortable : true
				  }, {
				  header : '重量(吨)',
				   width : 120,
				   dataIndex : 'weight',
				   sortable : true
				  }, {
				  header : '长度(米)',
				   width : 120,
				   dataIndex : 'len',
				   sortable : true
				  }, {
				  header : '支/件',
				   width : 120,
				   dataIndex : 'zhiCnt',
				   sortable : true
				  }, {
				  header : '件数',
				   width : 120,
				   dataIndex : 'jianCnt',
				   sortable : true
				  }, {
				  header : '零支',
				   width : 120,
				   dataIndex : 'remZhiCnt',
				   sortable : true
				  }, {
				  header : '备注',
				   width : 120,
				   dataIndex : 'memo',
				   sortable : true
				  }, {
				  header : '车间',
				   width : 120,
				   dataIndex : 'workshop',
				   sortable : true
				  }, {
				  header : '入库日期',
				   width : 120,
				   dataIndex : 'intoWhsDt',
				   sortable : true
				  }, {
				  header : '入库执行人',
				   width : 120,
				   dataIndex : 'intoWhsExecPers',
				   sortable : true
				  }, {
				  header : '出库日期',
				   width : 120,
				   dataIndex : 'outWhsDt',
				   sortable : true
				  }, {
				  header : '出库执行人',
				   width : 120,
				   dataIndex : 'outWhsExecPers',
				   sortable : true
				  }, {
				  header : '最后一次操作人',
				   width : 120,
				   dataIndex : 'lastOprPers',
				   sortable : true
				  }, {
				  header : '最后操作日期',
				   width : 120,
				   dataIndex : 'finalOprDt',
				   sortable : true
				  }
				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzWareInvtyInfoQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'INVTY_ID',
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
										text : '库存分配',
										iconCls : 'addIconCss',
										handler : function() {

										var selectLength = grid.getSelectionModel().getSelections().length;

										var selectRe = grid.getSelectionModel().getSelections()[0];
										if (selectLength != 1) {
											Ext.Msg.alert('提示','请选择一条记录!');
											return;
										}
										deleteXywzWareInvtyInfoForm.getForm().reset();
										var idStr = '';
										var typeStr = '';
										var selectLength = grid.getSelectionModel().getSelections().length;
										for ( var i = 0; i < selectLength; i++) {
											selectRe = grid.getSelectionModel().getSelections()[i];
											tempId = selectRe.data.invtyId;
											idStr += tempId;
											if (i != selectLength - 1){
												idStr += ',';
											}
												
										};
										outStore.load({
											params : {
												'idStr':idStr
											}
										});
										
										deleteXywzWareInvtyInfoWindow.show();
									}
									}]
					});			
			
			// 新增窗口展示的from
			var deleteXywzWareInvtyInfoForm = new Ext.form.FormPanel({
				labelWidth : 100,
				height : 50,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [{
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							name : 'chdId',
							hidden:true
						},new Com.xywz.common.MerchdListQuery(
							{
								fieldLabel : '商品规格型号',
								labelStyle : 'text-align:right;',
								//labelWidth : 100,
								//name : 'custShtNm',
								id : 'CUST_SHT_NM11',
								singleSelected : true,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('CUST_SHT_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('CUST_SHT_NM11').setValue(records[0].data.SPC_MODEL);
									deleteXywzWareInvtyInfoForm.getForm().findField('chdId').setValue(records[0].data.CHDID);
									deleteXywzWareInvtyInfoForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
									
								}
							}) ]
					},{
						columnWidth : .33,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							fieldLabel : '合同号',
							name : 'contrNum',
							readOnly:true
						}]
					}]
				} ]
			});
			// 定义列模型			

			var outcm = new Ext.grid.ColumnModel([ rownum, 
			     {header : '仓库ID',
				   width : 120,
				   dataIndex : 'invtyId',
				   hidden:true,
				   sortable : true
				  }, {
				  header : '品名',
				   width : 120,
				   dataIndex : 'prdName',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 180,
				   dataIndex : 'spcModel',
				   sortable : true
				  }, {
				  header : '<font color="red">件数（双击修改值）</font>',
				   width : 120,
				   dataIndex : 'jianCnt',
				   sortable : true,      
				   editor: new Ext.form.NumberField({
					   allowBlank: false,
					   minValue:0
				   })
				  }, {
				  header : '<font color="red">零支（双击修改值）</font>',
				   width : 120,
				   dataIndex : 'remZhiCnt',
				   sortable : true,      
				   editor: new Ext.form.NumberField({
					   allowBlank: false,
					   minValue:0
				   })
				  }, {
				  header : '支/件',
				   width : 120,
				   dataIndex : 'zhiCnt',
				   sortable : true
				  }, {
				  header : '长度',
				   width : 120,
				   dataIndex : 'len',
				   sortable : true
				  }, {
				  header : '重量（吨）',
				   width : 120,
				   hidden:true,
				   dataIndex : 'beforWeight',
				   sortable : true
				 }, {
				  header : '车间',
				   width : 120,
				   dataIndex : 'workshop',
				   hidden : true
				},  {
				  header : '材质',
				   width : 120,
				   dataIndex : 'materials',
				   sortable : true
				  }, {
				  header : '商品类型',
				   width : 120,
				   dataIndex : 'merchdType',
				   sortable : true
				  }                      
				  ]);
			/**
			 * 数据存储
			 */
			var outStore = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzWareWaitOutQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'INVTY_ID',
					messageProperty : 'message',
					root : 'json.data',
					totalProperty : 'json.count'
				}, record)
			});
			var listPanel = new Ext.grid.EditorGridPanel({
				title : "分配信息列表",
				store : outStore,
				collapsible:true,
				height : 250,
				frame : true,
				autoScroll : true,
				cm : outcm,
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				}
			});
			
			// 定义新增窗口
			var deleteXywzWareInvtyInfoWindow = new Ext.Window({
				title : '分配',
				plain : true,
				width : 880,
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
		        layout : 'fit',
		        autoScroll : true,
		        items : [ {
		            layout : 'column',
		            border : false,
		            autoScroll : true,
		            items : [{
						columnWidth : 1,
						layout : 'form',				
						items :[deleteXywzWareInvtyInfoForm]
					},{
						columnWidth : 1,
						layout : 'form',				
						items :[listPanel]
					},{
						columnWidth : 1,
						layout : 'form',				
						items :[{
							layout : 'form',
							buttonAlign : 'center',
							buttons : [ {
								text : '保存',
								handler : function() {
									var selectRe = grid.getSelectionModel().getSelections()[0];
									var sum1 = parseInt(selectRe.data.zhiCnt)*parseInt(selectRe.data.jianCnt)+parseInt(selectRe.data.remZhiCnt);
									if(!deleteXywzWareInvtyInfoForm.getForm().isValid())
									{ 
										Ext.Msg.alert('提示','输入格式有误，请重新输入!');
										return false;
									}									
									var selectRe = grid.getSelectionModel().getSelections()[0];
									var spc = Ext.getCmp('CUST_SHT_NM11').getValue();
									var spc1 = selectRe.data.spcModel;
									if(spc!=spc1){
										Ext.Msg.alert('提示','必须选择同一规格型号的商品出库!');
										return false;
									}
									
									var idStr='';
									var jianCntStr='';
									var remZhiCntStr='';
									var allRecorde = listPanel.store;
									var allLength = allRecorde.getCount();								 	
								 	for(var i=0;i<allLength;i++)
									{
								 		var sum2 = parseInt(allRecorde.getAt(i).get("zhiCnt"))*parseInt(allRecorde.getAt(i).get("jianCnt"))+parseInt(allRecorde.getAt(i).get("remZhiCnt"));
								 		if(sum2>sum1){
											Ext.Msg.alert('提示','出库数量不能大于库存数!');
											return false;
								 		}
								 		idStr+=allRecorde.getAt(i).get("invtyId");
								 		jianCntStr+=allRecorde.getAt(i).get("jianCnt");
								 		remZhiCntStr+=allRecorde.getAt(i).get("remZhiCnt");
										if (i != allLength - 1){
											idStr += ',';
											jianCntStr += ',';
											remZhiCntStr += ',';
										}
									}
								 	
								 	var chdId = deleteXywzWareInvtyInfoForm.getForm().findField('chdId').getValue();
								 	var contrNum = deleteXywzWareInvtyInfoForm.getForm().findField('contrNum').getValue();
									Ext.Ajax.request({
										url : basepath + '/XywzWareInvtyOutAction!distriWare.json',
										method : 'POST',
										params:{
											'idStr':idStr,
											'jianCntStr':jianCntStr,
											'remZhiCntStr':remZhiCntStr,
											'chdId':chdId,
											'contrNum':contrNum
										},
										success : function(response) {
											Ext.Msg.alert('提示', '操作成功!');
											store.reload();
										},
										failure : function(response) {
											Ext.Msg.alert("sdf",response.responseText);
											Ext.Msg.alert('提示', '操作失败!' );
										}
									});
									
									deleteXywzWareInvtyInfoWindow.hide();
								}
							}, {
								text : '取  消',
								handler : function() {
									deleteXywzWareInvtyInfoWindow.hide();
								}
							} ]
						}]
					}]
		        }]
			});			
			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '库存分配列表',
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