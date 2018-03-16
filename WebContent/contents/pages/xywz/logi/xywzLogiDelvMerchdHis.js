Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var boxstore3 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_GOODS_SOURCE'  //客户业务类别
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
//				listeners:{     
//					 //向已有数据中插入一条新的数据     
//					load : function(outStore, records, options ){     
//							Ext.getCmp('gdsSrcOra').setValue('国阳');
//					}     
//				}
			});
//			boxstore3.load();
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "产品查询",
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
							name : 'confirmSend',
							hidden:true
						},new Com.xywz.common.LogiSendNoticeQuery(
							{
								fieldLabel : '发运通知ID',
								labelStyle : 'text-align:right;',
								//labelWidth : 100,
								name : 'sendSheetAdvsNum',
								id : 'SEND_SHEET_ADVS_NUM11',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('SEND_SHEET_ADVS_NUM11').oCustomerQueryGrid.getSelectionModel().selections.items;
									//Ext.getCmp('SEND_SHEET_ADVS_NUM11').setValue(records[0].data.CORP_NM);
									qForm.getForm().findField('sendSheetAdvsNum').setValue(parseInt(records[0].data.SEND_SHEET_ADVS_NUM));
									qForm.getForm().findField('confirmSend').setValue(parseInt(records[0].data.CONFIRM_SEND));
								}
							}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'gdsSrcOra',
							fieldLabel : '货源',
							labelStyle: 'text-align:right;',
							triggerAction : 'all',
							store : boxstore3,
							id:'gdsSrcOra',
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							value:'国阳',
							forceSelection : true,
							editable : false,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
						})]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '品名',
									labelStyle : 'text-align:right;',
									//labelWidth : 100,
									name : 'hsCode',
									id : 'HS_CODE11',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('HS_CODE11').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										//Ext.getCmp('SEND_SHEET_ADVS_NUM11').setValue(records[0].data.CORP_NM);
										qForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
										
									}
								}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'materials',
							fieldLabel : '材质',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [  new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '规格型号',
									labelStyle : 'text-align:right;',
									//labelWidth : 100,
									name : 'spcModel',
									id : 'SIZE11',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SIZE11').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										//Ext.getCmp('SEND_SHEET_ADVS_NUM11').setValue(records[0].data.CORP_NM);
										qForm.getForm().findField('spcModel').setValue(records[0].data.SIZE);
										
									}
								})]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							labelWidth : 90,
							Width : '100',
							name : 'insertDt',
							fieldLabel : '修改日期',
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
				   name : 'id',
				   mapping : 'ID'
				  }, {
				  name : 'sendSheetAdvsNum',
				   mapping : 'SEND_SHEET_ADVS_NUM'
				  }, {
				  name : 'outId',
				   mapping : 'OUT_ID'
				  }, {
				  name : 'gdsSrcOra',
				   mapping : 'GDS_SRC_ORA'
				  }, {
				  name : 'gdsSrc',
				   mapping : 'GDS_SRC'
				  }, {
				  name : 'hsCode',
				   mapping : 'HS_CODE'
				  }, {
				  name : 'materials',
				   mapping : 'MATERIALS'
				  }, {
				  name : 'spcModel',
				   mapping : 'SPC_MODEL'
				  }, {
				  name : 'gdsLength',
				   mapping : 'GDS_LENGTH'
				  }, {
				  name : 'qty',
				   mapping : 'QTY'
				  }, {
				  name : 'remZhiCnt',
				   mapping : 'REM_ZHI_CNT'
				  }, {
				  name : 'zhiCnt',
				   mapping : 'ZHI_CNT'
				  }, {
				  name : 'weight',
				   mapping : 'WEIGHT'
				  }, {
				  name : 'pkg',
				   mapping : 'PKG'
				  }, {
				  name : 'totalZhi',
				   mapping : 'TOTAL_ZHI'
				  }, {
				  name : 'ngtvPoor',
				   mapping : 'NGTV_POOR'
				  }, {
				  name : 'confirmSend',
				   mapping : 'CONFIRM_SEND'
				  }, {
				  name : 'insertDt',
				   mapping : 'INSERT_DT'
				  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				  header : 'ID',
				   width : 100,
				   dataIndex : 'id',
				   sortable : true,
				   hidden:true
				  }, {
				  header : 'outId',
				   width : 100,
				   dataIndex : 'outId',
				   sortable : true,
				   hidden:true
				  }, {
				  header : '发运通知ID',
				   width : 100,
				   dataIndex : 'sendSheetAdvsNum',
				   sortable : true
				  }, {
				  header : '货源',
				   width : 120,
				   dataIndex : 'gdsSrcOra',
				   sortable : true
				  }, {
				  header : '品名',
				   width : 120,
				   dataIndex : 'hsCode',
				   sortable : true
				  }, {
				  header : '材质',
				   width : 120,
				   dataIndex : 'materials',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 120,
				   dataIndex : 'spcModel',
				   sortable : true
				  }, {
				  header : '重量负差',
				   width : 120,
				   dataIndex : 'ngtvPoor',
				   sortable : true
				  }, {
				  header : '长度(M)',
				   width : 100,
				   dataIndex : 'gdsLength',
				   renderer: money('0,000.00' ),
				   sortable : true
				  }, {
				  header : '修改日期',
				   width : 100,
				   dataIndex : 'insertDt',
				   sortable : true
				  }, {
				  header : '支/件',
				   width : 100,
				   dataIndex : 'zhiCnt',
				   sortable : true,
				   renderer: money('0,000' )
				  }, {
				  header : '件数',
				   width : 100,
				   dataIndex : 'qty',
				   sortable : true,
				   renderer: money('0,000' )
				  }, {
				  header : '零支',
				   width : 100,
				   dataIndex : 'remZhiCnt',
				   sortable : true,
				   renderer: money('0,000' )
				  }, {
				  header : '重量(吨)',
				   width : 100,
				   dataIndex : 'weight',
				   sortable : true,
				   renderer: money('0,000.000' )
				  }, {
				  header : '包装',
				   width : 100,
				   dataIndex : 'pkg',
				   sortable : true,
				   hidden:true
				  }, {
				  header : '总支数',
				   width : 100,
				   dataIndex : 'totalZhi',
				   renderer: money('0,000' ),
				   sortable : true
				  }, {
				  header : '确认发货',
				   width : 100,
				   dataIndex : 'confirmSend',
				   hidden:true,
				   sortable : true
				  }]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzLogiDelvMerchdHisQueryAction.json'
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
										text : '预览',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												detailXywzLogiDelvMerchdForm.getForm().loadRecord(selectRe);
												detailXywzLogiDelvMerchdWindow.show();
											}
										}
									},'-',new Com.yucheng.bob.ExpButton({
							            formPanel : 'searchCondition',
							            iconCls:'exportIconCss',
							            url : basepath+'/XywzLogiDelvMerchdHisQueryAction.json'
							        })]
					});
			// 新增窗口展示的from
			var addXywzLogiDelvMerchdForm = new Ext.form.FormPanel({
				labelWidth : 100,
				height : 100,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [{
						columnWidth : .33,
						layout : 'form',
						items : [{
							xtype : 'numberfield',
							name : 'confirmSend',
							hidden:true
						},new Com.xywz.common.LogiSendNoticeQuery(
								{
									fieldLabel : '发运通知ID',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'sendSheetAdvsNum1',
									id : 'SEND_SHEET_ADVS_NUM55',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SEND_SHEET_ADVS_NUM55').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('SEND_SHEET_ADVS_NUM55').setValue(records[0].data.SEND_SHEET_ADVS_NUM);
										addXywzLogiDelvMerchdForm.getForm().findField('sendSheetAdvsNum1').setValue(parseInt(records[0].data.SEND_SHEET_ADVS_NUM));
										addXywzLogiDelvMerchdForm.getForm().findField('confirmSend').setValue(parseInt(records[0].data.CONFIRM_SEND));
									}
								})]
					}]
				} ],
				buttons : [ {
					text : '查询',
					handler : function() {
						var conditionStr = addXywzLogiDelvMerchdForm.getForm().getValues(false);
						var sendSheetAdvsNum = addXywzLogiDelvMerchdForm.getForm().findField('sendSheetAdvsNum1').getValue();
						var confirmSend = addXywzLogiDelvMerchdForm.getForm().findField('confirmSend').getValue();
						//alert(sendSheetAdvsNum+":"+confirmSend);
						if (confirmSend == 1){
							Ext.Msg.alert('提示','该发运通知已确认发货，不允许再添加商品!');
							return false;
						}
						outStore.baseParams = {
							"condition" : Ext.encode(conditionStr),
							"sendSheetAdvsNum":sendSheetAdvsNum
						};
						//var confirmSend = addXywzLogiDelvMerchdForm.getForm().findField('sendSheetAdvsNum1').getValue();
						if(!addXywzLogiDelvMerchdForm.getForm().isValid())
						{ 
							Ext.Msg.alert('提示','输入格式有误，请重新输入!');
							return false;
						}
						outStore.load({
							params : {
								start : 0,
								limit : parseInt(pagesize_combo.getValue())
							}
						});

					}

				},{
					text : '重置',
					handler : function() {
					addXywzLogiDelvMerchdForm.getForm().reset();
					}

				} ]
			});

			var record1 = Ext.data.Record.create([ 
   			  { name : 'outId',
				   mapping : 'OUT_ID'
			  },{
			  name : 'gdsSrc',
			   mapping : 'GDS_SRC'
			  },{
			  name : 'gdsSrcOra',
			   mapping : 'GDS_SRC_ORA'
			  },{
			  name : 'prdName',
			   mapping : 'PRD_NAME'
			  },{
			  name : 'materials',
			   mapping : 'MATERIALS'
			  }, {
			  name : 'spcModel',
			   mapping : 'SPC_MODEL'
			  }, {
			  name : 'llWeight',
			   mapping : 'LL_WEIGHT'
			  },{
			  name : 'len',
			   mapping : 'LEN'
			  },{
			  name : 'zhiCnt',
			   mapping : 'ZHI_CNT'
			  },{
			  name : 'jianCnt',
			   mapping : 'JIAN_CNT'
			  },{
			  name : 'weight',
			   mapping : 'WEIGHT'
			  }, {
			  name : 'theoryWeight',
			   mapping : 'THEORY_WEIGHT'
			  },{
			  name : 'remZhiCnt',
			   mapping : 'REM_ZHI_CNT'
			  },{
			  name : 'ngtvPoor',
			   mapping : 'NGTV_POOR'
			  },{
			  name : 'prdId',
			   mapping : 'PRD_ID'
			  },{
			  name : 'confirmSend',
			   mapping : 'CONFIRM_SEND'
			  }
   			  ]);
			var sm12 = new Ext.grid.CheckboxSelectionModel();
			var rownum12 = new Ext.grid.RowNumberer({
				header : 'No.',
				width : 28
			});			
			var outcm = new Ext.grid.ColumnModel([ rownum12, sm12, 
			     {  header : '出库ID',
				   width : 120,
				   dataIndex : 'outId',
				   hidden : true
				  },{  
				   header : 'prdId',
				   width : 120,
				   dataIndex : 'prdId',
				   hidden : true
				  },{  
				   header : 'confirmSend',
				   width : 120,
				   dataIndex : 'confirmSend',
				   hidden : true
				  }, {
				  header : '<font color="red">货源(双击下拉选择)',
				   width : 120,
				   dataIndex : 'gdsSrcOra',
				   sortable : true,
				   editor:new Ext.form.ComboBox({
						hiddenName : 'gdsSrcOra',
						fieldLabel : '货源',
						labelStyle: 'text-align:right;',
						triggerAction : 'all',
						store : boxstore3,
						id:'gdsSrcOra1',
						displayField : 'value',
						valueField : 'key',
						mode : 'local',
						value:'国阳',
						forceSelection : true,
						editable : false,
						typeAhead : true,
						emptyText:'请选择',
						resizable : true,
						anchor : '90%'
					}) 
				  }, {
				  header : '品名',
				   width : 120,
				   dataIndex : 'prdName',
				   sortable : true
				  },{
				  header : '材质',
				   width : 120,
				   dataIndex : 'materials',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 120,
				   dataIndex : 'spcModel',
				   sortable : true
				  }, {
				  header : '理重',
				   width : 120,
				   dataIndex : 'llWeight',
				   sortable : true,
				   renderer: money('0,000.00' )
				  }, {
				  header : '重量负差',
				   width : 120,
				   dataIndex : 'ngtvPoor',
				   sortable : true
				  }, {
				  header : '定尺长度',
				   width : 120,
				   dataIndex : 'len',
				   renderer: money('0,000.00' ),
				   sortable : true
				  }, {
				  header : '支/件',
				   width : 120,
				   dataIndex : 'zhiCnt',
				   renderer: money('0,000' ),				   
				   sortable : true
				  }, {
				  header : '<font color="red">件数（双击修改值）</font>',
				   width : 120,
				   dataIndex : 'jianCnt',
				   renderer: money('0,000' ),
				   sortable : true,
				   editor: new Ext.form.NumberField({
					   allowBlank: false,
					   minValue:0
//					   listeners: {				   
//					   		'change': function (obj) {
//					            alert('111111');
//					            var selectRe = listPanel.getSelectionModel().getSelections()[i];
//					            //var selectRe = grid.getSelectionModel().getSelections()[0];
//					   
//					   			var value = selectRe.data.jianCnt;
//					   			alert('11111111::'+value);
//					   			//var startValue=obj.startValue;
//					   			//if(value>startValue){
//								//	Ext.Msg.alert('提示', '修改吨数不能大于库存吨数');
//					   			//	obj.setValue(startValue);
//					   			//}
//				   			}   
//				   	}
				   })
				  }, {
					  header : '<font color="red">零支（双击修改值）</font>',
					   width : 120,
					   dataIndex : 'remZhiCnt',
					   renderer: money('0,000.00' ),
					   sortable : true,
					   editor: new Ext.form.NumberField({
						   allowBlank: false,
						   minValue:0,
						   listeners: {				   
						   		'click': function (obj) {
						   			var value=obj.getRawValue();
						   			var startValue=obj.startValue;
						   			debugger;
						   			if(value>startValue){
										Ext.Msg.alert('提示', '修改吨数不能大于库存吨数');
						   				obj.setValue(startValue);
						   			}
					   			}   
					   	}
					   })
					  }, {
				  header : '重量(吨)',
				   width : 120,
				   dataIndex : 'weight',
				   renderer: money('0,000.000' ),
				   sortable : true
				  }
  				  ]);
			
			/**
			 * 数据存储
			 */
			var outStore = new Ext.data.Store({
				restful : true,
				//autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAddWareInvtyOutQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'OUT_ID',
					messageProperty : 'message',
					root : 'json.data',
					totalProperty : 'json.count'
				}, record1)
			});
			// 默认加载数据
			outStore.load({
				params : {
					start : 0,
					limit : parseInt(pagesize_combo.getValue())
				}
			});
			var listPanel = new Ext.grid.EditorGridPanel({
				title : "出库信息列表",
				store : outStore,
				collapsible:true,
				height : 250,
				frame : true,
				autoScroll : true,
				cm : outcm,
				sm :sm12,
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				}
			});
			
			var detailXywzLogiDelvMerchdForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 150,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [{
		           columnWidth : .5,
		            layout : 'form',
		            items : [{
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'sendSheetAdvsNum',
			            fieldLabel : '发运通知ID',
			            allowBlank : false,
			            editabled:true,
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
		            name : 'gdsSrc',
		            fieldLabel : '货源',
		            allowBlank : false,
		            editabled:true,
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
		            name : 'hsCode',
		            fieldLabel : '品名',
		            editabled:true,
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
		            name : 'materials',
		            fieldLabel : '材质',
		            editabled:true,
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
			            name : 'spcModel',
			            fieldLabel : '规格型号',
			            editabled:true,
			            anchor : '90%',
			            readOnly:true
			           } ]
		          },{
		           columnWidth : .5,
		            layout : 'form',
		            items : [ {
		            xtype : 'textfield',
		            vtype : 'trim',
		            name : 'gdsLength',
		            fieldLabel : '长度(MM)',
		            Width : '100',
		            editabled:false,
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
		            name : 'qty',
		            fieldLabel : '件数',
		            editabled:true,
		            renderer: money('0,000' ),
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
		            name : 'pkg',
		            fieldLabel : '包装',
		            editabled:true,
		            anchor : '90%',
		            readOnly:true
		           } ]
				} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [{
						text : '取  消',
						handler : function() {
							detailXywzLogiDelvMerchdWindow.hide();
						}
					} ]
				} ]
			});

			// 新增窗口展示的from
			var addXywzLogiDelvMerchdWindow = new Ext.Window({
				title : '出库商品明细',
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
						items :[addXywzLogiDelvMerchdForm]
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
								text : '确定',
								handler : function() {
									if(!addXywzLogiDelvMerchdForm.getForm().isValid())
									{ 
										Ext.Msg.alert('提示','输入格式有误，请重新输入!');
										return false;
									}
									
									var idStr='';
									var selectRe;
									var gdsSrc='';
									var gdsId;
									var jianCnt1=0;
									var jianCnt=0; //件
									var zhiCnt=''; //支/件
									var zhiCnt1='';
									var remZhiCnt='';
									var tmpRemZhiCnt='';
									var llWeight='';
									var weight;
									var len;
									var tempWeight='';
									var tmpPrdId='';
									var prdId='';
									var gdsSrcOra='';
									var tmpgdsSrcOra='';
									var materials='';
									var tmpmaterials='';
									var tmptotalZhi='';
									var selectLength = listPanel.getSelectionModel().getSelections().length;
									for ( var i = 0; i < selectLength; i++) {
										selectRe = listPanel.getSelectionModel().getSelections()[i];
										tempId = selectRe.data.outId;
										gdsId = selectRe.data.gdsSrcOra; 
										jianCnt1=selectRe.data.jianCnt;    //件数
										zhiCnt1=selectRe.data.zhiCnt;      //支数/件
										remZhiCnt=selectRe.data.remZhiCnt; //零支
										llWeight=selectRe.data.llWeight;  //理重
										len=selectRe.data.len;            //长度
										tmpPrdId=selectRe.data.prdId;
										tmpgdsSrcOra=selectRe.data.gdsSrcOra;
										tmpmaterials=selectRe.data.materials;
										idStr += tempId;
										gdsSrc += gdsId;
										jianCnt+=jianCnt1;
										zhiCnt+=zhiCnt1;
										var totalZhi=parseInt(zhiCnt1)*parseInt(jianCnt1)+parseInt(remZhiCnt);
										weight=(parseFloat(llWeight)*parseFloat(len)* parseInt(totalZhi))/1000.000;
										alert(weight);
										//return;
										tempWeight+=weight;
										tmpRemZhiCnt+=remZhiCnt;
										gdsSrcOra+=tmpgdsSrcOra;
										prdId+=tmpPrdId;
										prdId+=gdsSrcOra;
										materials+=tmpmaterials;
										tmptotalZhi+=totalZhi;
										//alert(tprdId);
										//alert(prdId);
										if (i != selectLength - 1)
											idStr += '@';
										    gdsSrc+= '@'; 
										    jianCnt+='@';
										    zhiCnt+='@';
										    tmpRemZhiCnt+='@';
										    tempWeight+='@';
										    prdId+='@';
										    materials+='@';
										    tmptotalZhi+='@';
										}
								 	var sendSheetAdvsNum = addXywzLogiDelvMerchdForm.getForm().findField('sendSheetAdvsNum1').getValue();
								 	//alert(tempWeight);
									Ext.Ajax.request({
										url : basepath + '/XywzLogiDelvMerchdAction!distriWare.json',
										method : 'POST',
										params:{
											'idStr':idStr,
											'sendSheetAdvsNum':sendSheetAdvsNum,
											'gdsSrc':gdsSrc,
											'jianCnt':jianCnt,
											'tmpRemZhiCnt':tmpRemZhiCnt,
											'tempWeight':tempWeight,
											'prdId':prdId,
											'materials':materials,
											'tmptotalZhi':tmptotalZhi
										},
										success : function(response) {
											Ext.Msg.alert('提示', '操作成功!');
											store.reload();
											addXywzLogiDelvMerchdForm.getForm().reset();
										},
										failure : function(response) {
											Ext.Msg.alert("sdf",response.responseText);
											Ext.Msg.alert('提示', '操作失败!' );
										}
									});
									
									addXywzLogiDelvMerchdWindow.hide();
								}
							}, {
								text : '取  消',
								handler : function() {
								addXywzLogiDelvMerchdWindow.hide();
								}
							} ]
						}]
					}]
		        }]
			});

			// 修改窗口展示的from
			var editXywzLogiDelvMerchdForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 150,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [{
		           columnWidth : .5,
		            layout : 'form',
		            items : [{
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'sendSheetAdvsNum',
			            fieldLabel : '发运通知ID',
			            allowBlank : false,
			            editabled:true,
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
		            name : 'gdsSrc',
		            fieldLabel : '货源',
		            allowBlank : false,
		            editabled:true,
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
		            name : 'id',
		            fieldLabel : 'id',
		            allowBlank : false,
		            editabled:true,
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
		            name : 'hsCode',
		            fieldLabel : '品名',
		            editabled:true,
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
		            name : 'materials',
		            fieldLabel : '材质',
		            editabled:true,
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
			            name : 'spcModel',
			            fieldLabel : '规格型号',
			            editabled:true,
			            anchor : '90%',
			            readOnly:true
			           } ]
		          },{
		           columnWidth : .5,
		            layout : 'form',
		            items : [ {
		            xtype : 'textfield',
		            vtype : 'trim',
		            name : 'gdsLength',
		            fieldLabel : '长度(MM)',
		            Width : '100',
		            editabled:false,
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
		            name : 'qty',
		            fieldLabel : '件数',
		            renderer: money('0,000' ),
		            editabled:true,
		            anchor : '90%',
		            readOnly:true
		           } ]
		          },{
		           columnWidth : .5,
		            layout : 'form',
		            items : [ {
		            xtype : 'numberfield',
		            vtype : 'trim',
		            Width : '100',
		            name : 'zhiCnt',
		            fieldLabel : '支/件',
		            renderer: money('0,000' ),
		            editabled:true,
		            anchor : '90%'
		           } ]
		          } ,{
		           columnWidth : .5,
		            layout : 'form',
		            items : [ {
		            xtype : 'numberfield',
		            vtype : 'trim',
		            Width : '100',
		            name : 'totalZhi',
		            fieldLabel : '总支数',
		            renderer: money('0,000' ),
		            editabled:true,
		            anchor : '90%',
		            hidden : true
		           } ]
		          } ,{
		           columnWidth : .5,
		            layout : 'form',
		            items : [ {
		            xtype : 'textfield',
		            vtype : 'trim',
		            Width : '100',
		            name : 'remZhiCnt',
		            fieldLabel : '零支',
		            renderer: money('0,000' ),
		            editabled:true,
		            anchor : '90%',
		            readOnly:true
		           } ]
		          }]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzLogiDelvMerchdForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							var totalZhi=editXywzLogiDelvMerchdForm.getForm().findField('totalZhi').getValue();
							var zhiCnt=editXywzLogiDelvMerchdForm.getForm().findField('zhiCnt').getValue();
							var id=editXywzLogiDelvMerchdForm.getForm().findField('id').getValue();
							//alert('totalZhi:'+totalZhi+'zhiCnt:'+zhiCnt+'id:'+id);
							Ext.Ajax.request({
								url : basepath + '/XywzLogiDelvMerchdAction!modifyZhiCnt.json',
								method : 'POST',
								params:{
									'id':id,
									'totalZhi':totalZhi,
									'zhiCnt':zhiCnt
								},
								//form : editXywzLogiDelvMerchdForm.getForm().id,
								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
								success : function(response) {

									Ext.Msg.alert('提示', '操作成功!');
									store.reload();
									outStore.reload();
								},
								failure : function(response) {
									Ext.Msg.alert("sdf",response.responseText);
									Ext.Msg.alert('提示', '操作失败!' );
									outStore.reload();
								}
							});
							
							editXywzLogiDelvMerchdWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzLogiDelvMerchdWindow.hide();
							outStore.reload();
						}
					} ]
				} ]
			});


			var detailXywzLogiDelvMerchdWindow = new Ext.Window({
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
				items : [ detailXywzLogiDelvMerchdForm ]
			});
			
			// 定义新增窗口
//			var addXywzLogiDelvMerchdWindow = new Ext.Window({
//				title : '发货商品明细新增',
//				plain : true,
//				layout : 'fit',
//				width : 800,
//				height :400,
//				resizable : true,
//				draggable : true,
//				closable : true,
//				closeAction : 'hide',
//				modal : true, // 模态窗口
//				loadMask : true,
//				maximizable : true,
//				collapsible : true,
//				titleCollapse : true,
//				buttonAlign : 'right',
//				border : false,
//				items : [ addXywzLogiDelvMerchdForm ]
//			});

			// 定义修改窗口
			var editXywzLogiDelvMerchdWindow = new Ext.Window({
				title : '发货商品明细修改',
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
				items : [ editXywzLogiDelvMerchdForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '发货商品明细列表',
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