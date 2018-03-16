Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				title : "生产入库单查询",
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
				  header : '出入库标志',
				   width : 120,
				   hidden:true,
				   dataIndex : 'outIntoWhsInd',
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
				  header : '负差',
				   width : 120,
				   dataIndex : 'ngtvPoor',
				   sortable : true
				  },{
					  header : '重量',
					   width : 120,
					   dataIndex : 'weight',
					   sortable : true
				  }, {
				  header : '密度',
				   width : 120,
				   dataIndex : 'denst',
				   hidden : true,
				   sortable : true
				  }, {
				  header : '长度',
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
					idProperty : 'ORDR_ID',
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
//			var tbar = new Ext.Toolbar(
//					{
//						items : [
//									{
//										text : '质检入库',
//										iconCls : 'addIconCss',
//										handler : function() {
//											addXywzWareInvtyInfoForm.getForm().reset();
//											addXywzWareInvtyInfoWindow.show();
//										}
//									}]
//					});			
			
			// 新增窗口展示的from
			var addXywzWareInvtyInfoForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 350,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [					{
			            columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'invtyId',

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
			            fieldLabel : '合同号',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'merchdId',
			            fieldLabel : '商品ID',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'outIntoWhsInd',
			            fieldLabel : '出入库标志',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'prdName',
			            fieldLabel : '品名',
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
			            fieldLabel : '规格型号',
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
			            fieldLabel : '负差',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'denst',
			            fieldLabel : '密度',
						hidden : true,
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
			            fieldLabel : '长度',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'zhiCnt',
			            fieldLabel : '支/件',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'jianCnt',
			            fieldLabel : '件数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'remZhiCnt',
			            fieldLabel : '零支',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'weight',
			            fieldLabel : '重量',
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
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'workshop',
			            fieldLabel : '车间',
			            anchor : '90%'
			           } ]
			          }
			        ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzWareInvtyInfoForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzWareInvtyInfoAction.json',
								method : 'POST',
								form : addXywzWareInvtyInfoForm.getForm().id,
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
							
							addXywzWareInvtyInfoWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzWareInvtyInfoWindow.hide();
						}
					} ]
				} ]
			});
			// 定义新增窗口
			var addXywzWareInvtyInfoWindow = new Ext.Window({
				title : '手动入库',
				plain : true,
				layout : 'fit',
				width : 750,
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
				items : [ addXywzWareInvtyInfoForm ]
			});			
			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '生产入库单列表',
				frame : true,
				autoScroll : true,
				region : 'center',
				store : store,
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
				sm : sm, // 复选框
//				tbar : tbar, // 表格工具栏
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