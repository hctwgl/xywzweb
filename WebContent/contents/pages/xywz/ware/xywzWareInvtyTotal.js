Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "库存汇总查询",
				labelWidth : 90, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'right', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 100,
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .25,
						layout : 'form',
						items : [new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '规格型号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'SPC_MODEL',
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
										qForm.getForm().findField('SPC_MODEL').setValue(records[0].data.SIZE_CONCAT);

									}
								})]
					}
//					{
//						columnWidth : .25,
//						layout : 'form',
//						items : [ {
//							xtype : 'numberfield',
//							Width : '100',
//							name : 'weightBegin',
//							fieldLabel : '重量大于',
//							anchor : '90%'
//						} ]
//					}, 
//					{
//						columnWidth : .25,
//						layout : 'form',
//						items : [ {
//							xtype : 'numberfield',
//							Width : '100',
//							name : 'weightEnd',
//							fieldLabel : '重量小于',
//							anchor : '90%'
//						} ]
//					} 
					]
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
			  { name : 'PRD_NAME',
				   mapping : 'PRD_NAME'
			  }, {
			  name : 'SPC_MODEL',
			   mapping : 'SPC_MODEL'
			  }, {
			  name : 'MATERIALS',
			   mapping : 'MATERIALS'
			  }, {
			  name : 'NGTV_POOR',
			   mapping : 'NGTV_POOR'
			  }, {
			  name : 'LL_WEIGHT',
			   mapping : 'LL_WEIGHT'
			  }, {
			  name : 'LEN',
			   mapping : 'LEN'
			  }, {
			  name : 'ZHI_CNT',
			   mapping : 'ZHI_CNT'
			  }, {
			  name : 'REM_TOTAL_ZHI',
			   mapping : 'REM_TOTAL_ZHI'
			  }, {
			  name : 'REM_JIAN_CNT',
			   mapping : 'REM_JIAN_CNT'
			  }, {
			  name : 'REM_REM_ZHI_CNT',
			   mapping : 'REM_REM_ZHI_CNT'
			  }, {
			  name : 'REM_WEIGHT',
			   mapping : 'REM_WEIGHT'
			  }
			  ]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm,
			     {
				  header : '品名',
				   width : 150,
				   dataIndex : 'PRD_NAME',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 150,
				   dataIndex : 'SPC_MODEL',
				   sortable : true
				  },{
				  header : '负差',
				   width : 150,
				   dataIndex : 'NGTV_POOR',
				   sortable : true
				  },{
				  header : '理重',
				   width : 150,
				   dataIndex : 'LL_WEIGHT',
				   sortable : true,
				   renderer: money('0,000.000' )
				  }, {
				  header : '材质',
				   width : 150,
				   dataIndex : 'MATERIALS',
				   sortable : true
				  },{
				  header : '长度',
				   width : 100,
				   dataIndex : 'LEN',
				   sortable : true,
				   renderer: money('0,000' )
				  },{
				  header : '支/件',
				   width : 100,
				   dataIndex : 'ZHI_CNT',
				   sortable : true,
				   renderer: money('0,000' )
				  },{
				  header : '件数',
				   width : 100,
				   dataIndex : 'REM_JIAN_CNT',
				   sortable : true,
				   renderer: money('0,000' )
				  },{
				  header : '零支',
				   width : 100,
				   dataIndex : 'REM_REM_ZHI_CNT',
				   renderer: money('0,000' ),
				   sortable : true
				  },{
				  header : '总支数',
				   width : 100,
				   dataIndex : 'REM_TOTAL_ZHI',
				   sortable : true,
				   renderer: money('0,000' )
				  }
//				  ,{
//				  header : '吨数',
//				   width : 100,
//				   dataIndex : 'REM_WEIGHT',
//				   sortable : true,
//				   renderer: money('0,000.000' )
//				  }
				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzWareInvtyTotalQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					//idProperty : 'SPC_MODEL',
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
			
			var tbar = new Ext.Toolbar(
					{
						items : [
                        {
										text : '预览',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												detailXywzWareInvtyTotalForm.getForm().loadRecord(selectRe);
												detailXywzWareInvtyTotalWindow.show();
											}
										}
									},'-',new Com.yucheng.bob.ExpButton({
							            formPanel : 'searchCondition',
							            iconCls:'exportIconCss',
							            url : basepath+'/XywzWareInvtyTotalQueryAction.json'
							        })]
					});
			var detailXywzWareInvtyTotalForm = new Ext.form.FormPanel({
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
			            name : 'PRD_NAME',
			            fieldLabel : '品名',
			            maxLength : 200,
			            minLength : 1,
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
			            name : 'SPC_MODEL',
			            fieldLabel : '规格型号',
			            maxLength : 200,
			            minLength : 1,
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
			            name : 'MATERIALS',
			            fieldLabel : '材质',
			            maxLength : 200,
			            minLength : 1,
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
			            name : 'NGTV_POOR',
			            fieldLabel : '负差',
			            maxLength : 200,
			            minLength : 1,
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
			            name : 'LEN',
			            fieldLabel : '定尺长度',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true,
			            renderer: money('0,000' )
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'ZHI_CNT',
			            fieldLabel : '支/件',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true,
			            renderer: money('0,000' )
			           }]
                     },			          
			          {
 			           columnWidth : .5,
 			           layout : 'form',
 			           items : [ {
 			            xtype : 'textfield',
 			            vtype : 'trim',
 			            Width : '100',
 			            name : 'REM_TOTAL_ZHI',
 			            fieldLabel : '剩余总支数',
 			            maxLength : 200,
 			            minLength : 1,
 			            anchor : '90%',
 			            readOnly:true,
 			           renderer: money('0,000' )
                      } ]
                   },
			          {
 			           columnWidth : .5,
 			           layout : 'form',
 			           items : [ {
 			            xtype : 'textfield',
 			            vtype : 'trim',
 			            Width : '100',
 			            name : 'REM_JIAN_CNT',
 			            fieldLabel : '剩余件数',
 			            maxLength : 200,
 			            minLength : 1,
 			            anchor : '90%',
 			            readOnly:true,
 			           renderer: money('0,000' )
                      } ]
                   },
			          {
 			           columnWidth : .5,
 			           layout : 'form',
 			           items : [ {
 			            xtype : 'textfield',
 			            vtype : 'trim',
 			            Width : '100',
 			            name : 'REM_REM_ZHI_CNT',
 			            fieldLabel : '剩余零支',
 			            maxLength : 200,
 			            minLength : 1,
 			            anchor : '90%',
 			            readOnly:true,
 			           renderer: money('0,000' )
                      } ]
                   },
			          {
 			           columnWidth : .5,
 			           layout : 'form',
 			           items : [ {
 			            xtype : 'textfield',
 			            vtype : 'trim',
 			            Width : '100',
 			            name : 'REM_WEIGHT',
 			            fieldLabel : '剩余吨数',
 			            maxLength : 200,
 			            minLength : 1,
 			            anchor : '90%',
 			            readOnly:true,
 			           renderer: money('0,000.000' )
                      } ]
                   }]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [{
						text : '取  消',
						handler : function() {
							detailXywzWareInvtyTotalWindow.hide();
						}
					} ]
				} ]
			});
			
			var detailXywzWareInvtyTotalWindow = new Ext.Window({
				title : '库存汇总详细信息',
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
				items : [ detailXywzWareInvtyTotalForm ]
			});
					
			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '库存汇总列表',
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