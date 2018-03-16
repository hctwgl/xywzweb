Ext.onReady(function() {
			Ext.QuickTips.init(); 
			
			var workShopstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' 
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_WORKSHOP'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			var qForm = new Ext.form.FormPanel({
				title : "合同任务单查询",
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
						items : [new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '规格型号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'SPC_MODEL',
									id : 'SIZE32',
									singleSelected : false,
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SIZE32').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										//qForm.getForm().findField('SPC_MODEL').setValue(records[0].data.SIZE_CONCAT);
										qForm.getForm().findField('SPC_MODEL').setValue(records[0].data.SIZE);
									}
								}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'CONTR_NUM',
							fieldLabel : '销售合同号',
							anchor : '90%'
						}
//						         new Com.xywz.common.ContractFrgnQuery(
//								{
//									fieldLabel : '销售合同号',
//									labelStyle : 'text-align:left;',
//									//labelWidth : 100,
//									name : 'CONTR_NUM',
//									id : 'SELL_CONTR_NUM',
//									singleSelected : false,
//									// 单选复选标志
//									editable : false,
//									allowBlank : false,
//									// 不允许为空
//									blankText : "不能为空，请填写",
//									anchor : '90%',
//									callback : function(a, b) {
//										var records = Ext.getCmp('SELL_CONTR_NUM').oContractFrgnQueryGrid.getSelectionModel().selections.items;
//										Ext.getCmp('SELL_CONTR_NUM').setValue(records[0].data.CONTR_NUM);
//										//qForm.getForm().findField('shipCorp').setValue(parseInt(records[0].data.SHIP_CORP_ID));
//										
//									}
//								}) 
						         ]
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

			var record = Ext.data.Record.create([{
				  name : 'ID',
				   mapping : 'ID'
				  }, {
				  name : 'CHDID',
				   mapping : 'CHDID'
				  }, {
				  name : 'CONTR_NUM',
				   mapping : 'CONTR_NUM'
				  }, {
				  name : 'HS_CODE',
				   mapping : 'HS_CODE'
				  }, {
				  name : 'SPC_MODEL',
				   mapping : 'SPC_MODEL'
				  }, {
				  name : 'MATERIALS',
				   mapping : 'MATERIALS'
				  }, {
				  name : 'SQTY',
				   mapping : 'SQTY'
				  }, {
				  name : 'PLAN_NUM',
				   mapping : 'PLAN_NUM'
				  }, {
				  name : 'QTY',
				   mapping : 'QTY'
				  }, {
				  name : 'TOLERANCE',
				   mapping : 'TOLERANCE'
				  }, {
				  name : 'PKG',
				   mapping : 'PKG'
				  }, {
				  name : 'LEN',
				   mapping : 'LEN'
				  }, {
				  name : 'MEMO',
				   mapping : 'MEMO'
				  }, {
				  name : 'TYPE',
				   mapping : 'TYPE'
				  }, {
				  name : 'ZHI_CNT',
				   mapping : 'ZHI_CNT'
				  }, {
				  name : 'JIAN_CNT',
				   mapping : 'JIAN_CNT'
				  }, {
				  name : 'REM_ZHI_CNT',
				   mapping : 'REM_ZHI_CNT'
				  }, {
				  name : 'SUM_ZHI',
				   mapping : 'SUM_ZHI'
				  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				  header : '商品ID',
				   width : 120,
				   hidden:true,
				   dataIndex : 'CHDID',
				   sortable : true
				  }, {
				  header : '合同号',
				   width : 120,
				   dataIndex : 'CONTR_NUM',
				   sortable : true
				  },{
					  header : '商品类型',
					   width : 120,
					   dataIndex : 'TYPE',
					   sortable : true,
						renderer:function(value){
						if(value =='0'){
							return value ='外贸';
						}else if(value =='1'){
							return value = '内贸';
						}else{
						  return value = '外贸';
						}
					}
				  }, {
				  header : '品名',
				   width : 120,
				   dataIndex : 'HS_CODE',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 200,
				   dataIndex : 'SPC_MODEL',
				   sortable : true
				  }, {
				  header : '材质',
				   width : 120,
				   dataIndex : 'MATERIALS',
				   sortable : true
				  }, {
				  header : '重量（吨数）',
				   width : 120,
				   dataIndex : 'QTY',
				   sortable : true
				  }, {
				  header : '负差',
				   width : 120,
				   dataIndex : 'TOLERANCE',
				   sortable : true
				  }, {
				  header : '包装',
				   width : 120,
				   dataIndex : 'PKG',
				   sortable : true
				  }, {
				  header : '长度',
				   width : 120,
				   dataIndex : 'LEN',
				   sortable : true
				  }, {
				  header : '备注',
				   width : 120,
				   dataIndex : 'MEMO',
				   sortable : true
				  }
				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPlanPrdcPlanAdvsSnglQueryAction.json'
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
										text : '下达任务',
										iconCls : 'addIconCss',
										handler : function() {
										var selectLength = grid.getSelectionModel().getSelections().length;
										//alert(selectLength);
										if (selectLength < 1) {
											Ext.Msg.alert('提示','请选择记录!');
											return;
										}
//										Ext.MessageBox.confirm('提示','确定下达任务吗?',function(buttonId){
//											if(buttonId.toLowerCase() == "no"){
//												return;
//											}
//											taskNumForm.getForm().reset();
//											taskNumWindow.show();
//										});
										
										addPlanNumForm.getForm().findField('PLAN_NUM').setValue('PLAN-0001');
										var idStr = "'";
										var selectLength = grid.getSelectionModel().getSelections().length;
										for ( var i = 0; i < selectLength; i++) {
											selectRe = grid.getSelectionModel().getSelections()[i];
											tempId = selectRe.data.ID;
											idStr += tempId;
											if (i != selectLength - 1){
												idStr += "','";
											}
												
										};
										idStr+="'";
										outStore.load({
											params : {
												'idStr':idStr
											}
										});
										
										xiadaInfoWindow.show();
										
									}
									}]
					});
			
			// 新增窗口展示的from
			var taskNumForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 350,
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
			            items : [ new Ext.form.ComboBox({
							hiddenName : 'workShop',
							fieldLabel : '车间号',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : workShopstore,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							allowBlank:false,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
						}) ]
			          }
			        ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '确定',
						handler : function() {
							if(!taskNumForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							var selectRe;
							var tempId;
							var tempType;
							var idStr = '';
							var typeStr = '';
							var selectLength = grid.getSelectionModel().getSelections().length;
							for ( var i = 0; i < selectLength; i++) {
								selectRe = grid.getSelectionModel().getSelections()[i];
								tempId = selectRe.data.CHDID;
								tempType = selectRe.data.TYPE;
								idStr += tempId;
								typeStr += tempType;
								if (i != selectLength - 1){
									idStr += ',';
									typeStr += ',';
								}
									
							}
							Ext.Ajax.request({
								url : basepath+ '/XywzPlanPrdcPlanAdvsSnglAction!giveTask.json',
								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
								params:{
									'idStr':idStr,
									'typeStr':typeStr,
									'workShop':taskNumForm.getForm().findField('workShop').getValue()
								},
								success : function() {
								Ext.Msg.alert('提示', '操作成功!' );
									store.reload();
								},
								failure : function() {													
									Ext.Msg.alert('提示', '操作失败!' );
								}
							});
							
							taskNumWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							taskNumWindow.hide();
						}
					} ]
				} ]
			});
			
			// 调整窗口展示的from
			var taskInfoForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 350,
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
							xtype : 'numberfield',
							Width : '100',
							name : 'adjustNum',
							fieldLabel : '调整百分比(%)',
							allowBlank:false,
							maxLength:50,
							anchor : '90%'
						} ]
			          }
			        ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '确定',
						handler : function() {
							if(!taskInfoForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							var idStr = "'";
							var percent = parseFloat(taskInfoForm.getForm().findField('adjustNum').getValue())/100;
							
							var selectLength = grid.getSelectionModel().getSelections().length;
							for ( var i = 0; i < selectLength; i++) {
								selectRe = grid.getSelectionModel().getSelections()[i];
								tempId = selectRe.data.ID;
								idStr += tempId;
								if (i != selectLength - 1){
									idStr += "','";
								}
									
							};
							idStr+="'";
							outStore.load({
								params : {
									'idStr':idStr,
									'operate':"add",
									'percent':percent
								}
							});
							taskInfoWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							taskInfoWindow.hide();
						}
					} ]
				} ]
			});			
			// 定义新增窗口
			var taskNumWindow = new Ext.Window({
				title : '任务下达调整',
				plain : true,
				layout : 'fit',
				width : 750,
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
				items : [ taskNumForm ]
			});
			
			var taskInfoWindow = new Ext.Window({
				title : '任务下达调整',
				plain : true,
				layout : 'fit',
				width : 750,
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
				items : [ taskInfoForm ]
			});
			/********begin********/

			// 定义列模型			

			var outcm =  new Ext.grid.ColumnModel([ rownum, {
				  header : '商品ID',
				   width : 120,
				   hidden:true,
				   dataIndex : 'CHDID',
				   sortable : true
				  }, {
				  header : '合同号',
				   width : 120,
				   dataIndex : 'CONTR_NUM',
				   sortable : true
				  },{
					  header : '商品类型',
					   width : 120,
					   dataIndex : 'TYPE',
					   sortable : true,
						renderer:function(value){
						if(value =='0'){
							return value ='外贸';
						}else if(value =='1'){
							return value = '内贸';
						}else{
						  return value = '外贸';
						}
					}
				  }, {
				  header : '品名',
				   width : 120,
				   dataIndex : 'HS_CODE',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 180,
				   dataIndex : 'SPC_MODEL',
				   sortable : true
				  }, {
				  header : '负差',
				   width : 120,
				   dataIndex : 'TOLERANCE',
				   sortable : true
				  },{
				  header : '原重量（吨数）',
				   width : 120,
				   dataIndex : 'SQTY',
				   sortable : true
				 },{
				  header : '调整后重量（吨数）',
				   width : 120,
				   dataIndex : 'QTY',
				   sortable : true
				  },{
				  header : '件数',
				   width : 120,
				   dataIndex : 'JIAN_CNT',
				   sortable : true
				  },{
				  header : '零支',
				   width : 120,
				   dataIndex : 'REM_ZHI_CNT',
				   sortable : true
				  },{
				  header : '支/件',
				   width : 120,
				   dataIndex : 'ZHI_CNT',
				   sortable : true
				  },{
				  header : '长度',
				   width : 120,
				   dataIndex : 'LEN',
				   sortable : true
				  },{
				  header : '总支数',
				   width : 120,
				   hidden:true,
				   dataIndex : 'SUM_ZHI',
				   sortable : true
				  }]
				  );
			/**
			 * 数据存储
			 */
			var outStore = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPlanPrdcPlanAdvsSnglIssuedAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'ID',
					messageProperty : 'message',
					root : 'json.data',
					totalProperty : 'json.count'
				}, record)
			});
			
			// 表格工具栏
			var addPlanNumForm = new Ext.form.FormPanel({
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
						items : [{
							xtype : 'textfield',
							vtype : 'trim',
							Width : '100',
							name : 'PLAN_NUM',
							fieldLabel : '<font color=red>*</font>生产计划编号',
							allowBlank : false,
							blankText : '生产计划编号不能为空',
							maxLength:200,
							minLength:1,
							anchor : '90%'
						}]
					}]
				} ]
			});
			var tbar1 = new Ext.Toolbar(
					{
							items : [{
										text : '<font color=red>生产计划调整</font>',
										iconCls : 'editIconCss',
										handler : function() {
												taskInfoWindow.show();												
										}
									}]
					});
			var listPanel = new Ext.grid.EditorGridPanel({
				title : "信息列表",
				store : outStore,
				collapsible:true,
				height : 250,
				frame : true,
				autoScroll : true,
				tbar:tbar1,
				cm : outcm,
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				}
			});
			// 定义新增窗口
			var xiadaInfoWindow = new Ext.Window({
				title : '任务下达',
				plain : true,
				width : 950,
				height :450,
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
		            items : [
		                     {
						columnWidth : 1,
						layout : 'form',				
						items :[addPlanNumForm]
					},
					{
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
								text : '下达',
								handler : function() {																
									var idStr='';
									var typeStr='';
									var zhiCntStr='';
									var jianCntStr='';
									var remZhiCntStr='';
									var sumZhiStr='';
									var weightStr='';
									var allRecorde = listPanel.store;
									var allLength = allRecorde.getCount();
									var zhiCntStrtt='';
									var jianCntStrtt='';
							        var remZhiCntStrtt='';
							        var planNum='';
							        var tolerance='';
								 	for(var i=0;i<allLength;i++)
									{
								 		if(null==allRecorde.getAt(i).get("ZHI_CNT")||""==allRecorde.getAt(i).get("ZHI_CNT")){
								 			Ext.Msg.alert('提示', '下达的任务产品缺少包装，请设置包装后再下达!' );
								 			return;
								 		} 
								 		idStr+=allRecorde.getAt(i).get("CHDID");
								 		typeStr+=allRecorde.getAt(i).get("TYPE");
								 		weightStr+=allRecorde.getAt(i).get("QTY");
								 		zhiCntStr+=allRecorde.getAt(i).get("ZHI_CNT");
								 		jianCntStr+=allRecorde.getAt(i).get("JIAN_CNT");
								 		remZhiCntStr+=allRecorde.getAt(i).get("REM_ZHI_CNT");
								 		sumZhiStr+=allRecorde.getAt(i).get("SUM_ZHI");								 		
								 		if(null==allRecorde.getAt(i).get("TOLERANCE")||allRecorde.getAt(i).get("TOLERANCE")==''){
								 			tolerance+="α";
								 		}else{
								 			tolerance+=allRecorde.getAt(i).get("TOLERANCE");
								 		}
										if (i != allLength - 1){
											idStr += ',';
											typeStr += ',';
											weightStr += ',';
											zhiCntStr += ',';
											jianCntStr += ',';
											remZhiCntStr += ',';
											sumZhiStr += ',';
											tolerance += ',';
										}
									}
								 	//alert(tolerance);
								 	
								 	var planNum = addPlanNumForm.getForm().findField('PLAN_NUM').getValue();
								 	if(!addPlanNumForm.getForm().isValid())
									{ 
										Ext.Msg.alert('提示','请输入排产计划编号!');
										return false;
									}
								 	//planNum=allRecorde.getAt(i).get("PLAN_NUM");
								 	//alert(planNum);
								 	//return;
//								 	taskNumForm.getForm().reset();
//									taskNumWindow.show();
									Ext.Ajax.request({
										url : basepath+ '/XywzPlanPrdcPlanAdvsSnglAction!giveTaskNew.json',
										waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
										params:{
											'idStr':idStr,
											'typeStr':typeStr,
											'weightStr':weightStr,
											'zhiCntStr':zhiCntStr,
											'jianCntStr':jianCntStr,
											'remZhiCntStr':remZhiCntStr,
											'sumZhiStr':sumZhiStr,
											'planNum':planNum,
											'tolerance':tolerance
										},
										success : function() {
										Ext.Msg.alert('提示', '操作成功!' );
											store.reload();
										},
										failure : function() {													
											Ext.Msg.alert('提示', '操作失败!' );
										}
									});
									
									xiadaInfoWindow.hide();
								}
							}, {
								text : '取  消',
								handler : function() {
									xiadaInfoWindow.hide();
								}
							} ]
						}]
					}]
		        }]
			});
			/********end********/			
			
			
			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '合同任务单列表',
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