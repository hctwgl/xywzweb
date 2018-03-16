Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				title : "已分配库存再调整",
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
					},{
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							Width : '100',
							name : 'outWhsDt',
							fieldLabel : '出库时间',
							anchor : '90%',
							format:'Y-m-d'
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
			  { name : 'outId',
				   mapping : 'OUT_ID'
			  }, {
			  name : 'contrNum',
			   mapping : 'CONTR_NUM'
			  }, {
			  name : 'merchdId',
			   mapping : 'MERCHD_ID'
			  }, {
			  name : 'prdName',
			   mapping : 'PRD_NAME'
			  }, {
			  name : 'spcModel',
			   mapping : 'SPC_MODEL'
			  }, {
			  name : 'materials',
			   mapping : 'MATERIALS'
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
			  },{
			  name : 'outWhsDt',
			   mapping : 'OUT_WHS_DT'
			  }, {
			  name : 'outWhsExecPers',
			   mapping : 'OUT_WHS_EXEC_PERS'
			  }, {
				 name : 'outCustName',
				 mapping : 'OUT_CUST_NAME'
			  }, {
			  name : 'CONTR_NUM1',
			   mapping : 'CONTR_NUM1'
			  }, {
				 name : 'OUT_CUST_NAME1',
				 mapping : 'OUT_CUST_NAME1'
			  } 
			  ]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm,	{  header : '出库ID',
				   width : 120,
				   dataIndex : 'outId',
				   hidden : true
				  }, {
				  header : '合同号',
				   width : 120,
				   dataIndex : 'contrNum',
				   sortable : true
				  },{
				  header : '客户名称',
				   width : 180,
				   dataIndex : 'outCustName',
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
				  header : '材质',
				   width : 180,
				   dataIndex : 'materials',
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
				  header : '支/件',
				   width : 120,
				   dataIndex : 'zhiCnt',
				   sortable : true
				  }, {
				  header : '长度（米）',
				   width : 120,
				   dataIndex : 'len',
				   sortable : true
				  }, {
				  header : '负差',
				   width : 120,
				   dataIndex : 'ngtvPoor',
				   hidden : true
				  }, {
				  header : '重量（吨）',
				   width : 120,
				   dataIndex : 'weight',
				   sortable : true
				  }, {
				  header : '密度',
				   width : 120,
				   dataIndex : 'denst',
				   hidden : true
				  }, {
				  header : '备注',
				   width : 120,
				   dataIndex : 'memo',
				   sortable : true
				  },{
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
				  header : '来源合同',
				   width : 120,
				   dataIndex : 'CONTR_NUM1',
				   sortable : true
				  }, {
				  header : '来源客户',
				   width : 120,
				   dataIndex : 'OUT_CUST_NAME1',
				   sortable : true
				  }
				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzWareInvtyOutQueryAction.json'
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
			var tbar = new Ext.Toolbar(
					{
						items : [
									{
										text : '库存再分配',
										iconCls : 'addIconCss',
										handler : function() {

										var selectLength = grid.getSelectionModel().getSelections().length;

										var selectRe = grid.getSelectionModel().getSelections()[0];
										if (selectLength != 1) {
											Ext.Msg.alert('提示','请选择一条记录!');
											return;
										}
										deleteXywzWareInvtyInfoForm.getForm().reset();
										deleteXywzWareInvtyInfoForm.getForm().findField("jianCnt").setValue(selectRe.data.jianCnt);
										deleteXywzWareInvtyInfoForm.getForm().findField("remZhiCnt").setValue(selectRe.data.remZhiCnt);
										deleteXywzWareInvtyInfoForm.getForm().findField("outId").setValue(selectRe.data.outId);
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
						columnWidth : .5,
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
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							fieldLabel : '合同号',
							readOnly : true,
							labelStyle : 'text-align:right;',
							name : 'contrNum'
						}]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'numberfield',
							fieldLabel : '件',
							allowBlank : false,
							labelStyle : 'text-align:right;',
							name : 'jianCnt'
						},{
							xtype : 'textfield',
							name : 'outId',
							hidden:true
						}]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'numberfield',
							fieldLabel : '零支',
							allowBlank : false,
							labelStyle : 'text-align:right;',
							name : 'remZhiCnt'
						}]
					}]
				} ],
				buttons : [ {
					text : '确   定',
					handler : function() {
						if(!deleteXywzWareInvtyInfoForm.getForm().isValid())
						{ 
							Ext.Msg.alert('提示','输入格式有误，请重新输入!');
							return false;
						}
						var selectRe = grid.getSelectionModel().getSelections()[0];
						var spc = Ext.getCmp('CUST_SHT_NM11').getValue();
						var spc1 = selectRe.data.spcModel;
						if(spc!=spc1){
							Ext.Msg.alert('提示','必须选择同一规格型号的商品分配!');
							return false;
						}
						var selectRe = grid.getSelectionModel().getSelections()[0];
						var zhiCnt = parseInt(selectRe.data.zhiCnt);
						var jianCnt = parseInt(selectRe.data.jianCnt);
						var remZhiCnt = parseInt(selectRe.data.remZhiCnt);
						var jianCnt1 = parseInt(deleteXywzWareInvtyInfoForm.getForm().findField('jianCnt').getValue());
						var remZhiCnt1 = parseInt(deleteXywzWareInvtyInfoForm.getForm().findField('remZhiCnt').getValue());
						var sum = zhiCnt*jianCnt+remZhiCnt;
						var sum1 = zhiCnt*jianCnt1+remZhiCnt1;
						if(sum1>sum){
							Ext.Msg.alert('提示','出库的数量不能大于库存!');
							return false;
						}
						var chdId = deleteXywzWareInvtyInfoForm.getForm().findField('chdId').getValue();
					 	var contrNum = deleteXywzWareInvtyInfoForm.getForm().findField('contrNum').getValue();
					 	var outId = deleteXywzWareInvtyInfoForm.getForm().findField('outId').getValue();
					 	
						Ext.Ajax.request({
							url : basepath + '/XywzWareInvtyOutAction!againDistriWare.json',
							method : 'POST',
							params:{
								'outId':outId,
								'jianCnt':jianCnt1,
								'remZhiCnt':remZhiCnt1,
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
			});
			
			// 定义新增窗口
			var deleteXywzWareInvtyInfoWindow = new Ext.Window({
				title : '分配',
				plain : true,
				width : 600,
				height :200,
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
		        items : [deleteXywzWareInvtyInfoForm]
			});			
		
			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '已分配库存再调整',
				frame : true,
				autoScroll : true,
				region : 'center',
				store : store,
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
				sm : sm, // 复选框
				bbar : bbar,// 分页工具栏
				tbar : tbar, // 表格工具栏
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